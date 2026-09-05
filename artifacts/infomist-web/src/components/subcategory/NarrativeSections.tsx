import type { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, Plus } from "lucide-react";
import type { Friction, Stage, UseCase } from "@/data/subcategoryNarrative";
import type { Faq } from "@/data/solutionsData";

/* ── palette ──────────────────────────────────────────────────────────── */
export const NV = {
  hero: "#050B14",
  challenge: "#07111E",
  approach: "#081321",
  engineering: "#091727",
  cta: "#060D18",
  blue: "#3B82F6",
  bright: "#60A5FA",
  cyan: "#22D3EE",
  text: "#F4F7FB",
  muted: "#A7B5C7",
  faint: "#718198",
  border: "rgba(255,255,255,0.08)",
};

const HEADING = "font-black leading-[1.05] tracking-[-0.035em] text-[#F4F7FB]";

/* ── section shell ────────────────────────────────────────────────────── */
function Band({
  bg,
  index,
  eyebrow,
  children,
  glow,
}: {
  bg: string;
  index: string;
  eyebrow: string;
  children: ReactNode;
  glow?: boolean;
}) {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: bg }}>
      {glow ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 70% 15%, rgba(59,130,246,0.10), transparent 38%)" }}
        />
      ) : null}
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="mb-10 text-xs font-bold uppercase" style={{ letterSpacing: "0.18em", color: "#7FA7D9" }}>
          {index} <span className="mx-1 opacity-40">/</span> {eyebrow}
        </p>
        {children}
      </div>
    </section>
  );
}

function Arrow({ vertical }: { vertical?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={vertical ? "my-1 text-[#33507a]" : "mx-1 hidden md:inline text-[#33507a]"}
      style={{ fontSize: 18 }}
    >
      {vertical ? "↓" : "→"}
    </span>
  );
}

/* ── 02 · THE CHALLENGE ───────────────────────────────────────────────── */
export function ChallengeSection({ statement, frictions }: { statement: string; frictions: Friction[] }) {
  return (
    <Band bg={NV.challenge} index="01" eyebrow="The Challenge">
      <h2 className={`${HEADING} max-w-3xl`} style={{ fontSize: "clamp(1.9rem, 4.4vw, 3rem)" }}>
        {statement}
      </h2>
      <div className="mt-12 border-t" style={{ borderColor: NV.border }}>
        {frictions.map((f, i) => (
          <div
            key={f.title}
            className="group grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-1 border-b py-7 transition-colors md:grid-cols-[3.5rem_1fr] md:gap-x-8"
            style={{ borderColor: NV.border }}
          >
            <span
              className="font-mono text-sm transition-colors group-hover:text-[#60A5FA]"
              style={{ color: "#3d5578" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-bold text-[#F4F7FB] md:text-xl">{f.title}</h3>
            <p className="col-start-2 max-w-xl text-[15px] leading-relaxed" style={{ color: NV.muted }}>
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </Band>
  );
}

/* ── 04 · THE INFOMIST APPROACH ───────────────────────────────────────── */
export function ApproachSection({ statement, stages }: { statement: string; stages: Stage[] }) {
  return (
    <Band bg={NV.approach} index="02" eyebrow="The Infomist Approach">
      <h2 className={HEADING} style={{ fontSize: "clamp(1.8rem, 4vw, 2.7rem)" }}>
        From data to action.
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: NV.muted }}>
        {statement}
      </p>
      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4" style={{ background: NV.border }}>
        {stages.map((s, i) => (
          <div key={s.title} className="flex flex-col gap-2 p-6" style={{ background: NV.approach }}>
            <span className="font-mono text-xs" style={{ color: "#3d5578" }}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: NV.bright }}>{s.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: NV.muted }}>{s.body}</p>
          </div>
        ))}
      </div>
    </Band>
  );
}

/* ── 05 · THE TRANSFORMATION ──────────────────────────────────────────── */
function StackList({ label, items, tone }: { label: string; items: string[]; tone: "dim" | "mid" | "bright" }) {
  const color = tone === "bright" ? NV.text : tone === "mid" ? NV.bright : NV.muted;
  return (
    <div className="flex flex-1 flex-col gap-3">
      <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "#7FA7D9" }}>{label}</p>
      <ul className="flex flex-col gap-2">
        {items.map((it) => (
          <li key={it} className="text-[15px] leading-snug" style={{ color }}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

export function TransformationSection({
  before,
  layer,
  after,
}: {
  before: string[];
  layer: string[];
  after: string[];
}) {
  return (
    <Band bg={NV.hero} index="03" eyebrow="The Transformation" glow>
      <h2 className={HEADING} style={{ fontSize: "clamp(1.8rem, 4vw, 2.7rem)" }}>
        What changes when intelligence becomes part of the workflow.
      </h2>

      <div className="mt-12 flex flex-col items-stretch gap-6 lg:flex-row lg:items-center lg:gap-4">
        <div className="rounded-2xl border p-6" style={{ borderColor: NV.border, background: "rgba(255,255,255,0.02)" }}>
          <StackList label="Before" items={before} tone="dim" />
        </div>

        <Arrow />
        <span className="lg:hidden"><Arrow vertical /></span>

        <div
          className="relative rounded-2xl border p-6 lg:-my-4 lg:py-9"
          style={{
            borderColor: "rgba(96,165,250,0.35)",
            background: "linear-gradient(160deg, rgba(59,130,246,0.14), rgba(59,130,246,0.03))",
            boxShadow: "0 0 60px -12px rgba(59,130,246,0.35)",
          }}
        >
          <StackList label="Infomist Intelligence Layer" items={layer} tone="bright" />
        </div>

        <Arrow />
        <span className="lg:hidden"><Arrow vertical /></span>

        <div className="rounded-2xl border p-6" style={{ borderColor: NV.border, background: "rgba(255,255,255,0.02)" }}>
          <StackList label="After" items={after} tone="mid" />
        </div>
      </div>
    </Band>
  );
}

/* ── 06 · HOW WE BUILD IT ─────────────────────────────────────────────── */
export function BuildSection({ steps }: { steps: Stage[] }) {
  return (
    <Band bg={NV.engineering} index="04" eyebrow="How We Build It">
      <h2 className={HEADING} style={{ fontSize: "clamp(1.8rem, 4vw, 2.7rem)" }}>
        Engineered from the ground up.
      </h2>
      <ol className="mt-12 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.title} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                style={{ background: "rgba(96,165,250,0.12)", border: "1px solid rgba(96,165,250,0.3)", color: NV.bright }}
              >
                {i + 1}
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: NV.text }}>{s.title}</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: NV.muted }}>{s.body}</p>
          </li>
        ))}
      </ol>
    </Band>
  );
}

