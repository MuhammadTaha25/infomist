import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useMeta } from "@/components/site/useMeta";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { GridOverlay, Blob, DarkCTA, CTAButton } from "@/components/site/primitives";
import { JsonLd } from "@/components/site/Faq";
import { ClientImpactSlider } from "@/components/ClientImpactSlider";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { PageHeroVideo } from "@/components/hero/PageHeroVideo";
import { getCaseStudies, CASE_STUDY_CATEGORIES } from "@/data/caseStudies";

const SITE = "https://www.infomist.com";

const STATS = [
  { value: "06", label: "Verified Projects" },
  { value: "Multiple", label: "Industries" },
  { value: "AI +", label: "Automation" },
  { value: "End-to-End", label: "Delivery" },
];

export function CaseStudiesPage() {
  useMeta(
    "Case Studies | AI Systems, Software & Automation | Infomist",
    "Six verified Infomist projects across healthcare, media, marketplaces, defence training, insurance and PropTech — the AI systems, automation workflows, platforms and products we designed and engineered.",
    { canonicalPath: "/case-studies" },
  );

  const studies = useMemo(() => getCaseStudies(), []);
  const [filter, setFilter] = useState<string>("All");
  const visible = filter === "All" ? studies : studies.filter((s) => s.category === filter);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Infomist Case Studies",
    url: `${SITE}/case-studies`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: studies.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}/case-studies/${s.slug}`,
        name: s.name,
      })),
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE}/case-studies` },
    ],
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="w-full min-h-screen overflow-x-hidden">
        {/* 1 · HERO */}
        <PageHeroVideo
          eyebrow="Selected Work"
          title="Real products. Real systems."
          accent="Measured outcomes."
          sub="A closer look at the digital products, AI systems, automation workflows and platforms Infomist has designed and engineered for ambitious businesses."
          primary={{ label: "Start a Project", href: "/contact" }}
          secondary={{ label: "Talk to a Strategist", href: "/talk-to-strategist" }}
          media="hero-case-studies"
        />

        {/* 2 · STATS + 3 · FILTERS + 4 · GRID — one navy body surface, set off
            from the hero by a cyan accent divider */}
        <section
          className="relative w-full overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(39,199,232,0.5), transparent)" }}
          />
          <GridOverlay dark />
          <Blob color="rgba(14,165,233,0.2)" className="-top-24 -left-16" size={520} />
          <Blob color="rgba(132,204,22,0.14)" className="top-10 right-0" size={400} />

          <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-20 md:pb-24">
            <Reveal>
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                {STATS.map((s) => (
                  <div key={s.label} className="flex flex-col gap-1 px-5 py-6" style={{ background: "#0F172A" }}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-2xl font-black text-white leading-none tabular-nums">{s.value}</dd>
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">{s.label}</span>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal>
              <div className="mt-12 flex flex-wrap items-center gap-2">
                {CASE_STUDY_CATEGORIES.map((cat) => {
                  const active = filter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFilter(cat)}
                      aria-pressed={active}
                      className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                      style={
                        active
                          ? { background: "#0EA5E9", color: "#fff", border: "1px solid #0EA5E9" }
                          : { background: "rgba(255,255,255,0.04)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.10)" }
                      }
                    >
                      {cat}
                    </button>
                  );
                })}
                <span className="ml-1 text-xs font-semibold text-slate-500" aria-live="polite">
                  {visible.length} {visible.length === 1 ? "project" : "projects"}
                </span>
              </div>
            </Reveal>

            <RevealGroup className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map((study) => (
                <RevealItem key={study.slug}>
                  <CaseStudyCard study={study} />
                </RevealItem>
              ))}
            </RevealGroup>

            {/* 5 · MORE PROJECTS CTA */}
            <Reveal>
              <div
                className="relative mt-16 overflow-hidden rounded-3xl px-8 py-12 md:px-14 md:py-16"
                style={{
                  background: "linear-gradient(150deg, #0B1929 0%, #0E1F31 55%, #0B1929 100%)",
                  border: "1px solid rgba(39,199,232,0.18)",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "radial-gradient(circle at 82% 12%, rgba(39,199,232,0.14), transparent 45%), radial-gradient(circle at 12% 100%, rgba(110,211,106,0.10), transparent 45%)" }}
                />
                <div className="relative flex flex-col gap-4 max-w-2xl">
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#27C7E8]">
                    Looking for a different capability?
                  </span>
                  <h2 className="font-black text-white leading-[1.1]" style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.5rem)", letterSpacing: "-0.03em" }}>
                    Let's find the right system for your business.
                  </h2>
                  <p className="text-[#A9BBD0] leading-relaxed">
                    These six projects show selected work across our capabilities. Tell us what you
                    are trying to build, improve or automate, and we will map the right next step.
                  </p>
                  <div className="mt-2 flex flex-col sm:flex-row flex-wrap gap-3">
                    <CTAButton href="/talk-to-strategist" variant="lime" icon={ArrowRight}>Talk to a Strategist</CTAButton>
                    <CTAButton href="/contact" variant="white">Start a Project</CTAButton>
                  </div>
                  <p className="mt-2 text-xs text-[#7C90A8]">
                    Need a reference architecture for a specific industry or workflow? Ask our team.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6 · TESTIMONIALS */}
        <section className="w-full" style={{ background: "#F9FAFB" }}>
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
            <ClientImpactSlider />
          </div>
        </section>
      </div>

      {/* 7 · FINAL CTA */}
      <DarkCTA
        eyebrow="Have a project in mind?"
        title="Let's build the next one together."
        sub="Tell us where your product or operations are getting stuck — we'll map the shortest path to shipped."
        cta={<CTAButton href="/talk-to-strategist" variant="lime" icon={ArrowRight}>Talk to a Strategist</CTAButton>}
      />
    </>
  );
}
