import { Link } from "wouter";
import { ParticleNetwork } from "./ParticleNetwork";

export function Hero() {
  return (
    <section
      id="home"
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh", paddingTop: "4rem", background: "#FAFAFA" }}
    >
      {/* ── Interactive particle network ── */}
      <ParticleNetwork />

      {/* ── Hero content — above particles ── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center gap-8 py-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] animate-pulse" />
          <span className="text-xs font-semibold text-[#0EA5E9] tracking-wider uppercase">
            25 Years of Engineering Excellence
          </span>
        </div>

        <h1
          className="text-5xl md:text-6xl lg:text-[72px] font-black text-[#0F172A] leading-[1.04]"
          style={{ letterSpacing: "-0.03em" }}
        >
          Software Development Company
          <br />
          <span className="relative inline-block">
            Since 2001.
            <span
              className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full"
              style={{ background: "linear-gradient(90deg, #0EA5E9 0%, #84CC16 100%)", opacity: 0.75 }}
            />
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[#475569] max-w-2xl leading-relaxed">
          We're a software development company merging two decades of web architecture with autonomous AI agents and workflow orchestration.{" "}
          <span className="text-[#0F172A] font-semibold">Your business, running on autopilot.</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold text-white transition-all duration-200"
            style={{ background: "#0EA5E9", boxShadow: "0 2px 8px 0 rgba(14,165,233,0.28)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 28px 0 rgba(132,204,22,0.4), 0 2px 8px 0 rgba(14,165,233,0.2)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 2px 8px 0 rgba(14,165,233,0.28)";
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
            Deploy a Project
          </Link>
          <Link
            href="/talk-to-strategist"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold text-[#0F172A] transition-all duration-200"
            style={{ border: "1.5px solid #0EA5E9", background: "transparent" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(14,165,233,0.06)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "transparent";
              el.style.transform = "translateY(0)";
            }}
          >
            <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-3 3v-3Z" />
            </svg>
            Talk to a Strategist
          </Link>
        </div>

        <div className="flex items-center gap-5 pt-2 opacity-50">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {["#0EA5E9", "#84CC16", "#0F172A"].map((c, i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white" style={{ background: c }} />
              ))}
            </div>
            <span className="text-xs font-medium text-[#475569]">200+ clients</span>
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <span className="text-xs font-medium text-[#475569]">4.9 / 5</span>
          <div className="w-px h-4 bg-slate-200" />
          <span className="text-xs font-medium text-[#475569]">Since 2001</span>
        </div>
      </div>
    </section>
  );
}
