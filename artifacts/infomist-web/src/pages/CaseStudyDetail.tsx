import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Target,
  Wrench,
  CheckCircle2,
  Compass,
  PenTool,
  Code2,
  Rocket,
} from "lucide-react";
import { useMeta } from "@/components/site/useMeta";
import { useSocialMeta } from "@/components/site/useSocialMeta";
import { JsonLd } from "@/components/site/Faq";
import { NotFoundBlock } from "@/components/site/NotFoundBlock";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import {
  GridOverlay,
  HeroBlobs,
  Blob,
  Section,
  SectionHead,
  DarkCTA,
  CTAButton,
  Eyebrow,
  IconTile,
} from "@/components/site/primitives";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { CaseStudyGlyphPaths } from "@/components/case-studies/CaseStudyLogo";
import { getCaseStudy, getRelatedCaseStudies } from "@/data/caseStudies";

const SITE = "https://www.infomist.com";

/** How Infomist approaches a build — the studio's general method, not
 *  per-project milestones (kept generic on purpose, no fabricated dates). */
const APPROACH = [
  { icon: Compass, title: "Discovery", detail: "Map the product, its users and the workflow it has to fit into." },
  { icon: PenTool, title: "Design & architecture", detail: "Shape the interface and the technical structure before building." },
  { icon: Code2, title: "Build", detail: "Engineer the core platform and features in production-ready increments." },
  { icon: Rocket, title: "Launch & iterate", detail: "Integrate, test, deploy — then keep improving against real use." },
];

