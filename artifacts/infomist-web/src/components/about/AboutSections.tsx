import { useState, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/subcategory/NarrativeSections";

/* ── shared bits ──────────────────────────────────────────────────────── */

const NAVY = "linear-gradient(160deg, #0B1220 0%, #0F172A 46%, #101B2E 100%)";

function Label({ n, children, dark }: { n: string; children: ReactNode; dark?: boolean }) {
  return (
    <p
      className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.18em]"
      style={{ color: dark ? "#7FA7D9" : "#0284C7" }}
    >
      <span className="tabular-nums" style={{ color: dark ? "#3d5578" : "#94A3B8" }}>
        {n}
      </span>
      <span aria-hidden className="h-px w-6" style={{ background: dark ? "rgba(255,255,255,0.12)" : "#DCE3EC" }} />
      {children}
    </p>
  );
}

/* Major editorial statement — deliberately oversized, always left-aligned. */
const H2_LIGHT =
  "font-black leading-[1.04] tracking-[-0.04em] text-[#0F172A] [font-size:clamp(2.15rem,5.4vw,4rem)]";
const H2_DARK =
  "font-black leading-[1.04] tracking-[-0.04em] text-[#F4F8FC] [font-size:clamp(2.15rem,5.4vw,4rem)]";

function Shell({
  id,
  bg,
  n,
  label,
  note,
  dark,
  children,
}: {
  id?: string;
  bg: string;
  n: string;
  label: string;
  /** small right-aligned engineering annotation, e.g. "SYSTEM / 01" */
  note?: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative w-full overflow-hidden" style={{ background: bg }}>
      {dark ? (
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
      <div className="relative mx-auto w-full max-w-[1320px] px-5 py-[clamp(5rem,11vw,9rem)] sm:px-8 lg:px-14">
        <Reveal>
          <div className="mb-10 flex items-baseline justify-between gap-4 border-b pb-4" style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "#EDF1F6" }}>
            <Label n={n} dark={dark}>
              {label}
            </Label>
            {note ? (
              <span
                className="hidden font-mono text-[10px] uppercase tracking-[0.2em] sm:block"
                style={{ color: dark ? "#3d5578" : "#AEB9C7" }}
              >
                {note}
              </span>
            ) : null}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* ── 02 · OUR STORY ───────────────────────────────────────────────────── */

export function StorySection() {
  return (
    <Shell bg="#FFFFFF" n="02" label="Our Story" note="Origin / 02">
      <Reveal>
        <h2 className={`${H2_LIGHT} max-w-[18ch]`}>
          From software services to <span className="text-[#0EA5E9]">intelligent systems.</span>
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-x-20 gap-y-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="text-[19px] font-medium leading-relaxed text-[#1E293B]">
            Infomist began in 2001 as a one-room web studio — a single computer, a handful of
            international clients and an obsession with getting the details right.
          </p>
        </Reveal>
        <Reveal i={1}>
          <div className="flex flex-col gap-5 text-[16px] leading-[1.75] text-[#475569]">
            <p>
              That focus evolved — from building digital products, into software engineering, and
              then into the automation, data and integration work that connects a business's systems
              together.
            </p>
            <p>
              In 2022 the practice expanded into AI and systems integration, delivering production
              software for enterprise clients from Islamabad and Dublin.
            </p>
            <p>
              Today Infomist brings those disciplines together to engineer intelligent systems for
              real-world business problems — and is moving toward AI-native engineering, where
              intelligence is considered from the start of the architecture rather than added later
              as a standalone feature.
            </p>
          </div>
        </Reveal>
      </div>
    </Shell>
  );
}

/* ── 03 · OUR EVOLUTION (interactive timeline) ────────────────────────── */

const EVOLUTION = [
  { k: "Software", body: "Building digital products and software experiences." },
  { k: "Engineering", body: "Scalable applications, integrations and software systems." },
  { k: "Automation", body: "Connecting workflows, APIs and business systems." },
  { k: "Intelligence", body: "Integrating AI, machine learning, agents and data." },
  { k: "AI-native", body: "Engineering systems where intelligence is part of the architecture from day one." },
];

export function EvolutionSection() {
  const [hovered, setHovered] = useState<number | null>(EVOLUTION.length - 1);
  return (
    <Shell bg="#F1F6FD" n="03" label="Our Evolution" note="Timeline / 03">
      <Reveal>
        <h2 className={`${H2_LIGHT} max-w-[16ch]`}>How the practice has evolved.</h2>
      </Reveal>

      <div className="relative mt-16" onMouseLeave={() => setHovered(EVOLUTION.length - 1)}>
        <div
          aria-hidden
          className="absolute left-0 right-0 top-[1.1rem] hidden h-px transition-colors duration-300 md:block"
          style={{ background: "#CBD9EC" }}
        />
        <ol className="grid gap-x-5 gap-y-10 md:grid-cols-5">
          {EVOLUTION.map((s, idx) => {
            const near = hovered !== null && Math.abs(hovered - idx) <= 1;
            const isHover = hovered === idx;
            return (
              <Reveal key={s.k} i={idx} as="li">
                <div
                  className="group cursor-default transition-opacity duration-300"
                  style={{ opacity: hovered !== null && !near ? 0.5 : 1 }}
                  onMouseEnter={() => setHovered(idx)}
                >
                  <span
                    className="relative z-10 mb-4 flex h-[1.6rem] w-[1.6rem] items-center justify-center rounded-full border bg-white font-mono text-[11px] transition-all duration-300"
                    style={{
                      borderColor: near ? "#0EA5E9" : "#CBD9EC",
                      color: near ? "#0284C7" : "#64748B",
                      transform: isHover ? "scale(1.18)" : "scale(1)",
                      boxShadow: isHover ? "0 0 0 4px rgba(14,165,233,0.12)" : "none",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="text-[13px] font-bold uppercase tracking-[0.12em] transition-transform duration-300"
                    style={{ color: "#0F172A", transform: isHover ? "translateX(3px)" : "none" }}
                  >
                    {s.k}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-relaxed transition-colors duration-300"
                    style={{ color: isHover ? "#475569" : "#64748B" }}
                  >
                    {s.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Shell>
  );
}

/* ── 04 · THE SHIFT (light, editorial split) ─────────────────────────── */

export function TheShiftSection() {
  return (
    <Shell bg="#FFFFFF" n="04" label="The Shift" note="Architecture / 04">
      <Reveal>
        <h2 className={`${H2_LIGHT} max-w-[20ch]`}>
          From building digital experiences to engineering intelligent systems.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-x-4 gap-y-10 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <Reveal>
          <div className="rounded-2xl border border-[#E8ECF2] p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#94A3B8]">Traditional software</p>
            <ul className="mt-5 flex flex-col gap-3 text-[16px] text-[#64748B]">
              <li>Software</li>
              <li>Features</li>
              <li>Integrations</li>
            </ul>
            <p className="mt-6 text-[13px] leading-relaxed text-[#94A3B8]">
              AI is added at the end as one more feature on top of a finished system.
            </p>
          </div>
        </Reveal>

        <Reveal i={1}>
          <div aria-hidden className="flex items-center justify-center py-2 md:flex-col">
            <span className="h-px w-10 bg-[#CBD9EC] md:h-10 md:w-px" />
            <span className="mx-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0EA5E9] md:my-2 md:mx-0 md:[writing-mode:vertical-rl]">
              rethink
            </span>
            <span className="h-px w-10 bg-[#CBD9EC] md:h-10 md:w-px" />
          </div>
        </Reveal>

        <Reveal i={2}>
          <div
            className="rounded-2xl border p-7"
            style={{ borderColor: "rgba(14,165,233,0.28)", background: "linear-gradient(160deg,rgba(14,165,233,0.06),rgba(14,165,233,0.01))" }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0284C7]">AI-native systems</p>
            <ul className="mt-5 flex flex-col gap-3 text-[16px] font-medium text-[#0F172A]">
              <li>AI</li>
              <li>Software</li>
              <li>Data</li>
              <li>Automation</li>
              <li>Infrastructure</li>
            </ul>
            <p className="mt-6 text-[13px] leading-relaxed text-[#475569]">
              Intelligence is a design input from the architecture stage — the system is built
              around it.
            </p>
          </div>
        </Reveal>
      </div>
    </Shell>
  );
}

/* ── 05 · VISION → MISSION (connected, navy) ──────────────────────────── */

function DirectionRail() {
  return (
    <Reveal>
      <div className="flex flex-col items-start gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#4b6591]">
        <span className="text-[#93C5FD]">Vision</span>
        <span aria-hidden className="ml-[3px] h-10 w-px bg-gradient-to-b from-[#60A5FA]/60 to-white/10" />
        <span className="text-[#93C5FD]">Mission</span>
        <span aria-hidden className="ml-[3px] h-10 w-px bg-gradient-to-b from-[#60A5FA]/60 to-white/10" />
        <span>Engineering</span>
      </div>
    </Reveal>
  );
}

function DirectionBlock({
  kicker,
  heading,
  body,
  i,
}: {
  kicker: string;
  heading: string;
  body: string;
  i: number;
}) {
  return (
    <Reveal i={i}>
      <div className="group relative pl-6">
        <span
          aria-hidden
          className="absolute left-0 top-1.5 h-2 w-2 rounded-full border border-[#60A5FA] bg-[#0B1220] transition-all duration-300 group-hover:bg-[#60A5FA]"
        />
        <span
          aria-hidden
          className="absolute left-[3.5px] top-4 h-[calc(100%-1rem)] w-px bg-white/10"
        />
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7FA7D9]">{kicker}</p>
        <span aria-hidden className="mt-3 block h-px w-10 bg-[#60A5FA] transition-all duration-300 group-hover:w-20" />
        <h2 className={`${H2_DARK} mt-5 max-w-[16ch] transition-transform duration-300 group-hover:translate-x-1`}>
          {heading}
        </h2>
        <p className="mt-5 max-w-lg text-[16px] leading-[1.75] text-[#94A3B8]">{body}</p>
      </div>
    </Reveal>
  );
}

export function VisionMissionSection() {
  return (
    <Shell id="vision" bg={NAVY} n="05" label="Our Direction" note="Direction / 05" dark>
      <div className="grid gap-x-16 gap-y-16 lg:grid-cols-[0.55fr_1.45fr]">
        <DirectionRail />
        <div className="flex flex-col gap-16">
          <DirectionBlock
            i={0}
            kicker="Vision"
            heading="Building the intelligent software systems of the future."
            body="To shape a future where software is not simply digital infrastructure, but intelligent, adaptive and autonomous systems that continuously create business value."
          />
          <DirectionBlock
            i={1}
            kicker="Mission"
            heading="Engineering intelligent systems that turn complexity into action."
            body="Infomist engineers AI-native software systems that combine artificial intelligence, software engineering, automation, data and infrastructure into production-ready solutions. We don't simply add AI to existing software — we rethink how software is designed, built and operated when intelligence is part of the architecture from the beginning."
          />
        </div>
      </div>
    </Shell>
  );
}

/* ── 05 · HOW WE THINK ────────────────────────────────────────────────── */

const PRINCIPLES = [
  { t: "Think in systems", b: "Intelligence, software, automation, data and infrastructure are designed as one thing." },
  { t: "Engineer for production", b: "We build systems that run inside real workflows, not prototypes that stall at the demo." },
  { t: "Design with intelligence", b: "AI is a design input from the architecture stage, not a feature added at the end." },
  { t: "Build for real impact", b: "Every system is engineered around a measurable business outcome." },
];

export function PhilosophySection() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <Shell bg="#FFFFFF" n="06" label="How We Think" note="Principles / 06">
      <Reveal>
        <h2 className={`${H2_LIGHT} max-w-[13ch] [font-size:clamp(2.6rem,7vw,5rem)]`}>
          Built as systems. <span className="text-[#94A3B8]">Not services.</span>
        </h2>
      </Reveal>
      <Reveal i={1}>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-[#475569]">
          We don't approach AI as an isolated feature. We engineer complete systems where
          intelligence, software, automation, data and infrastructure work together to solve real
          business problems.
        </p>
      </Reveal>

      <div className="mt-14 grid border-t border-[#E8ECF2] sm:grid-cols-2" onMouseLeave={() => setHovered(null)}>
        {PRINCIPLES.map((p, idx) => (
          <Reveal key={p.t} i={idx % 2}>
            <div
              className="group relative flex flex-col gap-2 border-b border-[#E8ECF2] py-8 pl-5 transition-[background-color,opacity] duration-300 sm:pr-8"
              style={{ opacity: hovered !== null && hovered !== idx ? 0.5 : 1 }}
              onMouseEnter={(e) => {
                setHovered(idx);
                e.currentTarget.style.background = "rgba(14,165,233,0.04)";
              }}
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
            >
              <span
                aria-hidden
                className="absolute bottom-5 left-0 top-5 w-[2px] origin-top scale-y-0 bg-[#0EA5E9] transition-transform duration-300 group-hover:scale-y-100"
              />
              <span className="font-mono text-[12px] text-[#94A3B8] transition-colors duration-300 group-hover:text-[#0284C7]">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-bold text-[#0F172A]">{p.t}</h3>
              <p className="max-w-md text-[15px] leading-relaxed text-[#64748B]">{p.b}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

/* ── 06 · WHAT WE ENGINEER ────────────────────────────────────────────── */

const ENGINEER = [
  "AI systems",
  "Intelligent software",
  "AI agents",
  "RAG systems",
  "Machine learning",
  "Intelligent automation",
  "Data systems",
  "API & system integration",
  "Cloud & infrastructure",
  "Computer vision",
];

export function WhatWeEngineerSection() {
  return (
    <Shell bg="#F1F6FD" n="07" label="What We Engineer" note="System / 07">
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <h2 className={H2_LIGHT}>One engineering practice.</h2>
          <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-[#475569]">
            Infomist connects AI, software, automation, data and infrastructure into one system —
            these are the components we build and operate.
          </p>
        </Reveal>
        <div className="grid border-t border-[#DCE7F4] sm:grid-cols-2">
          {ENGINEER.map((c, idx) => (
            <Reveal key={c} i={idx % 2}>
              <div
                className="group flex items-center justify-between gap-4 border-b border-l-2 border-l-transparent border-[#DCE7F4] py-4 pl-3 pr-4 transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#FFFFFF";
                  e.currentTarget.style.borderLeftColor = "#0EA5E9";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(7,20,38,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "";
                  e.currentTarget.style.borderLeftColor = "transparent";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <span className="text-[14px] font-semibold text-[#0F172A]">{c}</span>
                <ArrowRight
                  size={14}
                  className="-translate-x-1 text-[#0EA5E9] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* ── 07 · HOW WE BUILD ────────────────────────────────────────────────── */

const BUILD = [
  { t: "Discover", b: "Understand the problem, business context and desired outcome." },
  { t: "Architect", b: "Design the technical architecture, AI strategy and system boundaries." },
  { t: "Build", b: "Engineer the software, AI models, agents, APIs and interfaces." },
  { t: "Integrate", b: "Connect systems, automation, data and infrastructure." },
  { t: "Optimize", b: "Measure, improve, monitor and continuously evolve the system." },
];

export function HowWeBuildSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <Shell bg={NAVY} n="08" label="How We Build" note="Process / 08" dark>
      <Reveal>
        <h2 className={H2_DARK}>Engineered from the ground up.</h2>
      </Reveal>
      <div className="relative mt-16" onMouseLeave={() => setHovered(null)}>
        <div
          aria-hidden
          className="absolute left-0 right-0 top-3 hidden h-px transition-colors duration-300 md:block"
          style={{ background: hovered !== null ? "rgba(96,165,250,0.45)" : "rgba(255,255,255,0.12)" }}
        />
        <ol className="grid gap-x-5 gap-y-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {BUILD.map((s, idx) => {
            const near = hovered !== null && Math.abs(hovered - idx) <= 1;
            const isHover = hovered === idx;
            return (
              <Reveal key={s.t} i={idx} as="li">
                <div
                  className="group cursor-default transition-opacity duration-300"
                  style={{ opacity: hovered !== null && !near ? 0.5 : 1 }}
                  onMouseEnter={() => setHovered(idx)}
                >
                  <span
                    className="relative z-10 mb-4 flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[11px] transition-all duration-300"
                    style={{
                      borderColor: near ? "#60A5FA" : "rgba(255,255,255,0.12)",
                      background: "#0B1220",
                      color: near ? "#93C5FD" : "#94A3B8",
                      transform: isHover ? "scale(1.15)" : "scale(1)",
                    }}
                  >
                    {idx + 1}
                  </span>
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#F4F8FC]">{s.t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#94A3B8]">{s.b}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Shell>
  );
}

/* ── 08 · WHY INFOMIST ────────────────────────────────────────────────── */

const WHY = [
  { t: "AI-native thinking", b: "AI is considered at the architecture level — not added after the software is built." },
  { t: "Engineering-first", b: "Production software and systems, not experiments that stall at the demo." },
  { t: "End-to-end systems", b: "AI, software, automation, data and infrastructure engineered as one." },
  { t: "Business impact", b: "Technology engineered around measurable outcomes, not activity." },
];

export function WhyInfomistSection() {
  return (
    <Shell bg="#FFFFFF" n="09" label="Why Infomist" note="Difference / 09">
      <Reveal>
        <h2 className={`${H2_LIGHT} max-w-[18ch]`}>
          Intelligence isn't a feature. <span className="text-[#0EA5E9]">It's part of the system.</span>
        </h2>
      </Reveal>
      <div className="group/why mt-14 grid gap-x-12 gap-y-12 md:grid-cols-12">
        {WHY.map((s, idx) => (
          <Reveal
            key={s.t}
            i={idx}
            className={
              idx === 0
                ? "md:col-span-5"
                : idx === 1
                  ? "md:col-span-4 md:col-start-7 md:mt-8"
                  : idx === 2
                    ? "md:col-span-5 md:col-start-2"
                    : "md:col-span-4 md:col-start-8 md:mt-4"
            }
          >
            <div className="group/item transition-opacity duration-300 group-hover/why:[&:not(:hover)]:opacity-45">
              <h3 className="flex flex-col text-lg font-black text-[#0F172A]">
                {s.t}
                <span
                  aria-hidden
                  className="mt-1.5 h-px w-0 bg-[#0EA5E9] transition-all duration-300 group-hover/item:w-10"
                />
              </h3>
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-[#64748B] transition-transform duration-300 group-hover/item:-translate-y-0.5">
                {s.b}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}
