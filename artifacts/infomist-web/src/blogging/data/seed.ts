import type { Author, BloggingState, Block, Category, Comment, Media, Post, Tag } from "../types";
import { placeholderImage } from "../utils/placeholder";

const BASE = import.meta.env.BASE_URL;
const team = (f: string) => `${BASE}team/${f}`;
const now = Date.now();
const iso = (offsetDays: number) => new Date(now + offsetDays * 86400000).toISOString();

/* ── Authors ───────────────────────────────────────────────────────────── */

/**
 * Authors are represented by name only — no profile photos or avatars.
 * There is NO author → category restriction anywhere: any author may create and
 * publish a post in any Automation Library category.
 */
function author(id: string, name: string): Author {
  return {
    id,
    name,
    displayName: name,
    email: `${name.toLowerCase().replace(/[^a-z]+/g, ".")}@infomist.com`,
    avatar: "",
    bio: `${name} writes for the Infomist Automation Library.`,
    role: "Author",
    jobTitle: "",
    expertise: [],
    social: {},
    status: "active",
  };
}

export const seedAuthors: Author[] = [
  author("au_hajra", "Hajra Naz"),
  author("au_hassan", "Hassan Khan"),
  author("au_moiz", "Moiz Ali"),
  author("au_ahmed", "Ahmed Ibrahim"),
  author("au_momina", "Momina Tauqeer"),
  author("au_ayesha", "Ayesha Fiaz"),
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

/** Real branded feature image shipped in /public/insights. */
function feat(id: string, slug: string, alt: string): Media {
  return {
    id,
    filename: `${slug}.jpg`,
    url: `${BASE}insights/${slug}.jpg`,
    type: "image",
    alt,
    caption: alt,
    width: 1200,
    height: 675,
    mime: "image/jpeg",
    size: 90_000,
    createdAt: iso(-10),
  };
}

export const featureMedia: Media[] = [
  feat("md_ins_ops", "ai-automation-operations", "AI automation for operations teams"),
  feat("md_ins_web", "ai-automation-web-architecture", "Architecting systems for AI automation"),
  feat("md_ins_dm", "ai-automation-digital-marketing", "AI automation in the marketing stack"),
  feat("md_ins_seo", "ai-automation-seo", "How AI automation reshapes SEO work"),
  feat("md_ins_saas", "ai-automation-saas", "Building AI automation into SaaS products"),
];

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
    citation: "The Infomist Automation Library",
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
  internalLinks: [],
  externalLinks: [],
  seo: { title: "", description: "", focusKeyword: "", canonical: "" },
  visibility: "public",
  allowComments: true,
  createdAt: iso(-20),
  updatedAt: iso(-1),
  publishedAt: null,
  ...over,
  slug: over.slug || slugFromTitle(over.title),
});

let _bid = 0;
const bid = () => `lb_${(++_bid).toString(36)}`;

/** Body for an AI-automation Automation Library post, themed per category. */
function libBlocks(opts: {
  lead: string;
  where: string;
  bullets: string[];
  steps: string[];
  quote: string;
  quoteBy: string;
  cta: { text: string; href: string };
  ext: { label: string; href: string };
}): Block[] {
  return [
    { id: bid(), type: "heading", level: 2, html: "Why this matters now" },
    { id: bid(), type: "paragraph", html: opts.lead },
    {
      id: bid(),
      type: "paragraph",
      html: `${opts.where} For the strategic picture, see <a data-internal="true" href="/who-we-work-with">Who We Work With</a> and our <a data-internal="true" href="/solutions/ai-automation-services">AI Automation Services</a>.`,
    },
    { id: bid(), type: "heading", level: 3, html: "Where AI automation earns its place" },
    { id: bid(), type: "list", ordered: false, html: opts.bullets.map((b) => `<li>${b}</li>`).join("") },
    { id: bid(), type: "heading", level: 3, html: "A rollout that doesn't break trust" },
    { id: bid(), type: "list", ordered: true, html: opts.steps.map((s) => `<li>${s}</li>`).join("") },
    {
      id: bid(),
      type: "callout",
      callout: { kind: "warning", title: "Keep a human gate", html: "Never let an AI step take an irreversible action — send, pay, delete — without a person in the loop or a clean undo path." },
    },
    { id: bid(), type: "quote", html: opts.quote, citation: opts.quoteBy },
    {
      id: bid(),
      type: "paragraph",
      html: `Further reading: <a data-external="true" rel="noopener" target="_blank" href="${opts.ext.href}">${opts.ext.label}</a>. When you're ready to scope this for your own stack, our team can help — <a data-internal="true" href="/case-studies">see related work</a>.`,
    },
    { id: bid(), type: "button", button: { text: opts.cta.text, href: opts.cta.href, newTab: false, style: "primary" } },
  ];
}