/* ── 07 · CAPABILITIES ────────────────────────────────────────────────── */
export function CapabilitiesSection({ items }: { items: string[] }) {
  return (
    <Band bg={NV.hero} index="05" eyebrow="What We Engineer">
      <h2 className={HEADING} style={{ fontSize: "clamp(1.8rem, 4vw, 2.7rem)" }}>
        Capabilities.
      </h2>
      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4" style={{ background: NV.border }}>
        {items.map((c) => (
          <div
            key={c}
            className="p-5 text-sm font-semibold transition-colors hover:text-[#60A5FA]"
            style={{ background: NV.hero, color: NV.muted }}
          >
            {c}
          </div>
        ))}
      </div>
    </Band>
  );
}

/* ── 08 · SYSTEM ARCHITECTURE ─────────────────────────────────────────── */
export function ArchitectureSection({ nodes }: { nodes: string[] }) {
  return (
    <Band bg={NV.engineering} index="06" eyebrow="System Architecture" glow>
      <h2 className={HEADING} style={{ fontSize: "clamp(1.8rem, 4vw, 2.7rem)" }}>
        How the system runs.
      </h2>
      <div className="mt-12 flex flex-col items-start gap-0 md:flex-row md:flex-wrap md:items-center md:gap-3">
        {nodes.map((n, i) => (
          <div key={n} className="flex items-center gap-3 md:contents">
            <div className="flex flex-col items-start md:flex-row md:items-center md:gap-3">
              <span
                className="rounded-xl border px-4 py-2.5 font-mono text-[13px] tracking-wide"
                style={{
                  borderColor: i === 0 ? "rgba(96,165,250,0.4)" : NV.border,
                  background: "rgba(255,255,255,0.03)",
                  color: i === 0 ? NV.bright : "#9db4d4",
                }}
              >
                {n}
              </span>
              {i < nodes.length - 1 ? (
                <>
                  <span className="my-1 text-[#33507a] md:hidden">↓</span>
                  <span className="hidden text-[#33507a] md:inline">→</span>
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Band>
  );
}

/* ── 09 · USE CASES ───────────────────────────────────────────────────── */
export function UseCasesSection({ items }: { items: UseCase[] }) {
  return (
    <Band bg={NV.challenge} index="07" eyebrow="Where It Creates Value">
      <h2 className={HEADING} style={{ fontSize: "clamp(1.8rem, 4vw, 2.7rem)" }}>
        Where it creates value.
      </h2>
      <div className="mt-12 border-t" style={{ borderColor: NV.border }}>
        {items.map((u) => (
          <div key={u.title} className="grid gap-x-8 gap-y-1 border-b py-7 md:grid-cols-[14rem_1fr]" style={{ borderColor: NV.border }}>
            <h3 className="text-lg font-bold" style={{ color: NV.text }}>{u.title}</h3>
            <p className="max-w-xl text-[15px] leading-relaxed" style={{ color: NV.muted }}>{u.body}</p>
          </div>
        ))}
      </div>
    </Band>
  );
}

/* ── 10 · BUSINESS IMPACT ─────────────────────────────────────────────── */
export function ImpactSection({ items }: { items: Stage[] }) {
  return (
    <Band bg={NV.hero} index="08" eyebrow="Designed For Measurable Impact">
      <h2 className={HEADING} style={{ fontSize: "clamp(1.8rem, 4vw, 2.7rem)" }}>
        Designed for measurable impact.
      </h2>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {items.map((s) => (
          <div key={s.title} className="flex flex-col gap-2 border-l-2 pl-5" style={{ borderColor: "rgba(96,165,250,0.4)" }}>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: NV.bright }}>{s.title}</h3>
            <p className="text-[15px] leading-relaxed" style={{ color: NV.muted }}>{s.body}</p>
          </div>
        ))}
      </div>
    </Band>
  );
}

/* ── 11 · WHY INFOMIST ────────────────────────────────────────────────── */
export function WhySection({ items }: { items: Stage[] }) {
  return (
    <Band bg={NV.approach} index="09" eyebrow="Why Infomist">
      <div className="grid gap-10 md:grid-cols-3">
        {items.map((s) => (
          <div key={s.title} className="flex flex-col gap-2">
            <h3 className="text-base font-black" style={{ color: NV.text }}>{s.title}</h3>
            <p className="text-[15px] leading-relaxed" style={{ color: NV.muted }}>{s.body}</p>
          </div>
        ))}
      </div>
    </Band>
  );
}

/* ── FAQ (dark) ───────────────────────────────────────────────────────── */
export function NarrativeFaq({ faqs, title }: { faqs: Faq[]; title: string }) {
  if (!faqs.length) return null;
  return (
    <Band bg={NV.challenge} index="10" eyebrow="Frequently Asked Questions">
      <h2 className={`${HEADING} max-w-2xl`} style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.4rem)" }}>
        {title}
      </h2>
      <div className="mt-10 border-t" style={{ borderColor: NV.border }}>
        {faqs.map((f) => (
          <details key={f.q} className="group border-b" style={{ borderColor: NV.border }}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-[15px] font-semibold text-[#F4F7FB] [&::-webkit-details-marker]:hidden">
              {f.q}
              <Plus
                size={17}
                className="mt-0.5 shrink-0 transition-transform group-open:rotate-45"
                style={{ color: NV.bright }}
              />
            </summary>
            <p className="max-w-2xl pb-6 text-[15px] leading-relaxed" style={{ color: NV.muted }}>
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </Band>
  );
}

/* ── 12 · CTA ─────────────────────────────────────────────────────────── */
export function NarrativeCta({ categorySlug }: { categorySlug: string }) {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: NV.cta }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 120%, rgba(59,130,246,0.16), transparent 45%)" }}
      />
      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center md:py-28">
        <h2 className={HEADING} style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}>
          Have a system worth building?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed" style={{ color: NV.muted }}>
          Tell us what you're trying to solve. We'll help map the AI, software and automation
          required to make it real.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/talk-to-strategist"
            className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-[#071426] transition-transform hover:-translate-y-0.5"
            style={{ background: NV.cyan }}
          >
            Talk to an Engineer
            <ArrowRight size={17} strokeWidth={2.6} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={`/solutions/${categorySlug}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-[#F4F8FC] transition-colors hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.18)" }}
          >
            Explore Solutions
          </Link>
        </div>
      </div>
    </section>
  );
}
