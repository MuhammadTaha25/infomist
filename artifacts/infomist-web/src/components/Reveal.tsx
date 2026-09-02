import type { ReactNode, CSSProperties } from "react";

/**
 * Entrance reveal — CSS-driven (`.rise-in` in index.css). Kept as thin wrappers so the
 * many existing call sites don't change. `.rise-in` animates transform only (never
 * opacity), so content is always visible even if the animation is throttled or a
 * reduced-motion preference disables it.
 *
 * `delay` accepts either seconds (values < 5, the old framer-motion convention) or
 * milliseconds — both are normalised to ms.
 */
function toMs(delay?: number): string | undefined {
  if (!delay) return undefined;
  return `${delay < 5 ? Math.round(delay * 1000) : delay}ms`;
}

export function Reveal({
  children,
  className = "",
  style,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  /** accepted for backwards compat; the CSS reveal is always one-shot */
  once?: boolean;
}) {
  return (
    <div className={`rise-in ${className}`} style={{ animationDelay: toMs(delay), ...style }}>
      {children}
    </div>
  );
}

export function RevealGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function RevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`rise-in ${className}`}>{children}</div>;
}

export { Eyebrow } from "./site/primitives";
