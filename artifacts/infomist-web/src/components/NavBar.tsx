import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { CATEGORIES } from "@/data/solutionsData";

const LOGO_URL = `${import.meta.env.BASE_URL}infomist-software-development-company-logo.png`;

/* ─── Icon primitives ─── */
const IconLeader = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="6.5" r="3.5" />
    <path d="M2 18c0-4.5 3.6-8 8-8s8 3.5 8 8" />
  </svg>
);
const IconChevron = ({ open }: { open: boolean }) => (
  <svg
    width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
  >
    <path d="M2.5 5l4.5 4 4.5-4" />
  </svg>
);
const IconAbout = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="8" />
    <path d="M10 13.5V9.5M10 6.5h.01" />
  </svg>
);
const IconCareers = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="5.5" width="15" height="11" rx="2" />
    <path d="M7 5.5V4a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 13 4v1.5" />
  </svg>
);
const IconAudience = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="7" r="2.6" />
    <path d="M2 16.5c0-2.8 2.2-5 5-5s5 2.2 5 5" />
    <path d="M13 4.2a2.6 2.6 0 0 1 0 5.1M14.5 16.5c0-2.5-1.4-4.4-3.3-5" />
  </svg>
);
const IconPowerhouse = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="2.4" />
    <circle cx="10" cy="10" r="7.2" />
    <path d="M10 2.8v2M10 15.2v2M2.8 10h2M15.2 10h2" />
  </svg>
);

/* ─── Company data ─── */
const COMPANY_NAV = [
  { icon: <IconAbout />, label: "About Us", desc: "25 years of engineering — our story and values", href: "/about" },
  { icon: <IconLeader />, label: "Leadership", desc: "The founder and team behind Infomist", href: "/leadership" },
  { icon: <IconAudience />, label: "Who We Work With", desc: "The roles and problems we're built for", href: "/who-we-work-with" },
  { icon: <IconPowerhouse />, label: "Engineering Powerhouse", desc: "How one CEO runs an AI-powered company", href: "/one-man-company" },
  { icon: <IconCareers />, label: "Careers", desc: "Open roles and life at Infomist", href: "/careers" },
];