export function CaseStudyDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const study = useMemo(() => getCaseStudy(slug), [slug]);
  const related = useMemo(() => getRelatedCaseStudies(slug), [slug]);

  useMeta(
    study ? `${study.name} Case Study | Infomist` : "Case Study | Infomist",
    study?.shortDescription ?? "",
  );
  useSocialMeta({
    title: study ? `${study.name} — Case Study | Infomist` : "Case Study | Infomist",
    description: study?.shortDescription ?? "",
    path: `/case-studies/${slug}`,
  });

  const nav = useMemo(() => {
    if (!study) return [];
    return [
      { id: "overview", label: "Overview" },
      { id: "challenge", label: "Challenge" },
      { id: "solution", label: "Solution" },
      { id: "scope", label: "Scope" },
      { id: "approach", label: "Approach" },
      ...(study.workflow ? [{ id: "workflow", label: "Workflow" }] : []),
      ...(study.outcomes?.length ? [{ id: "results", label: "Results" }] : []),
    ];
  }, [study]);

  const active = useScrollSpy(nav.map((n) => n.id));

  if (!study) {
    return (
      <NotFoundBlock
        title="Case study not found."
        sub="That project doesn't exist, or it hasn't been published yet."
        backHref="/case-studies"
        backLabel="Back to Case Studies"
      />
    );
  }

  const c = study.color;

  return (
    <div className="w-full min-h-screen bg-white pt-20 overflow-x-hidden [scroll-behavior:smooth]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${study.name} — Case Study`,
          description: study.shortDescription,
          about: study.industry,
          author: { "@type": "Organization", name: "Infomist" },
          publisher: { "@type": "Organization", name: "Infomist" },
          mainEntityOfPage: `${SITE}/case-studies/${study.slug}`,
        }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-slate-100 relative z-10">
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-2 text-sm">
          <Link href="/case-studies" className="text-[#64748B] hover:text-[#0EA5E9] transition-colors duration-150 font-medium">
            Case Studies
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="text-[#0F172A] font-semibold">{study.name}</span>
        </nav>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "#FAFAFA" }}>
        <GridOverlay />
        <HeroBlobs />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-16 md:pt-16 md:pb-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex flex-col gap-6 max-w-2xl rise-in">
              <span
                className="self-start text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: `${c}14`, color: c, border: `1px solid ${c}2e` }}
              >
                {study.category}
              </span>
              <h1
                className="font-black text-[#0F172A] leading-[1.03]"
                style={{ fontSize: "clamp(2.6rem, 6vw, 4rem)", letterSpacing: "-0.045em" }}
              >
                {study.name}
              </h1>
              <p className="text-[#475569] text-xl leading-relaxed">{study.shortDescription}</p>

              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 pt-1">
                <HeroMeta label="Industry" value={study.industry} />
                <HeroMeta label="Location" value={study.location} />
                <HeroMeta label="Project type" value={study.projectType} />
              </dl>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                {study.websiteUrl ? (
                  <CTAButton href={study.websiteUrl} external variant="primary" icon={ArrowUpRight}>
                    {study.websiteLabel ?? "Visit Website"}
                  </CTAButton>
                ) : null}
                <Link
                  href="/case-studies"
                  className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#475569] hover:text-[#0F172A] px-2 py-1 rounded outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                >
                  <ArrowLeft size={15} strokeWidth={2.6} className="transition-transform duration-300 group-hover:-translate-x-1" />
                  Back to Case Studies
                </Link>
              </div>
            </div>

            {/* Project mark — the site's line-geometry language, scaled up. */}
            <div
              className="hidden md:flex w-60 h-60 rounded-[28px] items-center justify-center flex-shrink-0 relative overflow-hidden"
              style={{ background: `linear-gradient(150deg, ${c}1f, ${c}06)`, color: c, border: `1px solid ${c}33` }}
              aria-hidden="true"
            >
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `radial-gradient(circle at 30% 20%, ${c}44, transparent 60%)` }} />
              <svg width="96" height="96" viewBox="0 0 32 32" className="relative">
                <CaseStudyGlyphPaths study={study} />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky section nav ───────────────────────────────────────── */}
      <div className="sticky top-16 z-20 border-y border-slate-100 bg-white/90 backdrop-blur">
        <nav
          className="max-w-6xl mx-auto px-6 flex gap-1 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
          aria-label="Sections"
        >
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="whitespace-nowrap px-3 py-3.5 text-sm font-semibold border-b-2 transition-colors"
              style={
                active === n.id
                  ? { color: "#0EA5E9", borderColor: "#0EA5E9" }
                  : { color: "#64748B", borderColor: "transparent" }
              }
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ── Overview ─────────────────────────────────────────────────── */}
      <Section id="overview" tone="white">
        <div className="scroll-mt-28">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <Reveal>
              <SectionHead eyebrow="Project overview" title="What" gradientWord={`${study.name} is`} />
              <p className="mt-6 text-xl leading-relaxed text-[#334155]">{study.overview}</p>
            </Reveal>
            <Reveal>
              <div className="rounded-2xl border border-slate-100 bg-[#F9FAFB] p-6 flex flex-col gap-4">
                <MetaBlock label="Industry" value={study.industry} />
                <MetaBlock label="Location" value={study.location} />
                <MetaBlock label="Category" value={study.category} />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] mb-1.5">Services</p>
                  <div className="flex flex-wrap gap-1.5">
                    {study.services.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-[#475569]"
                        style={{ background: "#fff", border: "1px solid #E2E8F0" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── Challenge + Solution ─────────────────────────────────────── */}
      <Section tone="soft">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div id="challenge" className="scroll-mt-28 h-full rounded-2xl bg-white p-8 md:p-10 border border-slate-100">
              <IconTile icon={Target} accent="#F97316" size={14} />
              <h2 className="mt-5 font-black text-[#0F172A] text-2xl" style={{ letterSpacing: "-0.03em" }}>
                The challenge
              </h2>
              <p className="mt-4 text-lg text-[#475569] leading-relaxed">{study.challenge}</p>
            </div>
          </Reveal>
          <Reveal>
            <div id="solution" className="scroll-mt-28 h-full rounded-2xl bg-white p-8 md:p-10 border border-slate-100">
              <IconTile icon={Wrench} accent="#0EA5E9" size={14} />
              <h2 className="mt-5 font-black text-[#0F172A] text-2xl" style={{ letterSpacing: "-0.03em" }}>
                The solution
              </h2>
              <p className="mt-4 text-lg text-[#475569] leading-relaxed">{study.solution}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Scope of work (one section — replaces features + delivered) ─ */}
      <Section id="scope" tone="white">
        <div className="scroll-mt-28">
          <SectionHead eyebrow="Scope of work" title="What Infomist" gradientWord="delivered" />
          <RevealGroup className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {study.scope.map((s, i) => (
              <RevealItem key={s.title}>
                <div className="h-full flex flex-col gap-3">
                  <span
                    className="text-sm font-black tabular-nums"
                    style={{ color: c }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-bold text-[#0F172A] text-lg leading-snug">{s.title}</h3>
                  <p className="text-[#475569] leading-relaxed">{s.detail}</p>
                  <span className="mt-1 h-px w-10" style={{ background: c }} />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ── How we approached it ─────────────────────────────────────── */}
      <Section id="approach" tone="soft">
        <div className="scroll-mt-28">
          <SectionHead
            eyebrow="How we build"
            title="Our approach to"
            gradientWord="the work"
            sub="The framework every Infomist engagement follows — adapted to each project's product, users and constraints."
          />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map((step, i) => (
              <RevealItem key={step.title}>
                <div className="h-full rounded-2xl bg-white p-6 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <IconTile icon={step.icon} accent={c} size={11} />
                    <span className="text-2xl font-black text-slate-200 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-4 font-bold text-[#0F172A]">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-[#475569] leading-relaxed">{step.detail}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ── Workflow (AI / automation projects only) ─────────────────── */}
      {study.workflow && study.workflow.length > 0 ? (
        <section
          id="workflow"
          className="scroll-mt-28 relative w-full overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}
        >
          <GridOverlay dark />
          <Blob color={`${c}33`} className="-top-24 right-1/4" size={420} />
          <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-28">
            <SectionHead eyebrow="How it works" title="The" gradientWord="workflow" dark />
            <ol className="mt-10 flex flex-col gap-3">
              {study.workflow.map((w, i) => (
                <li key={w.label} className="relative">
                  <div
                    className="rounded-xl px-5 py-4 flex items-start gap-4"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span
                      className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
                      style={{ background: `${c}22`, color: c, border: `1px solid ${c}3a` }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-white font-bold">{w.label}</p>
                      {w.note ? <p className="text-slate-400 text-sm mt-0.5">{w.note}</p> : null}
                    </div>
                  </div>
                  {i < study.workflow!.length - 1 ? (
                    <div className="flex justify-center py-1">
                      <span className="text-slate-600 text-lg leading-none">↓</span>
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* ── Results (verified figures only) ──────────────────────────── */}
      {study.outcomes && study.outcomes.length > 0 ? (
        <Section id="results" tone="white">
          <div className="scroll-mt-28">
            <SectionHead eyebrow="Outcomes" icon={CheckCircle2} title="Verified" gradientWord="results" />
            <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2">
              {study.outcomes.map((o) => (
                <RevealItem key={o}>
                  <div
                    className="rounded-2xl p-7 border"
                    style={{ borderColor: `${c}2e`, background: `${c}0a` }}
                  >
                    <CheckCircle2 size={22} style={{ color: "#65A30D" }} />
                    <p className="mt-3 text-[#0F172A] font-bold text-lg leading-snug">{o}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            <p className="mt-6 text-xs text-[#94A3B8]">Figures as published by the client.</p>
          </div>
        </Section>
      ) : null}

      {/* ── Related (once) ──────────────────────────────────────────── */}
      {related.length > 0 ? (
        <section className="relative w-full overflow-hidden" style={{ background: "linear-gradient(160deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}>
          <GridOverlay dark />
          <Blob color="rgba(14,165,233,0.18)" className="-top-24 left-1/4" size={420} />
          <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-24">
            <Reveal className="flex items-end justify-between gap-4">
              <div className="flex flex-col gap-3">
                <Eyebrow dark>More work</Eyebrow>
                <h2 className="font-black text-white text-3xl" style={{ letterSpacing: "-0.03em" }}>
                  Related case studies
                </h2>
              </div>
              <Link href="/case-studies" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[#0EA5E9] hover:translate-x-0.5 transition-transform">
                All case studies
                <ArrowRight size={15} strokeWidth={2.6} />
              </Link>
            </Reveal>
            <RevealGroup className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((r) => (
                <RevealItem key={r.slug}>
                  <CaseStudyCard study={r} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ) : null}

      <DarkCTA
        eyebrow="Ready to build something similar?"
        title="Let's build the next one together."
        sub="Tell us where your product or operations are getting stuck — we'll map the shortest path to shipped."
        cta={
          <CTAButton href="/talk-to-strategist" variant="lime" icon={ArrowRight}>
            Talk to a Strategist
          </CTAButton>
        }
      />
    </div>
  );
}

function HeroMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">{label}</dt>
      <dd className="text-[#0F172A] font-semibold text-sm leading-snug">{value}</dd>
    </div>
  );
}

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] mb-0.5">{label}</p>
      <p className="text-[#0F172A] font-semibold">{value}</p>
    </div>
  );
}

/** lightweight scrollspy — highlights the section nearest the top */
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    if (ids.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}
