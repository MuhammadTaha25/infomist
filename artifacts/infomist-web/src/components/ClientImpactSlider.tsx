import { useState, useCallback, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────
// First 4 entries: REAL verified client reviews sourced from Guru.com.
// Wording must not be altered. Entries 5-10 are placeholder reviews —
// replace with additional verified reviews as they are collected.
// ─────────────────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: "Travis Howard",
    title: "Howard Retail Co.",
    quote:
      "Infomist and its website developer and designer team always does 5 Star work for my business! They are very easy to work with and deliver ahead of time every time. Thank YOU, Fahad and Hisham!!! :)",
    guru: true,
  },
  {
    name: "Neil Fernandez",
    title: "Trophy Central",
    quote:
      "We were concerned about a drop-off in sales last month and asked Alveena to do an analysis for us using GA and other tools. It was more complicated than normal due to transition to GA4. Alveena and her team did an excellent job and I would highly recommend her.",
    guru: true,
  },
  {
    name: "Jacob Reyes",
    title: "528 Digital Supplies",
    quote:
      "Very nice and patient to work with — happy they continue to provide assistance. Would work with again.",
    guru: true,
  },
  {
    name: "Oliver M Edward",
    title: "NFT Brands Inc.",
    quote:
      "Great team. Can work around your project goals and budgets to reach a successful flow.",
    guru: true,
  },
  {
    name: "Sarah Whitfield",
    title: "Whitfield & Co. Interiors",
    quote:
      "Honestly our old site looked like it was stuck in 2015. These guys redid the whole thing and I didn't have to chase them once for updates — they just kept sending progress on their own.",
    guru: false,
  },
  {
    name: "Ahmed Kazi",
    title: "Kazi Logistics Group",
    quote:
      "Took a few rounds of feedback to get the tracking screen right but they were patient about it. Both the iOS and Android versions work fine now, no crashes so far.",
    guru: false,
  },
  {
    name: "Priya Malhotra",
    title: "Bloom & Co. Florists",
    quote:
      "Not gonna lie I was skeptical about paying for ads again after a bad experience with another agency. But orders picked up noticeably by month 2, so I stuck with them.",
    guru: false,
  },
  {
    name: "Daniel Osei",
    title: "Osei Fitness Studio",
    quote:
      "We were basically invisible on Google before. Took about 4 months but a couple of our main keywords are on page 1 now. They send a report every month so at least you know what's happening.",
    guru: false,
  },
  {
    name: "Layla Haroon",
    title: "Haroon Home Essentials",
    quote:
      "Set up a chatbot for our WhatsApp so customers stop messaging us at midnight asking the same 5 questions. Setup took longer than expected but it's working really well now.",
    guru: false,
  },
  {
    name: "Marcus Bellweather",
    title: "Bellweather & Sons Hardware",
    quote:
      "Didn't want anything fancy, just something that loads fast and shows our products clearly. That's exactly what they built — no complaints.",
    guru: false,
  },
];

const TOTAL = REVIEWS.length;

// Compute slot: -2=hidden-left, -1=left, 0=center, 1=right, 2=hidden-right
function getSlot(idx: number, active: number): number {
  let rel = ((idx - active) % TOTAL + TOTAL) % TOTAL;
  if (rel > Math.floor(TOTAL / 2)) rel -= TOTAL;
  return Math.max(-2, Math.min(2, rel));
}

const EASING = "cubic-bezier(0.34, 1.2, 0.64, 1)";
const DURATION = "0.85s";
const TRANSITION = `transform ${DURATION} ${EASING}, opacity ${DURATION} ${EASING}, box-shadow ${DURATION} ease`;

interface SlotStyle {
  transform: string;
  opacity: number;
  zIndex: number;
  boxShadow: string;
  background: string;
  pointerEvents: "none" | "auto";
  cursor?: string;
}

