import type { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { HeroVideo } from "@/components/hero/HeroVideo";

const NAVY = "#071426";
const CYAN = "#27C7E8";
const GREEN = "#6ED36A";

export type HeroCta = { label: string; href: string };

/** wouter <Link> for internal routes; plain <a> for in-page (#) and external. */
function HeroLink({ href, className, style, children }: { href: string; className?: string; style?: React.CSSProperties; children: ReactNode }) {
  if (href.startsWith("#") || href.startsWith("http")) {
    return <a href={href} className={className} style={style}>{children}</a>;
  }
  return <Link href={href} className={className} style={style}>{children}</Link>;
}

/**
 * Dark-navy page hero with a short muted loop on the right — the flagship-page
 * counterpart to the homepage <HeroSlider>. One clip, always playing (poster
 * still for mobile / reduced-motion). Left column stays text-safe over a navy
 * scrim. `evidence` is a row of short capability labels — never numbers
 * (fabricated metrics are not allowed).
 */
export function PageHeroVideo({
  breadcrumb,
  eyebrow,
  title,
  accent,
  sub,
  primary,
  secondary,
  media,
  evidence,
}: {
  breadcrumb?: ReactNode;
  eyebrow: string;
  title: string;
  accent?: string;
  sub: string;
  primary: HeroCta;
  secondary?: HeroCta;
  media: string;
  evidence?: string[];
}) {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: NAVY }}>
      {/* video layer (desktop) */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        <HeroVideo media={media} active />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${NAVY} 0%, ${NAVY} 34%, rgba(7,20,38,0.72) 52%, rgba(7,20,38,0.30) 74%, rgba(7,20,38,0.12) 100%)`,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28"
          style={{ background: `linear-gradient(180deg, rgba(7,20,38,0) 0%, ${NAVY} 100%)` }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-14 md:pt-32 md:pb-20">
        {breadcrumb && <div className="mb-8 text-sm text-[#8FA3BC]">{breadcrumb}</div>}

        <div className="flex flex-col gap-6 max-w-xl">
          <span className="text-xs font-bold uppercase" style={{ letterSpacing: "0.24em", color: CYAN }}>
            {eyebrow}
          </span>

          <h1
            className="font-black text-[#F4F8FC] leading-[1.04]"
            style={{ fontSize: "clamp(2.1rem, 5vw, 3.4rem)", letterSpacing: "-0.04em" }}
          >
            {title}{" "}
            {accent && (
              <span
                style={{
                  background: `linear-gradient(90deg, ${CYAN}, ${GREEN})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {accent}
              </span>
            )}
          </h1>

          <p className="text-[#A9BBD0] text-lg leading-relaxed max-w-lg">{sub}</p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
            <HeroLink
              href={primary.href}
              className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-[#071426] transition-transform hover:-translate-y-0.5"
              style={{ background: CYAN }}
            >
              {primary.label}
              <ArrowRight size={17} strokeWidth={2.6} className="transition-transform group-hover:translate-x-1" />
            </HeroLink>
            {secondary && (
              <HeroLink
                href={secondary.href}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-[#F4F8FC] transition-colors hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.18)" }}
              >
                {secondary.label}
              </HeroLink>
            )}
          </div>

          {evidence && evidence.length > 0 && (
            <div className="flex flex-wrap gap-x-3 gap-y-1 pt-3 text-xs font-semibold text-[#8FA3BC]">
              {evidence.map((e, i) => (
                <span key={e} className="flex items-center gap-3">
                  {i > 0 && <span className="text-[#33465F]">·</span>}
                  {e}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* mobile media */}
        <div
          className="md:hidden mt-8 relative aspect-[16/10] w-full overflow-hidden rounded-2xl"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <HeroVideo media={media} active posterOnly />
        </div>
      </div>
    </section>
  );
}
