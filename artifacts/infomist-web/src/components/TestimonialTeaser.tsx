import { MessageSquareQuote } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/site/primitives";
import { ClientImpactSlider } from "@/components/ClientImpactSlider";

export function TestimonialTeaser() {
  return (
    <section className="w-full" style={{ background: "#F9FAFB" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-28 flex flex-col gap-14">
        <Reveal>
          <SectionHead
            icon={MessageSquareQuote}
            eyebrow="Client Reviews"
            title="What clients say when the"
            gradientWord="work gets real."
            sub="Every review below is independently verified on Guru.com — no edits, no invented quotes."
          />
        </Reveal>
        <Reveal>
          <ClientImpactSlider />
        </Reveal>
      </div>
    </section>
  );
}
