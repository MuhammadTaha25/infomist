import { Link } from "wouter";
import { ArrowRight, Info, Lightbulb, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { Block, CalloutKind } from "@/blogging/types";

/**
 * Public renderer for a published post's block content — in the marketing
 * site's design language. Covers the block types the Automation Library posts
 * use (paragraph, heading, list, quote, code, image, callout, button,
 * separator, table, faq). Unknown block types are skipped safely.
 *
 * Internal links inside rich text are normalised: legacy `/blog/<slug>/` and
 * `data-slug` links are rewritten to `/insights/<slug>`; external links get
 * `target="_blank" rel="noopener noreferrer"`.
 */

type MediaResolver = (id: string | null) => { url: string; alt: string } | null;

export function ArticleBody({
  blocks,
  resolveMedia,
}: {
  blocks: Block[];
  resolveMedia: MediaResolver;
}) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((b) => (
        <BlockView key={b.id} block={b} resolveMedia={resolveMedia} />
      ))}
    </div>
  );
}

function normaliseHtml(html: string): string {
  if (typeof document === "undefined") return html;
  const el = document.createElement("div");
  el.innerHTML = html;
  el.querySelectorAll("a").forEach((a) => {
    const href = a.getAttribute("href") ?? "";
    const slug = a.getAttribute("data-slug");
    const isExternal = a.getAttribute("data-external") === "true" || /^https?:\/\//i.test(href);
    if (isExternal) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    } else {
      let to = href;
      if (slug) to = `/insights/${slug}`;
      else if (href.startsWith("/blog/")) to = `/insights/${href.replace(/^\/blog\//, "").replace(/\/$/, "")}`;
      a.setAttribute("href", to);
      a.removeAttribute("target");
    }
    a.setAttribute("class", "text-[#0EA5E9] font-semibold underline decoration-[#0EA5E9]/30 underline-offset-2 hover:decoration-[#0EA5E9]");
  });
  return el.innerHTML;
}

const PROSE_A =
  "[&_strong]:font-bold [&_strong]:text-[#0F172A] [&_em]:italic";

function BlockView({ block: b, resolveMedia }: { block: Block; resolveMedia: MediaResolver }) {
  switch (b.type) {
    case "heading": {
      const cls =
        b.level === 2
          ? "text-2xl md:text-3xl font-black text-[#0F172A] leading-tight mt-4"
          : "text-xl md:text-2xl font-bold text-[#0F172A] leading-snug mt-2";
      return (
        <h2
          className={cls}
          style={{ letterSpacing: "-0.02em" }}
          dangerouslySetInnerHTML={{ __html: normaliseHtml(b.html ?? "") }}
        />
      );
    }
    case "paragraph":
      return (
        <p
          className={`text-[#334155] text-lg leading-relaxed ${PROSE_A}`}
          dangerouslySetInnerHTML={{ __html: normaliseHtml(b.html ?? "") }}
        />
      );
    case "list": {
      const Tag = b.ordered ? "ol" : "ul";
      return (
        <Tag
          className={`flex flex-col gap-2 pl-5 text-[#334155] text-lg leading-relaxed ${
            b.ordered ? "list-decimal" : "list-disc"
          } marker:text-[#0EA5E9] ${PROSE_A}`}
          dangerouslySetInnerHTML={{ __html: normaliseHtml(b.html ?? "") }}
        />
      );
    }
    case "quote":
      return (
        <blockquote className="border-l-4 border-[#0EA5E9] pl-5 py-1 flex flex-col gap-2">
          <p
            className="text-xl text-[#0F172A] font-medium leading-relaxed"
            dangerouslySetInnerHTML={{ __html: normaliseHtml(b.html ?? "") }}
          />
          {b.citation && <cite className="text-sm text-[#64748B] not-italic">— {b.citation}</cite>}
        </blockquote>
      );
    case "code":
      return (
        <pre className="rounded-2xl bg-[#0B1220] text-slate-100 text-sm p-5 overflow-x-auto">
          <code>{b.code}</code>
        </pre>
      );
    case "separator":
      return <hr className="border-slate-200" />;
    case "image": {
      const m = resolveMedia(b.image?.mediaId ?? null);
      if (!m) return null;
      return (
        <figure className="flex flex-col gap-2">
          <img
            src={m.url}
            alt={b.image?.alt || m.alt}
            loading="lazy"
            className="w-full rounded-2xl border border-slate-200"
          />
          {b.image?.caption && (
            <figcaption className="text-sm text-[#64748B] text-center">{b.image.caption}</figcaption>
          )}
        </figure>
      );
    }
    case "callout":
      return <Callout kind={b.callout?.kind ?? "info"} title={b.callout?.title} html={b.callout?.html ?? ""} />;
    case "button": {
      const href = b.button?.href ?? "#";
      const label = b.button?.text ?? "Learn more";
      const inner = (
        <>
          {label}
          <ArrowRight size={16} strokeWidth={2.6} />
        </>
      );
      const cls =
        "inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 w-fit";
      const style = { background: "linear-gradient(120deg,#0EA5E9,#0284C7)" };
      return href.startsWith("/") ? (
        <Link href={href} className={cls} style={style}>
          {inner}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>
          {inner}
        </a>
      );
    }
    case "table": {
      const rows = b.table?.rows ?? [];
      if (!rows.length) return null;
      const [head, ...body] = b.table?.headerRow ? rows : [[], ...rows];
      return (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border border-slate-200 rounded-xl overflow-hidden">
            {b.table?.headerRow && (
              <thead className="bg-slate-50">
                <tr>
                  {head.map((c, i) => (
                    <th key={i} className="px-4 py-3 font-bold text-[#0F172A]">{c}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {body.map((r, i) => (
                <tr key={i} className="border-t border-slate-100">
                  {r.map((c, j) => (
                    <td key={j} className="px-4 py-3 text-[#334155]">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    case "faq":
      return (
        <div className="flex flex-col gap-4">
          {(b.faq ?? []).map((f) => (
            <div key={f.id} className="flex flex-col gap-1.5">
              <p className="font-bold text-[#0F172A]">{f.q}</p>
              <p className="text-[#334155] leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

const CALLOUT_META: Record<CalloutKind, { icon: typeof Info; color: string; bg: string }> = {
  info: { icon: Info, color: "#0EA5E9", bg: "rgba(14,165,233,0.08)" },
  tip: { icon: Lightbulb, color: "#84CC16", bg: "rgba(132,204,22,0.09)" },
  warning: { icon: AlertTriangle, color: "#F97316", bg: "rgba(249,115,22,0.09)" },
  success: { icon: CheckCircle2, color: "#16A34A", bg: "rgba(22,163,74,0.09)" },
  danger: { icon: XCircle, color: "#DC2626", bg: "rgba(220,38,38,0.08)" },
};

function Callout({ kind, title, html }: { kind: CalloutKind; title?: string; html: string }) {
  const m = CALLOUT_META[kind] ?? CALLOUT_META.info;
  const Icon = m.icon;
  return (
    <div className="rounded-2xl p-5 flex gap-3.5" style={{ background: m.bg, border: `1px solid ${m.color}28` }}>
      <Icon size={20} strokeWidth={2.2} className="flex-shrink-0 mt-0.5" style={{ color: m.color }} />
      <div className="flex flex-col gap-1">
        {title && <span className="font-bold text-[#0F172A]">{title}</span>}
        <div
          className="text-[#334155] leading-relaxed [&_a]:text-[#0EA5E9] [&_a]:font-semibold"
          dangerouslySetInnerHTML={{ __html: normaliseHtml(html) }}
        />
      </div>
    </div>
  );
}
