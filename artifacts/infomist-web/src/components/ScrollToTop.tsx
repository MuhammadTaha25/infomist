import { useLayoutEffect } from "react";
import { useLocation } from "wouter";

/**
 * Scrolls the window to the top on every route change.
 *
 * Uses useLayoutEffect (fires synchronously before the browser paints) so the
 * scroll is applied BEFORE Framer Motion's IntersectionObservers evaluate the
 * new page's Reveal elements. If we used useEffect (after paint), elements
 * would be assessed while the viewport is still at the previous page's scroll
 * position — those at the top of the new page would be off-screen and, with
 * once:true, would stay invisible permanently.
 *
 * Mount once inside <Router> so it covers the entire app.
 */
export function ScrollToTop() {
  const [location] = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}
