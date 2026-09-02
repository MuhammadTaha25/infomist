import type { Author, BloggingState, Block, Category, Comment, Media, Post, Tag } from "../types";
import { placeholderImage } from "../utils/placeholder";

const BASE = import.meta.env.BASE_URL;
const team = (f: string) => `${BASE}team/${f}`;
const now = Date.now();
const iso = (offsetDays: number) => new Date(now + offsetDays * 86400000).toISOString();

/* ── Authors ───────────────────────────────────────────────────────────── */

export const seedAuthors: Author[] = [
  {
    id: "au_taha",
    name: "Muhammad Taha",
    displayName: "Muhammad Taha",
    email: "taha@infomist.com",
    avatar: team("muhammad-taha-software-development-lead.jpg"),
    bio: "Software Development Lead at Infomist. Writes about AI automation, system architecture, and how teams ship reliable software.",
    role: "Editor",
    jobTitle: "Software Development Lead",
    expertise: ["AI", "Automation", "SaaS", "Architecture"],
    social: { website: "https://infomist.com", linkedin: "https://linkedin.com/in/muhammadtaha", x: "https://x.com/mtaha" },
    status: "active",
  },
  {
    id: "au_hajra",
    name: "Hajra Naz",
    displayName: "Hajra Naz",
    email: "hajra@infomist.com",
    avatar: team("hajra-naz-content-seo-lead.jpg"),
    bio: "Content & SEO Lead. Focused on search experience, technical SEO, and content that ranks and converts.",
    role: "Author",
    jobTitle: "Content & SEO Lead",
    expertise: ["SEO", "Content", "Digital Marketing"],
    social: { linkedin: "https://linkedin.com/in/hajranaz", x: "https://x.com/hajra" },
    status: "active",
  },
  {
    id: "au_hassan",
    name: "Hassan Khan",
    displayName: "Hassan Khan",
    email: "hassan@infomist.com",
    avatar: team("hadi-khan-creative-lead.jpg"),
    bio: "Web architecture and performance. Writes about scalable frontends, APIs, and deployment.",
    role: "Author",
    jobTitle: "Web Architecture Lead",
    expertise: ["Web Architecture", "Performance", "APIs"],
    social: { linkedin: "https://linkedin.com/in/hassankhan" },
    status: "active",
  },
  {
    id: "au_moiz",
    name: "Moiz Ali",
    displayName: "Moiz Ali",
    email: "moiz@infomist.com",
    avatar: team("murtaza-majid-ai-lead.jpg"),
    bio: "Contributor covering applied machine learning and LLM tooling.",
    role: "Contributor",
    jobTitle: "ML Engineer",
    expertise: ["Machine Learning", "LLM"],
    social: { x: "https://x.com/moiz" },
    status: "active",
  },
];

/* ── Categories ────────────────────────────────────────────────────────── */

export const seedCategories: Category[] = [
  { id: "cat_ai", name: "AI Automation", slug: "ai-automation", description: "AI-driven workflows, agents, and automation.", parentId: null },
  { id: "cat_web", name: "Web Architecture", slug: "web-architecture", description: "Scalable frontends, APIs, and infrastructure.", parentId: null },
  { id: "cat_dm", name: "Digital Marketing", slug: "digital-marketing", description: "Growth, campaigns, and demand generation.", parentId: null },
  { id: "cat_seo", name: "SEO", slug: "seo", description: "Technical SEO, content strategy, and search experience.", parentId: null },
  { id: "cat_saas", name: "SaaS", slug: "saas", description: "Building, scaling, and operating SaaS products.", parentId: null },
];

/* ── Tags ──────────────────────────────────────────────────────────────── */

export const seedTags: Tag[] = [
  { id: "tag_ai", name: "AI", slug: "ai" },
  { id: "tag_auto", name: "Automation", slug: "automation" },
  { id: "tag_aint", name: "Artificial Intelligence", slug: "artificial-intelligence" },
  { id: "tag_saas", name: "SaaS", slug: "saas" },
  { id: "tag_bizauto", name: "Business Automation", slug: "business-automation" },
  { id: "tag_prod", name: "Productivity", slug: "productivity" },
  { id: "tag_llm", name: "LLM", slug: "llm" },
  { id: "tag_recruit", name: "Recruitment", slug: "recruitment" },
];

/* ── Media ─────────────────────────────────────────────────────────────── */

