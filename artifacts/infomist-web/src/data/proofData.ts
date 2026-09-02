/**
 * Proof-of-work references, shared by the persona journey (and available to any
 * other section that needs filtered case studies).
 *
 * SOURCE: these mirror the projects already shown on the Case Studies page
 * (src/pages/CaseStudies.tsx). They are intentionally kept factual and light —
 * no invented metrics beyond what the site already publishes. When a real
 * case-study CMS/route exists, point `href` at the individual study.
 */

export interface ProofItem {
  id: string;
  name: string;
  location: string;
  industry: string;
  /** one-line summary of the work — matches the Case Studies page copy */
  summary: string;
  /** service/theme tags used to match a proof item to a persona challenge */
  tags: string[];
  color: string;
  /** individual case-study route once one exists; falls back to the index */
  href: string;
}

export const PROOF: ProofItem[] = [
  {
    id: "medez",
    name: "MedEZ",
    location: "Florida, USA",
    industry: "Healthcare Tech",
    summary:
      "Enterprise EHR platform for behavioral-health facilities across North America and the Middle East.",
    tags: ["software", "product-engineering", "web", "healthcare", "platform-scale"],
    color: "#0EA5E9",
    href: "/case-studies",
  },
  {
    id: "beingguru",
    name: "BeingGuru",
    location: "Pakistan",
    industry: "Media & Education",
    summary:
      "Tech-news, freelancing-education and community platform serving the GCC market.",
    tags: ["web", "content", "seo", "digital-marketing", "platform-scale"],
    color: "#F59E0B",
    href: "/case-studies",
  },
  {
    id: "workchest",
    name: "WorkChest",
    location: "Pakistan",
    industry: "Freelance Platform",
    summary:
      "Freelance marketplace — 200,000+ registered freelancers and 3,000+ global projects.",
    tags: ["software", "product-engineering", "web", "platform-scale", "product-strategy"],
    color: "#8B5CF6",
    href: "/case-studies",
  },
  {
    id: "grey-wolf-consulting",
    name: "Grey Wolf Consulting",
    location: "Connecticut, USA",
    industry: "Defense & Security",
    summary:
      "Website and digital presence for a tactical firearms-training firm serving military and law enforcement.",
    tags: ["web", "design", "brand", "seo", "digital-marketing"],
    color: "#94A3B8",
    href: "/case-studies",
  },
  {
    id: "syncbenefits",
    name: "SyncBenefits",
    location: "San Francisco, CA, USA",
    industry: "InsurTech & Benefits",
    summary:
      "Full-service insurance and employee-benefits agency built for high-growth startups.",
    tags: ["web", "design", "brand", "digital-marketing", "conversion"],
    color: "#10B981",
    href: "/case-studies",
  },
  {
    id: "aegis-proptech",
    name: "Aegis PropTech",
    location: "United Kingdom",
    industry: "PropTech",
    summary:
      "24/7 voice-AI agent that eliminated after-hours lead drop-off for a UK property firm.",
    tags: ["ai", "automation", "voice-ai", "crm-integration", "operations"],
    color: "#14B8A6",
    href: "/case-studies",
  },
  {
    id: "meridian-health-systems",
    name: "Meridian Health Systems",
    location: "United States",
    industry: "HealthTech",
    summary:
      "HIPAA-compliant RAG AI assistant that cut patient-intake admin time from 45 to 12 minutes.",
    tags: ["ai", "automation", "rag", "integration", "operations", "healthcare"],
    color: "#22C55E",
    href: "/case-studies",
  },
  {
    id: "novabridge-capital",
    name: "NovaBridge Capital",
    location: "United States",
    industry: "FinTech",
    summary:
      "Full-stack investor portal with real-time dashboards and automated regulatory reporting — delivered in 10 weeks.",
    tags: ["software", "product-engineering", "portal", "integration", "architecture", "product-strategy"],
    color: "#A855F7",
    href: "/case-studies",
  },
];

/**
 * Return proof items whose tags overlap the requested tags, most-relevant first.
 * Falls back to the first `limit` items so the section is never empty.
 */
export function proofFor(tags: string[], limit = 3): ProofItem[] {
  const want = new Set(tags);
  const scored = PROOF.map((p) => ({
    p,
    score: p.tags.reduce((n, t) => n + (want.has(t) ? 1 : 0), 0),
  }));
  const matched = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.p);
  return (matched.length ? matched : PROOF).slice(0, limit);
}
