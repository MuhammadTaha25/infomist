import { Link } from "wouter";
import { HelpCircle } from "lucide-react";
import { Eyebrow } from "@/components/site/primitives";
import { FaqAccordion, type FaqItem } from "@/components/site/Faq";

export type { FaqItem };

interface PageFaqProps {
  faqs: FaqItem[];
  idPrefix: string;
  heading?: string;
  subheading?: string;
}

export function PageFaq({
  faqs,
  idPrefix,
  heading = "Frequently Asked Questions",
  subheading = "Straight answers to the questions teams ask before working with us.",
}: PageFaqProps) {
  return (
    <section className="w-full bg-[#F8FAFC] py-24 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12 flex flex-col items-center text-center gap-4 rise-in">
          <Eyebrow icon={HelpCircle}>FAQ</Eyebrow>
          <h2
            className="font-black text-[#0F172A] leading-[1.08]"
            style={{ fontSize: "clamp(1.9rem, 4vw, 2.7rem)", letterSpacing: "-0.035em" }}
          >
            {heading}
          </h2>
          <p className="text-[#475569] text-lg max-w-xl leading-relaxed">{subheading}</p>
        </div>

        <div className="rise-in">
          <FaqAccordion faqs={faqs} idPrefix={idPrefix} emitSchema />
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
