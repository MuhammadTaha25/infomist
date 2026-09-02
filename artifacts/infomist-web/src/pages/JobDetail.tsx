import { Link, useParams } from "wouter";
import { ArrowRight, ArrowLeft, Check, Briefcase, MapPin, Sparkles } from "lucide-react";
import { useMeta } from "@/components/site/useMeta";
import { findJob } from "@/data/careersData";

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

const ACCENTS: Record<string, string> = {
  "ai-engineer": "#0EA5E9",
  "software-engineer": "#8B5CF6",
  "ai-automation-intern": "#84CC16",
};

function List({ heading, items, accent }: { heading: string; items: string[]; accent: string }) {
  return (
    <div className="rise-in flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${accent}14`, border: `1px solid ${accent}2e`, color: accent }}>
          <Sparkles size={15} strokeWidth={2.4} />
        </span>
        <h2 className="text-2xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.02em" }}>{heading}</h2>
      </div>
      <ul className="flex flex-col gap-2.5">
        {items.map((it) => (
          <li
            key={it}
            className="flex items-start gap-3.5 rounded-xl px-4 py-3.5 text-[#0F172A] leading-relaxed transition-all duration-250 hover:-translate-y-0.5"
            style={{ background: `${accent}0a`, border: `1px solid ${accent}22` }}
          >
            <span className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${accent}20`, color: accent }}>
              <Check size={12} strokeWidth={3.2} />
            </span>
            <span className="text-sm">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const job = slug ? findJob(slug) : null;

  useMeta(
    job ? `${job.title} | Careers at Infomist` : "Position Not Found | Infomist",
    job
      ? `${job.title} — ${job.type}, ${job.location}. ${job.summary} Apply to join Infomist.`
      : "This position could not be found. Explore current openings at Infomist.",
  );

  if (!job) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-6 pt-20 text-center">
        <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#0EA5E9]">404</span>
        <h1 className="text-4xl md:text-5xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.03em" }}>
          Position not found.
        </h1>
        <p className="text-[#475569]">This role isn't open, or the link has changed.</p>
        <Link href="/careers" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white" style={{ background: "#0EA5E9" }}>
          View all positions
        </Link>
      </div>
    );
  }

  const accent = ACCENTS[job.slug] ?? "#0EA5E9";

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `${job.about} Responsibilities: ${job.responsibilities.join(" ")} Requirements: ${job.requirements.join(" ")}`,
    employmentType: job.type.toUpperCase().includes("INTERN") ? "INTERN" : "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Infomist",
      sameAs: "https://www.infomist.com",
      logo: "https://www.infomist.com/infomist-software-development-company-logo.png",
    },
    jobLocationType: /remote/i.test(job.location) ? "TELECOMMUTE" : undefined,
    applicantLocationRequirements: { "@type": "Country", name: "Worldwide" },
    directApply: false,
    url: `https://www.infomist.com/careers/${job.slug}`,
  };

  return (
    <div className="w-full min-h-screen bg-white pt-20 overflow-x-hidden">
      <JsonLd data={jobPostingSchema} />

      {/* breadcrumb */}
      <div className="border-b border-slate-100 relative z-10">
        <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-2 text-sm">
          <Link href="/careers" className="text-[#64748B] hover:text-[#0EA5E9] transition-colors duration-150 font-medium">
            Careers
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="text-[#0F172A] font-semibold">{job.title}</span>
        </nav>
      </div>

      {/* hero */}
      <section className="relative overflow-hidden" style={{ background: "#FAFAFA" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.14) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 60% at 25% 0%, #000 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 25% 0%, #000 40%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 -left-20 w-[480px] h-[480px] rounded-full"
          style={{ background: `radial-gradient(circle, ${accent}26 0%, transparent 70%)`, filter: "blur(34px)" }}
        />

        <div className="relative max-w-4xl mx-auto px-6 pt-14 pb-16 md:pt-20 md:pb-20">
          <div className="flex flex-col gap-5 rise-in">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${accent}14`, border: `1px solid ${accent}2e`, color: accent }}>
                <Briefcase size={15} strokeWidth={2.4} />
              </span>
              <span className="text-xs font-bold tracking-[0.24em] uppercase" style={{ color: accent }}>Open Position</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[#0F172A] leading-[1.02]" style={{ letterSpacing: "-0.04em" }}>
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-[13px] font-bold px-3 py-1.5 rounded-full" style={{ color: accent, background: `${accent}14` }}>
                <Briefcase size={13} strokeWidth={2.6} />
                {job.type}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-bold px-3 py-1.5 rounded-full text-[#475569]" style={{ background: "#F1F5F9", border: "1px solid #E2E8F0" }}>
                <MapPin size={13} strokeWidth={2.6} />
                {job.location}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {job.skills.map((s) => (
                <span key={s} className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-[#475569]" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
                  {s}
                </span>
              ))}
            </div>
            <p className="text-[#475569] text-lg leading-relaxed max-w-2xl">{job.about}</p>
            <div className="pt-1">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white transition-all duration-300 hover:-translate-y-1"
                style={{ background: `linear-gradient(120deg, ${accent}, ${accent}cc)`, boxShadow: `0 12px 32px -8px ${accent}80` }}
              >
                Apply Now
                <ArrowRight size={18} strokeWidth={2.6} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 flex flex-col gap-14">
        <List heading="Responsibilities" items={job.responsibilities} accent={accent} />
        <List heading="Requirements" items={job.requirements} accent={accent} />
        {job.niceToHave && job.niceToHave.length > 0 && (
          <List heading="Nice to Have" items={job.niceToHave} accent={accent} />
        )}

        <div
          className="rise-in relative rounded-[28px] px-8 md:px-12 py-14 flex flex-col items-center text-center gap-4 overflow-hidden"
          style={{ background: "linear-gradient(150deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}
        >
          <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/4 w-80 h-80 rounded-full" style={{ background: `radial-gradient(circle, ${accent}33 0%, transparent 70%)`, filter: "blur(28px)" }} />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 right-1/4 w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(132,204,22,0.18) 0%, transparent 70%)", filter: "blur(28px)" }} />
          <span className="relative z-10 text-xs font-bold tracking-[0.24em] uppercase text-[#84CC16]">Apply</span>
          <h2 className="relative z-10 text-2xl md:text-3xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>
            Interested in this role?
          </h2>
          <p className="relative z-10 text-slate-400 max-w-md leading-relaxed">
            Tell us a bit about yourself and share your CV — we read every application.
          </p>
          <Link
            href="/contact"
            className="group relative z-10 mt-2 inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-[#0F172A] transition-all duration-300 hover:-translate-y-1"
            style={{ background: "#84CC16", boxShadow: "0 8px 32px 0 rgba(132,204,22,0.35)" }}
          >
            Apply Now
            <ArrowRight size={18} strokeWidth={2.6} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#0EA5E9] transition-colors duration-150">
          <ArrowLeft size={15} strokeWidth={2.4} />
          Back to all positions
        </Link>
      </div>
    </div>
  );
}
