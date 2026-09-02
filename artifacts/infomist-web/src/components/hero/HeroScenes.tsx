/* ─────────────────────────────────────────────────────────────────────────
   Homepage hero scenes — code-generated animated SVG visuals.

   Each scene follows the Infomist hero art direction:
   • wide 16:9-ish frame, visual weight on the right two-thirds
   • the left ~45% is left deliberately empty for the HTML headline + CTA
   • warm-white ground, ink-navy geometry, restrained cyan glow, a single
     lime / violet accent where the subject supports it
   • motion is a slow drift plus a few gentle signal pulses — seamless,
     never a hard cut. All motion is disabled under prefers-reduced-motion
     (see index.css).

   No baked-in text, logos or UI copy — everything readable lives in HTML.
   ───────────────────────────────────────────────────────────────────────── */

const INK = "#0B1324";
const NAVY = "#1E293B";
const CYAN = "#0EA5E9";
const LIME = "#84CC16";
const VIOLET = "#8B5CF6";

type SceneProps = { className?: string };

const baseSvg = {
  viewBox: "0 0 640 480",
  fill: "none" as const,
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
  preserveAspectRatio: "xMidYMid slice" as const,
};

/* ── Slide 1 — dependable software architecture ──────────────────────────
   Translucent browser panel, API pathways, database cylinders, calm cyan
   data pulses connecting the services. */
export function ArchitectureScene({ className = "" }: SceneProps) {
  return (
    <svg {...baseSvg} className={className}>
      <defs>
        <linearGradient id="arch-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#E0F2FE" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="arch-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={CYAN} stopOpacity="0.16" />
          <stop offset="1" stopColor={CYAN} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* soft cyan edge light */}
      <ellipse cx="440" cy="220" rx="230" ry="200" fill="url(#arch-glow)" />

      <g className="hero-scene-drift">
        {/* main browser panel */}
        <g>
          <rect x="330" y="90" width="250" height="168" rx="14" fill="url(#arch-panel)" stroke={CYAN} strokeOpacity="0.35" strokeWidth="1.5" />
          <line x1="330" y1="116" x2="580" y2="116" stroke={CYAN} strokeOpacity="0.25" strokeWidth="1.5" />
          <circle cx="345" cy="103" r="3" fill={CYAN} fillOpacity="0.5" />
          <circle cx="357" cy="103" r="3" fill={LIME} fillOpacity="0.5" />
          <circle cx="369" cy="103" r="3" fill={NAVY} fillOpacity="0.3" />
          <rect x="346" y="132" width="120" height="10" rx="5" fill={NAVY} fillOpacity="0.14" />
          <rect x="346" y="150" width="200" height="8" rx="4" fill={NAVY} fillOpacity="0.09" />
          <rect x="346" y="166" width="170" height="8" rx="4" fill={NAVY} fillOpacity="0.09" />
          <rect x="346" y="196" width="70" height="30" rx="8" fill={CYAN} fillOpacity="0.16" stroke={CYAN} strokeOpacity="0.4" />
        </g>

        {/* API gateway node */}
        <g>
          <rect x="360" y="300" width="90" height="54" rx="12" fill="#FFFFFF" stroke={NAVY} strokeOpacity="0.18" strokeWidth="1.5" />
          <circle cx="405" cy="327" r="12" fill={CYAN} fillOpacity="0.14" stroke={CYAN} strokeOpacity="0.5" />
          <circle cx="405" cy="327" r="3.4" fill={CYAN} className="hero-pulse" />
        </g>

        {/* database cylinders */}
        <g transform="translate(495 292)">
          <ellipse cx="30" cy="10" rx="30" ry="10" fill="#FFFFFF" stroke={NAVY} strokeOpacity="0.2" strokeWidth="1.5" />
          <path d="M0 10 V54 A30 10 0 0 0 60 54 V10" fill="#F8FAFC" stroke={NAVY} strokeOpacity="0.2" strokeWidth="1.5" />
          <ellipse cx="30" cy="32" rx="30" ry="10" fill="none" stroke={NAVY} strokeOpacity="0.12" strokeWidth="1.2" />
          <ellipse cx="30" cy="54" rx="30" ry="10" fill="none" stroke={NAVY} strokeOpacity="0.12" strokeWidth="1.2" />
        </g>

        {/* connecting API pathways with flowing pulses */}
        <path d="M405 258 V300" stroke={CYAN} strokeOpacity="0.5" strokeWidth="2" className="hero-flow-line" />
        <path d="M450 327 H495" stroke={CYAN} strokeOpacity="0.5" strokeWidth="2" className="hero-flow-line" />
        <path d="M455 200 C520 200 525 260 525 292" stroke={CYAN} strokeOpacity="0.4" strokeWidth="2" className="hero-flow-line" />

        {/* orbiting service dots */}
        <circle cx="330" cy="175" r="3.6" fill={LIME} className="hero-pulse" />
        <circle cx="580" cy="150" r="3.6" fill={CYAN} className="hero-pulse" style={{ animationDelay: "0.9s" }} />
        <circle cx="360" cy="327" r="3" fill={NAVY} fillOpacity="0.4" />
      </g>

      {/* faint node-and-line motif, bottom-right */}
      <g stroke={INK} strokeOpacity="0.08" strokeWidth="1">
        <path d="M470 400 L540 372 L600 410 L540 440 Z" />
        <path d="M540 372 V440 M470 400 L600 410" />
      </g>
    </svg>
  );
}

/* ── Slide 2 — AI agents & automation, business on autopilot ─────────────
   A central agent node routing calm signals to voice, CRM, workflow and
   analytics modules. */
