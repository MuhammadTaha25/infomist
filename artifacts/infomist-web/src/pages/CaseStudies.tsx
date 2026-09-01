import { useEffect } from "react";
import { ClientImpactSlider } from "@/components/ClientImpactSlider";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

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

const PROJECTS = [
  {
    initials: "M",
    name: "MedEZ",
    location: "Florida, USA",
    industry: "Healthcare Tech",
    color: "#0EA5E9",
    desc: "Enterprise EHR platform for behavioral health facilities across North America and the Middle East.",
    tags: ["Website Designing", "Website Development", "Digital Marketing"],
  },
  {
    initials: "B",
    name: "BeingGuru",
    location: "Pakistan",
    industry: "Media & Education",
    color: "#F59E0B",
    desc: "Pakistan's leading tech news, freelancing education, and motivation platform serving the GCC market.",
    tags: ["Website Designing", "Website Development", "Digital Marketing"],
  },
  {
    initials: "W",
    name: "WorkChest",
    location: "Pakistan",
    industry: "Freelance Platform",
    color: "#8B5CF6",
    desc: "Pakistan's first freelance marketplace — 200,000+ registered freelancers, 3,000+ global projects.",
    tags: ["Website Designing", "Website Development", "Digital Marketing"],
  },
  {
    initials: "GWC",
    name: "Grey Wolf Consulting",
    location: "Connecticut, USA",
    industry: "Defense & Security",
    color: "#94A3B8",
    desc: "Tactical firearms training for military, law enforcement, and private security across Connecticut.",
    tags: ["Website Designing", "Website Development", "Digital Marketing"],
  },
  {
    initials: "S",
    name: "SyncBenefits",
    location: "San Francisco, CA, USA",
    industry: "InsurTech & Benefits",
    color: "#10B981",
    desc: "Full-service insurance and employee benefits agency built exclusively for high-growth startups.",
    tags: ["Website Designing", "Website Development", "Digital Marketing"],
  },
  {
    initials: "AP",
    name: "Aegis PropTech",
    location: "United Kingdom",
    industry: "PropTech",
    color: "#14B8A6",
    desc: "24/7 voice AI agent that eliminated after-hours lead drop-off for a UK property firm.",
    tags: ["AI Agent Development", "Workflow Automation", "CRM Integration"],
  },
  {
    initials: "MHS",
    name: "Meridian Health Systems",
    location: "United States",
    industry: "HealthTech",
    color: "#22C55E",
    desc: "HIPAA-compliant RAG AI assistant that cut patient intake admin time from 45 to 12 minutes.",
    tags: ["AI Agent Development", "RAG Systems", "EHR Integration"],
  },
  {
    initials: "NC",
    name: "NovaBridge Capital",
    location: "United States",
    industry: "FinTech",
    color: "#A855F7",
    desc: "Full-stack investor portal with real-time dashboards and automated regulatory reporting — delivered in 10 weeks.",
    tags: ["Full-Stack Development", "Portal Architecture", "RegTech"],
  },
];

export function CaseStudiesPage() {
  useMeta(
    "Case Studies | Infomist — Real Results for Real Clients",
    "See what Infomist has built for clients across healthcare, fintech, proptech, and more — plus verified reviews sourced directly from Guru.com."
  );

  return (
    <>
    <div className="w-full min-h-screen pt-20" style={{ background: "linear-gradient(180deg, #0F172A 0%, #0B1220 100%)" }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <Reveal className="flex flex-col gap-4 mb-14">
          <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#0EA5E9]">Portfolio</span>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight" style={{ letterSpacing: "-0.03em" }}>
            Case Studies.
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
            Real clients. Real results. <span className="text-white font-semibold">No vanity projects.</span>
          </p>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <RevealItem key={p.name}>
              <div
                className="h-full rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(148,163,184,0.15)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black"
                    style={{ background: `${p.color}22`, color: p.color }}
                  >
                    {p.initials}
                  </div>
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30` }}
                  >
                    {p.industry}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-white font-bold text-base leading-snug">{p.name}</h3>
                  <p className="text-[11px] text-slate-500">{p.location}</p>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed flex-1">{p.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-slate-300"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(148,163,184,0.15)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  className="inline-flex items-center gap-1.5 text-sm font-semibold mt-1"
                  style={{ color: p.color }}
                >
                  View Case Study
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
    <ClientImpactSlider />
    </>
  );
}
