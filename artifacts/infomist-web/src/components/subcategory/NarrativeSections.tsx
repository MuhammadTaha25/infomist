import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Friction, Stage, UseCase } from "@/data/subcategoryNarrative";
import type { Faq } from "@/data/solutionsData";

/* ═══ tone system — matches the homepage's white / light-blue / navy rhythm ══ */

type Tone = "light" | "tint" | "navy";

const NAVY_BG = "linear-gradient(160deg, #0B1220 0%, #0F172A 46%, #101B2E 100%)";

const TONE: Record<
  Tone,
  {
    bg: string;
    label: string;
    num: string;
    numHover: string;
    rule: string;
    ruleHover: string;
    title: string;
    titleHover: string;
    body: string;
    bodyHover: string;
    hoverBg: string;
    accent: string;
    nodeBg: string;
    nodeBorder: string;
  }
> = {
  light: {
    bg: "#FFFFFF",
    label: "#0EA5E9",
    num: "#94A3B8",
    numHover: "#0284C7",
    rule: "#E8ECF2",
    ruleHover: "rgba(14,165,233,0.4)",
    title: "#0F172A",
    titleHover: "#0284C7",
    body: "#475569",
    bodyHover: "#334155",
    hoverBg: "rgba(14,165,233,0.04)",
    accent: "#0EA5E9",
    nodeBg: "#FFFFFF",
    nodeBorder: "#E2E8F0",
  },
  tint: {
    bg: "#F1F6FD",
    label: "#0284C7",
    num: "#94A3B8",
    numHover: "#0284C7",
    rule: "#DCE7F4",
    ruleHover: "rgba(14,165,233,0.45)",
    title: "#0F172A",
    titleHover: "#0284C7",
    body: "#475569",
    bodyHover: "#334155",
    hoverBg: "#FFFFFF",
    accent: "#0EA5E9",
    nodeBg: "#FFFFFF",
    nodeBorder: "#DCE7F4",
  },
  navy: {
    bg: NAVY_BG,
    label: "#7FA7D9",
    num: "#3d5578",
    numHover: "#60A5FA",
    rule: "rgba(255,255,255,0.08)",
    ruleHover: "rgba(96,165,250,0.4)",
    title: "#F4F8FC",
    titleHover: "#FFFFFF",
    body: "#94A3B8",
    bodyHover: "#CBD5E1",
    hoverBg: "rgba(255,255,255,0.03)",
    accent: "#60A5FA",
    nodeBg: "rgba(255,255,255,0.035)",
    nodeBorder: "rgba(255,255,255,0.1)",
  },
};

/* ═══ primitives ═════════════════════════════════════════════════════════ */

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Reveal({
  children,
  i = 0,
  as: Tag = "div",
  className,
  style,
}: {
  children: ReactNode;
  i?: number;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [armed] = useState(
    () => !prefersReducedMotion() && typeof window !== "undefined" && (window.innerHeight || 0) > 0,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed) return;
    el.style.transitionDelay = `${Math.min(i, 8) * 70}ms`;
    const show = () => el.setAttribute("data-nv-in", "");
    const vh = window.innerHeight || 0;
    const top = el.getBoundingClientRect().top;
    if (vh === 0 || top < vh * 1.25 || typeof IntersectionObserver === "undefined") {
      show();
      return;
    }
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
    <Tag ref={ref} className={className} style={style} {...(armed ? { "data-nv-reveal": "" } : {})}>
      {children}
    </Tag>
  );
}

function TechLabel({ n, children, t }: { n: string; children: ReactNode; t: (typeof TONE)[Tone] }) {
  return (
    <p
      className="mb-9 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.16em]"
      style={{ color: t.label }}
    >
      <span className="tabular-nums" style={{ color: t.num }}>
        {n}
      </span>
      <span aria-hidden className="h-px w-6" style={{ background: t.rule }} />
      {children}
    </p>
  );
}

