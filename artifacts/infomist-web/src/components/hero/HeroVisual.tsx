import type { ComponentType } from "react";
import { ArchitectureScene, AutomationScene, StudioScene } from "@/components/hero/HeroScenes";

/* ─────────────────────────────────────────────────────────────────────────
   HeroVisual — the route-wide hero scene system.

   Every public route gets ONE relevant, code-generated animated SVG scene.
   Scenes share the Infomist art direction: warm-white ground, ink-navy
   geometry, restrained cyan glow, one accent per scene, the left ~45% left
   empty for the HTML headline. Motion is a slow drift + a few gentle signal
   pulses on a seamless loop, and every scene falls still under
   prefers-reduced-motion (keyframes live in index.css, `hero-*`).

   No baked-in text, logos or UI copy — all readable text lives in HTML.

   Usage:
     <HeroVisual variant={heroVariantForRoute(slug)} />
   or pass an explicit variant on bespoke pages.
   ───────────────────────────────────────────────────────────────────────── */

const NAVY = "#1E293B";
const CYAN = "#0EA5E9";
const LIME = "#84CC16";
const VIOLET = "#8B5CF6";

const svg = {
  viewBox: "0 0 640 480",
  fill: "none" as const,
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
  preserveAspectRatio: "xMidYMid slice" as const,
};

type P = { className?: string };

/* ── shared bits ──────────────────────────────────────────────────────── */
const card = (x: number, y: number, w: number, h: number, stroke = NAVY, op = 0.16) => (
  <rect x={x} y={y} width={w} height={h} rx="11" fill="#FFFFFF" stroke={stroke} strokeOpacity={op} strokeWidth="1.5" />
);

