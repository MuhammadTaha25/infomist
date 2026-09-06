import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Friction, Stage, UseCase } from "@/data/subcategoryNarrative";
import type { Faq } from "@/data/solutionsData";

/* ═══ primitives ═════════════════════════════════════════════════════════ */

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Scroll-reveal wrapper. Armed only when motion is allowed; otherwise the
 *  element renders visible with no observer. `i` staggers grouped children. */
function Reveal({
  children,
  i = 0,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  i?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  // Don't arm when motion is disabled or the viewport can't be measured
  // (SSR, headless, thumbnailing) — the content then just renders visible.
  const [armed] = useState(
    () => !prefersReducedMotion() && typeof window !== "undefined" && (window.innerHeight || 0) > 0,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed) return;
    el.style.transitionDelay = `${Math.min(i, 8) * 70}ms`;

    const show = () => el.setAttribute("data-nv-in", "");
    const vh = window.innerHeight || 0;

    // Anything already on/near screen (or an un-measurable viewport) reveals now.
    const top = el.getBoundingClientRect().top;
    if (vh === 0 || top < vh * 1.25 || typeof IntersectionObserver === "undefined") {
      show();
      return;
    }
    // Safety net so content can never stay hidden if the observer never fires.
    const safety = window.setTimeout(show, 1500);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          show();
          window.clearTimeout(safety);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(safety);
      io.disconnect();
    };
  }, [armed, i]);

  return (
    <Tag ref={ref} className={className} {...(armed ? { "data-nv-reveal": "" } : {})}>
      {children}
    </Tag>
  );
}

/** `NN / SECTION LABEL` — the recurring technical signature. */
function TechLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <p className="mb-9 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--nv-label)]">
      <span className="tabular-nums text-[color:var(--nv-text-3)]">{n}</span>
      <span aria-hidden className="h-px w-6 bg-[color:var(--nv-border-2)]" />
      {children}
    </p>
  );
}

const H2 =
  "font-black leading-[1.08] tracking-[-0.035em] text-[color:var(--nv-text)] [font-size:clamp(1.85rem,4vw,2.9rem)]";

function Band({
  bg,
  n,
  label,
  children,
  grid,
  glow,
}: {
  bg: string;
  n: string;
  label: string;
  children: ReactNode;
  grid?: boolean;
  glow?: "top" | "center";
}) {
  return (
    <section className={`relative w-full overflow-hidden ${grid ? "nv-grid" : ""}`} style={{ background: bg }}>
      {glow ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              glow === "center"
                ? "radial-gradient(circle at 50% 45%, rgba(59,130,246,0.10), transparent 55%)"
                : "radial-gradient(circle at 72% 12%, rgba(59,130,246,0.10), transparent 40%)",
          }}
        />
      ) : null}
      <div className="relative mx-auto w-full max-w-[1280px] px-5 py-[clamp(5rem,11vw,9rem)] sm:px-8 lg:px-12">
        <Reveal>
          <TechLabel n={n}>{label}</TechLabel>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* ═══ 01 · THE CHALLENGE ═════════════════════════════════════════════════ */

