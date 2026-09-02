import { Link } from "wouter";

export function NotFoundBlock({
  label = "404",
  title,
  sub,
  backHref,
  backLabel,
}: {
  label?: string;
  title: string;
  sub?: string;
  backHref: string;
  backLabel: string;
}) {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-6 pt-20 text-center">
      <span className="text-xs font-bold tracking-[0.24em] uppercase text-[#0EA5E9]">{label}</span>
      <h1 className="text-4xl md:text-5xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.04em" }}>
        {title}
      </h1>
      {sub && <p className="text-[#475569]">{sub}</p>}
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
        style={{ background: "linear-gradient(120deg,#0EA5E9,#0284C7)" }}
      >
        {backLabel}
      </Link>
    </div>
  );
}
