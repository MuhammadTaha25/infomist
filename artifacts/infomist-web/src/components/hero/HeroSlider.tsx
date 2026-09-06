import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES, HERO_TRUST } from "@/data/heroSlides";
import { HeroVideo } from "@/components/hero/HeroVideo";

/** Homepage hero runs the first 4 slides, auto-advancing every 5s. */
const SLIDES = HERO_SLIDES.slice(0, 4);

const NAVY = "#071426";
const CYAN = "#27C7E8";
const GREEN = "#6ED36A";
/** Homepage sliders auto-advance every 5s exactly. One timer per slider —
 *  the effect below re-arms it on every index change (manual or auto). */
const ROTATE_MS = 5000;

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * Dark-navy homepage hero. One stage, N slides.
 *  • phone / tablet — the slide's muted clip plays full-bleed BEHIND the copy,
 *    under a navy wash that keeps the headline + CTAs legible.
 *  • xl+ — the clip retreats to a capped column on the right and dissolves
 *    into the same navy the copy sits on (no box, no seam).
 * Auto-rotates every 5s; pauses on hover, focus and for reduced-motion users.
 * Only the active clip decodes (see HeroVideo) — the rest are <img> posters.
 *
 * Large-screen behaviour: the copy container and the clip both stop growing at
 * a comfortable maximum — extra viewport width becomes navy breathing room
 * rather than a giant hero.
 */
export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const count = SLIDES.length;
  const go = useCallback((next: number) => setIndex((next + count) % count), [count]);

  useEffect(() => {
    if (paused || reduced || count <= 1) return;
    timer.current = setTimeout(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, paused, reduced, count]);

  const slide = SLIDES[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Infomist capabilities"
      className="relative w-full overflow-hidden"
      style={{ background: NAVY }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* bounded stage — beyond this width the extra space is navy breathing
          room, not a bigger hero */}
      <div className="relative mx-auto w-full max-w-[96rem]">
        {/* faint grid on the copy side (xl only) so the left never sits flat */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 hidden xl:block"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "linear-gradient(90deg, #000 0%, transparent 82%)",
            WebkitMaskImage: "linear-gradient(90deg, #000 0%, transparent 82%)",
          }}
        />

        {/* ── VIDEO LAYER ──────────────────────────────────────────────────
            Full-bleed behind the copy on phone / tablet; on xl+ it retreats
            to a capped column on the right. One active clip decodes at a time
            (see HeroVideo) — the rest are still <img> posters, so it stays
            light. */}
        <div
          className="pointer-events-none absolute inset-0 xl:inset-auto xl:inset-y-0 xl:right-0 xl:w-[46%] xl:max-w-[48rem]"
          aria-hidden="true"
        >
          {SLIDES.map((s, i) => (
            <div
              key={s.id}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === index ? 1 : 0 }}
            >
              <HeroVideo
                media={s.media}
                active={i === index}
                positionClass="object-center xl:object-[72%_50%]"
              />
            </div>
          ))}

          {/* phone / tablet — full-frame navy wash so the white copy + CTAs
              stay legible over the moving clip */}
          <div
            className="absolute inset-0 xl:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,20,38,0.40) 0%, rgba(7,20,38,0.52) 38%, rgba(7,20,38,0.78) 72%, rgba(7,20,38,0.94) 100%)",
            }}
          />
          {/* xl — left edge dissolves into the copy's navy, no hard seam */}
          <div
            className="absolute inset-y-0 left-0 hidden w-2/5 xl:block"
            style={{ background: `linear-gradient(90deg, ${NAVY} 0%, ${NAVY} 12%, rgba(7,20,38,0.5) 52%, rgba(7,20,38,0) 100%)` }}
          />
          <div className="absolute inset-x-0 top-0 hidden h-20 xl:block" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, rgba(7,20,38,0) 100%)` }} />
          <div className="absolute inset-x-0 bottom-0 hidden h-28 xl:block" style={{ background: `linear-gradient(0deg, ${NAVY} 0%, rgba(7,20,38,0) 100%)` }} />
        </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-16 md:pt-32 md:pb-20 min-h-[32rem] sm:min-h-[34rem] xl:min-h-[38rem] flex flex-col justify-center">
        <div key={slide.id} className="hero-slide-enter flex flex-col items-start gap-6 max-w-xl text-left">
          <span
            className="text-xs font-bold uppercase"
            style={{ letterSpacing: "0.24em", color: CYAN }}
          >
            {slide.eyebrow}
          </span>

          <h1
            className="font-black text-[#F4F8FC] leading-[1.04]"
            style={{ fontSize: "clamp(2.05rem, 4.8vw, 3.7rem)", letterSpacing: "-0.04em" }}
          >
            {slide.title}{" "}
            {slide.accent && (
              <span
                style={{
                  background: `linear-gradient(90deg, ${CYAN}, ${GREEN})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {slide.accent}
              </span>
            )}
          </h1>

          <p className="text-[#A9BBD0] text-lg leading-relaxed max-w-lg">{slide.sub}</p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
            <Link
              href={slide.primary.href}
              className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-[#071426] transition-transform hover:-translate-y-0.5"
              style={{ background: CYAN }}
            >
              {slide.primary.label}
              <ArrowRight size={17} strokeWidth={2.6} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={slide.secondary.href}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-[#F4F8FC] transition-colors hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.18)" }}
            >
              {slide.secondary.label}
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-xs font-semibold text-[#8FA3BC]">
            {HERO_TRUST.map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                {i > 0 && <span className="text-[#33465F]">·</span>}
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* controls — only when there's more than one slide */}
        {count > 1 && (
        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Select slide">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={s.eyebrow}
                onClick={() => go(i)}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === index ? 28 : 10,
                  background: i === index ? CYAN : "rgba(255,255,255,0.22)",
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#A9BBD0] transition-colors hover:bg-white/10 hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.14)" }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#A9BBD0] transition-colors hover:bg-white/10 hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.14)" }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        )}
      </div>
      </div>
    </section>
  );
}
