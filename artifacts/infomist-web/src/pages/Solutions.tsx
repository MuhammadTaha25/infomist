import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Reveal } from "@/components/Reveal";
import { PageFaq } from "@/components/PageFaq";

function useMeta(title: string, description: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    let metaEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = metaEl?.content ?? "";
    if (!metaEl) {
      metaEl = document.createElement("meta");
      metaEl.name = "description";
      document.head.appendChild(metaEl);
    }
    metaEl.content = description;
    return () => {
      document.title = prev;
      if (metaEl) metaEl.content = prevDesc;
    };
  }, [title, description]);
}

const SOLUTIONS = [
  {
    id: "fullstack",
    label: "Full-Stack Development",
    color: "#0EA5E9",
    headline: "Scalable Web & Mobile Architecture",
    body: "From single-page applications to distributed microservice backends, we architect systems that scale. Our full-stack teams work across React, Next.js, Node.js, and cloud-native deployments — delivering production-ready software with no shortcuts.",
    deliverables: ["Custom web applications", "REST & GraphQL APIs", "React Native mobile apps", "Cloud infrastructure setup", "CI/CD pipelines"],
  },
  {
    id: "automation",
    label: "Workflow Automation",
    color: "#84CC16",
    headline: "End-to-End Process Automation with n8n",
    body: "We map your operational bottlenecks and replace them with intelligent automation pipelines. Using n8n, Zapier, and custom webhook integrations, we eliminate manual handoffs across CRMs, ERPs, email systems, and proprietary databases.",
    deliverables: ["n8n workflow design & deployment", "API integration mapping", "CRM/ERP automation", "Error monitoring & alerting", "Retainer-based maintenance"],
  },
  {
    id: "ai",
    label: "AI Agent Development",
    color: "#8B5CF6",
    headline: "Autonomous AI Agents for Enterprise",
    body: "We build domain-specific AI agents that operate autonomously within your workflows — answering queries, qualifying leads, processing documents, and escalating edge cases to humans. Built on battle-tested LLM infrastructure with full observability.",
    deliverables: ["RAG-augmented LLMs", "Voice agents via LiveKit", "HealthTech AI compliance", "PropTech listing agents", "Multi-modal pipelines"],
  },
  {
    id: "growth",
    label: "Growth Systems",
    color: "#F97316",
    headline: "Automated SEO & Content Pipelines",
    body: "We build content engines that compound over time — automated publishing pipelines, programmatic SEO systems, and AI-generated content workflows that keep your brand visible without burning your team. More output, less overhead.",
    deliverables: ["Programmatic SEO infrastructure", "Content automation pipelines", "Schema markup & AEO", "Analytics dashboards", "Conversion rate optimisation"],
  },
];

const SOLUTIONS_FAQS = [
  {
    q: "What services does Infomist offer?",
    a: "Four core practice areas: Full-Stack Development, Workflow Automation (n8n), AI Agent Development, and Growth Systems (programmatic SEO/AEO).",
  },
  {
    q: "Can Infomist build both the AI agent and the website it runs on?",
    a: "Yes — Infomist's full-stack and AI teams work together so a voice/chat AI agent can be built and integrated directly into a new or existing web or mobile product.",
  },
  {
    q: "What's the difference between workflow automation and AI agent development?",
    a: "Workflow automation (via n8n/Zapier) connects existing tools and automates repetitive processes, while AI agent development builds autonomous systems (RAG, voice, LLM-driven) that make decisions and interact with users directly.",
  },
  {
    q: "Does Infomist only build custom software, or also help with SEO and marketing?",
    a: "Both — the Growth Systems practice covers programmatic SEO, content automation, and AEO alongside the engineering practices.",
  },
  {
    q: "How do I know which Infomist service is right for my business?",
    a: "Book a free strategy call — Infomist's team reviews your goals and recommends the right mix of full-stack, automation, AI, or growth services.",
  },
];

export function SolutionsPage() {
  useMeta(
    "Solutions | Infomist — Full-Stack, AI, Automation & Growth Services",
    "Explore Infomist's core service areas: Full-Stack Development, Workflow Automation, AI Agent Development, and Growth Systems. Custom software for serious businesses since 2001."
  );
  const [active, setActive] = useState(SOLUTIONS[0].id);
  const current = SOLUTIONS.find((s) => s.id === active)!;

  return (
    <div className="w-full min-h-screen bg-white pt-20">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <Reveal className="flex flex-col gap-4 mb-16">
          <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#0EA5E9]">Solutions</span>
          <h1 className="text-5xl md:text-6xl font-black text-[#0F172A] leading-tight" style={{ letterSpacing: "-0.03em" }}>
            What We Build.
          </h1>
          <p className="text-[#475569] text-xl max-w-2xl leading-relaxed">
            Four core practice areas, each refined over two decades of client work across HealthTech, PropTech, Finance, and Enterprise.
          </p>
        </Reveal>

        <Reveal className="flex flex-col lg:flex-row gap-8" delay={0.1}>
          <div className="flex flex-row lg:flex-col gap-2 lg:w-56 flex-shrink-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {SOLUTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className="flex-shrink-0 text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: active === s.id ? `${s.color}12` : "transparent",
                  color: active === s.id ? s.color : "#64748B",
                  border: active === s.id ? `1.5px solid ${s.color}30` : "1.5px solid transparent",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div
            className="flex-1 rounded-2xl p-8 md:p-10 flex flex-col gap-6"
            style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 24px 0 rgba(15,23,42,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 rounded-full" style={{ background: current.color }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: current.color }}>{current.label}</span>
            </div>
            <h2 className="text-3xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.025em" }}>{current.headline}</h2>
            <p className="text-[#475569] text-lg leading-relaxed">{current.body}</p>
            <div className="flex flex-col gap-3 pt-2">
              <p className="text-xs font-bold tracking-widest uppercase text-[#94A3B8]">Deliverables</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {current.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2.5 text-sm text-[#0F172A] font-medium">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: current.color }} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4">
              <Link
                href="/talk-to-strategist"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                style={{ background: current.color }}
              >
                Talk to a Strategist
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      <PageFaq
        faqs={SOLUTIONS_FAQS}
        idPrefix="solutions-page"
        heading="Frequently Asked Questions"
        subheading="Common questions about Infomist's four core service areas."
      />
    </div>
  );
}