function Band({
  tone,
  n,
  label,
  title,
  intro,
  children,
  glow,
}: {
  tone: Tone;
  n: string;
  label: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  glow?: boolean;
}) {
  const t = TONE[tone];
  return (
    <section className="relative w-full overflow-hidden" style={{ background: t.bg }}>
      {tone === "navy" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 25%, transparent 82%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 25%, transparent 82%)",
          }}
        />
      ) : null}
      {glow ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 60% 20%, rgba(14,165,233,0.10), transparent 45%)" }}
        />
      ) : null}
      <div className="relative mx-auto w-full max-w-[1280px] px-5 py-[clamp(4.5rem,10vw,8rem)] sm:px-8 lg:px-12">
        <Reveal>
          <TechLabel n={n} t={t}>
            {label}
          </TechLabel>
        </Reveal>
        {title ? (
          <Reveal>
            <h2
              className="max-w-[46rem] font-black leading-[1.08] tracking-[-0.035em]"
              style={{ color: t.title, fontSize: "clamp(1.85rem,4vw,2.9rem)" }}
            >
              {title}
            </h2>
          </Reveal>
        ) : null}
        {intro ? (
          <Reveal i={1}>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed" style={{ color: t.body }}>
              {intro}
            </p>
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}

/** Editorial NN — Title — Description row with a full hover state. */
function EditorialRow({
  n,
  title,
  body,
  t,
  href,
  i,
}: {
  n: string;
  title: string;
  body: string;
  t: (typeof TONE)[Tone];
  href?: string;
  i: number;
}) {
  const Cmp: ElementType = href ? Link : "div";
  return (
    <Reveal i={i}>
      <Cmp
        {...(href ? { href } : {})}
        className="group grid grid-cols-[2rem_1fr_auto] items-start gap-x-4 border-b py-7 transition-[background-color,border-color] duration-300 md:grid-cols-[3.5rem_1fr_auto] md:gap-x-8 md:px-3"
        style={{ borderColor: t.rule, ["--rn" as string]: t.num, ["--rt" as string]: t.title }}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
          e.currentTarget.style.background = t.hoverBg;
          e.currentTarget.style.borderColor = t.ruleHover;
          e.currentTarget.style.setProperty("--rn", t.numHover);
          e.currentTarget.style.setProperty("--rt", t.titleHover);
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
          e.currentTarget.style.background = "";
          e.currentTarget.style.borderColor = t.rule;
          e.currentTarget.style.setProperty("--rn", t.num);
          e.currentTarget.style.setProperty("--rt", t.title);
        }}
      >
        <span className="font-mono text-[13px] leading-7 transition-colors duration-300" style={{ color: "var(--rn)" }}>
          {n}
        </span>
        <div className="flex flex-col gap-1.5">
          <h3
            className="text-base font-bold uppercase tracking-[0.03em] transition-colors duration-300 md:text-lg"
            style={{ color: "var(--rt)" }}
          >
            {title}
          </h3>
          <p className="max-w-xl text-[15px] leading-relaxed" style={{ color: t.body }}>
            {body}
          </p>
        </div>
        <ArrowRight
          size={17}
          className="mt-1 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
          style={{ color: t.accent }}
        />
      </Cmp>
    </Reveal>
  );
}

/* ═══ 01 · THE CHALLENGE (white) ═════════════════════════════════════════ */

export function ChallengeSection({ statement, frictions }: { statement: string; frictions: Friction[] }) {
  const t = TONE.light;
  return (
    <Band tone="light" n="01" label="The Challenge" title={statement}>
      <div className="mt-14 border-t" style={{ borderColor: t.rule }}>
        {frictions.map((f, idx) => (
          <EditorialRow key={f.title} n={String(idx + 1).padStart(2, "0")} title={f.title} body={f.body} t={t} i={idx} />
        ))}
      </div>
    </Band>
  );
}

/* ═══ 02 · THE APPROACH (light blue) ═════════════════════════════════════ */

export function ApproachSection({
  title = "From data to action.",
  statement,
  stages,
}: {
  title?: string;
  statement: string;
  stages: Stage[];
}) {
  const t = TONE.tint;
  return (
    <Band tone="tint" n="02" label="The Infomist Approach" title={title} intro={statement}>
      <div className="relative mt-16">
        <div aria-hidden className="absolute left-0 right-0 top-6 hidden h-px lg:block" style={{ background: t.nodeBorder }} />
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, idx) => (
            <Reveal key={s.title} i={idx}>
              <div
                className="group relative flex flex-col gap-3 rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: t.nodeBg, borderColor: t.nodeBorder }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.4)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = t.nodeBorder)}
              >
                <span className="font-mono text-[11px]" style={{ color: t.num }}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: t.accent }}>
                  {s.title}
                </h3>
                <p className="text-[14px] leading-relaxed" style={{ color: t.body }}>
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Band>
  );
}

/* ═══ 03 · THE TRANSFORMATION (navy) ═════════════════════════════════════ */

