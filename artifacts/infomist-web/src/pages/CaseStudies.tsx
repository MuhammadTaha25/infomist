import { ArrowRight, FolderGit2 } from "lucide-react";
import { useMeta } from "@/components/site/useMeta";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { GridOverlay, Blob, GradientText, Eyebrow, DarkCTA, CTAButton } from "@/components/site/primitives";
import { ClientImpactSlider } from "@/components/ClientImpactSlider";

const PROJECTS = [
  { initials: "M", name: "MedEZ", location: "Florida, USA", industry: "Healthcare Tech", color: "#0EA5E9", desc: "Enterprise EHR platform for behavioral health facilities across North America and the Middle East.", tags: ["Website Designing", "Website Development", "Digital Marketing"] },
  { initials: "B", name: "BeingGuru", location: "Pakistan", industry: "Media & Education", color: "#F59E0B", desc: "Pakistan's leading tech news, freelancing education, and motivation platform serving the GCC market.", tags: ["Website Designing", "Website Development", "Digital Marketing"] },
  { initials: "W", name: "WorkChest", location: "Pakistan", industry: "Freelance Platform", color: "#8B5CF6", desc: "Pakistan's first freelance marketplace — 200,000+ registered freelancers, 3,000+ global projects.", tags: ["Website Designing", "Website Development", "Digital Marketing"] },
  { initials: "GWC", name: "Grey Wolf Consulting", location: "Connecticut, USA", industry: "Defense & Security", color: "#94A3B8", desc: "Tactical firearms training for military, law enforcement, and private security across Connecticut.", tags: ["Website Designing", "Website Development", "Digital Marketing"] },
  { initials: "S", name: "SyncBenefits", location: "San Francisco, CA, USA", industry: "InsurTech & Benefits", color: "#10B981", desc: "Full-service insurance and employee benefits agency built exclusively for high-growth startups.", tags: ["Website Designing", "Website Development", "Digital Marketing"] },
  { initials: "AP", name: "Aegis PropTech", location: "United Kingdom", industry: "PropTech", color: "#14B8A6", desc: "24/7 voice AI agent that eliminated after-hours lead drop-off for a UK property firm.", tags: ["AI Agent Development", "Workflow Automation", "CRM Integration"] },
  { initials: "MHS", name: "Meridian Health Systems", location: "United States", industry: "HealthTech", color: "#22C55E", desc: "HIPAA-compliant RAG AI assistant that cut patient intake admin time from 45 to 12 minutes.", tags: ["AI Agent Development", "RAG Systems", "EHR Integration"] },
  { initials: "NC", name: "NovaBridge Capital", location: "United States", industry: "FinTech", color: "#A855F7", desc: "Full-stack investor portal with real-time dashboards and automated regulatory reporting — delivered in 10 weeks.", tags: ["Full-Stack Development", "Portal Architecture", "RegTech"] },
];

export function CaseStudiesPage() {
  useMeta(
    "Case Studies | Infomist — Real Results for Real Clients",
    "See what Infomist has built for clients across healthcare, fintech, proptech, and more — plus verified reviews sourced directly from Guru.com.",
  );

  return (
    <>
      <div className="w-full min-h-screen pt-20 overflow-x-hidden">
        <section
          className="relative w-full overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}
        >
          <GridOverlay dark />
          <Blob color="rgba(14,165,233,0.2)" className="-top-24 -left-16" size={520} />
          <Blob color="rgba(132,204,22,0.14)" className="top-10 right-0" size={400} />

          <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-20 md:pb-28">
            <Reveal className="flex flex-col gap-5 max-w-3xl">
              <Eyebrow icon={FolderGit2} dark>Portfolio</Eyebrow>
              <h1 className="font-black text-white leading-[1.02]" style={{ fontSize: "clamp(2.6rem, 6.2vw, 4.25rem)", letterSpacing: "-0.045em" }}>
                Real clients. <GradientText>Real results.</GradientText>
              </h1>
              <p className="text-slate-400 text-xl leading-relaxed">
                A selection of the products, platforms, and automation systems we've shipped —
                no vanity projects.
              </p>
            </Reveal>

            <RevealGroup className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROJECTS.map((p) => (
                <RevealItem key={p.name}>
                  <div
                    className="h-full rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1.5"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-black" style={{ background: `${p.color}22`, color: p.color, border: `1px solid ${p.color}3a` }}>
                        {p.initials}
                      </div>
                      <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full whitespace-nowrap" style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30` }}>
                        {p.industry}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-white font-bold text-lg leading-snug">{p.name}</h3>
                      <p className="text-[11px] text-slate-500">{p.location}</p>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed flex-1">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-slate-300" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section className="w-full" style={{ background: "#F9FAFB" }}>
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
            <ClientImpactSlider />
          </div>
        </section>
      </div>

      <DarkCTA
        eyebrow="Have a project in mind?"
        title="Let's build the next one together."
        sub="Tell us where your product or operations are getting stuck — we'll map the shortest path to shipped."
        cta={<CTAButton href="/talk-to-strategist" variant="lime" icon={ArrowRight}>Talk to a Strategist</CTAButton>}
      />
    </>
  );
}
