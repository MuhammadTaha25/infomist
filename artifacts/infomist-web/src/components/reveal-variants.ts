/**
 * Framer Motion variant objects shared across Reveal components.
 * Kept in a separate non-component file so Vite's React Fast Refresh can
 * hot-swap Reveal.tsx without a full-page reload.
 */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
