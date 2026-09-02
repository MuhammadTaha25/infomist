import type { MouseEvent } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";

/**
 * Case Study card — reuses the existing dark portfolio-card language from
 * src/pages/CaseStudies.tsx (glass panel, monogram tile, industry pill, lift on
 * hover). The whole card opens the internal detail page; "Visit Website" is a
 * separate, visually-secondary external link.
 */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [, navigate] = useLocation();
  const href = `/case-studies/${study.slug}`;

  function openExternal(e: MouseEvent) {
    e.stopPropagation();
  }

  return (
    <article
      onClick={() => navigate(href)}
      className="group h-full rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-black"
          style={{ background: `${study.color}22`, color: study.color, border: `1px solid ${study.color}3a` }}
        >
          {study.initials}
        </div>
        <span
          className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full whitespace-nowrap"
          style={{ background: `${study.color}18`, color: study.color, border: `1px solid ${study.color}30` }}
        >
          {study.category}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-white font-bold text-lg leading-snug">
          <Link
            href={href}
            onClick={(e) => e.stopPropagation()}
            className="rounded outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
          >
            {study.name}
          </Link>
        </h3>
        <p className="text-[11px] text-slate-500">
          {study.industry} · {study.location}
        </p>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed flex-1">{study.shortDescription}</p>

      <div className="flex flex-wrap gap-1.5">
        {study.services.map((t) => (
          <span
            key={t}
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-slate-300"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-1">
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0EA5E9]">
          View Case Study
          <ArrowRight size={15} strokeWidth={2.6} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        {study.websiteUrl ? (
          <a
            href={study.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openExternal}
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-400 hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] rounded"
          >
            Visit Website
            <ArrowUpRight size={14} strokeWidth={2.4} />
          </a>
        ) : null}
      </div>
    </article>
  );
}
