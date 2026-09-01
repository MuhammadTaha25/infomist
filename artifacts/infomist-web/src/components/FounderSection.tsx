import { Reveal } from "@/components/Reveal";

export function FounderSection() {
  return (
    <section
      id="founder"
      className="w-full min-h-screen flex flex-col lg:flex-row overflow-hidden"
      style={{ background: "#080C10" }}
    >
      <div className="relative w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen flex-shrink-0 overflow-hidden">
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
              src={`${import.meta.env.BASE_URL}hisham-sarwar.png`}
              alt="Vardah Hisham, CEO of Infomist — a software development company"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 select-none pointer-events-none"
          style={{ fontSize: "10px", letterSpacing: "0.35em", color: "rgba(255,255,255,0.1)", fontWeight: 700, textTransform: "uppercase", whiteSpace: "nowrap" }}
        >
          INFOMIST · FOUNDER PORTRAIT ·
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 px-8 py-5 flex items-center justify-between"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}
        >
          <div>
            <p className="text-white font-bold text-sm tracking-wide" style={{ letterSpacing: "0.05em" }}>Vardah Hisham</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}>Founder & Chief Architect</p>
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

        <Reveal className="relative z-10 px-10 md:px-16 lg:px-20 py-20 flex flex-col gap-8 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="w-6 h-[2px]" style={{ background: "#84CC16" }} />
            <span className="text-xs font-bold uppercase" style={{ color: "#84CC16", letterSpacing: "0.28em" }}>The Architect</span>
          </div>

          <h2
            className="text-white leading-[1.05]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)", fontWeight: 900, letterSpacing: "-0.03em" }}
          >
            Engineered by{" "}
            <span style={{ background: "linear-gradient(90deg, #FFFFFF 0%, #94A3B8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Vardah Hisham.
            </span>
          </h2>

          <div className="w-16 h-[3px] rounded-full" style={{ background: "linear-gradient(90deg, #0EA5E9 0%, #84CC16 100%)" }} />

          <p className="leading-[1.85] text-base md:text-lg" style={{ color: "rgba(255,255,255,0.62)" }}>
            Starting from the early days of the web, generating over{" "}
            <span className="font-semibold" style={{ color: "rgba(255,255,255,0.92)" }}>$1.5 Million in verified freelance and enterprise contracts</span>
            , to leading the AI automation revolution. Infomist isn't just an agency; it's the culmination of decades of{" "}
            <span className="font-semibold" style={{ color: "rgba(255,255,255,0.92)" }}>battle-tested software architecture.</span>
          </p>

          <div className="flex gap-8 py-2">
            {[
              { value: "$1.5M+", label: "Verified Contracts" },
              { value: "25+", label: "Years Building" },
              { value: "500+", label: "Projects Shipped" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-black text-white" style={{ fontSize: "1.6rem", letterSpacing: "-0.04em" }}>{stat.value}</span>
                <span className="text-[10px] font-semibold uppercase" style={{ color: "rgba(255,255,255,0.38)", letterSpacing: "0.14em" }}>{stat.label}</span>
              </div>
            ))}
          </div>

        </Reveal>
      </div>
    </section>
  );
}
