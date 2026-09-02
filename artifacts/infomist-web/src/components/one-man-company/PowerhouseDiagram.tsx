import { useEffect, useRef, useState } from "react";
import { Crown, BrainCircuit } from "lucide-react";
import { DEPARTMENTS, JARVIS, TOTAL_AGENTS, SAMPLE_STATUS, type Department } from "./departments";

/* Node positions in a 100×100 space (percent of the frame). */
const CENTER = { x: 50, y: 55 };
const CEO = { x: 50, y: 9 };
const R = 33;
const pos = (angleDeg: number) => ({
  x: CENTER.x + R * Math.cos((angleDeg * Math.PI) / 180),
  y: CENTER.y + R * Math.sin((angleDeg * Math.PI) / 180),
});

type Focus = string | null; // department id | "jarvis" | null

export function PowerhouseDiagram() {
  const [focus, setFocus] = useState<Focus>(null);
  const [cycle, setCycle] = useState(0);
  const reduced = usePrefersReducedMotion();

  // Calm auto-cycle: highlight one path at a time unless the user is interacting.
  useEffect(() => {
    if (reduced || focus) return;
    const t = setInterval(() => setCycle((c) => (c + 1) % DEPARTMENTS.length), 2600);
    return () => clearInterval(t);
  }, [reduced, focus]);

  const activeDeptId = focus && focus !== "jarvis" ? focus : DEPARTMENTS[cycle]?.id;
  const activeDept = DEPARTMENTS.find((d) => d.id === activeDeptId);
  const detail = focus === "jarvis" ? "jarvis" : focus ? activeDept : null;

  return (
    <div className="relative w-full">
      <div
        className="relative w-full overflow-hidden rounded-[24px]"
        style={{
          aspectRatio: "1 / 1",
          background: "linear-gradient(160deg,#0B1728 0%,#0F1D30 55%,#12243A 100%)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 30px 100px rgba(0,0,0,0.40)",
        }}
      >
        {/* subtle radial focus glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 50% 55%, rgba(14,165,233,0.10), transparent 55%)" }}
        />

        {/* LAYER 2 — SVG connection lines */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="none">
          <line
            x1={CEO.x} y1={CEO.y} x2={CENTER.x} y2={CENTER.y}
            stroke="rgba(255,255,255,0.14)" strokeWidth="0.4"
          />
          {!reduced ? (
            <line
              x1={CEO.x} y1={CEO.y} x2={CENTER.x} y2={CENTER.y}
              stroke="#0EA5E9" strokeWidth="0.5" strokeLinecap="round"
              strokeDasharray="1.6 3" className="hero-flow-line" style={{ opacity: 0.7 }}
            />
          ) : null}

          {DEPARTMENTS.map((d) => {
            const p = pos(d.angle);
            const on = activeDeptId === d.id;
            return (
              <g key={d.id}>
                <line
                  x1={CENTER.x} y1={CENTER.y} x2={p.x} y2={p.y}
                  stroke={on ? d.color : "rgba(255,255,255,0.12)"}
                  strokeWidth={on ? 0.55 : 0.35}
                  style={{ transition: "stroke 200ms, stroke-width 200ms" }}
                />
                {on && !reduced ? (
                  <line
                    x1={CENTER.x} y1={CENTER.y} x2={p.x} y2={p.y}
                    stroke={d.color} strokeWidth="0.55" strokeLinecap="round"
                    strokeDasharray="1.4 3" className="hero-flow-line"
                  />
                ) : null}
              </g>
            );
          })}
        </svg>

        {/* LAYER 3+4 — HTML nodes (crisp text) */}
        {/* CEO */}
        <NodeShell x={CEO.x} y={CEO.y} dim={false}>
          <div className="flex items-center gap-2 rounded-xl px-3 py-2"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <Crown size={14} className="text-[#8DE7FF]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-white">CEO</span>
          </div>
        </NodeShell>

        {/* Jarvis */}
        <NodeShell x={CENTER.x} y={CENTER.y} dim={!!focus && focus !== "jarvis"}>
          <button
            type="button"
            onMouseEnter={() => setFocus("jarvis")}
            onMouseLeave={() => setFocus(null)}
            onFocus={() => setFocus("jarvis")}
            onBlur={() => setFocus(null)}
            onClick={() => setFocus((f) => (f === "jarvis" ? null : "jarvis"))}
            aria-label={`${JARVIS.name} — ${JARVIS.role}`}
            className="group flex flex-col items-center gap-1 rounded-2xl px-5 py-4 outline-none transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-[#56D6FF]"
            style={{
              background: "#0F1D30",
              border: "1px solid rgba(86,214,255,0.35)",
              boxShadow: focus === "jarvis" ? "0 0 34px rgba(14,165,233,0.30)" : "0 0 20px rgba(14,165,233,0.14)",
              transform: focus === "jarvis" ? "scale(1.06)" : "scale(1)",
            }}
          >
            <BrainCircuit size={20} className="text-[#56D6FF]" />
            <span className="text-sm font-black tracking-tight text-white">JARVIS</span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8DE7FF]">
              Orchestration
            </span>
          </button>
        </NodeShell>

        {/* Departments */}
        {DEPARTMENTS.map((d) => {
          const p = pos(d.angle);
          const dim = !!focus && focus !== d.id;
          const on = focus === d.id;
          const Icon = d.icon;
          return (
            <NodeShell key={d.id} x={p.x} y={p.y} dim={dim}>
              <button
                type="button"
                onMouseEnter={() => setFocus(d.id)}
                onMouseLeave={() => setFocus(null)}
                onFocus={() => setFocus(d.id)}
                onBlur={() => setFocus(null)}
                onClick={() => setFocus((f) => (f === d.id ? null : d.id))}
                aria-label={`${d.name} — ${d.agents} AI agents. ${d.tagline}`}
                className="group flex w-[128px] flex-col items-start gap-1.5 rounded-xl px-3 py-2.5 text-left outline-none transition-transform duration-200 focus-visible:ring-2"
                style={{
                  background: on ? "#12243A" : "#0B1728",
                  border: `1px solid ${on ? d.color : "rgba(255,255,255,0.10)"}`,
                  boxShadow: on ? `0 0 26px ${d.color}44` : "none",
                  transform: on ? "scale(1.06)" : "scale(1)",
                  // @ts-expect-error css var for ring colour
                  "--tw-ring-color": d.color,
                }}
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-md"
                  style={{ background: `${d.color}22`, color: d.color, border: `1px solid ${d.color}3a` }}
                >
                  <Icon size={13} strokeWidth={2.2} />
                </span>
                <span className="text-[12px] font-bold leading-tight text-white">{d.name}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#718197]">
                  {d.agents} AI agents
                </span>
              </button>
            </NodeShell>
          );
        })}

        {/* LAYER 5 — sample status cards, pinned to the corners */}
        <StatusCard style={{ left: "3%", top: "3.5%" }} data={SAMPLE_STATUS[0]} />
        <StatusCard style={{ right: "3%", top: "3.5%" }} data={SAMPLE_STATUS[1]} />
        <StatusCard style={{ left: "3%", bottom: "3.5%" }} data={SAMPLE_STATUS[2]} />
        <StatusCard style={{ right: "3%", bottom: "3.5%" }} data={SAMPLE_STATUS[3]} />
      </div>

      {/* Detail card (below the frame — same on desktop & mobile, keeps it simple + crisp) */}
      <div className="mt-4 min-h-[132px] rounded-2xl p-5"
        style={{ background: "#0F1D30", border: "1px solid rgba(255,255,255,0.10)" }}>
        {detail === "jarvis" ? (
          <>
            <p className="text-sm font-black text-white">JARVIS</p>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8DE7FF]">{JARVIS.role}</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
              {JARVIS.does.map((x) => (
                <li key={x} className="flex items-center gap-2 text-sm text-[#AAB8C8]">
                  <span className="h-1 w-1 rounded-full bg-[#56D6FF]" /> {x}
                </li>
              ))}
            </ul>
          </>
        ) : detail ? (
          <DeptDetail dept={detail} />
        ) : (
          <p className="text-sm text-[#718197]">
            Hover or tap a node to see how each part of the company works — Jarvis at the centre,
            {" "}{TOTAL_AGENTS} specialised agents around it.
          </p>
        )}
      </div>
    </div>
  );
}

