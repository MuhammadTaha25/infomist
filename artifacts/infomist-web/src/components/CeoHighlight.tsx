import { Link } from "wouter";
import { Reveal } from "@/components/Reveal";
import { CEO } from "@/data/teamData";

export function CeoHighlight() {
  return (
    <section className="w-full bg-white py-20 px-6">
      <Reveal
        className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-8 rounded-2xl p-8 sm:p-10"
        style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 4px 0 rgba(15,23,42,0.04)" }}
      >
        <div className="w-28 h-28 rounded-full overflow-hidden flex-shrink-0" style={{ border: "3px solid rgba(14,165,233,0.15)" }}>
          <img
            src={CEO.image}
            alt={`${CEO.name}, ${CEO.role} at Infomist`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0EA5E9]">Leadership</span>
          <h3 className="text-2xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.02em" }}>
            {CEO.name}
          </h3>
          <p className="text-sm font-semibold text-[#475569]">{CEO.role}, Infomist</p>
          <p className="text-sm text-[#475569] leading-relaxed max-w-md mt-1">{CEO.bio}</p>
          <Link
            href={`/company#${CEO.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0EA5E9] hover:text-[#0284C7] transition-colors duration-150 group mt-1"
          >
            Meet the full leadership team
            <svg className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
