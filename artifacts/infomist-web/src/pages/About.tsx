import { Link } from "wouter";
import { ArrowUpRight, Building2, Layers, ShieldCheck, Eye, Clock } from "lucide-react";
import { useMeta } from "@/components/site/useMeta";
import { PageFaq } from "@/components/PageFaq";
import { HeroVisual } from "@/components/hero/HeroVisual";

const VALUES = [
  { title: "Engineering First", desc: "Every decision starts with the architecture. We don't bolt AI onto broken systems — we fix the foundation first.", icon: Layers, accent: "#0EA5E9" },
  { title: "No Vanity Work", desc: "We measure success in client outcomes — verified revenue, reduced overhead, systems that actually run in production.", icon: ShieldCheck, accent: "#84CC16" },
  { title: "Radical Transparency", desc: "You see the code, the architecture decisions, the tradeoffs. No black boxes, no vendor lock-in, no hidden dependencies.", icon: Eye, accent: "#8B5CF6" },
  { title: "Long-Term Thinking", desc: "We build systems you'll still be running in five years — composable, documented, and designed to evolve without a full rewrite.", icon: Clock, accent: "#F97316" },
];

const TIMELINE = [
  { year: "2001", badge: "'01", title: "Humble Beginnings", desc: "Hisham Sarwar started freelancing and web design from a single room with one computer." },
  { year: "2003/2005", badge: "'05", title: "Corporate Foundation", desc: "Infomist Services was officially founded, building its first online presence on Guru and delivering premium web design and development to global clients." },
  { year: "2008", badge: "'08", title: "The Historic $1M Milestone", desc: "Infomist crossed $1,000,000+ in revenue on Guru, ranking among the world's Top 10 service providers for 14 consecutive months." },
  { year: "2016", badge: "'16", title: "Knowledge Ecosystem Expansion (BeingGuru)", desc: "Launched BeingGuru, now one of Pakistan's leading tech, skills, and freelance motivation platforms." },
  { year: "2021", badge: "'21", title: "Redefining Local Ecosystem (WorkChest)", desc: "Co-founded WorkChest, Pakistan's first international-level freelancing marketplace connecting local talent with global clients." },
  { year: "2022", badge: "'22", title: "State Recognition", desc: "Hisham Sarwar received the Prime Minister's Excellence Award for his contributions to Pakistan's tech and freelance ecosystem." },
  { year: "2026", badge: "'26", title: "Global Influence & Digital Leader", desc: "Favikon named Hisham Sarwar among the Worldwide Top 20 Digital Marketing Coaches, reflecting Infomist's global legacy." },
];

const COMPANY_FAQS = [
  { q: "Who founded Infomist?", a: "Infomist was founded by Hisham Sarwar in 2001." },
  { q: "What makes Infomist different from other software agencies?", a: "Four stated values differentiate it: Engineering First, No Vanity Work, Radical Transparency, and Long-Term Thinking, reflected in a 25-year track record." },
  { q: "How long has Infomist been operating and what's its track record?", a: "Since 2001 — the about page shows a milestone timeline from 2001 through 2026, documenting growth from a freelance web studio to an enterprise AI agency." },
  { q: "Is Infomist a real established company or a new startup?", a: "Established — Infomist has operated continuously since 2001 with a documented milestone history and founder background." },
  { q: "Where is Infomist located?", a: "Infomist has offices in Islamabad, Pakistan (DHA Phase 1) and Dublin, Ireland." },
];

