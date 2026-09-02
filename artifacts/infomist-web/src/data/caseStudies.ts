/**
 * Case Studies — single source of truth for the portfolio.
 *
 * Both the Case Studies index cards AND each `/case-studies/:slug` detail page
 * read from this file. Do not duplicate copy in components.
 *
 * CONTENT RULE: every field here is derived only from what the site already
 * publishes (src/pages/CaseStudies.tsx and src/data/proofData.ts). No invented
 * metrics, technologies, testimonials or client incidents. `outcomes` are only
 * populated where a figure is already stated on the live site. `websiteUrl` is
 * only set for URLs explicitly verified by the client — the other projects
 * intentionally have no external link rather than a guessed one.
 */

export interface CaseStudy {
  id: string;
  slug: string;
  name: string;
  /** short category label — used on cards and the detail hero */
  category: string;
  industry: string;
  location: string;
  /** monogram + accent, matching the existing Case Studies card language */
  initials: string;
  color: string;
  /** one-line card / meta description */
  shortDescription: string;
  /** 1–2 sentence framing shown in the detail Overview */
  overview: string;
  /** the problem, kept at category level — never a fabricated incident */
  challenge: string;
  /** what was built / delivered */
  solution: string;
  /** engagement scope — mirrors the service tags already on the site */
  services: string[];
  /** only present where the live site already states a figure */
  outcomes?: string[];
  /** only set for client-verified URLs; omit rather than guess */
  websiteUrl?: string;
  websiteLabel?: string;
  order: number;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "medez",
    slug: "medez",
    name: "MedEZ",
    category: "Healthcare",
    industry: "Healthcare Technology",
    location: "Florida, USA",
    initials: "M",
    color: "#0EA5E9",
    shortDescription:
      "Enterprise EHR platform for behavioral-health facilities across North America and the Middle East.",
    overview:
      "MedEZ is an enterprise EHR platform for behavioral-health facilities operating across North America and the Middle East. Infomist led the product's web design and development and runs its ongoing digital marketing.",
    challenge:
      "Behavioral-health operators need one platform to run clinical and operational workflows across multiple facilities and regions, rather than stitching together disconnected tools — and a web presence that communicates that to an enterprise buyer.",
    solution:
      "A production EHR web platform built for multi-facility behavioral-health operations, paired with a marketing site and a demand-generation programme supporting growth in both regions.",
    services: ["Website Designing", "Website Development", "Digital Marketing"],
    websiteUrl: "https://medez.com/",
    websiteLabel: "Visit MedEZ",
    order: 1,
  },
  {
    id: "beingguru",
    slug: "beingguru",
    name: "BeingGuru",
    category: "Media & Education",
    industry: "Media & Education",
    location: "Pakistan",
    initials: "B",
    color: "#F59E0B",
    shortDescription:
      "Pakistan's tech-news, freelancing-education and community platform serving the GCC market.",
    overview:
      "BeingGuru is a tech-news, freelancing-education and community platform serving readers in Pakistan and across the GCC. Infomist handled its web design, development and digital marketing.",
    challenge:
      "A high-traffic content and community platform needs an architecture that stays fast as readership grows, and a search and marketing footprint strong enough to compete for a regional audience.",
    solution:
      "A content platform engineered for scale, with a design system for editorial and education content and an SEO and digital-marketing programme to grow reach in the GCC.",
    services: ["Website Designing", "Website Development", "Digital Marketing"],
    websiteUrl: "https://beingguru.com/",
    websiteLabel: "Visit BeingGuru",
    order: 2,
  },
  {
    id: "workchest",
    slug: "workchest",
    name: "WorkChest",
    category: "Marketplace",
    industry: "Freelance Marketplace",
    location: "Pakistan",
    initials: "W",
    color: "#8B5CF6",
    shortDescription:
      "Freelance marketplace — 200,000+ registered freelancers and 3,000+ global projects.",
    overview:
      "WorkChest is a freelance marketplace connecting a large base of registered freelancers with global clients. Infomist handled the platform's web design, development and digital marketing.",
    challenge:
      "A two-sided marketplace has to onboard and match a growing pool of freelancers and clients reliably, while presenting enough trust and polish to win international projects.",
    solution:
      "A marketplace web platform built for scale on both sides of the market, with a conversion-focused public site and a digital-marketing programme to grow supply and demand.",
    services: ["Website Designing", "Website Development", "Digital Marketing"],
    outcomes: ["200,000+ registered freelancers", "3,000+ global projects delivered"],
    websiteUrl: "https://workchest.com/",
    websiteLabel: "Visit WorkChest",
    order: 3,
  },
  {
    id: "grey-wolf-consulting",
    slug: "grey-wolf-consulting",
    name: "Grey Wolf Consulting",
    category: "Professional Services",
    industry: "Defense & Security Training",
    location: "Connecticut, USA",
    initials: "GWC",
    color: "#94A3B8",
    shortDescription:
      "Tactical firearms-training firm serving military, law enforcement and private security.",
    overview:
      "Grey Wolf Consulting delivers tactical firearms training for military, law-enforcement and private-security clients across Connecticut. Infomist built its website and digital presence.",
    challenge:
      "A specialist training firm needs a credible, professional web presence that speaks to institutional clients and makes its course catalogue easy to find and book interest against.",
    solution:
      "A brand-led website and digital presence with clear course information, built to establish authority with military and law-enforcement audiences, supported by SEO and digital marketing.",
    services: ["Website Designing", "Website Development", "Digital Marketing"],
    websiteUrl: "https://greywolfconsulting.us/",
    websiteLabel: "Visit Grey Wolf Consulting",
    order: 4,
  },
  {
    id: "syncbenefits",
    slug: "syncbenefits",
    name: "SyncBenefits",
    category: "InsurTech",
    industry: "Insurance & Employee Benefits",
    location: "San Francisco, CA, USA",
    initials: "S",
    color: "#10B981",
    shortDescription:
      "Full-service insurance and employee-benefits agency built for high-growth startups.",
    overview:
      "SyncBenefits is a full-service insurance and employee-benefits agency built exclusively for high-growth startups. Infomist handled its web design, development and digital marketing.",
    challenge:
      "An insurance and benefits agency serving fast-moving startups needs a website that explains a complex service simply and converts founder-level visitors into conversations.",
    solution:
      "A brand and website designed for a startup audience, with clear service framing and a conversion-focused structure, supported by an ongoing digital-marketing programme.",
    services: ["Website Designing", "Website Development", "Digital Marketing"],
    order: 5,
  },
  {
    id: "aegis-proptech",
    slug: "aegis-proptech",
    name: "Aegis PropTech",
    category: "PropTech",
    industry: "PropTech",
    location: "United Kingdom",
    initials: "AP",
    color: "#14B8A6",
    shortDescription:
      "24/7 voice-AI agent that eliminated after-hours lead drop-off for a UK property firm.",
    overview:
      "Aegis PropTech is a UK property firm that was losing enquiries outside office hours. Infomist built a 24/7 voice-AI agent, integrated with its CRM and operational workflow.",
    challenge:
      "Enquiries that arrived after hours went unanswered until the next working day, by which point many leads had gone cold.",
    solution:
      "A 24/7 voice-AI agent that answers inbound calls, captures qualified enquiries and writes them straight into the CRM, with an automation workflow to route follow-up.",
    services: ["AI Agent Development", "Workflow Automation", "CRM Integration"],
    outcomes: ["Eliminated after-hours lead drop-off with a 24/7 voice agent"],
    order: 6,
  },
  {
    id: "meridian-health-systems",
    slug: "meridian-health-systems",
    name: "Meridian Health Systems",
    category: "AI & Automation",
    industry: "HealthTech",
    location: "United States",
    initials: "MHS",
    color: "#22C55E",
    shortDescription:
      "HIPAA-compliant RAG AI assistant that cut patient-intake admin time from 45 to 12 minutes.",
    overview:
      "Meridian Health Systems needed to reduce the administrative load of patient intake. Infomist built a HIPAA-compliant RAG AI assistant integrated with its EHR.",
    challenge:
      "Patient intake was slow and administratively heavy, taking around 45 minutes of staff time per patient.",
    solution:
      "A retrieval-augmented AI assistant, built to HIPAA-compliant standards and integrated with the EHR, that handles intake questions and structures the information staff need.",
    services: ["AI Agent Development", "RAG Systems", "EHR Integration"],
    outcomes: ["Patient-intake admin time cut from 45 minutes to 12"],
    order: 7,
  },
  {
    id: "novabridge-capital",
    slug: "novabridge-capital",
    name: "NovaBridge Capital",
    category: "FinTech",
    industry: "FinTech / Investment",
    location: "United States",
    initials: "NC",
    color: "#A855F7",
    shortDescription:
      "Full-stack investor portal with real-time dashboards and automated regulatory reporting — delivered in 10 weeks.",
    overview:
      "NovaBridge Capital needed an investor portal with live reporting and automated compliance output. Infomist delivered a full-stack portal in 10 weeks.",
    challenge:
      "Investors needed real-time visibility of their positions, and the firm needed regulatory reporting produced without manual assembly each period.",
    solution:
      "A full-stack investor portal with real-time dashboards and an automated regulatory-reporting pipeline, architected for a regulated financial context.",
    services: ["Full-Stack Development", "Portal Architecture", "RegTech"],
    outcomes: ["Investor portal delivered in 10 weeks"],
    order: 8,
  },
];

export const CASE_STUDY_CATEGORIES = [
  "All",
  ...Array.from(new Set(CASE_STUDIES.map((c) => c.category))),
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function getCaseStudies(): CaseStudy[] {
  return [...CASE_STUDIES].sort((a, b) => a.order - b.order);
}

/** 2–3 related studies: same category first, then fill from the rest. */
export function getRelatedCaseStudies(slug: string, limit = 3): CaseStudy[] {
  const current = getCaseStudy(slug);
  if (!current) return [];
  const sameCat = CASE_STUDIES.filter((c) => c.slug !== slug && c.category === current.category);
  const rest = CASE_STUDIES.filter((c) => c.slug !== slug && c.category !== current.category);
  return [...sameCat, ...rest].slice(0, limit);
}
