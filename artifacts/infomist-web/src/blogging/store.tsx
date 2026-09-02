import * as React from "react";
import type {
  Author,
  Block,
  BloggingState,
  Category,
  Comment,
  Media,
  Post,
  PostStatus,
  Settings,
  Tag,
} from "./types";
import { seedState } from "./data/seed";
import { effectiveStatus, slugify, uid } from "./utils/format";

const STORAGE_KEY = "infomist.blogging.v1";

/**
 * Keep every stored entity (user edits win) and add any seed entity whose id
 * isn't present yet, so new starter content — authors, categories, posts —
 * shows up for people who already have saved state. A seed item the user
 * deleted will reappear on reload; that's the intended "starter content" model.
 */
function mergeById<T extends { id: string }>(seed: T[], stored?: T[]): T[] {
  if (!stored || !Array.isArray(stored)) return seed;
  const have = new Set(stored.map((x) => x.id));
  return [...stored, ...seed.filter((s) => !have.has(s.id))];
}

function load(): BloggingState {
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
      tags: mergeById(seedState.tags, parsed.tags),
      media: mergeById(seedState.media, parsed.media),
      posts: mergeById(seedState.posts, parsed.posts),
      settings: { ...seedState.settings, ...(parsed.settings ?? {}) },
    };
  } catch {
    return seedState;
  }
}

function persist(state: BloggingState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota / private mode */
  }
}

/* ── Actions ───────────────────────────────────────────────────────────── */

type Action =
  | { type: "reset" }
  | { type: "post/create"; post: Post }
  | { type: "post/update"; id: string; patch: Partial<Post> }
  | { type: "post/delete"; id: string }
  | { type: "post/duplicate"; id: string }
  | { type: "post/status"; id: string; status: PostStatus; publishedAt?: string | null }
  | { type: "author/create"; author: Author }
  | { type: "author/update"; id: string; patch: Partial<Author> }
  | { type: "author/delete"; id: string }
  | { type: "category/create"; category: Category }
  | { type: "category/update"; id: string; patch: Partial<Category> }
  | { type: "category/delete"; id: string }
  | { type: "tag/create"; tag: Tag }
  | { type: "tag/update"; id: string; patch: Partial<Tag> }
  | { type: "tag/delete"; id: string }
  | { type: "media/create"; media: Media }
  | { type: "media/update"; id: string; patch: Partial<Media> }
  | { type: "media/delete"; id: string }
  | { type: "comment/status"; id: string; status: Comment["status"] }
  | { type: "comment/delete"; id: string }
  | { type: "settings/update"; patch: Partial<Settings> };

function reducer(state: BloggingState, action: Action): BloggingState {
  switch (action.type) {
    case "reset":
      return seedState;

    case "post/create":
      return { ...state, posts: [action.post, ...state.posts] };
    case "post/update":
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.id ? { ...p, ...action.patch, updatedAt: new Date().toISOString() } : p,
        ),
      };
    case "post/delete":
      return { ...state, posts: state.posts.filter((p) => p.id !== action.id) };
    case "post/duplicate": {
      const src = state.posts.find((p) => p.id === action.id);
      if (!src) return state;
      const copy: Post = {
        ...structuredCloneSafe(src),
        id: uid("post"),
        title: `${src.title} (copy)`,
        slug: `${src.slug}-copy`,
        status: "draft",
        publishedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return { ...state, posts: [copy, ...state.posts] };
    }
    case "post/status":
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.id
            ? {
                ...p,
                status: action.status,
                publishedAt:
                  action.publishedAt !== undefined
                    ? action.publishedAt
                    : action.status === "published" && !p.publishedAt
                      ? new Date().toISOString()
                      : p.publishedAt,
                updatedAt: new Date().toISOString(),
              }
            : p,
        ),
      };

    case "author/create":
      return { ...state, authors: [...state.authors, action.author] };
    case "author/update":
      return {
        ...state,
        authors: state.authors.map((a) => (a.id === action.id ? { ...a, ...action.patch } : a)),
      };
    case "author/delete":
      return { ...state, authors: state.authors.filter((a) => a.id !== action.id) };

    case "category/create":
      return { ...state, categories: [...state.categories, action.category] };
    case "category/update":
      return {
        ...state,
        categories: state.categories.map((c) => (c.id === action.id ? { ...c, ...action.patch } : c)),
      };
    case "category/delete":
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.id),
        posts: state.posts.map((p) => ({
          ...p,
          categoryId: p.categoryId === action.id ? null : p.categoryId,
          secondaryCategoryId: p.secondaryCategoryId === action.id ? null : p.secondaryCategoryId,
        })),
      };

    case "tag/create":
      return { ...state, tags: [...state.tags, action.tag] };
    case "tag/update":
      return { ...state, tags: state.tags.map((t) => (t.id === action.id ? { ...t, ...action.patch } : t)) };
    case "tag/delete":
      return {
        ...state,
        tags: state.tags.filter((t) => t.id !== action.id),
        posts: state.posts.map((p) => ({ ...p, tagIds: p.tagIds.filter((id) => id !== action.id) })),
      };

    case "media/create":
      return { ...state, media: [action.media, ...state.media] };
    case "media/update":
      return { ...state, media: state.media.map((m) => (m.id === action.id ? { ...m, ...action.patch } : m)) };
    case "media/delete":
      return { ...state, media: state.media.filter((m) => m.id !== action.id) };

    case "comment/status":
      return {
        ...state,
        comments: state.comments.map((c) => (c.id === action.id ? { ...c, status: action.status } : c)),
      };
    case "comment/delete":
      return { ...state, comments: state.comments.filter((c) => c.id !== action.id) };

    case "settings/update":
      return { ...state, settings: { ...state.settings, ...action.patch } };

    default:
      return state;
  }
}

