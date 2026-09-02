import { Newspaper } from "lucide-react";
import { useMeta } from "@/components/site/useMeta";
import { PageHero } from "@/components/site/primitives";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { Insights } from "@/components/Insights";

export function ResourcesPage() {
  useMeta(
    "Engineering Insights | Infomist — AI, Web Architecture & Automation Notes",
    "Infomist's engineering notes on AI automation, web architecture, digital marketing, SEO, and SaaS — written by the engineers who built the systems.",
  );
  return (
    <div className="w-full min-h-screen bg-white pt-20 overflow-x-hidden">
      <PageHero
        eyebrow="Insights & Resources"
        eyebrowIcon={Newspaper}
        title="Engineering notes from"
        gradientWord="the people who ship."
        sub="Practical writing on AI automation, scalable web architecture, growth, and SaaS — no thought-leadership fluff."
        visual={<HeroVisual variant="knowledge" />}
      />
      <Insights />
    </div>
  );
}
