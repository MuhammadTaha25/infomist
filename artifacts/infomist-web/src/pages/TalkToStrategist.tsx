import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageFaq } from "@/components/PageFaq";

const STRATEGIST_FAQS = [
  {
    q: "What happens after I book a call with an Infomist strategist?",
    a: "You'll have a video, chat, or phone conversation to discuss your topic (e.g., website, AI, SEO), timeline, and next steps — no obligation, no generic sales pitch.",
  },
  {
    q: "Is the strategy call free?",
    a: "Yes, the initial strategist call is free and is meant to scope your project before any proposal is made.",
  },
  {
    q: "What topics can I discuss in a strategist call?",
    a: "Website development, mobile apps, AI & automation, digital marketing, SEO, branding, video, or \"not sure yet\" if you just want general guidance.",
  },
  {
    q: "Can I choose how the call happens — video, phone, or chat?",
    a: "Yes — step 2 of the booking flow lets you pick video call (Zoom/Meet), text/chat, or phone call.",
  },
  {
    q: "How far in advance can I schedule a strategist call?",
    a: "The scheduler in step 4 shows available dates and time slots — pick whatever's most convenient from the open slots shown.",
  },
];

import {
  Send,
  Check,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Globe,
  Smartphone,
  Bot,
  Megaphone,
  Search,
  Palette,
  Video as VideoIcon,
  HelpCircle,
  MessageSquare,
  Phone as PhoneIcon,
  CalendarDays,
  ChevronDown,
  Clock,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useMeta } from "@/components/site/useMeta";
import { PageHero } from "@/components/site/primitives";
import { HeroVisual } from "@/components/hero/HeroVisual";

/* ─── Step data ─── */
const TOPICS = [
  { label: "Website Development", icon: Globe },
  { label: "Mobile App", icon: Smartphone },
  { label: "AI & Automation", icon: Bot },
  { label: "Digital Marketing", icon: Megaphone },
  { label: "SEO", icon: Search },
  { label: "Branding", icon: Palette },
  { label: "Video", icon: VideoIcon },
  { label: "Not Sure Yet", icon: HelpCircle },
];

const CHANNELS = [
  { label: "Video Call", icon: VideoIcon, desc: "Face-to-face over Zoom or Meet" },
  { label: "Text/Chat", icon: MessageSquare, desc: "Message-based, at your pace" },
  { label: "Phone Call", icon: PhoneIcon, desc: "A quick voice conversation" },
];

const TIMES = ["Morning", "Afternoon", "Evening"];

/** 5 fixed business-hour slots + "Custom" as the 6th option */
const TIME_SLOTS = ["9 AM", "11 AM", "1 PM", "3 PM", "5 PM"];

const STEP_LABELS = ["Topic", "Channel", "Details", "Schedule"];
const TOTAL_STEPS = STEP_LABELS.length;

/* ─── World countries (alphabetical) ─── */
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
  "Congo (DRC)", "Congo (Republic)", "Costa Rica", "Croatia", "Cuba", "Cyprus",
  "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
  "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
  "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
  "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait",
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
  "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
  "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
  "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay",
  "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
  "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
  "Samoa", "San Marino", "São Tomé and Príncipe", "Saudi Arabia", "Senegal", "Serbia",
  "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
  "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
  "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
  "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
];

/* ─── Field primitives ─── */
function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="text-xs font-bold tracking-[0.08em] uppercase text-[#64748B]">
      {children}
      {required && <span className="text-[#0EA5E9]"> *</span>}
    </label>
  );
}

const fieldClass =
  "w-full h-12 rounded-xl px-4 text-sm text-[#0F172A] bg-white transition-all duration-150 outline-none placeholder:text-slate-400 border border-slate-200 hover:border-slate-300 focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/12 cursor-text";

