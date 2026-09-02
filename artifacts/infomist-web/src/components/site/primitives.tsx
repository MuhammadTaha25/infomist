import type { ReactNode, CSSProperties, ComponentType, MouseEvent } from "react";
import { Link } from "wouter";

/* ─────────────────────────────────────────────────────────────────────────
   Infomist design-system primitives. Every marketing page composes these so
   type scale, color, spacing and motion stay consistent.
   ───────────────────────────────────────────────────────────────────────── */

export const ACCENTS = ["#0EA5E9", "#84CC16", "#8B5CF6", "#F97316"] as const;
/** pick a stable accent for a list index */
export const accentFor = (i: number) => ACCENTS[i % ACCENTS.length];

export const INK = "#0F172A";
export const BODY = "#475569";
export const MUTED = "#64748B";
export const CYAN = "#0EA5E9";
export const LIME = "#84CC16";

type IconType = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
type Tone = "cyan" | "lime" | "violet" | "amber" | "slate";

const TONE_HEX: Record<Tone, string> = {
  cyan: "#0EA5E9",
  lime: "#65A30D",
  violet: "#8B5CF6",
  amber: "#B45309",
  slate: "#64748B",
};

/* ── Backdrop ──────────────────────────────────────────────────────────── */

export function GridOverlay({ dark = false }: { dark?: boolean }) {
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

export function Blob({
  color,
  className,
  size = 460,
}: {
  color: string;
  className: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(34px)",
      }}
    />
  );
}

/** Standard 3-blob wash for light hero bands. */
export function HeroBlobs() {
  return (
    <>
      <Blob color="rgba(14,165,233,0.18)" className="-top-32 -left-24" size={520} />
      <Blob color="rgba(132,204,22,0.14)" className="top-8 right-0" size={420} />
      <Blob color="rgba(139,92,246,0.10)" className="bottom-0 left-1/3" size={360} />
    </>
  );
}

/* ── Text ─────────────────────────────────────────────────────────────── */

export function GradientText({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        background: "linear-gradient(100deg, #0EA5E9 0%, #84CC16 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

export function Eyebrow({
  icon: Icon,
  children,
  tone = "cyan",
  dark = false,
  className = "",
}: {
  icon?: IconType;
  children: ReactNode;
  tone?: Tone;
  dark?: boolean;
  className?: string;
}) {
  const hex = tone === "cyan" ? "#0EA5E9" : TONE_HEX[tone];
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {Icon && (
        <span
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `${hex}${dark ? "24" : "14"}`,
            border: `1px solid ${hex}${dark ? "38" : "26"}`,
            color: hex,
          }}
        >
          <Icon size={15} strokeWidth={2.4} />
        </span>
      )}
      <span
        className="text-xs font-bold uppercase"
        style={{ letterSpacing: "0.24em", color: hex }}
      >
        {children}
      </span>
    </div>
  );
}

