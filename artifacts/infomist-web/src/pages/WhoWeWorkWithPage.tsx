import { Link } from "wouter";
import { ArrowRight, Users, Target, Layers, ShieldCheck } from "lucide-react";
import { useMeta } from "@/components/site/useMeta";
import { useSocialMeta } from "@/components/site/useSocialMeta";
import { Reveal } from "@/components/Reveal";
import {
  GridOverlay,
  HeroBlobs,
  GradientText,
  Eyebrow,
  SectionHead,
  IconTile,
  DarkCTA,
  CTAButton,
  accentFor,
} from "@/components/site/primitives";
import { PersonaExplorer } from "@/components/who-we-work-with/PersonaExplorer";
import { PROCESS, WWW_SEO } from "@/data/whoWeWorkWithData";

const RELATED_LINKS = [
  { label: "AI & Machine Learning Engineering", href: "/solutions/ai-machine-learning-engineering" },
  { label: "Software & Web Architecture", href: "/solutions/software-web-architecture" },
  { label: "Experience Design & Media", href: "/solutions/experience-design-media" },
  { label: "Case studies", href: "/case-studies" },
  { label: "The team behind Infomist", href: "/leadership" },
  { label: "Talk to a Strategist", href: "/talk-to-strategist" },
];

const REASONS = [
  {
    icon: Target,
    title: "We start from the business problem",
    body: "Every engagement begins with the outcome you're accountable for — not a list of services. The technology follows from there.",
  },
  {
    icon: Layers,
    title: "Strategy and execution on one team",
    body: "Architecture, engineering, AI, design, and growth sit together, so decisions and delivery don't get lost in a handoff.",
  },
  {
    icon: ShieldCheck,
    title: "We work with your existing systems",
    body: "We integrate with the stack, tools, and team you already have. Replacing something is a recommendation, not a default.",
  },
];

export function WhoWeWorkWithPage() {
  useMeta(WWW_SEO.title, WWW_SEO.description);
  useSocialMeta({
    title: WWW_SEO.title,
    description: WWW_SEO.description,
    path: WWW_SEO.path,
    image: WWW_SEO.image,
  });

  return (
    <div className="w-full min-h-screen bg-white pt-20 overflow-x-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "#FAFAFA" }}>
        <GridOverlay />
        <HeroBlobs />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-20 md:pb-24">
          <div className="flex flex-col gap-6 max-w-2xl rise-in">
            <Eyebrow icon={Users}>Who We Work With</Eyebrow>
            <h1
              className="font-black text-[#0F172A] leading-[1.02]"
              style={{ fontSize: "clamp(2.6rem, 6.2vw, 4.25rem)", letterSpacing: "-0.045em" }}
            >
              Built for the people who <GradientText>own the outcome.</GradientText>
            </h1>
            <p className="text-[#475569] text-xl leading-relaxed">
              Whether you're leading the business, technology, operations, product, or growth,
              we bring the right strategic, technical, and creative capability to move the work
              forward.
            </p>
            <div className="pt-1">
              <CTAButton href="#who-we-work-with" variant="primary" icon={ArrowRight}>
                Find your role
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive persona selector */}
      <PersonaExplorer />

      {/* Why clients come to us */}
      <section className="w-full" style={{ background: "#F9FAFB" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Why clients come to us"
              title="Business problems,"
              gradientWord="not generic services."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {REASONS.map((r, i) => {
              const accent = accentFor(i);
              return (
                <Reveal
                  key={r.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 flex flex-col gap-4"
                  style={{ boxShadow: "0 1px 4px 0 rgba(15,23,42,0.04)" }}
                >
                  <IconTile icon={r.icon} accent={accent} size={11} />
                  <h3 className="text-lg font-bold text-[#0F172A]">{r.title}</h3>
                  <p className="text-sm text-[#475569] leading-relaxed">{r.body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="w-full" style={{ background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
          <Reveal>
            <SectionHead eyebrow="How we work" title="The same process," gradientWord="whatever your role." />
          </Reveal>
          <ol className="mt-14 grid gap-5 md:grid-cols-5">
            {PROCESS.map((step, i) => (
              <Reveal key={step.number} className="flex flex-col gap-3">
                <span className="font-mono text-sm font-bold" style={{ color: accentFor(i) }}>
                  {step.number}
                </span>
                <h3 className="text-base font-bold text-[#0F172A]">{step.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{step.body}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-12">
            <Link href="/leadership" className="group inline-flex items-center gap-2 text-sm font-bold text-[#0EA5E9]">
              Meet the team behind the work
              <ArrowRight size={15} strokeWidth={2.6} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Related on this site */}
      <section className="w-full" style={{ background: "#F9FAFB" }}>
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-28">
          <Reveal>
            <SectionHead eyebrow="Keep exploring" title="Related" gradientWord="on this site" />
          </Reveal>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {RELATED_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#334155] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0EA5E9]/40 hover:text-[#0EA5E9]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] flex-shrink-0" aria-hidden="true" />
                  <span className="flex-1">{l.label}</span>
                  <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" className="text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#0EA5E9]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DarkCTA
        eyebrow="Ready to move the work forward?"
        title="Let's identify where technology creates the most leverage for your business."
        sub="One focused call to understand the context and map the next step."
        cta={
          <CTAButton href="/talk-to-strategist" variant="lime" icon={ArrowRight}>
            Talk to a Strategist
          </CTAButton>
        }
      />
    </div>
  );
}
