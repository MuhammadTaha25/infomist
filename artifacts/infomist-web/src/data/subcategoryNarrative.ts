/**
 * Long-form "AI-native engineering" narrative for solution subcategory pages —
 * the data behind the CHALLENGE → APPROACH → TRANSFORMATION → HOW WE BUILD →
 * CAPABILITIES → ARCHITECTURE → USE CASES → IMPACT structure.
 *
 * Design system is shared; content is per-subcategory. A slug without an entry
 * here falls back to the classic light SubcategoryPage layout.
 */

export interface Friction {
  title: string;
  body: string;
}
export interface Stage {
  title: string;
  body: string;
}
export interface UseCase {
  title: string;
  body: string;
}

export interface SubNarrative {
  /** 02 — large challenge statement */
  challenge: string;
  /** 02 — 3–4 specific frictions */
  frictions: Friction[];
  /** 04 — one line under "From data to action" (optional; a default is used) */
  approachStatement?: string;
  /** 05 — before / intelligence layer / after */
  before: string[];
  layer: string[];
  after: string[];
  /** 07 — 6–8 technical capabilities */
  capabilities: string[];
  /** 08 — ordered architecture flow nodes */
  architecture: string[];
  /** 09 — 3–6 use cases */
  useCases: UseCase[];
  /** 10 — optional override of the default four impact areas */
  businessImpact?: Stage[];
}

/* ── shared, every page ───────────────────────────────────────────────── */

export const APPROACH_STAGES: Stage[] = [
  { title: "Ingest", body: "Your data — documents, records, events, images — enters one system." },
  { title: "Understand", body: "AI models interpret that information in your business context." },
  { title: "Decide", body: "The intelligence layer identifies the next action worth taking." },
  { title: "Execute", body: "Software and automation turn the decision into a real outcome." },
];

export const BUILD_STEPS: Stage[] = [
  { title: "Discover", body: "Understand the business problem, the data, and the workflow it lives in." },
  { title: "Architect", body: "Define the AI, software, data, integration and infrastructure layers." },
  { title: "Build", body: "Develop the production system — models, interfaces, pipelines and APIs." },
  { title: "Integrate", body: "Connect the existing business systems and the people who use them." },
  { title: "Optimize", body: "Measure performance, monitor behaviour, and improve continuously." },
];

export const DEFAULT_IMPACT: Stage[] = [
  { title: "Operational efficiency", body: "Fewer repetitive manual processes across the workflow." },
  { title: "Decision velocity", body: "Move from reporting what happened to acting on what's next." },
  { title: "Scalability", body: "Automate workflows without adding headcount in proportion." },
  { title: "Visibility", body: "Turn fragmented data into one connected operational picture." },
];

export const WHY_INFOMIST: Stage[] = [
  { title: "AI-native", body: "AI is considered at the architecture level — not added after the software is built." },
  { title: "Full-stack", body: "Models, applications, APIs, automation and infrastructure are engineered as one system." },
  { title: "Production-minded", body: "We build systems that run inside real business workflows — not prototypes that stall at the demo." },
];

const DEFAULT_APPROACH =
  "We design intelligent systems that connect your data, your models and your business workflows into one operational layer.";

/* ── per-subcategory narrative ────────────────────────────────────────── */

