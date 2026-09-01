import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PageFaq } from "@/components/PageFaq";
import { CATEGORIES } from "@/data/solutionsData";

const CONTACT_FAQS = [
  {
    q: "How do I contact Infomist for a project quote?",
    a: "Fill out the contact form with your service category, sub-category, and project details, or reach the Islamabad or Dublin office directly.",
  },
  {
    q: "Does Infomist have an office in Europe, or only Pakistan?",
    a: "Both — Infomist has an Islamabad, Pakistan office (St#12, DHA Phase 1) and a Dublin, Ireland office (7 Lower Hatch Street, Dublin 2).",
  },
  {
    q: "How soon will Infomist respond after I submit the contact form?",
    a: "The team typically reviews and responds to project enquiries within 1–2 business days.",
  },
  {
    q: "What information should I include when contacting Infomist about a project?",
    a: "Your service category, sub-category, and as much detail as possible about goals, timeline, and budget — so the right specialist on the team can respond.",
  },
  {
    q: "Can I schedule a call instead of filling out the contact form?",
    a: "Yes — use the \"Talk to a Strategist\" page instead for a guided 4-step scheduling flow where you pick your topic, preferred channel, contact details, and a time slot.",
  },
];

/* ─── SEO helper (matches pattern used on SubcategoryPage) ─── */
function useMeta(title: string, description: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;

    let metaEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = metaEl?.content ?? "";
    if (!metaEl) {
      metaEl = document.createElement("meta");
      metaEl.name = "description";
      document.head.appendChild(metaEl);
    }
    metaEl.content = description;

    return () => {
      document.title = prev;
      if (metaEl) metaEl.content = prevDesc;
    };
  }, [title, description]);
}

/* ─── Category → sub-category data — derived directly from the Solutions Directory's
   own data source (solutionsData.ts) so the Contact form can never drift out of sync
   with the real main categories and sub-services shown on /solutions and
   /solutions-directory. ─── */
const SUBCATEGORIES: Record<string, string[]> = Object.fromEntries(
  CATEGORIES.map((cat) => [cat.name, [...cat.subs.map((sub) => sub.name), "Custom"]])
);

const MAIN_CATEGORIES = [...Object.keys(SUBCATEGORIES), "Other/Custom"];

const OTHER_CUSTOM = "Other/Custom";
const CUSTOM_OPTION = "Custom";

/* ─── Shared field chrome ─── */
function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="text-xs font-bold tracking-[0.08em] uppercase text-[#64748B]">
      {children}
      {required && <span className="text-[#0EA5E9]"> *</span>}
    </label>
  );
}

const fieldClass =
  "w-full rounded-xl px-4 py-3 text-sm text-[#0F172A] bg-white transition-all duration-150 outline-none placeholder:text-slate-400 border border-slate-200 focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/10";

/* ─── Contact form ───────────────────────────────────────────────────── */
function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [customMainText, setCustomMainText] = useState("");
  const [customSubText, setCustomSubText] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isOtherMain = mainCategory === OTHER_CUSTOM;
  const subOptions = !isOtherMain && mainCategory ? SUBCATEGORIES[mainCategory] : [];
  const showSubCustomInput = subCategory === CUSTOM_OPTION;

  const handleMainChange = (value: string) => {
    setMainCategory(value);
    setSubCategory("");
    setCustomMainText("");
    setCustomSubText("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resolvedMain = isOtherMain ? (customMainText || "Other/Custom") : mainCategory;
    const resolvedSub = isOtherMain
      ? customMainText
      : showSubCustomInput
        ? customSubText
        : subCategory;

    setSubmitting(true);
    try {
      await fetch("/api/contact-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "deploy-project",
          Name: name,
          Email: email,
          Phone: phone,
          "Main Category": resolvedMain,
          "Sub Category": resolvedSub,
          Category: [resolvedMain, resolvedSub].filter(Boolean).join(" › "),
          "Project Details": message,
          "Submitted At": new Date().toISOString(),
          "Page URL": typeof window !== "undefined" ? window.location.href : "",
        }),
      });
    } catch {
      // Fire-and-forget — always show success to the user
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div
        className="h-full flex flex-col items-center justify-center text-center gap-4 rounded-3xl p-12"
        style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(132,204,22,0.12)" }}
        >
          <CheckCircle2 size={28} color="#65A30D" />
        </div>
        <h3 className="text-2xl font-black text-[#0F172A]">Message Sent.</h3>
        <p className="text-[#475569] max-w-sm leading-relaxed">
          Thanks for reaching out — a member of the Infomist team will get back to you within one
          business day.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 text-sm font-semibold text-[#0EA5E9] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-3xl p-8 md:p-10"
      style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 24px 0 rgba(15,23,42,0.05)" }}
    >
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <FieldLabel required>Name</FieldLabel>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <FieldLabel required>Email</FieldLabel>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={fieldClass}
          />
        </div>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <FieldLabel>Phone</FieldLabel>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 (555) 000-0000"
          className={fieldClass}
        />
      </div>

      {/* Main Category + Sub Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <FieldLabel required>Main Category</FieldLabel>
          <select
            required
            value={mainCategory}
            onChange={(e) => handleMainChange(e.target.value)}
            className={fieldClass + " appearance-none cursor-pointer"}
          >
            <option value="" disabled>
              Select a category
            </option>
            {MAIN_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel required>Sub-Category</FieldLabel>
          {isOtherMain ? (
            <input
              required
              type="text"
              value={customMainText}
              onChange={(e) => setCustomMainText(e.target.value)}
              placeholder="Tell us what you need"
              className={fieldClass}
            />
          ) : (
            <select
              required
              disabled={!mainCategory}
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className={fieldClass + " appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"}
            >
              <option value="" disabled>
                {mainCategory ? "Select a sub-category" : "Choose a main category first"}
              </option>
              {subOptions.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Reveal a free-text field when "Custom" is chosen from a sub-category dropdown */}
      {!isOtherMain && showSubCustomInput && (
        <div className="flex flex-col gap-2 -mt-1">
          <FieldLabel required>Specify Your Sub-Category</FieldLabel>
          <input
            required
            type="text"
            value={customSubText}
            onChange={(e) => setCustomSubText(e.target.value)}
            placeholder="Describe exactly what you need"
            className={fieldClass}
          />
        </div>
      )}

      {/* Message */}
      <div className="flex flex-col gap-2">
        <FieldLabel required>Project Details</FieldLabel>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your project, timeline, and goals..."
          className={fieldClass + " resize-none"}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 mt-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 self-start disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: "#0EA5E9", boxShadow: "0 4px 16px rgba(14,165,233,0.3)" }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 22px rgba(132,204,22,0.4)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(14,165,233,0.3)")}
      >
        {submitting ? "Sending…" : "Send Message"}
        <Send size={15} />
      </button>
    </form>
  );
}

