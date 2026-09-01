import { useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";


const CATEGORIES = ["All", "AI Automation", "Web Architecture", "Digital Marketing", "SEO", "SaaS"];

const ARTICLES = [
  {
    category: "AI Automation",
    categoryColor: "#0EA5E9",
    title: "How Autonomous Agents Are Replacing Manual Workflow Bottlenecks",
    excerpt:
      "We explore how AI-driven orchestration layers eliminate repetitive handoffs, cutting operational overhead by up to 70% in enterprise pipelines.",
    date: "Jun 12, 2026",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
  },
  {
    category: "Web Architecture",
    categoryColor: "#84CC16",
    title: "The Composable Stack: Building for Longevity in 2026",
    excerpt:
      "Monoliths are out. Discover the modular, API-first principles that help engineering teams ship faster without accumulating crippling technical debt.",
    date: "May 28, 2026",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
  },
  {
    category: "PropTech",
    categoryColor: "#8B5CF6",
    title: "Voice AI in Real Estate: From Lead Capture to Lease Signing",
    excerpt:
      "LiveKit-powered voice agents are transforming PropTech — qualifying leads, scheduling viewings, and answering queries around the clock without a human agent.",
    date: "May 14, 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
  },
];

function ArticleCard({ article }: { article: typeof ARTICLES[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="bg-white rounded-xl overflow-hidden flex flex-col cursor-pointer group"
      style={{
        border: "1px solid #E2E8F0",
        boxShadow: hovered
          ? "0 16px 40px -8px rgba(15,23,42,0.14), 0 4px 12px -2px rgba(14,165,233,0.08)"
          : "0 1px 4px 0 rgba(15,23,42,0.04)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "box-shadow 0.22s ease, transform 0.22s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-48 flex-shrink-0 overflow-hidden">
        <img
          src={article.img}
          alt={article.title}
          className="object-cover h-48 w-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-3 p-6 flex-1">
        <span
          className="self-start text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{
            color: article.categoryColor,
            background: `${article.categoryColor}14`,
            border: `1px solid ${article.categoryColor}28`,
          }}
        >
          {article.category}
        </span>
        <h3
          className="text-base font-bold leading-snug transition-colors duration-200"
          style={{ color: hovered ? "#0EA5E9" : "#0F172A" }}
        >
          {article.title}
        </h3>
        <p
          className="text-sm text-[#475569] leading-relaxed"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, #0EA5E9, #84CC16)" }} />
            <span className="text-xs text-[#475569] font-medium">{article.date}</span>
          </div>
          <span className="text-xs text-[#94A3B8]">{article.readTime}</span>
        </div>
      </div>
    </article>
  );
}

function CategoryTabs({ active, onSelect }: { active: string; onSelect: (c: string) => void }) {
  return (
    <div
      className="inline-flex flex-wrap items-center gap-1 p-1.5 rounded-full self-start"
      style={{ background: "white", border: "1px solid #E2E8F0", boxShadow: "0 1px 4px 0 rgba(15,23,42,0.04)" }}
    >
      {CATEGORIES.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200"
            style={{
              color: isActive ? "white" : "#475569",
              background: isActive ? "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)" : "transparent",
              boxShadow: isActive ? "0 4px 14px 0 rgba(14,165,233,0.35)" : "none",
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

export function Insights() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <section id="insights" className="w-full bg-[#F9FAFB] py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <Reveal className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0EA5E9]">Insights &amp; Resources</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight" style={{ letterSpacing: "-0.025em" }}>
            Engineering Insights.
          </h2>
          <p className="text-[#475569] text-lg max-w-md leading-relaxed">
            Our latest notes on AI automation and scalable web architecture.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CategoryTabs active={activeCategory} onSelect={setActiveCategory} />
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0EA5E9] hover:text-[#0284C7] transition-colors duration-150 group flex-shrink-0"
          >
            View all Insights
            <svg className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </a>
        </Reveal>

        {filtered.length > 0 ? (
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <RevealItem key={article.title}>
                <ArticleCard article={article} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <div
            className="rounded-2xl p-12 flex flex-col items-center justify-center gap-2 text-center"
            style={{ background: "white", border: "1px dashed #CBD5E1" }}
          >
            <p className="text-[#0F172A] font-bold">More {activeCategory} guides coming soon.</p>
            <p className="text-sm text-[#94A3B8]">Check back shortly, or browse another category above.</p>
          </div>
        )}

        <Reveal
          className="rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-white font-bold text-lg">Stay ahead of the curve.</p>
            <p className="text-slate-400 text-sm">Get our engineering notes delivered fortnightly — no noise, just signal.</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <input
              type="email"
              placeholder="your@email.com"
              className="px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-slate-500 outline-none focus:border-[#0EA5E9] transition-colors duration-150 w-56"
              aria-label="Email address for newsletter"
            />
            <button
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex-shrink-0 transition-all duration-200"
              style={{ background: "#0EA5E9" }}
            >
              Subscribe
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
