import { useState } from "react";
import { Check, Layers, Workflow, Bot, TrendingUp, ArrowRight } from "lucide-react";
import { useMeta } from "@/components/site/useMeta";
import { PageFaq } from "@/components/PageFaq";
import { PageHero, Section, IconTile, CTAButton } from "@/components/site/primitives";
import { HeroVisual } from "@/components/hero/HeroVisual";

const SOLUTIONS = [
  {
    id: "fullstack",
    label: "Full-Stack Development",
    color: "#0EA5E9",
    icon: Layers,
    headline: "Scalable Web & Mobile Architecture",
    body: "From single-page applications to distributed microservice backends, we architect systems that scale. Our full-stack teams work across React, Next.js, Node.js, and cloud-native deployments — delivering production-ready software with no shortcuts.",
    deliverables: ["Custom web applications", "REST & GraphQL APIs", "React Native mobile apps", "Cloud infrastructure setup", "CI/CD pipelines"],
  },
  {
    id: "automation",
    label: "Workflow Automation",
    color: "#84CC16",
    icon: Workflow,
    headline: "End-to-End Process Automation with n8n",
    body: "We map your operational bottlenecks and replace them with intelligent automation pipelines. Using n8n, Zapier, and custom webhook integrations, we eliminate manual handoffs across CRMs, ERPs, email systems, and proprietary databases.",
    deliverables: ["n8n workflow design & deployment", "API integration mapping", "CRM/ERP automation", "Error monitoring & alerting", "Retainer-based maintenance"],
  },
  {
    id: "ai",
    label: "AI Agent Development",
    color: "#8B5CF6",
    icon: Bot,
    headline: "Autonomous AI Agents for Enterprise",
    body: "We build domain-specific AI agents that operate autonomously within your workflows — answering queries, qualifying leads, processing documents, and escalating edge cases to humans. Built on battle-tested LLM infrastructure with full observability.",
    deliverables: ["RAG-augmented LLMs", "Voice agents via LiveKit", "HealthTech AI compliance", "PropTech listing agents", "Multi-modal pipelines"],
  },
  {
    id: "growth",
    label: "Growth Systems",
    color: "#F97316",
    icon: TrendingUp,
    headline: "Automated SEO & Content Pipelines",
    body: "We build content engines that compound over time — automated publishing pipelines, programmatic SEO systems, and AI-generated content workflows that keep your brand visible without burning your team. More output, less overhead.",
    deliverables: ["Programmatic SEO infrastructure", "Content automation pipelines", "Schema markup & AEO", "Analytics dashboards", "Conversion rate optimisation"],
  },
];

const SOLUTIONS_FAQS = [
  { q: "What services does Infomist offer?", a: "Four core practice areas: Full-Stack Development, Workflow Automation (n8n), AI Agent Development, and Growth Systems (programmatic SEO/AEO)." },
  { q: "Can Infomist build both the AI agent and the website it runs on?", a: "Yes — Infomist's full-stack and AI teams work together so a voice/chat AI agent can be built and integrated directly into a new or existing web or mobile product." },
  { q: "What's the difference between workflow automation and AI agent development?", a: "Workflow automation (via n8n/Zapier) connects existing tools and automates repetitive processes, while AI agent development builds autonomous systems (RAG, voice, LLM-driven) that make decisions and interact with users directly." },
  { q: "Does Infomist only build custom software, or also help with SEO and marketing?", a: "Both — the Growth Systems practice covers programmatic SEO, content automation, and AEO alongside the engineering practices." },
  { q: "How do I know which Infomist service is right for my business?", a: "Book a free strategy call — Infomist's team reviews your goals and recommends the right mix of full-stack, automation, AI, or growth services." },
];

export function SolutionsPage() {
  useMeta(
    "Solutions | Infomist — Full-Stack, AI, Automation & Growth Services",
    "Explore Infomist's core service areas: Full-Stack Development, Workflow Automation, AI Agent Development, and Growth Systems. Custom software for serious businesses since 2001.",
  );
  const [active, setActive] = useState(SOLUTIONS[0].id);
  const current = SOLUTIONS.find((s) => s.id === active)!;
  const Icon = current.icon;

  return (
    <div className="w-full min-h-screen bg-white pt-20 overflow-x-hidden">
      <PageHero
        eyebrow="Solutions"
        eyebrowIcon={Layers}
        title="What"
        gradientWord="We Build."
        sub="Four core practice areas, each refined over two decades of client work across HealthTech, PropTech, Finance, and Enterprise."
        visual={<HeroVisual variant="network" />}
      />

      <Section tone="soft">
        <div className="flex flex-col lg:flex-row gap-8 rise-in">
          <div className="flex flex-row lg:flex-col gap-2 lg:w-60 flex-shrink-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {SOLUTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className="flex-shrink-0 text-left px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200"
                  style={{
                    background: isActive ? `${s.color}12` : "transparent",
                    color: isActive ? s.color : "#64748B",
                    border: isActive ? `1.5px solid ${s.color}44` : "1.5px solid transparent",
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          <div
            className="flex-1 rounded-3xl p-[1.5px]"
            style={{ background: `linear-gradient(150deg, ${current.color}3a, ${current.color}0a)` }}
          >
            <div className="rounded-[22px] bg-white p-8 md:p-10 flex flex-col gap-6 h-full">
              <div className="flex items-center gap-3.5">
                <IconTile icon={Icon} accent={current.color} />
                <span className="text-xs font-bold uppercase" style={{ letterSpacing: "0.2em", color: current.color }}>
                  {current.label}
                </span>
              </div>
              <h2 className="font-black text-[#0F172A]" style={{ fontSize: "clamp(1.7rem, 3vw, 2.1rem)", letterSpacing: "-0.03em" }}>
                {current.headline}
              </h2>
              <p className="text-[#475569] text-lg leading-relaxed">{current.body}</p>
              <div className="flex flex-col gap-3 pt-1">
                <p className="text-xs font-bold uppercase text-[#94A3B8]" style={{ letterSpacing: "0.18em" }}>Deliverables</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-[15px] text-[#0F172A] font-medium">
                      <span className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${current.color}1f`, color: current.color }}>
                        <Check size={12} strokeWidth={3.2} />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3">
                <CTAButton href="/talk-to-strategist" icon={ArrowRight}>Talk to a Strategist</CTAButton>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <PageFaq
        faqs={SOLUTIONS_FAQS}
        idPrefix="solutions-page"
        heading="Frequently Asked Questions"
        subheading="Common questions about Infomist's four core service areas."
      />
    </div>
  );
}
