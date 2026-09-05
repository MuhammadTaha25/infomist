import { type MouseEvent, type ComponentType, type ReactNode, type CSSProperties } from "react";
import { Link } from "wouter";
import { useMeta } from "@/components/site/useMeta";
import {
  Target,
  GraduationCap,
  Lightbulb,
  Users,
  Compass,
  ShieldCheck,
  Puzzle,
  MessagesSquare,
  ArrowRight,
  ArrowUpRight,
  FileText,
  Sparkles,
  Rocket,
} from "lucide-react";
import { JOBS } from "@/data/careersData";
import { PageHeroVideo } from "@/components/hero/PageHeroVideo";

/* ─── In-page smooth scroll (no URL-hash routing in this app) ─────────── */
function scrollToId(id: string) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };
}

/* ─── CSS-driven reveal (see .rise-in in index.css) ──────────────────── */
function Rise({
  children,
  className = "",
  delay = 0,
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
  as?: "div" | "li";
}) {
  return (
    <Tag className={`rise-in ${className}`} style={{ animationDelay: delay ? `${delay}ms` : undefined, ...style }}>
      {children}
    </Tag>
  );
}

type Accent = "#0EA5E9" | "#84CC16" | "#8B5CF6" | "#F97316";
type IconType = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

function GridOverlay({ dark = false }: { dark?: boolean }) {
  const line = dark ? "rgba(255,255,255,0.06)" : "rgba(148,163,184,0.14)";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse 85% 65% at 40% 0%, #000 35%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 85% 65% at 40% 0%, #000 35%, transparent 100%)",
      }}
    />
  );
}

function Blob({ color, className, size = 460 }: { color: string; className: string; size?: number }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{ width: size, height: size, background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, filter: "blur(34px)" }}
    />
  );
}

function Eyebrow({ icon: Icon, children, dark = false }: { icon: IconType; children: ReactNode; dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: dark ? "rgba(14,165,233,0.14)" : "rgba(14,165,233,0.08)",
          border: `1px solid ${dark ? "rgba(14,165,233,0.24)" : "rgba(14,165,233,0.16)"}`,
        }}
      >
        <Icon size={15} strokeWidth={2.4} className="text-[#0EA5E9]" />
      </span>
      <span className="text-xs font-bold tracking-[0.24em] uppercase text-[#0EA5E9]">{children}</span>
    </div>
  );
}