export const seedMedia: Media[] = [
  img("md_featured", "ai-automation-hero.png", "ai-automation-hero", "AI automation transforming a modern business workflow"),
  img("md_inline1", "workflow-diagram.png", "workflow-diagram", "Diagram of an AI-assisted content workflow"),
  img("md_inline2", "team-dashboard.png", "team-dashboard", "Team reviewing an automation dashboard"),
  img("md_g1", "gallery-agents.png", "gallery-agents", "Autonomous agents orchestration"),
  img("md_g2", "gallery-pipeline.png", "gallery-pipeline", "Data pipeline visualization"),
  img("md_g3", "gallery-metrics.png", "gallery-metrics", "Productivity metrics dashboard"),
  img("md_g4", "gallery-support.png", "gallery-support", "AI customer support console"),
  img("md_link", "roi-chart.png", "roi-chart", "ROI chart for automation initiatives"),
  {
    id: "md_video",
    filename: "automation-explainer.mp4",
    url: "https://cdn.jsdelivr.net/npm/big-buck-bunny-1080p@1.0.0/video.mp4",
    type: "video",
    alt: "",
    caption: "Automation explainer",
    mime: "video/mp4",
    size: 5_200_000,
    createdAt: iso(-12),
  },
  {
    id: "md_audio",
    filename: "podcast-ep-14.mp3",
    url: "",
    type: "audio",
    alt: "",
    caption: "The Automation Podcast — Episode 14",
    mime: "audio/mpeg",
    size: 8_100_000,
    createdAt: iso(-9),
  },
  {
    id: "md_doc",
    filename: "ai-automation-playbook.pdf",
    url: "",
    type: "document",
    alt: "",
    caption: "AI Automation Playbook (PDF)",
    mime: "application/pdf",
    size: 2_400_000,
    createdAt: iso(-7),
  },
];

function img(id: string, filename: string, seed: string, alt: string): Media {
  return {
    id,
    filename,
    url: placeholderImage(seed, 1200, 675, alt.split(" ").slice(0, 3).join(" ")),
    type: "image",
    alt,
    caption: alt,
    width: 1200,
    height: 675,
    mime: "image/png",
    size: 480_000 + seed.length * 900,
    createdAt: iso(-14),
  };
}

/* ── Demo post blocks ──────────────────────────────────────────────────── */

