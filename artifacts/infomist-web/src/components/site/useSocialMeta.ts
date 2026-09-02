import { useEffect } from "react";

const SITE = "https://www.infomist.com";

interface SocialMeta {
  title: string;
  description: string;
  /** path (e.g. "/who-we-work-with/ceos-founders") or absolute URL */
  path: string;
  /** path under /public (e.g. "/og/persona-ceos-founders.jpg") or absolute URL */
  image?: string;
  /** og:type — "website" (default) or "article" for blog posts */
  type?: "website" | "article";
}

function abs(v: string) {
  return v.startsWith("http") ? v : `${SITE}${v.startsWith("/") ? "" : "/"}${v}`;
}

/** upsert <meta property|name="key"> and return a restore fn */
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

/**
 * Sets Open Graph + Twitter Card tags and the canonical link for the lifetime of
 * a page, restoring the previous values on unmount. Pair with `useMeta` (which
 * owns <title> and meta description).
 *
 * Note: this is client-side, so scrapers that don't execute JS still get the
 * static tags from index.html. Fine for Google; for full coverage the routes
 * would need prerendering / SSR.
 */
export function useSocialMeta({ title, description, path, image, type = "website" }: SocialMeta) {
  useEffect(() => {
    const url = abs(path);
    const img = abs(image ?? "/opengraph.jpg");

    const restores: Array<() => void> = [
      setMeta("property", "og:title", title),
      setMeta("property", "og:description", description),
      setMeta("property", "og:url", url),
      setMeta("property", "og:image", img),
      setMeta("property", "og:type", type),
      setMeta("name", "twitter:title", title),
      setMeta("name", "twitter:description", description),
      setMeta("name", "twitter:image", img),
      setMeta("name", "twitter:card", "summary_large_image"),
    ];

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute("href") ?? null;
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    return () => {
      restores.forEach((r) => r());
      if (createdCanonical) canonical?.remove();
      else if (prevCanonical) canonical?.setAttribute("href", prevCanonical);
    };
  }, [title, description, path, image, type]);
}
