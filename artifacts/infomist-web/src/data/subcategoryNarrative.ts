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
  /** 04 — overrides for non-AI subcategories (design, video, print, …) */
  approachTitle?: string;
  approachStatement?: string;
  approachStages?: Stage[];
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

/** Shared override for creative / design subcategories. */
export const DESIGN_APPROACH = {
  title: "From brief to system.",
  statement:
    "We turn brand and product intent into a system — components, rules and assets — so every future piece is fast and consistent.",
  stages: [
    { title: "Define", body: "Understand the brand, the audience and where the work has to perform." },
    { title: "Design", body: "Build the visual language — type, colour, layout, motion." },
    { title: "Systemise", body: "Turn it into components, templates and written guidelines." },
    { title: "Apply", body: "Roll it out across every touchpoint and hand over the system." },
  ] as Stage[],
};

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

  "ai-voice-agent-development": {
    challenge: "Every unanswered call is a lead, a booking or a customer you don't get back.",
    frictions: [
      { title: "Call volume outpaces the team", body: "Inbound peaks overwhelm the people answering, and callers wait or hang up." },
      { title: "Leads go cold after hours", body: "Calls outside business hours ring out — and the enquiry moves on to a competitor." },
      { title: "Hiring and training is slow", body: "Every new agent is weeks of ramp-up before they handle calls unassisted." },
      { title: "Inconsistent conversations", body: "Script adherence, tone and outcomes vary from one agent and one shift to the next." },
    ],
    before: ["Missed and abandoned calls", "No after-hours coverage", "Slow, costly hiring", "Inconsistent call quality"],
    layer: ["Speech recognition", "LLM reasoning", "CRM & calendar tools", "Call routing"],
    after: ["24/7 call handling", "Every enquiry answered instantly", "Qualification & booking automated", "Consistent, on-brand conversations"],
    capabilities: [
      "Inbound & outbound voice", "Real-time speech-to-text", "Natural conversation (GPT-4o / Claude)",
      "Appointment booking", "Lead qualification", "Warm human transfer", "CRM & telephony integration", "Call analytics",
    ],
    architecture: ["Inbound call", "Speech-to-text", "LLM reasoning", "Tools & CRM", "Voice response", "Booked / routed action"],
    useCases: [
      { title: "Lead qualification", body: "Every inbound caller is greeted, qualified and routed in seconds." },
      { title: "Appointment booking", body: "The agent checks real availability and books straight into the calendar." },
      { title: "After-hours reception", body: "Nights and weekends covered with the same script and CRM logging." },
      { title: "Overflow handling", body: "Spikes absorbed without callers ever hearing a hold queue." },
    ],
  },

  "ai-chatbot-development": {
    challenge: "Your support and sales teams answer the same questions all day while genuinely new ones wait.",
    frictions: [
      { title: "Repeat questions dominate", body: "A large share of tickets and chats are variations of the same handful of asks." },
      { title: "Answers live in scattered docs", body: "Support pulls from a wiki, a help centre and tribal knowledge — inconsistently." },
      { title: "Generic bots frustrate customers", body: "Rule-based chat can't handle rephrasing and dead-ends into 'talk to an agent'." },
      { title: "No path from answer to action", body: "Even a correct answer doesn't create the order, ticket or booking behind it." },
    ],
    before: ["Agents on repeat questions", "Inconsistent answers", "Rigid rule-based bots", "Answer without action"],
    layer: ["Intent detection", "Knowledge retrieval", "LLM", "Business tools"],
    after: ["Deflected repeat volume", "Answers grounded in your content", "Natural, resilient conversation", "Actions completed in-chat"],
    capabilities: [
      "Website, app & WhatsApp chat", "Retrieval over your knowledge base", "Intent & entity extraction",
      "LLM conversation", "Lead capture & qualification", "Human handoff", "CRM & helpdesk integration", "Conversation analytics",
    ],
    architecture: ["Message", "Intent", "Knowledge retrieval", "LLM", "Response", "Handoff / action"],
    useCases: [
      { title: "Customer support", body: "First-line resolution for the questions your docs already answer." },
      { title: "Sales assistant", body: "Qualifies visitors and books demos before a rep is involved." },
      { title: "WhatsApp commerce", body: "Order status, FAQs and re-orders handled in the channel customers use." },
      { title: "Internal helpdesk", body: "IT and HR questions answered from policy, with tickets raised automatically." },
    ],
  },

  "deep-learning": {
    challenge: "Off-the-shelf models hit an accuracy ceiling on the problems that are specific to your data.",
    frictions: [
      { title: "Generic models plateau", body: "Pre-trained APIs get you 80% of the way and then stop improving on your edge cases." },
      { title: "Data isn't model-ready", body: "Labels, splits and pipelines don't exist, so every experiment starts from scratch." },
      { title: "Prototypes don't reach production", body: "A notebook that works never becomes a monitored, versioned, served model." },
      { title: "No feedback loop", body: "Once deployed, nothing captures where the model is wrong so it can improve." },
    ],
    before: ["Accuracy ceiling on edge cases", "Ad-hoc data handling", "Notebook-only models", "No retraining loop"],
    layer: ["Data pipelines", "Model training", "Evaluation", "Serving"],
    after: ["Accuracy tuned to your data", "Reproducible training pipelines", "Versioned, monitored models", "Continuous improvement"],
    capabilities: [
      "Custom model architecture", "Training pipelines & MLOps", "Forecasting & prediction", "Recommendation systems",
      "Pattern & anomaly detection", "Model evaluation & monitoring", "Inference APIs", "Retraining automation",
    ],
    architecture: ["Data", "Features", "Model training", "Evaluation", "Inference", "Decision"],
    useCases: [
      { title: "Demand forecasting", body: "Predict volume, load or churn on your own history, not a generic curve." },
      { title: "Recommendation", body: "Rank products, content or actions for each user in real time." },
      { title: "Anomaly detection", body: "Flag fraud, faults or outliers the moment the pattern breaks." },
      { title: "Complex classification", body: "Categorise text, images or events where rules can't keep up." },
    ],
  },

  "mobile-app-developer": {
    challenge: "A mobile app is only useful when it's connected to the systems that actually run the business.",
    frictions: [
      { title: "Apps disconnected from the back office", body: "The app and the core systems hold different versions of the truth." },
      { title: "Two platforms, double the work", body: "iOS and Android drift apart in features, quality and release cadence." },
      { title: "Slow, risky releases", body: "Each store submission is a manual, anxious event rather than a routine." },
      { title: "No intelligence in the experience", body: "The app collects data but never uses it to make the next action easier." },
    ],
    before: ["App out of sync with systems", "Divergent iOS / Android", "Manual, risky releases", "No in-app intelligence"],
    layer: ["Application", "API layer", "Data", "AI / automation"],
    after: ["Real-time connection to the business", "One codebase, both platforms", "Automated release pipelines", "Context-aware experiences"],
    capabilities: [
      "iOS & Android development", "React Native cross-platform", "API & offline sync", "Push & real-time features",
      "App Store & Play submission", "CI/CD for mobile", "In-app AI features", "Analytics & crash monitoring",
    ],
    architecture: ["User", "App", "API", "Data", "AI / automation", "Business system"],
    useCases: [
      { title: "Field & operations apps", body: "The tools your on-site teams use, connected live to the back office." },
      { title: "Customer apps", body: "Accounts, bookings and support in an app that reflects real system state." },
      { title: "Internal tools", body: "Approvals, inventory and reporting in a pocket, not a spreadsheet." },
      { title: "Marketplace & commerce", body: "Storefront apps wired to inventory, payments and fulfilment." },
    ],
  },

  "enterprise-software-development": {
    challenge: "Mission-critical systems can't be replaced in a big bang — but they can't stay as they are either.",
    frictions: [
      { title: "Legacy systems block change", body: "Core platforms are too risky to touch and too rigid to extend." },
      { title: "Integration debt compounds", body: "Every new tool is bolted on with another brittle point-to-point connection." },
      { title: "Security and compliance overhead", body: "Each change carries audit, access and data-residency requirements that slow delivery." },
      { title: "Scale exposes the cracks", body: "Volume and concurrency surface failure modes the original design never anticipated." },
    ],
    before: ["Change-resistant legacy core", "Point-to-point integration debt", "Slow, compliance-heavy delivery", "Scaling failures"],
    layer: ["Architecture", "Integration", "AI / automation", "Infrastructure"],
    after: ["Legacy modernised incrementally", "One governed integration layer", "Delivery that keeps compliance", "Systems built for real scale"],
    capabilities: [
      "Enterprise architecture", "Legacy modernisation", "Integration & middleware", "Identity, access & audit",
      "Cloud & on-prem infrastructure", "Automated testing at scale", "Observability", "AI feature integration",
    ],
    architecture: ["Requirements", "Architecture", "Build", "Integrate", "Deploy", "Operate"],
    useCases: [
      { title: "Core platform builds", body: "The system a large organisation runs on, engineered for its real constraints." },
      { title: "Legacy modernisation", body: "Move critical systems forward in safe, reversible increments." },
      { title: "Integration platforms", body: "Replace tangled connections with one governed data and event layer." },
      { title: "Regulated delivery", body: "Ship into finance, health or public sector without cutting compliance corners." },
    ],
  },

  "salesforce-consulting-services": {
    challenge: "Salesforce only pays back when it's configured around your real sales process — not the demo org.",
    frictions: [
      { title: "Out-of-the-box, not your process", body: "Default objects and stages don't match how your team actually sells or serves." },
      { title: "Low adoption", body: "Reps work around the CRM because entering data feels like overhead, not help." },
      { title: "Data quality erodes", body: "Duplicates, blank fields and stale records make reporting untrustworthy." },
      { title: "Automation gaps", body: "Manual steps between Salesforce and other tools keep the process from flowing." },
    ],
    before: ["Generic configuration", "Reps working around the CRM", "Unreliable data", "Manual cross-tool steps"],
    layer: ["Process design", "Salesforce config", "Automation", "Integration"],
    after: ["Configured to your real process", "A CRM the team actually uses", "Clean, trustworthy data", "Process that flows end to end"],
    capabilities: [
      "Salesforce consulting & audit", "Sales / Service / Marketing Cloud", "Custom objects & flows",
      "Data migration & de-duplication", "Automation & approvals", "Integration with your stack", "Reporting & dashboards", "User training & rollout",
    ],
    architecture: ["Business process", "Salesforce config", "Data model", "Automation", "Integration", "Adoption"],
    useCases: [
      { title: "Implementation", body: "A first Salesforce rollout scoped to your process, data and team." },
      { title: "Rescue & optimisation", body: "Fix an org that's drifted into low adoption and unreliable data." },
      { title: "Cloud expansion", body: "Add Service or Marketing Cloud onto a working Sales Cloud base." },
      { title: "Integration", body: "Connect Salesforce to billing, support and the rest of the stack." },
    ],
  },

  "system-integration": {
    challenge: "Your teams are the integration layer — moving data between systems that were never meant to connect.",
    frictions: [
      { title: "Manual data movement", body: "People export, reformat and re-import between systems every day." },
      { title: "No single source of truth", body: "Customer, order and inventory data disagree depending on which system you ask." },
      { title: "Brittle point-to-point links", body: "Each integration is bespoke, undocumented and breaks when either side changes." },
      { title: "No real-time visibility", body: "By the time data lines up across systems, the moment to act has passed." },
    ],
    before: ["Manual data movement", "Conflicting sources of truth", "Brittle point-to-point links", "Delayed cross-system data"],
    layer: ["Connectors", "Transformation", "Orchestration", "Event streaming"],
    after: ["Automated data flow", "One governed data layer", "Documented, resilient integrations", "Real-time system-wide visibility"],
    capabilities: [
      "Integration architecture", "API development & gateways", "iPaaS & middleware", "Event streaming",
      "Data transformation & mapping", "Legacy system connectors", "Error handling & retries", "Monitoring & alerting",
    ],
    architecture: ["Systems", "Connectors", "Transformation", "Orchestration", "Real-time data layer", "Action"],
    useCases: [
      { title: "ERP / CRM integration", body: "Keep finance, sales and operations working from the same records." },
      { title: "E-commerce & fulfilment", body: "Orders, stock and shipping synchronised without manual reconciliation." },
      { title: "Data consolidation", body: "One clean layer feeding analytics, reporting and AI." },
      { title: "Legacy connectivity", body: "Expose old systems through modern APIs without replacing them." },
    ],
  },

  "graphic-design-services": {
    challenge: "Without a system, every new asset is a fresh negotiation about how the brand should look.",
    frictions: [
      { title: "Inconsistent output", body: "Assets from different people and freelancers don't look like the same brand." },
      { title: "Slow turnaround", body: "Every request starts from a blank canvas instead of a component library." },
      { title: "No single source of truth", body: "Logos, colours and templates live in scattered folders and inboxes." },
      { title: "Design doesn't scale", body: "More channels and campaigns mean linearly more design hours." },
    ],
    before: ["Inconsistent assets", "Blank-canvas turnaround", "Scattered brand files", "Design that scales with headcount"],
    layer: ["Brand system", "Component library", "Templates", "Guidelines"],
    after: ["Consistent, on-brand output", "Fast, system-driven production", "One source of truth", "Design that scales with channels"],
    capabilities: [
      "Design systems", "Marketing asset production", "Social & campaign templates", "Presentation & document design",
      "Iconography & illustration", "Brand guideline documentation", "Print & digital layout", "Asset library setup",
    ],
    architecture: ["Brand inputs", "System design", "Components", "Templates", "Assets", "Consistent output"],
    useCases: [
      { title: "Design system build", body: "The components and rules that make every future asset faster and on-brand." },
      { title: "Campaign production", body: "Full asset sets across channels from one visual system." },
      { title: "Sales & pitch collateral", body: "Decks and documents that look designed, not assembled." },
      { title: "Rebrand rollout", body: "Apply a new identity consistently across every touchpoint." },
    ],
  },

  "brand-identity-design": {
    challenge: "A logo isn't a brand — and without the system around it, consistency falls apart on contact with reality.",
    frictions: [
      { title: "Identity without a system", body: "There's a logo, but no rules for type, colour, spacing or voice." },
      { title: "Inconsistent application", body: "The brand looks different on the site, the deck and the invoice." },
      { title: "Doesn't scale to new contexts", body: "Every new format needs a designer to decide how the brand behaves." },
      { title: "Weak differentiation", body: "The identity blends into the category instead of standing apart from it." },
    ],
    before: ["Logo without a system", "Inconsistent application", "Designer needed for every format", "Blends into the category"],
    layer: ["Positioning", "Identity system", "Guidelines", "Applications"],
    after: ["A complete identity system", "Consistent across every touchpoint", "Scales to new formats by rule", "Distinct in the category"],
    capabilities: [
      "Brand positioning", "Logo & identity design", "Typography & colour systems", "Visual language & art direction",
      "Brand guidelines", "Stationery & templates", "Digital brand application", "Rollout support",
    ],
    architecture: ["Positioning", "Identity system", "Applications", "Guidelines", "Rollout"],
    useCases: [
      { title: "New brand", body: "A complete identity for a launch — not just a mark, the whole system." },
      { title: "Rebrand", body: "Evolve an existing identity and roll it out without losing equity." },
      { title: "Sub-brands", body: "Related identities that hold together under one parent system." },
      { title: "Brand guidelines", body: "The reference that keeps everyone on-brand without a designer in the room." },
    ],
  },

  "ux-design": {
    challenge: "Teams ship screens; users experience flows — and the gap between the two is where products fail.",
    frictions: [
      { title: "Designed screen by screen", body: "Individual pages look fine but the journey between them is confusing." },
      { title: "Decisions without evidence", body: "Layout and flow are argued from opinion, not from user behaviour." },
      { title: "No shared design language", body: "Every feature reinvents patterns, so the product feels inconsistent." },
      { title: "Usability found late", body: "Problems surface in support tickets instead of in testing." },
    ],
    before: ["Screen-by-screen design", "Opinion-led decisions", "Reinvented patterns", "Usability issues found in production"],
    layer: ["Research", "Flows & IA", "Prototype", "Design system"],
    after: ["Journeys designed end to end", "Evidence-led decisions", "One shared design language", "Usability validated before build"],
    capabilities: [
      "User research & interviews", "Information architecture", "User flows & journey mapping", "Wireframing & prototyping",
      "Usability testing", "Interaction & UI design", "Design systems", "Accessibility (WCAG)",
    ],
    architecture: ["Research", "Flows", "Wireframes", "Prototype", "Test", "Design system"],
    useCases: [
      { title: "New product design", body: "From research to a tested, buildable design system for a 0→1 product." },
      { title: "Redesign", body: "Fix a product where usage data and support volume say the UX is failing." },
      { title: "Design system", body: "The components and patterns that keep a growing product coherent." },
      { title: "Usability audit", body: "Find and prioritise the friction costing you conversion and retention." },
    ],
  },

  "video-production": {
    challenge: "Most product video explains features; almost none of it makes someone feel why the product matters.",
    frictions: [
      { title: "Feature lists, not stories", body: "Videos walk through screens instead of showing the problem being solved." },
      { title: "Inconsistent quality", body: "Output varies with whoever edited it — pacing, sound and grade all drift." },
      { title: "Slow, linear production", body: "Every video is a from-scratch project with no reusable system." },
      { title: "One format, one channel", body: "The asset isn't cut down for the places it actually needs to run." },
    ],
    before: ["Feature-walkthrough videos", "Inconsistent craft", "From-scratch every time", "Single format and channel"],
    layer: ["Script & story", "Production", "Edit & post", "Delivery"],
    after: ["Story-led product films", "Consistent, high craft", "A repeatable production system", "Cut for every channel that needs it"],
    capabilities: [
      "Concept & scriptwriting", "Story-led editing", "Motion graphics & animation", "Screen & product capture",
      "Colour grading", "Sound design & mix", "Short-form & social cutdowns", "Subtitling & localisation",
    ],
    architecture: ["Brief", "Script", "Production", "Edit", "Grade & sound", "Delivery"],
    useCases: [
      { title: "Product films", body: "The hero video that makes a complex product make sense in 90 seconds." },
      { title: "Launch campaigns", body: "A film plus the full set of social cutdowns from one shoot." },
      { title: "Explainer & onboarding", body: "Motion-led pieces that shorten the path to 'I get it'." },
      { title: "Customer stories", body: "Evidence-led films where the customer does the talking." },
    ],
  },

  "brochure-design": {
    challenge: "Print and publication work fails on the details — and the details are the whole job.",
    frictions: [
      { title: "Layout without a system", body: "Each page is composed by eye, so the document lacks rhythm and consistency." },
      { title: "Content and design out of step", body: "Copy is poured in late and the layout never quite fits it." },
      { title: "Prepress mistakes", body: "Bleed, colour profiles and resolution issues surface at the printer." },
      { title: "No reusable template", body: "The next catalogue or report starts from zero." },
    ],
    before: ["Composed by eye", "Content poured in late", "Prepress surprises", "No reusable template"],
    layer: ["Content structure", "Layout system", "Design", "Prepress"],
    after: ["A consistent grid and rhythm", "Design and content built together", "Clean, print-ready files", "A template for the next edition"],
    capabilities: [
      "Editorial layout & grids", "Brochure & catalogue design", "Report & magazine design", "Corporate stationery",
      "Infographics & data visuals", "Typesetting", "Prepress & print-ready files", "Template systems",
    ],
    architecture: ["Content", "Layout system", "Design", "Prepress", "Print-ready", "Publication"],
    useCases: [
      { title: "Corporate reports", body: "Annual and impact reports with a system that survives the content changes." },
      { title: "Product catalogues", body: "Large, structured documents built on a repeatable grid." },
      { title: "Brand collateral", body: "Brochures and stationery that match the digital identity exactly." },
      { title: "Publications", body: "Magazines and books designed for both print and digital output." },
    ],
  },

  "conversion-rate-optimization": {
    challenge: "You're paying to bring people to the site; most of them leave without doing the thing that matters.",
    frictions: [
      { title: "Traffic without conversion", body: "Acquisition spend rises but the rate at which visitors act doesn't move." },
      { title: "Changes made on opinion", body: "Design and copy decisions are argued, not tested against behaviour." },
      { title: "Tracking you can't trust", body: "Analytics and events are incomplete, so you can't see where people drop." },
      { title: "Wins that don't compound", body: "Individual experiments aren't rolled into a system that keeps improving." },
    ],
    before: ["Flat conversion rate", "Opinion-led changes", "Incomplete tracking", "Non-compounding wins"],
    layer: ["Analytics", "Hypotheses", "Experiments", "Rollout"],
    after: ["A rising conversion rate", "Evidence-led changes", "Tracking you can trust", "A compounding optimisation programme"],
    capabilities: [
      "Analytics & event tracking", "Funnel & drop-off analysis", "A/B & multivariate testing", "Landing page optimisation",
      "Session & heatmap analysis", "Personalisation", "Experiment programme design", "Reporting & attribution",
    ],
    architecture: ["Traffic", "Analysis", "Hypothesis", "Experiment", "Measurement", "Rollout"],
    useCases: [
      { title: "Landing page optimisation", body: "Lift the conversion rate on the pages your paid traffic hits." },
      { title: "Checkout & signup", body: "Find and remove the steps where people abandon." },
      { title: "Experiment programme", body: "A standing testing cadence rather than one-off redesigns." },
      { title: "Tracking foundation", body: "Clean analytics and events so every decision has evidence." },
    ],
  },

  "social-media-marketing-agency": {
    challenge: "Posting consistently is hard; posting consistently in a way that compounds into an audience is harder.",
    frictions: [
      { title: "Publishing, not strategy", body: "The calendar gets filled but there's no thesis about what the account is building." },
      { title: "Content made in isolation", body: "Each post starts from scratch instead of from a repeatable format system." },
      { title: "Engagement without insight", body: "Numbers go up and down and nobody knows which choices caused it." },
      { title: "Channels managed separately", body: "Each platform is run in its own silo with its own logic." },
    ],
    before: ["Calendar-filling", "One-off content", "Vanity metrics", "Siloed channels"],
    layer: ["Audience & strategy", "Content system", "Publishing", "Analysis"],
    after: ["A clear account thesis", "Repeatable content formats", "Insight-driven decisions", "Channels run as one system"],
    capabilities: [
      "Channel strategy", "Content format systems", "Editorial calendars", "Community management",
      "Short-form video", "Paid social integration", "Analytics & reporting", "Influencer & creator coordination",
    ],
    architecture: ["Audience", "Content", "Publishing", "Engagement", "Analysis", "Optimisation"],
    useCases: [
      { title: "Organic growth", body: "Build an owned audience with formats designed to compound." },
      { title: "Brand presence", body: "A consistent, on-brand voice across every platform that matters." },
      { title: "Product launches", body: "Coordinated social pushes tied to the wider campaign." },
      { title: "Always-on management", body: "Day-to-day publishing, community and reporting handled." },
    ],
  },

  "content-marketing-services": {
    challenge: "Publishing more content isn't a strategy — and most of it never gets found, read or acted on.",
    frictions: [
      { title: "Volume over intent", body: "Content is produced to a quota, not to answer a question people are searching for." },
      { title: "No production system", body: "Every piece is a bespoke effort with no brief, format or reuse." },
      { title: "Not optimised to be found", body: "Strong writing with weak structure and no search consideration goes unseen." },
      { title: "No path to conversion", body: "Readers arrive and leave with nothing connecting the article to a next step." },
    ],
    before: ["Quota-driven content", "Bespoke every time", "Unoptimised for search", "No conversion path"],
    layer: ["Topic research", "Briefs", "Optimisation", "Distribution"],
    after: ["Intent-driven topics", "A repeatable production system", "Built to be found", "A clear path from read to action"],
    capabilities: [
      "Topic & keyword research", "Content briefs", "Long-form writing & editing", "On-page & technical SEO",
      "Content clusters & internal linking", "Distribution & repurposing", "Performance analytics", "Editorial workflow",
    ],
    architecture: ["Topic research", "Brief", "Production", "Optimisation", "Distribution", "Performance"],
    useCases: [
      { title: "SEO content programmes", body: "Clusters of content built to rank and bring qualified traffic." },
      { title: "Thought leadership", body: "Long-form that establishes a point of view, not just presence." },
      { title: "Content operations", body: "Briefs, workflow and standards so production scales without chaos." },
      { title: "Repurposing", body: "One core piece turned into the formats each channel needs." },
    ],
  },

  "influencer-marketing-agency": {
    challenge: "Creator campaigns are easy to run and hard to run in a way you can actually measure and repeat.",
    frictions: [
      { title: "Match by follower count", body: "Creators are picked on reach, not on audience fit or genuine relevance." },
      { title: "Campaigns run on gut", body: "Briefs, usage rights and deliverables are loose, so outcomes vary wildly." },
      { title: "Attribution is murky", body: "It's unclear which creator, post or format actually drove results." },
      { title: "No repeatable process", body: "Every campaign is assembled from scratch instead of run as a programme." },
    ],
    before: ["Reach-based matching", "Loose briefs", "Murky attribution", "From-scratch campaigns"],
    layer: ["Creator match", "Brief & rights", "Content", "Tracking"],
    after: ["Fit-based creator selection", "Tight briefs and clear rights", "Attribution you can act on", "A repeatable creator programme"],
    capabilities: [
      "Creator discovery & vetting", "Audience-fit analysis", "Briefing & contracting", "Content review & rights",
      "Tracking links & codes", "Performance attribution", "Whitelisting & paid amplification", "Programme reporting",
    ],
    architecture: ["Brief", "Creator match", "Campaign", "Content", "Tracking", "Attribution"],
    useCases: [
      { title: "Launch campaigns", body: "Coordinated creator pushes timed to a product or brand moment." },
      { title: "Always-on creator programmes", body: "An ongoing roster rather than one-off activations." },
      { title: "Whitelisting & amplification", body: "Turn the best creator content into paid media." },
      { title: "Measurement", body: "The tracking and reporting that make creator spend accountable." },
    ],
  },

  "offshore-software-development": {
    challenge: "Adding capacity usually adds coordination cost — a team that needs managing more than it delivers.",
    frictions: [
      { title: "Capacity without context", body: "New developers need weeks of ramp-up before they're productive on your codebase." },
      { title: "Coordination overhead", body: "Time zones, hand-offs and status chasing eat the capacity you added." },
      { title: "Quality drift", body: "Standards, testing and review discipline vary once the team grows." },
      { title: "Knowledge leaves with people", body: "Churn resets context and the next person starts over." },
    ],
    before: ["Long ramp-up", "Coordination overhead", "Inconsistent quality", "Context lost to churn"],
    layer: ["Squad assembly", "Onboarding", "Delivery cadence", "Integration"],
    after: ["Productive from the first sprint", "Low-overhead collaboration", "Consistent engineering standards", "Knowledge that stays in the team"],
    capabilities: [
      "Dedicated engineering squads", "Senior developers & tech leads", "Designers & QA on the pod", "Delivery management",
      "Your tools, your process", "Code review & standards", "Documentation discipline", "Flexible scaling",
    ],
    architecture: ["Requirements", "Squad assembly", "Onboarding", "Delivery cadence", "Integration", "Scale"],
    useCases: [
      { title: "Team extension", body: "Senior engineers who work inside your process, not alongside it." },
      { title: "Dedicated product pod", body: "A cross-functional squad owning a product area end to end." },
      { title: "Delivery acceleration", body: "Add throughput to a roadmap without a hiring cycle." },
      { title: "Specialist skills", body: "AI, mobile or data expertise on tap for a defined engagement." },
    ],
  },
};