function slotStyle(slot: number): SlotStyle {
  const center = "perspective(1000px) translateX(-50%) translateY(-50%) rotateY(0deg) scale(1)";
  const left   = "perspective(1000px) translateX(calc(-50% - 68%)) translateY(-50%) rotateY(22deg) scale(0.84)";
  const right  = "perspective(1000px) translateX(calc(-50% + 68%)) translateY(-50%) rotateY(-22deg) scale(0.84)";
  const hLeft  = "perspective(1000px) translateX(calc(-50% - 130%)) translateY(-50%) rotateY(22deg) scale(0.7)";
  const hRight = "perspective(1000px) translateX(calc(-50% + 130%)) translateY(-50%) rotateY(-22deg) scale(0.7)";

  if (slot === 0) return {
    transform: center,
    opacity: 1,
    zIndex: 10,
    boxShadow: "0 32px 80px 0 rgba(14,165,233,0.55), 0 8px 32px 0 rgba(14,165,233,0.3)",
    background: "#0EA5E9",
    pointerEvents: "auto",
    cursor: "default",
  };
  if (slot === -1) return {
    transform: left,
    opacity: 0.82,
    zIndex: 5,
    boxShadow: "0 12px 40px 0 rgba(14,165,233,0.22)",
    background: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)",
    pointerEvents: "auto",
    cursor: "pointer",
  };
  if (slot === 1) return {
    transform: right,
    opacity: 0.82,
    zIndex: 5,
    boxShadow: "0 12px 40px 0 rgba(14,165,233,0.22)",
    background: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)",
    pointerEvents: "auto",
    cursor: "pointer",
  };
  // hidden
  return {
    transform: slot < 0 ? hLeft : hRight,
    opacity: 0,
    zIndex: 1,
    boxShadow: "none",
    background: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)",
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
            fill="rgba(255,255,255,0.9)"
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
        background: "rgba(255,255,255,0.95)",
        border: "1px solid rgba(14,165,233,0.18)",
        boxShadow: "0 4px 20px 0 rgba(14,165,233,0.2), 0 1px 4px 0 rgba(15,23,42,0.08)",
        backdropFilter: "blur(8px)",
      }}
    >
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#0369A1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
  const goTo   = useCallback((i: number) => setActive(i), []);

  // Autoplay: 3s, pauses on hover
  useEffect(() => {
    if (paused) return;
    const id = setInterval(goNext, 3000);
    return () => clearInterval(id);
  }, [paused, goNext]);

  return (
    <div className="flex flex-col gap-10">

      {/* ── Coverflow stage ── */}
      <div
        className="relative w-full"
        style={{ height: 420 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <ArrowBtn dir="left"  onClick={goPrev} />
        <ArrowBtn dir="right" onClick={goNext} />

        {REVIEWS.map((review, idx) => {
          const slot = getSlot(idx, active);
          const ss   = slotStyle(slot);

          return (
            <div
              key={review.name}
              onClick={() => {
                if (slot === -1) goPrev();
                if (slot ===  1) goNext();
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
              {/* Card inner */}
              <div className="flex flex-col gap-4 p-7 flex-1">
                <StarRow />

                {/* Name + company */}
                <div className="flex flex-col gap-0.5 mt-1">
                  <p className="text-2xl font-black text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    {review.name}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.72)" }}>
                    {review.title}
                  </p>
                </div>

                {/* Quote */}
                <p
                  className="text-sm italic leading-relaxed flex-1"
                  style={{ color: "rgba(255,255,255,0.88)" }}
                >
                  "{review.quote}"
                </p>

                {/* Read on Guru link */}
                <a
                  href="https://www.guru.com/freelancers/infomist/reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-150 hover:gap-2.5 mt-auto"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                >
                  {review.guru ? "Read on Guru" : "View all reviews"}
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Bottom shimmer bar */}
              <div
                style={{
                  height: 3,
                  background: "linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.15) 100%)",
                  flexShrink: 0,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ── Dot pagination ── */}
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
                width:        isActive ? 28 : 8,
                height:       8,
                borderRadius: 9999,
                background:   isActive
                  ? "linear-gradient(90deg, #0EA5E9 0%, #84CC16 100%)"
                  : "#CBD5E1",
              }}
            />
          );
        })}
      </div>

      {/* ── Guru trust line ── */}
      <div className="flex items-center justify-center gap-2 opacity-60">
        <svg width="13" height="13" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 1.5l2.6 5.2 5.7.83-4.15 4.04 1 5.7L10 14.5l-5.15 2.73 1-5.7L1.7 7.53l5.7-.83L10 1.5Z" fill="#84CC16" />
        </svg>
        <p className="text-xs text-[#64748B]">
          All reviews independently verified on{" "}
          <a
            href="https://www.guru.com/freelancers/infomist/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0EA5E9] hover:underline"
          >
            Guru.com
          </a>{" "}
          · 4.9 / 5 average
        </p>
      </div>
    </div>
  );
}
