import { useEffect, useState } from "react";
import type { Block, BloggingState, LinkRef } from "@/blogging/types";
import { seedState } from "@/blogging/data/seed";

/**
 * Blogging → Insights bridge.
 *
 * The /blogging module persists its whole state to localStorage under
 * `infomist.blogging.v1`. The public Insights section (which renders outside the
 * BloggingProvider) reads that same store here, resolves the PUBLISHED posts
 * into a flat article shape, and renders them with the site's design system.
 *
 * One source of truth: publish in /blogging → the post appears in /resources
 * and at /insights/:slug. Drafts / pending / scheduled-in-future never appear.
 */

const STORAGE_KEY = "infomist.blogging.v1";

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: { id: string; name: string; slug: string; color: string };
  authorName: string;
  publishedAt: string;
  dateLabel: string;
  readMinutes: number;
  featureImage: { url: string; alt: string } | null;
  blocks: Block[];
  internalLinks: LinkRef[];
  externalLinks: LinkRef[];
  seo: { title: string; description: string; canonical: string };
}

const CATEGORY_COLOR: Record<string, string> = {
  "ai-automation": "#0EA5E9",
  "web-architecture": "#84CC16",
  "digital-marketing": "#8B5CF6",
  seo: "#F97316",
  saas: "#06B6D4",
};
const FALLBACK_COLOR = "#0EA5E9";

/** stored entities win; seed entities missing by id are added (see store.tsx) */
function mergeById<T extends { id: string }>(seed: T[], stored?: T[]): T[] {
  if (!stored || !Array.isArray(stored)) return seed;
  const have = new Set(stored.map((x) => x.id));
  return [...stored, ...seed.filter((s) => !have.has(s.id))];
}

function readState(): BloggingState {
  if (typeof window === "undefined") return seedState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedState;
    const parsed = JSON.parse(raw) as Partial<BloggingState>;
    return {
      ...seedState,
      ...parsed,
      authors: mergeById(seedState.authors, parsed.authors),
      categories: mergeById(seedState.categories, parsed.categories),
      media: mergeById(seedState.media, parsed.media),
      posts: mergeById(seedState.posts, parsed.posts),
    };
  } catch {
    return seedState;
  }
}

function stripHtml(html = ""): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function readMinutes(blocks: Block[]): number {
  let words = 0;
  const visit = (bs: Block[]) => {
    for (const b of bs) {
      words += stripHtml(b.html).split(" ").filter(Boolean).length;
      if (b.code) words += b.code.split(/\s+/).filter(Boolean).length;
      if (b.callout) words += stripHtml(b.callout.html).split(" ").filter(Boolean).length;
      if (b.children) b.children.forEach(visit);
    }
  };
  visit(blocks);
  return Math.max(1, Math.round(words / 220));
}

function isPublished(status: string, publishedAt: string | null): boolean {
  return status === "published" && !!publishedAt && new Date(publishedAt).getTime() <= Date.now();
}

function toArticle(state: BloggingState, postId: string): InsightArticle | null {
  const post = state.posts.find((p) => p.id === postId);
  if (!post || !isPublished(post.status, post.publishedAt)) return null;

  const author = state.authors.find((a) => a.id === post.authorId);
  const cat = state.categories.find((c) => c.id === post.categoryId);
  const media = post.featuredImageId
    ? state.media.find((m) => m.id === post.featuredImageId)
    : null;

  const excerpt =
    post.excerpt?.trim() ||
    stripHtml(post.blocks.find((b) => b.type === "paragraph")?.html ?? "").slice(0, 180);

  return {
    id: post.id,
    slug: post.slug || post.id,
    title: post.title || "Untitled",
    excerpt,
    category: {
      id: cat?.id ?? "",
      name: cat?.name ?? "Insights",
      slug: cat?.slug ?? "insights",
      color: CATEGORY_COLOR[cat?.slug ?? ""] ?? FALLBACK_COLOR,
    },
    authorName: author?.displayName || author?.name || "Infomist",
    publishedAt: post.publishedAt as string,
    dateLabel: new Date(post.publishedAt as string).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    readMinutes: readMinutes(post.blocks),
    featureImage: media?.url ? { url: media.url, alt: media.alt || post.title } : null,
    blocks: post.blocks,
    internalLinks: post.internalLinks ?? [],
    externalLinks: post.externalLinks ?? [],
    seo: {
      title: post.seo?.title?.trim() || post.title,
      description: post.seo?.description?.trim() || excerpt,
      canonical: post.seo?.canonical?.trim() || "",
    },
  };
}

/** All published articles, newest first. */
export function getPublishedInsights(): InsightArticle[] {
  const state = readState();
  return state.posts
    .filter((p) => isPublished(p.status, p.publishedAt))
    .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime())
    .map((p) => toArticle(state, p.id))
    .filter((a): a is InsightArticle => a !== null);
}

/** Flat media list from the blogging store — for resolving inline images. */
export function getBloggingMedia(): Array<{ id: string; url: string; alt: string }> {
  return readState().media.map((m) => ({ id: m.id, url: m.url, alt: m.alt }));
}

export function getInsightBySlug(slug: string): InsightArticle | null {
  const state = readState();
  const post = state.posts.find((p) => (p.slug || p.id) === slug);
  return post ? toArticle(state, post.id) : null;
}

/** Distinct category names present across published articles (for filter tabs). */
export function publishedCategories(articles: InsightArticle[]): string[] {
  return Array.from(new Set(articles.map((a) => a.category.name)));
}

/** Reactive read — re-reads when another tab writes, or this tab is refocused. */
export function usePublishedInsights(): InsightArticle[] {
  const [articles, setArticles] = useState<InsightArticle[]>(() => getPublishedInsights());

  useEffect(() => {
    const refresh = () => setArticles(getPublishedInsights());
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("visibilitychange", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  return articles;
}