const N: Record<string, SubNarrative> = {
  "computer-vision": {
    challenge: "Your operations generate more visual data than any team can review in time to act on it.",
    frictions: [
      { title: "Manual inspection", body: "Large volumes of images and video still need human review, slowing operations and leaving room for missed signals." },
      { title: "Disconnected visual data", body: "Cameras and image archives sit isolated from the systems that actually drive business decisions." },
      { title: "Slow response cycles", body: "Critical visual events are often detected too late to trigger a timely response." },
      { title: "Limited operational visibility", body: "Teams struggle to turn what the cameras see into measurable business intelligence." },
    ],
    before: ["Manual visual review", "Isolated image and video data", "Events caught late", "No operational metrics"],
    layer: ["Vision models", "AI reasoning", "Business rules", "Automation"],
    after: ["Automated inspection", "Real-time detection", "Consistent visual analysis", "Operational intelligence"],
    capabilities: [
      "Object detection", "Image classification", "Video analytics", "OCR & document capture",
      "Visual inspection", "Real-time detection", "Custom vision models", "Computer vision APIs",
    ],
    architecture: ["Image / video", "Vision model", "Detection", "Classification", "AI reasoning", "Business rule", "Action"],
    useCases: [
      { title: "Manufacturing", body: "Automated visual inspection on the line — defects flagged the moment they appear." },
      { title: "Retail", body: "Shelf, planogram and inventory intelligence from existing camera feeds." },
      { title: "Security", body: "Real-time detection of visual events that matter, routed to the right team." },
      { title: "Logistics", body: "Package, dock and yard monitoring turned into operational signals." },
    ],
  },

  "nlp-solutions": {
    challenge: "Your organisation's knowledge is trapped in documents that search can't actually understand.",
    frictions: [
      { title: "Knowledge locked in documents", body: "Answers exist somewhere in PDFs, wikis and tickets — but not where people need them." },
      { title: "Search without context", body: "Keyword search returns matches, not answers, and misses anything phrased differently." },
      { title: "Generic LLMs lack your knowledge", body: "Off-the-shelf models don't know your products, policies or history — so they guess." },
      { title: "Information stays un-operational", body: "Even when the answer is found, nothing connects it to the next business action." },
    ],
    before: ["Knowledge scattered across tools", "Keyword-only search", "Generic, unreliable AI answers", "Manual information lookup"],
    layer: ["Ingestion", "Embeddings", "Retrieval", "LLM"],
    after: ["Fast knowledge retrieval", "Context-aware answers", "Centralised organisational knowledge", "Less manual lookup"],
    capabilities: [
      "Document ingestion", "Chunking strategies", "Embeddings", "Vector search",
      "Retrieval pipelines", "Context engineering", "LLM integration", "Answer evaluation",
    ],
    architecture: ["Documents", "Ingestion", "Chunking", "Embeddings", "Vector database", "Retrieval", "LLM", "Grounded response"],
    useCases: [
      { title: "Internal knowledge assistant", body: "Staff ask in plain language and get answers grounded in your own documentation." },
      { title: "Customer support", body: "Deflect repeat questions with answers drawn from your real knowledge base." },
      { title: "Research & analysis", body: "Summarise and cross-reference large document sets in minutes, not days." },
      { title: "Policy & compliance", body: "Surface the exact clause and source behind every answer." },
    ],
  },

  "ai-agents": {
    challenge: "Your team spends its day on repetitive, multi-step tasks that an assistant could actually run end to end.",
    frictions: [
      { title: "Repetitive multi-step work", body: "People move data between tools, chase approvals and re-run the same process daily." },
      { title: "Systems that don't talk", body: "Each tool holds part of the picture; joining them up is manual." },
      { title: "AI that stops at answering", body: "Chat assistants explain what to do but don't do it." },
      { title: "Actions still need a human", body: "Every business outcome waits on someone to click the buttons." },
    ],
    before: ["Manual multi-step tasks", "Disconnected systems", "AI that only answers", "Human-executed actions"],
    layer: ["Reasoning", "Tools", "APIs", "Memory"],
    after: ["Autonomous workflow execution", "Less repetitive work", "Faster operational response", "AI wired into your systems"],
    capabilities: [
      "Tool calling", "Workflow orchestration", "Memory & state", "Planning & decomposition",
      "API integration", "Human-in-the-loop", "Agent evaluation", "Observability",
    ],
    architecture: ["User intent", "Reasoning", "Planning", "Tools", "APIs", "Human check", "Action"],
    useCases: [
      { title: "Operations", body: "Agents that run recurring back-office processes across your tools." },
      { title: "Sales", body: "Research, enrich and prep accounts before a rep ever opens the CRM." },
      { title: "Support", body: "Triage, resolve and escalate tickets with real actions, not just replies." },
      { title: "Data work", body: "Reconcile, clean and route data between systems on a schedule." },
    ],
  },

  "generative-ai": {
    challenge: "AI experiments are everywhere in the business — and almost none of them are wired into a workflow.",
    frictions: [
      { title: "Knowledge scattered across tools", body: "The context a model needs to be useful is spread across a dozen systems." },
      { title: "Time lost searching", body: "Employees spend real hours locating information before they can use it." },
      { title: "Generic AI, unreliable output", body: "Un-grounded models produce answers that can't be trusted for real decisions." },
      { title: "Experiments that never ship", body: "Promising demos stall because nothing connects them to production." },
    ],
    before: ["Unstructured knowledge", "Generic model output", "Disconnected experiments", "Manual creative work"],
    layer: ["Context", "Models", "Guardrails", "Integration"],
    after: ["Faster knowledge access", "Context-aware AI interactions", "Integrated workflows", "Scalable AI capability"],
    capabilities: [
      "Retrieval-augmented generation", "Prompt & context engineering", "Content generation",
      "Structured output", "Model evaluation", "Guardrails & safety", "LLM APIs", "Fine-tuning where it pays off",
    ],
    architecture: ["Unstructured knowledge", "AI intelligence layer", "Contextual answers", "Business action"],
    useCases: [
      { title: "Content operations", body: "Generate on-brand drafts at volume with a human approving the last mile." },
      { title: "Product features", body: "Ship AI-powered features inside your own application, not a separate tool." },
      { title: "Internal tooling", body: "Assistants that sit on your data and speed up everyday knowledge work." },
      { title: "Personalisation", body: "Tailor communication and experiences without scaling the team." },
    ],
  },

  "ai-automation-services": {
    challenge: "Your team is the integration layer between systems that were never designed to talk to each other.",
    frictions: [
      { title: "Repetitive manual workflows", body: "The same sequence of steps runs every day, by hand, across the business." },
      { title: "Copy-paste between systems", body: "Data is re-keyed from one tool into another because nothing connects them." },
      { title: "Human-dependent approvals", body: "Processes stall waiting for someone to review and forward." },
      { title: "No workflow intelligence", body: "There's no single view of what's running, what's stuck, or what failed." },
    ],
    before: ["Manual, repetitive workflows", "Copy-paste operations", "Human-dependent approvals", "No central visibility"],
    layer: ["Triggers", "AI decisions", "Automation", "Integrations"],
    after: ["Less manual intervention", "Faster workflow execution", "Connected tools", "Scalable operations"],
    capabilities: [
      "Workflow orchestration", "AI decision steps", "System integration", "Event triggers",
      "Data transformation", "Human-in-the-loop", "Error handling & retries", "Monitoring & alerts",
    ],
    architecture: ["Trigger", "Data", "AI processing", "Decision", "Workflow", "API / CRM", "Result"],
    useCases: [
      { title: "Back office", body: "Invoice, onboarding and reconciliation processes run without a queue." },
      { title: "Sales ops", body: "Leads routed, enriched and followed up the moment they arrive." },
      { title: "Support ops", body: "Tickets classified, assigned and updated across systems automatically." },
      { title: "Reporting", body: "Data pulled, joined and delivered on schedule with no manual export." },
    ],
  },

  "business-process-automation": {
    challenge: "The processes that keep the business running depend on people remembering to run them.",
    frictions: [
      { title: "Manual bottlenecks", body: "Critical processes wait on a specific person being available to move them forward." },
      { title: "Fragile hand-offs", body: "Work passes between teams and tools with no system tracking the baton." },
      { title: "Proof-of-concept automations", body: "Scripts and quick fixes exist but nothing is built for production reliability." },
      { title: "No process visibility", body: "Leadership can't see cycle times, backlogs or where work is stuck." },
    ],
    before: ["Person-dependent processes", "Untracked hand-offs", "Fragile scripts", "No cycle-time visibility"],
    layer: ["Triggers", "AI decisions", "Automation", "Integrations"],
    after: ["Processes that run themselves", "Tracked, reliable hand-offs", "Production-grade automation", "Real process metrics"],
    capabilities: [
      "Process mapping", "Workflow orchestration", "AI decision steps", "System integration",
      "Exception handling", "Human-in-the-loop", "Audit trails", "Monitoring & alerts",
    ],
    architecture: ["Trigger", "Data", "AI processing", "Decision", "Workflow", "API / system", "Result"],
    useCases: [
      { title: "Finance", body: "Approvals, reconciliations and month-end steps that no longer wait on a person." },
      { title: "HR & onboarding", body: "New-hire provisioning across every system from a single trigger." },
      { title: "Operations", body: "Recurring operational checklists executed and logged automatically." },
      { title: "Compliance", body: "Every step recorded, timestamped and auditable by design." },
    ],
  },

  "crm-integration": {
    challenge: "Your customer data is spread across tools, and none of it automatically triggers the next action.",
    frictions: [
      { title: "Fragmented customer information", body: "The full picture of a customer is split across the CRM, support, billing and email." },
      { title: "Manual follow-ups", body: "Whether a lead gets chased depends on someone remembering to do it." },
      { title: "Reps without context", body: "Sales opens the CRM to stale data and no signal on what changed." },
      { title: "Data that doesn't act", body: "A field updates and nothing happens — no workflow, no alert, no next step." },
    ],
    before: ["Customer data in silos", "Manual segmentation", "Disconnected tools", "Delayed follow-ups"],
    layer: ["AI analysis", "CRM", "Automation", "Customer data"],
    after: ["Intelligent segmentation", "Automated follow-ups", "Connected customer journeys", "Actionable customer insight"],
    capabilities: [
      "CRM & tech-stack integration", "Bi-directional sync", "Data migration & de-duplication",
      "Lead scoring & routing", "Workflow automation", "Reporting pipelines", "API development", "Real-time triggers",
    ],
    architecture: ["Customer data", "AI analysis", "Segmentation", "Automation", "CRM action"],
    useCases: [
      { title: "Sales", body: "Every rep opens the CRM to a complete, current view of the account." },
      { title: "Marketing", body: "Segments and journeys that update themselves as behaviour changes." },
      { title: "Customer success", body: "Health signals from product and support surfaced in the CRM." },
      { title: "RevOps", body: "One connected data layer feeding clean reporting and forecasting." },
    ],
  },

  "digital-marketing-agency": {
    challenge: "Campaign operations are repetitive, and personalisation breaks the moment you try to scale it.",
    frictions: [
      { title: "Repetitive campaign workflows", body: "The same build-launch-report cycle is run by hand for every campaign." },
      { title: "Manual lead qualification", body: "Leads pile up waiting for someone to score and route them." },
      { title: "Personalisation that won't scale", body: "Tailoring messaging works for ten contacts, not ten thousand." },
      { title: "Tools in silos", body: "Ad platforms, CRM, analytics and email don't share a source of truth." },
    ],
    before: ["Manual campaign operations", "Slow lead handling", "One-size messaging", "Siloed marketing tools"],
    layer: ["Data", "AI qualification", "Personalisation", "Automation"],
    after: ["Scalable personalisation", "Faster lead handling", "Automated campaign operations", "Connected marketing data"],
    capabilities: [
      "Marketing automation", "Lead scoring & routing", "Audience segmentation", "Content personalisation",
      "Attribution modelling", "CRM & ad-platform integration", "Reporting pipelines", "Experimentation workflows",
    ],
    architecture: ["Lead", "Data", "AI qualification", "Personalisation", "Automation", "Conversion"],
    useCases: [
      { title: "Demand generation", body: "Leads qualified and routed to sales the moment intent appears." },
      { title: "Lifecycle marketing", body: "Journeys that adapt to each contact's behaviour automatically." },
      { title: "Content operations", body: "Personalised variants produced at volume with human sign-off." },
      { title: "Reporting", body: "Unified attribution across channels without manual spreadsheet work." },
    ],
  },

  "ppc-management-services": {
    challenge: "Campaign data changes by the hour, and manual optimisation can't keep pace with it.",
    frictions: [
      { title: "Constantly shifting data", body: "Auctions, costs and conversions move faster than a weekly review can catch." },
      { title: "Slow manual optimisation", body: "Bid and budget changes wait on a person having time to make them." },
      { title: "Hard-to-monitor datasets", body: "Account, campaign and keyword data is too large to watch closely by hand." },
      { title: "Insights that don't act", body: "The analysis is done, but turning it into changes is another manual step." },
    ],
    before: ["Weekly manual reviews", "Slow bid & budget changes", "Unwatched large datasets", "Insight-to-action lag"],
    layer: ["Analysis", "AI insight", "Optimisation", "Action"],
    after: ["Faster campaign decisions", "Automated monitoring", "Continuous optimisation", "Better operational efficiency"],
    capabilities: [
      "Automated monitoring", "Anomaly detection", "Bid & budget automation", "Audience & keyword analysis",
      "Cross-platform reporting", "Attribution modelling", "Ad-platform APIs", "Alerting workflows",
    ],
    architecture: ["Campaign data", "Analysis", "AI insight", "Optimisation", "Action"],
    useCases: [
      { title: "Performance monitoring", body: "Spend and conversion anomalies flagged the hour they happen." },
      { title: "Bid & budget management", body: "Routine adjustments automated against your rules and targets." },
      { title: "Reporting", body: "One view across Google, Meta and the rest — no manual consolidation." },
      { title: "Experimentation", body: "Tests structured, tracked and read consistently across accounts." },
    ],
  },

  "software-development": {
    challenge: "Development cycles are expensive, and AI still sits outside the workflow that produces your software.",
    frictions: [
      { title: "Expensive development cycles", body: "Every change moves through a long, mostly-manual path to production." },
      { title: "Fragmented tooling", body: "Teams stitch together issue trackers, repos, CI and docs by hand." },
      { title: "Repetitive engineering work", body: "Boilerplate, glue code and manual testing consume senior time." },
      { title: "AI outside the loop", body: "AI assists individuals but isn't part of how the system is built and shipped." },
    ],
    before: ["Long manual delivery path", "Fragmented tooling", "Repetitive engineering work", "AI used ad hoc"],
    layer: ["Architecture", "AI-assisted engineering", "Testing", "Deployment"],
    after: ["Faster development workflows", "More automated engineering", "Integrated AI tooling", "Production-ready systems"],
    capabilities: [
      "System architecture", "API design & development", "AI-assisted engineering", "Automated testing",
      "CI/CD pipelines", "Observability", "Cloud infrastructure", "Legacy modernisation",
    ],
    architecture: ["Requirements", "Architecture", "AI-assisted engineering", "Software", "Testing", "Deployment"],
    useCases: [
      { title: "Product engineering", body: "Ship and iterate on a real product with a senior team, not a body shop." },
      { title: "Platform builds", body: "Internal platforms and services engineered for scale from day one." },
      { title: "Modernisation", body: "Move legacy systems forward without a big-bang rewrite." },
      { title: "AI features", body: "Embed models, agents and automation into the software itself." },
    ],
  },

  "custom-software-development": {
    challenge: "Off-the-shelf tools force your business to work the way the software works — not the other way round.",
    frictions: [
      { title: "Process forced to fit the tool", body: "Generic software imposes workflows that don't match how you actually operate." },
      { title: "Integration gaps", body: "The tools you rely on don't connect, so people bridge them manually." },
      { title: "Data locked in vendors", body: "Your own operational data is hard to get at and harder to act on." },
      { title: "Scaling means more licences, not more capability", body: "Growth adds cost without removing the manual work underneath." },
    ],
    before: ["Process forced to fit the tool", "Manual integration", "Vendor-locked data", "Cost that scales with headcount"],
    layer: ["Architecture", "AI-assisted engineering", "Integration", "Automation"],
    after: ["Software built around your workflow", "Connected business systems", "Data you own and can act on", "Capability that scales"],
    capabilities: [
      "Bespoke application development", "System architecture", "API & integration layers", "Workflow automation",
      "Dashboards & internal tools", "AI feature integration", "Cloud infrastructure", "Ongoing support",
    ],
    architecture: ["Requirements", "Architecture", "AI-assisted engineering", "Software", "Integration", "Business system"],
    useCases: [
      { title: "Operational platforms", body: "The system your business runs on, built to your actual process." },
      { title: "Internal tools", body: "Dashboards and admin tools that replace spreadsheets and manual steps." },
      { title: "Client / partner portals", body: "External-facing applications connected to your back office." },
      { title: "Integration layers", body: "The connective tissue that makes your existing tools work as one." },
    ],
  },

  "website-development": {
    challenge: "A generic website can't support the workflows a modern business actually runs on.",
    frictions: [
      { title: "Disconnected systems", body: "The site, the CRM and the back office each hold part of the picture." },
      { title: "Templates that can't flex", body: "Off-the-shelf builds don't support complex, business-specific journeys." },
      { title: "Isolated data", body: "What visitors do on the site never reaches the systems that could act on it." },
      { title: "Scaling needs custom infrastructure", body: "Traffic and functionality growth quickly outgrow the template." },
    ],
    before: ["Disconnected systems", "Rigid templates", "Isolated visitor data", "Infrastructure ceiling"],
    layer: ["Application", "APIs", "Data", "AI / automation"],
    after: ["Custom digital workflows", "Connected business systems", "Intelligent user experiences", "Scalable architecture"],
    capabilities: [
      "Full-stack web development", "Headless & API-first builds", "Performance & Core Web Vitals",
      "CMS & content modelling", "Integration layers", "Analytics & tracking", "AI-powered features", "Accessibility (WCAG)",
    ],
    architecture: ["User", "Application", "API", "Data", "AI / automation", "Business system"],
    useCases: [
      { title: "Marketing sites that convert", body: "Fast, well-structured sites wired into your CRM and analytics." },
      { title: "Web applications", body: "Logged-in experiences and tools, not just brochure pages." },
      { title: "Content platforms", body: "Editorial and publishing systems built for scale." },
      { title: "Commerce", body: "Storefronts connected to inventory, fulfilment and support." },
    ],
  },

  "saas-development": {
    challenge: "Turning a product idea into a SaaS business means building far more than the feature that makes it useful.",
    frictions: [
      { title: "The 80% that isn't the product", body: "Auth, billing, multi-tenancy and permissions consume the roadmap before features do." },
      { title: "Architecture decisions made early and forever", body: "Choices about tenancy and data model are hard to reverse later." },
      { title: "Scaling surprises", body: "The system that worked for ten customers strains at a thousand." },
      { title: "AI bolted on late", body: "Retro-fitting intelligence into a mature product is expensive and awkward." },
    ],
    before: ["Feature work blocked by plumbing", "Fragile early architecture", "Scaling surprises", "AI as an afterthought"],
    layer: ["Architecture", "Multi-tenancy", "Billing & auth", "AI / automation"],
    after: ["Product-first roadmap", "Architecture built to scale", "Predictable growth", "AI designed in"],
    capabilities: [
      "SaaS architecture", "Multi-tenancy & RBAC", "Billing & subscriptions", "Auth & SSO",
      "API & webhook platform", "Usage metering & analytics", "AI feature integration", "Cloud infrastructure & CI/CD",
    ],
    architecture: ["User", "Application", "API", "Multi-tenant data", "AI / automation", "Billing & analytics"],
    useCases: [
      { title: "0 → 1 product builds", body: "Concept to production SaaS with the platform handled end to end." },
      { title: "Scaling an existing product", body: "Re-architect the parts that are now holding growth back." },
      { title: "Platform & API", body: "Turn a product into a platform others can build on." },
      { title: "AI-native SaaS", body: "Products where the intelligence is the point, engineered as such." },
    ],
  },
};

/* aliases — close subcategories share a narrative shape */
N["autonomous-ai-agents"] = N["ai-agents"];
N["google-ads-agency"] = N["ppc-management-services"];
N["facebook-ads-agency"] = N["ppc-management-services"];

export function getSubNarrative(slug: string): SubNarrative | null {
  return N[slug] ?? null;
}

export { DEFAULT_APPROACH };