export function SectionHead({
  icon,
  eyebrow,
  tone = "cyan",
  title,
  gradientWord,
  sub,
  dark = false,
  center = false,
  className = "",
}: {
  icon?: IconType;
  eyebrow: string;
  tone?: Tone;
  title: ReactNode;
  gradientWord?: string;
  sub?: ReactNode;
  dark?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 ${center ? "items-center text-center" : ""} ${className}`}>
      <Eyebrow icon={icon} tone={tone} dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className={`font-black leading-[1.08] ${dark ? "text-white" : "text-[#0F172A]"}`}
        style={{ fontSize: "clamp(1.9rem, 4vw, 2.7rem)", letterSpacing: "-0.035em" }}
      >
        {gradientWord ? (
          <>
            {title} <GradientText>{gradientWord}</GradientText>
          </>
        ) : (
          title
        )}
      </h2>
      {sub && (
        <p
          className={`text-lg leading-relaxed ${center ? "max-w-2xl" : "max-w-2xl"} ${dark ? "text-slate-400" : "text-[#475569]"}`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/* ── Page hero ────────────────────────────────────────────────────────── */

export function PageHero({
  eyebrow,
  eyebrowIcon,
  tone = "cyan",
  title,
  gradientWord,
  sub,
  children,
  visual,
  className = "",
}: {
  eyebrow: string;
  eyebrowIcon?: IconType;
  tone?: Tone;
  title: ReactNode;
  gradientWord?: string;
  sub?: ReactNode;
  /** CTA row / right-column visual */
  children?: ReactNode;
  /** decorative animated scene, rendered absolute on the right (hidden below md) */
  visual?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden ${className}`} style={{ background: "#FAFAFA" }}>
      <GridOverlay />
      <HeroBlobs />
      {visual}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-14 md:pt-20 md:pb-16">
        <div className="flex flex-col gap-6 max-w-2xl rise-in">
          <Eyebrow icon={eyebrowIcon} tone={tone}>{eyebrow}</Eyebrow>
          <h1
            className="font-black text-[#0F172A] leading-[1.02]"
            style={{ fontSize: "clamp(2.6rem, 6.2vw, 4.25rem)", letterSpacing: "-0.045em" }}
          >
            {gradientWord ? (
              <>
                {title} <GradientText>{gradientWord}</GradientText>
              </>
            ) : (
              title
            )}
          </h1>
          {sub && (
            <p className="text-[#475569] text-xl leading-relaxed max-w-2xl">{sub}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

/* ── Section wrapper ──────────────────────────────────────────────────── */

export function Section({
  id,
  tone = "white",
  children,
  className = "",
  narrow = false,
}: {
  id?: string;
  tone?: "white" | "soft";
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <section
      id={id}
      className={`w-full ${className}`}
      style={{ background: tone === "soft" ? "#F9FAFB" : "#FFFFFF" }}
    >
      <div className={`mx-auto px-6 py-24 md:py-28 ${narrow ? "max-w-4xl" : "max-w-6xl"}`}>
        {children}
      </div>
    </section>
  );
}

/* ── Cards ────────────────────────────────────────────────────────────── */

export function IconTile({
  icon: Icon,
  accent = "#0EA5E9",
  size = 12,
}: {
  icon: IconType;
  accent?: string;
  size?: 10 | 11 | 12 | 14;
}) {
  const px = { 10: 40, 11: 44, 12: 48, 14: 56 }[size];
  return (
    <span
      className="rounded-xl flex items-center justify-center flex-shrink-0"
      style={{
        width: px,
        height: px,
        background: `${accent}14`,
        border: `1px solid ${accent}2e`,
        color: accent,
      }}
    >
      <Icon size={px * 0.42} strokeWidth={2} />
    </span>
  );
}

type CardProps = {
  accent?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  href?: string;
  onClick?: (e: MouseEvent) => void;
};

/** Gradient-border card: outer 1.5px gradient frame → white inner. */
export function AccentCard({ accent = "#0EA5E9", children, className = "", innerClassName = "", href }: CardProps) {
  const outer = `group relative rounded-3xl p-[1.5px] transition-transform duration-300 hover:-translate-y-1 ${className}`;
  const outerStyle: CSSProperties = { background: `linear-gradient(150deg, ${accent}3a, ${accent}0a)` };
  const inner = `rounded-[22px] bg-white h-full ${innerClassName || "p-7"}`;
  if (href) {
    return (
      <Link href={href} className={outer} style={outerStyle}>
        <div className={inner}>{children}</div>
      </Link>
    );
  }
  return (
    <div className={outer} style={outerStyle}>
      <div className={inner}>{children}</div>
    </div>
  );
}

/* ── Buttons ──────────────────────────────────────────────────────────── */

type BtnVariant = "primary" | "lime" | "outline" | "white" | "ghost";

const BTN_BASE =
  "group inline-flex items-center justify-center gap-2 rounded-xl text-base font-bold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0EA5E9]";

function btnClasses(variant: BtnVariant) {
  switch (variant) {
    case "primary":
      return `${BTN_BASE} px-7 py-4 text-white hover:-translate-y-1 hover:shadow-[0_14px_34px_-8px_rgba(14,165,233,0.5)]`;
    case "lime":
      return `${BTN_BASE} px-8 py-4 text-[#0F172A] hover:-translate-y-1 hover:shadow-[0_14px_34px_-8px_rgba(132,204,22,0.5)]`;
    case "white":
      return `${BTN_BASE} px-8 py-4 bg-white text-[#0B1220] hover:-translate-y-1`;
    case "outline":
      return `${BTN_BASE} px-7 py-4 text-[#0F172A] hover:-translate-y-0.5 hover:bg-white`;
    case "ghost":
      return `${BTN_BASE} px-2 py-1 text-[#0EA5E9]`;
  }
}

function btnStyle(variant: BtnVariant): CSSProperties {
  switch (variant) {
    case "primary":
      return { background: "linear-gradient(120deg, #0EA5E9, #0284C7)", boxShadow: "0 10px 28px -8px rgba(14,165,233,0.4)" };
    case "lime":
      return { background: "#84CC16", boxShadow: "0 8px 30px 0 rgba(132,204,22,0.32)" };
    case "outline":
      return { border: "1.5px solid rgba(14,165,233,0.4)", background: "transparent" };
    default:
      return {};
  }
}

export function CTAButton({
  href,
  external = false,
  variant = "primary",
  children,
  icon: Icon,
  className = "",
  onClick,
}: {
  href: string;
  external?: boolean;
  variant?: BtnVariant;
  children: ReactNode;
  icon?: IconType;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const content = (
    <>
      {children}
      {Icon && <Icon size={17} strokeWidth={2.6} className="transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
  const cls = `${btnClasses(variant)} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={btnStyle(variant)} onClick={onClick}>
        {content}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} className={cls} style={btnStyle(variant)} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} style={btnStyle(variant)}>
      {content}
    </Link>
  );
}

/* ── Pills ────────────────────────────────────────────────────────────── */

export function Pill({
  children,
  accent,
  className = "",
}: {
  children: ReactNode;
  accent?: string;
  className?: string;
}) {
  if (accent) {
    return (
      <span
        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${className}`}
        style={{ color: accent, background: `${accent}14` }}
      >
        {children}
      </span>
    );
  }
  return (
    <span
      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full text-[#475569] ${className}`}
      style={{ background: "#F1F5F9", border: "1px solid #E2E8F0" }}
    >
      {children}
    </span>
  );
}

/* ── Dark ─────────────────────────────────────────────────────────────── */

export function DarkSection({
  id,
  children,
  className = "",
  narrow = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ background: "linear-gradient(160deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}
    >
      <GridOverlay dark />
      <Blob color="rgba(14,165,233,0.20)" className="-top-24 left-1/4" size={440} />
      <Blob color="rgba(132,204,22,0.14)" className="-bottom-24 right-1/4" size={380} />
      <div className={`relative mx-auto px-6 py-24 md:py-28 ${narrow ? "max-w-4xl" : "max-w-6xl"}`}>
        {children}
      </div>
    </section>
  );
}

/** Dark glass card for use inside DarkSection. */
export function DarkCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 ${className}`}
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {children}
    </div>
  );
}

/** The closing conversion panel: rounded-[32px] dark gradient + blobs + grid. */
export function DarkCTA({
  eyebrow = "Let's talk",
  title,
  sub,
  cta,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  cta: ReactNode;
  className?: string;
}) {
  return (
    <section className={`w-full px-6 py-20 md:py-24 ${className}`} style={{ background: "#F9FAFB" }}>
      <div
        className="relative max-w-6xl mx-auto rounded-[32px] px-8 md:px-16 py-16 md:py-24 flex flex-col items-center text-center gap-6 overflow-hidden rise-in"
        style={{ background: "linear-gradient(150deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)" }}
      >
        <Blob color="rgba(14,165,233,0.24)" className="-top-24 left-1/4" size={420} />
        <Blob color="rgba(132,204,22,0.18)" className="-bottom-24 right-1/4" size={360} />
        <GridOverlay dark />
        <span className="relative z-10 text-xs font-bold uppercase text-[#84CC16]" style={{ letterSpacing: "0.24em" }}>
          {eyebrow}
        </span>
        <h2
          className="relative z-10 font-black text-white leading-[1.05] max-w-2xl"
          style={{ fontSize: "clamp(1.9rem, 4.5vw, 3rem)", letterSpacing: "-0.03em" }}
        >
          {title}
        </h2>
        {sub && <p className="relative z-10 text-slate-400 text-lg max-w-xl leading-relaxed">{sub}</p>}
        <div className="relative z-10 mt-2">{cta}</div>
      </div>
    </section>
  );
}
