import type { CaseStudy, GlyphKey } from "@/data/caseStudies";

/**
 * Brand mark system for the portfolio. Each project gets a distinct geometric
 * glyph (chosen by `glyph` key) rendered in its accent colour, in the same
 * restrained line-geometry style the rest of the site uses. No external logo
 * files, no stock imagery — a consistent, on-brand lockup.
 */

function Glyph({ name }: { name: GlyphKey }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "pulse":
      return (
        <>
          <path d="M4 16 h6 l3 -7 4 14 3 -7 h6" {...common} />
        </>
      );
    case "signal":
      return (
        <>
          <circle cx="16" cy="16" r="2.5" fill="currentColor" stroke="none" />
          <path d="M10.5 21.5a8 8 0 0 1 0-11M21.5 10.5a8 8 0 0 1 0 11M7 25a13 13 0 0 1 0-18M25 7a13 13 0 0 1 0 18" {...common} />
        </>
      );
    case "grid":
      return (
        <>
          <circle cx="9" cy="9" r="3" {...common} />
          <circle cx="23" cy="9" r="3" {...common} />
          <circle cx="9" cy="23" r="3" {...common} />
          <circle cx="23" cy="23" r="3" {...common} />
          <path d="M12 9h8M9 12v8M23 12v8M12 23h8" {...common} />
        </>
      );
    case "shield":
      return <path d="M16 4l10 4v7c0 7-4.5 11-10 13-5.5-2-10-6-10-13V8z" {...common} />;
    case "layers":
      return (
        <>
          <path d="M16 5l11 6-11 6-11-6z" {...common} />
          <path d="M5 16l11 6 11-6M5 21l11 6 11-6" {...common} />
        </>
      );
    case "wave":
      return (
        <path
          d="M4 16h2M8 11v10M12 7v18M16 12v8M20 5v22M24 10v12M26 16h2"
          {...common}
        />
      );
    case "spark":
      return (
        <>
          <circle cx="16" cy="16" r="3.5" {...common} />
          <path d="M16 4v4M16 24v4M4 16h4M24 16h4M8 8l3 3M24 24l-3-3M24 8l-3 3M8 24l3-3" {...common} />
        </>
      );
    case "bars":
      return (
        <>
          <path d="M6 26V16M13 26V8M20 26V13M27 26V5" {...common} />
          <path d="M4 26h24" {...common} strokeWidth={2} />
        </>
      );
  }
}

/** Raw glyph paths for embedding inside an existing <svg viewBox="0 0 32 32">. */
export function CaseStudyGlyphPaths({ study }: { study: CaseStudy }) {
  return <Glyph name={study.glyph} />;
}

/** Icon-only mark in a rounded tile. */
export function CaseStudyMark({
  study,
  size = 40,
  dark = false,
}: {
  study: CaseStudy;
  size?: number;
  dark?: boolean;
}) {
  const c = study.color;
  return (
    <span
      className="inline-flex items-center justify-center flex-shrink-0 rounded-xl"
      style={{
        width: size,
        height: size,
        background: dark ? `${c}1f` : `${c}14`,
        border: `1px solid ${c}${dark ? "3a" : "2e"}`,
        color: c,
      }}
      aria-hidden="true"
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 32 32">
        <Glyph name={study.glyph} />
      </svg>
    </span>
  );
}

/**
 * Decorative wall of project marks for the Case Studies hero (desktop only).
 * Dark glass tiles on a staggered grid with a gentle idle drift.
 */
export function CaseStudyMarkWall({ studies }: { studies: CaseStudy[] }) {
  return (
    <div className="relative grid grid-cols-3 gap-3 w-[300px]" aria-hidden="true">
      {studies.slice(0, 9).map((s, i) => (
        <div
          key={s.slug}
          className="rounded-2xl aspect-square flex items-center justify-center hero-scene-drift"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            transform: `translateY(${(i % 3) * 10 - 10}px)`,
            animationDelay: `${(i % 5) * 0.7}s`,
            color: s.color,
          }}
        >
          <svg width="30" height="30" viewBox="0 0 32 32">
            <Glyph name={s.glyph} />
          </svg>
        </div>
      ))}
    </div>
  );
}

/** Full lockup — mark + wordmark. Used on the detail hero. */
export function CaseStudyLockup({
  study,
  dark = false,
  size = 64,
}: {
  study: CaseStudy;
  dark?: boolean;
  size?: number;
}) {
  return (
    <div className="inline-flex items-center gap-4">
      <CaseStudyMark study={study} size={size} dark={dark} />
      <div className="flex flex-col">
        <span
          className={`font-black leading-none ${dark ? "text-white" : "text-[#0F172A]"}`}
          style={{ fontSize: size * 0.34, letterSpacing: "-0.03em" }}
        >
          {study.name}
        </span>
        <span
          className="text-[11px] font-bold uppercase tracking-widest mt-1.5"
          style={{ color: study.color }}
        >
          {study.category}
        </span>
      </div>
    </div>
  );
}
