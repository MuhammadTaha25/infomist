import { GridOverlay, Blob } from "@/components/site/primitives";

const STATS = [
  { value: "$1.5M+", label: "Verified B2B revenue generated" },
  { value: "4.9 / 5", label: "Across hundreds of enterprise reviews on Guru.com" },
  { value: "25+", label: "Years of engineering & automation excellence" },
];

export function SocialProof() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}
    >
      <GridOverlay dark />
      <Blob color="rgba(14,165,233,0.18)" className="-top-20 left-1/3" size={420} />
      <Blob color="rgba(132,204,22,0.12)" className="-bottom-24 right-1/4" size={360} />
      <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-6 rise-in">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col gap-2 rounded-2xl px-6 py-7 text-center md:text-left"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span
              className="font-black leading-none"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3rem)",
                letterSpacing: "-0.04em",
                background: i === 1
                  ? "linear-gradient(100deg,#84CC16,#0EA5E9)"
                  : "linear-gradient(100deg,#0EA5E9,#84CC16)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {s.value}
            </span>
            <span className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.55)" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
