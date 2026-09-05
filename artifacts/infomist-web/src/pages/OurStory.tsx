import { Layers, ShieldCheck, Eye, Clock } from "lucide-react";
import { useMeta } from "@/components/site/useMeta";
import { PageFaq } from "@/components/PageFaq";
import { PageHeroVideo } from "@/components/hero/PageHeroVideo";
import { FounderSection } from "@/components/FounderSection";
import { OurLeadership } from "@/components/OurLeadership";

const VALUES = [
  { title: "Engineering First", desc: "Every decision starts with the architecture. We don't bolt AI onto broken systems — we fix the foundation first.", icon: Layers, accent: "#0EA5E9" },
  { title: "No Vanity Work", desc: "We measure success in client outcomes — verified revenue, reduced overhead, systems that actually run in production.", icon: ShieldCheck, accent: "#84CC16" },
  { title: "Radical Transparency", desc: "You see the code, the architecture decisions, the tradeoffs. No black boxes, no vendor lock-in, no hidden dependencies.", icon: Eye, accent: "#8B5CF6" },
  { title: "Long-Term Thinking", desc: "We build systems you'll still be running in five years — composable, documented, and designed to evolve without a full rewrite.", icon: Clock, accent: "#F97316" },
];

const TIMELINE = [
  { year: "2001", badge: "'01", title: "Humble Beginnings", desc: "Infomist began as a one-room web design studio — a single computer, a handful of international clients, and an obsession with craft." },
  { year: "2003/2005", badge: "'05", title: "Corporate Foundation", desc: "Infomist Services was officially founded, building its first online presence on Guru and delivering premium web design and development to global clients." },
  { year: "2008", badge: "'08", title: "The Historic $1M Milestone", desc: "Infomist crossed $1,000,000+ in revenue on Guru, ranking among the world's Top 10 service providers for 14 consecutive months." },
  { year: "2016", badge: "'16", title: "Knowledge Ecosystem Expansion (BeingGuru)", desc: "Launched BeingGuru, now one of Pakistan's leading tech, skills, and freelance motivation platforms." },
  { year: "2021", badge: "'21", title: "Redefining Local Ecosystem (WorkChest)", desc: "Co-founded WorkChest, Pakistan's first international-level freelancing marketplace connecting local talent with global clients." },
  { year: "2022", badge: "'22", title: "Enterprise & AI Practice", desc: "Infomist expanded beyond web and product engineering into full AI automation and systems integration, delivering production software for enterprise clients." },
  { year: "2026", badge: "'26", title: "25 Years of Engineering", desc: "Infomist marks a quarter-century of continuous delivery — now operating from Islamabad and Dublin, building AI-driven software for clients worldwide." },
];

const COMPANY_FAQS = [
  { q: "When was Infomist founded?", a: "Infomist traces its roots to 2001 as a web design studio and was formally established as Infomist Services in 2003–2005." },
  { q: "What makes Infomist different from other software agencies?", a: "Four stated values differentiate it: Engineering First, No Vanity Work, Radical Transparency, and Long-Term Thinking, reflected in a 25-year track record." },
  { q: "How long has Infomist been operating and what's its track record?", a: "Since 2001 — the timeline on this page runs from 2001 through 2026, documenting growth from a freelance web studio to an enterprise AI agency." },
  { q: "Is Infomist a real established company or a new startup?", a: "Established — Infomist has operated continuously since 2001 with a documented milestone history spanning more than two decades." },
  { q: "Where is Infomist located?", a: "Infomist has offices in Islamabad, Pakistan (DHA Phase 1) and Dublin, Ireland." },
];

export function OurStoryPage() {
  useMeta(
    "Our Story | Infomist — 25 Years of Engineering Excellence",
    "Infomist is a digital engineering company founded in 2001. Our story, 25-year milestone timeline, values, and the CEO and team behind the work.",
  );
  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      {/* ── SECTION 1 · HERO ── */}
      <PageHeroVideo
        eyebrow="Our Story"
        title="25 years of engineering discipline, now applied to intelligent"
        accent="systems."
        sub="From a one-room web studio in 2001 to AI-driven software for clients in Islamabad, Dublin and worldwide — the same engineering-first values, at every stage."
        primary={{ label: "Book an AI Transformation Review", href: "/talk-to-strategist" }}
        secondary={{ label: "Meet the Team", href: "/careers" }}
        media="hero-our-story"
        evidence={["Founded 2001", "Islamabad · Dublin", "Engineering-first", "Long-term systems"]}
      />

      {/* ── SECTION 2 · THE JOURNEY / TIMELINE ── */}
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

      {/* ── SECTION 3 · OUR VALUES ── */}
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

      {/* ── SECTION 4 · CEO SPOTLIGHT (dark) ── */}
      <FounderSection compact />

      {/* ── SECTION 5 · THE CORE TEAM ── */}
      <OurLeadership />

      {/* ── SECTION 6 · FAQ ── */}
      <PageFaq
        faqs={COMPANY_FAQS}
        idPrefix="our-story"
        heading="Frequently Asked Questions"
        subheading="Common questions about Infomist's history, values, and team."
      />
    </div>
  );
}
