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
  SectionHead,
  DarkCTA,
  CTAButton,
  Pill,
  accentFor,
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

      {/* Sub-services grid */}
      <section className="w-full" style={{ background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
          <div className="rise-in">
            <SectionHead eyebrow="Services in this area" title="What" gradientWord="we build" />
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
            {category.subs.map((sub, i) => {
              const accent = accentFor(i);
              return (
                <Link
                  key={sub.slug}
                  href={`/solutions/${sub.slug}`}
                  className="rise-in group relative rounded-3xl p-[1.5px] transition-transform duration-300 hover:-translate-y-1.5"
                  style={{ background: `linear-gradient(150deg, ${accent}3a, ${accent}0a)` }}
                >
                  <div className="rounded-[22px] bg-white h-full p-7 flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-[#0F172A] leading-snug">{sub.displayName}</h3>
                      <ArrowRight size={18} strokeWidth={2.4} className="flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:translate-x-1" style={{ color: accent }} />
                    </div>
                    {sub.tagline ? (
                      <p className="text-sm text-slate-500 leading-relaxed italic">{sub.tagline}</p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {sub.stack.slice(0, 3).map((t) => (
                          <span key={t} className="text-[11px] font-mono font-medium bg-slate-50 text-slate-500 px-2.5 py-1 rounded-lg border border-slate-100">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-slate-500 leading-relaxed mt-auto">
                      {sub.timeline[0].phase} · <span className="font-medium text-slate-600">{sub.timeline[0].time}</span>
                    </p>
                  </div>
                </Link>
              );
            })}
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