function SectionHead({
  icon,
  eyebrow,
  title,
  sub,
  dark = false,
  center = false,
}: {
  icon: IconType;
  eyebrow: string;
  title: string;
  sub?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-4 ${center ? "items-center text-center" : ""}`}>
      <Eyebrow icon={icon} dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className={`text-3xl md:text-[2.7rem] font-black leading-[1.08] ${dark ? "text-white" : "text-[#0F172A]"}`}
        style={{ letterSpacing: "-0.035em" }}
      >
        {title}
      </h2>
      {sub && (
        <p className={`text-lg leading-relaxed max-w-2xl ${dark ? "text-slate-400" : "text-[#475569]"}`}>{sub}</p>
      )}
    </div>
  );
}

/* ─── Content ────────────────────────────────────────────────────────── */
const INTRO_CARDS: { n: string; label: string; desc: string; accent: Accent; icon: IconType }[] = [
  { n: "01", label: "Real-World Projects", desc: "You work on systems that ship to real businesses — not throwaway demos.", accent: "#0EA5E9", icon: Rocket },
  { n: "02", label: "Technology-Driven", desc: "AI, automation, and modern software engineering are core to how we work.", accent: "#84CC16", icon: Sparkles },
  { n: "03", label: "Growth-Focused", desc: "Room to learn, take ownership, and grow into harder problems over time.", accent: "#8B5CF6", icon: GraduationCap },
];

const WHY_CARDS: { icon: IconType; title: string; desc: string; accent: Accent }[] = [
  { icon: Target, title: "Real-World Impact", desc: "Work on projects that solve practical business problems and create meaningful digital experiences.", accent: "#0EA5E9" },
  { icon: GraduationCap, title: "Learn & Grow", desc: "Work with modern technologies and continuously expand your technical and professional skills.", accent: "#84CC16" },
  { icon: Lightbulb, title: "Innovation First", desc: "Explore AI, automation, software engineering, and emerging technologies to build better solutions.", accent: "#8B5CF6" },
  { icon: Users, title: "Collaborative Culture", desc: "Work alongside people who share ideas, solve problems together, and support each other's growth.", accent: "#F97316" },
];

const LIFE_TILES: { label: string; desc: string; accent: Accent }[] = [
  { label: "Learn", desc: "Keep developing your skills.", accent: "#0EA5E9" },
  { label: "Collaborate", desc: "Solve problems together.", accent: "#84CC16" },
  { label: "Create", desc: "Turn ideas into working solutions.", accent: "#8B5CF6" },
  { label: "Grow", desc: "Take ownership of your career.", accent: "#F97316" },
];

const LOOK_FOR: { icon: IconType; title: string; desc: string; accent: Accent }[] = [
  { icon: Compass, title: "Curiosity", desc: "You enjoy learning, experimenting, and asking better questions.", accent: "#0EA5E9" },
  { icon: ShieldCheck, title: "Ownership", desc: "You take responsibility for your work and follow problems through to solutions.", accent: "#84CC16" },
  { icon: Puzzle, title: "Problem Solving", desc: "You approach challenges logically and look for practical solutions.", accent: "#8B5CF6" },
  { icon: MessagesSquare, title: "Teamwork", desc: "You communicate clearly, share knowledge, and work effectively with others.", accent: "#F97316" },
];

const JOB_ACCENTS: Record<string, Accent> = {
  "ai-engineer": "#0EA5E9",
  "software-engineer": "#8B5CF6",
  "ai-automation-intern": "#84CC16",
};

export function CareersPage() {
  useMeta(
    "Careers at Infomist | Join Our Team",
    "Explore career opportunities at Infomist and join a team building intelligent digital solutions, modern software, and innovative technology.",
  );

  const hasJobs = JOBS.length > 0;

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <PageHeroVideo
        eyebrow="Careers at Infomist"
        title="Build serious software with a senior"
        accent="team."
        sub="Join the engineers building AI systems, modern software and automation that businesses actually run on — from Islamabad and Dublin."
        primary={{ label: "View Open Positions", href: "#open-positions" }}
        secondary={{ label: "Why Infomist?", href: "#why-infomist" }}
        media="hero-team"
        evidence={hasJobs ? [`${JOBS.length} open roles`, "Islamabad · Dublin", "Engineering-first", "Real ownership"] : ["Always hiring", "Islamabad · Dublin", "Engineering-first", "Real ownership"]}
      />

      {/* ══ INTRODUCTION ═════════════════════════════════════════════ */}
      <section className="w-full" style={{ background: "#F9FAFB" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28 grid lg:grid-cols-2 gap-14 lg:gap-16 items-start">
          <Rise className="flex flex-col gap-5">
            <Eyebrow icon={Sparkles}>Introduction</Eyebrow>
            <h2 className="text-3xl md:text-[2.7rem] font-black text-[#0F172A] leading-[1.08]" style={{ letterSpacing: "-0.035em" }}>
              More Than a Job.<br />
              <span style={{ background: "linear-gradient(100deg,#0EA5E9,#84CC16)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Build Something Meaningful.
              </span>
            </h2>
            <span className="w-16 h-[3px] rounded-full" style={{ background: "linear-gradient(90deg,#0EA5E9,#84CC16)" }} />
            <p className="text-[#475569] text-lg leading-relaxed">
              At Infomist, we believe great technology is built by great people. We bring
              together developers, AI specialists, designers, problem solvers, and business
              thinkers who are passionate about turning ideas into impactful digital
              solutions.
            </p>
            <p className="text-[#475569] text-lg leading-relaxed">
              Whether you're starting your career or bringing years of experience, we aim to
              create an environment where you can learn, contribute, and grow while working
              on real-world technology challenges.
            </p>
          </Rise>

          <div className="flex flex-col gap-4">
            {INTRO_CARDS.map(({ n, label, desc, accent, icon: Icon }, i) => (
              <Rise key={n} delay={i * 90} className="group relative rounded-3xl p-[1.5px] transition-transform duration-300 hover:-translate-y-1" style={{ background: `linear-gradient(150deg, ${accent}40, ${accent}08)` }}>
                <div className="rounded-[22px] bg-white p-6 md:p-7 h-full flex items-start gap-5">
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${accent}14`, border: `1px solid ${accent}2e`, color: accent }}>
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-black tracking-widest" style={{ color: accent }}>{n}</span>
                      <h3 className="font-bold text-[#0F172A] text-lg">{label}</h3>
                    </div>
                    <p className="text-sm text-[#475569] leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY WORK WITH INFOMIST (dark) ═══════════════════════════ */}
      <section id="why-infomist" className="relative w-full overflow-hidden scroll-mt-20" style={{ background: "linear-gradient(160deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}>
        <GridOverlay dark />
        <Blob color="rgba(14,165,233,0.22)" className="-top-24 left-1/4" size={440} />
        <Blob color="rgba(132,204,22,0.16)" className="-bottom-24 right-1/4" size={380} />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-28">
          <Rise>
            <SectionHead icon={Sparkles} eyebrow="Why Infomist" title="Why Work With Infomist?" sub="An environment where curiosity, ownership, and continuous learning are valued." dark />
          </Rise>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_CARDS.map(({ icon: Icon, title, desc, accent }, i) => (
              <Rise key={title} delay={i * 80} className="group relative rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${accent}1f`, border: `1px solid ${accent}3a`, color: accent }}>
                  <Icon size={22} strokeWidth={2} />
                </span>
                <h3 className="font-bold text-white text-base">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                <span aria-hidden="true" className="absolute left-6 right-6 bottom-0 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LIFE AT INFOMIST (bento) ═══════════════════════════════ */}
      <section className="w-full" style={{ background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
          <Rise>
            <SectionHead icon={Users} eyebrow="Culture" title="Life at Infomist" sub="Technology moves fast. So do we — but we believe great work happens when people have the space to learn, collaborate, and create." />
          </Rise>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LIFE_TILES.map((t, i) => (
              <Rise
                key={t.label}
                delay={i * 80}
                className={`group relative rounded-3xl p-7 flex flex-col justify-between gap-10 overflow-hidden min-h-[200px] transition-all duration-300 hover:-translate-y-1.5 ${i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}
                style={{ background: `linear-gradient(160deg, ${t.accent}12, ${t.accent}03)`, border: `1px solid ${t.accent}26` }}
              >
                <div aria-hidden="true" className="absolute -top-10 -right-10 w-36 h-36 rounded-full transition-transform duration-500 group-hover:scale-125" style={{ background: `radial-gradient(circle, ${t.accent}22 0%, transparent 70%)` }} />
                <span className="relative text-xs font-black tracking-[0.24em] uppercase" style={{ color: t.accent }}>{t.label}</span>
                <p className={`relative text-[#0F172A] font-bold leading-snug ${i === 0 ? "text-2xl md:text-3xl max-w-xs" : "text-lg"}`}>{t.desc}</p>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHO WE'RE LOOKING FOR ═══════════════════════════════════ */}
      <section className="w-full" style={{ background: "#F9FAFB" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
          <Rise>
            <SectionHead icon={Compass} eyebrow="What We Look For" title="Who We're Looking For" sub="We're looking for curious, motivated people who enjoy solving problems, learning new technologies, and building things that matter." />
          </Rise>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {LOOK_FOR.map(({ icon: Icon, title, desc, accent }, i) => (
              <Rise key={title} delay={i * 80} className="group relative rounded-3xl p-[1.5px] transition-transform duration-300 hover:-translate-y-1" style={{ background: `linear-gradient(150deg, ${accent}3a, ${accent}0a)` }}>
                <div className="rounded-[22px] bg-white p-7 h-full flex items-start gap-4">
                  <span className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${accent}14`, border: `1px solid ${accent}2e`, color: accent }}>
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-bold text-[#0F172A] text-base">{title}</h3>
                    <p className="text-sm text-[#475569] leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OPEN POSITIONS ═════════════════════════════════════════ */}
      <section id="open-positions" className="w-full scroll-mt-20" style={{ background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
          <Rise>
            <SectionHead icon={Rocket} eyebrow="Open Positions" title="Open Positions" sub={hasJobs ? "Explore current opportunities and find where your skills can make an impact." : undefined} />
          </Rise>

          {hasJobs ? (
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5">
              {JOBS.map((job, i) => {
                const accent = JOB_ACCENTS[job.slug] ?? "#0EA5E9";
                return (
                  <Rise key={job.slug} delay={i * 90} className="h-full">
                    <Link
                      href={`/careers/${job.slug}`}
                      className="group relative flex h-full flex-col gap-4 rounded-2xl bg-white p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 4px 0 rgba(15,23,42,0.04)", outlineColor: accent }}
                    >
                      <span aria-hidden="true" className="absolute left-0 top-0 h-full w-1" style={{ background: accent }} />
                      <span aria-hidden="true" className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)` }} />
                      <div className="relative flex flex-col gap-2">
                        <h3 className="font-black text-[#0F172A] text-xl" style={{ letterSpacing: "-0.01em" }}>{job.title}</h3>
                        <span className="text-[11px] font-bold uppercase tracking-wider w-fit px-2.5 py-1 rounded-full" style={{ color: accent, background: `${accent}14` }}>
                          {job.type} · {job.location}
                        </span>
                      </div>
                      <p className="relative text-sm text-[#475569] leading-relaxed flex-1">{job.summary}</p>
                      <div className="relative flex flex-wrap gap-1.5">
                        {job.skills.map((s) => (
                          <span key={s} className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-[#475569]" style={{ background: "#F1F5F9", border: "1px solid #E2E8F0" }}>{s}</span>
                        ))}
                      </div>
                      <span className="relative inline-flex items-center gap-1.5 text-sm font-bold mt-1" style={{ color: accent }}>
                        View Position
                        <ArrowRight size={14} strokeWidth={2.8} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                    </Link>
                  </Rise>
                );
              })}
            </div>
          ) : (
            <Rise className="mt-14">
              <div className="relative rounded-3xl p-[1.5px] overflow-hidden" style={{ background: "linear-gradient(150deg, rgba(14,165,233,0.35), rgba(132,204,22,0.12))" }}>
                <div className="rounded-[22px] bg-white p-10 md:p-14 flex flex-col items-center text-center gap-4">
                  <span className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.22)" }}>
                    <FileText size={24} strokeWidth={2} className="text-[#0EA5E9]" />
                  </span>
                  <h3 className="text-2xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.02em" }}>No Open Positions Right Now</h3>
                  <p className="text-[#475569] leading-relaxed max-w-md">
                    We don't have any open positions at the moment, but we're always
                    interested in meeting talented people.
                  </p>
                  <Link href="/contact" className="mt-2 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5" style={{ background: "linear-gradient(120deg,#0EA5E9,#0284C7)", boxShadow: "0 10px 30px -6px rgba(14,165,233,0.4)" }}>
                    Send Your CV
                  </Link>
                  <p className="text-sm text-[#64748B] max-w-sm">
                    Share your CV with us and we'll keep your profile in mind for future
                    opportunities.
                  </p>
                </div>
              </div>
            </Rise>
          )}

          {hasJobs && (
            <Rise className="mt-6">
              <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.02em" }}>Don't see the right role?</h3>
                  <p className="text-[#475569] leading-relaxed max-w-lg">
                    Share your CV with us and we'll keep your profile in mind for future
                    opportunities.
                  </p>
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-[#0F172A] flex-shrink-0 transition-all duration-200 hover:bg-white hover:-translate-y-0.5" style={{ border: "1.5px solid rgba(14,165,233,0.4)", background: "transparent" }}>
                  <FileText size={16} strokeWidth={2.2} className="text-[#0EA5E9]" />
                  Send Your CV
                </Link>
              </div>
            </Rise>
          )}

          <Rise className="mt-6">
            <Link href="/our-story#our-leadership" className="group flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl px-6 py-5 transition-all duration-200 hover:-translate-y-0.5" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
              <Users size={18} strokeWidth={2} className="text-[#0EA5E9] flex-shrink-0" />
              <span className="text-sm text-[#475569]">Want to know more about the people behind Infomist?</span>
              <span className="sm:ml-auto inline-flex items-center gap-1.5 text-sm font-bold text-[#0EA5E9] flex-shrink-0">
                Meet Our Leadership
                <ArrowUpRight size={15} strokeWidth={2.6} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </Rise>
        </div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════════════════════════ */}
      <section className="w-full px-6 pb-24 md:pb-28" style={{ background: "#F9FAFB" }}>
        <div
          className="relative max-w-6xl mx-auto rounded-[32px] px-8 md:px-16 py-16 md:py-24 flex flex-col items-center text-center gap-6 overflow-hidden rise-in"
          style={{ background: "linear-gradient(150deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}
        >
          <Blob color="rgba(14,165,233,0.24)" className="-top-24 left-1/4" size={420} />
          <Blob color="rgba(132,204,22,0.18)" className="-bottom-24 right-1/4" size={360} />
          <GridOverlay dark />
          <span className="relative z-10 text-xs font-bold tracking-[0.24em] uppercase text-[#84CC16]">Join the team</span>
          <h2 className="relative z-10 text-3xl md:text-5xl font-black text-white leading-[1.05] max-w-2xl" style={{ letterSpacing: "-0.03em" }}>
            Ready to Build What's Next?
          </h2>
          <p className="relative z-10 text-slate-400 text-lg max-w-xl leading-relaxed">
            Explore opportunities at Infomist and take the next step in your career.
          </p>
          {hasJobs ? (
            <a
              href="#open-positions"
              onClick={scrollToId("open-positions")}
              className="group relative z-10 mt-2 inline-flex items-center gap-2.5 px-9 py-4 rounded-xl text-base font-bold text-[#0F172A] transition-all duration-300 hover:-translate-y-1"
              style={{ background: "#84CC16", boxShadow: "0 8px 32px 0 rgba(132,204,22,0.35)" }}
            >
              Explore Opportunities
              <ArrowRight size={18} strokeWidth={2.6} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          ) : (
            <Link
              href="/contact"
              className="group relative z-10 mt-2 inline-flex items-center gap-2.5 px-9 py-4 rounded-xl text-base font-bold text-[#0F172A] transition-all duration-300 hover:-translate-y-1"
              style={{ background: "#84CC16", boxShadow: "0 8px 32px 0 rgba(132,204,22,0.35)" }}
            >
              Get in Touch
              <ArrowRight size={18} strokeWidth={2.6} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
