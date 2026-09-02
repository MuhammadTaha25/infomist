import { useState, useCallback, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────
// Verified client reviews sourced from Guru.com. Wording must not be altered.
// Add new entries only when they are genuinely collected & verifiable.
// ─────────────────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: "Travis Howard",
    title: "Howard Retail Co.",
    quote:
      "Infomist and its website developer and designer team always does 5 Star work for my business! They are very easy to work with and deliver ahead of time every time. Thank YOU, Fahad and Hisham!!! :)",
  },
  {
    name: "Neil Fernandez",
    title: "Trophy Central",
    quote:
      "We were concerned about a drop-off in sales last month and asked Alveena to do an analysis for us using GA and other tools. It was more complicated than normal due to transition to GA4. Alveena and her team did an excellent job and I would highly recommend her.",
  },
  {
    name: "Jacob Reyes",
    title: "528 Digital Supplies",
    quote:
      "Very nice and patient to work with — happy they continue to provide assistance. Would work with again.",
  },
  {
    name: "Oliver M Edward",
    title: "NFT Brands Inc.",
    quote:
      "Great team. Can work around your project goals and budgets to reach a successful flow.",
  },
];

const TOTAL = REVIEWS.length;

function getSlot(idx: number, active: number): number {
  let rel = (((idx - active) % TOTAL) + TOTAL) % TOTAL;
  if (rel > Math.floor(TOTAL / 2)) rel -= TOTAL;
  return Math.max(-2, Math.min(2, rel));
}

const EASING = "cubic-bezier(0.34, 1.1, 0.64, 1)";
const DURATION = "0.8s";
const TRANSITION = `transform ${DURATION} ${EASING}, opacity ${DURATION} ${EASING}, box-shadow ${DURATION} ease`;

interface SlotStyle {
  transform: string;
  opacity: number;
  zIndex: number;
  boxShadow: string;
  background: string;
  border: string;
  pointerEvents: "none" | "auto";
  cursor?: string;
}

const CARD_DARK = "linear-gradient(160deg, #16171C 0%, #0B0C0F 100%)";

function slotStyle(slot: number): SlotStyle {
  const center = "perspective(1000px) translateX(-50%) translateY(-50%) rotateY(0deg) scale(1)";
  const left = "perspective(1000px) translateX(calc(-50% - 68%)) translateY(-50%) rotateY(20deg) scale(0.84)";
  const right = "perspective(1000px) translateX(calc(-50% + 68%)) translateY(-50%) rotateY(-20deg) scale(0.84)";
  const hLeft = "perspective(1000px) translateX(calc(-50% - 130%)) translateY(-50%) rotateY(20deg) scale(0.7)";
  const hRight = "perspective(1000px) translateX(calc(-50% + 130%)) translateY(-50%) rotateY(-20deg) scale(0.7)";

  if (slot === 0)
    return {
      transform: center,
      opacity: 1,
      zIndex: 10,
      boxShadow: "0 40px 90px -24px rgba(0,0,0,0.6), 0 0 0 1px rgba(14,165,233,0.25)",
      background: CARD_DARK,
      border: "1px solid rgba(255,255,255,0.10)",
      pointerEvents: "auto",
      cursor: "default",
    };
  if (slot === -1 || slot === 1)
    return {
      transform: slot < 0 ? left : right,
      opacity: 0.55,
      zIndex: 5,
      boxShadow: "0 24px 60px -28px rgba(0,0,0,0.55)",
      background: CARD_DARK,
      border: "1px solid rgba(255,255,255,0.06)",
      pointerEvents: "auto",
      cursor: "pointer",
    };
  return {
    transform: slot < 0 ? hLeft : hRight,
    opacity: 0,
    zIndex: 1,
    boxShadow: "none",
    background: CARD_DARK,
    border: "1px solid rgba(255,255,255,0.05)",
    pointerEvents: "none",
  };
}

function StarRow() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M10 1.5l2.6 5.2 5.7.83-4.15 4.04 1 5.7L10 14.5l-5.15 2.73 1-5.7L1.7 7.53l5.7-.83L10 1.5Z"
            fill="#84CC16"
          />
        </svg>
      ))}
    </div>
  );
}

function ArrowBtn({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "Previous review" : "Next review"}
      className="absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
      style={{
        [dir === "left" ? "left" : "right"]: "-22px",
        background: "#101826",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 8px 24px -8px rgba(0,0,0,0.5)",
      }}
    >
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#7DD3FC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "left" ? <path d="M10 3L5 8l5 5" /> : <path d="M6 3l5 5-5 5" />}
      </svg>
    </button>
  );
}

export function ClientImpactSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goNext = useCallback(() => setActive((a) => (a + 1) % TOTAL), []);
  const goPrev = useCallback(() => setActive((a) => (a - 1 + TOTAL) % TOTAL), []);
  const goTo = useCallback((i: number) => setActive(i), []);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(goNext, 3000);
    return () => clearInterval(id);
  }, [paused, goNext]);

  return (
    <div className="flex flex-col gap-10">
      <div
        className="relative w-full"
        style={{ height: 420 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <ArrowBtn dir="left" onClick={goPrev} />
        <ArrowBtn dir="right" onClick={goNext} />

        {REVIEWS.map((review, idx) => {
          const slot = getSlot(idx, active);
          const ss = slotStyle(slot);
          return (
            <div
              key={review.name}
              onClick={() => {
                if (slot === -1) goPrev();
                if (slot === 1) goNext();
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 340,
                minHeight: 340,
                borderRadius: 24,
                transition: TRANSITION,
                willChange: "transform, opacity",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                ...ss,
              }}
            >
              <div className="flex flex-col gap-4 p-7 flex-1">
                <StarRow />
                <div className="flex flex-col gap-0.5 mt-1">
                  <p className="text-xl font-black text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    {review.name}
                  </p>
                  <p className="text-sm font-semibold text-[#7DD3FC]">{review.title}</p>
                </div>
                <p className="text-[15px] leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.78)" }}>
                  “{review.quote}”
                </p>
                <a
                  href="https://www.guru.com/freelancers/infomist/reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7DD3FC] hover:text-white transition-colors duration-150 mt-auto"
                >
                  Read on Guru
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Review navigation">
        {REVIEWS.map((_, idx) => {
          const isActive = idx === active;
          return (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to review ${idx + 1}`}
              onClick={() => goTo(idx)}
              className="transition-all duration-300 cursor-pointer"
              style={{
                width: isActive ? 28 : 8,
                height: 8,
                borderRadius: 9999,
                background: isActive ? "linear-gradient(90deg, #0EA5E9 0%, #84CC16 100%)" : "#CBD5E1",
              }}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 opacity-70">
        <svg width="13" height="13" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 1.5l2.6 5.2 5.7.83-4.15 4.04 1 5.7L10 14.5l-5.15 2.73 1-5.7L1.7 7.53l5.7-.83L10 1.5Z" fill="#84CC16" />
        </svg>
        <p className="text-xs text-[#64748B]">
          All reviews independently verified on{" "}
          <a href="https://www.guru.com/freelancers/infomist/reviews" target="_blank" rel="noopener noreferrer" className="text-[#0EA5E9] hover:underline">
            Guru.com
          </a>{" "}
          · 4.9 / 5 average
        </p>
      </div>
    </div>
  );
}