/* creative subcategories reframe the approach away from "data to action" */
for (const s of ["graphic-design-services", "brand-identity-design", "ux-design", "brochure-design"]) {
  N[s].approachTitle = DESIGN_APPROACH.title;
  N[s].approachStatement = DESIGN_APPROACH.statement;
  N[s].approachStages = DESIGN_APPROACH.stages;
}
N["video-production"].approachTitle = "From brief to broadcast.";
N["video-production"].approachStatement =
  "We take a rough brief to a finished film and every cutdown it needs, on a repeatable production system.";
N["video-production"].approachStages = [
  { title: "Story", body: "Find the idea and script it before anything is shot or edited." },
  { title: "Produce", body: "Capture or build the footage, screens and assets the story needs." },
  { title: "Post", body: "Edit, grade and mix to a consistent standard." },
  { title: "Deliver", body: "Export the hero cut and every format each channel requires." },
];

/* aliases — close subcategories share a narrative shape */
N["autonomous-ai-agents"] = N["ai-agents"];
N["google-ads-agency"] = N["ppc-management-services"];
N["facebook-ads-agency"] = N["ppc-management-services"];
N["ios-app-development"] = N["mobile-app-developer"];
N["android-app-development"] = N["mobile-app-developer"];
N["cross-platform-mobile-app-development"] = N["mobile-app-developer"];
N["salesforce-implementation-partner"] = N["salesforce-consulting-services"];
N["ui-ux-design-agency"] = N["ux-design"];
N["video-editing-services"] = N["video-production"];
N["dedicated-development-team"] = N["offshore-software-development"];