const demoBlocks: Block[] = [
  { id: "b1", type: "heading", level: 2, html: "Why AI automation matters now" },
  {
    id: "b2",
    type: "paragraph",
    html:
      "AI automation is changing how modern businesses handle repetitive work — customer support, marketing operations, research, and internal processes. Instead of hiring linearly to keep up with volume, teams are wiring <strong>language models</strong> and <strong>deterministic workflows</strong> together to absorb the load.",
  },
  {
    id: "b3",
    type: "paragraph",
    html:
      "This guide walks through where automation pays off, how to roll it out without breaking trust, and what to measure. For a deeper primer on the hiring side, see our <a data-internal=\"true\" data-slug=\"ai-recruitment-automation-guide\" href=\"/blog/ai-recruitment-automation-guide/\">AI Recruitment Automation Guide</a>.",
  },
  { id: "b4", type: "image", image: { mediaId: "md_inline1", alt: "AI-assisted content workflow", caption: "A typical AI-assisted workflow: draft → human edit → review → publish.", align: "full", width: "100%", height: "", href: "", linkNewTab: false } },
  { id: "b5", type: "heading", level: 3, html: "The three layers of a good automation" },
  {
    id: "b6",
    type: "list",
    ordered: false,
    html: "<li><strong>Trigger</strong> — an event worth reacting to (a form submission, a new ticket, a scheduled run).</li><li><strong>Reasoning</strong> — an LLM step that classifies, drafts, or decides.</li><li><strong>Action</strong> — a deterministic write to a system of record, always reversible.</li>",
  },
  {
    id: "b7",
    type: "list",
    ordered: true,
    html: "<li>Map the current manual process end to end.</li><li>Automate the highest-volume, lowest-risk step first.</li><li>Keep a human approval gate until confidence is proven.</li><li>Expand scope only after error rates are measured.</li>",
  },
  {
    id: "b8",
    type: "quote",
    html: "Artificial intelligence is changing how businesses work — the winners treat it as an operations discipline, not a demo.",
    citation: "Muhammad Taha, Software Development Lead",
  },
  {
    id: "b9",
    type: "image",
    image: { mediaId: "md_link", alt: "ROI chart for automation initiatives", caption: "Cumulative hours saved across six automated workflows.", align: "center", width: "720", height: "", href: "https://example.com/roi-report", linkNewTab: true },
  },
  { id: "b10", type: "heading", level: 3, html: "A gallery of real deployments" },
  {
    id: "b11",
    type: "gallery",
    gallery: { mediaIds: ["md_g1", "md_g2", "md_g3", "md_g4"], columns: 2, crop: true, captions: false, lightbox: true, linkTo: "media", align: "wide" },
  },
  {
    id: "b12",
    type: "table",
    table: {
      headerRow: true,
      footerRow: false,
      align: "wide",
      rows: [
        ["Workflow", "Status", "Hours saved / week"],
        ["Support triage", "Active", "18"],
        ["Content drafting", "Active", "12"],
        ["Lead enrichment", "Piloting", "6"],
        ["Invoice matching", "Planned", "—"],
      ],
    },
  },
  {
    id: "b13",
    type: "callout",
    callout: { kind: "tip", title: "Pro tip", html: "Optimize images and cache LLM responses before you scale a workflow — cost and latency compound fast." },
  },
  {
    id: "b14",
    type: "callout",
    callout: { kind: "warning", title: "Watch out", html: "Never let an AI step perform an irreversible action (delete, send, pay) without a human gate or an undo path." },
  },
  {
    id: "b15",
    type: "code",
    language: "typescript",
    code:
      "// A minimal reasoning step with a human gate\nasync function draftReply(ticket: Ticket) {\n  const draft = await llm.summarize(ticket.thread);\n  return { draft, status: \"pending_review\" as const };\n}",
  },
  {
    id: "b16",
    type: "embed",
    embed: { provider: "youtube", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", caption: "Automation explainer (2 min)" },
  },
  {
    id: "b17",
    type: "paragraph",
    html:
      "The tooling landscape moves quickly. The <a href=\"https://platform.openai.com/docs\" data-external=\"true\" rel=\"noopener\" target=\"_blank\">OpenAI API documentation</a> is a good reference for model capabilities and rate limits.",
  },
  {
    id: "b18",
    type: "button",
    button: { text: "Book an automation audit", href: "/contact", newTab: false, style: "primary" },
  },
  {
    id: "b19",
    type: "readmore",
    label: "Continue reading",
  },
  {
    id: "b20",
    type: "faq",
    faq: [
      { id: "f1", q: "Is AI automation only for large companies?", a: "No. Small teams often see the fastest ROI because a single automated workflow removes a meaningful share of their manual work." },
      { id: "f2", q: "Will automation replace my team?", a: "In practice it shifts people from repetitive execution to review, exception handling, and higher-judgment work." },
      { id: "f3", q: "How do I measure success?", a: "Track hours saved, error rate versus the manual baseline, and cycle time from trigger to completed action." },
    ],
  },
];

/* ── Posts ─────────────────────────────────────────────────────────────── */

const p = (over: Partial<Post> & Pick<Post, "id" | "title" | "authorId" | "status">): Post => ({
  categoryId: "cat_ai",
  secondaryCategoryId: null,
  tagIds: [],
  featuredImageId: null,
  excerpt: "",
  blocks: [{ id: "p", type: "paragraph", html: "" }],
  seo: { title: "", description: "", focusKeyword: "", canonical: "" },
  visibility: "public",
  allowComments: true,
  createdAt: iso(-20),
  updatedAt: iso(-1),
  publishedAt: null,
  ...over,
  slug: over.slug || slugFromTitle(over.title),
});

function slugFromTitle(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export const seedPosts: Post[] = [
  p({
    id: "post_demo",
    title: "How AI Automation Is Transforming Modern Businesses in 2026",
    authorId: "au_taha",
    categoryId: "cat_ai",
    secondaryCategoryId: "cat_saas",
    tagIds: ["tag_ai", "tag_auto", "tag_aint", "tag_saas", "tag_bizauto", "tag_prod", "tag_llm"],
    featuredImageId: "md_featured",
    excerpt:
      "AI automation is changing how modern businesses handle repetitive work, customer support, marketing, research, and internal operations. This guide explains how companies can use AI-powered workflows to improve productivity and scale efficiently.",
    blocks: demoBlocks,
    seo: {
      title: "How AI Automation Is Transforming Modern Businesses in 2026",
      description:
        "Discover how AI automation is transforming business workflows, improving productivity, and helping companies scale in 2026.",
      focusKeyword: "AI automation",
      canonical: "https://infomist.com/blog/how-ai-automation-is-transforming-modern-businesses-in-2026/",
    },
    status: "published",
    publishedAt: iso(-2),
  }),
  p({
    id: "post_llm",
    title: "The Future of LLMs in Production Systems",
    authorId: "au_moiz",
    categoryId: "cat_ai",
    tagIds: ["tag_llm", "tag_ai"],
    featuredImageId: "md_g1",
    excerpt: "Where large language models are heading and what it means for teams shipping real products.",
    status: "draft",
    updatedAt: iso(0),
  }),
  p({
    id: "post_trends",
    title: "AI Automation Trends to Watch This Quarter",
    authorId: "au_taha",
    categoryId: "cat_saas",
    secondaryCategoryId: "cat_ai",
    tagIds: ["tag_auto", "tag_saas", "tag_bizauto"],
    featuredImageId: "md_g2",
    excerpt: "A short field guide to the automation patterns showing up across SaaS teams.",
    status: "scheduled",
    publishedAt: iso(6),
  }),
  p({
    id: "post_seo",
    title: "Technical SEO for JavaScript-Heavy Marketing Sites",
    authorId: "au_hajra",
    categoryId: "cat_seo",
    tagIds: ["tag_prod"],
    featuredImageId: "md_g3",
    excerpt: "Rendering, indexation, and Core Web Vitals for React and Vite marketing sites.",
    status: "pending",
    updatedAt: iso(-1),
  }),
  p({
    id: "post_arch",
    title: "Designing an API Layer Your Frontend Will Actually Enjoy",
    authorId: "au_hassan",
    categoryId: "cat_web",
    tagIds: ["tag_saas"],
    featuredImageId: "md_g4",
    excerpt: "Contract-first APIs, typed clients, and the ergonomics that make integration painless.",
    status: "published",
    publishedAt: iso(-8),
  }),
  p({
    id: "post_recruit",
    title: "AI Recruitment Automation Guide",
    slug: "ai-recruitment-automation-guide",
    authorId: "au_hajra",
    categoryId: "cat_ai",
    secondaryCategoryId: "cat_dm",
    tagIds: ["tag_ai", "tag_recruit", "tag_auto"],
    featuredImageId: "md_inline2",
    excerpt: "How AI is transforming modern recruitment and what businesses need to know about AI-powered hiring.",
    status: "published",
    publishedAt: iso(-16),
  }),
  p({
    id: "post_dm",
    title: "Building a Demand Engine with Automated Content Ops",
    authorId: "au_hajra",
    categoryId: "cat_dm",
    tagIds: ["tag_auto", "tag_prod"],
    featuredImageId: "md_g2",
    excerpt: "A repeatable pipeline for research, drafting, review, and distribution.",
    status: "draft",
    updatedAt: iso(-3),
  }),
  p({
    id: "post_old",
    title: "Legacy: Our First Automation Experiment",
    authorId: "au_taha",
    categoryId: "cat_ai",
    tagIds: ["tag_auto"],
    excerpt: "An early retro we keep around for reference.",
    status: "trash",
    updatedAt: iso(-40),
  }),
];

/* ── Comments ──────────────────────────────────────────────────────────── */

export const seedComments: Comment[] = [
  { id: "cm1", postId: "post_demo", author: "Sarah Lin", email: "sarah@example.com", content: "This matches what we saw rolling out support triage — the human gate was the key.", status: "approved", createdAt: iso(-1) },
  { id: "cm2", postId: "post_demo", author: "devops_jay", email: "jay@example.com", content: "Would love a follow-up on cost control for the reasoning layer.", status: "pending", createdAt: iso(0) },
  { id: "cm3", postId: "post_arch", author: "anon", email: "spam@example.com", content: "Cheap watches buy now!!!", status: "spam", createdAt: iso(-2) },
  { id: "cm4", postId: "post_recruit", author: "Hina R.", email: "hina@example.com", content: "Shared this with our talent team, thank you.", status: "approved", createdAt: iso(-10) },
];

/* ── Settings ──────────────────────────────────────────────────────────── */

export const seedState: BloggingState = {
  authors: seedAuthors,
  categories: seedCategories,
  tags: seedTags,
  media: seedMedia,
  posts: seedPosts,
  comments: seedComments,
  settings: {
    general: {
      blogName: "Infomist Insights",
      blogDescription: "Engineering notes on AI automation, web architecture, marketing, SEO, and SaaS.",
      defaultAuthorId: "au_taha",
      defaultCategoryId: "cat_ai",
    },
    writing: { autosave: true, defaultEditor: "block" },
    publishing: { approvalRequired: true, defaultStatus: "draft" },
    media: { maxWidth: 1600, compression: 78, webp: true },
    seo: {
      titleTemplate: "%title% | Infomist",
      canonicalBase: "https://infomist.com/blog",
      sitemap: true,
      robots: "index, follow",
    },
    comments: { enabled: true, moderate: true },
  },
};
