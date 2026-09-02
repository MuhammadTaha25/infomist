import { useParams, Link } from "wouter";
import { AlertTriangle, CheckCircle2, ArrowRight, Terminal, HelpCircle } from "lucide-react";
import { findSubcategory } from "@/data/solutionsData";
import { HeroVisual, heroVariantForRoute } from "@/components/hero/HeroVisual";
import { useMeta } from "@/components/site/useMeta";
import { JsonLd, faqSchema, FaqAccordion } from "@/components/site/Faq";
import { NotFoundBlock } from "@/components/site/NotFoundBlock";
import {
  GridOverlay,
  HeroBlobs,
  Eyebrow,
  SectionHead,
  DarkCTA,
  CTAButton,
} from "@/components/site/primitives";

export function SubcategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const match = slug ? findSubcategory(slug) : null;

  useMeta(
    match ? match.sub.metaTitle : "Infomist — Services",
    match ? match.sub.metaDescription : "Infomist delivers custom software, AI, design, and growth services.",
  );

  if (!match) {
    return (
      <NotFoundBlock
        title="Solution not found."
        sub="That service page doesn't exist, or the link has changed."
        backHref="/solutions"
        backLabel="Back to Solutions"
      />
    );
  }

  const { category, sub } = match;
  const Icon = category.icon;

  return (
    <div className="w-full min-h-screen bg-white pt-20 overflow-x-hidden">
      <JsonLd data={faqSchema(sub.faqs)} />

      {/* Breadcrumb */}
      <div className="border-b border-slate-100 relative z-10">
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-2 text-sm">
          <Link href="/solutions" className="text-[#64748B] hover:text-[#0EA5E9] transition-colors duration-150 font-medium">Solutions</Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <Link href={`/solutions/${category.slug}`} className="text-[#64748B] hover:text-[#0EA5E9] transition-colors duration-150 font-medium">
            <span className="font-mono text-xs text-[#0EA5E9] mr-1.5">{category.tag}</span>
            {category.name}
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="text-[#0F172A] font-semibold">{sub.displayName}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "#FAFAFA" }}>
        <GridOverlay />
        <HeroBlobs />
        <HeroVisual variant={heroVariantForRoute(category.slug, sub.slug)} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-14 md:pt-20 md:pb-16">
          <div className="flex flex-col gap-6 max-w-2xl rise-in">
            <div className="flex items-center gap-4">
              <span
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(145deg, rgba(14,165,233,0.12), rgba(14,165,233,0.04))",
                  border: "1px solid rgba(14,165,233,0.18)",
                  boxShadow: "0 0 0 6px rgba(14,165,233,0.05), 0 8px 24px rgba(14,165,233,0.12)",
                }}
              >
                <Icon size={26} strokeWidth={1.7} className="text-[#0EA5E9]" />
              </span>
              <Eyebrow>{category.tag} · {category.name}</Eyebrow>
            </div>
            <h1 className="font-black text-[#0F172A] leading-[1.02]" style={{ fontSize: "clamp(2.5rem, 6.2vw, 4.4rem)", letterSpacing: "-0.045em" }}>
              {sub.displayName}
            </h1>
            <p className="text-[#0EA5E9] text-lg md:text-xl font-semibold max-w-2xl">{category.blurb}</p>
            <p className="text-[#475569] text-base md:text-lg max-w-2xl leading-relaxed">
              A focused engagement built specifically around {sub.displayName.toLowerCase()} — scoped, staffed, and
              shipped by senior engineers, not a generic playbook.
            </p>
            <div className="pt-1">
              <CTAButton href="/talk-to-strategist" variant="lime" icon={ArrowRight}>Talk to a Strategist</CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Outcome */}
      <section className="w-full" style={{ background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
          <div className="rise-in">
            <SectionHead
              icon={AlertTriangle}
              tone="slate"
              eyebrow="The Problem → The Fix"
              title="Where teams get stuck —"
              gradientWord="and what changes."
            />
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
            {/* Pain points */}
            <div
              className="rise-in relative rounded-3xl p-[1.5px]"
              style={{ background: "linear-gradient(160deg, rgba(245,158,11,0.30), rgba(245,158,11,0.04))" }}
            >
              <div className="rounded-[22px] bg-white p-7 md:p-9 h-full flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.28)", color: "#B45309" }}>
                    <AlertTriangle size={20} strokeWidth={2.2} />
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.02em" }}>
                    The Problem
                  </h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {sub.painPoints.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3.5 rounded-xl px-4 py-4 transition-all duration-250 hover:-translate-y-0.5"
                      style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.18)" }}
                    >
                      <span className="mt-0.5 w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: "rgba(245,158,11,0.15)", color: "#B45309" }}>
                        <AlertTriangle size={13} strokeWidth={2.6} />
                      </span>
                      <span className="text-[15px] leading-relaxed text-[#0F172A]">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Outcomes */}
            <div
              className="rise-in relative rounded-3xl p-[1.5px]"
              style={{ background: "linear-gradient(160deg, rgba(14,165,233,0.32), rgba(132,204,22,0.12))" }}
            >
              <div className="rounded-[22px] bg-white p-7 md:p-9 h-full flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.3)", color: "#0EA5E9" }}>
                    <CheckCircle2 size={20} strokeWidth={2.2} />
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.02em" }}>
                    The Outcome
                  </h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {sub.benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3.5 rounded-xl px-4 py-4 transition-all duration-250 hover:-translate-y-0.5"
                      style={{ background: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.18)" }}
                    >
                      <span className="mt-0.5 w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: "rgba(14,165,233,0.15)", color: "#0EA5E9" }}>
                        <CheckCircle2 size={13} strokeWidth={2.6} />
                      </span>
                      <span className="text-[15px] leading-relaxed text-[#0F172A]">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack (dark band) */}
      <section
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}
      >
        <GridOverlay dark />
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="rise-in">
            <Eyebrow icon={Terminal} dark>Tech Stack</Eyebrow>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 rise-in">
            {sub.stack.map((t) => (
              <span
                key={t}
                className="group flex items-center gap-2 font-mono text-[13px] tracking-wide px-4 py-2.5 rounded-xl transition-all duration-250 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#7DD3FC" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] flex-shrink-0" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="w-full" style={{ background: "#F9FAFB" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
          <div className="rise-in">
            <SectionHead icon={ArrowRight} eyebrow="Development Timeline" title="How the engagement" gradientWord="runs." />
          </div>
          <div className="relative max-w-3xl mt-12">
            <div className="absolute left-[19px] top-3 bottom-3 w-px bg-slate-200" aria-hidden="true" />
            <div className="flex flex-col gap-3">
              {sub.timeline.map((row, i) => {
                const last = i === sub.timeline.length - 1;
                return (
                  <div
                    key={row.phase}
                    className="rise-in group relative flex items-center gap-5 rounded-2xl border border-slate-200 bg-white px-5 py-5 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/60"
                  >
                    <span
                      className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-black text-sm text-white"
                      style={{
                        background: last ? "#84CC16" : "#0EA5E9",
                        boxShadow: `0 0 0 4px white, 0 0 0 5px ${last ? "rgba(132,204,22,0.25)" : "rgba(14,165,233,0.25)"}`,
                      }}
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                      <span className="text-sm md:text-base font-semibold text-[#0F172A]">{row.phase}</span>
                      <span
                        className="text-sm font-bold flex-shrink-0 px-3 py-1 rounded-full w-fit"
                        style={{
                          color: last ? "#65A30D" : "#0284C7",
                          background: last ? "rgba(132,204,22,0.1)" : "rgba(14,165,233,0.08)",
                        }}
                      >
                        {row.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-6 leading-relaxed max-w-2xl">
            Timelines shown are estimated ranges for 2026 engagements and are confirmed after a scoping call based on your specific requirements.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full" style={{ background: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-28">
          <div className="mb-10 rise-in">
            <Eyebrow icon={HelpCircle}>Frequently Asked Questions</Eyebrow>
            <h2 className="mt-4 font-black text-[#0F172A] max-w-2xl" style={{ fontSize: "clamp(1.9rem, 4vw, 2.7rem)", letterSpacing: "-0.035em" }}>
              Common questions about {sub.displayName}
            </h2>
          </div>
          <div className="rise-in">
            <FaqAccordion key={`sub-${slug}`} faqs={sub.faqs} idPrefix={`sub-${slug}`} />
          </div>
        </div>
      </section>

      <DarkCTA
        eyebrow={`Ready to build ${sub.displayName.toLowerCase()}?`}
        title="Let's scope your project with a systems architect."
        sub="One focused call to map your requirements, timeline, and stack — no obligation, no generic sales pitch."
        cta={<CTAButton href="/talk-to-strategist" variant="lime" icon={ArrowRight}>Talk to a Strategist</CTAButton>}
      />
    </div>
  );
}