/* ── Voice waveform → conversational AI node → actions ────────────────── */
function WaveformScene({ className = "" }: P) {
  const bars = Array.from({ length: 18 });
  return (
    <svg {...svg} className={className}>
      <ellipse cx="440" cy="230" rx="240" ry="190" fill={CYAN} fillOpacity="0.07" />
      <g className="hero-scene-drift">
        {bars.map((_, i) => {
          const h = 12 + Math.abs(Math.sin(i * 1.1)) * 54;
          return (
            <rect key={i} x={300 + i * 8} y={240 - h / 2} width="3.5" height={h} rx="1.75"
              fill={CYAN} fillOpacity={0.35 + (i % 3) * 0.2} className="hero-breathe"
              style={{ animationDelay: `${i * 0.12}s` }} />
          );
        })}
        <g>
          <circle cx="480" cy="240" r="34" fill="#FFFFFF" stroke={CYAN} strokeOpacity="0.4" strokeWidth="1.5" />
          <circle cx="480" cy="240" r="15" fill="none" stroke={CYAN} strokeOpacity="0.5" strokeWidth="1.5" />
          <circle cx="480" cy="240" r="5" fill={CYAN} className="hero-pulse" />
        </g>
        <path d="M514 240 H590" stroke={CYAN} strokeOpacity="0.5" strokeWidth="2" className="hero-flow-line" />
        {[160, 240, 320].map((y, i) => (
          <g key={i}>
            <path d={`M514 240 C560 240 560 ${y} 590 ${y}`} stroke={CYAN} strokeOpacity="0.4" strokeWidth="1.8" className="hero-flow-line" style={{ animationDelay: `${i * 0.4}s` }} />
            {card(590, y - 16, 42, 32)}
            <circle cx="611" cy={y} r="3" fill={i === 1 ? LIME : CYAN} className="hero-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ── Camera lens field scanning objects (computer vision) ─────────────── */
function VisionScene({ className = "" }: P) {
  return (
    <svg {...svg} className={className}>
      <ellipse cx="440" cy="230" rx="230" ry="190" fill={CYAN} fillOpacity="0.07" />
      <g className="hero-scene-drift">
        <circle cx="430" cy="230" r="120" fill="none" stroke={NAVY} strokeOpacity="0.12" strokeWidth="1.5" />
        <circle cx="430" cy="230" r="120" fill="none" stroke={CYAN} strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 10" />
        <circle cx="430" cy="230" r="72" fill="none" stroke={CYAN} strokeOpacity="0.3" strokeWidth="1.2" />
        {[[390, 190, 46, 40], [470, 210, 40, 52], [410, 280, 60, 34]].map(([x, y, w, h], i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx="6" fill="none" stroke={CYAN} strokeOpacity="0.55" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="2.5" fill={CYAN} className="hero-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
            <circle cx={x + w} cy={y + h} r="2.5" fill={LIME} className="hero-pulse" style={{ animationDelay: `${i * 0.4 + 0.2}s` }} />
          </g>
        ))}
        <rect x="310" y="228" width="240" height="4" fill={CYAN} fillOpacity="0.5" className="hero-sweep" />
      </g>
    </svg>
  );
}

/* ── Layered neural network → prediction signal ──────────────────────── */
function NeuralScene({ className = "", accent = VIOLET }: P & { accent?: string }) {
  const layers = [
    { x: 330, n: 4 },
    { x: 410, n: 5 },
    { x: 490, n: 5 },
    { x: 570, n: 3 },
  ];
  const nodeY = (n: number, i: number) => 230 - ((n - 1) * 40) / 2 + i * 40;
  return (
    <svg {...svg} className={className}>
      <ellipse cx="450" cy="230" rx="230" ry="190" fill={accent} fillOpacity="0.08" />
      <g className="hero-scene-drift">
        {layers.slice(0, -1).map((L, li) =>
          Array.from({ length: L.n }).map((_, i) =>
            Array.from({ length: layers[li + 1].n }).map((_, j) => (
              <line key={`${li}-${i}-${j}`} x1={L.x} y1={nodeY(L.n, i)} x2={layers[li + 1].x} y2={nodeY(layers[li + 1].n, j)}
                stroke={CYAN} strokeOpacity="0.12" strokeWidth="1" />
            )),
          ),
        )}
        {layers.map((L, li) =>
          Array.from({ length: L.n }).map((_, i) => (
            <circle key={`${li}-${i}`} cx={L.x} cy={nodeY(L.n, i)} r="6"
              fill={li === layers.length - 1 ? LIME : "#FFFFFF"} stroke={li === layers.length - 1 ? LIME : CYAN}
              strokeOpacity="0.5" strokeWidth="1.5"
              className={li === layers.length - 1 ? "hero-pulse" : undefined}
              style={{ animationDelay: `${i * 0.3}s` }} />
          )),
        )}
        <path d="M582 230 H620" stroke={LIME} strokeOpacity="0.6" strokeWidth="2.5" className="hero-flow-line" />
      </g>
    </svg>
  );
}

/* ── Three device silhouettes, one shared experience ─────────────────── */
function DevicesScene({ className = "" }: P) {
  return (
    <svg {...svg} className={className}>
      <ellipse cx="450" cy="240" rx="230" ry="190" fill={CYAN} fillOpacity="0.07" />
      <g className="hero-scene-drift">
        {/* desktop */}
        <g>
          {card(340, 120, 200, 130)}
          <rect x="352" y="134" width="80" height="10" rx="5" fill={NAVY} fillOpacity="0.14" />
          <rect x="352" y="152" width="160" height="7" rx="3.5" fill={NAVY} fillOpacity="0.08" />
          <rect x="352" y="196" width="54" height="22" rx="6" fill={CYAN} fillOpacity="0.16" stroke={CYAN} strokeOpacity="0.4" />
          <rect x="418" y="266" width="44" height="6" rx="3" fill={NAVY} fillOpacity="0.12" />
        </g>
        {/* tablet */}
        <g>
          <rect x="470" y="150" width="100" height="140" rx="12" fill="#FFFFFF" stroke={NAVY} strokeOpacity="0.16" strokeWidth="1.5" />
          <rect x="484" y="166" width="60" height="8" rx="4" fill={NAVY} fillOpacity="0.12" />
          <rect x="484" y="182" width="72" height="6" rx="3" fill={NAVY} fillOpacity="0.07" />
          <circle cx="520" cy="276" r="3" fill={CYAN} />
        </g>
        {/* phone */}
        <g>
          <rect x="556" y="200" width="58" height="118" rx="14" fill="#FFFFFF" stroke={CYAN} strokeOpacity="0.4" strokeWidth="1.5" />
          <rect x="568" y="216" width="34" height="6" rx="3" fill={NAVY} fillOpacity="0.14" />
          <rect x="568" y="230" width="26" height="5" rx="2.5" fill={NAVY} fillOpacity="0.08" />
          <rect x="568" y="292" width="34" height="14" rx="5" fill={LIME} fillOpacity="0.2" stroke={LIME} strokeOpacity="0.4" />
        </g>
        {/* shared connection */}
        <path d="M440 250 C480 320 520 320 560 300" stroke={CYAN} strokeOpacity="0.4" strokeWidth="2" className="hero-flow-line" />
        <circle cx="440" cy="250" r="3" fill={CYAN} className="hero-pulse" />
      </g>
    </svg>
  );
}

/* ── Multiple systems syncing into one reliable profile layer ────────── */
function DataSyncScene({ className = "", accent = VIOLET }: P & { accent?: string }) {
  const sources = [110, 190, 270, 350];
  return (
    <svg {...svg} className={className}>
      <ellipse cx="470" cy="230" rx="220" ry="190" fill={accent} fillOpacity="0.08" />
      <g className="hero-scene-drift">
        {sources.map((y, i) => (
          <g key={i}>
            {card(330, y - 16, 46, 32)}
            <path d={`M376 ${y} C430 ${y} 430 230 470 230`} stroke={CYAN} strokeOpacity="0.4" strokeWidth="1.8" className="hero-flow-line" style={{ animationDelay: `${i * 0.35}s` }} />
          </g>
        ))}
        {/* profile layer */}
        <rect x="470" y="185" width="70" height="90" rx="14" fill="#FFFFFF" stroke={CYAN} strokeOpacity="0.45" strokeWidth="1.5" />
        <rect x="470" y="185" width="70" height="90" rx="14" fill={CYAN} fillOpacity="0.06" className="hero-breathe" />
        <circle cx="505" cy="212" r="10" fill={CYAN} fillOpacity="0.16" stroke={CYAN} strokeOpacity="0.5" />
        <rect x="484" y="234" width="42" height="6" rx="3" fill={NAVY} fillOpacity="0.14" />
        <rect x="484" y="248" width="30" height="6" rx="3" fill={NAVY} fillOpacity="0.09" />
        {/* to actions */}
        <path d="M540 210 H600" stroke={LIME} strokeOpacity="0.5" strokeWidth="2" className="hero-flow-line" />
        <path d="M540 250 H600" stroke={CYAN} strokeOpacity="0.5" strokeWidth="2" className="hero-flow-line" style={{ animationDelay: "0.5s" }} />
        {card(600, 194, 34, 32)}
        {card(600, 234, 34, 32)}
      </g>
    </svg>
  );
}

/* ── Two paths converging into one stronger outcome signal ───────────── */
function FunnelScene({ className = "", accent = LIME }: P & { accent?: string }) {
  return (
    <svg {...svg} className={className}>
      <ellipse cx="460" cy="230" rx="220" ry="190" fill={accent} fillOpacity="0.08" />
      <g className="hero-scene-drift">
        {[150, 200, 250, 300].map((y, i) => (
          <g key={i}>
            {card(320, y - 14, 40, 28)}
            <path d={`M360 ${y} C440 ${y} 440 230 500 230`} stroke={CYAN} strokeOpacity="0.4" strokeWidth="1.8" className="hero-flow-line" style={{ animationDelay: `${i * 0.3}s` }} />
          </g>
        ))}
        {/* converge node */}
        <circle cx="510" cy="230" r="26" fill="#FFFFFF" stroke={CYAN} strokeOpacity="0.45" strokeWidth="1.5" />
        <circle cx="510" cy="230" r="26" fill={CYAN} fillOpacity="0.06" className="hero-breathe" />
        <path d="M510 230 L560 200 L560 260 Z" fill={accent} fillOpacity="0.18" stroke={accent} strokeOpacity="0.5" strokeWidth="1.5" />
        <path d="M566 230 H620" stroke={accent} strokeOpacity="0.7" strokeWidth="3" className="hero-flow-line" />
        <circle cx="600" cy="230" r="6" fill={accent} className="hero-pulse" />
      </g>
    </svg>
  );
}

/* ── Creative workbench: swatch, wireframe, screen, timeline strip ───── */
function WorkbenchScene({ className = "", accent = VIOLET }: P & { accent?: string }) {
  return (
    <svg {...svg} className={className}>
      <ellipse cx="450" cy="230" rx="230" ry="190" fill={accent} fillOpacity="0.08" />
      <g className="hero-scene-drift">
        {/* swatches */}
        <g>
          <rect x="330" y="120" width="30" height="30" rx="7" fill={accent} fillOpacity="0.7" />
          <rect x="330" y="156" width="30" height="30" rx="7" fill={CYAN} fillOpacity="0.6" />
          <rect x="330" y="192" width="30" height="30" rx="7" fill={LIME} fillOpacity="0.6" />
        </g>
        {/* wireframe */}
        <g>
          {card(384, 110, 120, 150, CYAN, 0.4)}
          <rect x="398" y="126" width="46" height="8" rx="4" fill={NAVY} fillOpacity="0.14" />
          <rect x="398" y="142" width="92" height="6" rx="3" fill={NAVY} fillOpacity="0.08" />
          <rect x="398" y="158" width="92" height="40" rx="6" fill={NAVY} fillOpacity="0.05" stroke={NAVY} strokeOpacity="0.1" />
          <rect x="398" y="210" width="40" height="16" rx="5" fill={CYAN} fillOpacity="0.16" stroke={CYAN} strokeOpacity="0.4" />
        </g>
        {/* polished screen */}
        <g>
          {card(520, 140, 100, 120, CYAN, 0.35)}
          <rect x="520" y="140" width="100" height="120" rx="11" fill={CYAN} fillOpacity="0.05" />
          <circle cx="545" cy="166" r="9" fill={accent} fillOpacity="0.2" />
          <rect x="536" y="188" width="68" height="6" rx="3" fill={NAVY} fillOpacity="0.12" />
          <rect x="536" y="202" width="48" height="6" rx="3" fill={NAVY} fillOpacity="0.08" />
        </g>
        {/* timeline strip */}
        <g>
          <rect x="330" y="300" width="290" height="34" rx="9" fill="#FFFFFF" stroke={NAVY} strokeOpacity="0.14" strokeWidth="1.5" />
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={i} x={342 + i * 30} y="308" width="20" height="18" rx="4"
              fill={i % 3 === 0 ? accent : CYAN} fillOpacity="0.22" />
          ))}
          <rect x="342" y="304" width="3" height="26" fill={accent} className="hero-sweep" />
        </g>
      </g>
    </svg>
  );
}

/* ── Distributed squad: shared canvas + orbiting member nodes + arc ──── */
function SquadScene({ className = "", accent = CYAN }: P & { accent?: string }) {
  const members = [
    [360, 150], [560, 160], [580, 300], [370, 320], [470, 120],
  ];
  return (
    <svg {...svg} className={className}>
      <ellipse cx="470" cy="230" rx="220" ry="190" fill={accent} fillOpacity="0.08" />
      <g className="hero-scene-drift">
        {/* timezone arc */}
        <path d="M330 300 A170 170 0 0 1 610 170" fill="none" stroke={NAVY} strokeOpacity="0.12" strokeWidth="1.5" strokeDasharray="3 8" />
        {/* shared product canvas */}
        <g>
          {card(430, 195, 90, 70, CYAN, 0.4)}
          <rect x="430" y="195" width="90" height="70" rx="11" fill={CYAN} fillOpacity="0.05" />
          <rect x="444" y="210" width="40" height="7" rx="3.5" fill={NAVY} fillOpacity="0.14" />
          <rect x="444" y="224" width="62" height="5" rx="2.5" fill={NAVY} fillOpacity="0.08" />
          <rect x="444" y="238" width="24" height="14" rx="4" fill={LIME} fillOpacity="0.2" stroke={LIME} strokeOpacity="0.4" />
        </g>
        {members.map(([x, y], i) => (
          <g key={i}>
            <path d={`M475 230 L${x} ${y}`} stroke={CYAN} strokeOpacity="0.3" strokeWidth="1.5" className="hero-flow-line" style={{ animationDelay: `${i * 0.35}s` }} />
            <circle cx={x} cy={y} r="14" fill="#FFFFFF" stroke={NAVY} strokeOpacity="0.16" strokeWidth="1.5" />
            <circle cx={x} cy={y - 3} r="4" fill={NAVY} fillOpacity="0.25" />
            <path d={`M${x - 7} ${y + 8} A7 7 0 0 1 ${x + 7} ${y + 8}`} fill={NAVY} fillOpacity="0.18" />
            <circle cx={x + 11} cy={y - 10} r="2.5" fill={i % 2 ? LIME : CYAN} className="hero-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ── Constellation of capability nodes (directory / overview) ────────── */
function NetworkScene({ className = "", accent = CYAN }: P & { accent?: string }) {
  const nodes = [
    [420, 130], [520, 170], [580, 260], [520, 350], [420, 330], [350, 250], [470, 240],
  ];
  return (
    <svg {...svg} className={className}>
      <ellipse cx="465" cy="240" rx="220" ry="195" fill={accent} fillOpacity="0.08" />
      <g className="hero-scene-drift">
        {nodes.map(([x1, y1], i) =>
          nodes.slice(i + 1).map(([x2, y2], j) => {
            const d = Math.hypot(x1 - x2, y1 - y2);
            return d < 150 ? (
              <line key={`${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={CYAN} strokeOpacity="0.16" strokeWidth="1" />
            ) : null;
          }),
        )}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i === nodes.length - 1 ? 16 : 10}
              fill="#FFFFFF" stroke={i === nodes.length - 1 ? accent : CYAN} strokeOpacity="0.5" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="3.4" fill={i % 3 === 0 ? LIME : CYAN} className="hero-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ── Office → cloud communication motif (contact) ────────────────────── */
function ConnectScene({ className = "" }: P) {
  return (
    <svg {...svg} className={className}>
      <ellipse cx="450" cy="230" rx="230" ry="190" fill={CYAN} fillOpacity="0.07" />
      <g className="hero-scene-drift">
        {/* cloud layer */}
        <g>
          <path d="M430 150 a26 26 0 0 1 50 -8 a22 22 0 0 1 34 20 a20 20 0 0 1 -6 40 h-78 a24 24 0 0 1 0 -52 z"
            fill="#FFFFFF" stroke={CYAN} strokeOpacity="0.4" strokeWidth="1.5" />
        </g>
        {/* two endpoints */}
        {card(340, 300, 70, 50)}
        <circle cx="375" cy="325" r="8" fill={CYAN} fillOpacity="0.16" stroke={CYAN} strokeOpacity="0.5" />
        {card(520, 300, 70, 50)}
        <circle cx="555" cy="325" r="8" fill={LIME} fillOpacity="0.16" stroke={LIME} strokeOpacity="0.5" />
        <path d="M375 300 C375 230 440 210 455 198" stroke={CYAN} strokeOpacity="0.45" strokeWidth="2" className="hero-flow-line" />
        <path d="M555 300 C555 230 490 210 470 198" stroke={CYAN} strokeOpacity="0.45" strokeWidth="2" className="hero-flow-line" style={{ animationDelay: "0.5s" }} />
        <circle cx="455" cy="176" r="5" fill={CYAN} className="hero-pulse" />
      </g>
    </svg>
  );
}

/* ── Editorial knowledge system: article cards + research lines ──────── */
function KnowledgeScene({ className = "" }: P) {
  return (
    <svg {...svg} className={className}>
      <ellipse cx="450" cy="230" rx="230" ry="190" fill={CYAN} fillOpacity="0.07" />
      <g className="hero-scene-drift">
        {[[340, 120], [470, 100], [420, 250], [540, 220]].map(([x, y], i) => (
          <g key={i}>
            {card(x, y, 110, 90)}
            <rect x={x + 14} y={y + 16} width="60" height="8" rx="4" fill={NAVY} fillOpacity="0.14" />
            <rect x={x + 14} y={y + 32} width="82" height="5" rx="2.5" fill={NAVY} fillOpacity="0.08" />
            <rect x={x + 14} y={y + 44} width="82" height="5" rx="2.5" fill={NAVY} fillOpacity="0.08" />
            <rect x={x + 14} y={y + 62} width="34" height="12" rx="4" fill={CYAN} fillOpacity="0.14" stroke={CYAN} strokeOpacity="0.35" />
            <circle cx={x + 100} cy={y + 10} r="3" fill={i % 2 ? LIME : CYAN} className="hero-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
          </g>
        ))}
        <path d="M395 210 C440 210 450 190 470 190 M530 190 C560 190 560 260 575 260" stroke={CYAN} strokeOpacity="0.35" strokeWidth="1.8" className="hero-flow-line" />
      </g>
    </svg>
  );
}

/* ── Two people + shared systems canvas (strategy call) ──────────────── */
function JourneyScene({ className = "" }: P) {
  return (
    <svg {...svg} className={className}>
      <ellipse cx="450" cy="230" rx="230" ry="185" fill={CYAN} fillOpacity="0.07" />
      <g className="hero-scene-drift">
        {[370, 560].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={200} r="18" fill="#FFFFFF" stroke={NAVY} strokeOpacity="0.16" strokeWidth="1.5" />
            <circle cx={x} cy={195} r="5" fill={NAVY} fillOpacity="0.25" />
            <path d={`M${x - 9} 214 A9 9 0 0 1 ${x + 9} 214`} fill={NAVY} fillOpacity="0.18" />
          </g>
        ))}
        {card(420, 250, 100, 78, CYAN, 0.4)}
        <rect x="420" y="250" width="100" height="78" rx="11" fill={CYAN} fillOpacity="0.05" />
        <path d="M434 300 L456 280 L478 288 L506 262" stroke={LIME} strokeOpacity="0.7" strokeWidth="2" className="hero-flow-line" style={{ strokeDasharray: "5 5" }} />
        <path d="M388 210 C410 240 410 250 430 258 M542 210 C520 240 520 250 500 258" stroke={CYAN} strokeOpacity="0.4" strokeWidth="1.8" className="hero-flow-line" />
        <circle cx="470" cy="230" r="3" fill={CYAN} className="hero-pulse" />
      </g>
    </svg>
  );
}

/* ── Company / about: architectural linework + milestone nodes ───────── */
function LegacyScene({ className = "" }: P) {
  return (
    <svg {...svg} className={className}>
      <ellipse cx="450" cy="230" rx="230" ry="195" fill={CYAN} fillOpacity="0.07" />
      <g className="hero-scene-drift">
        <g stroke={NAVY} strokeOpacity="0.1" strokeWidth="1.5">
          <path d="M330 340 L330 170 L420 130 L520 160 L520 340" />
          <path d="M420 130 L420 340 M330 250 L520 250 M375 150 L375 340 M470 145 L470 340" />
          <path d="M540 340 L540 200 L610 180 L610 340" />
        </g>
        <path d="M300 360 H620" stroke={NAVY} strokeOpacity="0.18" strokeWidth="1.5" />
        {[330, 400, 470, 540, 610].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="360" r="5" fill={i === 4 ? LIME : CYAN} className="hero-pulse" style={{ animationDelay: `${i * 0.35}s` }} />
            <line x1={x} y1="360" x2={x} y2={330 - i * 4} stroke={CYAN} strokeOpacity="0.3" strokeWidth="1.5" className="hero-flow-line" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ── Careers: growth / org branching nodes ──────────────────────────── */
function GrowthScene({ className = "" }: P) {
  return (
    <svg {...svg} className={className}>
      <ellipse cx="450" cy="230" rx="230" ry="190" fill={LIME} fillOpacity="0.09" />
      <g className="hero-scene-drift">
        <circle cx="340" cy="240" r="16" fill="#FFFFFF" stroke={CYAN} strokeOpacity="0.5" strokeWidth="1.5" />
        <circle cx="340" cy="240" r="4" fill={CYAN} className="hero-pulse" />
        {[[440, 150], [460, 240], [440, 330]].map(([x, y], i) => (
          <g key={i}>
            <path d={`M356 240 C400 240 400 ${y} ${x} ${y}`} stroke={CYAN} strokeOpacity="0.4" strokeWidth="1.8" className="hero-flow-line" style={{ animationDelay: `${i * 0.3}s` }} />
            <circle cx={x} cy={y} r="12" fill="#FFFFFF" stroke={NAVY} strokeOpacity="0.16" strokeWidth="1.5" />
            {[[70, -40], [70, 0], [70, 40]].map(([dx, dy], j) => (
              <g key={j}>
                <path d={`M${x + 12} ${y} C${x + 40} ${y} ${x + 40} ${y + dy} ${x + dx} ${y + dy}`} stroke={LIME} strokeOpacity="0.3" strokeWidth="1.4" className="hero-flow-line" style={{ animationDelay: `${j * 0.25}s` }} />
                <circle cx={x + dx} cy={y + dy} r="5" fill={LIME} fillOpacity="0.5" className="hero-pulse" style={{ animationDelay: `${j * 0.3}s` }} />
              </g>
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ── Dark portfolio grid (case studies) ─────────────────────────────── */
function PortfolioScene({ className = "" }: P) {
  return (
    <svg {...svg} className={className}>
      <ellipse cx="450" cy="240" rx="240" ry="200" fill={CYAN} fillOpacity="0.12" />
      <g className="hero-scene-drift">
        {[[330, 110], [470, 90], [330, 250], [470, 230]].map(([x, y], i) => (
          <g key={i}>
            <rect x={x} y={y} width="120" height="110" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            <rect x={x + 14} y={y + 16} width="54" height="8" rx="4" fill="rgba(255,255,255,0.18)" />
            <rect x={x + 14} y={y + 32} width="88" height="5" rx="2.5" fill="rgba(255,255,255,0.09)" />
            <path d={`M${x + 14} ${y + 88} L${x + 44} ${y + 66} L${x + 74} ${y + 74} L${x + 104} ${y + 52}`}
              stroke={[CYAN, LIME, VIOLET, CYAN][i]} strokeOpacity="0.8" strokeWidth="2" className="hero-flow-line" style={{ strokeDasharray: "5 5" }} />
          </g>
        ))}
        <circle cx="600" cy="150" r="4" fill={LIME} className="hero-pulse" />
        <circle cx="590" cy="330" r="4" fill={VIOLET} className="hero-pulse" style={{ animationDelay: "0.6s" }} />
      </g>
    </svg>
  );
}

/* ── variant registry ─────────────────────────────────────────────────── */
export type HeroVariant =
  | "architecture" | "automation" | "studio"
  | "waveform" | "vision" | "neural" | "devices" | "datasync"
  | "funnel" | "workbench" | "squad" | "network"
  | "connect" | "knowledge" | "journey" | "legacy" | "growth" | "portfolio";

const REGISTRY: Record<HeroVariant, ComponentType<P>> = {
  architecture: ArchitectureScene,
  automation: AutomationScene,
  studio: StudioScene,
  waveform: WaveformScene,
  vision: VisionScene,
  neural: NeuralScene,
  devices: DevicesScene,
  datasync: DataSyncScene,
  funnel: FunnelScene,
  workbench: WorkbenchScene,
  squad: SquadScene,
  network: NetworkScene,
  connect: ConnectScene,
  knowledge: KnowledgeScene,
  journey: JourneyScene,
  legacy: LegacyScene,
  growth: GrowthScene,
  portfolio: PortfolioScene,
};

/* Per-route resolver. Subcategory slug wins; else category slug; else fallback. */
const CATEGORY_VARIANT: Record<string, HeroVariant> = {
  "ai-machine-learning-engineering": "automation",
  "software-web-architecture": "architecture",
  "salesforce-enterprise-cloud": "datasync",
  "experience-design-media": "studio",
  "seo-services": "funnel",
  "digital-marketing": "automation",
  "dedicated-squads-staffing": "squad",
};
const SUB_VARIANT: Record<string, HeroVariant> = {
  // AI & ML
  "ai-voice-agent-development": "waveform",
  "ai-automation-services": "automation",
  "autonomous-ai-agents": "automation",
  "business-process-automation": "automation",
  "ai-chatbot-development": "waveform",
  "ai-agents": "automation",
  "computer-vision": "vision",
  "generative-ai": "neural",
  "nlp-solutions": "neural",
  "deep-learning": "neural",
  // Software & web
  "software-development": "architecture",
  "custom-software-development": "architecture",
  "website-development": "devices",
  "saas-development": "architecture",
  "mobile-app-developer": "devices",
  "ios-app-development": "devices",
  "android-app-development": "devices",
  "cross-platform-mobile-app-development": "devices",
  "enterprise-software-development": "architecture",
  // Salesforce & cloud
  "salesforce-consulting-services": "journey",
  "salesforce-implementation-partner": "datasync",
  "crm-integration": "datasync",
  "system-integration": "network",
  // Design & media
  "graphic-design-services": "workbench",
  "brand-identity-design": "workbench",
  "ui-ux-design-agency": "studio",
  "ux-design": "workbench",
  "video-production": "workbench",
  "video-editing-services": "workbench",
  "brochure-design": "workbench",
  // SEO
  "conversion-rate-optimization": "funnel",
  "content-marketing-services": "knowledge",
  // Digital marketing
  "digital-marketing-agency": "automation",
  "social-media-marketing-agency": "funnel",
  "ppc-management-services": "funnel",
  "google-ads-agency": "funnel",
  "facebook-ads-agency": "funnel",
  "influencer-marketing-agency": "squad",
  // Dedicated squads
  "offshore-software-development": "squad",
  "dedicated-development-team": "squad",
};

export function heroVariantForRoute(categorySlug?: string, subSlug?: string): HeroVariant {
  if (subSlug && SUB_VARIANT[subSlug]) return SUB_VARIANT[subSlug];
  if (categorySlug && CATEGORY_VARIANT[categorySlug]) return CATEGORY_VARIANT[categorySlug];
  return "network";
}

/* ── the component ────────────────────────────────────────────────────── */
export function HeroVisual({
  variant,
  className = "",
}: {
  variant: HeroVariant;
  className?: string;
}) {
  const Scene = REGISTRY[variant] ?? NetworkScene;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 right-0 w-[58%] hidden md:block ${className}`}
    >
      <Scene className="h-full w-full" />
    </div>
  );
}
