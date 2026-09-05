import { useMemo, useState } from "react";
import { ArrowRight, FolderGit2 } from "lucide-react";
import { useMeta } from "@/components/site/useMeta";
import { useSocialMeta } from "@/components/site/useSocialMeta";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { GridOverlay, Blob, GradientText, Eyebrow, DarkCTA, CTAButton } from "@/components/site/primitives";
import { ClientImpactSlider } from "@/components/ClientImpactSlider";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { HeroVideo } from "@/components/hero/HeroVideo";
import { getCaseStudies, CASE_STUDY_CATEGORIES } from "@/data/caseStudies";

const STATS = [
  { value: "08+", label: "Projects" },
  { value: "Multiple", label: "Industries" },
  { value: "AI +", label: "Automation" },
  { value: "End-to-End", label: "Delivery" },
];

export function CaseStudiesPage() {
  useMeta(
    "Case Studies | Infomist — Real Products, Real Systems, Real Results",
    "A closer look at the digital products, AI systems, automation workflows and platforms Infomist has designed and engineered for ambitious businesses.",
  );
  useSocialMeta({
    title: "Case Studies | Infomist",
    description:
      "The digital products, AI systems and automation workflows we've designed and engineered for ambitious businesses.",
    path: "/case-studies",
  });

  const studies = useMemo(() => getCaseStudies(), []);
  const [filter, setFilter] = useState<string>("All");
  const visible = filter === "All" ? studies : studies.filter((s) => s.category === filter);

  return (
    <>
      <div className="w-full min-h-screen pt-20 overflow-x-hidden">
        <section
          className="relative w-full overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}
        >
          <GridOverlay dark />
          <Blob color="rgba(14,165,233,0.2)" className="-top-24 -left-16" size={520} />
          <Blob color="rgba(132,204,22,0.14)" className="top-10 right-0" size={400} />

          <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-20 md:pb-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
              <Reveal className="flex flex-col gap-5 max-w-2xl">
                <Eyebrow icon={FolderGit2} dark>Proof</Eyebrow>
                <h1
                  className="font-black text-white leading-[1.02]"
                  style={{ fontSize: "clamp(2.6rem, 6.2vw, 4.25rem)", letterSpacing: "-0.045em" }}
                >
                  Proof that intelligent systems work in the <GradientText>real world.</GradientText>
                </h1>
                <p className="text-slate-400 text-xl leading-relaxed">
                  A closer look at the AI systems, automation workflows, platforms and products
                  Infomist has designed, engineered and put into production.
                </p>
                <div className="mt-2">
                  <CTAButton href="/talk-to-strategist" variant="lime" icon={ArrowRight}>
                    Book an AI Transformation Review
                  </CTAButton>
                </div>
              </Reveal>

              <Reveal className="hidden lg:block w-[420px]">
                <div
                  className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl"
                  style={{ border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <HeroVideo media="hero-case-studies" active />
                </div>
              </Reveal>
            </div>

            {/* Hero stats — subtle, uses the existing dark divider treatment */}
            <Reveal>
              <dl className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                {STATS.map((s) => (
                  <div key={s.label} className="flex flex-col gap-1 px-5 py-6" style={{ background: "#0F172A" }}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-2xl font-black text-white leading-none">{s.value}</dd>
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">{s.label}</span>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* Category filter — reuses the dark chip style from the cards */}
            <Reveal>
              <div className="mt-12 flex flex-wrap gap-2">
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
              </div>
            </Reveal>

            <RevealGroup className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map((study) => (
                <RevealItem key={study.slug}>
                  <CaseStudyCard study={study} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section className="w-full" style={{ background: "#F9FAFB" }}>
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
            <ClientImpactSlider />
          </div>
        </section>
      </div>

      <DarkCTA
        eyebrow="Have a project in mind?"
        title="Let's build the next one together."
        sub="Tell us where your product or operations are getting stuck — we'll map the shortest path to shipped."
        cta={<CTAButton href="/talk-to-strategist" variant="lime" icon={ArrowRight}>Talk to a Strategist</CTAButton>}
      />
    </>
  );
}
