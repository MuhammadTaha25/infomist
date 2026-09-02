import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/solutionsData";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHead, IconTile, accentFor } from "@/components/site/primitives";

function CategoryCard({ cat, accent }: { cat: (typeof CATEGORIES)[number]; accent: string }) {
  const Icon = cat.icon;
  return (
    <Link
      href={`/solutions/${cat.slug}`}
      className="group relative rounded-3xl p-[1.5px] transition-transform duration-300 hover:-translate-y-1.5"
      style={{ background: `linear-gradient(150deg, ${accent}3a, ${accent}0a)` }}
    >
      <div className="relative rounded-[22px] bg-white h-full p-7 flex flex-col gap-4 overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)` }}
        />
        <div className="flex items-start justify-between">
          <IconTile icon={Icon} accent={accent} />
          <span className="text-[11px] font-black tracking-[0.18em] uppercase" style={{ color: `${accent}66` }}>
            {cat.tag}
          </span>
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <h3 className="text-lg font-bold text-[#0F172A] leading-snug">{cat.name}</h3>
          <p className="text-sm text-[#475569] leading-relaxed">{cat.blurb}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold mt-1" style={{ color: accent }}>
          View services
          <ArrowRight size={14} strokeWidth={2.6} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function Services() {
  return (
    <section id="services" className="w-full" style={{ background: "#F9FAFB" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
        <Reveal>
          <SectionHead
            eyebrow="What We Do"
            icon={CATEGORIES[0].icon}
            title="Our"
            gradientWord="Service Areas."
            sub="Seven practice areas. One integrated team. Built to deliver measurable results."
          />
        </Reveal>
        <RevealGroup className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, i) => (
            <RevealItem key={cat.slug}>
              <CategoryCard cat={cat} accent={accentFor(i)} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