function slugFromTitle(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/**
 * Automation Library — one published AI-automation article per category.
 * Each is authored by a different one of the six authors to demonstrate that
 * any author can publish in any category (no author → category mapping).
 */
const libraryPosts: Post[] = [
  p({
    id: "lib_ai",
    title: "AI Automation for Operations Teams: A Practical Playbook",
    authorId: "au_hajra",
    status: "published",
    publishedAt: iso(-1),
    categoryId: "cat_ai",
    tagIds: ["tag_ai", "tag_auto", "tag_bizauto"],
    featuredImageId: "md_ins_ops",
    excerpt:
      "Where AI automation actually pays off for operations teams, how to roll it out without breaking trust, and what to measure once it's live.",
    internalLinks: [
      { id: "il1", label: "AI Automation Services", href: "/solutions/ai-automation-services" },
      { id: "il2", label: "Business Process Automation", href: "/solutions/business-process-automation" },
      { id: "il3", label: "For COOs & Operations Managers", href: "/who-we-work-with/coos-operations" },
      { id: "il4", label: "Case studies", href: "/case-studies" },
    ],
    externalLinks: [
      { id: "el1", label: "OpenAI API documentation", href: "https://platform.openai.com/docs" },
    ],
    blocks: libBlocks({
      lead:
        "Operations teams lose the most time to the same handful of tasks: triaging inbound requests, moving data between systems, chasing approvals, and compiling reports. AI automation is a way to absorb that load without hiring linearly against volume.",
      where:
        "The goal is not to replace judgement — it is to remove the repetitive execution around it so the team spends its time on exceptions and decisions.",
      bullets: [
        "<strong>Request triage</strong> — classify and route inbound tickets, emails, or forms to the right owner.",
        "<strong>Data movement</strong> — keep records in sync across the CRM, spreadsheets, and internal tools.",
        "<strong>Drafting</strong> — first-pass replies, summaries, and status updates for a human to approve.",
        "<strong>Reporting</strong> — assemble the weekly numbers from the systems that already hold them.",
      ],
      steps: [
        "Map the current manual process end to end and time each step.",
        "Automate the highest-volume, lowest-risk step first.",
        "Keep a human approval gate until the error rate is measured against the manual baseline.",
        "Expand scope only after the numbers hold.",
      ],
      quote:
        "The teams that win with AI automation treat it as an operations discipline, not a demo — they measure hours recovered and error rate, not novelty.",
      quoteBy: "The Infomist Automation Library",
      cta: { text: "Talk to a Strategist about automating operations", href: "/talk-to-strategist" },
      ext: { label: "OpenAI API documentation", href: "https://platform.openai.com/docs" },
    }),
    seo: {
      title: "AI Automation for Operations Teams: A Practical Playbook",
      description:
        "Where AI automation pays off for operations teams, how to roll it out with a human gate, and what to measure once it's live.",
      focusKeyword: "AI automation operations",
      canonical: "",
    },
  }),
  p({
    id: "lib_web",
    title: "Architecting Systems That Are Ready for AI Automation",
    authorId: "au_hassan",
    status: "published",
    publishedAt: iso(-3),
    categoryId: "cat_web",
    tagIds: ["tag_ai", "tag_auto", "tag_saas"],
    featuredImageId: "md_ins_web",
    excerpt:
      "The architectural choices — clean interfaces, idempotency, observability — that decide whether AI automation is safe to add later.",
    internalLinks: [
      { id: "il1", label: "System Integration", href: "/solutions/system-integration" },
      { id: "il2", label: "Custom Software Development", href: "/solutions/custom-software-development" },
      { id: "il3", label: "For CTOs & VPs of Engineering", href: "/who-we-work-with/ctos-engineering" },
    ],
    externalLinks: [
      { id: "el1", label: "martinfowler.com — articles on architecture", href: "https://martinfowler.com/articles/" },
    ],
    blocks: libBlocks({
      lead:
        "AI automation is usually added to a system that already exists. Whether that goes well is decided long before the first LLM call — by whether the system has clean interfaces, reversible writes, and enough observability to see what an automated step actually did.",
      where:
        "Treat every automated action as something that will occasionally be wrong, and design so that being wrong is cheap to detect and undo.",
      bullets: [
        "<strong>Clean interfaces</strong> — an automated step calls the same documented API a person would.",
        "<strong>Idempotency</strong> — retries and duplicate triggers don't create duplicate side effects.",
        "<strong>Reversibility</strong> — every write has an undo path or an approval gate.",
        "<strong>Observability</strong> — structured logs and traces for every automated decision and action.",
      ],
      steps: [
        "Inventory the systems an automation would touch and the contracts between them.",
        "Add the API surface and events an automated step needs — before wiring the AI.",
        "Ship one automation behind a feature flag with full tracing.",
        "Only widen scope once you can answer 'what did it do and why' from the logs.",
      ],
      quote:
        "The model is the easy part. The architecture around it — retries, gates, traces — is what makes automation safe to run unattended.",
      quoteBy: "The Infomist Automation Library",
      cta: { text: "Talk to a Strategist about your architecture", href: "/talk-to-strategist" },
      ext: { label: "martinfowler.com — articles on architecture", href: "https://martinfowler.com/articles/" },
    }),
    seo: {
      title: "Architecting Systems That Are Ready for AI Automation",
      description:
        "Clean interfaces, idempotency, reversibility, and observability — the architecture that makes AI automation safe to add.",
      focusKeyword: "AI automation architecture",
      canonical: "",
    },
  }),
  p({
    id: "lib_dm",
    title: "AI Automation in the Marketing Stack, Without the Hype",
    authorId: "au_ahmed",
    status: "published",
    publishedAt: iso(-5),
    categoryId: "cat_dm",
    tagIds: ["tag_auto", "tag_prod", "tag_bizauto"],
    featuredImageId: "md_ins_dm",
    excerpt:
      "Which marketing tasks are worth automating with AI, which aren't, and how to keep quality and brand voice intact.",
    internalLinks: [
      { id: "il1", label: "Digital Marketing Agency", href: "/solutions/digital-marketing-agency" },
      { id: "il2", label: "Content Marketing Services", href: "/solutions/content-marketing-services" },
      { id: "il3", label: "For CMOs & Marketing Leads", href: "/who-we-work-with/cmos-marketing" },
    ],
    externalLinks: [
      { id: "el1", label: "Google Search Central documentation", href: "https://developers.google.com/search/docs" },
    ],
    blocks: libBlocks({
      lead:
        "Most marketing teams don't need an AI strategy — they need a few specific tasks off their plate so they can spend more time on positioning, offers, and analysis. AI automation is best used narrowly here.",
      where:
        "Automate the repetitive production and operations work; keep humans on strategy, judgement, and anything that carries the brand's voice into the world unchecked.",
      bullets: [
        "<strong>Research briefs</strong> — assemble competitor and SERP context for a writer to work from.",
        "<strong>Repurposing</strong> — turn one asset into the formats each channel needs.",
        "<strong>Lifecycle ops</strong> — routing, tagging, and reporting across the martech stack.",
        "<strong>QA passes</strong> — flag broken links, missing alt text, and off-brand phrasing before publish.",
      ],
      steps: [
        "Agree what a qualified lead is with sales before automating anything upstream.",
        "Automate one production task and measure time saved and revision rate.",
        "Put a brand-review gate in front of anything customer-facing.",
        "Scale the tasks that hold quality; drop the ones that don't.",
      ],
      quote:
        "Automation should make the calendar easier to keep, not fill it with content nobody asked for. Measure it against pipeline, not output.",
      quoteBy: "The Infomist Automation Library",
      cta: { text: "Talk to a Strategist about your marketing ops", href: "/talk-to-strategist" },
      ext: { label: "Google Search Central documentation", href: "https://developers.google.com/search/docs" },
    }),
    seo: {
      title: "AI Automation in the Marketing Stack, Without the Hype",
      description:
        "Which marketing tasks are worth automating with AI, which aren't, and how to keep quality and brand voice intact.",
      focusKeyword: "AI automation marketing",
      canonical: "",
    },
  }),
  p({
    id: "lib_seo",
    title: "How AI Automation Is Changing Day-to-Day SEO Work",
    authorId: "au_momina",
    status: "published",
    publishedAt: iso(-8),
    categoryId: "cat_seo",
    tagIds: ["tag_auto", "tag_prod"],
    featuredImageId: "md_ins_seo",
    excerpt:
      "The SEO tasks AI automation genuinely speeds up — audits, internal linking, content briefs — and the ones it still can't be trusted with.",
    internalLinks: [
      { id: "il1", label: "SEO Services", href: "/solutions/seo-services" },
      { id: "il2", label: "Conversion Rate Optimization", href: "/solutions/conversion-rate-optimization" },
      { id: "il3", label: "For CMOs & Marketing Leads", href: "/who-we-work-with/cmos-marketing" },
    ],
    externalLinks: [
      { id: "el1", label: "Google Search Central documentation", href: "https://developers.google.com/search/docs" },
    ],
    blocks: libBlocks({
      lead:
        "SEO has always had a large repetitive component — crawling, checking, cross-referencing, and compiling. That is exactly the part AI automation is good at. The strategy and editorial judgement still sit with a person.",
      where:
        "Use automation to widen how much of the site and the SERP you can actually look at; keep the decisions about what to publish and how to position it with the team.",
      bullets: [
        "<strong>Technical audits</strong> — crawl for broken links, redirect chains, thin pages, and missing metadata.",
        "<strong>Internal linking</strong> — surface relevant link opportunities between existing pages.",
        "<strong>Content briefs</strong> — assemble intent, entities, and competitor coverage for a writer.",
        "<strong>Monitoring</strong> — watch rankings and index status for the pages that drive revenue.",
      ],
      steps: [
        "Baseline the site: crawl, Core Web Vitals, and index coverage.",
        "Automate the recurring checks so regressions surface within a day.",
        "Keep a human editor on every brief and every published page.",
        "Review rankings against revenue pages, not vanity keywords.",
      ],
      quote:
        "AI automation lets a small SEO team behave like a much larger one — but only for the mechanical work. Editorial judgement doesn't scale that way.",
      quoteBy: "The Infomist Automation Library",
      cta: { text: "Talk to a Strategist about SEO", href: "/talk-to-strategist" },
      ext: { label: "Google Search Central documentation", href: "https://developers.google.com/search/docs" },
    }),
    seo: {
      title: "How AI Automation Is Changing Day-to-Day SEO Work",
      description:
        "The SEO tasks AI automation genuinely speeds up — audits, internal linking, briefs — and the ones it can't be trusted with.",
      focusKeyword: "AI automation SEO",
      canonical: "",
    },
  }),
  p({
    id: "lib_saas",
    title: "Building AI Automation Into Your SaaS Product",
    authorId: "au_ayesha",
    status: "published",
    publishedAt: iso(-11),
    categoryId: "cat_saas",
    tagIds: ["tag_ai", "tag_saas", "tag_auto", "tag_llm"],
    featuredImageId: "md_ins_saas",
    excerpt:
      "Turning AI automation from an internal tool into a product feature — evaluation, guardrails, pricing, and the failure modes to plan for.",
    internalLinks: [
      { id: "il1", label: "SaaS Development", href: "/solutions/saas-development" },
      { id: "il2", label: "Autonomous AI Agents", href: "/solutions/autonomous-ai-agents" },
      { id: "il3", label: "For CTOs & VPs of Engineering", href: "/who-we-work-with/ctos-engineering" },
    ],
    externalLinks: [
      { id: "el1", label: "Anthropic documentation", href: "https://docs.anthropic.com" },
    ],
    blocks: libBlocks({
      lead:
        "Shipping AI automation as a feature in your SaaS product is a different problem from running it internally. Now the failure modes are your customers' problem, the latency is on your critical path, and the cost scales with usage.",
      where:
        "Design the feature around an evaluation harness and clear guardrails from day one — retrofitting them after launch is expensive.",
      bullets: [
        "<strong>Evaluation</strong> — a test set and metrics you can run on every prompt or model change.",
        "<strong>Guardrails</strong> — input validation, output checks, and a fallback when confidence is low.",
        "<strong>Cost controls</strong> — caching, smaller models for easy cases, and per-account limits.",
        "<strong>Transparency</strong> — show the user what the automation did and let them correct it.",
      ],
      steps: [
        "Pick one use case with a measurable outcome and build the eval set first.",
        "Prototype against real customer data with a human in the loop.",
        "Add guardrails, monitoring, and a feedback path before general availability.",
        "Expand from the proven case rather than launching a broad 'AI' surface.",
      ],
      quote:
        "In a product, the AI is only as good as the evaluation and guardrails around it. That scaffolding is the feature — the model is a dependency.",
      quoteBy: "The Infomist Automation Library",
      cta: { text: "Talk to a Strategist about your product", href: "/talk-to-strategist" },
      ext: { label: "Anthropic documentation", href: "https://docs.anthropic.com" },
    }),
    seo: {
      title: "Building AI Automation Into Your SaaS Product",
      description:
        "Turning AI automation into a product feature — evaluation, guardrails, cost control, and the failure modes to plan for.",
      focusKeyword: "AI automation SaaS",
      canonical: "",
    },
  }),
];

export const seedPosts: Post[] = [
  ...libraryPosts,
  p({
    id: "post_demo",
    title: "How AI Automation Is Transforming Modern Businesses in 2026",
    authorId: "au_hassan",
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
    authorId: "au_hassan",
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
    authorId: "au_hassan",
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
  media: [...seedMedia, ...featureMedia],
  posts: seedPosts,
  comments: seedComments,
  settings: {
    general: {
      blogName: "Infomist Insights",
      blogDescription: "Engineering notes on AI automation, web architecture, marketing, SEO, and SaaS.",
      defaultAuthorId: "au_hajra",
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
