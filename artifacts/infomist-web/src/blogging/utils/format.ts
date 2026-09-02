import type { Block, PostStatus } from "../types";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

export function uid(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;
}

/** Strip HTML to plain text. */
export function stripHtml(html = ""): string {
  if (typeof document === "undefined") return html.replace(/<[^>]+>/g, "");
  const el = document.createElement("div");
  el.innerHTML = html;
  return el.textContent || el.innerText || "";
}

export function wordCount(text: string): number {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}

/** Rough reading time from blocks — 220 wpm. */
export function readingTime(blocks: Block[]): number {
  let words = 0;
  const visit = (bs: Block[]) => {
    for (const b of bs) {
      words += wordCount(stripHtml(b.html));
      if (b.code) words += wordCount(b.code);
      if (b.callout) words += wordCount(stripHtml(b.callout.html));
      if (b.faq) b.faq.forEach((f) => (words += wordCount(f.q) + wordCount(stripHtml(f.a))));
      if (b.table) b.table.rows.forEach((r) => r.forEach((c) => (words += wordCount(stripHtml(c)))));
      if (b.children) b.children.forEach(visit);
    }
  };
  visit(blocks);
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso: string | null, opts?: Intl.DateTimeFormatOptions): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", opts ?? { month: "short", day: "numeric", year: "numeric" });
}

export function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(iso);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const STATUS_META: Record<
  PostStatus,
  { label: string; badge: "default" | "secondary" | "outline" | "destructive"; dot: string }
> = {
  draft: { label: "Draft", badge: "secondary", dot: "bg-muted-foreground" },
  pending: { label: "Pending Review", badge: "outline", dot: "bg-chart-5" },
  scheduled: { label: "Scheduled", badge: "outline", dot: "bg-chart-4" },
  published: { label: "Published", badge: "default", dot: "bg-accent" },
  trash: { label: "Trash", badge: "destructive", dot: "bg-destructive" },
};

/** Effective status accounting for scheduled-in-future publishedAt. */
export function effectiveStatus(status: PostStatus, publishedAt: string | null): PostStatus {
  if (status === "published" && publishedAt && new Date(publishedAt).getTime() > Date.now()) {
    return "scheduled";
  }
  return status;
}