export function ChallengeSection({ statement, frictions }: { statement: string; frictions: Friction[] }) {
  return (
    <Band bg="var(--nv-bg-1)" n="01" label="The Challenge">
      <Reveal>
        <h2 className={`${H2} max-w-[46rem]`}>{statement}</h2>
      </Reveal>

      <div className="mt-14 border-t border-[color:var(--nv-border)]">
        {frictions.map((f, idx) => (
          <Reveal key={f.title} i={idx}>
            <div
              className="group grid grid-cols-[2rem_1fr_auto] items-start gap-x-4 border-b border-[color:var(--nv-border)] py-7 transition-colors duration-300 hover:bg-white/[0.02] md:grid-cols-[4rem_1fr_auto] md:gap-x-10 md:px-4"
              style={{ transitionProperty: "background-color, border-color" }}
            >
              <span className="font-mono text-[13px] leading-7 text-[#3d5578] transition-colors duration-300 group-hover:text-[color:var(--nv-accent-hi)]">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-bold uppercase tracking-[0.04em] text-[color:var(--nv-text-2)] transition-colors duration-300 group-hover:text-[color:var(--nv-text)] md:text-lg">
                  {f.title}
                </h3>
                <p className="max-w-xl text-[15px] leading-relaxed text-[color:var(--nv-text-3)] transition-colors duration-300 group-hover:text-[color:var(--nv-text-2)]">
                  {f.body}
                </p>
              </div>
              <ArrowRight
                size={17}
                className="mt-1 shrink-0 -translate-x-1 text-[color:var(--nv-accent-hi)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* ═══ 02 · THE APPROACH ══════════════════════════════════════════════════ */

export function ApproachSection({ statement, stages }: { statement: string; stages: Stage[] }) {
  return (
    <Band bg="var(--nv-bg-2)" n="02" label="The Infomist Approach">
      <Reveal>
        <h2 className={H2}>From data to action.</h2>
      </Reveal>
      <Reveal i={1}>
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[color:var(--nv-text-2)]">{statement}</p>
      </Reveal>

      <div className="relative mt-16">
        <div
          aria-hidden
          className="absolute left-0 right-0 top-[1.35rem] hidden h-px bg-[color:var(--nv-border-2)] lg:block"
        />
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, idx) => (
            <Reveal key={s.title} i={idx}>
              <div className="group relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-4 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle at 30% 0%, rgba(59,130,246,0.12), transparent 70%)" }}
                />
                <div className="relative flex flex-col gap-3 rounded-xl border border-[color:var(--nv-border)] bg-[color:var(--nv-bg-2)] p-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[color:var(--nv-border-hover)]">
                  <span className="font-mono text-[11px] text-[#3d5578] transition-colors duration-300 group-hover:text-[color:var(--nv-accent-hi)]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-[color:var(--nv-accent-hi)]">
                    {s.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[color:var(--nv-text-3)] transition-colors duration-300 group-hover:text-[color:var(--nv-text-2)]">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Band>
  );
}

/* ═══ 03 · THE TRANSFORMATION ════════════════════════════════════════════ */

function FlowColumn({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "in" | "core" | "out";
}) {
  const text =
    tone === "core" ? "text-[color:var(--nv-text)]" : tone === "out" ? "text-[color:var(--nv-accent-hi)]" : "text-[color:var(--nv-text-2)]";
  return (
    <div className="flex flex-1 flex-col gap-3.5">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--nv-label)]">{label}</p>
      <ul className="flex flex-col gap-2">
        {items.map((it) => (
          <li key={it} className={`text-[15px] leading-snug ${text}`}>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlowArrow() {
  return (
    <span aria-hidden className="mx-auto text-[color:var(--nv-text-3)] lg:mx-2">
      <span className="lg:hidden">↓</span>
      <span className="hidden lg:inline">→</span>
    </span>
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
    <Band bg="var(--nv-bg-0)" n="03" label="The Transformation" grid glow="center">
      <Reveal>
        <h2 className={`${H2} max-w-3xl`}>What changes when intelligence becomes part of the workflow.</h2>
      </Reveal>

      <div className="mt-16 flex flex-col items-stretch gap-6 lg:flex-row lg:items-center lg:gap-2">
        <Reveal className="lg:flex-1">
          <div className="rounded-xl border border-[color:var(--nv-border)] bg-white/[0.015] p-6">
            <FlowColumn label="Before" items={before} tone="in" />
          </div>
        </Reveal>

        <Reveal i={1}>
          <FlowArrow />
        </Reveal>

        <Reveal i={2} className="lg:flex-[1.05]">
          <div
            className="relative overflow-hidden rounded-xl border p-6 lg:-my-6 lg:py-10"
            style={{
              borderColor: "rgba(96,165,250,0.20)",
              background: "var(--nv-surface)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(circle at 50% 40%, rgba(59,130,246,0.16), transparent 68%)" }}
            />
            <div className="relative">
              <FlowColumn label="Infomist Intelligence Layer" items={layer} tone="core" />
            </div>
          </div>
        </Reveal>

        <Reveal i={3}>
          <FlowArrow />
        </Reveal>

        <Reveal i={4} className="lg:flex-1">
          <div className="rounded-xl border border-[color:var(--nv-border)] bg-white/[0.015] p-6">
            <FlowColumn label="After" items={after} tone="out" />
          </div>
        </Reveal>
      </div>
    </Band>
  );
}

/* ═══ 04 · HOW WE BUILD IT ═══════════════════════════════════════════════ */

export function BuildSection({ steps }: { steps: Stage[] }) {
  return (
    <Band bg="var(--nv-bg-3)" n="04" label="How We Build It">
      <Reveal>
        <h2 className={H2}>Engineered from the ground up.</h2>
      </Reveal>

      <div className="relative mt-16">
        <div aria-hidden className="absolute left-0 right-0 top-3 hidden h-px bg-[color:var(--nv-border-2)] md:block" />
        <ol className="grid gap-x-5 gap-y-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {steps.map((s, idx) => (
            <Reveal key={s.title} i={idx} as="li">
              <div className="group cursor-default">
                <div className="relative mb-4 flex items-center gap-3 md:block">
                  <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-[color:var(--nv-border-2)] bg-[color:var(--nv-bg-3)] font-mono text-[11px] text-[color:var(--nv-text-2)] transition-all duration-300 group-hover:border-[color:var(--nv-border-active)] group-hover:text-[color:var(--nv-accent-hi)] md:scale-100 md:group-hover:scale-[1.15]" />
                  <span
                    aria-hidden
                    className="absolute left-[7px] top-[7px] font-mono text-[11px] text-[color:var(--nv-text-2)] transition-colors duration-300 group-hover:text-[color:var(--nv-accent-hi)]"
                  >
                    {idx + 1}
                  </span>
                </div>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.12em] text-[color:var(--nv-text-2)] transition-colors duration-300 group-hover:text-[color:var(--nv-text)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--nv-text-3)] transition-colors duration-300 group-hover:text-[color:var(--nv-text-2)]">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Band>
  );
}

/* ═══ 05 · CAPABILITIES ══════════════════════════════════════════════════ */

export function CapabilitiesSection({ items }: { items: string[] }) {
  return (
    <Band bg="var(--nv-bg-0)" n="05" label="What We Engineer">
      <Reveal>
        <h2 className={H2}>Capabilities.</h2>
      </Reveal>

      <div className="mt-14 grid border-t border-[color:var(--nv-border)] sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, idx) => (
          <Reveal key={c} i={idx % 3}>
            <div className="group flex items-center justify-between gap-4 border-b border-[color:var(--nv-border)] py-4 transition-colors duration-300 hover:border-[color:var(--nv-border-hover)] sm:pr-6">
              <span className="text-[14px] font-semibold text-[color:var(--nv-text-2)] transition-colors duration-300 group-hover:text-[color:var(--nv-text)]">
                {c}
              </span>
              <ArrowRight
                size={14}
                className="-translate-x-1 text-[color:var(--nv-accent-hi)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* ═══ 06 · SYSTEM ARCHITECTURE ═══════════════════════════════════════════ */

function Connector({ vertical }: { vertical?: boolean }) {
  return (
    <div
      aria-hidden
      className={
        vertical
          ? "relative mx-auto my-1 h-6 w-px bg-[color:var(--nv-border-2)] md:hidden"
          : "relative mx-1 hidden h-px flex-1 self-center bg-[color:var(--nv-border-2)] md:block"
      }
    >
      <span
        className={`absolute h-[3px] w-[3px] rounded-full bg-[color:var(--nv-accent-hi)] ${vertical ? "nv-pulse-y left-1/2 -translate-x-1/2" : "nv-pulse-x top-1/2 -translate-y-1/2"}`}
      />
    </div>
  );
}

export function ArchitectureSection({ nodes }: { nodes: string[] }) {
  return (
    <Band bg="var(--nv-bg-2)" n="06" label="System Architecture" grid glow="top">
      <Reveal>
        <h2 className={H2}>How the system runs.</h2>
      </Reveal>

      <Reveal>
        <div className="group/arch mt-16 flex flex-col md:flex-row md:flex-wrap md:items-stretch">
          {nodes.map((node, idx) => (
            <div key={node} className="flex flex-col md:flex-row md:items-stretch">
              <div className="nv-arch-node flex min-w-[150px] max-w-[220px] flex-col gap-1.5 rounded-lg border border-[color:var(--nv-border)] bg-white/[0.02] px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--nv-border-hover)] hover:bg-[color:var(--nv-surface)] group-hover/arch:[&:not(:hover)]:opacity-45">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#3d5578]">
                  {String(idx + 1).padStart(2, "0")}
                  {idx === 0 ? " / input" : idx === nodes.length - 1 ? " / output" : " / stage"}
                </span>
                <span className="text-[13px] font-semibold text-[color:var(--nv-text-2)]">{node}</span>
              </div>
              {idx < nodes.length - 1 ? (
                <>
                  <Connector />
                  <Connector vertical />
                </>
              ) : null}
            </div>
          ))}
        </div>
      </Reveal>
    </Band>
  );
}

/* ═══ 07 · USE CASES ═════════════════════════════════════════════════════ */

export function UseCasesSection({ items }: { items: UseCase[] }) {
  return (
    <Band bg="var(--nv-bg-1)" n="07" label="Where It Creates Value">
      <Reveal>
        <h2 className={H2}>Where it creates value.</h2>
      </Reveal>

      <div className="mt-14 border-t border-[color:var(--nv-border)]">
        {items.map((u, idx) => (
          <Reveal key={u.title} i={idx}>
            <Link
              href="/talk-to-strategist"
              className="group grid grid-cols-[2rem_1fr_auto] items-start gap-x-4 border-b border-[color:var(--nv-border)] py-7 transition-colors duration-300 hover:bg-white/[0.02] md:grid-cols-[4rem_16rem_1fr_auto] md:gap-x-8 md:px-4"
            >
              <span className="font-mono text-[13px] leading-7 text-[#3d5578] transition-colors duration-300 group-hover:text-[color:var(--nv-accent-hi)]">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-bold text-[color:var(--nv-text-2)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[color:var(--nv-text)] md:text-lg">
                {u.title}
              </h3>
              <p className="col-start-2 max-w-xl text-[15px] leading-relaxed text-[color:var(--nv-text-3)] transition-colors duration-300 group-hover:text-[color:var(--nv-text-2)] md:col-start-3">
                {u.body}
              </p>
              <ArrowUpRight
                size={17}
                className="mt-1 shrink-0 text-[color:var(--nv-accent-hi)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </Link>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* ═══ 08 · BUSINESS IMPACT ═══════════════════════════════════════════════ */

export function ImpactSection({ items }: { items: Stage[] }) {
  return (
    <Band bg="var(--nv-bg-0)" n="08" label="Business Impact">
      <Reveal>
        <h2 className={H2}>Designed for measurable impact.</h2>
      </Reveal>

      <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2">
        {items.map((s, idx) => (
          <Reveal key={s.title} i={idx}>
            <div className={idx % 2 === 1 ? "sm:mt-16 sm:pl-8" : "sm:pr-8"}>
              <h3
                className="font-black uppercase leading-[1.05] tracking-[-0.02em] text-[color:var(--nv-text)] [font-size:clamp(1.4rem,3vw,2rem)]"
              >
                {s.title}
              </h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[color:var(--nv-text-3)]">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* ═══ 09 · WHY INFOMIST ══════════════════════════════════════════════════ */

export function WhySection({ items }: { items: Stage[] }) {
  return (
    <Band bg="var(--nv-bg-2)" n="09" label="Why Infomist">
      <div className="group/why grid gap-x-10 gap-y-12 md:grid-cols-12">
        {items.map((s, idx) => (
          <Reveal
            key={s.title}
            i={idx}
            className={
              idx === 0
                ? "md:col-span-5"
                : idx === 1
                  ? "md:col-span-4 md:col-start-7 md:mt-10"
                  : "md:col-span-4 md:col-start-2 md:mt-4"
            }
          >
            <div className="group/item transition-opacity duration-300 group-hover/why:[&:not(:hover)]:opacity-45">
              <h3 className="inline-flex flex-col text-lg font-black text-[color:var(--nv-text-2)] transition-colors duration-300 group-hover/item:text-[color:var(--nv-text)]">
                {s.title}
                <span
                  aria-hidden
                  className="mt-1.5 h-px w-0 bg-[color:var(--nv-accent-hi)] transition-all duration-300 group-hover/item:w-10"
                />
              </h3>
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-[color:var(--nv-text-3)] transition-transform duration-300 group-hover/item:-translate-y-0.5">
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* ═══ FAQ (dark) ═════════════════════════════════════════════════════════ */

export function NarrativeFaq({ faqs, title }: { faqs: Faq[]; title: string }) {
  if (!faqs.length) return null;
  return (
    <Band bg="var(--nv-bg-1)" n="10" label="Frequently Asked Questions">
      <Reveal>
        <h2 className={`${H2} max-w-2xl [font-size:clamp(1.6rem,3.4vw,2.3rem)]`}>{title}</h2>
      </Reveal>
      <div className="mt-12 border-t border-[color:var(--nv-border)]">
        {faqs.map((f, idx) => (
          <Reveal key={f.q} i={Math.min(idx, 4)}>
            <details className="group border-b border-[color:var(--nv-border)]">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-[15px] font-semibold text-[color:var(--nv-text-2)] transition-colors duration-200 hover:text-[color:var(--nv-text)] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-[color:var(--nv-accent-hi)] transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-[color:var(--nv-text-3)]">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* ═══ 10 · CTA ═══════════════════════════════════════════════════════════ */

export function NarrativeCta({ categorySlug }: { categorySlug: string }) {
  return (
    <section className="nv-grid relative w-full overflow-hidden" style={{ background: "var(--nv-cta)" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 118%, rgba(59,130,246,0.16), transparent 46%)" }}
      />
      <div className="relative mx-auto w-full max-w-[1280px] px-5 py-[clamp(6rem,12vw,10rem)] sm:px-8 lg:px-12">
        <Reveal>
          <TechLabel n="11">Start a Project</TechLabel>
        </Reveal>
        <Reveal>
          <h2 className={`${H2} max-w-2xl`}>Have a system worth engineering?</h2>
        </Reveal>
        <Reveal i={1}>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-[color:var(--nv-text-2)]">
            Tell us what you're trying to solve. We'll help map the AI, software and automation
            required to make it real.
          </p>
        </Reveal>
        <Reveal i={2}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/talk-to-strategist"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-[11px] bg-[color:var(--nv-accent)] px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--nv-accent-hi)]"
            >
              Talk to an Engineer
              <ArrowRight size={16} strokeWidth={2.6} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href={`/solutions/${categorySlug}`}
              className="inline-flex h-12 items-center justify-center rounded-[11px] border border-[color:var(--nv-border-2)] px-6 text-sm font-semibold text-[color:var(--nv-text)] transition-colors duration-300 hover:border-[color:var(--nv-border-hover)] hover:bg-white/[0.04]"
            >
              Explore Solutions
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
