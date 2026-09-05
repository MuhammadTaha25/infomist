/**
 * Homepage hero slider content.
 *
 * Source: "Infomist Final AI-Enterprise Website Implementation Plan" +
 * "All Pages & Subpages Hero Blueprint". The hero is one dark-navy stage;
 * each slide pairs a short 3–4s muted loop (right) with its own headline and
 * CTA (left). Only the active slide's <video> is mounted — the rest show a
 * poster still — so the page never loads more than one clip at a time.
 *
 * Every asset lives in /public/hero as `<id>.mp4` + `<id>.webp` (poster).
 */

export type HeroCta = { label: string; href: string };

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  /** trailing words of the title rendered in the cyan→green accent */
  accent?: string;
  sub: string;
  primary: HeroCta;
  secondary: HeroCta;
  /** basename in /public/hero (no extension) */
  media: string;
};

/** Shared under every slide — verified, non-fabricated proof points. */
export const HERO_TRUST = [
  "25+ years engineering",
  "AI systems in production",
  "Enterprise integrations",
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "ai-systems",
    eyebrow: "AI Transformation & Intelligent Systems",
    title: "AI systems that run the work behind your",
    accent: "business.",
    sub: "Infomist designs, integrates and operates intelligent agents, enterprise software and automated workflows that turn manual operations into measurable leverage.",
    primary: { label: "Book an AI Transformation Review", href: "/talk-to-strategist" },
    secondary: { label: "Explore AI Systems", href: "/solutions/ai-machine-learning-engineering" },
    media: "hero-ai-pipeline",
  },
  {
    id: "platforms",
    eyebrow: "Platforms & Engineering",
    title: "The platform layer your AI strategy",
    accent: "depends on.",
    sub: "Secure software foundations, SaaS and modernization for intelligent products, automated operations and enterprise scale.",
    primary: { label: "Book an AI Transformation Review", href: "/talk-to-strategist" },
    secondary: { label: "Explore Platforms", href: "/solutions/software-web-architecture" },
    media: "hero-platforms",
  },
  {
    id: "integration",
    eyebrow: "Enterprise Integration",
    title: "Turn your CRM into an intelligent revenue",
    accent: "system.",
    sub: "We connect Salesforce, enterprise data and AI workflows so teams spend less time updating systems and more time acting on signal.",
    primary: { label: "Book an AI Transformation Review", href: "/talk-to-strategist" },
    secondary: { label: "Explore Integration", href: "/solutions/salesforce-enterprise-cloud" },
    media: "hero-integration",
  },
  {
    id: "growth",
    eyebrow: "Growth Systems",
    title: "Turn every growth signal into a learning",
    accent: "system.",
    sub: "Search, media, content, analytics and automation connected so marketing improves with every measurable signal.",
    primary: { label: "Book an AI Transformation Review", href: "/talk-to-strategist" },
    secondary: { label: "Explore Growth", href: "/solutions/digital-marketing" },
    media: "hero-growth",
  },
];