function FlowColumn({ label, items, tone }: { label: string; items: string[]; tone: "in" | "core" | "out" }) {
  const color = tone === "core" ? "#F4F8FC" : tone === "out" ? "#60A5FA" : "#94A3B8";
  return (
    <div className="flex flex-1 flex-col gap-3.5">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7FA7D9]">{label}</p>
      <ul className="flex flex-col gap-2">
        {items.map((it) => (
          <li key={it} className="text-[15px] leading-snug" style={{ color }}>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlowArrow() {
  return (
    <span aria-hidden className="mx-auto text-[#3d5578] lg:mx-2">
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
    <Band
      tone="navy"
      n="03"
      label="The Transformation"
      title="What changes when intelligence becomes part of the workflow."
      glow
    >
      <div className="mt-16 flex flex-col items-stretch gap-6 lg:flex-row lg:items-center lg:gap-2">
        <Reveal className="lg:flex-1">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.015] p-6">
            <FlowColumn label="Before" items={before} tone="in" />
          </div>
        </Reveal>
        <Reveal i={1}>
          <FlowArrow />
        </Reveal>
        <Reveal i={2} className="lg:flex-[1.05]">
          <div
            className="relative overflow-hidden rounded-xl border p-6 lg:-my-6 lg:py-10"
            style={{ borderColor: "rgba(96,165,250,0.2)", background: "#0B1929" }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(circle at 50% 40%, rgba(14,165,233,0.16), transparent 68%)" }}
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
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.015] p-6">
            <FlowColumn label="After" items={after} tone="out" />
          </div>
        </Reveal>
      </div>
    </Band>
  );
}

/* ═══ 04 · HOW WE BUILD IT (white) ══════════════════════════════════════ */

export function BuildSection({ steps }: { steps: Stage[] }) {
  const t = TONE.light;
  return (
    <Band tone="light" n="04" label="How We Build It" title="Engineered from the ground up.">
      <div className="relative mt-16">
        <div aria-hidden className="absolute left-0 right-0 top-3 hidden h-px md:block" style={{ background: t.nodeBorder }} />
        <ol className="grid gap-x-5 gap-y-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {steps.map((s, idx) => (
            <Reveal key={s.title} i={idx} as="li">
              <div className="group cursor-default">
                <span
                  className="relative z-10 mb-4 flex h-7 w-7 items-center justify-center rounded-full border bg-white font-mono text-[11px] transition-all duration-300 group-hover:scale-110"
                  style={{ borderColor: t.nodeBorder, color: t.body }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = t.accent;
                    e.currentTarget.style.color = t.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = t.nodeBorder;
                    e.currentTarget.style.color = t.body;
                  }}
                >
                  {idx + 1}
                </span>
                <h3
                  className="text-[13px] font-bold uppercase tracking-[0.12em] transition-colors duration-300"
                  style={{ color: t.title }}
                >
                  {s.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed transition-colors duration-300" style={{ color: t.body }}>
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

/* ═══ 05 · CAPABILITIES (light blue) ════════════════════════════════════ */

export function CapabilitiesSection({ items }: { items: string[] }) {
  const t = TONE.tint;
  return (
    <Band tone="tint" n="05" label="What We Engineer" title="Capabilities.">
      <div className="mt-14 grid border-t sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: t.rule }}>
        {items.map((c, idx) => (
          <Reveal key={c} i={idx % 3}>
            <div
              className="group flex items-center justify-between gap-4 border-b border-l-2 border-l-transparent py-4 pl-3 pr-4 transition-all duration-300"
              style={{ borderBottomColor: t.rule }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FFFFFF";
                e.currentTarget.style.borderLeftColor = t.accent;
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(7,20,38,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "";
                e.currentTarget.style.borderLeftColor = "transparent";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <span className="text-[14px] font-semibold transition-colors duration-300" style={{ color: t.title }}>
                {c}
              </span>
              <ArrowRight
                size={14}
                className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                style={{ color: t.accent }}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* ═══ 06 · SYSTEM ARCHITECTURE (navy) ═══════════════════════════════════ */

function Connector({ vertical }: { vertical?: boolean }) {
  return (
    <div
      aria-hidden
      className={
        vertical
          ? "relative mx-auto my-1 h-6 w-px bg-white/[0.12] md:hidden"
          : "relative mx-1 hidden h-px flex-1 self-center bg-white/[0.12] md:block"
      }
    >
      <span
        className={`absolute h-[3px] w-[3px] rounded-full bg-[#60A5FA] ${vertical ? "nv-pulse-y left-1/2 -translate-x-1/2" : "nv-pulse-x top-1/2 -translate-y-1/2"}`}
      />
    </div>
  );
}

export function ArchitectureSection({ nodes }: { nodes: string[] }) {
  return (
    <Band tone="navy" n="06" label="System Architecture" title="How the system runs." glow>
      <Reveal>
        <div className="group/arch mt-16 flex flex-col md:flex-row md:flex-wrap md:items-stretch">
          {nodes.map((node, idx) => (
            <div key={node} className="flex flex-col md:flex-row md:items-stretch">
              <div className="flex min-w-[150px] max-w-[220px] flex-col gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.03] px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(96,165,250,0.45)] hover:bg-white/[0.06] group-hover/arch:[&:not(:hover)]:opacity-45">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#3d5578]">
                  {String(idx + 1).padStart(2, "0")}
                  {idx === 0 ? " / input" : idx === nodes.length - 1 ? " / output" : " / stage"}
                </span>
                <span className="text-[13px] font-semibold text-[#CBD5E1]">{node}</span>
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

/* ═══ 07 · USE CASES (white) ════════════════════════════════════════════ */

export function UseCasesSection({ items }: { items: UseCase[] }) {
  const t = TONE.light;
  return (
    <Band tone="light" n="07" label="Where It Creates Value" title="Where it creates value.">
      <div className="mt-14 border-t" style={{ borderColor: t.rule }}>
        {items.map((u, idx) => (
          <Reveal key={u.title} i={idx}>
            <Link
              href="/talk-to-strategist"
              className="group grid grid-cols-[2rem_1fr_auto] items-start gap-x-4 border-b py-7 transition-colors duration-300 md:grid-cols-[3.5rem_15rem_1fr_auto] md:gap-x-8 md:px-3"
              style={{ borderColor: t.rule }}
              onMouseEnter={(e) => (e.currentTarget.style.background = t.hoverBg)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
            >
              <span className="font-mono text-[13px] leading-7" style={{ color: t.num }}>
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3
                className="text-base font-bold transition-all duration-300 group-hover:translate-x-1 md:text-lg"
                style={{ color: t.title }}
              >
                {u.title}
              </h3>
              <p className="col-start-2 max-w-xl text-[15px] leading-relaxed md:col-start-3" style={{ color: t.body }}>
                {u.body}
              </p>
              <ArrowUpRight
                size={17}
                className="mt-1 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ color: t.accent }}
              />
            </Link>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* ═══ 08 · BUSINESS IMPACT (off-white) ══════════════════════════════════ */

export function ImpactSection({ items }: { items: Stage[] }) {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#F9FAFB" }}>
      <div className="relative mx-auto w-full max-w-[1280px] px-5 py-[clamp(4.5rem,10vw,8rem)] sm:px-8 lg:px-12">
        <Reveal>
          <TechLabel n="08" t={TONE.light}>
            Business Impact
          </TechLabel>
        </Reveal>
        <Reveal>
          <h2
            className="max-w-[46rem] font-black leading-[1.08] tracking-[-0.035em] text-[#0F172A]"
            style={{ fontSize: "clamp(1.85rem,4vw,2.9rem)" }}
          >
            Designed for measurable impact.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2">
          {items.map((s, idx) => (
            <Reveal key={s.title} i={idx}>
              <div className={idx % 2 === 1 ? "sm:mt-16 sm:pl-8" : "sm:pr-8"}>
                <h3
                  className="font-black uppercase leading-[1.05] tracking-[-0.02em] text-[#0F172A]"
                  style={{ fontSize: "clamp(1.35rem,3vw,1.95rem)" }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#64748B]">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ 09 · WHY INFOMIST (navy) ══════════════════════════════════════════ */

export function WhySection({ items }: { items: Stage[] }) {
  return (
    <Band tone="navy" n="09" label="Why Infomist">
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
              <h3 className="flex flex-col text-lg font-black text-[#F4F8FC]">
                {s.title}
                <span
                  aria-hidden
                  className="mt-1.5 h-px w-0 bg-[#60A5FA] transition-all duration-300 group-hover/item:w-10"
                />
              </h3>
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-[#94A3B8] transition-transform duration-300 group-hover/item:-translate-y-0.5">
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* ═══ 10 · FAQ (white) ══════════════════════════════════════════════════ */

export function NarrativeFaq({ faqs, title }: { faqs: Faq[]; title: string }) {
  if (!faqs.length) return null;
  const t = TONE.light;
  return (
    <Band tone="light" n="10" label="Frequently Asked Questions" title={title}>
      <div className="mt-12 border-t" style={{ borderColor: t.rule }}>
        {faqs.map((f, idx) => (
          <Reveal key={f.q} i={Math.min(idx, 4)}>
            <details className="group border-b" style={{ borderColor: t.rule }}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-[15px] font-semibold text-[#0F172A] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-[#0EA5E9] transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-[#475569]">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}