/* ─── Solutions dropdown — 3 + 3 + 1 grid layout ─── */
function SolutionsDropdown({ onNav }: { onNav: () => void }) {
  // Split into rows: first 3, next 3, last 1
  const row1 = CATEGORIES.slice(0, 3);
  const row2 = CATEGORIES.slice(3, 6);
  const row3 = CATEGORIES.slice(6);

  const GridCell = ({ cat }: { cat: (typeof CATEGORIES)[number] }) => {
    const Icon = cat.icon;
    const isSeo = cat.slug === "seo";
    return (
      <Link
        href={`/solutions/${cat.slug}`}
        onClick={onNav}
        className="group flex items-center gap-3 p-3.5 rounded-xl transition-all duration-150 hover:bg-sky-50"
      >
        <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-sky-50 group-hover:bg-sky-100 flex-shrink-0 transition-colors duration-150">
          <Icon size={16} color="#0EA5E9" strokeWidth={1.8} />
        </span>
        <span
          className="text-sm font-semibold leading-snug transition-colors duration-150"
          style={{ color: isSeo ? "#84CC16" : undefined }}
        >
          {cat.name}
        </span>
      </Link>
    );
  };

  return (
    <div
      className="absolute top-[calc(100%+12px)] left-0 bg-white rounded-2xl overflow-hidden"
      style={{
        width: "660px",
        border: "1px solid rgba(203,213,225,0.7)",
        boxShadow: "0 24px 60px -12px rgba(15,23,42,0.2), 0 8px 20px -6px rgba(14,165,233,0.08)",
      }}
    >
      <div className="p-3">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] px-3 pb-2 pt-1">
          Solutions
        </p>
        {/* Row 1 — 3 columns */}
        <div className="grid grid-cols-3 gap-1">
          {row1.map((cat) => <GridCell key={cat.slug} cat={cat} />)}
        </div>
        {/* Divider */}
        <div className="mx-3 my-1 border-t border-slate-100" />
        {/* Row 2 — 3 columns */}
        <div className="grid grid-cols-3 gap-1">
          {row2.map((cat) => <GridCell key={cat.slug} cat={cat} />)}
        </div>
        {/* Divider */}
        <div className="mx-3 my-1 border-t border-slate-100" />
        {/* Row 3 — single item centred */}
        <div className="flex justify-center">
          {row3.map((cat) => (
            <div key={cat.slug} style={{ width: "calc(33.333% - 4px)" }}>
              <GridCell cat={cat} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Company mega-panel ─── */
function MegaCompany({ onNav }: { onNav: () => void }) {
  return (
    <div
      className="absolute top-[calc(100%+12px)] right-0 w-[540px] bg-white rounded-2xl overflow-hidden"
      style={{
        border: "1px solid rgba(203,213,225,0.7)",
        boxShadow: "0 24px 60px -12px rgba(15,23,42,0.2), 0 8px 20px -6px rgba(14,165,233,0.08)",
      }}
    >
      <div className="grid grid-cols-[1fr_220px]">
        {/* ── Left: nav links ── */}
        <div className="flex flex-col gap-1 p-4 border-r border-slate-100">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] px-3 pb-2 pt-1">
            Company
          </p>
          {COMPANY_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNav}
              className="flex items-start gap-3 px-3 py-3 rounded-xl group transition-all duration-150 hover:bg-sky-50"
            >
              <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-sky-50 group-hover:bg-sky-100 transition-colors duration-150">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 leading-snug group-hover:text-[#0EA5E9] transition-colors duration-150">
                  {item.label}
                </p>
                <p className="text-xs text-[#94A3B8] mt-0.5 leading-snug">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Right: Guru.com trust card ── */}
        <div className="p-4 flex flex-col">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] pb-3 pt-1" style={{ color: "#84CC16" }}>
            Verified Track Record
          </p>
          <div
            className="flex-1 flex flex-col gap-3.5 rounded-xl p-4"
            style={{ background: "#F8FAFC", border: "1px solid rgba(203,213,225,0.5)" }}
          >
            <p className="text-xs text-slate-600 leading-relaxed flex-1">
              $1.5M+ in completed transactions, 2,907 jobs delivered, 549 employers served — see our verified history on Guru.com
            </p>
            <a
              href="https://www.guru.com/freelancers/infomist"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#0EA5E9] hover:underline transition-all duration-150 mt-auto"
            >
              View our verified profile on Guru.com
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#0EA5E9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 9L9 2M9 2H4.5M9 2v4.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Desktop nav item with dropdown ─── */
type DropdownKey = "solutions" | "company" | null;

function NavItem({
  label,
  href,
  isActive,
  dropdownKey,
  activeDropdown,
  setActiveDropdown,
  children,
}: {
  label: string;
  href?: string;
  isActive: boolean;
  dropdownKey?: DropdownKey;
  activeDropdown: DropdownKey;
  setActiveDropdown: (k: DropdownKey) => void;
  children?: React.ReactNode;
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasDropdown = !!dropdownKey;
  const isOpen = hasDropdown && activeDropdown === dropdownKey;

  const open = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (hasDropdown) setActiveDropdown(dropdownKey!);
  };
  const close = () => {
    timerRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <li className="relative" onMouseEnter={open} onMouseLeave={close}>
      {href && !hasDropdown ? (
        <Link href={href}
          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 select-none"
          style={{ color: isActive ? "#0EA5E9" : "#475569", background: isActive ? "rgba(14,165,233,0.08)" : "transparent", fontWeight: isActive ? 600 : 500 }}
        >
          {label}
        </Link>
      ) : (
        <button
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 select-none cursor-pointer"
          style={{ color: isActive || isOpen ? "#0EA5E9" : "#475569", background: isOpen ? "rgba(14,165,233,0.08)" : "transparent", fontWeight: isActive || isOpen ? 600 : 500 }}
          aria-expanded={isOpen}
        >
          {label}
          <IconChevron open={isOpen} />
        </button>
      )}
      {hasDropdown && isOpen && (
        <div onMouseEnter={open} onMouseLeave={close}>
          {children}
        </div>
      )}
    </li>
  );
}

/* ─── Mobile full-screen overlay ─── */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [, navigate] = useLocation();

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (href: string) => {
    onClose();
    navigate(href);
  };

  const sections = [
    {
      heading: "Case Studies",
      items: [{ label: "View Portfolio & ROI Reports", href: "/case-studies" }],
    },
    {
      heading: "Insights",
      items: [{ label: "Insights", href: "/resources" }],
    },
    {
      heading: "Company",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Leadership", href: "/leadership" },
        { label: "Who We Work With", href: "/who-we-work-with" },
        { label: "Engineering Powerhouse", href: "/one-man-company" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      heading: "Contact Us",
      items: [{ label: "Get in Touch", href: "/contact" }],
    },
  ];

  return (
    <>
      {/* backdrop */}
      <div
        className="fixed inset-0 z-40 transition-all duration-300"
        style={{
          background: "rgba(15,23,42,0.55)",
          backdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* panel */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm flex flex-col"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "-8px 0 40px rgba(15,23,42,0.12)",
        }}
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <img src={LOGO_URL} alt="INFOMIST" width={28} height={28} className="w-7 h-7 object-contain" />
            <span className="font-black text-[#0F172A] tracking-tight">INFOMIST</span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors duration-150"
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        {/* nav sections */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
          {/* Solutions — 7 direct category links */}
          <div className="flex flex-col gap-0.5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] px-3 pt-3 pb-1.5">
              Solutions
            </p>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => go(`/solutions/${cat.slug}`)}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[#0F172A] hover:bg-sky-50 hover:text-[#0EA5E9] transition-all duration-150"
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Other sections */}
          {sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-0.5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] px-3 pt-3 pb-1.5">
                {section.heading}
              </p>
              {section.items.map((item) => (
                <button
                  key={item.label}
                  onClick={() => go(item.href)}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[#0F172A] hover:bg-sky-50 hover:text-[#0EA5E9] transition-all duration-150"
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-6 py-5 border-t border-slate-100">
          <Link
            href="/talk-to-strategist"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200"
            style={{ background: "#0EA5E9", boxShadow: "0 4px 16px rgba(14,165,233,0.35)" }}
          >
            Talk to a Strategist
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 7h10M7 2l5 5-5 5" />
            </svg>
          </Link>
          <p className="text-center text-xs text-[#94A3B8] mt-3">Infomist · Since 2001</p>
        </div>
      </div>
    </>
  );
}

/* ─── Main NavBar ─── */
export function NavBar() {
  const [location] = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close dropdown on route change
  useEffect(() => { setActiveDropdown(null); setMobileOpen(false); }, [location]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
        <nav
          className="relative w-full max-w-6xl flex items-center justify-between pl-5 pr-2 py-2 rounded-full"
          style={{
            background: scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.90)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(203,213,225,0.6)",
            boxShadow: scrolled
              ? "0 4px 24px 0 rgba(15,23,42,0.1), 0 1px 4px 0 rgba(15,23,42,0.05)"
              : "0 2px 16px 0 rgba(15,23,42,0.06), 0 1px 3px 0 rgba(15,23,42,0.04)",
            transition: "box-shadow 0.25s ease, background 0.25s ease",
          }}
        >
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 select-none" aria-label="INFOMIST home">
            <img src={LOGO_URL} alt="" width={28} height={28} className="w-7 h-7 object-contain" />
            <span className="text-[#0F172A] font-black text-sm tracking-widest uppercase" style={{ letterSpacing: "0.14em" }}>
              INFOMIST
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <ul className="hidden lg:flex items-center gap-0.5">
            <NavItem
              label="Solutions"
              dropdownKey="solutions"
              isActive={location.startsWith("/solutions")}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            >
              <SolutionsDropdown onNav={() => setActiveDropdown(null)} />
            </NavItem>

            <NavItem
              label="Case Studies"
              href="/case-studies"
              isActive={location === "/case-studies"}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />

            <NavItem
              label="Insights"
              href="/resources"
              isActive={location === "/resources"}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />

            <NavItem
              label="Company"
              dropdownKey="company"
              isActive={["/about", "/leadership", "/careers", "/who-we-work-with", "/one-man-company"].some((p) => location === p || location.startsWith(p + "/"))}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            >
              <MegaCompany onNav={() => setActiveDropdown(null)} />
            </NavItem>

            <NavItem
              label="Contact Us"
              href="/contact"
              isActive={location === "/contact"}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
          </ul>

          {/* ── Right side ── */}
          <div className="flex items-center gap-2">
            {/* CTA */}
            <Link
              href="/talk-to-strategist"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-white flex-shrink-0 transition-all duration-200"
              style={{
                background: "#0EA5E9",
                boxShadow: ctaHovered
                  ? "0 4px 20px 0 rgba(132,204,22,0.5), 0 2px 8px 0 rgba(14,165,233,0.3)"
                  : "0 1px 6px 0 rgba(14,165,233,0.3)",
                transform: ctaHovered ? "translateY(-2px)" : "translateY(0)",
              }}
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
            >
              Talk to a Strategist
              <svg
                width="13" height="13" viewBox="0 0 13 13" fill="none"
                stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: ctaHovered ? "translateX(2px)" : "translateX(0)", transition: "transform 0.2s ease" }}
              >
                <path d="M1.5 6.5h10M6.5 1.5l5 5-5 5" />
              </svg>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-150"
              style={{ background: mobileOpen ? "rgba(14,165,233,0.1)" : "rgba(15,23,42,0.05)" }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round">
                <line x1="2" y1="5" x2="16" y2="5" />
                <line x1="2" y1="9" x2="16" y2="9" />
                <line x1="2" y1="13" x2="10" y2="13" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
