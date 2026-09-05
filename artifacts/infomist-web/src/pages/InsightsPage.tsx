import { useMeta } from "@/components/site/useMeta";
import { PageHeroVideo } from "@/components/hero/PageHeroVideo";
import { Insights } from "@/components/Insights";

export function InsightsPage() {
  useMeta(
    "Engineering Insights | Infomist — AI, Web Architecture & Automation Notes",
    "Infomist's engineering notes on AI automation, web architecture, digital marketing, SEO, and SaaS — written by the engineers who built the systems.",
  );
  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <PageHeroVideo
        eyebrow="Insights"
        title="Practical thinking for AI-led"
        accent="operations."
        sub="Engineering notes on AI automation, scalable web architecture, growth and SaaS — written by the people who ship the systems, not thought-leadership fluff."
        primary={{ label: "Book an AI Transformation Review", href: "/talk-to-strategist" }}
        media="hero-insights"
        evidence={["AI systems", "Architecture", "Operations", "Growth", "Leadership"]}
      />
      <Insights />
    </div>
  );
}
