import { useMeta } from "@/components/site/useMeta";
import { PageFaq } from "@/components/PageFaq";
import { PageHeroVideo } from "@/components/hero/PageHeroVideo";
import { FounderSection } from "@/components/FounderSection";
import { OurLeadership } from "@/components/OurLeadership";
import { DarkCTA } from "@/components/site/primitives";
import { MagneticButton } from "@/components/about/MagneticButton";
import {
  StorySection,
  EvolutionSection,
  TheShiftSection,
  VisionMissionSection,
  PhilosophySection,
  WhatWeEngineerSection,
  HowWeBuildSection,
  WhyInfomistSection,
} from "@/components/about/AboutSections";

const COMPANY_FAQS = [
  {
    q: "What is Infomist?",
    a: "Infomist is an AI-native software engineering company. It engineers intelligent systems — combining artificial intelligence, software engineering, automation, data and infrastructure into production-ready software — rather than adding AI as a standalone feature to existing products.",
  },
  {
    q: "When was Infomist founded?",
    a: "Infomist traces its roots to 2001 as a web studio and was formally established as Infomist Services in 2003–2005. The practice has run continuously since, evolving through software engineering, automation and data work into AI-native systems engineering.",
  },
  {
    q: "How is an AI-native engineering company different from an AI agency?",
    a: "An AI agency typically bolts an AI feature onto an existing product. Infomist designs the system with intelligence considered from the architecture stage — how the data, models, automation, interfaces and infrastructure fit together — and engineers it to run in production.",
  },
  {
    q: "What does Infomist actually engineer?",
    a: "AI systems, intelligent software products, AI agents, RAG systems, machine learning, intelligent automation, data systems, API and system integration, cloud and infrastructure, and computer vision — delivered as connected systems, not isolated features.",
  },
  {
    q: "Where is Infomist located?",
    a: "Infomist operates from Islamabad, Pakistan (DHA Phase 1) and Dublin, Ireland, delivering for clients worldwide.",
  },
];

export function OurStoryPage() {
  useMeta(
    "About Infomist | AI-Native Software Engineering Company",
    "Infomist is an AI-native software engineering company building intelligent software systems across AI, automation, data, infrastructure and digital products.",
  );

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      {/* 01 · HERO */}
      <PageHeroVideo
        eyebrow="About Infomist"
        title="Engineering the intelligent software systems of"
        accent="tomorrow."
        sub="Infomist is an AI-native software engineering company building intelligent products, automation systems and production-ready software — where AI is part of the architecture, not simply an added feature."
        primary={{ label: "Explore Our Solutions", href: "/solutions" }}
        secondary={{ label: "Our Vision", href: "#vision" }}
        media="hero-our-story"
        evidence={["Since 2001", "Islamabad · Dublin", "AI-native engineering", "Production systems"]}
      />

      {/* 02–09 · narrative */}
      <StorySection />
      <EvolutionSection />
      <TheShiftSection />
      <VisionMissionSection />
      <PhilosophySection />
      <WhatWeEngineerSection />
      <HowWeBuildSection />
      <WhyInfomistSection />

      {/* 09 · LEADERSHIP */}
      <FounderSection />
      <OurLeadership />

      {/* 10 · FAQ */}
      <PageFaq
        faqs={COMPANY_FAQS}
        idPrefix="company"
        heading="Frequently Asked Questions"
        subheading="Common questions about Infomist, how it works and what it engineers."
      />

      {/* 11 · CTA */}
      <DarkCTA
        eyebrow="Build What's Next"
        title="Have a complex problem? Let's engineer the system."
        sub="Turn complex business challenges into intelligent, production-ready software systems."
        cta={
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <MagneticButton href="/talk-to-strategist">Start a Project</MagneticButton>
            <MagneticButton href="/solutions" variant="ghost">Explore Our Solutions</MagneticButton>
          </div>
        }
      />
    </div>
  );
}
