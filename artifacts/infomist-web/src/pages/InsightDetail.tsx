import { useMemo } from "react";
import { useParams, Link } from "wouter";
import { ArrowRight, ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { useMeta } from "@/components/site/useMeta";
import { useSocialMeta } from "@/components/site/useSocialMeta";
import { JsonLd } from "@/components/site/Faq";
import { NotFoundBlock } from "@/components/site/NotFoundBlock";
import { Reveal } from "@/components/Reveal";
import { GridOverlay, HeroBlobs, DarkCTA, CTAButton } from "@/components/site/primitives";
import { ArticleBody } from "@/components/insights/ArticleBody";
import {
  getInsightBySlug,
  getPublishedInsights,
  getBloggingMedia,
} from "@/data/insightsBridge";

const SITE = "https://www.infomist.com";

export function InsightDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();

  const article = useMemo(() => getInsightBySlug(slug), [slug]);
  const related = useMemo(
    () =>
      article
        ? getPublishedInsights()
            .filter((a) => a.category.id === article.category.id && a.slug !== article.slug)
            .slice(0, 3)
        : [],
    [article],
  );
  const mediaMap = useMemo(() => {
    const list = getBloggingMedia();
    return (id: string | null) => (id ? list.find((m) => m.id === id) ?? null : null);
  }, []);

  useMeta(
    article ? `${article.seo.title} | Infomist Insights` : "Insights | Infomist",
    article?.seo.description ?? "",
  );
  useSocialMeta({
    title: article?.seo.title ?? "Insights",
    description: article?.seo.description ?? "",
    path: `/insights/${slug}`,
    image: article?.featureImage?.url,
    type: "article",
  });

  if (!article) {
    return (
      <NotFoundBlock
        title="Article not found."
        sub="That insight doesn't exist, or it hasn't been published yet."
        backHref="/resources"
        backLabel="Back to Insights"
      />
    );
  }

  const c = article.category.color;
  const ogImage = article.featureImage
    ? article.featureImage.url.startsWith("http")
      ? article.featureImage.url
      : `${SITE}${article.featureImage.url}`
    : undefined;

  return (
    <article className="w-full min-h-screen bg-white pt-20 overflow-x-hidden">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.seo.description,
          image: ogImage,
          datePublished: article.publishedAt,
          author: { "@type": "Person", name: article.authorName },
          publisher: { "@type": "Organization", name: "Infomist", url: SITE },
          mainEntityOfPage: `${SITE}/insights/${article.slug}`,
          articleSection: article.category.name,
        }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-slate-100 relative z-10">
        <nav aria-label="Breadcrumb" className="max-w-3xl mx-auto px-6 py-5 flex items-center gap-2 text-sm">
          <Link href="/" className="text-[#64748B] hover:text-[#0EA5E9] transition-colors font-medium">Home</Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <Link href="/resources" className="text-[#64748B] hover:text-[#0EA5E9] transition-colors font-medium">Insights</Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="text-[#0F172A] font-semibold truncate">{article.category.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "#FAFAFA" }}>
        <GridOverlay />
        <HeroBlobs />
        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-12 pb-10 md:pt-16 flex flex-col gap-5">
          <span
            className="self-start text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{ color: c, background: `${c}14`, border: `1px solid ${c}28` }}
          >
            {article.category.name}
          </span>
          <h1
            className="font-black text-[#0F172A] leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", letterSpacing: "-0.035em" }}
          >
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#64748B]">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#334155]">
              <User size={14} strokeWidth={2.2} /> {article.authorName}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} strokeWidth={2.2} /> {article.dateLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} strokeWidth={2.2} /> {article.readMinutes} min read
            </span>
          </div>
        </div>
      </section>

      {article.featureImage && (
        <div className="max-w-4xl mx-auto px-6 -mt-2 md:-mt-4">
          <img
            src={article.featureImage.url}
            alt={article.featureImage.alt}
            width={1200}
            height={675}
            className="w-full rounded-2xl border border-slate-200 shadow-sm"
          />
        </div>
      )}

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 py-14 md:py-16">
        <ArticleBody blocks={article.blocks} resolveMedia={mediaMap} />

        {(article.internalLinks.length > 0 || article.externalLinks.length > 0) && (
          <div className="mt-14 pt-10 border-t border-slate-200 grid gap-10 sm:grid-cols-2">
            {article.internalLinks.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#64748B]">Related on this site</span>
                <ul className="flex flex-col gap-2">
                  {article.internalLinks.map((l) => (
                    <li key={l.id}>
                      <Link href={l.href} className="group inline-flex items-center gap-2 text-sm font-semibold text-[#334155] hover:text-[#0EA5E9] transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] flex-shrink-0" aria-hidden="true" />
                        {l.label}
                        <ArrowRight size={13} strokeWidth={2.4} className="text-slate-300 group-hover:translate-x-0.5 group-hover:text-[#0EA5E9] transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {article.externalLinks.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#64748B]">References</span>
                <ul className="flex flex-col gap-2">
                  {article.externalLinks.map((l) => (
                    <li key={l.id}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#334155] hover:text-[#0EA5E9] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" aria-hidden="true" />
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="w-full" style={{ background: "#F9FAFB" }}>
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-2xl font-black text-[#0F172A] mb-8" style={{ letterSpacing: "-0.02em" }}>
              More in {article.category.name}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Reveal key={r.slug}>
                  <Link
                    href={`/insights/${r.slug}`}
                    className="group block h-full rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                  >
                    {r.featureImage && (
                      <img src={r.featureImage.url} alt={r.featureImage.alt} loading="lazy" className="h-40 w-full object-cover" />
                    )}
                    <div className="p-5 flex flex-col gap-2">
                      <h3 className="font-bold text-[#0F172A] leading-snug">{r.title}</h3>
                      <span className="text-xs text-[#64748B]">{r.dateLabel} · {r.authorName}</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-bold text-[#0EA5E9]">
          <ArrowLeft size={15} strokeWidth={2.6} /> All Insights
        </Link>
      </div>

      <DarkCTA
        eyebrow="Ready to move the work forward?"
        title="Let's put AI automation to work on your actual bottlenecks."
        sub="One focused call to map where it creates the most leverage for your team."
        cta={<CTAButton href="/talk-to-strategist" variant="lime" icon={ArrowRight}>Talk to a Strategist</CTAButton>}
      />
    </article>
  );
}
