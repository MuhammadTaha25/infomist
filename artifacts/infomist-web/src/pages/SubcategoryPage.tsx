import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, ArrowRight, Terminal, ChevronDown, HelpCircle } from "lucide-react";
import { findSubcategory } from "@/data/solutionsData";
import type { Faq } from "@/data/solutionsData";

/* ─── SEO helpers ──────────────────────────────────────────────────── */

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

/* ─── FAQ accordion ─────────────────────────────────────────────────── */

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
              aria-controls={`${idPrefix}-answer-${i}`}
              id={`${idPrefix}-question-${i}`}
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
            <div
              id={`${idPrefix}-answer-${i}`}
              role="region"
              aria-labelledby={`${idPrefix}-question-${i}`}
              hidden={!isOpen}
            >
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

/* ─── Shared UI primitives ──────────────────────────────────────────── */

function CtaButton() {
  return (
    <Link
      href="/talk-to-strategist"
      className="group inline-flex items-center gap-2.5 px-9 py-4.5 rounded-xl text-base font-bold text-[#0F172A] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{ background: "#84CC16", boxShadow: "0 8px 32px 0 rgba(132,204,22,0.3)" }}
    >
      Talk to a Strategist
      <ArrowRight size={18} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

function Eyebrow({
  icon: Icon,
  children,
  tone = "cyan",
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  children: React.ReactNode;
  tone?: "cyan" | "amber" | "slate";
}) {
  const toneMap = {
    cyan: "text-[#0EA5E9] bg-cyan-50",
    amber: "text-amber-600 bg-amber-50",
    slate: "text-slate-500 bg-slate-100",
  } as const;
  return (
    <div className="flex items-center gap-2.5 mb-6">
      <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${toneMap[tone]}`}>
        <Icon size={14} strokeWidth={2.4} />
      </span>
      <span
        className={`text-xs font-bold tracking-[0.22em] uppercase ${
          tone === "cyan" ? "text-[#0EA5E9]" : tone === "amber" ? "text-amber-600" : "text-slate-500"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* ─── Page ──────────────────────────────────────────────────────────── */

export function SubcategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const match = slug ? findSubcategory(slug) : null;

  useMeta(
    match ? match.sub.metaTitle : "Infomist — Services",
    match ? match.sub.metaDescription : "Infomist delivers custom software, AI, design, and growth services."
  );

  if (!match) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center gap-6 pt-20">
        <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#0EA5E9]">404</span>
        <h1 className="text-4xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.03em" }}>
          Solution not found.
        </h1>
        <Link href="/solutions" className="px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "#0EA5E9" }}>
          Back to Solutions
        </Link>
      </div>
    );
  }

  const { category, sub } = match;
  const Icon = category.icon;

  /* FAQPage JSON-LD */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sub.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="w-full min-h-screen bg-white pt-20 overflow-x-hidden">
      <JsonLd data={faqSchema} />

      {/* Breadcrumb */}
      <div className="border-b border-slate-100 relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-2 text-sm">
          <Link href="/solutions" className="text-slate-500 hover:text-[#0EA5E9] transition-colors duration-150 font-medium">
            Solutions
          </Link>
          <span className="text-slate-300">/</span>
          <Link href={`/solutions/${category.slug}`} className="text-slate-500 hover:text-[#0EA5E9] transition-colors duration-150 font-medium">
            <span className="font-mono text-xs text-[#0EA5E9] mr-1.5">{category.tag}</span>
            {category.name}
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-[#0F172A] font-semibold">{sub.displayName}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 md:pt-28 pb-20 md:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.15) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 60% at 30% 0%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 30% 0%, black 40%, transparent 100%)",
          }}
        />
        <div
          className="absolute -top-32 -left-20 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.16) 0%, transparent 70%)", filter: "blur(30px)" }}
        />
        <div
          className="absolute top-10 right-0 w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(132,204,22,0.12) 0%, transparent 70%)", filter: "blur(40px)" }}
        />

        <motion.div className="relative z-10" initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <span
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative"
              style={{
                background: "linear-gradient(145deg, rgba(14,165,233,0.12), rgba(14,165,233,0.04))",
                border: "1px solid rgba(14,165,233,0.18)",
                boxShadow: "0 0 0 6px rgba(14,165,233,0.05), 0 8px 24px rgba(14,165,233,0.12)",
              }}
            >
              <Icon size={26} strokeWidth={1.7} className="text-[#0EA5E9]" />
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold tracking-[0.24em] uppercase text-[#0EA5E9]">
                {category.tag} · {category.name}
              </span>
              <span className="w-8 h-[3px] rounded-full" style={{ background: "#84CC16" }} />
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-black text-[#0F172A] leading-[1.02] max-w-4xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            {sub.displayName}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-[#0EA5E9] text-lg md:text-xl font-semibold max-w-2xl mt-6">
            {category.blurb}
          </motion.p>

          <motion.p variants={fadeUp} className="text-[#475569] text-base md:text-lg max-w-xl mt-4 leading-relaxed">
            A focused engagement built specifically around {sub.displayName.toLowerCase()} — scoped, staffed, and shipped by
            senior engineers, not a generic playbook.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10">
            <CtaButton />
          </motion.div>
        </motion.div>
      </section>

      {/* Pain Points vs Benefits */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <Eyebrow icon={AlertTriangle} tone="slate">The Problem → The Fix</Eyebrow>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-2">
          {/* Pain points */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="relative rounded-3xl p-1.5"
            style={{ background: "linear-gradient(160deg, rgba(245,158,11,0.14), rgba(245,158,11,0.02))" }}
          >
            <div className="rounded-[20px] bg-white p-6 md:p-8 h-full">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-600 mb-6 flex items-center gap-2">
                <AlertTriangle size={14} strokeWidth={2.4} />
                Pain Points
              </p>
              <div className="flex flex-col gap-3">
                {sub.painPoints.map((p) => (
                  <motion.div
                    key={p}
                    variants={fadeUp}
                    className="flex items-start gap-3.5 rounded-xl border border-amber-100 bg-amber-50/40 px-4 py-3.5 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md hover:shadow-amber-100/60 hover:border-amber-200"
                  >
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle size={12} strokeWidth={2.6} />
                    </span>
                    <p className="text-sm text-[#0F172A] leading-relaxed">{p}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="relative rounded-3xl p-1.5"
            style={{ background: "linear-gradient(160deg, rgba(14,165,233,0.16), rgba(132,204,22,0.05))" }}
          >
            <div className="rounded-[20px] bg-white p-6 md:p-8 h-full">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#0EA5E9] mb-6 flex items-center gap-2">
                <CheckCircle2 size={14} strokeWidth={2.4} />
                Benefits
              </p>
              <div className="flex flex-col gap-3">
                {sub.benefits.map((b) => (
                  <motion.div
                    key={b}
                    variants={fadeUp}
                    className="flex items-start gap-3.5 rounded-xl border border-cyan-100 bg-cyan-50/40 px-4 py-3.5 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md hover:shadow-cyan-100/60 hover:border-cyan-200"
                  >
                    <span className="w-6 h-6 rounded-full bg-cyan-100 text-[#0EA5E9] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={12} strokeWidth={2.6} />
                    </span>
                    <p className="text-sm text-[#0F172A] leading-relaxed">{b}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <Eyebrow icon={Terminal} tone="slate">Tech Stack</Eyebrow>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="flex flex-wrap gap-3"
        >
          {sub.stack.map((t) => (
            <motion.span
              key={t}
              variants={fadeUp}
              className="group flex items-center gap-2 bg-[#0F172A] text-cyan-300 font-mono text-[12px] tracking-wide px-4 py-2.5 rounded-xl border border-white/5 transition-all duration-250 hover:-translate-y-1 hover:border-cyan-400/40 cursor-default"
              style={{ boxShadow: "0 2px 10px rgba(15,23,42,0.15)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] flex-shrink-0 transition-transform duration-250 group-hover:scale-125" />
              {t}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <Eyebrow icon={ArrowRight} tone="cyan">Development Timeline</Eyebrow>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="relative max-w-3xl"
        >
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-slate-200" aria-hidden="true" />
          <div className="flex flex-col gap-3">
            {sub.timeline.map((row, i) => (
              <motion.div
                key={row.phase}
                variants={fadeUp}
                className="group relative flex items-center gap-5 rounded-2xl border border-slate-100 bg-white px-5 py-5 transition-all duration-250 hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-0.5 hover:border-cyan-100"
              >
                <span
                  className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-black text-sm text-white transition-transform duration-250 group-hover:scale-110"
                  style={{
                    background: i === sub.timeline.length - 1 ? "#84CC16" : "#0EA5E9",
                    boxShadow: `0 0 0 4px white, 0 0 0 5px ${i === sub.timeline.length - 1 ? "rgba(132,204,22,0.25)" : "rgba(14,165,233,0.25)"}`,
                  }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                  <span className="text-sm md:text-base font-semibold text-[#0F172A]">{row.phase}</span>
                  <span
                    className="text-sm font-bold flex-shrink-0 px-3 py-1 rounded-full w-fit"
                    style={{
                      color: i === sub.timeline.length - 1 ? "#65A30D" : "#0284C7",
                      background: i === sub.timeline.length - 1 ? "rgba(132,204,22,0.1)" : "rgba(14,165,233,0.08)",
                    }}
                  >
                    {row.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="text-xs text-slate-400 mt-6 leading-relaxed max-w-2xl">
          Timelines shown are estimated ranges for 2026 engagements and are confirmed after a scoping call based on your specific requirements.
        </p>
      </section>

      {/* Sub-category FAQ section */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Eyebrow icon={HelpCircle} tone="cyan">Frequently Asked Questions</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] max-w-2xl" style={{ letterSpacing: "-0.03em" }}>
            Common questions about {sub.displayName}
          </h2>
          <p className="text-[#475569] mt-3 text-base max-w-xl leading-relaxed">
            Straight answers to the questions teams ask before starting a {sub.displayName.toLowerCase()} engagement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FaqAccordion key={`sub-${slug}`} faqs={sub.faqs} idPrefix={`sub-${slug}`} />
        </motion.div>
      </section>

      {/* CTA */}
      <section className="w-full px-6 py-24 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-6xl mx-auto rounded-[32px] px-8 md:px-16 py-16 md:py-20 flex flex-col items-center text-center gap-6 relative overflow-hidden"
          style={{ background: "linear-gradient(150deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}
        >
          <div
            className="absolute -top-24 left-1/4 w-[420px] h-[420px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.22) 0%, transparent 70%)", filter: "blur(30px)" }}
          />
          <div
            className="absolute -bottom-24 right-1/4 w-[360px] h-[360px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(132,204,22,0.18) 0%, transparent 70%)", filter: "blur(30px)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.25]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
            }}
          />

          <span className="relative z-10 text-xs font-bold tracking-[0.24em] uppercase text-[#84CC16]">
            Ready to build {sub.displayName}?
          </span>
          <h3
            className="relative z-10 text-3xl md:text-5xl font-black text-white leading-[1.05] max-w-2xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Let's scope your project with a systems architect.
          </h3>
          <p className="relative z-10 text-slate-400 text-base md:text-lg max-w-md leading-relaxed">
            One focused call to map your requirements, timeline, and stack — no obligation, no generic sales pitch.
          </p>
          <div className="relative z-10 mt-2">
            <CtaButton />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
