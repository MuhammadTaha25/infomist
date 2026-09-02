
import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

const LOGO_URL = `${import.meta.env.BASE_URL}infomist-software-development-company-logo.png`;

const FOOTER_COLUMNS = [
  {
    title: "Solutions",
    links: [
      { label: "AI & Machine Learning", href: "/solutions-directory?tab=ai-engineering" },
      { label: "Software & Web Architecture", href: "/solutions-directory?tab=software-architecture" },
      { label: "Salesforce & Enterprise Cloud", href: "/solutions-directory?tab=enterprise-cloud" },
      { label: "Experience Design & Media", href: "/solutions-directory?tab=experience-design" },
      { label: "Growth Engineering", href: "/solutions-directory?tab=growth-engineering" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Who We Work With", href: "/who-we-work-with" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Insights", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export function Footer() {
  return (
    <div id="contact" className="w-full flex flex-col">
      <footer className="w-full px-6 pt-16 pb-8" style={{ background: "#0F172A" }}>
        <div className="max-w-6xl mx-auto flex flex-col gap-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
            <div className="flex flex-col gap-4 lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <img src={LOGO_URL} alt="INFOMIST" width={32} height={32} className="w-8 h-8 object-contain opacity-90" loading="lazy" />
                <span className="text-white font-bold text-base tracking-tight">INFOMIST</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                25 years of engineering serious software for serious businesses — full-stack architecture, AI automation, and growth systems.
              </p>
            </div>
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3.5">
                <p className="text-xs font-bold tracking-[0.16em] uppercase text-slate-300">{col.title}</p>
                <nav aria-label={`${col.title} links`} className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-[#0EA5E9] transition-colors duration-150 w-fit"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}

            {/* Get In Touch */}
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold tracking-[0.16em] uppercase text-slate-300">Get In Touch</p>

              <div className="flex flex-col gap-3">
                <a
                  href="tel:+13312963732"
                  className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-[#0EA5E9] transition-colors duration-150 w-fit"
                >
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(14,165,233,0.12)" }}>
                    <Phone size={13} color="#0EA5E9" />
                  </span>
                  +1 (331) 296-3732
                </a>
                <a
                  href="mailto:info@infomist.com"
                  className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-[#0EA5E9] transition-colors duration-150 w-fit break-all"
                >
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(14,165,233,0.12)" }}>
                    <Mail size={13} color="#0EA5E9" />
                  </span>
                  info@infomist.com
                </a>
              </div>

              <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.08)" }} />

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-sm text-slate-400">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(132,204,22,0.12)" }}>
                    <MapPin size={13} color="#84CC16" />
                  </span>
                  <span className="leading-relaxed">
                    <span className="block text-[10px] font-bold tracking-[0.16em] uppercase text-slate-500">
                      Headquarters <span aria-hidden="true">🇵🇰</span>
                    </span>
                    St#12, DHA Phase 1, Islamabad, Pakistan
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(132,204,22,0.12)" }}>
                    <MapPin size={13} color="#84CC16" />
                  </span>
                  <span className="leading-relaxed">
                    <span className="block text-[10px] font-bold tracking-[0.16em] uppercase text-slate-500">
                      Ireland <span aria-hidden="true">🇮🇪</span>
                    </span>
                    1st Floor, 17B Main Street, Blanchardstown, Dublin 15, D15 EF2H, Ireland
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(14,165,233,0.2) 30%, rgba(132,204,22,0.2) 70%, transparent)" }} />
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
            <span>© 2026 Infomist. All rights reserved.</span>
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.label} className="flex items-center gap-2">
                <span className="hidden sm:inline text-slate-700">|</span>
                <a href={link.href} className="hover:text-[#0EA5E9] transition-colors duration-150">
                  {link.label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
