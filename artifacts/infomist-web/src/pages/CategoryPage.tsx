import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, HelpCircle, ChevronDown } from "lucide-react";
import { findCategory } from "@/data/solutionsData";
import type { Faq } from "@/data/solutionsData";

function useMeta(title: string, description: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    let metaEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = metaEl?.content ?? "";
    if (!metaEl) {
      metaEl = document.createElement("meta");
      metaEl.name = "description";
      document.head.appendChild(metaEl);
    }
    metaEl.content = description;
    return () => {
      document.title = prev;
      if (metaEl) metaEl.content = prevDesc;
    };
  }, [title, description]);
}

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function FaqAccordion({ faqs, idPrefix }: { faqs: Faq[]; idPrefix: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 overflow-hidden bg-white">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`${idPrefix}-ans-${i}`}
              id={`${idPrefix}-q-${i}`}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors duration-150"
            >
              <span className="font-semibold text-[#0F172A] text-base leading-snug">{faq.q}</span>
              <ChevronDown
                size={18}
                strokeWidth={2.4}
                className={`flex-shrink-0 text-[#0EA5E9] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div id={`${idPrefix}-ans-${i}`} role="region" aria-labelledby={`${idPrefix}-q-${i}`} hidden={!isOpen}>
              {isOpen && (
                <div className="px-6 pb-5 text-[#475569] text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? findCategory(slug) : null;

  useMeta(
    category
      ? (category.metaTitle ?? `${category.name} Services | Infomist`)
      : "Infomist — Services",
    category
      ? (category.metaDescription ?? `Expert ${category.name.toLowerCase()} services. ${category.blurb} Serving businesses in the US, Canada & UK.`)
      : "Infomist delivers custom software, AI, design, and growth services."
  );

  if (!category) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center gap-6 pt-20">
        <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#0EA5E9]">404</span>
        <h1 className="text-4xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.03em" }}>
          Category not found.
        </h1>
        <Link href="/solutions" className="px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "#0EA5E9" }}>
          Back to Solutions
        </Link>
      </div>
    );
  }

  const Icon = category.icon;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: category.categoryFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="w-full min-h-screen bg-white pt-20 overflow-x-hidden">
      <JsonLd data={faqSchema} />

      {/* Breadcrumb */}
      <div className="border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-2 text-sm">
          <Link href="/solutions" className="text-slate-500 hover:text-[#0EA5E9] transition-colors duration-150 font-medium">
            Solutions
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-[#0F172A] font-semibold">
            <span className="font-mono text-xs text-[#0EA5E9] mr-1.5">{category.tag}</span>
            {category.name}
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 md:pt-28 pb-16 md:pb-20 overflow-hidden">
        <div
          className="absolute -top-32 -left-20 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.14) 0%, transparent 70%)", filter: "blur(30px)" }}
        />
        <motion.div className="relative z-10" initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
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
            <span className="text-xs font-bold tracking-[0.24em] uppercase text-[#0EA5E9]">{category.tag}</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-black text-[#0F172A] leading-[1.02] max-w-4xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            {category.name}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[#0EA5E9] text-xl font-semibold mt-5 max-w-xl">
            {category.blurb}
          </motion.p>
          {category.keywordLine && (
            <motion.p variants={fadeUp} className="text-[#64748B] text-base leading-relaxed mt-4 max-w-2xl">
              {category.keywordLine}
            </motion.p>
          )}
        </motion.div>
      </section>

      {/* Sub-services grid */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20 border-t border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#0EA5E9] block mb-3">Services in this area</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.03em" }}>
            What we build
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {category.subs.map((sub) => (
            <motion.div key={sub.slug} variants={fadeUp}>
              <Link href={`/solutions/${sub.slug}`}>
                <div className="group rounded-2xl border border-slate-100 bg-white p-7 hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-250 cursor-pointer h-full flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-[#0F172A] leading-snug group-hover:text-[#0EA5E9] transition-colors duration-150">
                      {sub.displayName}
                    </h3>
                    <ArrowRight
                      size={18}
                      strokeWidth={2.2}
                      className="flex-shrink-0 text-slate-300 group-hover:text-[#0EA5E9] group-hover:translate-x-0.5 transition-all duration-150 mt-0.5"
                    />
                  </div>
                  {sub.tagline ? (
                    <p className="text-sm text-slate-500 leading-relaxed italic">{sub.tagline}</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {sub.stack.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono font-medium bg-slate-50 text-slate-500 px-2.5 py-1 rounded-lg border border-slate-100"
                        >
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
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Category FAQ */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20 border-t border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[#0EA5E9] bg-cyan-50">
              <HelpCircle size={14} strokeWidth={2.4} />
            </span>
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#0EA5E9]">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] max-w-2xl" style={{ letterSpacing: "-0.03em" }}>
            Common questions about {category.name}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FaqAccordion key={`cat-${category.id}`} faqs={category.categoryFaqs} idPrefix={`cat-${category.id}`} />
        </motion.div>
      </section>

      {/* CTA */}
      <section className="w-full px-6 py-20 md:py-24">
        <div
          className="max-w-6xl mx-auto rounded-[32px] px-8 md:px-16 py-14 md:py-18 flex flex-col items-center text-center gap-6 relative overflow-hidden"
          style={{ background: "linear-gradient(150deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}
        >
          <div
            className="absolute -top-24 left-1/4 w-[420px] h-[420px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.22) 0%, transparent 70%)", filter: "blur(30px)" }}
          />
          <span className="relative z-10 text-xs font-bold tracking-[0.24em] uppercase text-[#84CC16]">
            Ready to get started?
          </span>
          <h3
            className="relative z-10 text-3xl md:text-5xl font-black text-white leading-[1.05] max-w-2xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Let's scope your {category.name.toLowerCase()} project.
          </h3>
          <p className="relative z-10 text-slate-400 text-base md:text-lg max-w-md leading-relaxed">
            One focused call to map your requirements, timeline, and stack — no obligation, no generic sales pitch.
          </p>
          <Link
            href="/talk-to-strategist"
            className="relative z-10 group inline-flex items-center gap-2.5 px-9 py-4 rounded-xl text-base font-bold text-[#0F172A] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{ background: "#84CC16", boxShadow: "0 8px 32px 0 rgba(132,204,22,0.3)" }}
          >
            Talk to a Strategist
            <ArrowRight size={18} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
