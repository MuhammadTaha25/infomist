import * as React from "react";
import {
  Info,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Play,
  FileDown,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { Block, CalloutKind } from "../../types";
import { useMediaItem } from "../../store";
import { stripHtml } from "../../utils/format";

const alignClass: Record<string, string> = {
  left: "mr-auto text-left",
  center: "mx-auto text-center",
  right: "ml-auto text-right",
  wide: "mx-auto w-full max-w-4xl",
  full: "mx-auto w-full",
};

const CALLOUT: Record<CalloutKind, { icon: React.ComponentType<{ className?: string }>; cls: string; label: string }> = {
  info: { icon: Info, cls: "border-sky-200 bg-sky-50 text-sky-900", label: "Info" },
  tip: { icon: Lightbulb, cls: "border-lime-200 bg-lime-50 text-lime-900", label: "Pro tip" },
  warning: { icon: AlertTriangle, cls: "border-amber-200 bg-amber-50 text-amber-900", label: "Warning" },
  success: { icon: CheckCircle2, cls: "border-emerald-200 bg-emerald-50 text-emerald-900", label: "Success" },
  danger: { icon: ShieldAlert, cls: "border-red-200 bg-red-50 text-red-900", label: "Danger" },
};

export function BlocksView({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b) => (
        <BlockView key={b.id} block={b} />
      ))}
    </div>
  );
}