export function AutomationScene({ className = "" }: SceneProps) {
  const modules = [
    { x: 545, y: 110 },
    { x: 585, y: 220 },
    { x: 545, y: 330 },
    { x: 430, y: 370 },
  ];
  return (
    <svg {...baseSvg} className={className}>
      <defs>
        <radialGradient id="auto-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={CYAN} stopOpacity="0.35" />
          <stop offset="0.6" stopColor={CYAN} stopOpacity="0.12" />
          <stop offset="1" stopColor={CYAN} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="410" cy="240" r="190" fill="url(#auto-core)" />

      <g className="hero-scene-drift">
        {/* signal paths from core to each module */}
        {modules.map((m, i) => (
          <path
            key={i}
            d={`M410 240 L${m.x} ${m.y}`}
            stroke={CYAN}
            strokeOpacity="0.45"
            strokeWidth="2"
            className="hero-flow-line"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {/* peripheral modules — abstract glass cards */}
        {modules.map((m, i) => (
          <g key={i}>
            <rect
              x={m.x - 34}
              y={m.y - 22}
              width="68"
              height="44"
              rx="11"
              fill="#FFFFFF"
              stroke={NAVY}
              strokeOpacity="0.16"
              strokeWidth="1.5"
            />
            <rect x={m.x - 22} y={m.y - 9} width="30" height="6" rx="3" fill={NAVY} fillOpacity="0.16" />
            <rect x={m.x - 22} y={m.y + 3} width="20" height="5" rx="2.5" fill={NAVY} fillOpacity="0.1" />
            <circle cx={m.x + 20} cy={m.y - 8} r="3" fill={i === 1 ? LIME : CYAN} className="hero-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
          </g>
        ))}

        {/* central agent node */}
        <g>
          <circle cx="410" cy="240" r="46" fill="#FFFFFF" stroke={CYAN} strokeOpacity="0.4" strokeWidth="1.5" />
          <circle cx="410" cy="240" r="46" fill={CYAN} fillOpacity="0.06" className="hero-breathe" />
          <circle cx="410" cy="240" r="20" fill="none" stroke={CYAN} strokeOpacity="0.5" strokeWidth="1.5" />
          <circle cx="410" cy="240" r="7" fill={CYAN} className="hero-pulse" />
          <circle cx="410" cy="240" r="66" fill="none" stroke={CYAN} strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 7" />
        </g>
      </g>
    </svg>
  );
}

/* ── Slide 3 — one partner for design, growth & engineering ──────────────
   Three overlapping layers: a product interface frame, a brand/design
   canvas, and a measured growth-chart line, tied by one cyan system line. */
export function StudioScene({ className = "" }: SceneProps) {
  return (
    <svg {...baseSvg} className={className}>
      <defs>
        <linearGradient id="studio-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={VIOLET} stopOpacity="0.12" />
          <stop offset="1" stopColor={CYAN} stopOpacity="0.14" />
        </linearGradient>
      </defs>

      <ellipse cx="430" cy="230" rx="240" ry="210" fill="url(#studio-glow)" />

      <g className="hero-scene-drift">
        {/* layer 1 — brand / design canvas (back) */}
        <g transform="rotate(-6 430 230)">
          <rect x="350" y="90" width="230" height="150" rx="14" fill="#FFFFFF" stroke={VIOLET} strokeOpacity="0.3" strokeWidth="1.5" />
          <circle cx="386" cy="128" r="14" fill={VIOLET} fillOpacity="0.16" />
          <circle cx="414" cy="128" r="14" fill={CYAN} fillOpacity="0.16" />
          <circle cx="442" cy="128" r="14" fill={LIME} fillOpacity="0.18" />
          <rect x="372" y="160" width="150" height="9" rx="4.5" fill={NAVY} fillOpacity="0.12" />
          <rect x="372" y="178" width="110" height="9" rx="4.5" fill={NAVY} fillOpacity="0.08" />
        </g>

        {/* layer 2 — product interface frame (mid) */}
        <g transform="translate(24 40)">
          <rect x="360" y="120" width="200" height="150" rx="14" fill="url(#studio-glow)" />
          <rect x="360" y="120" width="200" height="150" rx="14" fill="#FFFFFF" fillOpacity="0.86" stroke={CYAN} strokeOpacity="0.4" strokeWidth="1.5" />
          <rect x="378" y="142" width="60" height="30" rx="7" fill={CYAN} fillOpacity="0.14" stroke={CYAN} strokeOpacity="0.35" />
          <rect x="448" y="142" width="94" height="12" rx="6" fill={NAVY} fillOpacity="0.12" />
          <rect x="448" y="160" width="70" height="10" rx="5" fill={NAVY} fillOpacity="0.08" />
          <rect x="378" y="188" width="164" height="8" rx="4" fill={NAVY} fillOpacity="0.08" />
          <rect x="378" y="204" width="140" height="8" rx="4" fill={NAVY} fillOpacity="0.08" />
          <rect x="378" y="230" width="60" height="24" rx="7" fill={LIME} fillOpacity="0.18" stroke={LIME} strokeOpacity="0.4" />
        </g>

        {/* layer 3 — growth chart line (front), drawn + settling */}
        <g transform="translate(0 30)">
          <path d="M320 360 L370 330 L420 340 L470 292 L520 300 L580 236" stroke={LIME} strokeOpacity="0.75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="hero-flow-line" style={{ strokeDasharray: "5 5" }} />
          {[[370, 330], [470, 292], [580, 236]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3.6" fill={LIME} className="hero-pulse" style={{ animationDelay: `${i * 0.6}s` }} />
          ))}
        </g>

        {/* one coherent cyan system line tying the layers */}
        <path d="M300 250 C360 250 380 210 470 210 C540 210 540 300 590 300" stroke={CYAN} strokeOpacity="0.4" strokeWidth="2" className="hero-flow-line" />
      </g>
    </svg>
  );
}
