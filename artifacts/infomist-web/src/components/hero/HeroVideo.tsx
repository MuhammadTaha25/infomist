import { useCallback, useEffect, useRef, useState } from "react";

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
 *
 * The clip plays through ONCE on load (no loop) and rests on its last frame.
 * In the slider it replays from the start whenever its slide becomes active
 * again.
 */
export function HeroVideo({
  media,
  active,
  className = "",
  posterOnly = false,
  objectPosition = "center",
}: {
  media: string;
  active: boolean;
  className?: string;
  /** force the still frame (mobile / data saver) */
  posterOnly?: boolean;
  /** CSS object-position for the clip — shift the framing so the subject
   *  clears the left-hand text column (e.g. "78% 50%"). */
  objectPosition?: string;
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

  /** Play the clip once from the top. */
  const playOnce = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.currentTime = 0;
    } catch {
      /* not seekable yet — fine */
    }
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) playOnce();
    else v.pause();
  }, [active, showVideo, playOnce]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition }}
      />
      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition }}
          src={src}
          poster={poster}
          muted
          playsInline
          autoPlay
          preload="auto"
          aria-hidden="true"
          onLoadedData={playOnce}
        />
      )}
    </div>
  );
}
