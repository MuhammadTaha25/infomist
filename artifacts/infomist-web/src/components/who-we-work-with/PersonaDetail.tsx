import { Link } from "wouter";
import { ArrowRight, ArrowLeft, HelpCircle } from "lucide-react";
import { useMeta } from "@/components/site/useMeta";
import { JsonLd, faqSchema, FaqAccordion } from "@/components/site/Faq";
import { Reveal } from "@/components/Reveal";
import {
  GridOverlay,
  HeroBlobs,
  Eyebrow,
  SectionHead,
  IconTile,
  DarkCTA,
  CTAButton,
  accentFor,
} from "@/components/site/primitives";
import {
  PROCESS,
  engagementById,
  personaNeighbours,
  type Persona,
} from "@/data/whoWeWorkWithData";
import { proofFor } from "@/data/proofData";
import { ChallengeSelector } from "./ChallengeSelector";

export function PersonaDetail({ persona }: { persona: Persona }) {
  useMeta(persona.seo.title, persona.seo.description);

  const Icon = persona.icon;
  const neighbours = personaNeighbours(persona.slug);
  const proof = proofFor(persona.proofTags, 3);
  const models = persona.engagementFit
    .map(engagementById)
    .filter((m): m is NonNullable<typeof m> => Boolean(m))
    .sort((a, b) => a.number.localeCompare(b.number));

  return (
    <div className="w-full min-h-screen bg-white pt-20 overflow-x-hidden">
      <JsonLd data={faqSchema(persona.faqs)} />

      {/* Breadcrumb */}
      <div className="border-b border-slate-100 relative z-10">
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-2 text-sm">
          <Link href="/" className="text-[#64748B] hover:text-[#0EA5E9] transition-colors duration-150 font-medium">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <Link href="/who-we-work-with" className="text-[#64748B] hover:text-[#0EA5E9] transition-colors duration-150 font-medium">
            Who We Work With
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="text-[#0F172A] font-semibold">{persona.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "#FAFAFA" }}>
        <GridOverlay />
        <HeroBlobs />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-14 md:pt-20 md:pb-16">
          <div className="flex flex-col gap-6 max-w-2xl rise-in">
            <div className="flex items-center gap-4">
              <IconTile icon={Icon} accent="#0EA5E9" size={14} />
              <Eyebrow>{persona.eyebrow}</Eyebrow>
            </div>
            <h1
              className="font-black text-[#0F172A] leading-[1.05]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", letterSpacing: "-0.04em" }}
            >
              {persona.heroTitle}
            </h1>
            <p className="text-[#475569] text-xl leading-relaxed">{persona.heroBody}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <CTAButton href="/talk-to-strategist" variant="primary" icon={ArrowRight}>
                Talk to a Strategist
              </CTAButton>
              <CTAButton href="/case-studies" variant="outline">
                Explore our work
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge selector */}
      <section className="w-full" style={{ background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
          <Reveal>
            <SectionHead eyebrow="What brings you here?" title="What are you" gradientWord="trying to change?" />
          </Reveal>
          <div className="mt-12">
            <ChallengeSelector persona={persona} />
          </div>
        </div>
      </section>

      {/* How we help — capability pathways */}
      <section className="w-full" style={{ background: "#F9FAFB" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
          <Reveal>
            <SectionHead eyebrow="How we help" title="Capabilities that" gradientWord="map to the problem" />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {persona.capabilities.map((cap, i) => {
              const accent = accentFor(i);
              return (
                <Reveal
                  key={cap.title}
                  className="rounded-3xl p-[1.5px] h-full"
                  style={{ background: `linear-gradient(150deg, ${accent}3a, ${accent}0a)` }}
                >
                  <div className="rounded-[22px] bg-white h-full p-7 flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-[#0F172A]">{cap.title}</h3>
                    <p className="text-sm text-[#475569] leading-relaxed">{cap.forWho}</p>
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                      {cap.services.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="text-[12px] font-semibold px-2.5 py-1 rounded-full transition-colors duration-150 hover:bg-[#0EA5E9]/10"
                          style={{ color: accent, background: `${accent}14` }}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section className="w-full" style={{ background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
          <Reveal>
            <SectionHead
              eyebrow="How we can work together"
              title="Engagement models that"
              gradientWord="fit the stage you're at"
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {models.map((m) => (
              <Reveal
                key={m.id}
                className="rounded-2xl border border-slate-200 bg-white p-7 flex flex-col gap-3"
                style={{ boxShadow: "0 1px 4px 0 rgba(15,23,42,0.04)" }}
              >
                <span className="font-mono text-sm font-bold text-[#0EA5E9]">{m.number}</span>
                <h3 className="text-lg font-bold text-[#0F172A]">{m.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{m.forWho}</p>
                <p className="text-sm text-[#334155] leading-relaxed mt-1">
                  <span className="font-semibold">Typical outcome: </span>
                  {m.outcome}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="w-full" style={{ background: "#F9FAFB" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Proof of work"
              title="We've solved problems"
              gradientWord="like this before"
              sub="A selection of relevant work. Full context on the Case Studies page."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {proof.map((p) => (
              <Reveal key={p.id}>
                <Link
                  href={p.href}
                  className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1.5"
                  style={{ boxShadow: "0 1px 4px 0 rgba(15,23,42,0.04)" }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black"
                      style={{ background: `${p.color}1f`, color: p.color }}
                    >
                      {p.name.slice(0, 1)}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                      {p.industry}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{p.name}</h3>
                  <p className="text-sm text-[#475569] leading-relaxed flex-1">{p.summary}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0EA5E9]">
                    View case study
                    <ArrowRight size={14} strokeWidth={2.6} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="w-full" style={{ background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28">
          <Reveal>
            <SectionHead eyebrow="How we work" title="A process that stays" gradientWord="legible to the business" />
          </Reveal>
          <ol className="mt-14 grid gap-5 md:grid-cols-5">
            {PROCESS.map((step, i) => (
              <Reveal key={step.number} className="flex flex-col gap-3">
                <span
                  className="font-mono text-sm font-bold"
                  style={{ color: accentFor(i) }}
                >
                  {step.number}
                </span>
                <h3 className="text-base font-bold text-[#0F172A]">{step.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full" style={{ background: "#F9FAFB" }}>
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-28">
          <div className="mb-10 rise-in">
            <Eyebrow icon={HelpCircle}>FAQ</Eyebrow>
            <h2
              className="mt-4 font-black text-[#0F172A] max-w-2xl"
              style={{ fontSize: "clamp(1.9rem, 4vw, 2.7rem)", letterSpacing: "-0.035em" }}
            >
              Questions {persona.title.toLowerCase()} ask us
            </h2>
          </div>
          <div className="rise-in">
            <FaqAccordion key={`persona-${persona.id}`} faqs={persona.faqs} idPrefix={`persona-${persona.id}`} />
          </div>
        </div>
      </section>

      {/* Persona nav */}
      {neighbours && (
        <section className="w-full border-t border-slate-100" style={{ background: "#FFFFFF" }}>
          <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-between gap-4">
            <Link
              href={`/who-we-work-with/${neighbours.prev.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#475569] hover:text-[#0EA5E9] transition-colors duration-150"
            >
              <ArrowLeft size={15} strokeWidth={2.4} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
              {neighbours.prev.navLabel}
            </Link>
            <Link href="/who-we-work-with" className="text-sm font-bold text-[#0EA5E9]">
              All roles
            </Link>
            <Link
              href={`/who-we-work-with/${neighbours.next.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#475569] hover:text-[#0EA5E9] transition-colors duration-150"
            >
              {neighbours.next.navLabel}
              <ArrowRight size={15} strokeWidth={2.4} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      )}

      <DarkCTA
        eyebrow="Ready to move the work forward?"
        title={<>Let's find where technology creates the most leverage for your business.</>}
        sub="One focused call to understand the context and map the next step — no generic sales pitch."
        cta={
          <CTAButton href="/talk-to-strategist" variant="lime" icon={ArrowRight}>
            Talk to a Strategist
          </CTAButton>
        }
      />
    </div>
  );
}
