import { useEffect } from "react";

const SITE = "https://www.infomist.com";
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const DEFAULT_OG = "/opengraph.jpg";

function absUrl(v: string) {
  return v.startsWith("http") ? v : `${SITE}${v.startsWith("/") ? "" : "/"}${v}`;
}

/** Current path, relative to the router base, without query/hash — for canonical. */
function currentPath() {
  if (typeof window === "undefined") return "/";
  let p = window.location.pathname || "/";
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length) || "/";
  if (p.length > 1) p = p.replace(/\/+$/, "");
  return p || "/";
}

/** upsert <meta {attr}="{key}"> and return a restore fn */
function setMeta(attr: "property" | "name", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  const created = !el;
  const prev = el?.getAttribute("content") ?? null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
  return () => {
    if (created) el?.remove();
    else if (prev !== null) el?.setAttribute("content", prev);
  };
}

interface MetaOptions {
  /** OG/Twitter image — path under /public or absolute URL. Defaults to /opengraph.jpg */
  image?: string;
  /** override the canonical path (defaults to the current route) */
  canonicalPath?: string;
  /** og:type — "website" (default) or "article" */
  type?: "website" | "article";
}

/**
 * Owns the page's <title>, meta description, canonical link and the full
 * Open Graph + Twitter Card set for the lifetime of the page — restoring the
 * previous values on unmount so SPA navigation never leaves stale tags.
 *
 * Every marketing page calls this, so canonical + social tags are automatic.
 * `useSocialMeta` remains for the few pages that need a per-page OG image or a
 * canonical path that differs from the route (it runs after and wins).
 *
 * Client-side only — static crawlers still get the baseline tags from
 * index.html; Google renders JS so it sees these.
 */
export function useMeta(title: string, description: string, opts: MetaOptions = {}) {
  const { image, canonicalPath, type = "website" } = opts;

  useEffect(() => {
    const restores: Array<() => void> = [];

    const prevTitle = document.title;
    document.title = title;
    restores.push(() => {
      document.title = prevTitle;
    });

    restores.push(setMeta("name", "description", description));

    const url = absUrl(canonicalPath ?? currentPath());
    const img = absUrl(image ?? DEFAULT_OG);

    restores.push(
      setMeta("property", "og:title", title),
      setMeta("property", "og:description", description),
      setMeta("property", "og:url", url),
      setMeta("property", "og:image", img),
      setMeta("property", "og:type", type),
      setMeta("property", "og:site_name", "Infomist"),
      setMeta("name", "twitter:card", "summary_large_image"),
      setMeta("name", "twitter:title", title),
      setMeta("name", "twitter:description", description),
      setMeta("name", "twitter:image", img),
    );

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevHref = canonical?.getAttribute("href") ?? null;
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
    restores.push(() => {
      if (createdCanonical) canonical?.remove();
      else if (prevHref) canonical?.setAttribute("href", prevHref);
    });

    return () => restores.forEach((r) => r());
  }, [title, description, image, canonicalPath, type]);
}