export function BlockView({ block: b }: { block: Block }) {
  switch (b.type) {
    case "paragraph":
      return <p className="leading-7 text-foreground [&_a]:text-primary [&_a]:underline" dangerouslySetInnerHTML={{ __html: b.html || "" }} />;
    case "heading": {
      const Tag = (`h${b.level ?? 2}`) as "h2" | "h3" | "h4";
      const size = b.level === 4 ? "text-lg" : b.level === 3 ? "text-xl" : "text-2xl";
      return <Tag className={cn("scroll-mt-24 font-semibold tracking-tight text-foreground", size)} dangerouslySetInnerHTML={{ __html: b.html || "" }} />;
    }
    case "list": {
      const Tag = b.ordered ? "ol" : "ul";
      return (
        <Tag
          className={cn("space-y-1 pl-6 text-foreground [&_a]:text-primary [&_a]:underline", b.ordered ? "list-decimal" : "list-disc")}
          dangerouslySetInnerHTML={{ __html: b.html || "" }}
        />
      );
    }
    case "quote":
      return (
        <blockquote className="border-l-2 border-primary pl-4">
          <p className="text-lg italic text-foreground" dangerouslySetInnerHTML={{ __html: b.html || "" }} />
          {b.citation ? <cite className="mt-2 block text-sm not-italic text-muted-foreground">— {b.citation}</cite> : null}
        </blockquote>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-lg border border-border bg-[#0F172A] p-4 text-sm text-slate-100">
          <code>{b.code}</code>
        </pre>
      );
    case "image":
      return <ImageView block={b} />;
    case "gallery":
      return <GalleryView block={b} />;
    case "video":
      return <VideoView block={b} />;
    case "audio":
      return <AudioView block={b} />;
    case "file":
      return <FileView block={b} />;
    case "embed":
      return <EmbedView block={b} />;
    case "button":
      return (
        <div className="py-1">
          <Button
            asChild
            variant={b.button?.style === "outline" ? "outline" : b.button?.style === "secondary" ? "secondary" : "default"}
          >
            <a href={b.button?.href || "#"} target={b.button?.newTab ? "_blank" : undefined} rel={b.button?.newTab ? "noopener" : undefined}>
              {b.button?.text || "Button"}
            </a>
          </Button>
        </div>
      );
    case "separator":
      return <hr className="border-border" />;
    case "spacer":
      return <div style={{ height: b.spacerHeight ?? 32 }} aria-hidden />;
    case "cover":
      return <CoverView block={b} />;
    case "columns":
      return (
        <div className={cn("grid gap-6", (b.children?.length ?? 2) >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
          {(b.children ?? []).map((col, i) => (
            <div key={i} className="space-y-4">
              {col.map((child) => (
                <BlockView key={child.id} block={child} />
              ))}
            </div>
          ))}
        </div>
      );
    case "group":
      return (
        <div className="rounded-lg border border-border bg-muted/30 p-5">
          <div className="space-y-4">
            {(b.children?.[0] ?? []).map((child) => (
              <BlockView key={child.id} block={child} />
            ))}
          </div>
        </div>
      );
    case "table":
      return <TableView block={b} />;
    case "faq":
      return (
        <div>
          <Accordion type="single" collapsible className="w-full">
            {(b.faq ?? []).map((f) => (
              <AccordionItem key={f.id} value={f.id}>
                <AccordionTrigger className="text-left text-base font-medium">{f.q || "Question"}</AccordionTrigger>
                <AccordionContent>
                  <div dangerouslySetInnerHTML={{ __html: f.a || "" }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      );
    case "callout": {
      const kind = b.callout?.kind ?? "info";
      const meta = CALLOUT[kind];
      const Icon = meta.icon;
      return (
        <div className={cn("flex gap-3 rounded-lg border p-4", meta.cls)}>
          <Icon className="mt-0.5 h-5 w-5 shrink-0" />
          <div className="space-y-1">
            <p className="font-semibold">{b.callout?.title || meta.label}</p>
            <div className="text-sm [&_a]:underline" dangerouslySetInnerHTML={{ __html: b.callout?.html || "" }} />
          </div>
        </div>
      );
    }
    case "readmore":
      return (
        <div className="relative py-2 text-center">
          <span className="relative z-10 bg-background px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {b.label || "Read more"}
          </span>
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border" />
        </div>
      );
    case "toc":
      return null; // rendered by the preview page from headings
    default:
      return null;
  }
}

function figureCaption(caption?: string) {
  return caption ? <figcaption className="mt-2 text-center text-sm text-muted-foreground">{caption}</figcaption> : null;
}

function ImageView({ block: b }: { block: Block }) {
  const media = useMediaItem(b.image?.mediaId ?? null);
  const img = b.image;
  if (!img) return null;
  const src = media?.url;
  const el = src ? (
    <img
      src={src}
      alt={img.alt || media?.alt || ""}
      style={{ width: img.width || "100%", height: img.height || undefined }}
      className="rounded-lg border border-border object-cover"
    />
  ) : (
    <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border bg-muted text-sm text-muted-foreground">
      No image selected
    </div>
  );
  return (
    <figure className={cn(alignClass[img.align] ?? "mx-auto", "max-w-full")}>
      {img.href ? (
        <a href={img.href} target={img.linkNewTab ? "_blank" : undefined} rel={img.linkNewTab ? "noopener" : undefined}>
          {el}
        </a>
      ) : (
        el
      )}
      {figureCaption(img.caption)}
    </figure>
  );
}

function GalleryView({ block: b }: { block: Block }) {
  const g = b.gallery;
  if (!g) return null;
  return (
    <figure className={cn(alignClass[g.align] ?? "mx-auto")}>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${Math.max(1, g.columns)}, minmax(0, 1fr))` }}
      >
        {g.mediaIds.map((id) => (
          <GalleryImg key={id} id={id} crop={g.crop} captions={g.captions} />
        ))}
        {g.mediaIds.length === 0 ? (
          <div className="col-span-full flex h-32 items-center justify-center rounded-md border border-dashed border-border bg-muted text-sm text-muted-foreground">
            Empty gallery
          </div>
        ) : null}
      </div>
    </figure>
  );
}

function GalleryImg({ id, crop, captions }: { id: string; crop: boolean; captions: boolean }) {
  const media = useMediaItem(id);
  if (!media?.url) return null;
  return (
    <figure>
      <img
        src={media.url}
        alt={media.alt}
        className={cn("w-full rounded-md border border-border", crop ? "aspect-square object-cover" : "object-contain")}
      />
      {captions && media.caption ? (
        <figcaption className="mt-1 text-xs text-muted-foreground">{media.caption}</figcaption>
      ) : null}
    </figure>
  );
}

function VideoView({ block: b }: { block: Block }) {
  const media = useMediaItem(b.media?.mediaId ?? null);
  const src = media?.url || b.media?.url;
  return (
    <figure>
      {src ? (
        <video
          src={src}
          poster={b.media?.poster || undefined}
          controls={b.media?.controls}
          autoPlay={b.media?.autoplay}
          loop={b.media?.loop}
          muted={b.media?.muted}
          className="w-full rounded-lg border border-border bg-black"
        />
      ) : (
        <div className="flex h-56 items-center justify-center rounded-lg border border-dashed border-border bg-muted text-sm text-muted-foreground">
          <Play className="mr-2 h-4 w-4" /> No video selected
        </div>
      )}
      {figureCaption(b.media?.caption)}
    </figure>
  );
}

function AudioView({ block: b }: { block: Block }) {
  const media = useMediaItem(b.media?.mediaId ?? null);
  const src = media?.url || b.media?.url;
  return (
    <figure className="rounded-lg border border-border bg-muted/40 p-4">
      <p className="mb-2 text-sm font-medium">{b.media?.title || media?.caption || "Audio"}</p>
      {src ? (
        <audio src={src} controls={b.media?.controls ?? true} className="w-full" />
      ) : (
        <div className="rounded-md border border-dashed border-border bg-background px-3 py-6 text-center text-sm text-muted-foreground">
          No audio selected
        </div>
      )}
      {figureCaption(b.media?.caption)}
    </figure>
  );
}

function FileView({ block: b }: { block: Block }) {
  const media = useMediaItem(b.file?.mediaId ?? null);
  return (
    <a
      href={media?.url || "#"}
      className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 hover:bg-muted/50"
    >
      <FileDown className="h-5 w-5 text-muted-foreground" />
      <span className="text-sm font-medium">{b.file?.label || media?.filename || "Download file"}</span>
      {media ? <span className="ml-auto text-xs text-muted-foreground">{media.mime}</span> : null}
    </a>
  );
}

function EmbedView({ block: b }: { block: Block }) {
  const e = b.embed;
  if (!e) return null;
  const yt = e.provider === "youtube" ? youtubeId(e.url) : null;
  return (
    <figure>
      {yt ? (
        <div className="aspect-video overflow-hidden rounded-lg border border-border">
          <iframe
            src={`https://www.youtube.com/embed/${yt}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : e.url ? (
        <a
          href={e.url}
          target="_blank"
          rel="noopener"
          className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3 hover:bg-muted"
        >
          <span className="text-sm">
            <span className="font-medium capitalize">{e.provider}</span> embed —{" "}
            <span className="text-muted-foreground">{e.url}</span>
          </span>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </a>
      ) : (
        <div className="flex h-28 items-center justify-center rounded-lg border border-dashed border-border bg-muted text-sm text-muted-foreground">
          No {e.provider} URL
        </div>
      )}
      {figureCaption(e.caption)}
    </figure>
  );
}

function CoverView({ block: b }: { block: Block }) {
  const media = useMediaItem(b.cover?.mediaId ?? null);
  return (
    <div className="relative overflow-hidden rounded-xl border border-border">
      {media?.url ? (
        <img src={media.url} alt="" className="h-64 w-full object-cover" />
      ) : (
        <div className="h-64 w-full bg-gradient-to-br from-primary to-chart-3" />
      )}
      <div className="absolute inset-0 bg-black" style={{ opacity: (b.cover?.overlay ?? 40) / 100 }} />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <p className="text-2xl font-bold text-white">{b.cover?.heading || stripHtml(b.html) || ""}</p>
      </div>
    </div>
  );
}

function TableView({ block: b }: { block: Block }) {
  const t = b.table;
  if (!t) return null;
  const [head, ...rest] = t.rows;
  const bodyRows = t.headerRow ? rest : t.rows;
  const footer = t.footerRow ? bodyRows[bodyRows.length - 1] : null;
  const body = t.footerRow ? bodyRows.slice(0, -1) : bodyRows;
  return (
    <div className={cn("overflow-x-auto", alignClass[t.align])}>
      <table className="w-full border-collapse text-sm">
        {t.headerRow ? (
          <thead>
            <tr>
              {head.map((c, i) => (
                <th key={i} className="border border-border bg-muted px-3 py-2 text-left font-semibold" dangerouslySetInnerHTML={{ __html: c }} />
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri}>
              {row.map((c, ci) => (
                <td key={ci} className="border border-border px-3 py-2" dangerouslySetInnerHTML={{ __html: c }} />
              ))}
            </tr>
          ))}
        </tbody>
        {footer ? (
          <tfoot>
            <tr>
              {footer.map((c, i) => (
                <td key={i} className="border border-border bg-muted/50 px-3 py-2 font-medium" dangerouslySetInnerHTML={{ __html: c }} />
              ))}
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
}

export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m ? m[1] : null;
}