function structuredCloneSafe<T>(v: T): T {
  return typeof structuredClone === "function" ? structuredClone(v) : JSON.parse(JSON.stringify(v));
}

/* ── Context ───────────────────────────────────────────────────────────── */

interface Ctx {
  state: BloggingState;
  dispatch: React.Dispatch<Action>;
}

const BloggingContext = React.createContext<Ctx | null>(null);

export function BloggingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, undefined, load);

  React.useEffect(() => {
    persist(state);
  }, [state]);

  const value = React.useMemo(() => ({ state, dispatch }), [state]);
  return <BloggingContext.Provider value={value}>{children}</BloggingContext.Provider>;
}

export function useBlogging() {
  const ctx = React.useContext(BloggingContext);
  if (!ctx) throw new Error("useBlogging must be used within <BloggingProvider>");
  return ctx;
}

/* ── Selectors / helpers ───────────────────────────────────────────────── */

export function useAuthors() {
  return useBlogging().state.authors;
}
export function useCategories() {
  return useBlogging().state.categories;
}
export function useTags() {
  return useBlogging().state.tags;
}
export function useMediaLibrary() {
  return useBlogging().state.media;
}
export function usePosts() {
  return useBlogging().state.posts;
}
export function useSettings() {
  return useBlogging().state.settings;
}

export function useAuthor(id: string | null | undefined) {
  return useBlogging().state.authors.find((a) => a.id === id) ?? null;
}
export function useCategory(id: string | null | undefined) {
  return useBlogging().state.categories.find((c) => c.id === id) ?? null;
}
export function usePost(id: string | null | undefined) {
  return useBlogging().state.posts.find((p) => p.id === id) ?? null;
}
export function useMediaItem(id: string | null | undefined) {
  return useBlogging().state.media.find((m) => m.id === id) ?? null;
}

export function usePostCounts() {
  const posts = usePosts();
  const counts = { total: 0, published: 0, draft: 0, pending: 0, scheduled: 0, trash: 0 };
  for (const p of posts) {
    const s = effectiveStatus(p.status, p.publishedAt);
    if (s !== "trash") counts.total += 1;
    counts[s] += 1;
  }
  return counts;
}

/* ── Factories ─────────────────────────────────────────────────────────── */

export function newPost(settings: Settings): Post {
  const nowIso = new Date().toISOString();
  return {
    id: uid("post"),
    title: "",
    slug: "",
    authorId: settings.general.defaultAuthorId,
    categoryId: settings.general.defaultCategoryId,
    secondaryCategoryId: null,
    tagIds: [],
    featuredImageId: null,
    excerpt: "",
    blocks: [{ id: uid("b"), type: "paragraph", html: "" }],
    internalLinks: [],
    externalLinks: [],
    seo: { title: "", description: "", focusKeyword: "", canonical: "" },
    status: "draft",
    visibility: "public",
    allowComments: settings.comments.enabled,
    createdAt: nowIso,
    updatedAt: nowIso,
    publishedAt: null,
  };
}

export { slugify, uid };
export type { Block };