/* ─── Office cards ────────────────────────────────────────────────────── */
function OfficeCard({
  flag,
  label,
  heading,
  address,
  note,
  phone,
  email,
}: {
  flag: string;
  label: string;
  heading: string;
  address: string;
  note?: string;
  phone?: string;
  email: string;
}) {
  return (
    <div
      className="flex flex-col gap-5 rounded-3xl p-7"
      style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-xl leading-none">{flag}</span>
        <div>
          <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#0EA5E9]">{label}</p>
          <h3 className="text-lg font-black text-[#0F172A] leading-tight">{heading}</h3>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white" style={{ border: "1px solid #E2E8F0" }}>
          <MapPin size={15} color="#0EA5E9" />
        </div>
        <div>
          <p className="text-sm font-medium text-[#0F172A] leading-relaxed">{address}</p>
          {note && <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">{note}</p>}
        </div>
      </div>

      <div className="w-full h-px bg-slate-200" />

      <div className="flex flex-col gap-2.5">
        {phone && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white" style={{ border: "1px solid #E2E8F0" }}>
              <Phone size={15} color="#84CC16" />
            </div>
            <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="text-base font-bold text-[#0F172A] hover:text-[#0EA5E9] transition-colors duration-150">
              {phone}
            </a>
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white" style={{ border: "1px solid #E2E8F0" }}>
            <Mail size={14} color="#94A3B8" />
          </div>
          <a
            href={`mailto:${email}`}
            className={
              phone
                ? "text-xs font-medium text-[#94A3B8] hover:text-[#0EA5E9] transition-colors duration-150"
                : "text-sm font-semibold text-[#0F172A] hover:text-[#0EA5E9] transition-colors duration-150"
            }
          >
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────── */
export function ContactPage() {
  useMeta(
    "Contact Us | Infomist — Software, AI & Growth Engineering",
    "Get in touch with Infomist. Tell us about your website, mobile app, AI automation, or digital marketing project and our team will respond within one business day."
  );

  return (
    <div className="w-full min-h-screen bg-white pt-20">
      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col gap-16">
        <Reveal className="flex flex-col gap-4 max-w-2xl">
          <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#0EA5E9]">Contact Us</span>
          <h1 className="text-5xl md:text-6xl font-black text-[#0F172A] leading-tight" style={{ letterSpacing: "-0.03em" }}>
            How Can We Help You?
          </h1>
          <p className="text-[#475569] text-lg leading-relaxed">
            Tell us about your project and the right specialist on our team will get back to you —
            usually within one business day.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <Reveal className="lg:col-span-3">
            <ContactForm />
          </Reveal>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <Reveal delay={80}>
              <OfficeCard
                flag="🇵🇰"
                label="Local Office"
                heading="Pakistan"
                address="St#12, DHA Phase 1, Islamabad"
                note="Serving clients across the twin cities region (Islamabad & Rawalpindi)."
                phone="+92 322 5098796"
                email="fahadm@infomist.com"
              />
            </Reveal>
            <Reveal delay={140}>
              <OfficeCard
                flag="🇮🇪"
                label="Global Office"
                heading="Ireland"
                address="7 Lower Hatch Street, Dublin 2, Ireland"
                email="info@infomist.com"
              />
            </Reveal>
          </div>
        </div>
      </div>

      <PageFaq
        faqs={CONTACT_FAQS}
        idPrefix="contact-page"
        heading="Frequently Asked Questions"
        subheading="Common questions about reaching Infomist and starting a project."
      />
    </div>
  );
}