/* ─── Searchable country dropdown ─── */
function CountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = search.trim()
    ? COUNTRIES.filter((c) => c.toLowerCase().includes(search.toLowerCase()))
    : COUNTRIES;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Focus search when opened
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  const select = (country: string) => {
    onChange(country);
    setOpen(false);
    setSearch("");
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={
          fieldClass +
          " flex items-center justify-between cursor-pointer text-left " +
          (open ? "border-[#0EA5E9] ring-4 ring-[#0EA5E9]/12" : "")
        }
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={value ? "text-[#0F172A]" : "text-slate-400"}>
          {value || "Select your country"}
        </span>
        <ChevronDown
          size={16}
          color="#94A3B8"
          className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 top-[calc(100%+6px)] left-0 right-0 bg-white rounded-xl overflow-hidden"
            style={{
              border: "1px solid #E2E8F0",
              boxShadow: "0 16px 40px -8px rgba(15,23,42,0.18), 0 4px 12px -4px rgba(15,23,42,0.06)",
            }}
            role="listbox"
          >
            {/* Search input */}
            <div className="p-2 border-b border-slate-100">
              <div className="relative">
                <Search
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                  color="#94A3B8"
                />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search countries…"
                  className="w-full h-9 rounded-lg pl-8 pr-3 text-sm text-[#0F172A] bg-slate-50 border border-slate-100 outline-none focus:border-[#0EA5E9] focus:bg-white transition-all duration-150 placeholder:text-slate-400 cursor-text"
                />
              </div>
            </div>

            {/* Scrollable list */}
            <ul className="max-h-52 overflow-y-auto overscroll-contain py-1">
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-sm text-slate-400 text-center">No results</li>
              ) : (
                filtered.map((country) => {
                  const isSelected = country === value;
                  return (
                    <li key={country}>
                      <button
                        type="button"
                        onClick={() => select(country)}
                        role="option"
                        aria-selected={isSelected}
                        className="w-full text-left px-4 py-2.5 text-sm transition-colors duration-100 flex items-center justify-between gap-2 cursor-pointer"
                        style={{
                          background: isSelected ? "rgba(14,165,233,0.06)" : "transparent",
                          color: isSelected ? "#0EA5E9" : "#0F172A",
                          fontWeight: isSelected ? 600 : 400,
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = "#F8FAFC";
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        }}
                      >
                        {country}
                        {isSelected && <Check size={13} strokeWidth={2.5} />}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Selection card (used in steps 1 & 2) ─── */
function SelectCard({
  label,
  desc,
  icon: Icon,
  selected,
  onClick,
}: {
  label: string;
  desc?: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl px-4 py-6 text-center transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
      style={{
        border: selected ? "1.5px solid #0EA5E9" : "1px solid #E2E8F0",
        background: selected
          ? "linear-gradient(180deg, rgba(14,165,233,0.08) 0%, rgba(14,165,233,0.03) 100%)"
          : "#FFFFFF",
        boxShadow: selected
          ? "0 8px 24px 0 rgba(14,165,233,0.18)"
          : "0 1px 2px 0 rgba(15,23,42,0.04)",
      }}
    >
      {selected && (
        <span
          className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: "#0EA5E9" }}
        >
          <Check size={12} color="#FFFFFF" strokeWidth={3} />
        </span>
      )}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-105"
        style={{ background: selected ? "#0EA5E9" : "rgba(14,165,233,0.08)" }}
      >
        <Icon size={19} color={selected ? "#FFFFFF" : "#0EA5E9"} strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-sm font-bold text-[#0F172A] leading-snug">{label}</p>
        {desc && <p className="text-xs text-[#94A3B8] mt-1 leading-snug">{desc}</p>}
      </div>
    </button>
  );
}

/* ─── Step progress indicator ─── */
function StepProgress({ step }: { step: number }) {
  return (
    <div className="flex items-center mb-9 px-1">
      {STEP_LABELS.map((label, i) => {
        const idx = i + 1;
        const isDone = idx < step;
        const isCurrent = idx === step;
        return (
          <div key={label} className={`flex items-center ${idx < TOTAL_STEPS ? "flex-1" : ""}`}>
            <div className="flex flex-col items-center gap-2">
              <div
                className="relative flex items-center justify-center rounded-full transition-all duration-300"
                style={{
                  width: isCurrent ? 34 : 28,
                  height: isCurrent ? 34 : 28,
                  background: isDone || isCurrent ? "#0EA5E9" : "#F1F5F9",
                  border: isCurrent ? "3px solid rgba(14,165,233,0.22)" : "none",
                  boxShadow: isCurrent ? "0 4px 14px 0 rgba(14,165,233,0.35)" : "none",
                }}
              >
                {isDone ? (
                  <Check size={14} color="#FFFFFF" strokeWidth={3} />
                ) : (
                  <span className="text-xs font-bold" style={{ color: isCurrent ? "#FFFFFF" : "#94A3B8" }}>
                    {idx}
                  </span>
                )}
              </div>
              <span
                className="hidden sm:block text-[10px] font-bold tracking-[0.06em] uppercase whitespace-nowrap"
                style={{ color: isCurrent ? "#0EA5E9" : isDone ? "#475569" : "#CBD5E1" }}
              >
                {label}
              </span>
            </div>
            {idx < TOTAL_STEPS && (
              <div className="flex-1 h-[2px] mx-2 sm:mx-3 rounded-full overflow-hidden bg-slate-100 -mt-5 sm:-mt-0">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: isDone ? "100%" : "0%",
                    background: "linear-gradient(90deg, #0EA5E9 0%, #84CC16 100%)",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Back button ─── */
function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-150 hover:bg-slate-100 hover:-translate-x-0.5 cursor-pointer"
      style={{ border: "1px solid #E2E8F0" }}
      aria-label="Go back"
    >
      <ArrowLeft size={15} color="#475569" />
    </button>
  );
}

/* ─── Animated step wrapper ─── */
const stepMotion = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
  transition: { duration: 0.25, ease: "easeOut" as const },
};

/* ─── Multi-step form ──────────────────────────────────────────────────── */
function StrategistForm() {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [channel, setChannel] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [country, setCountry] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [customHour, setCustomHour] = useState("");
  const [customAmPm, setCustomAmPm] = useState<"AM" | "PM">("AM");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [step4Errors, setStep4Errors] = useState<{ country?: string; timeSlot?: string }>({});
  const customHourRef = useRef<HTMLInputElement>(null);

  const isCustomSlot = timeSlot === "Custom";

  // Auto-focus the hour input as soon as Custom is selected
  useEffect(() => {
    if (isCustomSlot) {
      setTimeout(() => customHourRef.current?.focus(), 50);
    }
  }, [isCustomSlot]);

  const goBack = () => setStep((s) => Math.max(1, s - 1));
  const selectTopic = (label: string) => { setTopic(label); setStep(2); };
  const selectChannel = (label: string) => { setChannel(label); setStep(3); };
  const handleDetailsNext = (e: React.FormEvent) => { e.preventDefault(); setStep(4); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { country?: string; timeSlot?: string } = {};
    if (!country) errs.country = "Please select your country.";
    if (!timeSlot) errs.timeSlot = "Please select a time slot.";
    if (isCustomSlot && !customHour.trim()) errs.timeSlot = "Please enter your preferred hour.";
    if (Object.keys(errs).length > 0) {
      setStep4Errors(errs);
      if (errs.country) {
        document.getElementById("country-field")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    setStep4Errors({});
    setSubmitting(true);
    try {
      await fetch("/api/booking-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Category: topic,
          "Preferred Channel": channel,
          Phone: phone,
          "Time To Reach": bestTime,
          "Appointment Date": preferredDate,
          Time: isCustomSlot ? (customHour ? `${customHour} ${customAmPm}` : "") : timeSlot,
          Country: country,
          "Anything Specific": message,
          "Submitted At": new Date().toISOString(),
        }),
      });
    } catch {
      // Fire-and-forget — always show success to the user
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const resolvedTimeSlot = isCustomSlot
    ? (customHour ? `${customHour} ${customAmPm}` : "custom time")
    : timeSlot;

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
    setTopic(""); setChannel(""); setName(""); setEmail("");
    setPhone(""); setBestTime(""); setPreferredDate("");
    setCountry(""); setTimeSlot(""); setCustomHour(""); setCustomAmPm("AM"); setMessage(""); setStep4Errors({});
  };

  if (submitted) {
    return (
      <div
        className="rounded-3xl p-10 md:p-16 bg-white flex flex-col items-center justify-center text-center gap-5"
        style={{ border: "1px solid #E2E8F0", boxShadow: "0 12px 40px 0 rgba(15,23,42,0.08)", minHeight: 320 }}
      >
        {/* Blue checkmark */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "rgba(14,165,233,0.10)", border: "2px solid rgba(14,165,233,0.25)" }}
        >
          <CheckCircle2 size={40} color="#0EA5E9" strokeWidth={2} />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold text-[#0F172A]">Your response has been sent to the team.</p>
          <p className="text-[#64748B] text-base">Confirmation Email Will Soon Be Sent.</p>
        </div>

        <button
          onClick={resetForm}
          className="mt-1 text-sm font-semibold text-[#0EA5E9] hover:underline cursor-pointer"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl p-6 sm:p-8 md:p-10 bg-white overflow-hidden"
      style={{ border: "1px solid #E2E8F0", boxShadow: "0 12px 40px 0 rgba(15,23,42,0.08)" }}
    >
      <StepProgress step={step} />

      <AnimatePresence mode="wait">
        {/* Step 1 — Topic */}
        {step === 1 && (
          <motion.div key="step1" {...stepMotion} className="flex flex-col gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-[#0F172A]">What do you need help with?</h3>
              <p className="text-sm text-[#94A3B8] mt-1">Pick the area closest to what's on your mind.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TOPICS.map((t) => (
                <SelectCard key={t.label} label={t.label} icon={t.icon} selected={topic === t.label} onClick={() => selectTopic(t.label)} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2 — Channel */}
        {step === 2 && (
          <motion.div key="step2" {...stepMotion} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <BackButton onClick={goBack} />
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[#0F172A]">How would you like to talk?</h3>
                <p className="text-sm text-[#94A3B8] mt-1">Choose whatever's most convenient for you.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CHANNELS.map((c) => (
                <SelectCard key={c.label} label={c.label} desc={c.desc} icon={c.icon} selected={channel === c.label} onClick={() => selectChannel(c.label)} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3 — Details */}
        {step === 3 && (
          <motion.form key="step3" {...stepMotion} onSubmit={handleDetailsNext} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <BackButton onClick={goBack} />
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[#0F172A]">Your contact details</h3>
                <p className="text-sm text-[#94A3B8] mt-1">So we know who to call and how.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <FieldLabel required>Name</FieldLabel>
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={fieldClass} />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel required>Email</FieldLabel>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={fieldClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <FieldLabel required>Phone</FieldLabel>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    // Allow digits, spaces, +, -, (, ) only
                    const v = e.target.value.replace(/[^\d\s+\-()]/g, "");
                    setPhone(v);
                  }}
                  onKeyDown={(e) => {
                    // Block letters and most special chars at keydown level
                    if (e.key.length === 1 && /[^0-9\s+\-()]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="+1 (555) 000-0000"
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel required>Best time to reach you</FieldLabel>
                <select required value={bestTime} onChange={(e) => setBestTime(e.target.value)} className={fieldClass + " cursor-pointer"}>
                  <option value="">Select a time</option>
                  {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 mt-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 self-start hover:-translate-y-0.5 cursor-pointer"
              style={{ background: "#0EA5E9", boxShadow: "0 4px 16px rgba(14,165,233,0.3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(132,204,22,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(14,165,233,0.3)")}
            >
              Next
              <ArrowRight size={15} />
            </button>
          </motion.form>
        )}

        {/* Step 4 — Schedule */}
        {step === 4 && (
          <motion.form key="step4" {...stepMotion} onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <BackButton onClick={goBack} />
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[#0F172A]">When works best?</h3>
                <p className="text-sm text-[#94A3B8] mt-1">Pick a date and slot — we'll do our best to match it.</p>
              </div>
            </div>

            {/* Left col: Date + Country (stacked, same width) | Right col: Time Slots 3×3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">

              {/* Left — Preferred Date, then Country directly below (same column = same width) */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <FieldLabel required>Preferred Date</FieldLabel>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={fieldClass + " pr-10 cursor-pointer"}
                    />
                    <CalendarDays size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" color="#94A3B8" />
                  </div>
                </div>

                <div id="country-field" className="flex flex-col gap-2">
                  <FieldLabel required>Select Your Country</FieldLabel>
                  <CountrySelect
                    value={country}
                    onChange={(v) => {
                      setCountry(v);
                      if (step4Errors.country) setStep4Errors((e) => ({ ...e, country: undefined }));
                    }}
                  />
                  {step4Errors.country ? (
                    <p className="text-xs font-semibold text-red-500 mt-0.5">{step4Errors.country}</p>
                  ) : (
                    <p className="text-xs text-[#94A3B8] leading-snug mt-0.5">
                      We'll use this to match your local timezone for the call.
                    </p>
                  )}
                </div>
              </div>

              {/* Right — Preferred Time Slot in a 3×3 grid (8 fixed + Custom = 9) */}
              <div className="flex flex-col gap-3">
                <FieldLabel required>Preferred Time Slot</FieldLabel>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const selected = timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setTimeSlot(slot);
                          setCustomHour("");
                          setCustomAmPm("AM");
                          if (step4Errors.timeSlot) setStep4Errors((e) => ({ ...e, timeSlot: undefined }));
                        }}
                        className="h-10 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer"
                        style={{
                          border: selected ? "1.5px solid #0EA5E9" : "1px solid #E2E8F0",
                          background: selected ? "#0EA5E9" : "#FFFFFF",
                          color: selected ? "#FFFFFF" : "#475569",
                          boxShadow: selected ? "0 4px 14px 0 rgba(14,165,233,0.3)" : "none",
                        }}
                      >
                        {slot}
                      </button>
                    );
                  })}

                  {/* Custom — 9th chip */}
                  <button
                    type="button"
                    onClick={() => {
                      setTimeSlot("Custom");
                      if (step4Errors.timeSlot) setStep4Errors((e) => ({ ...e, timeSlot: undefined }));
                    }}
                    className="h-10 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer inline-flex items-center justify-center gap-1.5"
                    style={{
                      border: isCustomSlot ? "1.5px solid #0EA5E9" : "1px solid #E2E8F0",
                      background: isCustomSlot ? "#0EA5E9" : "#FFFFFF",
                      color: isCustomSlot ? "#FFFFFF" : "#475569",
                      boxShadow: isCustomSlot ? "0 4px 14px 0 rgba(14,165,233,0.3)" : "none",
                    }}
                  >
                    <Clock size={13} />
                    Custom
                  </button>
                </div>

                {/* Compact custom time control */}
                <AnimatePresence>
                  {isCustomSlot && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="flex items-center gap-2 pt-0.5"
                    >
                      <input
                        ref={customHourRef}
                        type="number"
                        min={1}
                        max={12}
                        required={isCustomSlot}
                        value={customHour}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                          const n = parseInt(v, 10);
                          if (v === "" || (n >= 1 && n <= 12)) setCustomHour(v);
                        }}
                        placeholder="9"
                        aria-label="Hour"
                        className="h-10 rounded-xl text-sm font-semibold text-center text-[#0F172A] bg-white outline-none transition-all duration-150 cursor-text placeholder:text-slate-300 border border-[#0EA5E9]/40 focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        style={{ width: 52 }}
                      />
                      <div
                        className="flex h-10 rounded-xl overflow-hidden"
                        style={{ border: "1px solid #E2E8F0" }}
                        role="group"
                        aria-label="AM or PM"
                      >
                        {(["AM", "PM"] as const).map((period, idx) => {
                          const active = customAmPm === period;
                          return (
                            <button
                              key={period}
                              type="button"
                              onClick={() => setCustomAmPm(period)}
                              className="px-3.5 text-xs font-bold tracking-wide transition-all duration-150 cursor-pointer"
                              style={{
                                background: active ? "#0EA5E9" : "#FFFFFF",
                                color: active ? "#FFFFFF" : "#64748B",
                                borderLeft: idx === 1 ? "1px solid #E2E8F0" : "none",
                              }}
                              aria-pressed={active}
                            >
                              {period}
                            </button>
                          );
                        })}
                      </div>
                      <span className="text-xs text-[#94A3B8] leading-snug">
                        We'll confirm availability.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {step4Errors.timeSlot && (
                  <p className="text-xs font-semibold text-red-500">{step4Errors.timeSlot}</p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-2">
              <FieldLabel>Anything specific you'd like us to know?</FieldLabel>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Optional — timeline, budget, or context for the call"
                className={fieldClass.replace("h-12", "min-h-[110px] py-3") + " resize-none"}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-[#0F172A] transition-all duration-200 hover:bg-slate-50"
                style={{ border: "1.5px solid #E2E8F0", background: "transparent" }}
              >
                Back
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "#0EA5E9", boxShadow: "0 4px 16px rgba(14,165,233,0.3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(132,204,22,0.4)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(14,165,233,0.3)")}
              >
                Request a Call
                <Send size={15} />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────── */
export function TalkToStrategistPage() {
  useMeta(
    "Talk to a Strategist | Infomist — Software, AI & Growth Engineering",
    "Request a quick call with an Infomist strategist. Tell us what you'd like to discuss and we'll get back to you within one business day."
  );

  return (
    <div className="w-full min-h-screen bg-white pt-20 overflow-x-hidden">
      <PageHero
        eyebrow="Talk to a Strategist"
        eyebrowIcon={CalendarDays}
        title="Let's talk"
        gradientWord="strategy."
        sub="Share a few details and one of our strategists will call you back — usually within one business day. No obligation, no generic sales pitch."
        visual={<HeroVisual variant="journey" />}
      />
      <div className="relative max-w-3xl mx-auto px-6 py-16 md:py-20">
        <Reveal>
          <StrategistForm />
        </Reveal>
      </div>

      <PageFaq
        faqs={STRATEGIST_FAQS}
        idPrefix="strategist-page"
        heading="Frequently Asked Questions"
        subheading="Common questions about booking a call with an Infomist strategist."
      />
    </div>
  );
}
