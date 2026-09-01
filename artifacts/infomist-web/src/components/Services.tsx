import { useState } from "react";
import { Link } from "wouter";
import { CATEGORIES } from "@/data/solutionsData";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

function CategoryCard({ cat }: { cat: (typeof CATEGORIES)[number] }) {
  const [hovered, setHovered] = useState(false);
  const Icon = cat.icon;

  return (
    <Link href={`/solutions/${cat.slug}`}>
      <div
        className="relative bg-white rounded-2xl p-7 flex flex-col gap-4 cursor-pointer h-full"
        style={{
          border: hovered ? "1px solid #0EA5E9" : "1px solid #E2E8F0",
          boxShadow: hovered
            ? "0 20px 48px -8px rgba(14,165,233,0.15), 0 8px 20px -4px rgba(15,23,42,0.08)"
            : "0 1px 4px 0 rgba(15,23,42,0.04)",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          transition: "border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Tag */}
        <span
          className="absolute top-5 right-5 text-[10px] font-black tracking-[0.18em] uppercase"
          style={{ color: hovered ? "#0EA5E9" : "#CBD5E1", transition: "color 0.22s ease" }}
        >
          {cat.tag}
        </span>

        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: hovered ? "rgba(14,165,233,0.1)" : "rgba(14,165,233,0.06)",
            transition: "background 0.22s ease",
          }}
        >
          <Icon size={24} strokeWidth={1.7} color="#0EA5E9" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5 flex-1">
          <h3
            className="text-base font-bold leading-snug"
            style={{ color: hovered ? "#0EA5E9" : "#0F172A", transition: "color 0.22s ease" }}
          >
            {cat.name}
          </h3>
          <p className="text-sm text-[#475569] leading-relaxed">{cat.blurb}</p>
        </div>

        {/* Arrow */}
        <div
          className="flex items-center gap-1 text-xs font-semibold mt-auto"
          style={{
            color: "#0EA5E9",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-6px)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          View services
          <ArrowRight size={13} strokeWidth={2.2} />
        </div>
      </div>
    </Link>
  );
}

export function Services() {
  return (
    <section id="services" className="w-full bg-[#F9FAFB] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-14 flex flex-col items-center gap-3">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0EA5E9]">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight" style={{ letterSpacing: "-0.025em" }}>
            Our Service Areas.
          </h2>
          <p className="text-[#475569] text-lg max-w-xl leading-relaxed">
            Seven practice areas. One integrated team. Built to deliver measurable results.
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-8 h-px bg-[#0EA5E9] opacity-40 rounded-full" />
            <div className="w-2 h-2 rounded-full bg-[#0EA5E9] opacity-60" />
            <div className="w-16 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg, #0EA5E9, #84CC16)" }} />
            <div className="w-2 h-2 rounded-full bg-[#84CC16] opacity-60" />
            <div className="w-8 h-px bg-[#84CC16] opacity-40 rounded-full" />
          </div>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => (
            <RevealItem key={cat.slug}>
              <CategoryCard cat={cat} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
