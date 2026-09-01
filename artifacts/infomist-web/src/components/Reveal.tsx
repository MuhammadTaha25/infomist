import { motion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";
import { fadeUp, staggerContainer } from "./reveal-variants";

/**
 * Reveals children with a fade-up animation when they enter the viewport.
 *
 * viewport.amount:0 fires the observer as soon as even 1px of the element
 * enters the viewport (no negative inset). A negative margin like "-80px"
 * would shrink the observation zone — elements at the top of a freshly-
 * navigated page would fall inside the dead zone and, with once:true, stay
 * at opacity:0 forever.
 */
export function Reveal({
  children,
  className,
  style,
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0 }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  icon: Icon,
  children,
  tone = "cyan",
  className = "",
}: {
  icon: any;
  children: ReactNode;
  tone?: "cyan" | "lime" | "slate";
  className?: string;
}) {
  const badgeTone =
    tone === "cyan" ? "text-[#0EA5E9] bg-cyan-50" : tone === "lime" ? "text-[#65A30D] bg-lime-50" : "text-slate-500 bg-slate-100";
  const textTone = tone === "cyan" ? "text-[#0EA5E9]" : tone === "lime" ? "text-[#65A30D]" : "text-slate-500";
  return (
    <div className={`flex items-center gap-2.5 mb-4 ${className}`}>
      <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${badgeTone}`}>
        <Icon size={14} strokeWidth={2.4} />
      </span>
      <span className={`text-xs font-bold tracking-[0.22em] uppercase ${textTone}`}>{children}</span>
    </div>
  );
}
