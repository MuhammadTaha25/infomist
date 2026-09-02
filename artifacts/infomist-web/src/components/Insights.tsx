import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Newspaper } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHead, GridOverlay, Blob } from "@/components/site/primitives";
import { usePublishedInsights, type InsightArticle } from "@/data/insightsBridge";

function ArticleCard({ article }: { article: InsightArticle }) {
  const c = article.category.color;
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group relative block rounded-3xl p-[1.5px] h-full transition-transform duration-300 hover:-translate-y-1.5"
      style={{ background: `linear-gradient(150deg, ${c}3a, ${c}0a)` }}
    >
      <div className="rounded-[22px] bg-white h-full flex flex-col overflow-hidden">
        <div className="h-48 flex-shrink-0 overflow-hidden bg-slate-100">
          {article.featureImage && (
            <img
              src={article.featureImage.url}
              alt={article.featureImage.alt}
              width={800}
              height={480}
              loading="lazy"
              className="object-cover h-48 w-full transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-col gap-3 p-6 flex-1">
          <span
            className="self-start text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{ color: c, background: `${c}14`, border: `1px solid ${c}28` }}
          >
            {article.category.name}
          </span>
          <h3 className="text-lg font-bold leading-snug text-[#0F172A]">{article.title}</h3>
          <p
            className="text-sm text-[#475569] leading-relaxed"
            style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          >
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
            <span className="text-xs text-[#475569] font-medium">{article.dateLabel}</span>
            <span className="text-xs text-[#94A3B8]">
              {article.authorName} · {article.readMinutes} min read
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function CategoryTabs({
  categories,
  active,
  onSelect,
}: {
  categories: string[];
  active: string;
  onSelect: (c: string) => void;
}) {
  return (
    <div
      className="inline-flex flex-wrap items-center gap-1 p-1.5 rounded-full self-start"
      style={{ background: "white", border: "1px solid #E2E8F0", boxShadow: "0 1px 4px 0 rgba(15,23,42,0.04)" }}
    >
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200"
            style={{
              color: isActive ? "white" : "#475569",
              background: isActive ? "linear-gradient(120deg, #0EA5E9, #0284C7)" : "transparent",
              boxShadow: isActive ? "0 6px 18px -4px rgba(14,165,233,0.45)" : "none",
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Public Insights section. Reads published posts from the /blogging store
 * (see src/data/insightsBridge.ts) — one source of truth, no second blog system.
 *
 * `limit` caps the count (Home shows 3); omit it on the /resources page.
 */
export function Insights({ limit }: { limit?: number }) {
  const all = usePublishedInsights();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(all.map((a) => a.category.name)))],
    [all],
  );

  const filtered = useMemo(() => {
    const inCat = activeCategory === "All" ? all : all.filter((a) => a.category.name === activeCategory);
    return limit ? inCat.slice(0, limit) : inCat;
  }, [all, activeCategory, limit]);

  return (
    <section id="insights" className="w-full" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-28 flex flex-col gap-10">
        <Reveal>
          <SectionHead
            icon={Newspaper}
            eyebrow="Insights & Resources"
            title="Engineering"
            gradientWord="Insights."
            sub="Practical notes on AI automation, web architecture, marketing, SEO, and SaaS — published from our editorial team."
          />
        </Reveal>

        <Reveal className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CategoryTabs categories={categories} active={activeCategory} onSelect={setActiveCategory} />
          {limit && all.length > limit && (
            <Link href="/resources" className="group inline-flex items-center gap-2 text-sm font-bold text-[#0EA5E9] flex-shrink-0">
              View all Insights
              <ArrowRight size={15} strokeWidth={2.6} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          )}
        </Reveal>

        {filtered.length > 0 ? (
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <RevealItem key={article.id}>
                <ArticleCard article={article} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <div
            className="rounded-2xl p-12 flex flex-col items-center justify-center gap-2 text-center"
            style={{ background: "white", border: "1px dashed #CBD5E1" }}
          >
            <p className="text-[#0F172A] font-bold">
              {all.length === 0 ? "No published articles yet." : `More ${activeCategory} guides coming soon.`}
            </p>
            <p className="text-sm text-[#94A3B8]">
              {all.length === 0
                ? "Articles published from the editorial tool appear here."
                : "Check back shortly, or browse another category above."}
            </p>
          </div>
        )}

        <Reveal
          className="relative overflow-hidden rounded-[28px] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "linear-gradient(150deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}
        >
          <GridOverlay dark />
          <Blob color="rgba(14,165,233,0.2)" className="-top-16 -left-8" size={280} />
          <div className="relative flex flex-col gap-1">
            <p className="text-white font-black text-xl" style={{ letterSpacing: "-0.02em" }}>Stay ahead of the curve.</p>
            <p className="text-slate-400 text-sm">Get our engineering notes delivered fortnightly — no noise, just signal.</p>
          </div>
          <div className="relative flex items-center gap-3 flex-shrink-0">
            <input
              type="email"
              placeholder="your@email.com"
              className="px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/15 text-white placeholder-slate-500 outline-none focus:border-[#0EA5E9] transition-colors duration-150 w-56"
              aria-label="Email address for newsletter"
            />
            <button
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white flex-shrink-0 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(120deg,#0EA5E9,#0284C7)" }}
            >
              Subscribe
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
