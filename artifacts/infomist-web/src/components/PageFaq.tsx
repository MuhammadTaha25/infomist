import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

interface PageFaqProps {
  faqs: FaqItem[];
  idPrefix: string;
  heading?: string;
  subheading?: string;
}

function buildSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function PageFaq({
  faqs,
  idPrefix,
  heading = "Frequently Asked Questions",
  subheading = "Straight answers to the questions teams ask before working with us.",
}: PageFaqProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#F8FAFC] py-24 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(faqs)) }}
      />
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[#0EA5E9] bg-cyan-50 flex-shrink-0">
              <HelpCircle size={14} strokeWidth={2.4} />
            </span>
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#0EA5E9]">FAQ</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            {heading}
          </h2>
          <p className="text-[#475569] text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            {subheading}
          </p>
        </div>

        <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 overflow-hidden bg-white shadow-sm">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`${idPrefix}-ans-${i}`}
                  id={`${idPrefix}-q-${i}`}
                  className="w-full text-left px-7 py-6 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors duration-150"
                >
                  <span className="font-semibold text-[#0F172A] text-base leading-snug">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    strokeWidth={2.4}
                    aria-hidden="true"
                    className={`flex-shrink-0 text-[#0EA5E9] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  id={`${idPrefix}-ans-${i}`}
                  role="region"
                  aria-labelledby={`${idPrefix}-q-${i}`}
                  hidden={!isOpen}
                >
                  {isOpen && (
                    <div className="px-7 pb-6 text-[#475569] text-base leading-relaxed border-t border-slate-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm">
            Still have questions?{" "}
            <Link href="/talk-to-strategist" className="text-[#0EA5E9] font-semibold hover:underline">
              Talk to a Strategist
            </Link>{" "}
            — we respond within one business day.
          </p>
        </div>
      </div>
    </section>
  );
}
