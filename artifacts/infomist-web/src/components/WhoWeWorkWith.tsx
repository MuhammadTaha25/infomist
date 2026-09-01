import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Rocket, Code2, Megaphone, Settings, Palette, Film } from "lucide-react";

const PERSONAS = [
  {
    title: "CEOs & Founders",
    icon: Rocket,
    desc: "You need a technology partner who can move fast, own outcomes, and speak the language of the business — not just the codebase.",
    services: ["AI Automation", "Custom Software", "Website Development"],
  },
  {
    title: "CTOs & VPs of Engineering",
    icon: Code2,
    desc: "You need senior engineering capacity that ships production-grade code, documents decisions, and integrates cleanly with your existing stack.",
    services: ["AI Agents", "SaaS Development", "System Integration"],
  },
  {
    title: "COOs & Operations Managers",
    icon: Settings,
    desc: "You're losing hours to manual workflows and disconnected tools. You need automation that actually reduces headcount pressure, not more dashboards.",
    services: ["Business Process Automation", "CRM Integration", "Workflow Automation"],
  },
  {
    title: "CMOs & Marketing Leads",
    icon: Megaphone,
    desc: "You need pipeline, not vanity metrics — SEO and paid channels that are measured against revenue, not impressions.",
    services: ["SEO Services", "Digital Marketing", "Content Marketing"],
  },
  {
    title: "Heads of Product & Design",
    icon: Palette,
    desc: "You need design that's grounded in usability research and conversion data — not just aesthetics for a portfolio.",
    services: ["UI/UX Design", "Brand Identity", "Graphic Design"],
  },
  {
    title: "Marketing & Content Managers",
    icon: Film,
    desc: "You need consistent, on-brand video content produced on a schedule your team can actually keep up with.",
    services: ["Video Production", "Video Editing"],
  },
];

export function WhoWeWorkWith() {
  return (
    <section className="w-full bg-[#F9FAFB] py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <Reveal className="flex flex-col gap-4 text-center items-center">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0EA5E9]">Who We Work With</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight max-w-2xl" style={{ letterSpacing: "-0.025em" }}>
            Built for the people who own the outcome.
          </h2>
          <p className="text-[#475569] text-lg max-w-xl leading-relaxed">
            Whether you're the founder, the technical lead, or the person accountable for the number — Infomist plugs in at the right level.
          </p>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PERSONAS.map((p) => {
            const Icon = p.icon;
            return (
              <RevealItem key={p.title}>
                <div
                  className="h-full rounded-2xl p-7 flex flex-col gap-4 bg-white transition-all duration-200 hover:-translate-y-1"
                  style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 4px 0 rgba(15,23,42,0.04)" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(14,165,233,0.06)" }}>
                    <Icon size={24} strokeWidth={1.7} color="#0EA5E9" />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <h3 className="text-base font-bold text-[#0F172A] leading-snug">{p.title}</h3>
                    <p className="text-sm text-[#475569] leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.services.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-[#0EA5E9]"
                        style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.18)" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
