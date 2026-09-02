import { useMemo } from "react";
import { useParams, Link } from "wouter";
import { ArrowRight, ArrowUpRight, Target, Wrench, CheckCircle2, Layers } from "lucide-react";
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
import { getCaseStudy, getRelatedCaseStudies } from "@/data/caseStudies";

const SITE = "https://www.infomist.com";

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
    <div className="w-full min-h-screen bg-white pt-20 overflow-x-hidden">
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
          <Link
            href="/case-studies"
            className="text-[#64748B] hover:text-[#0EA5E9] transition-colors duration-150 font-medium"
          >
            Case Studies
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="text-[#0F172A] font-semibold">{study.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "#FAFAFA" }}>
        <GridOverlay />
        <HeroBlobs />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-16 md:pt-20 md:pb-20">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex flex-col gap-6 max-w-2xl rise-in">
              <div className="flex items-center gap-3">
                <span
                  className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: `${c}14`, color: c, border: `1px solid ${c}2e` }}
                >
                  {study.category}
                </span>
                <span className="text-xs text-[#64748B]">
                  {study.industry} · {study.location}
                </span>
              </div>
              <h1
                className="font-black text-[#0F172A] leading-[1.04]"
                style={{ fontSize: "clamp(2.4rem, 5.4vw, 3.6rem)", letterSpacing: "-0.04em" }}
              >
                {study.name}
              </h1>
              <p className="text-[#475569] text-xl leading-relaxed">{study.shortDescription}</p>
              {study.websiteUrl ? (
                <div>
                  <CTAButton href={study.websiteUrl} external variant="outline" icon={ArrowUpRight}>
                    {study.websiteLabel ?? "Visit Website"}
                  </CTAButton>
                </div>
              ) : null}
            </div>

            {/* Project visual — the existing monogram language, scaled up. No stock imagery. */}
            <div
              className="hidden md:flex w-56 h-56 rounded-3xl items-center justify-center text-5xl font-black flex-shrink-0"
              style={{
                background: `linear-gradient(150deg, ${c}22, ${c}08)`,
                color: c,
                border: `1px solid ${c}33`,
              }}
              aria-hidden="true"
            >
              {study.initials}
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <Section tone="white">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <Reveal>
            <dl className="flex flex-col gap-4 text-sm">
              <Meta label="Project" value={study.name} />
              <Meta label="Category" value={study.category} />
              <Meta label="Industry" value={study.industry} />
              <Meta label="Location" value={study.location} />
            </dl>
          </Reveal>
          <Reveal>
            <SectionHead eyebrow="Overview" title="Project" gradientWord="overview" />
            <p className="mt-5 text-lg leading-relaxed text-[#475569]">{study.overview}</p>
          </Reveal>
        </div>
      </Section>

      {/* Challenge + Solution */}
      <Section tone="soft">
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          <RevealItem>
            <div className="h-full rounded-2xl bg-white p-8 border border-slate-100">
              <IconTile icon={Target} accent="#F97316" />
              <h2 className="mt-4 text-xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.02em" }}>
                The challenge
              </h2>
              <p className="mt-3 text-[#475569] leading-relaxed">{study.challenge}</p>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="h-full rounded-2xl bg-white p-8 border border-slate-100">
              <IconTile icon={Wrench} accent="#0EA5E9" />
              <h2 className="mt-4 text-xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.02em" }}>
                The solution
              </h2>
              <p className="mt-3 text-[#475569] leading-relaxed">{study.solution}</p>
            </div>
          </RevealItem>
        </RevealGroup>
      </Section>

      {/* What we delivered (services) */}
      <Section tone="white">
        <SectionHead eyebrow="Engagement" icon={Layers} title="What we" gradientWord="delivered" />
        <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {study.services.map((s) => (
            <RevealItem key={s}>
              <div className="rounded-xl border border-slate-100 bg-[#F9FAFB] px-5 py-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c }} />
                <span className="text-sm font-semibold text-[#0F172A]">{s}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Outcomes — only when the site already publishes a figure */}
      {study.outcomes && study.outcomes.length > 0 ? (
        <Section tone="soft">
          <SectionHead eyebrow="Outcomes" icon={CheckCircle2} title="Verified" gradientWord="results" />
          <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2">
            {study.outcomes.map((o) => (
              <RevealItem key={o}>
                <div className="rounded-2xl bg-white p-6 border border-slate-100 flex items-start gap-3">
                  <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0" style={{ color: "#65A30D" }} />
                  <p className="text-[#0F172A] font-semibold leading-snug">{o}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      ) : null}

      {/* Related */}
      {related.length > 0 ? (
        <section
          className="relative w-full overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}
        >
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
              <Link
                href="/case-studies"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[#0EA5E9] hover:translate-x-0.5 transition-transform"
              >
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
        eyebrow="Have a project in mind?"
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

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">{label}</dt>
      <dd className="text-[#0F172A] font-semibold">{value}</dd>
    </div>
  );
}
