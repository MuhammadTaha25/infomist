import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHead, IconTile, CTAButton, accentFor } from "@/components/site/primitives";
import { PERSONAS } from "@/data/whoWeWorkWithData";
import { ChallengePreview } from "./ChallengeSelector";

/**
 * Interactive "Who We Work With" section.
 *
 * Left: persona selector rail. Right: the selected persona's positioning,
 * challenges preview, capability tags, and a link into the full persona journey.
 *
 * Drop-in replacement for the static <WhoWeWorkWith /> component — swap the
 * import in Home once routing is wired (see INTEGRATION.md).
 */
export function PersonaExplorer() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = PERSONAS[activeIdx];
  const accent = accentFor(activeIdx);
  const ActiveIcon = active.icon;

  return (
    <section id="who-we-work-with" className="w-full" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
        <Reveal>
          <SectionHead
            icon={Users}
            eyebrow="Who We Work With"
            title="Built for the people who"
            gradientWord="own the outcome."
            center
            sub="Whether you're leading the business, technology, operations, product, or growth — pick your role and see how we plug in."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-8">
          {/* Persona rail */}
          <div
            role="tablist"
            aria-label="Select your role"
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {PERSONAS.map((p, i) => {
              const selected = i === activeIdx;
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  role="tab"
                  id={`persona-tab-${p.id}`}
                  aria-selected={selected}
                  aria-controls="persona-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIdx(i)}
                  onKeyDown={(e) => {
                    if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                      e.preventDefault();
                      const forward = e.key === "ArrowDown" || e.key === "ArrowRight";
                      setActiveIdx((v) => (forward ? (v + 1) % PERSONAS.length : (v - 1 + PERSONAS.length) % PERSONAS.length));
                    }
                  }}
                  className={`group flex-shrink-0 lg:flex-shrink flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0EA5E9] ${
                    selected
                      ? "border-transparent"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:-translate-y-0.5"
                  }`}
                  style={
                    selected
                      ? { background: `${accentFor(i)}12`, boxShadow: `inset 0 0 0 1.5px ${accentFor(i)}55` }
                      : undefined
                  }
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: selected ? `${accentFor(i)}1f` : "#F1F5F9",
                      color: selected ? accentFor(i) : "#94A3B8",
                    }}
                  >
                    <Icon size={15} strokeWidth={2.2} />
                  </span>
                  <span
                    className={`text-sm whitespace-nowrap lg:whitespace-normal ${
                      selected ? "font-bold text-[#0F172A]" : "font-semibold text-[#475569]"
                    }`}
                  >
                    {p.navLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active persona panel */}
          <div
            id="persona-panel"
            role="tabpanel"
            aria-labelledby={`persona-tab-${active.id}`}
            key={active.id}
            className="rise-in relative rounded-3xl p-[1.5px]"
            style={{ background: `linear-gradient(150deg, ${accent}3a, ${accent}0a)` }}
          >
            <div className="rounded-[22px] bg-white h-full p-7 md:p-9 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <IconTile icon={ActiveIcon} accent={accent} size={12} />
                <div className="flex flex-col gap-1">
                  <span
                    className="text-xs font-bold uppercase"
                    style={{ letterSpacing: "0.2em", color: accent }}
                  >
                    {active.eyebrow}
                  </span>
                  <h3 className="text-2xl font-black text-[#0F172A] leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    {active.title}
                  </h3>
                </div>
              </div>

              <p className="text-[#475569] text-lg leading-relaxed">{active.positioning}</p>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase text-[#64748B]" style={{ letterSpacing: "0.2em" }}>
                  What brings you here
                </span>
                <ChallengePreview persona={active} />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase text-[#64748B]" style={{ letterSpacing: "0.2em" }}>
                  Where we plug in
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {active.capabilities.map((c) => (
                    <span
                      key={c.title}
                      className="text-[12px] font-semibold px-2.5 py-1 rounded-full text-[#475569]"
                      style={{ background: "#F1F5F9", border: "1px solid #E2E8F0" }}
                    >
                      {c.title}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1 mt-auto">
                <CTAButton href={`/who-we-work-with/${active.slug}`} variant="primary" icon={ArrowRight}>
                  Explore your path
                </CTAButton>
                <Link
                  href="/talk-to-strategist"
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-xl text-base font-bold text-[#0F172A] transition-colors duration-200 hover:bg-slate-50"
                  style={{ border: "1.5px solid rgba(15,23,42,0.12)" }}
                >
                  Talk to a Strategist
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Link
            href="/who-we-work-with"
            className="group inline-flex items-center gap-2 text-sm font-bold text-[#0EA5E9]"
          >
            See all six roles
            <ArrowRight size={15} strokeWidth={2.6} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
