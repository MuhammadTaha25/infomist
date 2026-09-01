import { useState, useRef } from "react";
import { Reveal } from "@/components/Reveal";

const LOGOS = [
  {
    name: "NovaBridge Capital",
    color: "#0EA5E9",
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
    color: "#10B981",
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
    color: "#8B5CF6",
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
    color: "#F97316",
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
    color: "#0EA5E9",
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
    color: "#EC4899",
    svg: (
      <svg width="160" height="36" viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10 C4 4 24 4 24 18 C24 32 4 32 4 26" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <text x="32" y="23" fontFamily="Inter,sans-serif" fontSize="14" fontWeight="700" fill="currentColor" letterSpacing="-0.5">VORTEX</text>
        <text x="32" y="33" fontFamily="Inter,sans-serif" fontSize="7" fontWeight="500" fill="currentColor" letterSpacing="2.5">ANALYTICS</text>
      </svg>
    ),
  },
];

function LogoItem({ logo }: { logo: typeof LOGOS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 flex items-center justify-center px-10 cursor-default select-none"
      style={{
        color: hovered ? logo.color : "#94A3B8",
        filter: hovered
          ? `drop-shadow(0 0 8px rgba(14,165,233,0.35)) drop-shadow(0 2px 6px rgba(14,165,233,0.2))`
          : "none",
        opacity: hovered ? 1 : 0.45,
        transform: hovered ? "scale(1.07)" : "scale(1)",
        transition: "color 0.25s ease, filter 0.25s ease, opacity 0.25s ease, transform 0.25s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={logo.name}
    >
      {logo.svg}
    </div>
  );
}

export function TrustBar() {
  const [paused, setPaused] = useState(false);
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <section className="w-full bg-[#F9FAFB] py-10 overflow-hidden">
      <Reveal>
        <p className="text-center text-xs font-semibold tracking-[0.22em] uppercase text-[#94A3B8] mb-8">
          Trusted by Global Enterprises for Over 20 Years
        </p>
      </Reveal>
      <div
        className="relative w-full"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex items-center"
          style={{
            width: "max-content",
            animation: "marquee-scroll 32s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {doubled.map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} logo={logo} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
