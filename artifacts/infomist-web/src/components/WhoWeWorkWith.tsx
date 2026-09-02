import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Rocket, Code2, Megaphone, Settings, Palette, Film, Users } from "lucide-react";
import { SectionHead, IconTile, Pill, accentFor } from "@/components/site/primitives";

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
    <section className="w-full" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
        <Reveal>
          <SectionHead
            icon={Users}
            eyebrow="Who We Work With"
            title="Built for the people who"
            gradientWord="own the outcome."
            center
            sub="Whether you're the founder, the technical lead, or the person accountable for the number — Infomist plugs in at the right level."
          />
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PERSONAS.map((p, i) => {
            const Icon = p.icon;
            const accent = accentFor(i);
            return (
              <RevealItem key={p.title}>
                <div
                  className="group relative h-full rounded-3xl p-[1.5px] transition-transform duration-300 hover:-translate-y-1.5"
                  style={{ background: `linear-gradient(150deg, ${accent}3a, ${accent}0a)` }}
                >
                  <div className="rounded-[22px] bg-white h-full p-7 flex flex-col gap-4">
                    <IconTile icon={Icon} accent={accent} />
                    <div className="flex flex-col gap-1.5 flex-1">
                      <h3 className="text-lg font-bold text-[#0F172A] leading-snug">{p.title}</h3>
                      <p className="text-sm text-[#475569] leading-relaxed">{p.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.services.map((s) => (
                        <Pill key={s} accent={accent} className="!normal-case !tracking-normal !font-semibold">{s}</Pill>
                      ))}
                    </div>
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
