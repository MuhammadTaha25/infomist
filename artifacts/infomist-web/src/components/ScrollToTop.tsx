import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "wouter";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Two behaviours, mounted once inside <Router> so they cover the whole app:
 *
 * 1. On every route change, jump the window to the top (instant) — done in a
 *    layout effect so it lands before Reveal IntersectionObservers evaluate.
 * 2. When a link points at the page you're already on (the logo while on "/",
 *    "Solutions" while on /solutions, "Case Studies" from a case-study page,
 *    …), wouter does nothing — so catch that click and smooth-scroll to top.
 */
export function ScrollToTop() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      // Note: don't bail on e.defaultPrevented — wouter's <Link> preventDefaults
      // every in-app navigation before this bubble-phase listener runs.
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      if (a.origin !== window.location.origin) return;

      // Path relative to the router base, matching what useLocation() returns.
      let path = a.pathname;
      if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length) || "/";
      const here = location.split(/[?#]/)[0] || "/";

      // Same page, and not an in-page #anchor jump — bring the user back up.
      if (path === here && !a.hash) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, left: 0, behavior: reduce ? "instant" : "smooth" });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [location]);

  return null;
}
