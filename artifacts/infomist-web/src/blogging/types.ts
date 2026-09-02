/**
 * Blogging module — data model.
 *
 * Everything is frontend-only mock state. IDs are the single source of truth for
 * relationships: a post references an author / categories / tags / media by id,
 * never by embedding their data.
 */

export type PostStatus =
  | "draft"
  | "pending"
  | "scheduled"
  | "published"
  | "trash";

export type Visibility = "public" | "private";

export type AuthorStatus = "active" | "inactive";

export type MediaType = "image" | "video" | "audio" | "document";

export type Alignment = "left" | "center" | "right" | "wide" | "full";

export interface Author {
  id: string;
  name: string;
  displayName: string;
  email: string;
  avatar: string;
  bio: string;
  role: "Editor" | "Author" | "Contributor";
  jobTitle: string;
  expertise: string[];
  social: {
    website?: string;
    linkedin?: string;
    x?: string;
    facebook?: string;
    instagram?: string;
  };
  status: AuthorStatus;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Media {
  id: string;
  filename: string;
  url: string;
  type: MediaType;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
  mime: string;
  size: number; // bytes
  createdAt: string; // ISO
}

/* ── Blocks ─────────────────────────────────────────────────────────────── */

export type BlockType =
  | "paragraph"
  | "heading"
  | "list"
  | "quote"
  | "code"
  | "image"
  | "gallery"
  | "video"
  | "audio"
  | "file"
  | "embed"
  | "button"
  | "columns"
  | "group"
  | "separator"
  | "spacer"
  | "cover"
  | "table"
  | "faq"
  | "callout"
  | "readmore"
  | "toc";

export type EmbedProvider =
  | "youtube"
  | "vimeo"
  | "x"
  | "instagram"
  | "tiktok"
  | "spotify"
  | "reddit"
  | "maps"
  | "generic";

export type CalloutKind = "info" | "tip" | "warning" | "success" | "danger";

export interface ImageValue {
  mediaId: string | null;
  alt: string;
  caption: string;
  align: Alignment;
  width: string; // e.g. "100%" or "640"
  height: string;
  href: string;
  linkNewTab: boolean;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface Block {
  id: string;
  type: BlockType;
  /** Rich-text HTML for text blocks (paragraph, heading, quote, list item container). */
  html?: string;
  /** Heading level. */
  level?: 2 | 3 | 4;
  /** List style. */
  ordered?: boolean;
  align?: Alignment;
  /** quote citation */
  citation?: string;
  /** code */
  code?: string;
  language?: string;
  /** image */
  image?: ImageValue;
  /** gallery */
  gallery?: {
    mediaIds: string[];
    columns: number;
    crop: boolean;
    captions: boolean;
    lightbox: boolean;
    linkTo: "none" | "media";
    align: Alignment;
  };
  /** video / audio */
  media?: {
    mediaId: string | null;
    url: string;
    poster?: string;
    title?: string;
    caption?: string;
    controls: boolean;
    autoplay: boolean;
    loop: boolean;
    muted: boolean;
  };
  /** file */
  file?: { mediaId: string | null; label: string };
  /** embed */
  embed?: { provider: EmbedProvider; url: string; caption?: string };
  /** button / CTA */
  button?: { text: string; href: string; newTab: boolean; style: "primary" | "secondary" | "outline" };
  /** spacer height px */
  spacerHeight?: number;
  /** cover */
  cover?: { mediaId: string | null; heading: string; overlay: number; align: Alignment };
  /** table */
  table?: {
    headerRow: boolean;
    footerRow: boolean;
    align: Alignment;
    rows: string[][];
  };
  /** faq */
  faq?: FaqItem[];
  /** callout */
  callout?: { kind: CalloutKind; title: string; html: string };
  /** columns / group children */
  children?: Block[][];
  /** readmore label */
  label?: string;
}

/* ── SEO ────────────────────────────────────────────────────────────────── */

export interface Seo {
  title: string;
  description: string;
  focusKeyword: string;
  canonical: string;
}

/* ── Post ───────────────────────────────────────────────────────────────── */

export interface Post {
  id: string;
  title: string;
  slug: string;
  authorId: string;
  categoryId: string | null;
  secondaryCategoryId: string | null;
  tagIds: string[];
  featuredImageId: string | null;
  excerpt: string;
  blocks: Block[];
  seo: Seo;
  status: PostStatus;
  visibility: Visibility;
  allowComments: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  publishedAt: string | null; // ISO — future date = scheduled
}

export type CommentStatus = "pending" | "approved" | "spam" | "trash";

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  status: CommentStatus;
  createdAt: string;
}

export interface Settings {
  general: {
    blogName: string;
    blogDescription: string;
    defaultAuthorId: string;
    defaultCategoryId: string;
  };
  writing: { autosave: boolean; defaultEditor: "block" };
  publishing: { approvalRequired: boolean; defaultStatus: PostStatus };
  media: { maxWidth: number; compression: number; webp: boolean };
  seo: { titleTemplate: string; canonicalBase: string; sitemap: boolean; robots: string };
  comments: { enabled: boolean; moderate: boolean };
}

export interface BloggingState {
  authors: Author[];
  categories: Category[];
  tags: Tag[];
  media: Media[];
  posts: Post[];
  comments: Comment[];
  settings: Settings;
}
