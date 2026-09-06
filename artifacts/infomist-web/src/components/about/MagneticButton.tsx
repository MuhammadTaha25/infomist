import { useRef, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

/**
 * A button with a restrained magnetic pull toward the pointer + an arrow that
 * travels on hover. The magnetism is pointer-driven inline transform, capped at
 * a few px, and is skipped entirely for coarse pointers / reduced motion.
 */
export function MagneticButton({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const canPull = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || !canPull()) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    el.style.transform = `translate(${(dx * 10).toFixed(1)}px, ${(dy * 8 - 2).toFixed(1)}px)`;
  };
  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  const base =
    "group inline-flex h-[52px] items-center justify-center gap-2 rounded-[12px] px-7 text-sm font-semibold transition-[transform,background-color,border-color,box-shadow] duration-300 will-change-transform";
  const look =
    variant === "solid"
      ? "text-[#0F172A] hover:shadow-[0_16px_40px_-10px_rgba(132,204,22,0.45)]"
      : "text-[#F4F8FC] border border-white/15 hover:border-[rgba(96,165,250,0.4)] hover:bg-white/[0.04]";
  const style = variant === "solid" ? { background: "#84CC16" } : undefined;

  const inner = (
    <>
      {children}
      <ArrowRight
        size={16}
        strokeWidth={2.6}
        className="transition-transform duration-300 group-hover:translate-x-1.5"
      />
    </>
  );

  if (href.startsWith("#") || href.startsWith("http")) {
    return (
      <a ref={ref} href={href} className={`${base} ${look} ${className}`} style={style} onMouseMove={onMove} onMouseLeave={reset}>
        {inner}
      </a>
    );
  }
  return (
    <Link ref={ref} href={href} className={`${base} ${look} ${className}`} style={style} onMouseMove={onMove} onMouseLeave={reset}>
      {inner}
    </Link>
  );
}
