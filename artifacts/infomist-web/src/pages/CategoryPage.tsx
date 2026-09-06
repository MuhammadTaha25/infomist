import { useParams, Link } from "wouter";
import { ArrowRight, HelpCircle } from "lucide-react";
import { findCategory } from "@/data/solutionsData";
import { HeroVisual, heroVariantForRoute } from "@/components/hero/HeroVisual";
import { PageHeroVideo } from "@/components/hero/PageHeroVideo";
import { FLAGSHIP_HEROES } from "@/data/flagshipHeroes";
import { useMeta } from "@/components/site/useMeta";
import { JsonLd, faqSchema, FaqAccordion } from "@/components/site/Faq";
import { NotFoundBlock } from "@/components/site/NotFoundBlock";
import {
  GridOverlay,
  HeroBlobs,
  GradientText,
  Eyebrow,
  IconTile,
  DarkCTA,
  CTAButton,
  Pill,
} from "@/components/site/primitives";

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? findCategory(slug) : null;

  useMeta(
    category ? (category.metaTitle ?? `${category.name} Services | Infomist`) : "Infomist — Services",
    category
      ? (category.metaDescription ?? `Expert ${category.name.toLowerCase()} services. ${category.blurb} Serving businesses in the US, Canada & UK.`)
      : "Infomist delivers custom software, AI, design, and growth services.",
  );

  if (!category) {
    return (
      <NotFoundBlock
        title="Category not found."
        sub="That solution area doesn't exist, or the link has changed."
        backHref="/solutions"
        backLabel="Back to Solutions"
      />
    );
  }

  const Icon = category.icon;
  const flagship = FLAGSHIP_HEROES[category.slug];

  const breadcrumb = (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2">
      <Link href="/solutions" className="hover:text-[#27C7E8] transition-colors duration-150 font-medium">
        Solutions
      </Link>
      <span aria-hidden="true">/</span>
      <span className="text-[#F4F8FC] font-semibold">{category.name}</span>
    </nav>
  );

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <JsonLd data={faqSchema(category.categoryFaqs)} />

      {flagship ? (
        <PageHeroVideo
          breadcrumb={breadcrumb}
          eyebrow={flagship.eyebrow}
          title={flagship.title}
          accent={flagship.accent}
          sub={flagship.sub}
          primary={flagship.primary}
          secondary={flagship.secondary}
          media={flagship.media}
          evidence={flagship.evidence}
        />
      ) : (
        <>
          {/* Breadcrumb */}
          <div className="border-b border-slate-100 relative z-10 pt-20">
            <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-2 text-sm">
              <Link href="/solutions" className="text-[#64748B] hover:text-[#0EA5E9] transition-colors duration-150 font-medium">
                Solutions
              </Link>
              <span className="text-slate-300" aria-hidden="true">/</span>
              <span className="text-[#0F172A] font-semibold">
                <span className="font-mono text-xs text-[#0EA5E9] mr-1.5">{category.tag}</span>
                {category.name}
              </span>
            </nav>
          </div>

          {/* Hero */}
          <section className="relative overflow-hidden" style={{ background: "#FAFAFA" }}>
            <GridOverlay />
            <HeroBlobs />
            <HeroVisual variant={heroVariantForRoute(category.slug)} />
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
                  <Eyebrow>{category.tag} · Solutions</Eyebrow>
                </div>
                <h1 className="font-black text-[#0F172A] leading-[1.02]" style={{ fontSize: "clamp(2.6rem, 6.4vw, 4.5rem)", letterSpacing: "-0.045em" }}>
                  {category.name}
                </h1>
                <p className="text-[#0EA5E9] text-xl font-semibold max-w-2xl">{category.blurb}</p>
                {category.keywordLine && (
                  <p className="text-[#64748B] text-base leading-relaxed max-w-2xl">{category.keywordLine}</p>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Sub-services — editorial list on a light-blue band */}
      <section className="w-full" style={{ background: "#F1F6FD" }}>
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-[clamp(5rem,11vw,9rem)]">
          <div className="rise-in mb-10 flex items-baseline justify-between gap-4 border-b border-[#DCE3EC] pb-4">
            <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0284C7]">
              <span className="tabular-nums text-[#94A3B8]">{category.tag}</span>
              <span aria-hidden className="h-px w-6 bg-[#DCE3EC]" />
              Services in this area
            </p>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[#AEB9C7] sm:block">
              {String(category.subs.length).padStart(2, "0")} services
            </span>
          </div>

          <h2
            className="rise-in font-black leading-[1.04] tracking-[-0.04em] text-[#0F172A] max-w-[14ch]"
            style={{ fontSize: "clamp(2.15rem,5.4vw,4rem)" }}
          >
            What we build.
          </h2>

          <div className="mt-14 border-t border-[#DCE7F4]">
            {category.subs.map((sub, i) => (
              <Link
                key={sub.slug}
                href={`/solutions/${sub.slug}`}
                className="rise-in group relative grid grid-cols-[2rem_1fr_auto] items-start gap-x-4 border-b border-l-2 border-l-transparent border-[#DCE7F4] py-7 pl-3 transition-[background-color,border-color,box-shadow] duration-300 hover:border-l-[#0EA5E9] hover:bg-white hover:shadow-[0_10px_34px_rgba(7,20,38,0.06)] md:grid-cols-[3.5rem_20rem_1fr_auto] md:gap-x-8 md:pl-5"
                style={{ animationDelay: `${Math.min(i, 8) * 55}ms` }}
              >
                <span className="font-mono text-[13px] leading-7 text-[#94A3B8] transition-colors duration-300 group-hover:text-[#0284C7]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-bold text-[#0F172A] transition-transform duration-300 group-hover:translate-x-1 md:text-lg">
                  {sub.displayName}
                </h3>
                <p className="col-start-2 max-w-xl text-[15px] leading-relaxed text-[#475569] md:col-start-3">
                  {sub.tagline ?? `${sub.timeline[0].phase} · ${sub.timeline[0].time}`}
                </p>
                <ArrowRight
                  size={17}
                  className="col-start-3 mt-1 shrink-0 -translate-x-1 self-start text-[#0EA5E9] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:col-start-4"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category FAQ */}
      <section className="w-full" style={{ background: "#F9FAFB" }}>
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-28">
          <div className="mb-10 rise-in">
            <Eyebrow icon={HelpCircle}>FAQ</Eyebrow>
            <h2 className="mt-4 font-black text-[#0F172A] max-w-2xl" style={{ fontSize: "clamp(1.9rem, 4vw, 2.7rem)", letterSpacing: "-0.035em" }}>
              Common questions about {category.name}
            </h2>
          </div>
          <div className="rise-in">
            <FaqAccordion key={`cat-${category.id}`} faqs={category.categoryFaqs} idPrefix={`cat-${category.id}`} />
          </div>
        </div>
      </section>

      <DarkCTA
        eyebrow="Ready to get started?"
        title={<>Let's scope your {category.name.toLowerCase()} project.</>}
        sub="One focused call to map your requirements, timeline, and stack — no obligation, no generic sales pitch."
        cta={<CTAButton href="/talk-to-strategist" variant="lime" icon={ArrowRight}>Talk to a Strategist</CTAButton>}
      />
    </div>
  );
}
