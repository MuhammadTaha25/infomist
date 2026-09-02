import { useEffect, useRef } from "react";
import { X, BrainCircuit, ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/site/primitives";

const EXAMPLE_PROMPTS = [
  "Give me today's company briefing",
  "How many leads are qualified?",
  "What's happening with marketing?",
  "Any pending finance approvals?",
  "Which projects need attention?",
];

export function JarvisModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Talk to Jarvis — preview"
    >
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-[#07111F]/80 backdrop-blur-sm"
      />
      <div
        className="relative w-full max-w-lg rounded-3xl p-7 rise-in"
        style={{ background: "linear-gradient(160deg,#0B1728,#0F1D30)", border: "1px solid rgba(255,255,255,0.12)" }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-[#AAB8C8] outline-none hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-[#56D6FF]"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: "#0F1D30", border: "1px solid rgba(86,214,255,0.35)" }}
          >
            <BrainCircuit size={18} className="text-[#56D6FF]" />
          </span>
          <div>
            <p className="text-base font-black text-white">JARVIS</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#8DE7FF]">AI Orchestration Layer</p>
          </div>
        </div>

        <p className="mt-5 text-lg font-semibold text-white">Ask your company anything.</p>
        <p className="mt-1 text-sm text-[#AAB8C8]">
          Jarvis routes a question to the right departments and returns one unified answer. Here's the
          kind of thing a CEO asks it:
        </p>

        <ul className="mt-4 flex flex-col gap-2">
          {EXAMPLE_PROMPTS.map((p) => (
            <li
              key={p}
              className="rounded-xl px-4 py-3 text-sm text-[#F7FAFC]"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              “{p}”
            </li>
          ))}
        </ul>

        <p className="mt-5 rounded-xl px-4 py-3 text-xs text-[#718197]"
          style={{ background: "rgba(244,184,96,0.08)", border: "1px solid rgba(244,184,96,0.2)" }}>
          This is a preview of the Jarvis interface. It isn't connected to live company data here — talk
          to us to see it running against a real operation.
        </p>

        <div className="mt-5">
          <CTAButton href="/talk-to-strategist" variant="lime" icon={ArrowRight}>
            Talk to a Strategist
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
