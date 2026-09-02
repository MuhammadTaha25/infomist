import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CEO } from "@/data/teamData";

/**
 * The CEO / founder split.
 *
 * `compact` — a shorter version used on the Leadership page, where this sits
 * right under the hero: smaller image column, tighter copy, and the
 * "Meet our leadership team" link is dropped (you're already there).
 */
export function FounderSection({ compact = false }: { compact?: boolean }) {
  const sectionMinH = compact ? "lg:min-h-[460px]" : "lg:min-h-[78vh]";
  const colMinH = compact ? "min-h-[42vh] lg:min-h-[460px]" : "min-h-[56vh] lg:min-h-[78vh]";
  const contentPad = compact ? "px-10 md:px-14 lg:px-16 py-12 lg:py-14" : "px-10 md:px-16 lg:px-20 py-16 lg:py-20";
  const headingSize = compact ? "clamp(1.9rem, 4vw, 2.75rem)" : "clamp(2.2rem, 5vw, 3.75rem)";
  const bodyText = compact ? "text-sm md:text-base leading-[1.75]" : "text-base md:text-lg leading-[1.8]";

  return (
    <section
      id="founder"
      className={`w-full ${sectionMinH} flex flex-col lg:flex-row overflow-hidden`}
      style={{ background: "#080C10" }}
    >
      <div className={`relative w-full lg:w-1/2 ${colMinH} flex-shrink-0 overflow-hidden`}>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(170deg, #1a1a1a 0%, #0d0d0d 40%, #050505 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px 128px",
          }}
        />
        <div className="absolute inset-0 flex items-stretch">
          <div className="w-full h-full aspect-[4/5] overflow-hidden">
            <img
              src={CEO.image}
              alt={`${CEO.name}, ${CEO.role} of Infomist — a software development company`}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 select-none pointer-events-none"
          style={{ fontSize: "10px", letterSpacing: "0.35em", color: "rgba(255,255,255,0.1)", fontWeight: 700, textTransform: "uppercase", whiteSpace: "nowrap" }}
        >
          INFOMIST · CEO PORTRAIT ·
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 px-8 py-5 flex items-center justify-between"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}
        >
          <div>
            <p className="text-white font-bold text-sm tracking-wide" style={{ letterSpacing: "0.05em" }}>{CEO.name}</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}>{CEO.role}</p>
          </div>
          <div className="w-px h-10 mx-4" style={{ background: "rgba(255,255,255,0.12)" }} />
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>EST. 2001</p>
        </div>
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <div className="w-[2px] h-10" style={{ background: "#84CC16" }} />
          <span className="text-[10px] font-bold uppercase" style={{ color: "#84CC16", letterSpacing: "0.28em" }}>Portrait</span>
        </div>
      </div>

      <div
        className="relative w-full lg:w-1/2 flex items-center"
        style={{ background: "linear-gradient(135deg, #0F1923 0%, #0a1018 60%, #07111A 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(14,165,233,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none" style={{ background: "radial-gradient(ellipse at bottom left, rgba(132,204,22,0.08) 0%, transparent 70%)" }} />

        <Reveal className={`relative z-10 ${contentPad} flex flex-col gap-6 max-w-xl`}>
          <div className="flex items-center gap-3">
            <div className="w-6 h-[2px]" style={{ background: "#84CC16" }} />
            <span className="text-xs font-bold uppercase" style={{ color: "#84CC16", letterSpacing: "0.28em" }}>Leadership</span>
          </div>

          <h2
            className="text-white leading-[1.05]"
            style={{ fontSize: headingSize, fontWeight: 900, letterSpacing: "-0.03em" }}
          >
            Engineered by{" "}
            <span style={{ background: "linear-gradient(90deg, #FFFFFF 0%, #94A3B8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {CEO.name}.
            </span>
          </h2>

          <div className="w-16 h-[3px] rounded-full" style={{ background: "linear-gradient(90deg, #0EA5E9 0%, #84CC16 100%)" }} />

          <p className={bodyText} style={{ color: "rgba(255,255,255,0.62)" }}>
            {CEO.name} leads Infomist — a software company delivering{" "}
            <span className="font-semibold" style={{ color: "rgba(255,255,255,0.92)" }}>AI, web, and mobile engineering</span>{" "}
            for businesses across the US, UK, and Canada.
          </p>

          {!compact && (
            <Link
              href="/leadership"
              className="group inline-flex items-center gap-2 text-sm font-bold text-white w-fit transition-colors duration-200 hover:text-[#84CC16]"
            >
              Meet our leadership team
              <ArrowRight size={16} strokeWidth={2.6} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