export function AboutPage() {
  useMeta(
    "About Infomist | 25 Years of Engineering Excellence",
    "Infomist is a digital engineering company founded in 2001. Discover our values, 25-year milestone timeline, and the engineering legacy behind our work.",
  );
  return (
    <div className="w-full min-h-screen bg-white pt-20 overflow-x-hidden">
      {/* ── HERO ── */}
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
        <div aria-hidden="true" className="pointer-events-none absolute top-4 right-0 w-[380px] h-[380px] rounded-full" style={{ background: "radial-gradient(circle, rgba(132,204,22,0.12) 0%, transparent 70%)", filter: "blur(38px)" }} />

        <HeroVisual variant="legacy" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-14 md:pt-20 md:pb-16">
          <div className="flex flex-col gap-5 max-w-2xl rise-in">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl flex items-center justify-center text-[#0EA5E9]" style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.16)" }}>
                <Building2 size={15} strokeWidth={2.4} />
              </span>
              <span className="text-xs font-bold tracking-[0.24em] uppercase text-[#0EA5E9]">About Us</span>
            </div>
            <h1 className="text-5xl md:text-[4.25rem] font-black text-[#0F172A] leading-[1.02]" style={{ letterSpacing: "-0.045em" }}>
              Built by engineers,{" "}
              <span style={{ background: "linear-gradient(100deg,#0EA5E9,#84CC16)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                since 2001.
              </span>
            </h1>
            <p className="text-[#475569] text-xl max-w-2xl leading-relaxed">
              Two decades of building serious software for serious businesses — and the
              values that have kept clients coming back.
            </p>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="w-full" style={{ background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28 flex flex-col gap-12">
          <div className="flex flex-col gap-3 rise-in">
            <span className="text-xs font-bold tracking-[0.24em] uppercase text-[#0EA5E9]">What we stand for</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.035em" }}>Our Values.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="rise-in group relative h-full rounded-3xl p-[1.5px] transition-transform duration-300 hover:-translate-y-1" style={{ background: `linear-gradient(150deg, ${v.accent}3a, ${v.accent}0a)`, animationDelay: `${i * 80}ms` }}>
                  <div className="rounded-[22px] bg-white p-7 h-full flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${v.accent}14`, border: `1px solid ${v.accent}2e`, color: v.accent }}>
                      <Icon size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F172A] text-lg mb-1">{v.title}</h3>
                      <p className="text-sm text-[#475569] leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="w-full" style={{ background: "#F9FAFB" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28 flex flex-col gap-10">
          <div className="flex flex-col gap-3 rise-in">
            <span className="text-xs font-bold tracking-[0.24em] uppercase text-[#0EA5E9]">The journey</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.035em" }}>25 Years, Marked.</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[18px] top-0 bottom-0 w-px bg-slate-200" />
            <div className="flex flex-col gap-4">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className="rise-in flex gap-8 items-start pl-12 relative" style={{ animationDelay: `${i * 60}ms` }}>
                  <div
                    className="absolute left-0 top-1 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: i === TIMELINE.length - 1 ? "#84CC16" : "linear-gradient(135deg, #0EA5E9, #84CC16)", boxShadow: "0 0 0 3px white, 0 0 0 4px rgba(14,165,233,0.2)" }}
                  >
                    <span className="text-white text-[9px] font-black">{item.badge}</span>
                  </div>
                  <div className="rounded-2xl bg-white px-5 py-4 flex-1 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/60" style={{ border: "1px solid #E2E8F0" }}>
                    <span className="text-xs font-bold text-[#0EA5E9] tracking-widest">{item.year}</span>
                    <p className="text-[#0F172A] font-bold leading-snug mt-0.5">{item.title}</p>
                    <p className="text-sm text-[#475569] leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP CTA ── */}
      <section className="w-full px-6 py-16 md:py-20" style={{ background: "#FFFFFF" }}>
        <div className="rise-in relative max-w-6xl mx-auto rounded-3xl p-[1.5px] overflow-hidden" style={{ background: "linear-gradient(120deg, rgba(14,165,233,0.4), rgba(132,204,22,0.15))" }}>
          <div className="rounded-[22px] bg-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-2xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.02em" }}>
                Meet the people behind Infomist.
              </h2>
              <p className="text-[#475569] leading-relaxed max-w-lg">
                The founder and the team leading the engineering, design, and AI work.
              </p>
            </div>
            <Link
              href="/leadership"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl text-base font-bold text-white flex-shrink-0 transition-all duration-300 hover:-translate-y-1"
              style={{ background: "linear-gradient(120deg,#0EA5E9,#0284C7)", boxShadow: "0 12px 32px -8px rgba(14,165,233,0.45)" }}
            >
              Our Leadership
              <ArrowUpRight size={17} strokeWidth={2.6} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <PageFaq
        faqs={COMPANY_FAQS}
        idPrefix="about-page"
        heading="Frequently Asked Questions"
        subheading="Common questions about Infomist's history and values."
      />
    </div>
  );
}
