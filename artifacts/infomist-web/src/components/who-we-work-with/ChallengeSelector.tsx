import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import { CTAButton, Pill } from "@/components/site/primitives";
import { proofFor } from "@/data/proofData";
import type { Persona, PersonaChallenge } from "@/data/whoWeWorkWithData";

/**
 * The interactive challenge router. Pick a challenge → see the approach, the
 * relevant capabilities, relevant proof, and a context-carrying CTA.
 * Fully keyboard-operable (roving tab list + panel).
 */
export function ChallengeSelector({ persona }: { persona: Persona }) {
  const [activeId, setActiveId] = useState(persona.challenges[0].id);
  const active =
    persona.challenges.find((c) => c.id === activeId) ?? persona.challenges[0];

  const strategistHref =
    `/talk-to-strategist?topic=${encodeURIComponent(active.strategistTopic)}` +
    `&persona=${encodeURIComponent(persona.title)}` +
    `&challenge=${encodeURIComponent(active.label)}`;

  const proof = proofFor(active.proofTags, 3);
  const relevantCapabilities = persona.capabilities.filter((c) =>
    active.capabilities.includes(c.title),
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-6">
      {/* Challenge list */}
      <div
        role="tablist"
        aria-label={`Challenges for ${persona.title}`}
        aria-orientation="vertical"
        className="flex flex-col gap-2"
      >
        {persona.challenges.map((c) => (
          <ChallengeTab
            key={c.id}
            challenge={c}
            selected={c.id === activeId}
            onSelect={() => setActiveId(c.id)}
          />
        ))}
      </div>

      {/* Detail panel */}
      <div
        role="tabpanel"
        id={`challenge-panel-${active.id}`}
        aria-labelledby={`challenge-tab-${active.id}`}
        key={active.id}
        className="rise-in rounded-2xl border border-slate-200 bg-white p-6 md:p-8 flex flex-col gap-7"
        style={{ boxShadow: "0 1px 4px 0 rgba(15,23,42,0.04)" }}
      >
        <div className="flex flex-col gap-3">
          <span
            className="text-xs font-bold uppercase text-[#0EA5E9]"
            style={{ letterSpacing: "0.2em" }}
          >
            Recommended approach
          </span>
          <p className="text-[#334155] text-base leading-relaxed">{active.approach}</p>
        </div>

        {relevantCapabilities.length > 0 && (
          <div className="flex flex-col gap-3">
            <span
              className="text-xs font-bold uppercase text-[#64748B]"
              style={{ letterSpacing: "0.2em" }}
            >
              Relevant capabilities
            </span>
            <div className="flex flex-col gap-3">
              {relevantCapabilities.map((cap) => (
                <div key={cap.title} className="flex flex-col gap-1.5">
                  <span className="text-sm font-bold text-[#0F172A]">{cap.title}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cap.services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="text-[12px] font-semibold px-2.5 py-1 rounded-full text-[#0EA5E9] transition-colors duration-150 hover:bg-[#0EA5E9]/10"
                        style={{ background: "rgba(14,165,233,0.08)" }}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {proof.length > 0 && (
          <div className="flex flex-col gap-3">
            <span
              className="text-xs font-bold uppercase text-[#64748B]"
              style={{ letterSpacing: "0.2em" }}
            >
              Related work
            </span>
            <ul className="flex flex-col gap-2">
              {proof.map((p) => (
                <li key={p.id}>
                  <Link
                    href={p.href}
                    className="group flex items-baseline gap-2 text-sm text-[#334155] hover:text-[#0EA5E9] transition-colors duration-150"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 translate-y-1"
                      style={{ background: p.color }}
                      aria-hidden="true"
                    />
                    <span className="font-semibold">{p.name}</span>
                    <span className="text-[#94A3B8]">— {p.industry}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-1">
          <CTAButton href={strategistHref} variant="primary" icon={ArrowRight}>
            Talk to a Strategist
          </CTAButton>
        </div>
      </div>
    </div>
  );
}

function ChallengeTab({
  challenge,
  selected,
  onSelect,
}: {
  challenge: PersonaChallenge;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      role="tab"
      id={`challenge-tab-${challenge.id}`}
      aria-selected={selected}
      aria-controls={`challenge-panel-${challenge.id}`}
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          const btns = Array.from(
            e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [],
          );
          const i = btns.indexOf(e.currentTarget);
          const next = e.key === "ArrowDown" ? (i + 1) % btns.length : (i - 1 + btns.length) % btns.length;
          btns[next]?.focus();
          btns[next]?.click();
        }
      }}
      className={`group text-left rounded-xl border px-4 py-3.5 flex items-center justify-between gap-3 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0EA5E9] ${
        selected
          ? "border-[#0EA5E9] bg-[#0EA5E9]/[0.06]"
          : "border-slate-200 bg-white hover:border-slate-300 hover:-translate-y-0.5"
      }`}
    >
      <span
        className={`text-sm leading-snug ${selected ? "font-bold text-[#0F172A]" : "font-semibold text-[#475569]"}`}
      >
        {challenge.label}
      </span>
      {selected ? (
        <Check size={16} strokeWidth={2.6} className="flex-shrink-0 text-[#0EA5E9]" aria-hidden="true" />
      ) : (
        <ArrowRight
          size={15}
          strokeWidth={2.4}
          aria-hidden="true"
          className="flex-shrink-0 text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </button>
  );
}

/** Compact preview used on the main section — lists challenges, links to the persona page. */
export function ChallengePreview({ persona }: { persona: Persona }) {
  return (
    <div className="flex flex-wrap gap-2">
      {persona.challenges.slice(0, 5).map((c) => (
        <Pill key={c.id} className="!normal-case !tracking-normal !font-semibold">
          {c.label}
        </Pill>
      ))}
    </div>
  );
}
