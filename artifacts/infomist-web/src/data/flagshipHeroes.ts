import type { HeroCta } from "@/components/hero/PageHeroVideo";

/**
 * Dark video-hero overrides for the flagship solution categories.
 * Copy is from the "All Pages & Subpages Hero Blueprint". Keyed by the
 * category slug used in /solutions/:slug. Evidence rows are capability
 * labels only — no figures (unverified metrics must not be published).
 */
export type FlagshipHero = {
  eyebrow: string;
  title: string;
  accent?: string;
  sub: string;
  primary: HeroCta;
  secondary?: HeroCta;
  media: string;
  evidence?: string[];
};

const REVIEW: HeroCta = { label: "Book an AI Transformation Review", href: "/talk-to-strategist" };

export const FLAGSHIP_HEROES: Record<string, FlagshipHero> = {
  "ai-machine-learning-engineering": {
    eyebrow: "AI & Machine Learning Engineering",
    title: "Production AI for the work that",
    accent: "matters.",
    sub: "We design, integrate and operate AI agents, automation workflows and intelligent models across the systems your business already uses.",
    primary: REVIEW,
    secondary: { label: "Explore AI Capabilities", href: "/solutions-directory" },
    media: "hero-ai-pipeline",
    evidence: ["Evaluation method", "Workflow completion rate", "Escalation rate", "Integrations", "Security controls"],
  },
  "software-web-architecture": {
    eyebrow: "Software & Web Architecture",
    title: "The platform layer your AI strategy",
    accent: "depends on.",
    sub: "We build and modernize secure software foundations for intelligent products, automated operations and enterprise scale.",
    primary: REVIEW,
    secondary: { label: "Explore Platforms", href: "/solutions-directory" },
    media: "hero-platforms",
    evidence: ["Architecture", "Performance", "Security", "Observability", "Modernization"],
  },
  "salesforce-enterprise-cloud": {
    eyebrow: "Salesforce & Enterprise Cloud",
    title: "Turn your CRM into an intelligent revenue",
    accent: "system.",
    sub: "We connect Salesforce, enterprise data and AI workflows so teams spend less time updating systems and more time acting on signal.",
    primary: REVIEW,
    secondary: { label: "Explore Integration", href: "/solutions-directory" },
    media: "hero-integration",
    evidence: ["CRM architecture", "Data quality", "Governance", "Integrations", "Automation"],
  },
  "dedicated-squads-staffing": {
    eyebrow: "Dedicated Squads / Staffing",
    title: "Extend your team with an AI-ready delivery",
    accent: "pod.",
    sub: "Add senior architecture, AI engineering, product, design and quality capacity without losing ownership, visibility or delivery discipline.",
    primary: REVIEW,
    secondary: { label: "See How We Work", href: "/one-man-company" },
    media: "hero-delivery-pods",
    evidence: ["Senior team", "Operating rhythm", "Ownership", "Documentation", "Quality gates"],
  },
  "digital-marketing": {
    eyebrow: "Growth Engineering & Marketing",
    title: "Turn every growth signal into a learning",
    accent: "system.",
    sub: "We connect search, media, content, analytics and automation so marketing improves with every measurable signal.",
    primary: REVIEW,
    secondary: { label: "Explore Growth Systems", href: "/solutions-directory" },
    media: "hero-growth",
    evidence: ["Attribution", "Channel mix", "Creative testing", "Qualified pipeline", "Learning loop"],
  },
  "seo-services": {
    eyebrow: "Organic Growth Systems",
    title: "Build durable visibility in the age of AI",
    accent: "search.",
    sub: "Technical search engineering, authoritative content and conversion intelligence designed for high-intent demand.",
    primary: REVIEW,
    secondary: { label: "Explore Growth Systems", href: "/solutions-directory" },
    media: "hero-seo",
    evidence: ["Technical SEO", "Knowledge graph", "Content authority", "Conversion", "Qualified demand"],
  },
  "experience-design-media": {
    eyebrow: "Experience Design & Media",
    title: "Make intelligent products feel",
    accent: "inevitable.",
    sub: "We design the interfaces, identities and stories that help people understand, trust and adopt complex technology.",
    primary: REVIEW,
    secondary: { label: "Explore Design & Media", href: "/solutions-directory" },
    media: "hero-experience",
    evidence: ["Product UX", "Brand system", "Design ops", "Motion & video", "Adoption"],
  },
};
