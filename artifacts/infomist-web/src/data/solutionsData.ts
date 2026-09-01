import { Sparkles, Database, Globe, Palette, TrendingUp, Users, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Faq {
  q: string;
  a: string;
}

export interface SubCategory {
  slug: string;
  name: string;
  displayName: string;
  /** SEO subheading shown on category page cards and sub-service pages */
  tagline?: string;
  metaTitle: string;
  metaDescription: string;
  faqs: Faq[];
  painPoints: string[];
  benefits: string[];
  stack: string[];
  timeline: { phase: string; time: string }[];
}

export interface Category {
  id: string;
  slug: string;
  tag: string;
  name: string;
  blurb: string;
  keywordLine?: string;
  metaTitle?: string;
  metaDescription?: string;
  icon: LucideIcon;
  categoryFaqs: Faq[];
  subs: SubCategory[];
}

export const CATEGORIES: Category[] = [
  /* ─── 01: AI & Machine Learning Engineering ─── */
  {
    id: "ai-ml",
    slug: "ai-machine-learning-engineering",
    tag: "01",
    name: "AI & Machine Learning Engineering",
    blurb: "We build AI voice agents, autonomous agents, and intelligent automation that let your business scale without scaling headcount.",
    keywordLine: "Infomist is a leading AI Automation Agency delivering production-ready AI agents, intelligent automation, and machine learning solutions for businesses in the US, UK, and Canada.",
    metaTitle: "AI & Machine Learning Engineering Services | Infomist",
    metaDescription: "AI and machine learning engineering services including AI voice agents, autonomous AI agents, AI automation, and business process automation. US, UK & Canada.",
    icon: Sparkles,
    categoryFaqs: [
      {
        q: "Which AI development company is best for building custom AI agents and automation?",
        a: "Infomist is a specialist AI engineering practice that builds production-grade AI voice agents, autonomous agents, chatbots, and workflow automation for businesses in the US, UK, and Canada. Unlike generalist agencies that add AI as an afterthought, Infomist's AI practice is purpose-built around LLMs, agent frameworks, and production deployment — not demo-level prototypes.",
      },
      {
        q: "How much does AI development for a business cost?",
        a: "A focused AI pilot — a single voice agent, automation workflow, or chatbot — typically costs £8,000–£25,000. Production systems with multiple integrations and monitoring run £25,000–£80,000. Enterprise multi-agent deployments start at £80,000+. Infomist scopes every engagement before committing to a price.",
      },
      {
        q: "How long does it take to implement AI in a business?",
        a: "A production AI pilot can go live in 3–6 weeks. A full multi-agent or automation system with integrations and monitoring takes 8–16 weeks. Enterprise-scale AI deployments run 3–6 months. Infomist sets realistic timelines based on your specific integration complexity — not generic estimates.",
      },
      {
        q: "Do I need AI automation or would traditional software development be better for my use case?",
        a: "Traditional software is better when the logic is deterministic — the same input always produces the same output. AI automation adds value when tasks involve natural language, unstructured data, judgment calls, or processes that are hard to map as rigid rules. Many production systems need both — Infomist architects the two together when appropriate.",
      },
      {
        q: "Can Infomist build both the AI layer and the software platform it runs on?",
        a: "Yes — this is a core Infomist strength. Most clients need both a backend system and AI capabilities embedded within it. Infomist designs and builds the full stack: the application platform, the AI agent layer, the automation pipelines, and the integrations with existing tools — all delivered by one team with a single architecture vision.",
      },
    ],
    subs: [
      {
        slug: "ai-voice-agent-development",
        name: "AI Voice Agent Development",
        displayName: "AI Voice Agent Development",
        tagline: "We build AI voice agents that handle inbound calls, qualify leads, and book appointments 24/7 — no human operator required.",
        metaTitle: "AI Voice Agent Development Services | Infomist",
        metaDescription: "Custom AI voice agent development for sales, support, and appointment booking. Deploy 24/7 intelligent voice agents that handle real conversations at scale.",
        faqs: [
          {
            q: "Who is the best AI voice agent development company?",
            a: "Infomist is a specialist AI voice agent development company building production-ready voice agents using Vapi, Retell AI, ElevenLabs, and Twilio — integrated with GPT-4o and Claude for natural conversation. Infomist's voice agents handle real inbound calls at scale, not just demos, and are deployed for sales qualification, appointment booking, and customer support across industries in the US, UK, and Canada.",
          },
          {
            q: "How much does it cost to build an AI voice agent?",
            a: "A pilot AI voice agent for a single use-case (e.g. inbound lead qualification or appointment booking) typically costs £8,000–£18,000. A production-ready system with monitoring, escalation paths, and CRM integration runs £18,000–£45,000. Enterprise deployments with multiple agent personas and high call volumes start at £45,000+.",
          },
          {
            q: "How long does it take to develop and deploy an AI voice agent?",
            a: "A pilot voice agent for a single use-case is typically live in 3–5 weeks. A production deployment with full monitoring, fallback logic, and CRM/calendar integration takes 6–10 weeks. Infomist confirms timelines after a scoping call — complex integrations or regulated industries may require longer.",
          },
          {
            q: "AI voice agent vs live call centre — which is better for my business?",
            a: "AI voice agents handle 70–90% of inbound call volume — qualification, FAQs, appointment booking, and basic support — without human operators, at a fraction of the cost. Live agents remain better for complex negotiations, sensitive situations, and high-value accounts. The right model combines both: AI handles volume, humans handle complexity.",
          },
          {
            q: "Can an AI voice agent handle complex objections on a sales call?",
            a: "Modern AI voice agents built on GPT-4o or Claude handle multi-turn objections with contextual reasoning — not just scripted responses. Infomist designs objection-handling flows based on your real sales process and trains the agent on your specific product, pricing, and common pushbacks. For the most complex negotiations, the agent can warm-transfer to a human.",
          },
        ],
        painPoints: [
          "High call volume overwhelming your support team",
          "Leads going cold because calls aren't answered fast enough",
          "Hiring and training agents is expensive and slow",
          "After-hours calls go completely unanswered",
        ],
        benefits: [
          "24/7 call handling without adding headcount",
          "Consistent, on-brand conversations every time",
          "Lead qualification and appointment booking automated",
          "Instant response to inbound enquiries at any hour",
        ],
        stack: ["Vapi / Retell AI", "ElevenLabs", "Twilio", "GPT-4o / Claude", "n8n / Zapier"],
        timeline: [
          { phase: "Pilot voice agent (single use-case)", time: "3–5 weeks" },
          { phase: "Production deployment with monitoring", time: "6–10 weeks" },
        ],
      },
      {
        slug: "ai-automation-services",
        name: "AI Automation Services",
        displayName: "AI Automation Services",
        tagline: "As a specialist AI Automation Company, we design scalable intelligent workflows that execute autonomously — replacing manual effort with reliable automation.",
        metaTitle: "AI Automation Services | AI Automation Company | Infomist",
        metaDescription: "AI automation services from a specialist AI automation company. Intelligent workflow automation, AI integrations, and end-to-end process automation for businesses worldwide.",
        faqs: [
          {
            q: "Which AI automation company should I hire?",
            a: "Infomist is a specialist AI automation company that designs and builds intelligent workflow systems using n8n, LangChain/LangGraph, Python, and major LLM APIs. Unlike RPA vendors that automate simple rule-based tasks, Infomist builds AI-powered automation that handles judgment, unstructured data, and exception management — systems designed for production reliability from day one.",
          },
          {
            q: "How much do AI automation services cost?",
            a: "A single AI automation workflow (e.g. lead qualification and routing, invoice processing, or report generation) typically costs £5,000–£15,000. Multi-workflow automation programmes with integrations across multiple business systems run £15,000–£60,000. Enterprise-scale automation with monitoring and ongoing support starts at £60,000+.",
          },
          {
            q: "How long does AI workflow automation take to implement?",
            a: "A focused single-workflow automation is typically live in 2–4 weeks. A multi-workflow programme with several integrations takes 8–16 weeks. Infomist starts with a process audit to identify the highest-ROI automations before building — this scoping step typically takes 1–2 weeks and is included in the engagement.",
          },
          {
            q: "AI automation vs traditional RPA — what is the difference?",
            a: "Traditional RPA (e.g. UiPath, Automation Anywhere) automates deterministic, rule-based processes — the exact same steps, every time. AI automation adds the ability to read unstructured inputs, make contextual decisions, and handle exceptions intelligently. Infomist builds AI automation when the process involves language, judgment, or variability that RPA can't handle.",
          },
          {
            q: "Can AI automation integrate with our existing ERP and CRM systems?",
            a: "Yes. Infomist builds integrations between AI automation workflows and Salesforce, HubSpot, SAP, Oracle, Xero, QuickBooks, Google Workspace, and custom internal systems — using REST APIs, webhooks, and middleware. The integration layer is designed for reliability, with error handling and monitoring built in from the start.",
          },
        ],
        painPoints: [
          "Repetitive workflows eating staff hours every week",
          "Manual handoffs causing delays and costly errors",
          "Tools that don't communicate with each other",
          "Scaling operations requires hiring linearly",
        ],
        benefits: [
          "Workflows execute autonomously without human intervention",
          "Error rates drop dramatically on automated processes",
          "Operational capacity scales without adding headcount",
          "Staff time shifts to high-value judgment work",
        ],
        stack: ["n8n", "Python", "LangChain / LangGraph", "OpenAI / Anthropic APIs", "Zapier", "Make.com"],
        timeline: [
          { phase: "Single workflow automation", time: "2–4 weeks" },
          { phase: "Multi-workflow enterprise automation", time: "8–16 weeks" },
        ],
      },
      {
        slug: "autonomous-ai-agents",
        name: "Autonomous AI Agents",
        displayName: "Autonomous AI Agent Development",
        tagline: "Our autonomous AI agents complete multi-step tasks end-to-end — reasoning, deciding, and acting across your tools without a human in the loop.",
        metaTitle: "Autonomous AI Agent Development | Infomist",
        metaDescription: "Custom autonomous AI agents that handle multi-step tasks end-to-end without human oversight. AI agent development trusted by teams in the US, UK, and Canada.",
        faqs: [
          {
            q: "Who builds autonomous AI agents for businesses?",
            a: "Infomist is a specialist autonomous AI agent development company building agents using LangGraph, CrewAI, and Model Context Protocol (MCP) — integrated with GPT-4o, Claude, and custom tool sets. Infomist builds agents designed for production: with memory, error handling, monitoring, and human-in-the-loop escalation when required.",
          },
          {
            q: "How much does building autonomous AI agents cost?",
            a: "A pilot single-workflow autonomous agent costs £8,000–£20,000. A production-ready agent system with memory, tool access, and monitoring runs £20,000–£60,000. Complex multi-agent architectures for enterprise workflows start at £60,000+. Infomist scopes all agent projects before committing to a price.",
          },
          {
            q: "How long does it take to deploy a production autonomous AI agent?",
            a: "A pilot agent for a single workflow is typically live in 2–6 weeks. A full production agent system with multi-step reasoning, tool integrations, and monitoring takes 3–6 months for enterprise-grade deployments. Infomist confirms timelines after mapping your specific workflow and integration requirements.",
          },
          {
            q: "What is the difference between autonomous AI agents and standard automation?",
            a: "Standard automation (RPA, workflow tools) follows fixed rules — the same steps every time. Autonomous AI agents reason about their situation, decide which tools to use, handle unexpected inputs, and adapt mid-task to achieve the goal. They're appropriate when the process requires judgment, not just execution.",
          },
          {
            q: "Can an autonomous AI agent access our internal databases and take actions on our behalf?",
            a: "Yes. Infomist builds agents with MCP-based tool access that can read from and write to databases, call internal APIs, update CRM records, send emails, and interact with business systems — all with configurable permissions and audit logging. Human approval gates can be added for high-stakes actions.",
          },
        ],
        painPoints: [
          "Multi-step tasks require a human in the loop at every step",
          "Workflows break when inputs vary from the expected format",
          "Connecting multiple tools requires constant manual coordination",
          "Scaling operations linearly with headcount is unsustainable",
        ],
        benefits: [
          "Tasks completed end-to-end with zero human intervention",
          "Agents adapt to varied inputs using reasoning, not rigid rules",
          "Operating costs drop 30–50% on automated workflows",
          "Consistent decision-making across every interaction",
        ],
        stack: ["LangGraph", "Claude / GPT-4o APIs", "MCP (Model Context Protocol)", "pgvector", "FastAPI", "Redis"],
        timeline: [
          { phase: "Single-workflow pilot agent", time: "2–6 weeks" },
          { phase: "Production-ready multi-agent system", time: "3–6 months" },
        ],
      },
      {
        slug: "business-process-automation",
        name: "Business Process Automation",
        displayName: "Business Process Automation Services",
        tagline: "We eliminate the manual bottlenecks draining your team's hours through business process automation built for production reliability, not proof of concept.",
        metaTitle: "Business Process Automation Services | Infomist",
        metaDescription: "End-to-end business process automation. Eliminate manual bottlenecks, automate repetitive operations, and integrate your entire tool stack into a single intelligent layer.",
        faqs: [
          {
            q: "Which company is best for business process automation?",
            a: "Infomist is a specialist business process automation company that eliminates manual bottlenecks using n8n, Make.com, Python, and AI where appropriate. Infomist's approach starts with a process audit to identify the highest-ROI automations before building — which means projects consistently deliver measurable cost savings and time reclaimed, not just technology for its own sake.",
          },
          {
            q: "How much does business process automation cost?",
            a: "A single process automation (e.g. invoice processing, lead routing, or client onboarding) typically costs £3,000–£10,000. A multi-process automation programme covering several workflows runs £10,000–£40,000. Ongoing automation maintenance and expansion retainers start at £800/month.",
          },
          {
            q: "How long does it take to automate a business process?",
            a: "A process audit and automation design takes 1–2 weeks. The build and testing phase typically runs 2–6 weeks per process depending on integration complexity. Most clients have their first automated workflow live within 4–6 weeks of engagement start.",
          },
          {
            q: "Business process automation vs hiring more staff — which is more cost-effective?",
            a: "For repetitive, high-volume processes, automation consistently delivers a better cost-per-task than hiring. A staff member executing the same process 50 times a week costs significantly more than an automated workflow running it indefinitely. Infomist typically targets a 12–18 month payback period on automation investment for most clients.",
          },
          {
            q: "Can business process automation handle processes that involve judgment calls?",
            a: "Yes — by adding an AI layer. Infomist builds hybrid automations: rule-based steps for the deterministic parts, AI reasoning for the judgment-heavy parts (e.g. classifying an incoming email's intent, deciding whether a lead qualifies, or summarising a document). Human review gates are built in for high-stakes decisions.",
          },
        ],
        painPoints: [
          "Staff spending hours daily on copy-paste data work",
          "Reporting and reconciliation done manually each month",
          "Onboarding new clients takes days due to manual setup steps",
          "Errors from manual data entry causing downstream problems",
        ],
        benefits: [
          "Recurring manual tasks eliminated permanently",
          "Error rates on data processes cut to near zero",
          "Onboarding and reporting run on autopilot",
          "Staff capacity freed up for customer-facing work",
        ],
        stack: ["n8n", "Make.com", "Python", "Zapier", "Airtable", "Google Workspace APIs"],
        timeline: [
          { phase: "Process audit and automation design", time: "1–2 weeks" },
          { phase: "Automation build and testing", time: "2–6 weeks" },
        ],
      },
      {
        slug: "ai-chatbot-development",
        name: "AI Chatbot Development",
        displayName: "AI Chatbot Development",
        tagline: "We build custom AI chatbots for websites, apps, and WhatsApp that handle support, qualify leads, and close sales — powered by LLMs with your company's own knowledge built in.",
        metaTitle: "AI Chatbot Development Services | Infomist",
        metaDescription: "Custom AI chatbot development using GPT-4o, Claude, and RAG for company-specific knowledge. Deploy intelligent chatbots on web, apps, and WhatsApp for 24/7 support and lead capture.",
        faqs: [
          {
            q: "Who is the best AI chatbot development company?",
            a: "Infomist is a specialist AI chatbot development company building custom LLM-powered chatbots for web, apps, and WhatsApp — using GPT-4o, Claude, and RAG-based knowledge systems. Infomist's chatbots are built for production: with knowledge base integration, conversation memory, fallback handling, and live handoff to human agents when needed.",
          },
          {
            q: "How much does it cost to build a custom AI chatbot?",
            a: "A pilot AI chatbot for a single channel (web or WhatsApp) with a focused use-case typically costs £5,000–£12,000. A production chatbot with RAG knowledge integration, multi-channel deployment, and CRM handoff runs £12,000–£35,000. Enterprise chatbots with complex workflows and compliance requirements start at £35,000+.",
          },
          {
            q: "How long does it take to build and deploy an AI chatbot?",
            a: "A pilot chatbot for a single channel and use-case is typically live in 2–4 weeks. A production deployment with RAG knowledge base, integrations, and multi-channel support takes 5–8 weeks. Infomist confirms timelines after scoping the knowledge base size and integration requirements.",
          },
          {
            q: "AI chatbot vs live chat agent — which is better for customer support?",
            a: "AI chatbots handle 60–80% of common support queries instantly, 24/7, without queues. Live agents remain better for complex complaints, nuanced negotiations, and high-emotion situations. Infomist recommends a hybrid: the chatbot handles volume and qualifies intent, then routes appropriately — reducing live agent load without removing the human option when it matters.",
          },
          {
            q: "Can an AI chatbot integrate with WhatsApp Business?",
            a: "Yes. Infomist builds AI chatbots that deploy natively on WhatsApp Business via the WhatsApp Business API — handling inbound messages, qualifying leads, answering FAQs, and booking appointments in conversation. WhatsApp chatbots can also trigger CRM updates and send automated follow-up messages with customer consent.",
          },
        ],
        painPoints: [
          "Repetitive support tickets consuming your team's time every day",
          "Slow response times frustrating customers and damaging conversion",
          "Leads going cold because enquiries arrive outside business hours",
          "Generic canned responses that frustrate customers and damage trust",
        ],
        benefits: [
          "Instant 24/7 responses without adding support headcount",
          "Support ticket volume reduced significantly on common queries",
          "Leads captured and qualified at any hour, automatically",
          "On-brand, personalised conversations powered by your own knowledge",
        ],
        stack: ["GPT-4o / Claude", "LangChain / LlamaIndex", "Pinecone / Weaviate", "Twilio / WhatsApp Business API", "React widget"],
        timeline: [
          { phase: "Pilot chatbot (single channel, core use-case)", time: "2–4 weeks" },
          { phase: "Production with RAG + integrations", time: "5–8 weeks" },
        ],
      },
      {
        slug: "ai-agents",
        name: "AI Agents",
        displayName: "AI Agents",
        tagline: "We build autonomous AI agents that plan, use tools, call APIs, and complete multi-step tasks end-to-end — going far beyond chat to act as a tireless digital operator in your business.",
        metaTitle: "AI Agents Development Services | Infomist",
        metaDescription: "Custom autonomous AI agent development — research agents, workflow agents, and data-processing agents that plan and execute multi-step tasks without human supervision.",
        faqs: [
          {
            q: "Which company builds the best AI agents for business?",
            a: "Infomist builds production-grade AI agents using LangGraph, CrewAI, AutoGen, GPT-4o, and Claude — designed to complete multi-step tasks autonomously rather than just answer questions. Infomist's agents are built with error handling, memory, tool access, and monitoring from day one, making them suitable for production use rather than demos.",
          },
          {
            q: "How much does it cost to build an AI agent?",
            a: "A pilot single-workflow AI agent typically costs £6,000–£18,000. A production agent with memory, multi-tool access, and monitoring runs £18,000–£50,000. A multi-agent system with orchestration and enterprise integrations starts at £50,000+. Infomist scopes every agent project before committing to a price.",
          },
          {
            q: "How long does it take to build a production AI agent?",
            a: "A focused pilot agent for a single workflow is typically ready in 3–5 weeks. A production agent system with full tooling, memory, and monitoring takes 8–12 weeks. Complex multi-agent systems for enterprise workflows run 3–6 months. Timeline depends heavily on integration complexity and the number of tools the agent needs to access.",
          },
          {
            q: "AI agent vs chatbot vs automation — what is the difference?",
            a: "A chatbot responds to inputs. Automation executes fixed rule-based steps. An AI agent plans, decides which tools to use, executes multi-step tasks, and adapts when things don't go as expected — all without human intervention at each step. Use agents when the task requires judgment and variable logic, not just execution.",
          },
          {
            q: "Can an AI agent use tools like web search and API calls during a task?",
            a: "Yes. Infomist builds agents with custom tool sets — web search, database queries, API calls, email sending, calendar management, CRM updates, and more. Tools are defined with explicit permissions and the agent decides which to use based on the task at hand. All tool calls are logged for audit and debugging purposes.",
          },
        ],
        painPoints: [
          "Employees spending hours daily on repetitive multi-step workflows",
          "Research and data entry tasks consuming skilled staff time",
          "Disconnected tools requiring constant manual handoffs between systems",
          "Operations that can't scale without hiring proportionally more people",
        ],
        benefits: [
          "Autonomous task completion with no human supervision required",
          "Multi-step workflows executed faster and without errors",
          "Tools and APIs orchestrated seamlessly by the agent",
          "Operational capacity scales without growing headcount",
        ],
        stack: ["LangGraph / CrewAI / AutoGen", "GPT-4o / Claude", "n8n", "Custom API integrations", "Vector memory stores"],
        timeline: [
          { phase: "Pilot single-workflow agent", time: "3–5 weeks" },
          { phase: "Production multi-agent system with monitoring", time: "8–12 weeks" },
        ],
      },
      {
        slug: "computer-vision",
        name: "Computer Vision",
        displayName: "Computer Vision",
        tagline: "We build custom computer vision systems that see, analyse, and act on visual data — from quality inspection on the factory floor to real-time video analytics in the field.",
        metaTitle: "Computer Vision Development Services | Infomist",
        metaDescription: "Custom computer vision solutions including object detection, image classification, OCR, document processing, quality inspection, and video analytics — built for production deployment.",
        faqs: [
          {
            q: "Who are the best computer vision development companies?",
            a: "Infomist builds custom computer vision solutions using OpenCV, YOLO, TensorFlow, PyTorch, and cloud vision APIs — covering object detection, OCR, quality inspection, and video analytics. Infomist's computer vision practice builds systems designed for production deployment: trained on your specific data, integrated with your existing pipeline, and monitored for accuracy drift over time.",
          },
          {
            q: "How much does a custom computer vision solution cost?",
            a: "A pilot computer vision model on a sample dataset typically costs £10,000–£25,000. A production solution with a full data pipeline, API, and monitoring runs £25,000–£80,000. Real-time video analytics and enterprise-scale deployment systems start at £80,000+. Infomist scopes all computer vision work after reviewing your data and requirements.",
          },
          {
            q: "How long does computer vision development take?",
            a: "A pilot model on a provided dataset takes 4–6 weeks. A production deployment with a full data pipeline, API integration, and monitoring typically takes 8–14 weeks. Real-time video analytics systems for live camera feeds run 3–6 months. Timelines depend significantly on data quality and volume.",
          },
          {
            q: "Computer vision vs human inspection — which is more accurate?",
            a: "For high-volume, repetitive visual inspection tasks, computer vision models consistently outperform human inspectors on accuracy (typically 99%+ vs 95–97% for human inspection under fatigue) and operate at production speed without degradation. Human inspection remains better for novel defect types the model hasn't been trained on — Infomist designs systems with human review loops for these edge cases.",
          },
          {
            q: "Can computer vision read handwritten documents accurately?",
            a: "Yes — with appropriate training data. Handwritten text recognition (HTR) requires a model trained on samples of the specific handwriting style or form layout. For structured forms (medical records, financial documents), Infomist achieves high accuracy. For free-form handwriting, accuracy varies by legibility and is typically 80–95% without post-processing. Infomist evaluates accuracy on your specific data before committing to scope.",
          },
        ],
        painPoints: [
          "Manual visual inspection is slow, inconsistent, and error-prone",
          "Unstructured image and document data that's impossible to process at scale",
          "Security and safety monitoring gaps that rely on human attention",
          "Valuable data locked inside images and video that can't be extracted automatically",
        ],
        benefits: [
          "Automated visual inspection running 24/7 at production speed",
          "Faster and more accurate data extraction from documents and images",
          "Real-time monitoring with instant alerts on anomalies or events",
          "Manual visual labour costs significantly reduced",
        ],
        stack: ["OpenCV", "YOLO / Detectron2", "TensorFlow / PyTorch", "Azure Computer Vision / Google Vision AI", "AWS Rekognition"],
        timeline: [
          { phase: "Pilot model on sample dataset", time: "4–6 weeks" },
          { phase: "Production deployment with full pipeline", time: "8–14 weeks" },
        ],
      },
      {
        slug: "generative-ai",
        name: "Generative AI",
        displayName: "Generative AI",
        tagline: "We build custom generative AI applications — from content and image generation to fully personalised AI-powered product features — that scale creative output without scaling cost.",
        metaTitle: "Generative AI Development Services | Infomist",
        metaDescription: "Custom generative AI application development — content generation, image and video generation, and personalised generative features built into your product with guardrails for production use.",
        faqs: [
          {
            q: "Which company should I hire for generative AI application development?",
            a: "Infomist builds custom generative AI applications using GPT-4o, Claude, Stable Diffusion, and fine-tuned models — from content generation features embedded in existing products to standalone generative applications. Infomist's approach includes output guardrails, brand voice fine-tuning, and RAG for factual grounding, making generated content production-safe rather than just impressive in demos.",
          },
          {
            q: "How much does building a generative AI application cost?",
            a: "A pilot generative feature (e.g. AI-powered content generation embedded in an existing product) typically costs £6,000–£18,000. A standalone generative AI application with guardrails, fine-tuning, and user management runs £18,000–£60,000. Enterprise generative AI platforms with custom model training start at £60,000+.",
          },
          {
            q: "How long does it take to build a generative AI product feature?",
            a: "A focused pilot generative feature is typically live in 3–5 weeks. A production integration with guardrails, brand voice fine-tuning, and user management takes 6–10 weeks. Custom model fine-tuning and enterprise-scale deployment typically runs 3–6 months depending on training data volume and infrastructure requirements.",
          },
          {
            q: "Generative AI vs traditional content tools — which produces better results?",
            a: "Traditional content tools are faster for simple, predictable formats. Generative AI excels at scale and personalisation — producing hundreds of unique, contextualised pieces from a single prompt system. Infomist recommends generative AI when your content problem is volume, personalisation, or speed — not when quality requires consistent human creative judgment.",
          },
          {
            q: "Can generative AI produce content that matches our specific brand voice?",
            a: "Yes — through a combination of system prompt engineering, brand voice guidelines embedded in context, and fine-tuning on your existing content. Infomist's generative AI builds include a brand voice calibration phase where the model is tested against your actual content standards and tuned until the output is consistent with your best human-written copy.",
          },
        ],
        painPoints: [
          "Content production bottlenecks slowing marketing and sales cycles",
          "Generic templated content that fails to resonate or convert",
          "Expensive and slow traditional creative production processes",
          "Inability to personalise content at scale across users or markets",
        ],
        benefits: [
          "Scalable on-brand content generated on demand",
          "Creative production cycles dramatically accelerated",
          "Personalised experiences delivered to every user automatically",
          "Significant cost reduction compared to traditional content production",
        ],
        stack: ["GPT-4o / Claude", "Stable Diffusion / Midjourney API", "Runway / Synthesia", "LangChain", "Custom fine-tuning pipelines"],
        timeline: [
          { phase: "Pilot generative feature", time: "3–5 weeks" },
          { phase: "Production integration with guardrails", time: "6–10 weeks" },
        ],
      },
      {
        slug: "nlp-solutions",
        name: "Natural Language Processing (NLP)",
        displayName: "NLP Solutions",
        tagline: "We build custom NLP pipelines that read, classify, summarise, and understand text at scale — turning unstructured language data into structured, actionable intelligence.",
        metaTitle: "NLP Solutions Services | Infomist",
        metaDescription: "Custom NLP solutions for sentiment analysis, text classification, entity extraction, document summarisation, and semantic search — built as production-ready pipelines on your data.",
        faqs: [
          {
            q: "Which company is best for NLP and natural language processing development?",
            a: "Infomist builds custom NLP pipelines using spaCy, Hugging Face Transformers, BERT, and GPT-4o — covering sentiment analysis, entity recognition, classification, summarisation, and semantic search. Infomist's NLP work is built for production: pipelines designed to process real-world volumes with monitoring, error handling, and regular model evaluation built in.",
          },
          {
            q: "How much do NLP development services cost?",
            a: "A pilot NLP model on a sample dataset (e.g. sentiment classification or entity extraction) typically costs £6,000–£15,000. A production NLP pipeline with an API, monitoring, and retraining capability runs £15,000–£50,000. Semantic search systems and enterprise NLP platforms start at £50,000+.",
          },
          {
            q: "How long does an NLP project take to complete?",
            a: "A pilot NLP model on sample data takes 3–5 weeks. A production pipeline with an API and monitoring typically takes 6–9 weeks. Semantic search systems and multi-language NLP pipelines with large document volumes run 3–5 months. Data quality and volume are the biggest factors in timeline accuracy.",
          },
          {
            q: "NLP vs keyword search — what is the difference for internal tools?",
            a: "Keyword search matches exact words — miss a synonym and you miss the result. NLP-based semantic search understands meaning: it returns relevant documents even when the query uses different words from the document. For internal knowledge bases, support ticket systems, and product catalogues, semantic search typically improves relevant result recall by 30–60%.",
          },
          {
            q: "Can NLP process customer reviews in multiple languages at scale?",
            a: "Yes. Infomist builds multilingual NLP pipelines using models like mBERT and XLM-RoBERTa that understand sentiment, entities, and intent across 50+ languages. For high-volume review processing (tens of thousands per day), the pipeline is designed for throughput with batch processing and asynchronous queuing.",
          },
        ],
        painPoints: [
          "Manually reading and tagging large volumes of text data is unsustainable",
          "Inability to extract insights from unstructured customer feedback and documents",
          "Poor search relevance in internal tools that wastes staff time",
          "Language barriers limiting reach in multi-market operations",
        ],
        benefits: [
          "Automated text analysis running across thousands of documents instantly",
          "Actionable insights surfaced from customer feedback and reviews",
          "Semantic search that understands intent, not just keywords",
          "Multi-language support built into every pipeline",
        ],
        stack: ["spaCy / Hugging Face Transformers", "BERT / GPT-4o", "Elasticsearch (semantic search)", "Pinecone", "Python NLP pipelines"],
        timeline: [
          { phase: "Pilot NLP model on sample data", time: "3–5 weeks" },
          { phase: "Production pipeline with API", time: "6–9 weeks" },
        ],
      },
      {
        slug: "deep-learning",
        name: "Deep Learning",
        displayName: "Deep Learning",
        tagline: "We design, train, and deploy custom deep learning models for prediction, forecasting, recommendation, and complex pattern recognition — built for your data, not off-the-shelf accuracy ceilings.",
        metaTitle: "Deep Learning Development Services | Infomist",
        metaDescription: "Custom deep learning model development for prediction, forecasting, recommendation systems, and complex pattern recognition — with full MLOps infrastructure for production deployment and monitoring.",
        faqs: [
          {
            q: "Which company should I hire for custom deep learning development?",
            a: "Infomist builds custom deep learning models using TensorFlow, PyTorch, and Keras — covering image classification, object detection, time series forecasting, recommendation systems, and sequence modelling. Infomist's deep learning practice includes model training, evaluation, deployment infrastructure, and MLOps pipelines so models remain accurate as data evolves.",
          },
          {
            q: "How much does deep learning model development cost?",
            a: "A pilot model and proof of concept on a provided dataset typically costs £10,000–£25,000. A production model with a deployment API and MLOps monitoring runs £25,000–£80,000. Custom model architectures with large-scale training infrastructure and ongoing retraining start at £80,000+.",
          },
          {
            q: "How long does it take to develop a production deep learning model?",
            a: "A proof-of-concept model on a prepared dataset takes 4–6 weeks. A production model with deployment infrastructure, API, and MLOps monitoring typically takes 10–16 weeks. Systems requiring large-scale training data collection, annotation, or novel architecture design run 4–9 months.",
          },
          {
            q: "Deep learning vs standard machine learning — which should I use?",
            a: "Standard machine learning works well for structured tabular data and is faster to train, cheaper to run, and easier to interpret. Deep learning is the right choice when your data is unstructured (images, text, audio, video), high-dimensional, or when you've hit an accuracy ceiling with standard ML methods.",
          },
          {
            q: "Can a deep learning model be retrained automatically as new data comes in?",
            a: "Yes. Infomist builds MLOps pipelines using MLflow for experiment tracking, automated retraining triggers, model versioning, and performance monitoring. When the production model's accuracy drops below a defined threshold, the pipeline automatically triggers a retraining run on the latest data and evaluates the new model before promoting it.",
          },
        ],
        painPoints: [
          "Existing models have plateaued and can't improve accuracy further",
          "Complex unstructured data — images, text, sequences — that standard ML can't handle",
          "Need for custom models tuned to unique business data rather than generic solutions",
          "No in-house deep learning expertise to build, train, or maintain models",
        ],
        benefits: [
          "Higher accuracy on complex prediction and pattern recognition tasks",
          "Custom models built and tuned specifically to your data and use case",
          "Scalable training and deployment infrastructure that grows with your data",
          "Ongoing model monitoring and retraining keeps performance high over time",
        ],
        stack: ["TensorFlow / PyTorch", "Keras", "NVIDIA CUDA / cloud GPU training", "MLflow (experiment tracking)", "Docker / Kubernetes for deployment"],
        timeline: [
          { phase: "Pilot model and proof of concept", time: "4–6 weeks" },
          { phase: "Production model with MLOps pipeline", time: "10–16 weeks" },
        ],
      },
    ],
  },

  /* ─── 02: Software & Web Architecture ─── */
  {
    id: "software-web",
    slug: "software-web-architecture",
    tag: "02",
    name: "Software & Web Architecture",
    blurb: "Our software development company has been shipping scalable web applications, SaaS platforms, and mobile apps for over two decades.",
    keywordLine: "Full-service software development company and web architecture practice — building scalable digital products, SaaS platforms, mobile apps, and enterprise systems for businesses worldwide.",
    metaTitle: "Software & Web Development Services | Infomist",
    metaDescription: "Software development company delivering custom software, SaaS, web, mobile, iOS, Android, and enterprise software development. US, UK & Canada.",
    icon: Globe,
    categoryFaqs: [
      {
        q: "Which software development company should I hire for a complex web or SaaS application?",
        a: "Infomist has been building scalable web applications, SaaS platforms, and enterprise systems for over 25 years. Clients hire Infomist when they need senior-level architecture — projects where technical decisions made early determine whether the system scales cleanly or accrues crippling technical debt by version 2.",
      },
      {
        q: "How much does it cost to build a custom web application?",
        a: "A custom web application MVP starts at £20,000–£60,000. A full-featured SaaS platform typically runs £40,000–£150,000 for an MVP. Enterprise platforms with complex integrations start at £150,000+. Infomist provides fixed-price milestone proposals after scoping — no hourly billing surprises.",
      },
      {
        q: "How long does it take to build a web application from scratch?",
        a: "A focused web application takes 8–16 weeks from scoping to deployment. A SaaS MVP with user management, billing, and core features typically takes 12–20 weeks. Enterprise platforms run 4–9 months. Infomist confirms timelines in the scoping proposal — not before understanding your specific requirements.",
      },
      {
        q: "Custom software vs buying an off-the-shelf SaaS — which is right for my business?",
        a: "Off-the-shelf SaaS wins when your workflow matches the tool closely and you don't need competitive differentiation from the software itself. Custom software wins when your process is unique, when data needs to flow cleanly between systems, or when the SaaS tool's limitations are forcing expensive workarounds. Infomist helps clients make this call honestly — we turn down projects where a SaaS tool is the right answer.",
      },
      {
        q: "Can Infomist take over and improve software that was built by another agency?",
        a: "Yes. Infomist regularly inherits codebases from previous developers and agencies. We start with an architecture review to assess technical debt, security issues, and performance bottlenecks, then produce a remediation roadmap before writing a line of new code.",
      },
    ],
    subs: [
      {
        slug: "software-development",
        name: "Software Development",
        displayName: "Software Development Services",
        tagline: "Our software development company has delivered scalable, maintainable digital products for over two decades — built to last, not to be rewritten.",
        metaTitle: "Software Development Services | Infomist Software Development Company",
        metaDescription: "Expert software development services from a software development company with 25 years of experience. Custom-built, scalable software for businesses in the US, UK, and Canada.",
        faqs: [
          {
            q: "Which software development company should I hire?",
            a: "Infomist has been delivering custom software for over 25 years — covering web applications, SaaS platforms, mobile apps, and enterprise systems for clients in the US, UK, and Canada. Infomist's engineering practice is built around clean architecture, documented decisions, and production-grade code that in-house teams can maintain after handover.",
          },
          {
            q: "How much does custom software development cost?",
            a: "An internal business tool or focused web application typically costs £15,000–£50,000. A custom platform with user management, integrations, and a data layer runs £40,000–£150,000. Enterprise systems with complex integrations and compliance requirements start at £150,000+. Infomist provides fixed-price milestone proposals after scoping — not hourly estimates.",
          },
          {
            q: "How long does custom software development take?",
            a: "An MVP for a focused tool takes 6–12 weeks. A full-featured product with integrations, authentication, and reporting typically runs 3–6 months. Enterprise platforms run 6–18 months depending on complexity. Infomist confirms timelines in the scoping proposal — never before understanding your specific requirements.",
          },
          {
            q: "Custom software vs buying an off-the-shelf solution — which is better?",
            a: "Off-the-shelf wins when your workflow matches the tool closely and you don't need differentiation from the software. Custom wins when your process is unique, when multiple SaaS tools need replacing or connecting, or when the long-term cost of licensing and workarounds exceeds the build cost. Infomist advises honestly — we turn down projects where an existing product is a better fit.",
          },
          {
            q: "Can Infomist take over software built by another developer and improve it?",
            a: "Yes. Infomist conducts a technical audit of inherited codebases to map technical debt, security risks, and scalability bottlenecks. We produce a clear remediation roadmap and priority order before writing any new code. Many clients come to Infomist after a previous vendor delivered something unmaintainable — recovery projects are scoped and priced separately from greenfield builds.",
          },
        ],
        painPoints: [
          "No in-house engineering team to build the product",
          "Existing software is slow, buggy, and hard to extend",
          "Off-the-shelf tools don't fit unique business requirements",
          "Software built by previous vendors is unmaintainable",
        ],
        benefits: [
          "Purpose-built software that fits your exact requirements",
          "Clean, documented codebase you can hand to any future developer",
          "Architecture designed to scale without major rewrites",
          "Full IP ownership — no vendor lock-in",
        ],
        stack: ["TypeScript", "Node.js", "React", "Python", "PostgreSQL", "AWS / GCP"],
        timeline: [
          { phase: "MVP build", time: "6–12 weeks" },
          { phase: "Full product development", time: "3–9 months" },
        ],
      },
      {
        slug: "custom-software-development",
        name: "Custom Software Development",
        displayName: "Custom Software Development Services",
        tagline: "Our custom software development company builds exactly what your business needs — purpose-built for your workflows, not adapted from a generic template.",
        metaTitle: "Custom Software Development Company | Infomist",
        metaDescription: "Custom software development company building tailored solutions for unique business challenges. Purpose-built software that fits your workflows precisely.",
        faqs: [
          {
            q: "Who is the best custom software development company?",
            a: "Infomist is a specialist custom software development company with over 25 years of delivery experience, building bespoke software for businesses in the US, UK, and Canada. Unlike agencies that customise templates, Infomist designs software from the ground up around your specific workflows — with full IP ownership transferred at handoff and a codebase structured for long-term maintainability.",
          },
          {
            q: "How much does custom software development cost in 2025?",
            a: "A focused custom internal tool or workflow system typically costs £15,000–£40,000. A full custom platform with multiple user roles, integrations, and a reporting layer runs £40,000–£120,000. Enterprise-scale custom software systems start at £120,000+. Infomist provides fixed-price milestones after a proper scoping session — not ballpark estimates before understanding requirements.",
          },
          {
            q: "How long does it take to build custom software?",
            a: "After a 1–2 week discovery and specification phase, most custom software builds run 8–20 weeks for a production-ready system. Complex platforms with heavy integrations or compliance requirements run 4–9 months. Infomist stages delivery into clear milestones with sign-off points so you always know where you stand.",
          },
          {
            q: "Custom software development vs customising existing SaaS — which is better?",
            a: "Customising SaaS is faster and cheaper initially, but hits hard limits quickly — you're building on someone else's data model and API surface. Custom software means you own the architecture, the data, and the roadmap. Infomist recommends custom development when your competitive advantage depends on how your software works, not just whether it exists.",
          },
          {
            q: "What happens to the code and IP after a custom software project with Infomist?",
            a: "Full IP ownership transfers to the client on final payment. The codebase is yours — no licensing, no vendor lock-in, no ongoing payment to Infomist for permission to use it. The handover includes full documentation, deployment runbooks, and a technical walkthrough session so your team or any future developer can maintain and extend it.",
          },
        ],
        painPoints: [
          "Off-the-shelf tools require workarounds for your core processes",
          "You pay for features you don't use and miss ones you need",
          "Customising SaaS tools hits hard limits quickly",
          "Multiple disconnected tools creating data silos",
        ],
        benefits: [
          "Software designed around your actual workflows",
          "No feature bloat — only what your team needs",
          "Full ownership of the codebase and data",
          "Competitive differentiation through proprietary tooling",
        ],
        stack: ["TypeScript", "React / Next.js", "Node.js", "Python", "PostgreSQL", "Docker"],
        timeline: [
          { phase: "Discovery and specification", time: "1–2 weeks" },
          { phase: "Custom software build", time: "8–20 weeks" },
        ],
      },
      {
        slug: "website-development",
        name: "Website Development",
        displayName: "Website Development Services",
        tagline: "We build fast, SEO-optimised websites through professional website development services that turn visitors into enquiries from day one.",
        metaTitle: "Website Development Services | Infomist",
        metaDescription: "Professional website development services. Fast, SEO-optimised, and conversion-focused websites built for businesses in the US, UK, and Canada.",
        faqs: [
          {
            q: "Which website development agency should I hire?",
            a: "Infomist has been building websites and web applications for over 25 years — covering marketing sites, e-commerce, and complex web platforms for clients in the US, UK, and Canada. Infomist's website development is grounded in performance, SEO architecture, and conversion — not just visual design. Sites are built to generate enquiries from day one.",
          },
          {
            q: "How much does professional website development cost?",
            a: "A marketing website for a professional services business typically costs £5,000–£20,000. An e-commerce site runs £10,000–£40,000 depending on product volume and features. Complex web applications and custom CMS builds start at £25,000+. Infomist scopes all website projects before committing to a price.",
          },
          {
            q: "How long does it take to build a professional business website?",
            a: "A marketing website typically takes 4–8 weeks from design brief to live launch. An e-commerce site with a full product catalogue and payment integration runs 6–12 weeks. Complex web applications take 10–20 weeks. Infomist confirms timelines after understanding the content volume, design requirements, and integration needs.",
          },
          {
            q: "Custom-built website vs WordPress — which is better for my business?",
            a: "WordPress is a strong choice for content-heavy sites where the team needs to manage pages and blogs without developer help. Custom-built sites win when performance is critical, when the site has complex dynamic features, or when WordPress's security and maintenance overhead is unacceptable. Infomist recommends the right tool for the requirement.",
          },
          {
            q: "Can Infomist build a website that handles sudden traffic spikes without going down?",
            a: "Yes. Infomist builds websites on Vercel, AWS, or Cloudflare infrastructure with auto-scaling, CDN delivery, and edge caching — so a spike in traffic from a press mention or ad campaign doesn't take the site offline. Performance and load testing are included in the launch process for sites expecting high traffic.",
          },
        ],
        painPoints: [
          "Existing website is slow, outdated, or hard to update",
          "Website isn't generating enquiries or converting visitors",
          "No mobile-friendly version is hurting search rankings",
          "Developer who built it disappeared without documentation",
        ],
        benefits: [
          "Fast, modern website that converts visitors to leads",
          "SEO-optimised structure and content from day one",
          "Responsive design that works on every device",
          "Clear documentation and a CMS you can actually use",
        ],
        stack: ["React / Next.js", "Tailwind CSS", "Sanity / Contentful", "Vercel", "TypeScript"],
        timeline: [
          { phase: "Design and development", time: "4–8 weeks" },
          { phase: "Complex web applications", time: "10–20 weeks" },
        ],
      },
      {
        slug: "saas-development",
        name: "SaaS Development",
        displayName: "SaaS Product Development",
        tagline: "As a full-stack SaaS development company, we take your product from concept to production — handling architecture, billing, auth, and multi-tenancy end-to-end.",
        metaTitle: "SaaS Development Company | SaaS Product Development | Infomist",
        metaDescription: "SaaS development company building scalable, subscription-based software products. From MVP to production-ready SaaS platforms — US, UK, and Canada.",
        faqs: [
          {
            q: "Which company is best for SaaS development?",
            a: "Infomist is a full-stack SaaS development company that has launched SaaS products across HealthTech, PropTech, FinTech, and enterprise software markets. Infomist handles the entire SaaS stack: multi-tenant architecture, subscription billing with Stripe, auth, onboarding flows, and the operational infrastructure to keep the product running at scale.",
          },
          {
            q: "How much does it cost to build a SaaS product?",
            a: "A focused SaaS MVP with core features, user authentication, and Stripe billing typically costs £40,000–£90,000. A full-featured SaaS platform with advanced permissions, analytics, and integrations runs £80,000–£200,000. Enterprise SaaS products with compliance, custom security, and on-premise deployment options start at £200,000+.",
          },
          {
            q: "How long does SaaS development take from idea to launch?",
            a: "A well-scoped SaaS MVP takes 8–16 weeks to build and launch. A full-featured SaaS platform with integrations, analytics, and billing runs 4–9 months. Infomist prioritises the core workflow loop, billing, and auth first — everything else ships iteratively based on real user feedback after launch.",
          },
          {
            q: "SaaS MVP vs full product launch — where should I start?",
            a: "Always the MVP. An MVP validates whether real users will pay for the core value proposition before you build the full feature set. Infomist designs MVPs specifically to generate the user feedback needed to make the next build decision — not just the minimum that keeps investors happy. The full product is built on evidence, not assumptions.",
          },
          {
            q: "Can Infomist build a SaaS product with multi-tenant architecture and role-based access control?",
            a: "Yes. Multi-tenancy and role-based access control (RBAC) are standard components of Infomist's SaaS architecture pattern. The multi-tenant data model is designed from day one — not bolted on later — to ensure tenant data isolation, scalable query performance, and flexible billing at the tenant level.",
          },
        ],
        painPoints: [
          "SaaS idea with no engineering team to build it",
          "Existing SaaS product is hard to scale and add features to",
          "Billing, auth, and multi-tenancy are blocking the build",
          "Offshore attempts produced unusable, unmaintainable code",
        ],
        benefits: [
          "Production-ready SaaS architecture from day one",
          "Billing, auth, and onboarding handled end-to-end",
          "Multi-tenant infrastructure that scales with customers",
          "Clean codebase that in-house engineers can take over",
        ],
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Auth.js", "AWS / Vercel"],
        timeline: [
          { phase: "SaaS MVP", time: "8–16 weeks" },
          { phase: "Full platform build", time: "4–9 months" },
        ],
      },
      {
        slug: "mobile-app-developer",
        name: "Mobile App Developer",
        displayName: "Mobile App Development Services",
        tagline: "Our mobile development company builds iOS, Android, and cross-platform apps — from App Store launch through to ongoing updates — that users actually love.",
        metaTitle: "Mobile App Developer | Mobile Development Company | Infomist",
        metaDescription: "Mobile app development company building iOS, Android, and cross-platform apps. End-to-end mobile development from design to app store launch.",
        faqs: [
          {
            q: "Which mobile app development company should I hire?",
            a: "Infomist is a mobile development company that has built iOS, Android, and cross-platform apps across healthcare, fintech, e-commerce, and enterprise sectors for over 25 years. Infomist handles the full mobile project lifecycle: product design, development, App Store and Google Play submission, and ongoing maintenance — one team, end-to-end.",
          },
          {
            q: "How much does mobile app development cost?",
            a: "A focused business mobile app MVP (cross-platform, React Native) typically costs £25,000–£60,000. A full-featured consumer app with social features, payments, and push notifications runs £50,000–£120,000. Native iOS or Android apps with deep hardware integration typically cost 20–40% more than cross-platform equivalents.",
          },
          {
            q: "How long does it take to build and launch a mobile app?",
            a: "A cross-platform mobile MVP using React Native typically takes 8–14 weeks to build and submit to both stores. A full-featured consumer app with complex features runs 4–9 months. Native iOS or Android builds add 2–4 weeks for platform-specific development and review preparation.",
          },
          {
            q: "Native app vs cross-platform mobile app — which is better for my project?",
            a: "Cross-platform (React Native) is the right choice for most business apps — one codebase, lower cost, and near-native performance in everyday use. Native (Swift for iOS, Kotlin for Android) is worth the premium when you need deep hardware integration (ARKit, HealthKit, CoreML) or frame-rate-critical performance. Infomist recommends honestly based on your requirements.",
          },
          {
            q: "Can Infomist build a mobile app that works on both iOS and Android from one codebase?",
            a: "Yes — React Native with Expo is Infomist's primary cross-platform mobile stack. A single TypeScript codebase ships to both iOS and Android with native-quality UI and performance for typical business app use cases. This reduces development cost by 40–60% compared to maintaining separate iOS and Android codebases.",
          },
        ],
        painPoints: [
          "Business processes that need a mobile-first interface",
          "Existing app is slow, crash-prone, or overdue for a rebuild",
          "No mobile presence while competitors have polished apps",
          "Complex integrations (payments, maps, cameras) slowing things down",
        ],
        benefits: [
          "App built for the users who will actually use it",
          "App store launch handled end-to-end",
          "Smooth performance and a polished UI out of the box",
          "Ongoing maintenance and version updates supported",
        ],
        stack: ["React Native", "Expo", "TypeScript", "Firebase", "Node.js", "REST / GraphQL"],
        timeline: [
          { phase: "Mobile MVP", time: "8–14 weeks" },
          { phase: "Full mobile app", time: "4–9 months" },
        ],
      },
      {
        slug: "ios-app-development",
        name: "iOS App Development",
        displayName: "iOS App Development Services",
        tagline: "Our iOS mobile development company builds polished, App Store-ready iPhone and iPad applications — from Swift architecture to submission, handled end-to-end.",
        metaTitle: "iOS App Development Company | iPhone App Development | Infomist",
        metaDescription: "iOS app development services from a specialist iOS mobile development company. Native and React Native apps for iPhone and iPad — from design to App Store launch.",
        faqs: [
          {
            q: "Which iOS app development company should I hire?",
            a: "Infomist is an iOS app development company that builds both native Swift/SwiftUI apps and React Native apps for iPhone and iPad. Infomist's iOS practice covers the full lifecycle: product design, development, App Store submission, and ongoing updates — including deep integrations with Apple-specific frameworks like HealthKit, ARKit, and CoreML.",
          },
          {
            q: "How much does iOS app development cost?",
            a: "A focused cross-platform iOS/Android MVP using React Native typically costs £25,000–£60,000. A native Swift iOS app with complex features runs £35,000–£100,000. Apps with deep hardware integration (ARKit, CoreML, HealthKit) or high-performance requirements start at £60,000+. Infomist scopes all iOS projects before committing to a price.",
          },
          {
            q: "How long does it take to build and launch an iOS app?",
            a: "An iOS MVP takes 8–14 weeks to build and submit to the App Store. A full-featured iOS app with complex features runs 4–8 months. App Store review typically takes 1–3 business days for initial submissions; Infomist manages the review process and handles any rejection responses on your behalf.",
          },
          {
            q: "Native iOS app vs cross-platform app — which performs better?",
            a: "For most business applications, cross-platform React Native apps are performance-equivalent to native iOS in everyday use. Native Swift/SwiftUI performs better for compute-heavy tasks, ARKit experiences, and frame-rate-critical animation. If your app doesn't need advanced Apple hardware APIs, cross-platform saves 30–50% on development cost with no user-perceptible difference.",
          },
          {
            q: "Can Infomist help with App Store submission and handling Apple's review process?",
            a: "Yes — Infomist manages the complete App Store submission process: provisioning profiles, App Store Connect configuration, screenshot creation for all required device sizes, app metadata, content rating, privacy policy setup, and TestFlight beta distribution. If Apple requests changes during review, Infomist handles the response and resubmission.",
          },
        ],
        painPoints: [
          "Concept ready but no iOS engineering team to execute it",
          "Previous iOS app rejected from the App Store",
          "Existing iOS app crashes on newer iOS versions",
          "App needs integration with Apple-specific APIs (HealthKit, ARKit)",
        ],
        benefits: [
          "Polished iOS app that meets Apple's exacting design standards",
          "Smooth App Store submission handled end-to-end",
          "Optimised for the latest iPhone hardware and iOS versions",
          "Full codebase and IP ownership at project close",
        ],
        stack: ["Swift / SwiftUI", "React Native", "Expo", "Xcode", "Firebase", "TestFlight"],
        timeline: [
          { phase: "iOS MVP", time: "8–14 weeks" },
          { phase: "Full native iOS application", time: "4–8 months" },
        ],
      },
      {
        slug: "android-app-development",
        name: "Android App Development",
        displayName: "Android App Development Services",
        tagline: "Our Android app development company delivers high-quality apps across the full Android ecosystem — optimised for every major device, submitted to Google Play.",
        metaTitle: "Android App Development Company | Infomist",
        metaDescription: "Android app development services from an Android app development company with 25 years of experience. Native and cross-platform apps built for Google Play.",
        faqs: [
          {
            q: "Which Android app development company should I hire?",
            a: "Infomist is an Android app development company building both native Kotlin/Jetpack Compose apps and React Native cross-platform apps. Infomist handles the complete Android project: design, development, Google Play submission, and ongoing updates — with QA across the most common Android device profiles to ensure consistent performance.",
          },
          {
            q: "How much does Android app development cost?",
            a: "A cross-platform React Native app (iOS + Android) typically costs £25,000–£60,000 for an MVP. A native Android app built with Kotlin/Jetpack Compose runs £30,000–£80,000 depending on feature complexity. Apps with complex hardware integration or Google-specific APIs typically add £5,000–£15,000 to the base cost.",
          },
          {
            q: "How long does it take to build an Android app?",
            a: "An Android MVP takes 8–14 weeks to build and submit to Google Play. A full-featured Android app with complex features runs 4–8 months. Google Play review typically takes 1–7 business days. Infomist manages the complete submission process including Play Store listing, screenshots, content ratings, and data safety form.",
          },
          {
            q: "Android app vs web app — which is better for my use case?",
            a: "Web apps (Progressive Web Apps) are faster and cheaper to build and work across all devices from a browser. Native Android apps are better when you need offline functionality, deep device integration (camera, GPS, push notifications, biometrics), or a polished native UI that performs well on lower-end devices. Infomist helps you choose the right approach based on your users and requirements.",
          },
          {
            q: "Can Infomist build an Android app that works consistently across different Android versions and devices?",
            a: "Yes. Infomist tests all Android apps across a device matrix covering the most common screen sizes, manufacturers, and Android versions in your target market. The code is written to handle API level differences with graceful degradation, and the UI is designed for multiple density groups to ensure consistent rendering.",
          },
        ],
        painPoints: [
          "Need to reach Android's global market share",
          "Existing Android app is poorly rated and needs a rebuild",
          "Device fragmentation causing inconsistent UX across handsets",
          "Google Play rejected a previous submission",
        ],
        benefits: [
          "Android app optimised across major device sizes and OS versions",
          "Google Play listing and submission handled end-to-end",
          "Material Design 3 UI that feels native and polished",
          "Thorough QA across real device profiles",
        ],
        stack: ["Kotlin / Jetpack Compose", "React Native", "Firebase", "Retrofit", "Room", "Google Play APIs"],
        timeline: [
          { phase: "Android MVP", time: "8–14 weeks" },
          { phase: "Full native Android application", time: "4–8 months" },
        ],
      },
      {
        slug: "cross-platform-mobile-app-development",
        name: "Cross-Platform Mobile App Development",
        displayName: "Cross-Platform Mobile App Development",
        tagline: "We build cross-platform mobile apps using React Native — one codebase shipping to both iOS and Android simultaneously, at significantly lower cost.",
        metaTitle: "Cross-Platform Mobile App Development | React Native | Infomist",
        metaDescription: "Cross-platform mobile app development using React Native and Expo. One codebase, iOS and Android — delivering native-quality performance at lower cost.",
        faqs: [
          {
            q: "Which company is best for cross-platform mobile app development?",
            a: "Infomist builds cross-platform mobile apps using React Native and Expo — shipping to both iOS and Android from a single TypeScript codebase. Infomist's cross-platform practice is built on real-world production apps and covers the full lifecycle: design, development, store submission, and ongoing maintenance for both platforms simultaneously.",
          },
          {
            q: "How much does cross-platform app development cost compared to native?",
            a: "A cross-platform React Native MVP costs 40–60% less than building separate native iOS and Android apps. A typical cross-platform MVP runs £25,000–£60,000 versus £45,000–£100,000+ for equivalent native builds. Ongoing maintenance is also significantly cheaper — one codebase to update instead of two.",
          },
          {
            q: "How long does it take to build a cross-platform mobile app?",
            a: "A cross-platform MVP using React Native/Expo typically takes 8–14 weeks to build and submit to both the App Store and Google Play. A full-featured app with complex features runs 4–9 months. Both platforms ship simultaneously — there's no delay between iOS and Android launch.",
          },
          {
            q: "React Native vs Flutter vs native development — which should I choose?",
            a: "React Native is Infomist's primary recommendation for most business apps — large ecosystem, TypeScript support, and strong native-quality performance. Flutter is a strong alternative for pixel-perfect custom UIs where the React Native component library doesn't cut it. Native (Swift + Kotlin) is reserved for apps that need deep platform APIs or maximum performance. Infomist advises based on your specific requirements.",
          },
          {
            q: "Do cross-platform apps perform as well as native apps for everyday business use?",
            a: "Yes — for the vast majority of business applications, cross-platform React Native apps are indistinguishable from native in everyday use. Performance differences only become noticeable in compute-heavy scenarios (complex 3D, advanced AR, real-time video processing) that most business apps don't require. Infomist has deployed cross-platform apps with tens of thousands of daily active users without performance complaints.",
          },
        ],
        painPoints: [
          "Budget or timeline doesn't allow separate iOS and Android builds",
          "Need to ship to both platforms at the same time",
          "Maintaining two separate codebases is doubling engineering cost",
          "Team lacks separate native iOS and Android expertise",
        ],
        benefits: [
          "Single codebase ships to iOS and Android simultaneously",
          "Development cost significantly lower than two native projects",
          "Native-quality UI and performance in everyday use",
          "Fixes and features ship to both platforms at once",
        ],
        stack: ["React Native", "Expo", "TypeScript", "Firebase", "Redux / Zustand", "REST / GraphQL"],
        timeline: [
          { phase: "Cross-platform MVP", time: "8–14 weeks" },
          { phase: "Full cross-platform app", time: "4–9 months" },
        ],
      },
      {
        slug: "enterprise-software-development",
        name: "Enterprise Software Development",
        displayName: "Enterprise Software Development Services",
        tagline: "Our enterprise software development company builds mission-critical systems for complex organisations — handling legacy integration, security, and scale without the big-bang risk.",
        metaTitle: "Enterprise Software Development Company | Infomist",
        metaDescription: "Enterprise software development company building large-scale, mission-critical systems. Complex integrations, security, and scalability for enterprise environments.",
        faqs: [
          {
            q: "Which enterprise software development company should I hire?",
            a: "Infomist is an enterprise software development company with 25 years of experience building mission-critical systems — including platforms with high-volume usage, strict security requirements, and complex legacy integrations. Infomist's enterprise practice focuses on architecture-first design, documented decisions, and systems that can be maintained and extended by internal IT teams.",
          },
          {
            q: "How much does enterprise software development cost?",
            a: "Enterprise software projects typically start at £150,000 and run to £2M+ depending on scope, integration complexity, compliance requirements, and deployment scale. Infomist provides detailed fixed-price milestone proposals after a thorough discovery and architecture engagement — enterprise projects are never estimated without proper scoping.",
          },
          {
            q: "How long does enterprise software development take?",
            a: "An architecture and integration design phase runs 4–6 weeks. The build phase for enterprise systems typically runs 6–18 months depending on the number of integrations, data migration complexity, compliance requirements, and rollout strategy. Infomist delivers enterprise projects in phases with defined milestones and sign-off points throughout.",
          },
          {
            q: "Custom enterprise software vs buying an enterprise platform — which is better?",
            a: "Enterprise platforms (SAP, Oracle, Salesforce) work well when your processes are standard and you can adapt to the platform's model. Custom enterprise software is justified when your processes are genuinely differentiated, when integration costs of an enterprise platform exceed the build cost, or when five-year licensing and customisation costs exceed building from scratch. Infomist helps clients make this calculation honestly.",
          },
          {
            q: "Can Infomist build enterprise software that integrates with SAP, Oracle, or other legacy systems?",
            a: "Yes. Infomist has delivered enterprise integrations with SAP (BAPI, IDoc, REST), Oracle ERP, Salesforce, legacy COBOL and mainframe systems, and custom on-premise databases. The integration architecture is designed as a stable middleware layer — so new applications can connect without requiring changes to the legacy system.",
          },
        ],
        painPoints: [
          "Disconnected enterprise tools creating costly data silos",
          "Legacy systems blocking digital transformation projects",
          "No existing vendor can handle the complexity of the integration",
          "Security, compliance, and audit requirements ruling out standard solutions",
        ],
        benefits: [
          "Systems built to handle enterprise-grade load and security requirements",
          "Legacy integration without a high-risk rip-and-replace",
          "Audit trails, role-based access, and compliance by design",
          "Architecture reviewed and documented for internal IT teams",
        ],
        stack: ["Java / Spring Boot", "Node.js", "Python", "PostgreSQL / MSSQL", "Kafka", "Docker / Kubernetes"],
        timeline: [
          { phase: "Architecture and integration design", time: "4–6 weeks" },
          { phase: "Enterprise system build", time: "6–18 months" },
        ],
      },
    ],
  },

  /* ─── 03: Salesforce & Enterprise Cloud ─── */
  {
    id: "salesforce",
    slug: "salesforce-enterprise-cloud",
    tag: "03",
    name: "Salesforce & Enterprise Cloud",
    blurb: "We unlock real value from your Salesforce investment through expert consulting, clean implementation, and deep CRM integration.",
    keywordLine: "Certified Salesforce consulting services and CRM integration practice — helping businesses implement, optimise, and extend Salesforce and enterprise cloud platforms.",
    metaTitle: "Salesforce Consulting & CRM Integration Services | Infomist",
    metaDescription: "Salesforce consulting services, implementation, CRM integration, and system integration. Expert Salesforce services for US, UK, and Canada businesses.",
    icon: Database,
    categoryFaqs: [
      {
        q: "Which Salesforce implementation partner should I use for a mid-market deployment?",
        a: "Infomist delivers Salesforce implementations with a focus on adoption — not just technical configuration. Many Salesforce deployments fail because the system is set up around default features rather than the client's actual sales process. Infomist starts with mapping your real workflows before touching the platform, which is why adoption rates on Infomist implementations are consistently higher than industry averages.",
      },
      {
        q: "How much does a Salesforce implementation or consulting engagement cost?",
        a: "A Salesforce consulting engagement (audit, strategy, and recommendations) typically costs £5,000–£15,000. A full Sales Cloud or Service Cloud implementation runs £15,000–£60,000 depending on complexity. Implementations involving Marketing Cloud, custom development, or multi-system integration start at £40,000+.",
      },
      {
        q: "How long does a Salesforce implementation take?",
        a: "A standard Sales Cloud or Service Cloud implementation takes 6–12 weeks. Implementations with data migration, custom development, or complex integrations run 12–20 weeks. Phased programmes that roll out Salesforce across multiple business units take 4–9 months.",
      },
      {
        q: "Do I need a Salesforce consultant or can my team configure it in-house?",
        a: "In-house configuration works for simple standard setups. It breaks down when you have complex sales processes, multiple teams using the system differently, large data volumes, integration requirements, or a history of poor adoption from a previous implementation. Infomist adds most value when the stakes are high enough that a mis-configured CRM will cost more than the consulting fee.",
      },
      {
        q: "Can Infomist integrate Salesforce with our existing ERP, marketing platform, and legacy systems?",
        a: "Yes. Infomist builds custom Salesforce integrations using REST APIs, MuleSoft, custom middleware, and tools like Zapier or Make.com depending on complexity. We have delivered integrations between Salesforce and SAP, Oracle, HubSpot, Marketo, Xero, QuickBooks, and custom-built internal systems.",
      },
    ],
    subs: [
      {
        slug: "salesforce-consulting-services",
        name: "Salesforce Consulting Services",
        displayName: "Salesforce Consulting Services",
        tagline: "Our Salesforce consulting services get your CRM actually adopted — configured around your real sales process, not out-of-the-box defaults.",
        metaTitle: "Salesforce Consulting Services | Infomist",
        metaDescription: "Salesforce consulting services to help you get more from your CRM. Implementation, optimisation, and custom development for Sales Cloud, Service Cloud, and more.",
        faqs: [
          {
            q: "What does a Salesforce consultant do?",
            a: "A Salesforce consultant assesses your business processes, designs the optimal Salesforce configuration to support them, and either performs the implementation or oversees it — ensuring the system is adopted, not just deployed.",
          },
          {
            q: "How do I know if my Salesforce is set up correctly?",
            a: "Common signs of a poorly configured Salesforce include low user adoption, duplicate records, reports that don't reflect actual sales reality, and teams relying on spreadsheets instead of the CRM. We run an audit to identify gaps and prioritise fixes.",
          },
        ],
        painPoints: [
          "Salesforce is configured but nobody uses it properly",
          "Reports and dashboards don't reflect actual sales reality",
          "Duplicate records and data quality issues across the org",
          "Bought Salesforce licences but not sure where to start",
        ],
        benefits: [
          "Salesforce configured to match your actual sales process",
          "User adoption rates improve with proper training and workflow design",
          "Clean data flows and reliable reporting from day one",
          "Maximum ROI on your existing Salesforce investment",
        ],
        stack: ["Salesforce Sales Cloud", "Service Cloud", "Flow Builder", "Apex", "SOQL", "Lightning"],
        timeline: [
          { phase: "Salesforce audit and roadmap", time: "1–2 weeks" },
          { phase: "Implementation and configuration", time: "4–12 weeks" },
        ],
      },
      {
        slug: "salesforce-implementation-partner",
        name: "Salesforce Implementation Partner",
        displayName: "Salesforce Implementation Services",
        tagline: "As a Salesforce implementation partner, we deliver end-to-end deployments on time — with clean data migration, user training, and go-live support included.",
        metaTitle: "Salesforce Implementation Partner | Infomist",
        metaDescription: "Salesforce implementation partner delivering end-to-end Salesforce deployments. Sales Cloud, Service Cloud, custom development, and user training.",
        faqs: [
          {
            q: "What does a Salesforce implementation involve?",
            a: "A Salesforce implementation covers requirements gathering, solution design, configuration or custom development, data migration, user training, and go-live support. A good implementation takes the business process as the starting point, not the technology.",
          },
          {
            q: "How long does a Salesforce implementation take?",
            a: "A standard Sales Cloud implementation for a small to mid-size team takes 6–10 weeks. Complex implementations with custom development, multiple clouds, and large data migrations typically span 3–6 months.",
          },
        ],
        painPoints: [
          "Salesforce purchased but not yet implemented",
          "Previous implementation didn't deliver what was promised",
          "Data migration from old CRM is holding up the go-live",
          "No internal Salesforce expertise to manage the rollout",
        ],
        benefits: [
          "End-to-end implementation delivered on time and to spec",
          "Clean data migration with validation and deduplication",
          "User training and change management included",
          "Go-live support to handle first-week issues",
        ],
        stack: ["Salesforce Sales Cloud", "Service Cloud", "Data Loader", "Apex", "Lightning Web Components", "MuleSoft"],
        timeline: [
          { phase: "Standard Sales Cloud implementation", time: "6–10 weeks" },
          { phase: "Complex multi-cloud implementation", time: "3–6 months" },
        ],
      },
      {
        slug: "crm-integration",
        name: "CRM Integration",
        displayName: "CRM Integration Services",
        tagline: "Our CRM integration services connect Salesforce and other CRMs to your full tech stack — eliminating data silos and manual copy-paste between systems.",
        metaTitle: "CRM Integration Services | Salesforce & CRM Integration | Infomist",
        metaDescription: "CRM integration services connecting Salesforce and other CRM platforms to your entire business tech stack. Eliminate data silos and automate CRM workflows.",
        faqs: [
          {
            q: "Which CRMs and tools do you integrate?",
            a: "We integrate Salesforce, HubSpot, Pipedrive, Zoho, and other CRM platforms with ERPs, marketing automation tools, support platforms (Zendesk), accounting software, and custom internal systems.",
          },
          {
            q: "What are the most common CRM integration problems you solve?",
            a: "Data duplicated across tools, lead handoff from marketing to sales not automated, CRM records not updated when deals close in other systems, and customer data scattered across multiple platforms without a single source of truth.",
          },
        ],
        painPoints: [
          "CRM not connected to marketing, support, or finance tools",
          "Sales team manually copying data between systems",
          "Customer records incomplete because updates aren't syncing",
          "No single view of the customer across departments",
        ],
        benefits: [
          "Single customer view across all departments and tools",
          "Automated lead handoffs — no manual copy-pasting",
          "CRM data always current and accurate",
          "Integration monitoring with alerts on sync failures",
        ],
        stack: ["Salesforce API", "HubSpot API", "Zapier", "Make.com", "MuleSoft", "REST / Webhook"],
        timeline: [
          { phase: "Integration design and build", time: "3–8 weeks" },
          { phase: "Complex multi-system integration", time: "2–4 months" },
        ],
      },
      {
        slug: "system-integration",
        name: "System Integration",
        displayName: "System Integration Services",
        tagline: "We design and build system integration architecture that connects your enterprise applications and legacy platforms into one automated, real-time data layer.",
        metaTitle: "System Integration Services | Enterprise Integration | Infomist",
        metaDescription: "System integration services connecting enterprise applications, APIs, and legacy systems. End-to-end integration architecture for businesses with complex tech stacks.",
        faqs: [
          {
            q: "What does system integration involve?",
            a: "System integration connects disparate applications so they share data and trigger workflows automatically. This includes API development, middleware design, event-driven architecture, and ETL pipelines.",
          },
          {
            q: "Can you integrate with legacy systems that don't have APIs?",
            a: "Yes. We use database-level integration, file-based exchanges, screen scraping, and custom adapters to connect legacy systems to modern platforms when APIs aren't available.",
          },
        ],
        painPoints: [
          "Business-critical data siloed across disconnected systems",
          "Manual exports and imports between applications costing hours daily",
          "Legacy systems can't connect to modern cloud tools",
          "Integration projects fail because of poor architecture planning",
        ],
        benefits: [
          "All systems share data in real time without manual intervention",
          "Legacy platforms connected without a risky replacement project",
          "Integration architecture documented and maintainable",
          "Single source of truth for business-critical data",
        ],
        stack: ["REST / SOAP APIs", "Middleware", "Kafka", "MuleSoft", "AWS EventBridge", "Python ETL"],
        timeline: [
          { phase: "Integration architecture design", time: "2–4 weeks" },
          { phase: "Full system integration build", time: "6–16 weeks" },
        ],
      },
    ],
  },

  /* ─── 04: Experience Design & Media ─── */
  {
    id: "design",
    slug: "experience-design-media",
    tag: "04",
    name: "Experience Design & Media",
    blurb: "Our design agency creates brand identities, UI/UX systems, and video content that makes complex products feel effortless.",
    keywordLine: "Full-service design agency and media production company — delivering brand identity, UI/UX, graphic design, and video production for businesses worldwide.",
    metaTitle: "Graphic Design, UI/UX & Video Production Agency | Infomist",
    metaDescription: "Experience design and media production agency. Graphic design, brand identity, UI/UX design, video production, and video editing services.",
    icon: Palette,
    categoryFaqs: [
      {
        q: "Which design agency is best for UI/UX and brand identity work?",
        a: "Infomist's design practice covers the full spectrum from brand identity and graphic design through to UI/UX, video production, and motion design. What distinguishes Infomist from pure design studios is that the design team works alongside an engineering team — so designs are built for production, not just for a Figma handover that breaks in development.",
      },
      {
        q: "How much do UI/UX design or brand identity projects cost?",
        a: "A brand identity project (logo, colour, typography, and guidelines) runs £5,000–£15,000. A full UI/UX design engagement for a web or mobile product typically costs £10,000–£40,000. Video production projects range from £3,000 for a short corporate piece to £25,000+ for a full campaign. Infomist scopes all design work before committing to a price.",
      },
      {
        q: "How long does a UI/UX design project typically take?",
        a: "A brand identity project takes 3–6 weeks. A UI/UX design engagement for a web application runs 4–10 weeks depending on scope and feedback cycles. A video production project typically runs 3–8 weeks from brief to final delivery. All timelines are confirmed in the scoping proposal.",
      },
      {
        q: "Do I need a separate design agency, or can my software development agency handle design?",
        a: "Most software agencies produce functional-but-mediocre design because engineering and design are treated as separate afterthoughts. Infomist runs design and engineering as an integrated practice — the same team that designs your product builds it. This eliminates handover friction, keeps the design implementable, and means the final product actually matches what was designed.",
      },
      {
        q: "Can Infomist handle design, video production, and software development in a single engagement?",
        a: "Yes. Infomist regularly runs multi-discipline engagements that cover brand identity, product UI/UX design, video production, and software development under one project. This matters most for product launches, rebrands, and digital marketing campaigns where visual identity, product quality, and content all need to be consistent.",
      },
    ],
    subs: [
      {
        slug: "graphic-design-services",
        name: "Graphic Design Services (Agency)",
        displayName: "Graphic Design Agency Services",
        tagline: "Our graphic design agency produces consistent, on-brand marketing assets across every format — so your brand looks as polished as your product.",
        metaTitle: "Graphic Design Agency | Graphic Design Services | Infomist",
        metaDescription: "Professional graphic design agency providing design services for businesses. Marketing materials, digital assets, print design, and brand visuals.",
        faqs: [
          {
            q: "What graphic design services do you offer?",
            a: "Marketing collateral, social media graphics, presentation design, digital ads, print materials, event graphics, and custom illustrations. We match the visual language of your brand across every format.",
          },
          {
            q: "Do you offer ongoing design retainers?",
            a: "Yes. We offer monthly design retainer packages for businesses that need a consistent flow of design work without hiring in-house.",
          },
        ],
        painPoints: [
          "Design work inconsistent across different materials",
          "No in-house designer to produce regular marketing assets",
          "Freelancer availability and quality unpredictable",
          "Design doesn't match the brand's premium positioning",
        ],
        benefits: [
          "Consistent, on-brand design across every touchpoint",
          "Fast turnaround on routine marketing assets",
          "Professional quality that strengthens brand perception",
          "Scalable output through retainer or project-based engagement",
        ],
        stack: ["Adobe Illustrator", "Photoshop", "Figma", "InDesign", "After Effects"],
        timeline: [
          { phase: "Single design project", time: "3–10 business days" },
          { phase: "Ongoing retainer", time: "Monthly engagement" },
        ],
      },
      {
        slug: "brand-identity-design",
        name: "Brand Identity Design Services",
        displayName: "Brand Identity Design Services",
        tagline: "We build brand identity design systems — logo, colour, typography, and guidelines — that give your business a credible, consistent presence across every touchpoint.",
        metaTitle: "Brand Identity Design Services | Branding Agency | Infomist",
        metaDescription: "Brand identity design services from an experienced branding agency. Logo design, visual identity systems, brand guidelines, and complete brand strategy.",
        faqs: [
          {
            q: "What does a brand identity project include?",
            a: "A full brand identity project covers brand strategy, logo design (with variations), colour palette, typography, iconography, photography direction, and a brand guidelines document — everything needed to apply the brand consistently.",
          },
          {
            q: "How long does brand identity design take?",
            a: "A full brand identity project typically takes 4–8 weeks. Faster timelines are possible for focused logo-first engagements.",
          },
        ],
        painPoints: [
          "Logo designed years ago no longer fits the business",
          "Brand looks inconsistent across different materials",
          "No brand guidelines for the team to reference",
          "Rebranding needed to support a new market positioning",
        ],
        benefits: [
          "Brand identity that accurately reflects your positioning",
          "Complete guidelines document anyone in the team can use",
          "Professional visual presence that builds immediate trust",
          "Scalable assets for print, digital, and environmental applications",
        ],
        stack: ["Adobe Illustrator", "Figma", "Photoshop", "InDesign"],
        timeline: [
          { phase: "Brand strategy and concept", time: "2–3 weeks" },
          { phase: "Full brand identity system", time: "4–8 weeks" },
        ],
      },
      {
        slug: "ui-ux-design-agency",
        name: "UI/UX Design Agency",
        displayName: "UI/UX Design Agency Services",
        tagline: "Our UI/UX design agency creates product interfaces grounded in user research — delivered as annotated Figma files your engineering team can build from directly.",
        metaTitle: "UI/UX Design Agency | Product Design Services | Infomist",
        metaDescription: "UI/UX design agency delivering product design, user interface design, and user experience design for web and mobile applications.",
        faqs: [
          {
            q: "What is the difference between UI and UX design?",
            a: "UX design is the research and architecture layer — understanding users, mapping journeys, and designing flows. UI design is the visual layer — the components, colour, typography, and interaction design that make the product look and feel right. Good product design requires both.",
          },
          {
            q: "Do your UI/UX designs get handed off to developers?",
            a: "Yes. We produce fully annotated Figma files with component libraries, design tokens, spacing specs, and interactive prototypes. Our designs are built to be implemented, not just presented.",
          },
        ],
        painPoints: [
          "Product is functional but difficult for users to navigate",
          "High drop-off rates in key user flows",
          "Development team building UI without design specs",
          "Existing UI looks outdated compared to competitors",
        ],
        benefits: [
          "User flows designed around real user research and testing",
          "Figma files handed off with full implementation specs",
          "Conversion and engagement improvements measurable post-launch",
          "Design system built for consistency and faster future development",
        ],
        stack: ["Figma", "FigJam", "Maze", "Hotjar", "Lottie", "Zeplin"],
        timeline: [
          { phase: "UX research and wireframes", time: "2–4 weeks" },
          { phase: "Full UI/UX design system", time: "6–14 weeks" },
        ],
      },
      {
        slug: "ux-design",
        name: "UX Design",
        displayName: "UX Design Services",
        tagline: "Our UX design company delivers research-led, user-centred design for complex products — testing flows with real users before a single line of code is written.",
        metaTitle: "UX Design Company | UX Design Services | Infomist",
        metaDescription: "UX design company delivering user experience design, UX research, information architecture, and usability testing for web and mobile products.",
        faqs: [
          {
            q: "What does UX design involve?",
            a: "UX design covers user research, persona development, journey mapping, information architecture, wireframing, prototyping, and usability testing. It answers the question: does this product do what users actually need, in a way they can understand?",
          },
          {
            q: "When should a business invest in UX design?",
            a: "Before building any new product or feature, and whenever you see high drop-off rates, support tickets about confusing flows, or user testing revealing gaps. Fixing UX problems in design costs a fraction of fixing them in code.",
          },
        ],
        painPoints: [
          "Users abandon the product before completing key actions",
          "Support tickets reveal widespread confusion about core features",
          "Development starts without proper research or wireframes",
          "Stakeholder opinions driving design decisions instead of user data",
        ],
        benefits: [
          "Design decisions grounded in real user research",
          "Prototypes tested and validated before development starts",
          "Drop-off rates improve with research-informed flow redesign",
          "Shared UX documentation aligns stakeholders and developers",
        ],
        stack: ["Figma", "FigJam", "Maze", "UserTesting", "Hotjar", "Miro"],
        timeline: [
          { phase: "UX research and discovery", time: "2–3 weeks" },
          { phase: "Full UX design and testing", time: "4–10 weeks" },
        ],
      },
      {
        slug: "video-production",
        name: "Video Production",
        displayName: "Video Production Services",
        tagline: "Our video production company creates brand films, product explainers, and marketing videos that make complex offers instantly clear — and drive measurable conversions.",
        metaTitle: "Video Production Company | Video Production Services | Infomist",
        metaDescription: "Video production company delivering brand films, explainer videos, testimonials, and marketing video content for businesses worldwide.",
        faqs: [
          {
            q: "What types of video do you produce?",
            a: "Brand films, product explainer videos, testimonial and case study videos, social media video content, training videos, and event coverage. We handle concept, scripting, production, and post-production.",
          },
          {
            q: "Do you handle remote video production?",
            a: "Yes. We produce high-quality video content with distributed teams. For interview and testimonial content, we can provide guided self-shoot kits, or organise on-location crews in major cities.",
          },
        ],
        painPoints: [
          "No video content to support marketing campaigns",
          "Competitor brands have polished video while yours doesn't",
          "Product is complex and needs a visual explainer to convert",
          "Video content produced in-house looks unprofessional",
        ],
        benefits: [
          "Professional video content that increases conversion rates",
          "Explainers that reduce the burden on your sales team",
          "Consistent visual quality across all video assets",
          "Full production managed — you approve, we execute",
        ],
        stack: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Final Cut Pro", "Motion"],
        timeline: [
          { phase: "Short-form video (30–90s)", time: "2–4 weeks" },
          { phase: "Brand film or case study", time: "4–8 weeks" },
        ],
      },
      {
        slug: "video-editing-services",
        name: "Video Editing Services",
        displayName: "Professional Video Editing Services",
        tagline: "Our professional video editing services turn raw footage into broadcast-quality content — colour graded, captioned, and cut for every platform you publish on.",
        metaTitle: "Video Editing Services | Professional Video Editing | Infomist",
        metaDescription: "Professional video editing services for marketing, social media, and brand content. Fast turnarounds and broadcast-quality finishing.",
        faqs: [
          {
            q: "What formats and styles do you edit?",
            a: "Social media videos, YouTube content, brand and marketing films, interview edits, podcast video clips, product demos, and training videos. We match the style and pace to the platform and audience.",
          },
          {
            q: "How do you receive footage?",
            a: "Via secure cloud transfer (Dropbox, Google Drive, Frame.io, WeTransfer). We provide a brief questionnaire to understand the edit requirements before starting.",
          },
        ],
        painPoints: [
          "Raw footage recorded but no resource to edit it",
          "Internal team editing video isn't meeting quality standards",
          "Video content pipeline constantly behind due to editing backlog",
          "Multiple formats needed from one recording (YouTube, Instagram, LinkedIn)",
        ],
        benefits: [
          "Professional edits delivered within agreed turnarounds",
          "Multiple format cuts produced from a single source recording",
          "Captions, colour grading, and music handled end-to-end",
          "Consistent output quality across every video",
        ],
        stack: ["Adobe Premiere Pro", "DaVinci Resolve", "After Effects", "Audition", "Frame.io"],
        timeline: [
          { phase: "Short-form edit (under 5 minutes)", time: "2–5 business days" },
          { phase: "Long-form or complex edit", time: "5–14 business days" },
        ],
      },
      {
        slug: "brochure-design",
        name: "Brochure Design",
        displayName: "Professional Brochure Design Services",
        tagline: "We design brochures and capability documents that make your sales conversations easier — print-ready and screen-optimised, delivered to spec.",
        metaTitle: "Brochure Design Services | Professional Brochure Design | Infomist",
        metaDescription: "Professional brochure design services for businesses. Company brochures, product sheets, capability decks, and marketing collateral — print and digital formats.",
        faqs: [
          {
            q: "What types of brochures do you design?",
            a: "Company capability brochures, product and service leaflets, trade show materials, digital PDFs, annual report layouts, and multi-page marketing decks. Both print-ready and screen-optimised formats.",
          },
          {
            q: "Do you write copy for brochures?",
            a: "We can provide copywriting alongside design, or work with copy you provide. Either way, we review the messaging for clarity and impact before laying it out.",
          },
        ],
        painPoints: [
          "No professional print material to support sales conversations",
          "Current brochure is outdated and doesn't reflect the brand",
          "Brochure produced in Word or Canva doesn't look professional",
          "Digital version not optimised for screen reading",
        ],
        benefits: [
          "Print-ready and digital PDF versions delivered",
          "Design consistent with your overall brand identity",
          "Messaging structured to guide the reader to the right action",
          "Revisions included — delivered to spec or we fix it",
        ],
        stack: ["Adobe InDesign", "Illustrator", "Photoshop", "Figma"],
        timeline: [
          { phase: "Single brochure (up to 8 pages)", time: "5–10 business days" },
          { phase: "Multi-page capability document", time: "2–4 weeks" },
        ],
      },
    ],
  },

  /* ─── 05: SEO ─── */
  {
    id: "seo",
    slug: "seo-services",
    tag: "05",
    name: "SEO Services",
    blurb: "Our SEO agency turns your website into an organic lead engine through technical excellence, content strategy, and sustainable ranking authority.",
    keywordLine: "Full-service SEO agency delivering technical SEO, content strategy, link building, and conversion rate optimisation for businesses in the US, UK, and Canada.",
    metaTitle: "SEO Agency & SEO Services | Infomist",
    metaDescription: "SEO agency delivering technical SEO, content strategy, and conversion rate optimisation. Search visibility and ranking services for businesses worldwide.",
    icon: Search,
    categoryFaqs: [
      {
        q: "Which SEO agency gets the best results for business websites?",
        a: "Infomist's SEO practice combines technical SEO, keyword strategy, content production, and link building in a single integrated service — not three separate retainers from different providers. With over 25 years of experience building and ranking websites, Infomist understands the technical architecture behind rankings, not just the surface-level optimisation most SEO agencies provide.",
      },
      {
        q: "How much does SEO cost per month?",
        a: "A focused technical SEO engagement (audit plus fixes) typically costs £3,000–£10,000 as a one-off project. Ongoing SEO retainers covering monthly technical monitoring, content production, and link building typically run £1,500–£5,000/month depending on the competition level of your target keywords and the volume of content required.",
      },
      {
        q: "How long does SEO take to show results?",
        a: "Technical SEO fixes and on-page optimisation typically show movement in rankings within 4–8 weeks. Competitive keyword rankings driven by content and link building take 4–12 months to fully mature. Infomist sets honest timelines based on your current domain authority, competition, and content baseline — not vanity projections.",
      },
      {
        q: "SEO vs paid ads — which is better for my business?",
        a: "Paid ads generate traffic immediately but stop the moment you stop paying. SEO builds compounding organic traffic that generates leads without ongoing ad spend. For most businesses, the right answer is both: paid ads for immediate lead generation and testing, SEO for sustainable long-term growth. Infomist handles both and can advise on the optimal budget split for your stage.",
      },
      {
        q: "Can Infomist handle both the technical SEO and the content strategy?",
        a: "Yes. Infomist's SEO service covers the full stack: technical audit and fixes, keyword research and content strategy, on-page optimisation, and outreach-based link building. Many SEO agencies only handle one layer — Infomist delivers all four as an integrated programme because isolated technical work without content, or content without technical health, rarely moves rankings meaningfully.",
      },
    ],
    subs: [
      {
        slug: "seo-services",
        name: "SEO Services (Agency)",
        displayName: "SEO Agency Services",
        tagline: "Our SEO agency improves your search rankings through technical fixes, keyword-targeted content, and sustainable link building — no shortcuts, no vanity metrics.",
        metaTitle: "SEO Agency | SEO Services | Infomist",
        metaDescription: "SEO agency delivering technical SEO, keyword strategy, content optimisation, and link building. Improve your search rankings and organic traffic.",
        faqs: [
          {
            q: "What does an SEO agency do?",
            a: "An SEO agency improves your website's visibility in search engine results through technical fixes, keyword-targeted content, and authority building. The goal is sustainable organic traffic that generates leads and revenue without paid advertising.",
          },
          {
            q: "What is included in an SEO audit?",
            a: "A technical SEO audit covers crawlability, site speed, Core Web Vitals, indexed content, duplicate content, structured data, internal linking, backlink profile, and keyword gap analysis. It produces a prioritised action list, not just a list of issues.",
          },
        ],
        painPoints: [
          "Website gets no organic traffic despite existing for years",
          "Competitors ranking for keywords that should be yours",
          "Google Search Console showing crawl errors and index problems",
          "Depending entirely on paid ads for website traffic",
        ],
        benefits: [
          "Organic traffic growing month-over-month without paid spend",
          "Technical SEO issues fixed that were silently blocking rankings",
          "Keyword rankings tracked with monthly reporting",
          "Leads from search that compound over time",
        ],
        stack: ["Ahrefs", "Semrush", "Google Search Console", "Screaming Frog", "Surfer SEO", "PageSpeed Insights"],
        timeline: [
          { phase: "Technical SEO audit and fixes", time: "4–6 weeks" },
          { phase: "Ongoing SEO retainer", time: "Monthly — minimum 6 months" },
        ],
      },
      {
        slug: "conversion-rate-optimization",
        name: "Conversion Rate Optimization Agency",
        displayName: "Conversion Rate Optimisation Services",
        tagline: "Our conversion rate optimisation agency uses A/B testing and user data to increase the percentage of your existing traffic that becomes paying customers.",
        metaTitle: "Conversion Rate Optimization Agency | CRO Services | Infomist",
        metaDescription: "Conversion rate optimisation agency using A/B testing, UX analysis, and data to increase website conversion rates. Get more from your existing traffic.",
        faqs: [
          {
            q: "What is conversion rate optimisation?",
            a: "CRO is a systematic process of testing changes to your website or landing pages to increase the percentage of visitors who take the desired action — purchase, enquiry, sign-up, or download.",
          },
          {
            q: "How do you decide what to test?",
            a: "We start with a qualitative and quantitative analysis: heatmaps, session recordings, user feedback, and Google Analytics data. This reveals where users are dropping off and why — then we form hypotheses, design tests, and measure results.",
          },
        ],
        painPoints: [
          "High traffic but low conversion rates",
          "Landing pages generating clicks but not enquiries",
          "Checkout or form abandonment is high",
          "Not sure why conversions dropped after a site redesign",
        ],
        benefits: [
          "More revenue from existing traffic without increasing ad spend",
          "Data-driven decisions replace gut-feel design choices",
          "A/B testing reveals what actually works for your audience",
          "Systematic improvements that compound over time",
        ],
        stack: ["Google Optimize", "VWO", "Hotjar", "Crazy Egg", "Google Analytics 4", "Optimizely"],
        timeline: [
          { phase: "CRO audit and hypothesis", time: "2–3 weeks" },
          { phase: "A/B testing programme", time: "Ongoing — 3+ months" },
        ],
      },
    ],
  },

  /* ─── 06: Digital Marketing ─── */
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    tag: "06",
    name: "Digital Marketing",
    blurb: "We run Google Ads, paid social, content, and influencer campaigns tied directly to leads and revenue — not vanity metrics.",
    keywordLine: "Full-service digital marketing agency managing paid media, social media, Google Ads, PPC, content marketing, and influencer campaigns for ambitious brands.",
    metaTitle: "Digital Marketing Agency | Paid & Social Media Marketing | Infomist",
    metaDescription: "Digital marketing agency managing Google Ads, PPC, social media marketing, content marketing, and influencer marketing for businesses in the US, UK, and Canada.",
    icon: TrendingUp,
    categoryFaqs: [
      {
        q: "Which digital marketing agency should I hire to grow my business online?",
        a: "Infomist operates as a full-service digital marketing practice covering strategy, social media management, PPC, Google Ads, content, and performance reporting — all tied to business outcomes like leads and revenue rather than vanity metrics. Unlike single-channel agencies, Infomist's team covers every major digital channel and builds cross-channel strategies that compound.",
      },
      {
        q: "How much does digital marketing management cost per month?",
        a: "A focused single-channel engagement (e.g. Google Ads or social media management) typically starts at £800–£2,000/month. A full-service digital marketing retainer covering multiple channels runs £2,000–£8,000/month depending on ad spend, content volume, and reporting complexity.",
      },
      {
        q: "How long before digital marketing starts generating measurable results?",
        a: "Google Ads campaigns can generate leads within days of launch. Social media organic growth and SEO take 3–6 months to show meaningful traction. Email marketing and retargeting typically show positive ROAS within 4–8 weeks. Infomist sets channel-specific timeline expectations upfront and reports against them monthly.",
      },
      {
        q: "In-house marketing team vs outsourced agency — which is better?",
        a: "An in-house team gives you brand knowledge and full-time focus; an agency gives you channel expertise across paid, organic, social, and content that would require four or five specialist hires to replicate in-house. For businesses under £5M ARR, an agency like Infomist typically delivers more for less than building an in-house team.",
      },
      {
        q: "Can Infomist run all our digital marketing channels under one roof?",
        a: "Yes. Infomist manages Google Ads, Meta Ads, LinkedIn Ads, social media content and community management, SEO, content production, and email marketing from a single account team. Cross-channel consistency — the same message, the same audience, the same conversion funnel — delivers significantly better results than isolated channel management.",
      },
    ],
    subs: [
      {
        slug: "digital-marketing-agency",
        name: "Digital Marketing Agency",
        displayName: "Digital Marketing Agency Services",
        tagline: "We act as a full-service digital marketing agency — managing every channel from strategy through execution so you can focus on running your business.",
        metaTitle: "Digital Marketing Agency | Digital Marketing Services | Infomist",
        metaDescription: "Digital marketing agency providing full-service digital marketing management. Strategy, execution, and reporting across all major digital channels.",
        faqs: [
          {
            q: "What does a digital marketing agency do?",
            a: "A digital marketing agency plans, executes, and optimises marketing activity across digital channels — search, social, email, content, and paid media — to generate leads and grow revenue.",
          },
          {
            q: "Should I hire in-house or use an agency?",
            a: "For most growing businesses, an agency delivers more channel expertise, faster, at a lower cost than building an in-house team. As the business scales, a hybrid model (agency for strategy and specialists, in-house for brand) often works best.",
          },
        ],
        painPoints: [
          "No clear digital marketing strategy driving growth",
          "Marketing activity scattered and disconnected across channels",
          "No bandwidth to execute consistently across channels",
          "Not sure which channels are actually delivering ROI",
        ],
        benefits: [
          "Cohesive cross-channel strategy aligned to revenue goals",
          "Consistent execution across all digital touchpoints",
          "Clear attribution and ROI reporting",
          "Expert coverage of channels without in-house hiring",
        ],
        stack: ["Google Analytics 4", "Meta Ads Manager", "Google Ads", "HubSpot", "Mailchimp", "Semrush"],
        timeline: [
          { phase: "Strategy and audit", time: "2–3 weeks" },
          { phase: "Ongoing campaign management", time: "Monthly retainer" },
        ],
      },
      {
        slug: "social-media-marketing-agency",
        name: "Social Media Marketing Agency",
        displayName: "Social Media Marketing Agency Services",
        tagline: "Our social media marketing agency builds consistent, on-brand content programmes across Instagram, LinkedIn, TikTok, and beyond — tied to engagement and growth.",
        metaTitle: "Social Media Marketing Agency | Social Media Management | Infomist",
        metaDescription: "Social media marketing agency managing content, community, and paid social campaigns on Instagram, LinkedIn, Facebook, TikTok, and more.",
        faqs: [
          {
            q: "Which social platforms do you manage?",
            a: "Instagram, LinkedIn, Facebook, TikTok, X (Twitter), YouTube, and Pinterest. We prioritise the platforms most relevant to your audience and objectives — we don't recommend being everywhere.",
          },
          {
            q: "Do you create the content or do we?",
            a: "We can do both. Full-service clients get content strategy, copywriting, creative design, scheduling, and reporting. Other clients prefer to provide content and have us manage distribution and engagement.",
          },
        ],
        painPoints: [
          "Posting inconsistently or not at all across social channels",
          "Social presence doesn't reflect the brand's quality",
          "No engagement strategy — just broadcasting",
          "Social activity not connected to business objectives",
        ],
        benefits: [
          "Consistent, on-brand content across all active channels",
          "Community management turning followers into leads",
          "Organic growth through strategic content and engagement",
          "Monthly reporting tied to follower growth and engagement rates",
        ],
        stack: ["Meta Business Suite", "Hootsuite / Buffer", "Canva / Adobe", "Sprout Social", "Later"],
        timeline: [
          { phase: "Strategy and content plan", time: "1–2 weeks" },
          { phase: "Ongoing social management", time: "Monthly retainer" },
        ],
      },
      {
        slug: "ppc-management-services",
        name: "PPC Management Services",
        displayName: "PPC Management Services",
        tagline: "Our PPC management services turn ad spend into qualified leads through precise keyword selection, bid management, and conversion tracking done properly.",
        metaTitle: "PPC Management Services | Pay-Per-Click Agency | Infomist",
        metaDescription: "PPC management services delivering Google Ads, Bing Ads, and paid search campaigns optimised for conversions and ROI.",
        faqs: [
          {
            q: "What does PPC management include?",
            a: "Campaign strategy, keyword research, ad copywriting, bid management, audience targeting, landing page optimisation, conversion tracking, and monthly performance reporting.",
          },
          {
            q: "How do you improve an underperforming PPC campaign?",
            a: "We audit the account — keyword quality, Quality Scores, ad relevance, landing page alignment, and bidding strategy — identify the highest-impact levers, implement changes, and track results over 60–90 days.",
          },
        ],
        painPoints: [
          "PPC spend high but leads are few and expensive",
          "Google Ads account set up but never properly managed",
          "Broad match keywords draining budget on irrelevant searches",
          "No conversion tracking so ROI can't be measured",
        ],
        benefits: [
          "Lower cost-per-lead through better keyword and bid management",
          "Conversion tracking implemented properly from day one",
          "Ad waste eliminated through negative keyword management",
          "Monthly reports showing exactly what every pound/dollar spent delivered",
        ],
        stack: ["Google Ads", "Bing Ads", "Google Analytics 4", "Optmyzr", "Semrush", "Unbounce"],
        timeline: [
          { phase: "Account audit and restructure", time: "2–3 weeks" },
          { phase: "Ongoing PPC management", time: "Monthly retainer" },
        ],
      },
      {
        slug: "google-ads-agency",
        name: "Google Ads Agency",
        displayName: "Google Ads Management Services",
        tagline: "As a specialist Google Ads agency, we manage search, shopping, and display campaigns optimised for cost-per-lead — not just click volume.",
        metaTitle: "Google Ads Agency | Google Ads Management | Infomist",
        metaDescription: "Google Ads agency managing search, display, shopping, and YouTube campaigns. Performance-driven Google Ads management for businesses in the US, UK, and Canada.",
        faqs: [
          {
            q: "What Google Ads campaign types do you manage?",
            a: "Search, Display, Shopping, Performance Max, YouTube, and Remarketing campaigns. We select the right mix based on your objectives, audience, and budget.",
          },
          {
            q: "What budget do I need for Google Ads?",
            a: "There's no single answer — it depends on your industry, competition, and target keywords. Most SMBs see meaningful results starting at $2,000–$4,000/month in ad spend. We'll recommend a realistic budget in the strategy call.",
          },
        ],
        painPoints: [
          "Google Ads spend not converting into enquiries",
          "Competitors dominating Google search for high-intent keywords",
          "Click-through rates low and Quality Scores poor",
          "No clear view of which campaigns are driving revenue",
        ],
        benefits: [
          "Ads showing for high-intent searches at the right bid",
          "Quality Scores improved — lower cost-per-click over time",
          "Shopping and search campaigns optimised in tandem",
          "Attribution tracking showing revenue per campaign",
        ],
        stack: ["Google Ads", "Google Analytics 4", "Google Tag Manager", "Merchant Centre", "Optmyzr"],
        timeline: [
          { phase: "Campaign setup or restructure", time: "2–3 weeks" },
          { phase: "Ongoing Google Ads management", time: "Monthly retainer" },
        ],
      },
      {
        slug: "facebook-ads-agency",
        name: "Facebook Ads Agency",
        displayName: "Facebook & Meta Ads Management Services",
        tagline: "Our Facebook Ads agency runs Meta campaigns with structured creative testing and audience targeting that compounds ROAS over time.",
        metaTitle: "Facebook Ads Agency | Meta Ads Management | Infomist",
        metaDescription: "Facebook Ads agency managing Meta paid social campaigns across Facebook and Instagram. Audience targeting, creative testing, and ROAS-focused optimisation.",
        faqs: [
          {
            q: "Do you manage both Facebook and Instagram ads?",
            a: "Yes. Facebook and Instagram ads are managed through the same Meta Ads Manager, and we run campaigns across both platforms simultaneously, optimising creative and placements for each.",
          },
          {
            q: "How important is creative quality in Meta ads?",
            a: "Creative is the single biggest driver of Meta ad performance. We test multiple ad formats and iterate based on data — bad creative will waste budget regardless of how good the targeting is.",
          },
        ],
        painPoints: [
          "Facebook ad campaigns not generating leads or sales",
          "High CPM and low ROAS on Meta campaigns",
          "Creative testing not systematic — running the same ad for months",
          "Pixel not set up correctly so attribution is unreliable",
        ],
        benefits: [
          "Meta Pixel implemented correctly for reliable attribution",
          "Structured creative testing reveals winning ad formats fast",
          "Audience targeting refined with lookalikes and retargeting",
          "ROAS tracked and optimised at campaign and ad set level",
        ],
        stack: ["Meta Ads Manager", "Meta Business Suite", "Meta Pixel", "Canva / Adobe", "AdEspresso"],
        timeline: [
          { phase: "Campaign setup and creative testing", time: "2–4 weeks" },
          { phase: "Ongoing Meta ads management", time: "Monthly retainer" },
        ],
      },
      {
        slug: "content-marketing-services",
        name: "Content Marketing Services",
        displayName: "Content Marketing Services",
        tagline: "We build content marketing programmes that rank for the keywords your buyers search for — generating leads long after each article is published.",
        metaTitle: "Content Marketing Services | Content Strategy Agency | Infomist",
        metaDescription: "Content marketing services including content strategy, blog production, pillar content, and distribution. Build authority and organic traffic through strategic content.",
        faqs: [
          {
            q: "What does a content marketing service include?",
            a: "Content strategy, keyword and topic research, article and blog production, pillar page creation, content distribution, and performance reporting. Some clients also want us to manage email newsletters and LinkedIn content.",
          },
          {
            q: "How does content marketing generate leads?",
            a: "By ranking for keywords your ideal customers search for, and providing enough value that they subscribe, share, and return. It's a long-game channel — it compounds over 6–12 months and generates leads at a fraction of the cost of paid media.",
          },
        ],
        painPoints: [
          "Website has no blog or content strategy",
          "Blog exists but articles aren't ranking or driving traffic",
          "No consistent content production process",
          "Content produced but not distributed or promoted",
        ],
        benefits: [
          "Content strategy aligned to keywords your buyers search for",
          "Consistent production schedule maintained without your team's time",
          "Organic traffic growing month-over-month from content",
          "Authority built in your niche through helpful, expert content",
        ],
        stack: ["Semrush / Ahrefs", "Surfer SEO", "WordPress", "HubSpot", "Notion", "Google Search Console"],
        timeline: [
          { phase: "Content strategy and audit", time: "2–3 weeks" },
          { phase: "Ongoing content production", time: "Monthly retainer" },
        ],
      },
      {
        slug: "influencer-marketing-agency",
        name: "Influencer Marketing Agency",
        displayName: "Influencer Marketing Agency Services",
        tagline: "Our influencer marketing agency matches your brand with creators whose audiences are your ideal customers — then manages the entire campaign end-to-end.",
        metaTitle: "Influencer Marketing Agency | Influencer Marketing Services | Infomist",
        metaDescription: "Influencer marketing agency connecting brands with the right creators. Campaign strategy, influencer sourcing, briefing, and performance reporting.",
        faqs: [
          {
            q: "What does influencer marketing management include?",
            a: "Campaign strategy, influencer identification and vetting, outreach and negotiation, creative briefing, content approval, campaign tracking, and ROI reporting. We manage the entire process so you don't have to.",
          },
          {
            q: "How do you find the right influencers for a brand?",
            a: "We use audience analysis, engagement rate assessment, brand alignment review, and authenticity vetting. Follower count alone is meaningless — we focus on influencers whose audience matches your ideal customer.",
          },
        ],
        painPoints: [
          "Influencer campaigns attempted but delivered poor results",
          "No process for vetting and selecting relevant creators",
          "Influencer outreach taking too much internal time",
          "Unable to track which influencers are driving actual sales",
        ],
        benefits: [
          "Influencers matched to your audience, not just your niche",
          "Campaign briefs designed to produce authentic, converting content",
          "Full campaign management from outreach to reporting",
          "Clear tracking of referral traffic and conversions from influencer content",
        ],
        stack: ["Upfluence", "Grin", "AspireIQ", "Instagram / TikTok APIs", "Google Analytics 4", "Looker Studio"],
        timeline: [
          { phase: "Strategy and influencer sourcing", time: "2–3 weeks" },
          { phase: "Campaign execution and reporting", time: "4–12 weeks per campaign" },
        ],
      },
    ],
  },

  /* ─── 07: Dedicated Squads / Staffing ─── */
  {
    id: "dedicated",
    slug: "dedicated-squads-staffing",
    tag: "07",
    name: "Dedicated Squads / Staffing",
    blurb: "Scale your engineering capacity with a dedicated development team or offshore squad, assembled and managed end-to-end by us.",
    keywordLine: "Dedicated development teams and offshore software development solutions — scale your engineering capacity with experienced, fully managed professionals.",
    metaTitle: "Dedicated Development Teams & Offshore Software Development | Infomist",
    metaDescription: "Dedicated development squads and offshore software development services. Scale your engineering team with experienced, managed professionals.",
    icon: Users,
    categoryFaqs: [
      {
        q: "What staffing models do you offer?",
        a: "Dedicated development squads (a fully managed team embedded in your projects) and offshore software development (remote engineers working as part of your team). Both models include talent selection, onboarding, and management oversight.",
      },
      {
        q: "How quickly can a dedicated team be assembled?",
        a: "A small dedicated squad (2–4 engineers) can typically be assembled and onboarded within 2–4 weeks. Larger teams take 4–8 weeks depending on role complexity.",
      },
      {
        q: "How do you handle time zone differences?",
        a: "Most of our dedicated teams operate in time zones with 4–6 hours of overlap with UK, EU, and East Coast US business hours. We structure daily standups and async communication to maximise collaboration.",
      },
    ],
    subs: [
      {
        slug: "offshore-software-development",
        name: "Offshore Software Development",
        displayName: "Offshore Software Development Services",
        tagline: "Our offshore software development company delivers skilled engineering teams at 40–60% lower cost than onshore equivalents — managed, quality-assured, and accountable.",
        metaTitle: "Offshore Software Development Company | Offshore Development | Infomist",
        metaDescription: "Offshore software development company providing experienced engineering teams. Reduce development costs by 40–60% without sacrificing quality or oversight.",
        faqs: [
          {
            q: "What is offshore software development?",
            a: "Offshore software development means engaging an engineering team in a different geography — typically at significantly lower cost than onshore equivalents — to build, maintain, or extend software products. Done well, it delivers the same quality at a fraction of the cost.",
          },
          {
            q: "What are the risks and how do you mitigate them?",
            a: "The main risks are communication breakdown, quality inconsistency, and management overhead. We mitigate these with structured onboarding, code review processes, regular demos, and an English-fluent project manager on every engagement.",
          },
        ],
        painPoints: [
          "UK/US engineering costs preventing necessary product development",
          "Previous offshore experience delivered poor quality work",
          "No internal capacity to manage an offshore team",
          "Struggling to find local talent for specialist technical roles",
        ],
        benefits: [
          "Engineering capacity at 40–60% lower cost than onshore",
          "Managed engagement — you get the output, we handle oversight",
          "Same development standards and practices as onshore teams",
          "Scale up or down based on project needs without fixed hires",
        ],
        stack: ["TypeScript", "React", "Node.js", "Python", "PostgreSQL", "AWS / Azure / GCP"],
        timeline: [
          { phase: "Team assembly and onboarding", time: "2–4 weeks" },
          { phase: "Ongoing dedicated engagement", time: "3-month minimum" },
        ],
      },
      {
        slug: "dedicated-development-team",
        name: "Dedicated Development Team",
        displayName: "Dedicated Development Team Services",
        tagline: "We assemble dedicated development teams built to your exact spec — operational in weeks, delivering with sprint reviews and full product accountability.",
        metaTitle: "Dedicated Development Team | Hire a Dedicated Dev Team | Infomist",
        metaDescription: "Hire a dedicated development team fully integrated into your product workflow. Managed engineering squads built to your spec, on a flexible engagement model.",
        faqs: [
          {
            q: "What roles can be part of a dedicated development team?",
            a: "Frontend engineers, backend engineers, full-stack developers, mobile developers, QA engineers, DevOps engineers, UI/UX designers, data engineers, and product managers. We assemble a team around your specific requirements.",
          },
          {
            q: "How is a dedicated team different from staff augmentation?",
            a: "Staff augmentation adds individuals to your existing team. A dedicated squad is a fully managed, self-contained unit that owns a product area end-to-end — with team lead, process, and delivery accountability built in.",
          },
        ],
        painPoints: [
          "Need to scale engineering quickly without a long hiring process",
          "In-house team lacks capacity for a parallel development track",
          "Specific skills gap slowing down the product roadmap",
          "Agency model not providing enough continuity and context",
        ],
        benefits: [
          "Purpose-built team aligned exactly to your technical requirements",
          "Faster than hiring — operational in weeks, not months",
          "Managed delivery with sprint reviews and regular demos",
          "Flexible — scale up or wind down as the product evolves",
        ],
        stack: ["TypeScript", "React / Next.js", "Node.js", "Python", "PostgreSQL", "Docker / Kubernetes"],
        timeline: [
          { phase: "Team design and recruitment", time: "2–4 weeks" },
          { phase: "Dedicated team engagement", time: "3-month minimum" },
        ],
      },
    ],
  },
];

export function findCategory(slug: string): Category | null {
  return CATEGORIES.find((c) => c.slug === slug || c.id === slug) ?? null;
}

export function findSubcategory(slug: string): { category: Category; sub: SubCategory } | null {
  for (const cat of CATEGORIES) {
    const sub = cat.subs.find((s) => s.slug === slug);
    if (sub) return { category: cat, sub };
  }
  return null;
}
