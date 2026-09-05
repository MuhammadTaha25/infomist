import { useEffect, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * One hero clip. Renders the poster still immediately; the <video> is only
 * mounted when `active` AND motion is allowed AND we're not on a small screen.
 * That keeps the network to a single clip at a time and gives reduced-motion
 * / mobile users a clean static frame.
 */
export function HeroVideo({
  media,
  active,
  className = "",
  posterOnly = false,
}: {
  media: string;
  active: boolean;
  className?: string;
  /** force the still frame (mobile / data saver) */
  posterOnly?: boolean;
}) {
  const poster = `${BASE}hero/${media}.webp`;
  const src = `${BASE}hero/${media}.mp4`;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const showVideo = active && !reduced && !posterOnly;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      v.pause();
    }
  }, [active, showVideo]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
