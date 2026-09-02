import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

/** Inline JSON-LD script. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** FAQPage schema object from a list of Q/A. */
export function faqSchema(faqs: FaqItem[]) {
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

/**
 * The one FAQ accordion used everywhere. One item open at a time.
 * Pass `emitSchema` to also inject FAQPage JSON-LD.
 */
export function FaqAccordion({
  faqs,
  idPrefix,
  emitSchema = false,
}: {
  faqs: FaqItem[];
  idPrefix: string;
  emitSchema?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      {emitSchema && <JsonLd data={faqSchema(faqs)} />}
      <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 overflow-hidden bg-white" style={{ boxShadow: "0 1px 4px 0 rgba(15,23,42,0.04)" }}>
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-a-${i}`}
                id={`${idPrefix}-q-${i}`}
                className="w-full text-left px-6 md:px-7 py-6 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors duration-150"
              >
                <span className="font-semibold text-[#0F172A] text-base leading-snug">{faq.q}</span>
                <ChevronDown
                  size={18}
                  strokeWidth={2.4}
                  aria-hidden="true"
                  className={`flex-shrink-0 text-[#0EA5E9] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div id={`${idPrefix}-a-${i}`} role="region" aria-labelledby={`${idPrefix}-q-${i}`} hidden={!isOpen}>
                {isOpen && (
                  <div className="px-6 md:px-7 pb-6 text-[#475569] text-base leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
