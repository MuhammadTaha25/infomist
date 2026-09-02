import { ArrowRight, MessagesSquare, Sparkles } from "lucide-react";
import { GradientText, Eyebrow, CTAButton } from "@/components/site/primitives";
import { ParticleNetwork } from "@/components/ParticleNetwork";

/* ─────────────────────────────────────────────────────────────────────────
   Homepage hero — a single calm frame. The background is an animated
   node-and-line network (ParticleNetwork) that undulates like water.
   The headline keeps its cyan→lime gradient accent on "Since 2001."
   No slider. The two CTAs route to the /contact and /talk-to-strategist
   flows, whose form submissions are delivered to n8n webhooks.
   ───────────────────────────────────────────────────────────────────────── */

export function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh", paddingTop: "4rem", background: "#FAFAFA" }}
    >
      <ParticleNetwork />

      <div className="relative z-10 mx-auto max-w-6xl px-6 min-h-[calc(100vh-4rem)] flex flex-col justify-center py-20">
        <div className="flex flex-col items-center text-center gap-7 max-w-3xl mx-auto rise-in">
          <Eyebrow icon={Sparkles}>25 Years of Engineering Excellence</Eyebrow>

          <h1
            className="font-black text-[#0F172A] leading-[1.02]"
            style={{ fontSize: "clamp(2.7rem, 6.6vw, 4.75rem)", letterSpacing: "-0.045em" }}
          >
            Software Development Company{" "}
            <GradientText>Since 2001.</GradientText>
          </h1>

          <p className="text-[#475569] text-lg md:text-xl max-w-2xl leading-relaxed">
            We're a software development company merging two decades of web architecture with
            autonomous AI agents and workflow orchestration.{" "}
            <span className="text-[#0F172A] font-semibold">Your business, running on autopilot.</span>
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 pt-1">
            <CTAButton href="/contact" icon={ArrowRight}>Deploy a Project</CTAButton>
            <CTAButton href="/talk-to-strategist" variant="outline" icon={MessagesSquare}>
              Talk to a Strategist
            </CTAButton>
          </div>

          <div className="flex items-center gap-5 pt-3 text-[#64748B]">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {["#0EA5E9", "#84CC16", "#0F172A"].map((c) => (
                  <div key={c} className="w-6 h-6 rounded-full border-2 border-white" style={{ background: c }} />
                ))}
              </div>
              <span className="text-xs font-semibold">200+ clients</span>
            </div>
            <div className="w-px h-4 bg-slate-300" />
            <span className="text-xs font-semibold">4.9 / 5</span>
            <div className="w-px h-4 bg-slate-300" />
            <span className="text-xs font-semibold">Since 2001</span>
          </div>
        </div>
      </div>
    </section>
  );
}
