import { useState, useEffect } from "react";
import { useSearch, Link } from "wouter";
import { Boxes, ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { PageFaq } from "@/components/PageFaq";
import { useMeta } from "@/components/site/useMeta";
import { PageHero, CTAButton } from "@/components/site/primitives";
import { HeroVisual } from "@/components/hero/HeroVisual";

const SOLUTIONS_DIRECTORY_FAQS = [
  {
    q: "What's the full list of services Infomist offers?",
    a: "Six categories: AI & Machine Learning Engineering, Software & Web Architecture, Salesforce & Enterprise Cloud, Experience Design & Media, Growth Engineering & Marketing, and Dedicated Squads (staff augmentation).",
  },
  {
    q: "Does Infomist do Salesforce implementation and customization?",
    a: "Yes — the Salesforce & Enterprise Cloud category covers implementation, deep customization, and Sales/Marketing/Service Cloud work.",
  },
  {
    q: "Can I hire dedicated developers from Infomist instead of a fixed-scope project?",
    a: "Yes — the Dedicated Squads category offers staff augmentation and offshore outsourcing with dedicated roles including developers, designers, video editors, and digital marketers.",
  },
  {
    q: "Does Infomist offer branding and video production, or only software development?",
    a: "Both — the Experience Design & Media category includes UI/UX, brand identity, print, and video production alongside the engineering categories.",
  },
  {
    q: "What AI and machine learning services does Infomist provide?",
    a: "Predictive modelling, NLP, enterprise chatbots, machine learning & deep learning, and computer vision — all under the AI & Machine Learning Engineering category.",
  },
];

const CATEGORIES = [
  {
    id: "ai-engineering",
    label: "AI & Machine Learning Engineering",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="3.5" />
        <path d="M11 1v3M11 18v3M1 11h3M18 11h3M3.9 3.9l2.2 2.2M15.9 15.9l2.2 2.2M18.1 3.9l-2.2 2.2M6.1 15.9l-2.2 2.2" />
      </svg>
    ),
    groups: [
      {
        title: "Predictive AI & Big Data",
        desc: "Leverage large-scale data to forecast trends and optimize decision-making.",
        services: ["Predictive Modelling", "Big Data Analytics & Data Lakes"],
      },
      {
        title: "NLP & Conversational AI",
        desc: "Intelligent systems that understand, process, and generate human language.",
        services: [
          "Chat GPT Custom Integrations",
          "Natural Language Processing (NLP)",
          "Enterprise AI Chatbot Development",
        ],
      },
      {
        title: "Core AI Development",
        desc: "Advanced computational models for complex automation and recognition tasks.",
        services: ["Machine Learning & Deep Learning", "Computer Vision Systems"],
      },
    ],
  },
  {
    id: "software-architecture",
    label: "Software & Web Architecture",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="18" height="5" rx="1.5" />
        <rect x="2" y="10" width="18" height="5" rx="1.5" />
        <rect x="2" y="17" width="8" height="3" rx="1.25" />
        <rect x="12" y="17" width="8" height="3" rx="1.25" />
      </svg>
    ),
    groups: [
      {
        title: "Full-Stack Web Development",
        desc: "High-performance web systems engineered for speed, usability, and accessibility.",
        services: [
          "Custom Web Development",
          "AJAX-Supported Interactivity",
          "Consistent Corporate Layout & Colors",
          "Task-Oriented Workflow Design",
          "Accessibility Compliance (W3C)",
        ],
      },
      {
        title: "Custom Software & SaaS",
        desc: "Scalable, secure software tailored to specific enterprise operational needs.",
        services: [
          "Client/Server Application Development",
          "Component-Based Architecture",
          "Custom Dashboard Services",
          "Agile Software Development",
          "Ecommerce Marketplaces",
        ],
      },
      {
        title: "Mobile App Engineering",
        desc: "Native and cross-platform mobile solutions for global audiences.",
        services: [
          "iPhone & iPad Application Development",
          "Android Application Development",
          "Windows Mobile Development",
          "Games & Multimedia Applications",
        ],
      },
      {
        title: "Infrastructure & Deployment",
        desc: "Robust server architecture and continuous integration pipelines.",
        services: ["DevOps Implementation & Automation"],
      },
    ],
  },
  {
    id: "enterprise-cloud",
    label: "Salesforce & Enterprise Cloud",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 15A5 5 0 0 1 6 5a5 5 0 0 1 4.5 2.8" />
        <path d="M7 15h9.5a4 4 0 0 0 0-8 4 4 0 0 0-3.8 2.8" />
      </svg>
    ),
    groups: [
      {
        title: "Salesforce Architecture",
        desc: "Strategic implementation and tailoring of the Salesforce ecosystem.",
        services: ["Salesforce Consulting & Implementation", "Deep Salesforce Customization"],
      },
      {
        title: "Cloud App Development",
        desc: "Building dedicated applications that natively integrate with your CRM.",
        services: ["Salesforce App Development (Web & Mobile)"],
      },
      {
        title: "Ecosystem & Integration",
        desc: "Connecting legacy systems and ensuring continuous cloud operations.",
        services: ["Secure Migration & Integration", "Ongoing Support & Maintenance"],
      },
      {
        title: "CRM Automation",
        desc: "Streamlining customer journeys across multiple touchpoints.",
        services: [
          "Salesforce Marketing Cloud",
          "Sales Cloud Optimization",
          "Service Cloud Deployment",
        ],
      },
    ],
  },
  {
    id: "experience-design",
    label: "Experience Design & Media",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    groups: [
      {
        title: "UI/UX & Brand Identity",
        desc: "Data-driven interfaces and cohesive branding that elevate corporate presence.",
        services: ["UI/UX Interface Design", "Brand Identity Kit Design", "Professional Logo Design"],
      },
      {
        title: "Print & Publication Design",
        desc: "High-fidelity physical assets for enterprise marketing and operations.",
        services: [
          "Corporate Stationery",
          "Brochure & Flyers",
          "Magazine & Book/Catalogue Design",
        ],
      },
      {
        title: "Immersive Video Production",
        desc: "End-to-end video editing and post-production for digital campaigns.",
        services: [
          "Story-driven & Short-Form Editing",
          "Visual Effects (VFX) & Enhancements",
          "Color Grading & Correction",
          "Sound Editing & Mixing",
          "Re-Sequencing Clips",
        ],
      },
    ],
  },
  {
    id: "growth-engineering",
    label: "Growth Engineering & Marketing",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2,17 8,10 13,13 20,5" />
        <polyline points="15,5 20,5 20,10" />
      </svg>
    ),
    groups: [
      {
        title: "Omni-Channel Advertising",
        desc: "Scalable paid acquisition across all major global networks.",
        services: [
          "Pay-Per-Click (PPC) Management",
          "Facebook, Google & LinkedIn Ads",
          "Instagram, TikTok & Twitter Ads",
        ],
      },
      {
        title: "Organic Growth Systems",
        desc: "Capturing high-intent traffic through search algorithms and content.",
        services: ["Search Engine Optimization (SEO)", "Website Content Marketing"],
      },
      {
        title: "Social & Media Strategy",
        desc: "Building brand awareness and community engagement.",
        services: ["Social Media Marketing", "Influencer Marketing", "Video Marketing Distribution"],
      },
      {
        title: "Data & Tracking",
        desc: "Monitoring conversion metrics to optimize ad spend and ROI.",
        services: [
          "Comprehensive Digital Marketing Services",
          "Advanced Analytics and Data Analysis",
        ],
      },
    ],
  },
  {
    id: "managed-teams",
    label: "Dedicated Squads (Staffing)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3" />
        <circle cx="16" cy="8" r="2.2" />
        <path d="M1 20c0-4 3.6-7 8-7s8 3 8 7" />
        <path d="M16 13c2.5.5 5 2.2 5 5" />
      </svg>
    ),
    groups: [
      {
        title: "Staff Augmentation",
        desc: "Seamlessly expanding your internal capacity with specialized talent.",
        services: ["Staff Augmentation (Dedicated Teams)", "IT Offshore Outsourcing"],
      },
      {
        title: "Engineering Talent",
        desc: "Vetted developers ready to integrate into your agile sprints.",
        services: ["Dedicated Web Developers", "Dedicated Web Designers"],
      },
      {
        title: "Creative & Growth Talent",
        desc: "Experts to drive your marketing and visual production pipelines.",
        services: [
          "Dedicated Graphic Designers",
          "Dedicated Video Editors",
          "Dedicated Digital Marketers",
        ],
      },
    ],
  },
];

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0 mt-0.5"
    >
      <circle cx="7" cy="7" r="7" fill="#84CC16" fillOpacity="0.15" />
      <path
        d="M4 7l2 2 4-4"
        stroke="#84CC16"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceCard({
  title,
  desc,
  services,
}: {
  title: string;
  desc: string;
  services: string[];
}) {
  return (
    <div
      className="group relative rounded-3xl p-[1.5px] h-full transition-transform duration-300 hover:-translate-y-1"
      style={{ background: "linear-gradient(150deg, rgba(14,165,233,0.28), rgba(14,165,233,0.05))" }}
    >
      <div className="rounded-[22px] bg-white h-full p-6 md:p-7">
        <h3 className="text-lg font-bold text-[#0F172A] mb-2">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6 pb-4 border-b border-slate-100">{desc}</p>
        <ul className="flex flex-col">
          {services.map((svc) => (
            <li key={svc} className="text-sm text-slate-700 font-medium flex items-start gap-3 mb-3 last:mb-0">
              <CheckIcon />
              {svc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SolutionsDirectoryPage() {
  useMeta(
    "Solutions Directory | Infomist — Every Service We Offer",
    "Browse Infomist's complete service directory — AI & machine learning, software development, Salesforce, design & media, SEO, and digital marketing. Filter by category."
  );
  const search = useSearch();
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const tab = params.get("tab");
    if (tab) {
      const match = CATEGORIES.find((c) => c.id === tab);
      if (match) setActiveId(match.id);
    }
  }, [search]);

  const active = CATEGORIES.find((c) => c.id === activeId)!;

  return (
    <div className="w-full min-h-screen bg-white pt-20 overflow-x-hidden">
      <PageHero
        eyebrow="Solutions Directory"
        eyebrowIcon={Boxes}
        title="Enterprise solutions"
        gradientWord="& architecture."
        sub="Comprehensive engineering, AI, design, and growth infrastructure — 25 years in the making."
        visual={<HeroVisual variant="network" />}
      />

      <div className="w-full" style={{ background: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 flex-shrink-0">
            <nav className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {CATEGORIES.map((cat) => {
                const isActive = cat.id === activeId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveId(cat.id)}
                    className={`w-full text-left px-5 py-4 flex items-center gap-3 transition-all duration-150 border-b border-slate-50 last:border-b-0 ${
                      isActive
                        ? "border-l-4 border-l-[#0EA5E9] bg-sky-50/60 text-[#0EA5E9] font-bold pl-4"
                        : "border-l-4 border-l-transparent text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] pl-5"
                    }`}
                  >
                    <span className="flex-shrink-0">{cat.icon}</span>
                    <span className="text-sm leading-snug">{cat.label}</span>
                  </button>
                );
              })}
            </nav>

            <div
              className="mt-6 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden"
              style={{ background: "linear-gradient(150deg, #0B1220 0%, #0F172A 45%, #101B2E 100%)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#84CC16]">Ready to build?</span>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tell us your challenge. We'll architect the solution.
              </p>
              <Link
                href="/talk-to-strategist"
                className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(120deg,#0EA5E9,#0284C7)" }}
              >
                Talk to a Strategist
                <ArrowRight size={15} strokeWidth={2.6} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3.5 mb-8">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)" }}
              >
                {active.icon}
              </div>
              <div>
                <h2
                  className="text-2xl md:text-[1.7rem] font-black text-[#0F172A]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {active.label}
                </h2>
                <p className="text-sm text-[#64748B] mt-0.5">
                  {active.groups.length} service area{active.groups.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" key={active.id}>
              {active.groups.map((group) => (
                <RevealItem key={group.title}>
                  <ServiceCard
                    title={group.title}
                    desc={group.desc}
                    services={group.services}
                  />
                </RevealItem>
              ))}
            </RevealGroup>

            <div className="mt-10 rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
              <div>
                <p className="text-[#0F172A] font-black text-lg" style={{ letterSpacing: "-0.02em" }}>Don't see what you need?</p>
                <p className="text-[#64748B] text-sm mt-0.5">
                  We build bespoke — describe your requirement and we'll scope it.
                </p>
              </div>
              <CTAButton href="/talk-to-strategist" variant="outline" className="!px-6 !py-3 !text-sm">Talk to a Strategist</CTAButton>
            </div>
          </div>

        </div>
        </div>
      </div>

      <PageFaq
        faqs={SOLUTIONS_DIRECTORY_FAQS}
        idPrefix="solutions-directory-page"
        heading="Frequently Asked Questions"
        subheading="Common questions about Infomist's full service catalogue."
      />
    </div>
  );
}
