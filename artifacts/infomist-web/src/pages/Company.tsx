import { useEffect } from "react";
import { FounderSection } from "@/components/FounderSection";
import { OurLeadership } from "@/components/OurLeadership";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { PageFaq } from "@/components/PageFaq";

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

const VALUES = [
  {
    title: "Engineering First",
    desc: "Every decision starts with the architecture. We don't bolt AI onto broken systems — we fix the foundation first.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "No Vanity Work",
    desc: "We measure success in client outcomes — verified revenue, reduced overhead, systems that actually run in production.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#84CC16" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    title: "Radical Transparency",
    desc: "You see the code, the architecture decisions, the tradeoffs. No black boxes, no vendor lock-in, no hidden dependencies.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
  {
    title: "Long-Term Thinking",
    desc: "We build systems you'll still be running in five years — composable, documented, and designed to evolve without a full rewrite.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
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
  {
    q: "Who founded Infomist?",
    a: "Infomist was founded by Hisham Sarwar in 2001.",
  },
  {
    q: "What makes Infomist different from other software agencies?",
    a: "Four stated values differentiate it: Engineering First, No Vanity Work, Radical Transparency, and Long-Term Thinking, reflected in a 25-year track record.",
  },
  {
    q: "How long has Infomist been operating and what's its track record?",
    a: "Since 2001 — the company page shows a 6-milestone timeline from 2001 through 2026, documenting growth from a freelance web studio to an enterprise AI agency.",
  },
  {
    q: "Is Infomist a real established company or a new startup?",
    a: "Established — Infomist has operated continuously since 2001 with a documented milestone history and founder background.",
  },
  {
    q: "Where is Infomist located?",
    a: "Infomist has offices in Islamabad, Pakistan (DHA Phase 1) and Dublin, Ireland.",
  },
];

export function CompanyPage() {
  useMeta(
    "Company | Infomist — 25 Years of Engineering Excellence",
    "Infomist is a digital engineering agency founded in 2001 by Hisham Sarwar. Discover our values, 25-year milestone timeline, and the engineering legacy behind our work."
  );
  return (
    <div className="w-full min-h-screen bg-white pt-20">
      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col gap-24">
        <div className="flex flex-col gap-6">
          <Reveal><h2 className="text-3xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.025em" }}>Our Values.</h2></Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <RevealItem key={v.title}>
                <div
                  className="h-full rounded-2xl p-7 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1"
                  style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 4px 0 rgba(15,23,42,0.04)" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">{v.icon}</div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-base mb-1">{v.title}</h3>
                    <p className="text-sm text-[#475569] leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="flex flex-col gap-8">
          <Reveal><h2 className="text-3xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.025em" }}>25 Years, Marked.</h2></Reveal>
          <div className="relative">
            <div className="absolute left-[18px] top-0 bottom-0 w-px bg-slate-200" />
            <RevealGroup className="flex flex-col gap-8">
              {TIMELINE.map((item) => (
                <RevealItem key={item.year} className="flex gap-8 items-start pl-12 relative">
                  <div
                    className="absolute left-0 top-1 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #0EA5E9, #84CC16)", boxShadow: "0 0 0 3px white, 0 0 0 4px rgba(14,165,233,0.2)" }}
                  >
                    <span className="text-white text-[9px] font-black">{item.badge}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0EA5E9] tracking-widest">{item.year}</span>
                    <p className="text-[#0F172A] font-bold leading-snug mt-0.5">{item.title}</p>
                    <p className="text-sm text-[#475569] leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>

      <FounderSection />

      <OurLeadership />

      <PageFaq
        faqs={COMPANY_FAQS}
        idPrefix="company-page"
        heading="Frequently Asked Questions"
        subheading="Common questions about Infomist's history, team, and values."
      />
    </div>
  );
}
