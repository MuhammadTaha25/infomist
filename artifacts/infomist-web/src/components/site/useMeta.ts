import { useEffect } from "react";

/**
 * Sets document.title and the meta description for the lifetime of a page,
 * restoring the previous values on unmount. One shared copy — pages import
 * this instead of redeclaring it.
 */
export function useMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let metaEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = metaEl?.content ?? "";
    if (!metaEl) {
      metaEl = document.createElement("meta");
      metaEl.name = "description";
      document.head.appendChild(metaEl);
    }
    metaEl.content = description;

    return () => {
      document.title = prevTitle;
      if (metaEl) metaEl.content = prevDesc;
    };
  }, [title, description]);
}
