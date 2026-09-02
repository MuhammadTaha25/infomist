import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { GridOverlay, Blob, CTAButton } from "@/components/site/primitives";
import { CEO } from "@/data/teamData";

/**
 * Compact leadership teaser — replaces the full-bleed "Engineered by Vardah
 * Hisham" hero on the homepage. A constrained dark card: small portrait on the
 * left, a one-line invitation on the right, and a link through to /our-story.
 * Deliberately light on padding so it reads as a teaser, not a section.
 */
export function LeadershipTeaser() {
  return (
    <section className="w-full px-6 py-16 md:py-20" style={{ background: "#FFFFFF" }}>
      <Reveal
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl"
        style={{ background: "linear-gradient(150deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}
      >
        <GridOverlay dark />
        <Blob color="rgba(14,165,233,0.18)" className="-top-20 -left-16" size={320} />

        <div className="relative flex flex-col items-center gap-7 p-8 text-center md:flex-row md:items-center md:gap-10 md:p-10 md:text-left">
          {/* Portrait + caption */}
          <div className="flex flex-shrink-0 flex-col items-center gap-2.5">
            <div
              className="h-28 w-28 overflow-hidden rounded-2xl md:h-32 md:w-32"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <img
                src={CEO.image}
                alt={`${CEO.name}, ${CEO.role} of Infomist`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs font-semibold text-slate-400">{CEO.name}, CEO</span>
          </div>

          {/* Copy + CTA */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <h2 className="text-2xl font-black text-white md:text-3xl" style={{ letterSpacing: "-0.02em" }}>
              Meet our Leadership.
            </h2>
            <p className="max-w-xl leading-relaxed text-slate-400">
              Two decades of building serious software. Discover our roots, our values, and the
              engineers driving the vision.
            </p>
            <div className="pt-2">
              <CTAButton href="/our-story" icon={ArrowRight}>Read Our Story</CTAButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