function NodeShell({
  x,
  y,
  dim,
  children,
}: {
  x: number;
  y: number;
  dim: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute z-10 transition-opacity duration-200"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)", opacity: dim ? 0.4 : 1 }}
    >
      {children}
    </div>
  );
}

function DeptDetail({ dept }: { dept: Department }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-black text-white">{dept.name.toUpperCase()}</p>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: dept.color }}>
          {dept.agents} AI agents
        </p>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {dept.agentList.map((a) => (
          <span
            key={a}
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-[#AAB8C8]"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {a}
          </span>
        ))}
      </div>
      <p className="mt-2.5 text-sm text-[#AAB8C8]">{dept.tagline}</p>
    </>
  );
}

const TONE: Record<string, string> = { active: "#61D7A5", running: "#56D6FF", pending: "#F4B860" };

function StatusCard({
  data,
  style,
}: {
  data: (typeof SAMPLE_STATUS)[number];
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute z-[5] hidden rounded-xl px-3 py-2 sm:block"
      style={{
        ...style,
        background: "rgba(11,23,40,0.85)",
        border: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(4px)",
      }}
    >
      <p className="text-[9px] font-bold uppercase tracking-widest text-[#718197]">{data.dept}</p>
      <p className="text-[12px] font-bold text-white">{data.metric}</p>
      <p className="flex items-center gap-1.5 text-[10px] text-[#AAB8C8]">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: TONE[data.tone] }} />
        {data.state}
      </p>
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  const ref = useRef<MediaQueryList | null>(null);
  useEffect(() => {
    ref.current = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(!!ref.current?.matches);
    on();
    ref.current.addEventListener("change", on);
    return () => ref.current?.removeEventListener("change", on);
  }, []);
  return reduced;
}
