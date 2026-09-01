import { useEffect } from "react";
import { Insights } from "@/components/Insights";

function useMeta(title: string, description: string) {
  useEffect(() => {
    const prev = document.title;
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
      document.title = prev;
      if (metaEl) metaEl.content = prevDesc;
    };
  }, [title, description]);
}

export function ResourcesPage() {
  useMeta(
    "Engineering Insights | Infomist — AI, Web Architecture & Automation Notes",
    "Infomist's engineering notes on AI automation, web architecture, digital marketing, SEO, and SaaS — written by the engineers who built the systems."
  );
  return (
    <div className="w-full min-h-screen bg-white pt-20">
      <Insights />
    </div>
  );
}
