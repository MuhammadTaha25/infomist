import { useState } from "react";
import { ArrowRight, Cpu } from "lucide-react";
import { useMeta } from "@/components/site/useMeta";
import { useSocialMeta } from "@/components/site/useSocialMeta";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import {
  GridOverlay,
  Blob,
  Section,
  SectionHead,
  DarkCTA,
  CTAButton,
} from "@/components/site/primitives";
import { PowerhouseDiagram } from "@/components/one-man-company/PowerhouseDiagram";
import { JarvisModal } from "@/components/one-man-company/JarvisModal";
import { DEPARTMENTS, JARVIS, STORY, TOTAL_AGENTS } from "@/components/one-man-company/departments";

const NAVY = "linear-gradient(160deg,#0B1220 0%,#0F172A 45%,#101B2E 100%)";

export function OneManCompanyPage() {
  const [jarvisOpen, setJarvisOpen] = useState(false);

  useMeta(
    "One CEO. One AI-Powered Company. | Infomist Engineering Powerhouse",
    "The Engineering Powerhouse model: an operating system connecting lead generation, marketing, finance and project execution — coordinated by Jarvis, giving one CEO a unified view of the whole company.",
  );
  useSocialMeta({
    title: "One CEO. One AI-Powered Company. | Infomist",
    description:
      "An operating system connecting lead generation, marketing, finance and project execution — coordinated by Jarvis.",
    path: "/one-man-company",
  });

  return (
    <div className="w-full min-h-screen pt-20 overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ background: NAVY }}>
        <GridOverlay dark />
        <Blob color="rgba(14,165,233,0.18)" className="-top-24 -left-16" size={520} />
        <Blob color="rgba(132,204,22,0.10)" className="bottom-0 right-0" size={380} />

        <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-16 md:pt-16 md:pb-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,47%)_minmax(0,53%)] lg:items-center">
            {/* Left — content */}
            <div className="flex flex-col gap-6 rise-in">
              <span className="flex items-center gap-2.5 text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "#8DE7FF" }}>
                <span className="h-1.5 w-1.5 rounded-full bg-[#56D6FF] shadow-[0_0_10px_#56D6FF]" />
                Software Engineering Company Since 2001
              </span>

              <h1
                className="font-extrabold leading-[1.02] text-balance"
                style={{ fontSize: "clamp(2.3rem, 4.6vw, 3.5rem)", letterSpacing: "-0.03em", color: "#F7FAFC" }}
              >
                One CEO.
                <br />
                One <span className="whitespace-nowrap" style={{ color: "#8DE7FF" }}>AI-powered</span> company.
              </h1>

              <p className="text-[#AAB8C8] text-lg leading-relaxed max-w-[560px]">
                An intelligent operating system connecting lead generation, marketing, finance and
                project execution — giving one CEO a unified view of the entire company.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#model"
                  className="group inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: "#F7FAFC", color: "#07111F", boxShadow: "0 10px 30px -10px rgba(86,214,255,0.4)" }}
                >
                  Explore the Powerhouse
                  <ArrowRight size={16} strokeWidth={2.6} className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <button
                  type="button"
                  onClick={() => setJarvisOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-[#F7FAFC] transition-all duration-200 hover:bg-[rgba(86,214,255,0.06)]"
                  style={{ border: "1px solid rgba(255,255,255,0.18)" }}
                >
                  <Cpu size={16} strokeWidth={2.4} className="text-[#56D6FF]" />
                  Talk to Jarvis
                </button>
              </div>

              <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#718197]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#61D7A5]" />
                {TOTAL_AGENTS} specialized AI agents + Jarvis
              </p>
            </div>

            {/* Right — diagram */}
            <div className="min-w-0">
              <PowerhouseDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* ── The story ────────────────────────────────────────────────── */}
      <Section id="model" tone="white">
        <div className="scroll-mt-24">
          <SectionHead
            eyebrow="How it works"
            title="From a question to"
            gradientWord="one answer"
            sub="The CEO asks. Jarvis routes it through the company. One coherent response comes back."
          />
          <RevealGroup className="mt-12 grid gap-x-8 gap-y-6 md:grid-cols-2">
            {STORY.map((s) => (
              <RevealItem key={s.step}>
                <div className="flex gap-4">
                  <span className="text-sm font-black tabular-nums text-[#0EA5E9] pt-0.5">{s.step}</span>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg">{s.title}</h3>
                    <p className="mt-1 text-[#475569] leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ── Departments ──────────────────────────────────────────────── */}
      <Section tone="soft">
        <SectionHead
          eyebrow="The operating departments"
          title="Four departments,"
          gradientWord={`${TOTAL_AGENTS} agents`}
          sub="Each department runs a slice of the company. Jarvis is the layer that connects them."
        />
        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2">
          {DEPARTMENTS.map((d) => {
            const Icon = d.icon;
            return (
              <RevealItem key={d.id}>
                <div className="h-full rounded-2xl bg-white p-7 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ background: `${d.color}14`, color: d.color, border: `1px solid ${d.color}2e` }}
                    >
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: d.color }}>
                      {d.agents} AI agents
                    </span>
                  </div>
                  <h3 className="mt-4 font-black text-[#0F172A] text-xl" style={{ letterSpacing: "-0.02em" }}>
                    {d.name}
                  </h3>
                  <p className="mt-1.5 text-[#475569] leading-relaxed">{d.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {d.agentList.map((a) => (
                      <span
                        key={a}
                        className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-[#475569]"
                        style={{ background: "#F1F5F9", border: "1px solid #E2E8F0" }}
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* ── Jarvis ───────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ background: NAVY }}>
        <GridOverlay dark />
        <Blob color="rgba(14,165,233,0.2)" className="-top-24 left-1/3" size={440} />
        <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-28 text-center flex flex-col items-center gap-6">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: "#0F1D30", border: "1px solid rgba(86,214,255,0.35)", boxShadow: "0 0 26px rgba(14,165,233,0.2)" }}
          >
            <Cpu size={24} className="text-[#56D6FF]" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8DE7FF]">{JARVIS.role}</span>
          <h2 className="font-black text-white leading-[1.1] max-w-2xl" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", letterSpacing: "-0.03em" }}>
            Jarvis is the intelligence layer between the CEO and the company.
          </h2>
          <ul className="flex flex-wrap justify-center gap-3">
            {JARVIS.does.map((x) => (
              <li
                key={x}
                className="rounded-full px-4 py-2 text-sm font-semibold text-[#AAB8C8]"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-2">
            <button
              type="button"
              onClick={() => setJarvisOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-[#07111F] transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "#F7FAFC" }}
            >
              <Cpu size={16} className="text-[#0EA5E9]" />
              Talk to Jarvis
            </button>
          </div>
        </div>
      </section>

      <DarkCTA
        eyebrow="Ready to run leaner?"
        title="Let's build your Engineering Powerhouse."
        sub="Tell us how your company runs today — we'll map the operating system that fits it."
        cta={
          <CTAButton href="/talk-to-strategist" variant="lime" icon={ArrowRight}>
            Talk to a Strategist
          </CTAButton>
        }
      />

      <JarvisModal open={jarvisOpen} onClose={() => setJarvisOpen(false)} />
    </div>
  );
}