export function getSubNarrative(slug: string): SubNarrative | null {
  return N[slug] ?? null;
}

/* ── architecture node kinds ──────────────────────────────────────────────
   A small technical tag per node (SOURCE / MODEL / VECTOR DB / API / …).
   Explicit for the flows where the label matters; derived by position
   (SOURCE → PROCESS → OUTPUT) for the rest. */

export interface ArchNode {
  label: string;
  kind: string;
}

const ARCH_KIND: Record<string, string[]> = {
  "computer-vision": ["SOURCE", "MODEL", "INFERENCE", "INFERENCE", "REASONING", "RULE", "ACTION"],
  "nlp-solutions": ["SOURCE", "PIPELINE", "PIPELINE", "MODEL", "VECTOR DB", "RETRIEVAL", "LLM", "OUTPUT"],
  "ai-agents": ["INTENT", "REASONING", "PLANNER", "TOOLS", "API", "REVIEW", "ACTION"],
  "autonomous-ai-agents": ["INTENT", "REASONING", "PLANNER", "TOOLS", "API", "REVIEW", "ACTION"],
  "generative-ai": ["SOURCE", "LAYER", "OUTPUT", "ACTION"],
  "ai-automation-services": ["TRIGGER", "DATA", "MODEL", "DECISION", "WORKFLOW", "API", "RESULT"],
  "business-process-automation": ["TRIGGER", "DATA", "MODEL", "DECISION", "WORKFLOW", "API", "RESULT"],
  "crm-integration": ["SOURCE", "MODEL", "LOGIC", "WORKFLOW", "CRM"],
  "ai-voice-agent-development": ["CALL", "STT", "LLM", "TOOLS", "TTS", "ACTION"],
  "ai-chatbot-development": ["INPUT", "NLU", "RETRIEVAL", "LLM", "OUTPUT", "HANDOFF"],
  "deep-learning": ["DATA", "FEATURES", "TRAINING", "EVAL", "SERVING", "DECISION"],
  "software-development": ["INPUT", "DESIGN", "ENGINEERING", "BUILD", "QA", "DEPLOY"],
  "custom-software-development": ["INPUT", "DESIGN", "ENGINEERING", "BUILD", "INTEGRATION", "SYSTEM"],
  "website-development": ["CLIENT", "APP", "API", "DATA", "AUTOMATION", "SYSTEM"],
  "saas-development": ["CLIENT", "APP", "API", "TENANT DB", "AUTOMATION", "BILLING"],
  "system-integration": ["SYSTEMS", "CONNECTORS", "TRANSFORM", "ORCHESTRATION", "DATA LAYER", "ACTION"],
  "digital-marketing-agency": ["SOURCE", "DATA", "MODEL", "PERSONALISATION", "WORKFLOW", "OUTCOME"],
  "ppc-management-services": ["SOURCE", "ANALYSIS", "MODEL", "OPTIMISATION", "ACTION"],
};

export function archNodes(slug: string, arch: string[]): ArchNode[] {
  const kinds = ARCH_KIND[slug];
  return arch.map((label, i) => ({
    label,
    kind: kinds?.[i] ?? (i === 0 ? "SOURCE" : i === arch.length - 1 ? "OUTPUT" : "PROCESS"),
  }));
}

export { DEFAULT_APPROACH };
