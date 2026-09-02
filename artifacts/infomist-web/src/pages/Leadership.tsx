import { Link } from "wouter";
import { ArrowUpRight, Users } from "lucide-react";
import { useMeta } from "@/components/site/useMeta";
import { OurLeadership } from "@/components/OurLeadership";
import { HeroVisual } from "@/components/hero/HeroVisual";

export function LeadershipPage() {
  useMeta(
    "Leadership | Infomist — The Team Behind the Work",
    "Meet the founder and leadership team behind Infomist — the people leading engineering, design, and AI across every client engagement.",
  );

  return (
    <div className="w-full min-h-screen bg-white pt-20 overflow-x-hidden">
      <section className="relative overflow-hidden" style={{ background: "#FAFAFA" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.14) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 60% at 30% 0%, #000 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 30% 0%, #000 40%, transparent 100%)",
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute -top-28 -left-20 w-[480px] h-[480px] rounded-full" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.16) 0%, transparent 70%)", filter: "blur(34px)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute top-4 right-0 w-[360px] h-[360px] rounded-full" style={{ background: "radial-gradient(circle, rgba(132,204,22,0.12) 0%, transparent 70%)", filter: "blur(38px)" }} />

        <HeroVisual variant="squad" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-16 md:pt-20 md:pb-24">
          <div className="flex flex-col gap-5 max-w-xl">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl flex items-center justify-center text-[#0EA5E9]" style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.16)" }}>
                <Users size={15} strokeWidth={2.4} />
              </span>
              <span className="text-xs font-bold tracking-[0.24em] uppercase text-[#0EA5E9]">Leadership</span>
            </div>
            <h1 className="text-5xl md:text-[4.25rem] font-black text-[#0F172A] leading-[1.02]" style={{ letterSpacing: "-0.045em" }}>
              The people behind{" "}
              <span style={{ background: "linear-gradient(100deg,#0EA5E9,#84CC16)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Infomist.
              </span>
            </h1>
            <p className="text-[#475569] text-xl leading-relaxed">
              A founder-led company with a team that has shipped real software for two
              decades.
            </p>
            <Link href="/about" className="group inline-flex items-center gap-2 text-sm font-bold text-[#0EA5E9] mt-1 w-fit">
              Read our story — About Us
              <ArrowUpRight size={15} strokeWidth={2.6} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <OurLeadership />
    </div>
  );
}
