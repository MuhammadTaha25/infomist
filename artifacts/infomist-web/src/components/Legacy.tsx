export function Legacy() {
  return (
    <section id="legacy" className="w-full bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-auto">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "radial-gradient(ellipse 80% 80% at 50% 60%, rgba(14,165,233,0.22) 0%, rgba(14,165,233,0.07) 55%, transparent 80%)",
                  transform: "translate(10px, 18px) scale(1.08)",
                  filter: "blur(18px)",
                  zIndex: 0,
                }}
              />
              <div
                className="relative z-10 rounded-3xl p-[5px]"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(224,242,254,0.55) 50%, rgba(255,255,255,0.7) 100%)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 0 0 1px rgba(14,165,233,0.18), 0 8px 32px 0 rgba(14,165,233,0.12), 0 2px 8px 0 rgba(15,23,42,0.06)",
                }}
              >
                <div
                  className="w-72 h-72 md:w-80 md:h-80 rounded-[22px] flex flex-col items-center justify-center gap-6 relative overflow-hidden"
                  style={{ background: "linear-gradient(145deg, #F8FAFC 0%, #EFF6FF 60%, #F0FDF4 100%)" }}
                >
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: "linear-gradient(rgba(14,165,233,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.8) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #84CC16 100%)", boxShadow: "0 4px 16px rgba(14,165,233,0.35)" }}
                    >
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4Z" />
                        <path d="M12 16l3 3 5-6" />
                      </svg>
                    </div>
                    <div className="text-center px-4">
                      <p className="text-3xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.04em" }}>25+</p>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mt-1">Years Building</p>
                    </div>
                    <div className="flex gap-4">
                      {[["$1.5M+", "Revenue"], ["500+", "Projects"], ["200+", "Clients"]].map(([val, lbl]) => (
                        <div key={lbl} className="flex flex-col items-center">
                          <span className="text-sm font-black text-[#0F172A]">{val}</span>
                          <span className="text-[9px] font-semibold uppercase tracking-widest text-[#94A3B8]">{lbl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 max-w-xl">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0EA5E9]">Our Legacy</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight" style={{ letterSpacing: "-0.025em" }}>
              25 Years of Engineering at the Frontier.
            </h2>
            <div className="w-16 h-[3px] rounded-full" style={{ background: "linear-gradient(90deg, #0EA5E9 0%, #84CC16 100%)" }} />
            <p className="text-[#475569] text-lg leading-relaxed">
              From the early days of the web to the AI automation era, Infomist has been engineering solutions that matter. Every project builds on two decades of hard-won architecture knowledge — no shortcuts, no guesswork.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-2">
              {[
                { value: "$1.5M+", label: "Verified Contracts" },
                { value: "25+", label: "Years Building" },
                { value: "500+", label: "Projects Shipped" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-black text-[#0F172A] text-2xl" style={{ letterSpacing: "-0.04em" }}>
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-semibold uppercase text-[#94A3B8]" style={{ letterSpacing: "0.14em" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
