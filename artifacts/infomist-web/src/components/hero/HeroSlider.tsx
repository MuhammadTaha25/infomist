import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES, HERO_TRUST } from "@/data/heroSlides";
import { HeroVideo } from "@/components/hero/HeroVideo";
import { useIsMobile } from "@/hooks/use-mobile";

const NAVY = "#071426";
const CYAN = "#27C7E8";
const GREEN = "#6ED36A";
const ROTATE_MS = 7000;

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
 * Dark-navy homepage hero. One stage, N slides — each slide is a headline +
 * CTA pair (left, text-safe) over its own short muted loop (right). Auto-
 * rotates every 7s; pauses on hover, focus and for reduced-motion users.
 * Only the active clip is mounted (see HeroVideo).
 */
export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const count = HERO_SLIDES.length;
  const go = useCallback((next: number) => setIndex((next + count) % count), [count]);

  useEffect(() => {
    if (paused || reduced) return;
    timer.current = setTimeout(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, paused, reduced, count]);

  const slide = HERO_SLIDES[index];

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
      {/* video layer (desktop) — stacked, crossfaded */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <HeroVideo media={s.media} active={i === index} posterOnly={isMobile} />
          </div>
        ))}
        {/* navy scrim so the left column stays readable over the clip */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${NAVY} 0%, ${NAVY} 34%, rgba(7,20,38,0.72) 52%, rgba(7,20,38,0.30) 74%, rgba(7,20,38,0.15) 100%)`,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: `linear-gradient(180deg, rgba(7,20,38,0) 0%, ${NAVY} 100%)` }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-16 md:pt-36 md:pb-24 md:min-h-[38rem] flex flex-col justify-center">
        <div key={slide.id} className="hero-slide-enter flex flex-col gap-6 max-w-xl">
          <span
            className="text-xs font-bold uppercase"
            style={{ letterSpacing: "0.24em", color: CYAN }}
          >
            {slide.eyebrow}
          </span>

          <h1
            className="font-black text-[#F4F8FC] leading-[1.04]"
            style={{ fontSize: "clamp(2.1rem, 5.4vw, 3.6rem)", letterSpacing: "-0.04em" }}
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

        {/* mobile media */}
        <div className="md:hidden mt-8 relative aspect-[16/10] w-full overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          {HERO_SLIDES.map((s, i) => (
            <div key={s.id} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === index ? 1 : 0 }}>
              <HeroVideo media={s.media} active={i === index} posterOnly />
            </div>
          ))}
        </div>

        {/* controls */}
        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Select slide">
            {HERO_SLIDES.map((s, i) => (
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
      </div>
    </section>
  );
}
