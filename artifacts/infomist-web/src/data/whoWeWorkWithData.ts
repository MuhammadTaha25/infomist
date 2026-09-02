import {
  Rocket,
  Code2,
  Settings,
  Megaphone,
  Palette,
  Film,
  type LucideIcon,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   "Who We Work With" — buyer-routing data model.

   One persona = one decision-maker. Each persona owns its own positioning,
   a set of challenges (the interactive router), capability pathways that link
   to real /solutions routes, an engagement fit, persona-specific FAQs, and
   proof tags used to filter src/data/proofData.ts.

   Shared building blocks (engagement models, delivery process) live at the
   bottom so every persona page stays consistent.
   ───────────────────────────────────────────────────────────────────────── */

export interface CapabilityLink {
  label: string;
  /** real route on this site */
  href: string;
}

export interface CapabilityPathway {
  title: string;
  /** who this pathway is for — business framing, not a feature list */
  forWho: string;
  services: CapabilityLink[];
}

export interface PersonaChallenge {
  id: string;
  label: string;
  /** short flow describing how we'd approach it — no hype, no metrics */
  approach: string;
  /** capability pathway titles that are most relevant to this challenge */
  capabilities: string[];
  /** proof tags (see proofData.ts) used to surface relevant work */
  proofTags: string[];
  /** value passed to /talk-to-strategist?topic= so the form can pre-select */
  strategistTopic: string;
}

export interface PersonaFaq {
  q: string;
  a: string;
}

export interface Persona {
  id: string;
  slug: string;
  icon: LucideIcon;
  /** full label, e.g. "CEOs & Founders" */
  title: string;
  /** compact label for the selector rail / breadcrumb */
  navLabel: string;
  eyebrow: string;
  /** one line on the entry card */
  cardDesc: string;
  /** persona hero */
  heroTitle: string;
  heroBody: string;
  /** the sentence shown next to the selected persona on the main section */
  positioning: string;
  challenges: PersonaChallenge[];
  capabilities: CapabilityPathway[];
  /** engagement-model ids that fit this persona best, in order */
  engagementFit: string[];
  faqs: PersonaFaq[];
  /** default proof tags for the persona (challenge tags take precedence) */
  proofTags: string[];
  /** internal cross-links rendered as the "related on this site" bullet list */
  relatedLinks: CapabilityLink[];
  seo: { title: string; description: string; image: string };
}

/** OG image + canonical for the /who-we-work-with index page */
export const WWW_SEO = {
  title: "Who We Work With | Infomist",
  description:
    "Infomist works with CEOs, CTOs, COOs, CMOs, and product and content leaders — mapping strategic, technical, and creative capability to the outcome you own.",
  path: "/who-we-work-with",
  image: "/og/who-we-work-with.jpg",
};

export const PERSONAS: Persona[] = [
  /* ───────────────────────── CEOs & Founders ───────────────────────── */
  {
    id: "ceos-founders",
    slug: "ceos-founders",
    icon: Rocket,
    title: "CEOs & Founders",
    navLabel: "CEO / Founder",
    eyebrow: "For CEOs & Founders",
    cardDesc:
      "A technology partner that moves fast, owns outcomes, and speaks the language of the business — not just the codebase.",
    heroTitle:
      "Technology should move the business forward — not become another thing you have to manage.",
    heroBody:
      "We work with founders and executive teams who need senior technical thinking, faster execution, and systems that hold up as the company scales.",
    positioning:
      "You own the number. We bring the strategic, technical, and creative capacity to move the work forward without adding management overhead.",
    challenges: [
      {
        id: "build-new",
        label: "We need to build something new",
        approach:
          "Pressure-test the idea against the market → define the smallest version worth shipping → design the architecture for where you're going, not just launch → build, integrate, and release in short cycles → measure and iterate.",
        capabilities: ["Product Engineering", "Strategy & Architecture", "AI & Automation"],
        proofTags: ["product-engineering", "software", "product-strategy", "platform-scale"],
        strategistTopic: "Website Development",
      },
      {
        id: "modernise",
        label: "Our current technology is holding us back",
        approach:
          "Assess the existing system and its constraints → identify the highest-risk and highest-value areas → sequence a modernization path that keeps the business running → migrate and re-architect incrementally.",
        capabilities: ["Strategy & Architecture", "Product Engineering"],
        proofTags: ["architecture", "platform-scale", "software", "integration"],
        strategistTopic: "Not Sure Yet",
      },
      {
        id: "automate-ops",
        label: "We need to automate operations",
        approach:
          "Map the current workflow and where time is lost → identify automation opportunities with the clearest payback → design the solution → integrate it with your existing tools → measure the operational impact.",
        capabilities: ["AI & Automation", "Strategy & Architecture"],
        proofTags: ["automation", "ai", "operations", "integration"],
        strategistTopic: "AI & Automation",
      },
      {
        id: "tech-leadership",
        label: "We need senior technical leadership",
        approach:
          "Embed senior engineers and a technical lead → establish architecture, standards, and a delivery rhythm → make the roadmap and trade-offs legible to the business → hand over or stay on as the team grows.",
        capabilities: ["Strategy & Architecture", "Dedicated Engineering Capacity"],
        proofTags: ["architecture", "software", "product-engineering"],
        strategistTopic: "Not Sure Yet",
      },
      {
        id: "adopt-ai",
        label: "We want to integrate AI",
        approach:
          "Separate real opportunities from noise → pick one use case with a measurable outcome → prototype against your data → productionize with guardrails, evaluation, and monitoring → expand from proof.",
        capabilities: ["AI & Automation", "Strategy & Architecture"],
        proofTags: ["ai", "rag", "automation", "voice-ai"],
        strategistTopic: "AI & Automation",
      },
      {
        id: "scale-platform",
        label: "We need to scale an existing platform",
        approach:
          "Find the bottlenecks under real load → stabilize the critical path → re-architect the parts that won't scale → add the observability to see problems before customers do.",
        capabilities: ["Strategy & Architecture", "Product Engineering"],
        proofTags: ["platform-scale", "architecture", "software", "portal"],
        strategistTopic: "Not Sure Yet",
      },
    ],
    capabilities: [
      {
        title: "Strategy & Architecture",
        forWho: "For teams making a technology decision that's expensive to get wrong.",
        services: [
          { label: "Custom Software Development", href: "/solutions/custom-software-development" },
          { label: "Enterprise Software Development", href: "/solutions/enterprise-software-development" },
          { label: "System Integration", href: "/solutions/system-integration" },
        ],
      },
      {
        title: "Product Engineering",
        forWho: "For building or rebuilding a product that has to hold up in production.",
        services: [
          { label: "SaaS Development", href: "/solutions/saas-development" },
          { label: "Website Development", href: "/solutions/website-development" },
          { label: "Mobile App Development", href: "/solutions/mobile-app-developer" },
        ],
      },
      {
        title: "AI & Automation",
        forWho: "For reducing manual work or putting AI into a real workflow.",
        services: [
          { label: "AI Automation Services", href: "/solutions/ai-automation-services" },
          { label: "Autonomous AI Agents", href: "/solutions/autonomous-ai-agents" },
          { label: "Business Process Automation", href: "/solutions/business-process-automation" },
        ],
      },
      {
        title: "Dedicated Engineering Capacity",
        forWho: "For adding senior technical people without a hiring cycle.",
        services: [
          { label: "Dedicated Development Team", href: "/solutions/dedicated-development-team" },
          { label: "Offshore Software Development", href: "/solutions/offshore-software-development" },
        ],
      },
    ],
    engagementFit: ["strategic-sprint", "end-to-end", "dedicated-capacity"],
    faqs: [
      {
        q: "Can you work with our existing development team?",
        a: "Yes. We can embed alongside an in-house team — taking a workstream, adding senior capacity, or providing architecture and review — and we document decisions so your team stays in control.",
      },
      {
        q: "Can you help us decide what technology we actually need?",
        a: "That's often where we start. A short strategic engagement produces an architecture view, a prioritized list of options with trade-offs, and an execution roadmap you can act on with or without us.",
      },
      {
        q: "Can you take an idea from strategy through development?",
        a: "Yes. Our end-to-end engagements run from discovery and design through engineering, launch, and iteration with one accountable team.",
      },
      {
        q: "Can you modernize an existing product?",
        a: "Yes. We assess the current system, sequence the work so the business keeps running, and re-architect incrementally rather than attempting a risky rewrite.",
      },
      {
        q: "How do you approach AI adoption?",
        a: "We start with one use case that has a measurable outcome, prototype against your data, then productionize with evaluation and monitoring before expanding.",
      },
      {
        q: "How do engagements typically start?",
        a: "A call to understand the business context and the decision in front of you, followed by a short scoped proposal. Most engagements begin with either a strategic sprint or a defined build.",
      },
    ],
    proofTags: ["product-engineering", "software", "ai", "platform-scale"],
    relatedLinks: [
      { label: "Custom Software Development", href: "/solutions/custom-software-development" },
      { label: "AI Automation Services", href: "/solutions/ai-automation-services" },
      { label: "Case studies", href: "/case-studies" },
      { label: "The team behind Infomist", href: "/leadership" },
      { label: "Talk to a Strategist", href: "/talk-to-strategist" },
    ],
    seo: {
      title: "For CEOs & Founders | Infomist",
      description:
        "Technology strategy, product engineering, and AI automation for founders and executive teams who need faster execution and systems that scale.",
      image: "/og/persona-ceos-founders.jpg",
    },
  },

  /* ──────────────────── CTOs & VPs of Engineering ──────────────────── */
  {
    id: "ctos-engineering",
    slug: "ctos-engineering",
    icon: Code2,
    title: "CTOs & VPs of Engineering",
    navLabel: "CTO / Engineering",
    eyebrow: "For CTOs & VPs of Engineering",
    cardDesc:
      "Senior engineering capacity that ships production-grade code, documents decisions, and integrates cleanly with your stack.",
    heroTitle:
      "Add senior engineering capacity without adding management overhead.",
    heroBody:
      "We work with engineering leaders who need to move faster on a specific workstream, reduce technical risk, or bring a capability in-house — with people who work the way your team already does.",
    positioning:
      "You own delivery and technical risk. We plug in at the workstream level with engineers who document, integrate, and hand over cleanly.",
    challenges: [
      {
        id: "technical-debt",
        label: "Technical debt is slowing delivery",
        approach:
          "Quantify where debt actually costs velocity → separate cosmetic from structural → fix the structural items on the critical path → add tests and guardrails so it doesn't return.",
        capabilities: ["Architecture & Modernization", "Dedicated Engineering Capacity"],
        proofTags: ["architecture", "software", "platform-scale"],
        strategistTopic: "Not Sure Yet",
      },
      {
        id: "architecture",
        label: "We need to modernize our architecture",
        approach:
          "Review the current architecture against where the product is heading → identify what won't scale → design a target architecture → migrate service by service with a rollback path.",
        capabilities: ["Architecture & Modernization", "Systems Integration"],
        proofTags: ["architecture", "integration", "platform-scale", "portal"],
        strategistTopic: "Not Sure Yet",
      },
      {
        id: "capacity",
        label: "We need more engineering capacity",
        approach:
          "Scope a workstream with a clear interface → staff it with senior engineers → run in your process, your tools, your review standards → report against the same metrics your team uses.",
        capabilities: ["Dedicated Engineering Capacity", "Delivery Acceleration"],
        proofTags: ["software", "product-engineering"],
        strategistTopic: "Not Sure Yet",
      },
      {
        id: "ai-adoption",
        label: "We need to adopt AI in the product",
        approach:
          "Define the use case and its evaluation criteria → prototype against real data → build the retrieval, prompting, and guardrail layers → ship with monitoring and a feedback loop.",
        capabilities: ["AI Engineering", "Systems Integration"],
        proofTags: ["ai", "rag", "nlp", "automation"],
        strategistTopic: "AI & Automation",
      },
      {
        id: "scalability",
        label: "Platform scalability and reliability",
        approach:
          "Load-test the real bottlenecks → stabilize the critical path → introduce caching, queueing, and horizontal scale where it's needed → add the observability to catch regressions early.",
        capabilities: ["Architecture & Modernization", "Delivery Acceleration"],
        proofTags: ["platform-scale", "architecture", "software"],
        strategistTopic: "Not Sure Yet",
      },
      {
        id: "integrations",
        label: "System and third-party integrations",
        approach:
          "Map the systems and the data that moves between them → design the integration contract → build with retries, idempotency, and observability → document it for your team.",
        capabilities: ["Systems Integration", "Architecture & Modernization"],
        proofTags: ["integration", "crm-integration", "architecture"],
        strategistTopic: "AI & Automation",
      },
    ],
    capabilities: [
      {
        title: "Architecture & Modernization",
        forWho: "For reducing technical risk in a system you have to keep running.",
        services: [
          { label: "Custom Software Development", href: "/solutions/custom-software-development" },
          { label: "Enterprise Software Development", href: "/solutions/enterprise-software-development" },
          { label: "Software Development", href: "/solutions/software-development" },
        ],
      },
      {
        title: "Systems Integration",
        forWho: "For connecting systems reliably instead of with brittle glue code.",
        services: [
          { label: "System Integration", href: "/solutions/system-integration" },
          { label: "CRM Integration", href: "/solutions/crm-integration" },
          { label: "Salesforce Consulting", href: "/solutions/salesforce-consulting-services" },
        ],
      },
      {
        title: "AI Engineering",
        forWho: "For putting AI into the product with evaluation and guardrails.",
        services: [
          { label: "AI Agents", href: "/solutions/ai-agents" },
          { label: "Generative AI", href: "/solutions/generative-ai" },
          { label: "NLP Solutions", href: "/solutions/nlp-solutions" },
        ],
      },
      {
        title: "Dedicated Engineering Capacity",
        forWho: "For senior engineers who run in your process from week one.",
        services: [
          { label: "Dedicated Development Team", href: "/solutions/dedicated-development-team" },
          { label: "Offshore Software Development", href: "/solutions/offshore-software-development" },
        ],
      },
    ],
    engagementFit: ["dedicated-capacity", "strategic-sprint", "end-to-end"],
    faqs: [
      {
        q: "How do you integrate with our existing process?",
        a: "We work in your repo, your ticketing, your CI, and your review standards. We don't ask your team to adopt our tools.",
      },
      {
        q: "Do you document architectural decisions?",
        a: "Yes — decision records, architecture diagrams, and runbooks are part of delivery, not an afterthought.",
      },
      {
        q: "Can you take a single workstream rather than the whole project?",
        a: "That's the usual shape. We scope a workstream with a clear interface so it can run in parallel without blocking your team.",
      },
      {
        q: "What does a modernization engagement look like?",
        a: "An assessment first, then an incremental migration with a rollback path at each step — not a big-bang rewrite.",
      },
      {
        q: "How do you handle handover?",
        a: "Knowledge transfer is built into the timeline: paired sessions, documentation, and a period where your team leads with us on support.",
      },
    ],
    proofTags: ["architecture", "integration", "software", "platform-scale"],
    relatedLinks: [
      { label: "Enterprise Software Development", href: "/solutions/enterprise-software-development" },
      { label: "System Integration", href: "/solutions/system-integration" },
      { label: "AI Agents", href: "/solutions/ai-agents" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Talk to a Strategist", href: "/talk-to-strategist" },
    ],
    seo: {
      title: "For CTOs & VPs of Engineering | Infomist",
      description:
        "Senior engineering capacity, architecture modernization, systems integration, and AI engineering that runs in your process and documents its decisions.",
      image: "/og/persona-ctos-engineering.jpg",
    },
  },

  /* ─────────────────── COOs & Operations Managers ─────────────────── */
  {
    id: "coos-operations",
    slug: "coos-operations",
    icon: Settings,
    title: "COOs & Operations Managers",
    navLabel: "COO / Operations",
    eyebrow: "For COOs & Operations Managers",
    cardDesc:
      "Automation that actually reduces manual load and connects the tools your team already uses — not another dashboard.",
    heroTitle:
      "Cut the manual work out of operations — without ripping out your systems.",
    heroBody:
      "We work with operations leaders who are losing hours to repetitive tasks, disconnected tools, and data that lives in five places. We automate the workflow and connect the systems around it.",
    positioning:
      "You own throughput and cost. We remove the repetitive work and connect the systems so your team spends time on judgement, not data entry.",
    challenges: [
      {
        id: "manual-workflows",
        label: "Too much manual, repetitive work",
        approach:
          "Shadow the workflow to see where time actually goes → rank tasks by volume and payback → automate the top items → integrate with the tools already in use → track hours recovered.",
        capabilities: ["Workflow Automation", "Systems Integration"],
        proofTags: ["automation", "operations", "ai", "integration"],
        strategistTopic: "AI & Automation",
      },
      {
        id: "bottlenecks",
        label: "Operational bottlenecks and handoffs",
        approach:
          "Map the process end to end → find the handoffs where work stalls → redesign or automate those steps → add status visibility so nothing gets stuck silently.",
        capabilities: ["Workflow Automation", "Internal Tools"],
        proofTags: ["automation", "operations", "portal"],
        strategistTopic: "AI & Automation",
      },
      {
        id: "fragmented-systems",
        label: "Fragmented systems and data silos",
        approach:
          "Inventory the systems and where the same data is re-entered → design a single flow of record → integrate the systems → reconcile and monitor the data.",
        capabilities: ["Systems Integration", "Internal Tools"],
        proofTags: ["integration", "crm-integration", "operations"],
        strategistTopic: "AI & Automation",
      },
      {
        id: "crm-process",
        label: "CRM and process problems",
        approach:
          "Review how the CRM is actually used vs intended → fix the data model and required fields → automate the updates that people do by hand → connect it to the surrounding tools.",
        capabilities: ["Systems Integration", "Workflow Automation"],
        proofTags: ["crm-integration", "integration", "operations"],
        strategistTopic: "AI & Automation",
      },
      {
        id: "ai-ops",
        label: "Use AI to handle routine decisions",
        approach:
          "Pick a routine, rule-heavy decision → prototype an agent or classifier against historical data → keep a human in the loop where it matters → measure accuracy and time saved before widening scope.",
        capabilities: ["Workflow Automation", "AI Agents for Operations"],
        proofTags: ["ai", "automation", "operations", "voice-ai"],
        strategistTopic: "AI & Automation",
      },
      {
        id: "internal-tools",
        label: "We need better internal tools",
        approach:
          "Understand the job the team is doing in spreadsheets → design the smallest tool that removes the friction → build it on top of your existing data → iterate with the people who use it daily.",
        capabilities: ["Internal Tools", "Systems Integration"],
        proofTags: ["software", "portal", "operations"],
        strategistTopic: "Website Development",
      },
    ],
    capabilities: [
      {
        title: "Workflow Automation",
        forWho: "For removing repetitive, rules-based work from the day.",
        services: [
          { label: "Business Process Automation", href: "/solutions/business-process-automation" },
          { label: "AI Automation Services", href: "/solutions/ai-automation-services" },
          { label: "AI Chatbot Development", href: "/solutions/ai-chatbot-development" },
        ],
      },
      {
        title: "Systems Integration",
        forWho: "For making your tools share data instead of fighting each other.",
        services: [
          { label: "System Integration", href: "/solutions/system-integration" },
          { label: "CRM Integration", href: "/solutions/crm-integration" },
          { label: "Salesforce Consulting", href: "/solutions/salesforce-consulting-services" },
        ],
      },
      {
        title: "AI Agents for Operations",
        forWho: "For routine decisions and interactions that don't need a person.",
        services: [
          { label: "Autonomous AI Agents", href: "/solutions/autonomous-ai-agents" },
          { label: "AI Voice Agent Development", href: "/solutions/ai-voice-agent-development" },
          { label: "AI Agents", href: "/solutions/ai-agents" },
        ],
      },
      {
        title: "Internal Tools",
        forWho: "For the work currently held together by spreadsheets.",
        services: [
          { label: "Custom Software Development", href: "/solutions/custom-software-development" },
          { label: "Website Development", href: "/solutions/website-development" },
        ],
      },
    ],
    engagementFit: ["strategic-sprint", "end-to-end", "dedicated-capacity"],
    faqs: [
      {
        q: "Do we have to replace our current tools?",
        a: "No. Most of our operations work integrates with what you already run. We only recommend replacing a tool when it's genuinely the blocker.",
      },
      {
        q: "How do you decide what to automate first?",
        a: "By volume and payback. We shadow the workflow, rank tasks, and start with the ones that free the most time for the least risk.",
      },
      {
        q: "Will this reduce headcount?",
        a: "The usual outcome is that the same team handles more without adding people, and spends its time on judgement work rather than data entry. We measure hours recovered, not headcount.",
      },
      {
        q: "How do you keep a human in the loop for AI decisions?",
        a: "We design approval steps and confidence thresholds so the agent handles the routine cases and routes anything uncertain to a person.",
      },
      {
        q: "How is progress measured?",
        a: "Against a baseline we capture before starting — cycle time, hours per task, error rate — so the impact is visible.",
      },
    ],
    proofTags: ["automation", "operations", "integration", "ai"],
    relatedLinks: [
      { label: "Business Process Automation", href: "/solutions/business-process-automation" },
      { label: "CRM Integration", href: "/solutions/crm-integration" },
      { label: "Autonomous AI Agents", href: "/solutions/autonomous-ai-agents" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Talk to a Strategist", href: "/talk-to-strategist" },
    ],
    seo: {
      title: "For COOs & Operations Managers | Infomist",
      description:
        "Workflow automation, systems and CRM integration, AI agents, and internal tools that cut manual work without replacing the systems your team already uses.",
      image: "/og/persona-coos-operations.jpg",
    },
  },

  /* ───────────────────── CMOs & Marketing Leads ──────────────────── */
  {
    id: "cmos-marketing",
    slug: "cmos-marketing",
    icon: Megaphone,
    title: "CMOs & Marketing Leads",
    navLabel: "CMO / Marketing",
    eyebrow: "For CMOs & Marketing Leads",
    cardDesc:
      "SEO, paid, and web work measured against pipeline and revenue — not impressions.",
    heroTitle:
      "Growth work that's accountable to pipeline, not vanity metrics.",
    heroBody:
      "We work with marketing leaders who need their site, search, and paid channels to produce qualified pipeline — and to be able to show where it came from.",
    positioning:
      "You own pipeline. We build the site, search, and paid programs that generate it and the measurement that proves it.",
    challenges: [
      {
        id: "lead-gen",
        label: "We need more qualified pipeline",
        approach:
          "Define what a qualified lead is with sales → audit where the current funnel leaks → fix the site and offers that convert → scale the channels that produce qualified pipeline.",
        capabilities: ["Search & Content", "Paid Acquisition", "Website & Conversion"],
        proofTags: ["digital-marketing", "seo", "conversion", "web"],
        strategistTopic: "Digital Marketing",
      },
      {
        id: "seo",
        label: "Our organic search isn't performing",
        approach:
          "Technical and content audit → fix crawl, speed, and structure issues → build topic coverage around commercial intent → earn authority → track rankings against revenue pages.",
        capabilities: ["Search & Content"],
        proofTags: ["seo", "content", "web"],
        strategistTopic: "SEO",
      },
      {
        id: "conversion",
        label: "Traffic isn't converting",
        approach:
          "Instrument the funnel → find the drop-off points with data, not opinion → test messaging, layout, and offers → keep the changes that move qualified conversions.",
        capabilities: ["Website & Conversion"],
        proofTags: ["conversion", "web", "design"],
        strategistTopic: "Website Development",
      },
      {
        id: "marketing-automation",
        label: "Marketing operations and automation",
        approach:
          "Map the lifecycle from first touch to closed → connect the martech stack → automate nurture, routing, and reporting → give the team one view of what's working.",
        capabilities: ["Marketing Operations"],
        proofTags: ["automation", "crm-integration", "integration"],
        strategistTopic: "Digital Marketing",
      },
      {
        id: "digital-presence",
        label: "Our website undersells the company",
        approach:
          "Clarify the positioning → rebuild the site around the buyer's questions → design for credibility and speed → connect it to analytics and CRM.",
        capabilities: ["Website & Conversion", "Brand & Design"],
        proofTags: ["web", "design", "brand", "conversion"],
        strategistTopic: "Website Development",
      },
      {
        id: "analytics",
        label: "We can't see what's working",
        approach:
          "Agree the metrics that matter with the business → implement clean tracking and attribution → build reporting the team will actually use → review and adjust spend against it.",
        capabilities: ["Marketing Operations"],
        proofTags: ["digital-marketing", "conversion", "integration"],
        strategistTopic: "Digital Marketing",
      },
    ],
    capabilities: [
      {
        title: "Search & Content",
        forWho: "For organic visibility on the terms your buyers actually search.",
        services: [
          { label: "SEO Services", href: "/solutions/seo-services" },
          { label: "Content Marketing Services", href: "/solutions/content-marketing-services" },
          { label: "Conversion Rate Optimization", href: "/solutions/conversion-rate-optimization" },
        ],
      },
      {
        title: "Paid Acquisition",
        forWho: "For predictable pipeline from paid channels, measured on cost per qualified lead.",
        services: [
          { label: "PPC Management Services", href: "/solutions/ppc-management-services" },
          { label: "Google Ads Agency", href: "/solutions/google-ads-agency" },
          { label: "Facebook Ads Agency", href: "/solutions/facebook-ads-agency" },
        ],
      },
      {
        title: "Website & Conversion",
        forWho: "For a site that turns qualified traffic into pipeline.",
        services: [
          { label: "Website Development", href: "/solutions/website-development" },
          { label: "Conversion Rate Optimization", href: "/solutions/conversion-rate-optimization" },
          { label: "UI/UX Design Agency", href: "/solutions/ui-ux-design-agency" },
        ],
      },
      {
        title: "Marketing Operations",
        forWho: "For a connected stack and reporting the team trusts.",
        services: [
          { label: "Digital Marketing Agency", href: "/solutions/digital-marketing-agency" },
          { label: "CRM Integration", href: "/solutions/crm-integration" },
          { label: "Social Media Marketing", href: "/solutions/social-media-marketing-agency" },
        ],
      },
      {
        title: "Brand & Design",
        forWho: "For a brand system that carries across every channel.",
        services: [
          { label: "Brand Identity Design", href: "/solutions/brand-identity-design" },
          { label: "Graphic Design Services", href: "/solutions/graphic-design-services" },
        ],
      },
    ],
    engagementFit: ["end-to-end", "strategic-sprint", "dedicated-capacity"],
    faqs: [
      {
        q: "How do you measure success?",
        a: "Against pipeline and revenue metrics agreed with you and sales up front — qualified leads, cost per qualified lead, and contribution to closed revenue — not impressions or raw traffic.",
      },
      {
        q: "Can you work with our existing martech stack?",
        a: "Yes. We integrate with your CRM, analytics, and automation tools rather than asking you to switch.",
      },
      {
        q: "Do you do both SEO and paid?",
        a: "Yes, and we treat them as one system — paid buys data and coverage quickly, SEO compounds. We balance spend based on what's producing qualified pipeline.",
      },
      {
        q: "Will you rebuild our website or work with it?",
        a: "Either. If the current site is the conversion blocker we'll rebuild the pages that matter; if it's fundamentally sound we optimize what's there.",
      },
      {
        q: "How quickly do results show?",
        a: "Paid and conversion work can move within weeks. SEO and content compound over months. We set expectations by channel at the start.",
      },
    ],
    proofTags: ["digital-marketing", "seo", "conversion", "web"],
    relatedLinks: [
      { label: "SEO Services", href: "/solutions/seo-services" },
      { label: "Digital Marketing Agency", href: "/solutions/digital-marketing-agency" },
      { label: "Conversion Rate Optimization", href: "/solutions/conversion-rate-optimization" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Talk to a Strategist", href: "/talk-to-strategist" },
    ],
    seo: {
      title: "For CMOs & Marketing Leads | Infomist",
      description:
        "SEO, paid acquisition, website conversion, and marketing operations measured against qualified pipeline and revenue.",
      image: "/og/persona-cmos-marketing.jpg",
    },
  },

  /* ──────────────────── Heads of Product & Design ─────────────────── */
  {
    id: "product-design",
    slug: "product-design",
    icon: Palette,
    title: "Heads of Product & Design",
    navLabel: "Product / Design",
    eyebrow: "For Heads of Product & Design",
    cardDesc:
      "Design grounded in usability research and conversion data — and a handoff engineering can actually build.",
    heroTitle:
      "Design decisions backed by research — and a handoff engineering can build from.",
    heroBody:
      "We work with product and design leaders who need discovery done properly, a design system that scales, and a design-to-development handoff that doesn't lose fidelity.",
    positioning:
      "You own the experience. We bring research, interaction design, and a system that survives contact with engineering.",
    challenges: [
      {
        id: "discovery",
        label: "We need real product discovery",
        approach:
          "Frame the problem and the users → run the research (interviews, usage data, competitive teardown) → synthesize into opportunities → prototype and test the riskiest assumptions before committing to build.",
        capabilities: ["Product Discovery & Strategy", "UX Research & Design"],
        proofTags: ["product-strategy", "design", "product-engineering"],
        strategistTopic: "Not Sure Yet",
      },
      {
        id: "ux-problems",
        label: "Users are struggling with the current UX",
        approach:
          "Watch real users complete the core tasks → locate the friction with evidence → redesign the critical flows → validate with a usability test before rollout.",
        capabilities: ["UX Research & Design"],
        proofTags: ["design", "conversion", "web"],
        strategistTopic: "Not Sure Yet",
      },
      {
        id: "design-system",
        label: "We need a design system",
        approach:
          "Audit the current UI inventory → define tokens, components, and usage rules → build it in design and in code together → document adoption so it's used, not shelved.",
        capabilities: ["Design Systems", "Design-to-Development"],
        proofTags: ["design", "product-engineering", "web"],
        strategistTopic: "Branding",
      },
      {
        id: "prototyping",
        label: "We need to prototype and validate fast",
        approach:
          "Turn the idea into an interactive prototype → put it in front of target users → capture what breaks → iterate over short cycles until it's worth building.",
        capabilities: ["UX Research & Design", "Product Discovery & Strategy"],
        proofTags: ["product-strategy", "design"],
        strategistTopic: "Not Sure Yet",
      },
      {
        id: "product-strategy",
        label: "We need a clearer product strategy",
        approach:
          "Align on the outcome the business needs → map the current product against it → identify the highest-leverage bets → sequence a roadmap with clear success measures.",
        capabilities: ["Product Discovery & Strategy"],
        proofTags: ["product-strategy", "product-engineering"],
        strategistTopic: "Not Sure Yet",
      },
      {
        id: "handoff",
        label: "Design-to-development handoff keeps breaking",
        approach:
          "Get designers and engineers into the same system → agree the component contract → build design and front-end in parallel → review together so intent survives implementation.",
        capabilities: ["Design-to-Development", "Design Systems"],
        proofTags: ["design", "product-engineering", "web"],
        strategistTopic: "Website Development",
      },
    ],
    capabilities: [
      {
        title: "UX Research & Design",
        forWho: "For decisions that should be based on evidence, not taste.",
        services: [
          { label: "UX Design", href: "/solutions/ux-design" },
          { label: "UI/UX Design Agency", href: "/solutions/ui-ux-design-agency" },
        ],
      },
      {
        title: "Design Systems",
        forWho: "For consistency that holds as the product and team grow.",
        services: [
          { label: "UI/UX Design Agency", href: "/solutions/ui-ux-design-agency" },
          { label: "Brand Identity Design", href: "/solutions/brand-identity-design" },
          { label: "Graphic Design Services", href: "/solutions/graphic-design-services" },
        ],
      },
      {
        title: "Product Discovery & Strategy",
        forWho: "For knowing what to build before building it.",
        services: [
          { label: "UX Design", href: "/solutions/ux-design" },
          { label: "Custom Software Development", href: "/solutions/custom-software-development" },
        ],
      },
      {
        title: "Design-to-Development",
        forWho: "For a handoff where the built product matches the design.",
        services: [
          { label: "Website Development", href: "/solutions/website-development" },
          { label: "SaaS Development", href: "/solutions/saas-development" },
          { label: "Custom Software Development", href: "/solutions/custom-software-development" },
        ],
      },
    ],
    engagementFit: ["strategic-sprint", "end-to-end", "dedicated-capacity"],
    faqs: [
      {
        q: "Can you build what you design?",
        a: "Yes. Design and front-end engineering sit on the same team, so the handoff is a review, not a throw-over-the-wall.",
      },
      {
        q: "Do you run your own research?",
        a: "Yes — interviews, usability testing, and analysis of real usage data. We can also work from research your team has already done.",
      },
      {
        q: "Can you work alongside our in-house design team?",
        a: "Yes. We can take a workstream, add capacity for a push, or help stand up a design system your team then owns.",
      },
      {
        q: "How do you deliver a design system?",
        a: "In design and code together, with tokens, components, usage rules, and adoption documentation — so it's used rather than shelved.",
      },
      {
        q: "What does discovery produce?",
        a: "A framed problem, research findings, prioritized opportunities, and tested prototypes for the riskiest assumptions — enough to commit to a build with confidence.",
      },
    ],
    proofTags: ["design", "product-strategy", "conversion", "web"],
    relatedLinks: [
      { label: "UI/UX Design Agency", href: "/solutions/ui-ux-design-agency" },
      { label: "UX Design", href: "/solutions/ux-design" },
      { label: "Brand Identity Design", href: "/solutions/brand-identity-design" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Talk to a Strategist", href: "/talk-to-strategist" },
    ],
    seo: {
      title: "For Heads of Product & Design | Infomist",
      description:
        "Product discovery, UX research and design, design systems, and a design-to-development handoff built by one team.",
      image: "/og/persona-product-design.jpg",
    },
  },

  /* ────────────────── Marketing & Content Managers ────────────────── */
  {
    id: "content-marketing",
    slug: "content-marketing",
    icon: Film,
    title: "Marketing & Content Managers",
    navLabel: "Content / Video",
    eyebrow: "For Marketing & Content Managers",
    cardDesc:
      "Consistent, on-brand video and content produced on a schedule your team can keep up with.",
    heroTitle:
      "On-brand content and video, produced on a schedule you can rely on.",
    heroBody:
      "We work with content and brand managers who need a repeatable production process — so output stays consistent, on-brand, and on time without burning out the team.",
    positioning:
      "You own output and brand consistency. We give you a production system that keeps the pipeline full and on-brand.",
    challenges: [
      {
        id: "content-scale",
        label: "We can't produce content fast enough",
        approach:
          "Map what the calendar actually needs → build repeatable formats and templates → set up a production pipeline with clear roles → run it weekly so output is predictable.",
        capabilities: ["Content Production", "Creative Operations"],
        proofTags: ["content", "digital-marketing", "seo"],
        strategistTopic: "Digital Marketing",
      },
      {
        id: "video-production",
        label: "We need consistent video output",
        approach:
          "Define the video formats that fit the strategy → build templates for intros, captions, and lower-thirds → batch-produce → deliver in the aspect ratios each channel needs.",
        capabilities: ["Video Production", "Post-Production & Editing"],
        proofTags: ["video", "content", "brand"],
        strategistTopic: "Video",
      },
      {
        id: "content-workflows",
        label: "Our content workflow is chaotic",
        approach:
          "Document the current process and where things stall → set a single pipeline with review gates → connect the tools for briefs, assets, and scheduling → give everyone one view of status.",
        capabilities: ["Creative Operations"],
        proofTags: ["automation", "content", "operations"],
        strategistTopic: "Digital Marketing",
      },
      {
        id: "brand-consistency",
        label: "Output isn't consistently on-brand",
        approach:
          "Tighten the brand guidelines into usable templates → build an asset library → put brand review into the pipeline → audit output monthly against the guidelines.",
        capabilities: ["Brand & Templates", "Creative Operations"],
        proofTags: ["brand", "design", "content"],
        strategistTopic: "Branding",
      },
      {
        id: "distribution",
        label: "We need to distribute across more channels",
        approach:
          "Identify the channels worth the effort → adapt each asset to the channel's format → schedule and publish on a cadence → track engagement to refocus effort.",
        capabilities: ["Content Production", "Creative Operations"],
        proofTags: ["digital-marketing", "content", "video"],
        strategistTopic: "Digital Marketing",
      },
      {
        id: "editing",
        label: "We need reliable editing capacity",
        approach:
          "Set editing standards and turnaround SLAs → build reusable project templates → run a predictable revision process → deliver channel-ready cuts on schedule.",
        capabilities: ["Post-Production & Editing"],
        proofTags: ["video", "content"],
        strategistTopic: "Video",
      },
    ],
    capabilities: [
      {
        title: "Video Production",
        forWho: "For a steady stream of on-brand video across channels.",
        services: [
          { label: "Video Production", href: "/solutions/video-production" },
          { label: "Video Editing Services", href: "/solutions/video-editing-services" },
        ],
      },
      {
        title: "Post-Production & Editing",
        forWho: "For reliable editing capacity with predictable turnaround.",
        services: [
          { label: "Video Editing Services", href: "/solutions/video-editing-services" },
          { label: "Graphic Design Services", href: "/solutions/graphic-design-services" },
        ],
      },
      {
        title: "Content Production",
        forWho: "For keeping the content calendar full without overloading the team.",
        services: [
          { label: "Content Marketing Services", href: "/solutions/content-marketing-services" },
          { label: "SEO Services", href: "/solutions/seo-services" },
          { label: "Social Media Marketing", href: "/solutions/social-media-marketing-agency" },
        ],
      },
      {
        title: "Brand & Templates",
        forWho: "For output that stays on-brand as volume goes up.",
        services: [
          { label: "Brand Identity Design", href: "/solutions/brand-identity-design" },
          { label: "Graphic Design Services", href: "/solutions/graphic-design-services" },
        ],
      },
      {
        title: "Creative Operations",
        forWho: "For a production pipeline that runs the same way every week.",
        services: [
          { label: "Business Process Automation", href: "/solutions/business-process-automation" },
          { label: "Digital Marketing Agency", href: "/solutions/digital-marketing-agency" },
        ],
      },
    ],
    engagementFit: ["dedicated-capacity", "end-to-end", "strategic-sprint"],
    faqs: [
      {
        q: "Can you match our existing brand?",
        a: "Yes. We work from your brand guidelines and build templates so every piece stays consistent as volume increases.",
      },
      {
        q: "Do you provide ongoing capacity or one-off projects?",
        a: "Both. Most content and video work is an ongoing engagement with a set cadence, but we also take defined one-off projects.",
      },
      {
        q: "What turnaround can we expect?",
        a: "We agree a cadence and per-asset SLAs at the start and build templates and a revision process to hold to them.",
      },
      {
        q: "Can you handle multiple channels and formats?",
        a: "Yes — we produce once and adapt each asset to the aspect ratios and formats each channel needs.",
      },
      {
        q: "How do you keep the pipeline organized?",
        a: "One documented workflow with review gates, a shared asset library, and connected tools for briefs, production, and scheduling.",
      },
    ],
    proofTags: ["content", "video", "brand", "digital-marketing"],
    relatedLinks: [
      { label: "Video Production", href: "/solutions/video-production" },
      { label: "Content Marketing Services", href: "/solutions/content-marketing-services" },
      { label: "Graphic Design Services", href: "/solutions/graphic-design-services" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Talk to a Strategist", href: "/talk-to-strategist" },
    ],
    seo: {
      title: "For Marketing & Content Managers | Infomist",
      description:
        "A repeatable production system for on-brand video and content — consistent output, predictable turnaround, and organized creative operations.",
      image: "/og/persona-content-marketing.jpg",
    },
  },
];

/* ── Shared: engagement models ───────────────────────────────────────── */

export interface EngagementModel {
  id: string;
  number: string;
  title: string;
  forWho: string;
  outcome: string;
}

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    id: "strategic-sprint",
    number: "01",
    title: "Strategic Sprint",
    forWho: "For teams that need clarity before committing to implementation.",
    outcome:
      "An architecture and options view, prioritized recommendations, and an actionable execution roadmap.",
  },
  {
    id: "dedicated-capacity",
    number: "02",
    title: "Dedicated Engineering Capacity",
    forWho: "For teams that need additional senior technical capability.",
    outcome:
      "Ongoing product development and technical execution that runs in your process and reports against your metrics.",
  },
  {
    id: "end-to-end",
    number: "03",
    title: "End-to-End Delivery",
    forWho: "For organizations that want one partner from strategy through launch.",
    outcome: "Strategy → design → engineering → launch → iteration, with one accountable team.",
  },
];

export function engagementById(id: string): EngagementModel | undefined {
  return ENGAGEMENT_MODELS.find((e) => e.id === id);
}

/* ── Shared: delivery process ────────────────────────────────────────── */

export interface ProcessStep {
  number: string;
  title: string;
  body: string;
}

export const PROCESS: ProcessStep[] = [
  { number: "01", title: "Discover", body: "Understand the business, users, technology, constraints, and objectives." },
  { number: "02", title: "Diagnose", body: "Identify the highest-value opportunities and the technical considerations that shape them." },
  { number: "03", title: "Design", body: "Define the experience, the architecture, and the execution plan." },
  { number: "04", title: "Build", body: "Implement, integrate, test, and iterate in short cycles." },
  { number: "05", title: "Launch & improve", body: "Deploy, measure against the baseline, learn, and optimize." },
];

/* ── Lookups ─────────────────────────────────────────────────────────── */

export function personaBySlug(slug: string): Persona | undefined {
  return PERSONAS.find((p) => p.slug === slug);
}

export function personaNeighbours(slug: string): { prev: Persona; next: Persona } | null {
  const i = PERSONAS.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  return {
    prev: PERSONAS[(i - 1 + PERSONAS.length) % PERSONAS.length],
    next: PERSONAS[(i + 1) % PERSONAS.length],
  };
}
