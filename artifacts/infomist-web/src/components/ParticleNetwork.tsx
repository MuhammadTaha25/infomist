import { useEffect, useRef } from "react";

/**
 * Animated node-and-line network for the homepage hero background.
 *
 * The nodes drift slowly and each one rides a travelling sine wave, so the
 * whole web undulates like the surface of water. Pure ambient motion — no
 * pointer interaction, no layout impact. Falls back to a single static frame
 * when the visitor prefers reduced motion.
 */

interface Node {
  /** base position — the drift is applied to these */
  bx: number;
  by: number;
  vx: number;
  vy: number;
  /** per-node phase offset so the wave isn't uniform */
  phase: number;
}

const LINE_COLOR = "14, 165, 233"; // Infomist cyan
const LINE_DISTANCE = 150;
const COUNT_DIVISOR = 11000;
const WAVE_AMP = 9; // px vertical sway
const WAVE_SPEED = 0.00042;

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let start = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      // Layout not ready yet (e.g. hydrating in a hidden container) — try again.
      if (width === 0 || height === 0) {
        requestAnimationFrame(resize);
        return;
      }
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(110, Math.max(28, Math.floor((width * height) / COUNT_DIVISOR)));
      nodes = Array.from({ length: count }, () => ({
        bx: Math.random() * width,
        by: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const positionsAt = (t: number) => {
      const pts: Array<{ x: number; y: number }> = [];
      for (const n of nodes) {
        if (!reduce) {
          n.bx += n.vx;
          n.by += n.vy;
          if (n.bx < -20) n.bx = width + 20;
          if (n.bx > width + 20) n.bx = -20;
          if (n.by < -20) n.by = height + 20;
          if (n.by > height + 20) n.by = -20;
        }
        // travelling wave: offset depends on x-position + time + node phase
        const wave = reduce ? 0 : Math.sin(n.bx * 0.012 + t * WAVE_SPEED + n.phase) * WAVE_AMP;
        pts.push({ x: n.bx, y: n.by + wave });
      }
      return pts;
    };

    const draw = (now: number) => {
      const t = now - start;
      const pts = positionsAt(t);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINE_DISTANCE) {
            const o = (1 - dist / LINE_DISTANCE) * 0.28;
            ctx.strokeStyle = `rgba(${LINE_COLOR}, ${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${LINE_COLOR}, 0.55)`;
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduce) {
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
