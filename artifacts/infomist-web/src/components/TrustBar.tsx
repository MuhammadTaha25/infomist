import { Reveal } from "@/components/Reveal";

const LOGOS = [
  {
    name: "NovaBridge Capital",
    svg: (
      <svg width="160" height="36" viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="10" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <path d="M12 18 L18 10 L24 18 L18 26 Z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
        <text x="36" y="23" fontFamily="Inter,sans-serif" fontSize="14" fontWeight="700" fill="currentColor" letterSpacing="-0.5">NOVABRIDGE</text>
        <text x="36" y="33" fontFamily="Inter,sans-serif" fontSize="7" fontWeight="500" fill="currentColor" letterSpacing="2.5">CAPITAL</text>
      </svg>
    ),
  },
  {
    name: "Meridian Health Systems",
    svg: (
      <svg width="180" height="36" viewBox="0 0 180 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 28 L10 8 L18 20 L26 8 L26 28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="36" y="23" fontFamily="Inter,sans-serif" fontSize="14" fontWeight="700" fill="currentColor" letterSpacing="-0.5">MERIDIAN</text>
        <text x="36" y="33" fontFamily="Inter,sans-serif" fontSize="7" fontWeight="500" fill="currentColor" letterSpacing="2">HEALTH SYSTEMS</text>
      </svg>
    ),
  },
  {
    name: "Pulsar Finance",
    svg: (
      <svg width="140" height="36" viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="18" r="11" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <path d="M10 18 Q14 10 18 18 Q22 26 26 18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <text x="29" y="23" fontFamily="Inter,sans-serif" fontSize="15" fontWeight="700" fill="currentColor" letterSpacing="-0.5">PULSAR</text>
        <text x="29" y="33" fontFamily="Inter,sans-serif" fontSize="7.5" fontWeight="500" fill="currentColor" letterSpacing="2">FINANCE</text>
      </svg>
    ),
  },
  {
    name: "Kronos Build",
    svg: (
      <svg width="130" height="36" viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4 L2 32 M2 18 L14 6 M2 18 L14 30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="22" y="23" fontFamily="Inter,sans-serif" fontSize="15" fontWeight="700" fill="currentColor" letterSpacing="-0.5">KRONOS</text>
        <text x="22" y="33" fontFamily="Inter,sans-serif" fontSize="7.5" fontWeight="500" fill="currentColor" letterSpacing="2.5">BUILD</text>
      </svg>
    ),
  },
  {
    name: "Aegis PropTech",
    svg: (
      <svg width="148" height="36" viewBox="0 0 148 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 2 L21 10 L21 28 L1 28 L1 10 Z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
        <rect x="7" y="20" width="8" height="8" stroke="currentColor" strokeWidth="1.4" />
        <text x="29" y="23" fontFamily="Inter,sans-serif" fontSize="15" fontWeight="700" fill="currentColor" letterSpacing="-0.5">AEGIS</text>
        <text x="29" y="33" fontFamily="Inter,sans-serif" fontSize="7.5" fontWeight="500" fill="currentColor" letterSpacing="2">PROPTECH</text>
      </svg>
    ),
  },
  {
    name: "Vortex Analytics",
    svg: (
      <svg width="160" height="36" viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10 C4 4 24 4 24 18 C24 32 4 32 4 26" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <text x="32" y="23" fontFamily="Inter,sans-serif" fontSize="14" fontWeight="700" fill="currentColor" letterSpacing="-0.5">VORTEX</text>
        <text x="32" y="33" fontFamily="Inter,sans-serif" fontSize="7" fontWeight="500" fill="currentColor" letterSpacing="2.5">ANALYTICS</text>
      </svg>
    ),
  },
];

export function TrustBar() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section className="w-full py-14 overflow-hidden" style={{ background: "#FFFFFF" }}>
      <Reveal>
        <p className="text-center text-xs font-bold tracking-[0.24em] uppercase text-[#94A3B8] mb-9">
          Trusted by global enterprises for over 20 years
        </p>
      </Reveal>
      <div
        className="group relative w-full"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div
          className="flex items-center [animation:marquee-scroll_36s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center px-10 select-none text-[#94A3B8] opacity-50 transition-all duration-300 hover:opacity-100 hover:text-[#0EA5E9] hover:scale-[1.04]"
              title={logo.name}
            >
              {logo.svg}
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
