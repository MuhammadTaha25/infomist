import { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { ArrowRight, MessagesSquare, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { GridOverlay, HeroBlobs, GradientText, Eyebrow, CTAButton } from "@/components/site/primitives";
import { ArchitectureScene, AutomationScene, StudioScene } from "@/components/hero/HeroScenes";

/* ─────────────────────────────────────────────────────────────────────────
   Homepage hero — a 3-slide visual slider.

   Each slide pairs a matching headline with a code-generated animated SVG
   scene (see HeroScenes.tsx). Slides cross-fade every ~6.5s. Rotation pauses
   on hover, keyboard focus and touch. Under prefers-reduced-motion the
   auto-rotation is disabled and the scene animations fall still, so the
   hero is a calm single frame with working prev/next controls.
   ───────────────────────────────────────────────────────────────────────── */

const ROTATE_MS = 6500;

type Slide = {
  key: string;
  eyebrow: string;
  headline: ReactNode;
  body: ReactNode;
  Scene: ComponentType<{ className?: string }>;
  alt: string;
};

const SLIDES: Slide[] = [
  {
    key: "architecture",
    eyebrow: "25 Years of Engineering Excellence",
    headline: (
      <>
        Software Development Company <GradientText>Since 2001.</GradientText>
      </>
    ),
    body: (
      <>
        Two decades of dependable web architecture — browsers, APIs, databases and
        deployments that hold up in production.{" "}
        <span className="text-[#0F172A] font-semibold">Built to still be running in five years.</span>
      </>
    ),
    Scene: ArchitectureScene,
    alt: "Abstract software architecture: a browser panel, API gateway and database connected by calm cyan data pathways.",
  },
  {
    key: "automation",
    eyebrow: "AI Agents & Automation",
    headline: (
      <>
        Your Business, <GradientText>Running on Autopilot.</GradientText>
      </>
    ),
    body: (
      <>
        Autonomous AI agents and workflow orchestration that route work across voice,
        CRM, and analytics —{" "}
        <span className="text-[#0F172A] font-semibold">so your team stops doing it by hand.</span>
      </>
    ),
    Scene: AutomationScene,
    alt: "A central AI agent node routing calm signal paths out to voice, CRM, workflow and analytics modules.",
  },
  {
    key: "studio",
    eyebrow: "Design · Growth · Engineering",
    headline: (
      <>
        One Partner for <GradientText>the Whole Build.</GradientText>
      </>
    ),
    body: (
      <>
        Product design, brand, and measured growth on one coherent system line —{" "}
        <span className="text-[#0F172A] font-semibold">one team, from first sketch to shipped revenue.</span>
      </>
    ),
    Scene: StudioScene,
    alt: "Three overlapping layers — a product interface, a design canvas and a rising growth chart — tied by one cyan system line.",
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const timer = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((prev) => (next + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    timer.current = window.setTimeout(() => go(index + 1), ROTATE_MS);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, paused, reducedMotion, go]);

  const slide = SLIDES[index];
  const Scene = slide.Scene;

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh", paddingTop: "4rem", background: "#FAFAFA" }}
      aria-roledescription="carousel"
      aria-label="Infomist — what we do"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <GridOverlay />
      <HeroBlobs />

      {/* ── Right-side visual scene — behind the copy, weighted to the right,
           the left ~45% stays clear for the headline + CTA. ── */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block" aria-hidden="true">
        <div
          key={slide.key}
          className="absolute inset-y-0 right-0 w-[62%] hero-slide-enter"
        >
          <Scene className="h-full w-full" />
        </div>
      </div>
      {/* accessible text alternative for the current visual */}
      <p className="sr-only" role="img" aria-label={slide.alt} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 min-h-[calc(100vh-4rem)] flex flex-col justify-center py-20">
        <div key={slide.key} className="flex flex-col gap-7 max-w-2xl hero-slide-enter">
          <Eyebrow icon={Sparkles}>{slide.eyebrow}</Eyebrow>

          <h1
            className="font-black text-[#0F172A] leading-[1.0]"
            style={{ fontSize: "clamp(2.7rem, 6.6vw, 4.75rem)", letterSpacing: "-0.045em" }}
          >
            {slide.headline}
          </h1>

          <p className="text-[#475569] text-lg md:text-xl max-w-xl leading-relaxed">{slide.body}</p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
            <CTAButton href="/contact" icon={ArrowRight}>Deploy a Project</CTAButton>
            <CTAButton href="/talk-to-strategist" variant="outline" icon={MessagesSquare}>
              Talk to a Strategist
            </CTAButton>
          </div>

          <div className="flex items-center gap-5 pt-3 text-[#64748B]">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {["#0EA5E9", "#84CC16", "#0F172A"].map((c) => (
                  <div key={c} className="w-6 h-6 rounded-full border-2 border-white" style={{ background: c }} />
                ))}
              </div>
              <span className="text-xs font-semibold">200+ clients</span>
            </div>
            <div className="w-px h-4 bg-slate-300" />
            <span className="text-xs font-semibold">4.9 / 5</span>
            <div className="w-px h-4 bg-slate-300" />
            <span className="text-xs font-semibold">Since 2001</span>
          </div>

          {/* ── Slider controls ── */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white text-[#0F172A] transition-colors hover:text-[#0EA5E9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0EA5E9]"
              style={{ border: "1px solid #E2E8F0" }}
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>
            <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
              {SLIDES.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                  onClick={() => go(i)}
                  className="h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0EA5E9]"
                  style={{
                    width: i === index ? 28 : 8,
                    background: i === index ? "linear-gradient(90deg,#0EA5E9,#84CC16)" : "#CBD5E1",
                  }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white text-[#0F172A] transition-colors hover:text-[#0EA5E9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0EA5E9]"
              style={{ border: "1px solid #E2E8F0" }}
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
