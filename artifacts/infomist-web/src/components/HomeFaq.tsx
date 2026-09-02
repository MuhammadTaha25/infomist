import { PageFaq } from "@/components/PageFaq";

const HOME_FAQS = [
  {
    q: "What does Infomist do?",
    a: "Infomist is a software development company operating since 2001, building full-stack web and mobile applications, workflow automation with n8n, AI agents (RAG, voice, LLM-based), and growth/SEO systems for enterprise clients.",
  },
  {
    q: "How much does it cost to build a custom software project with Infomist?",
    a: "Cost depends on scope — a typical MVP web app starts in the low tens of thousands of dollars, while enterprise AI or automation systems are quoted after a discovery call. Use the \"Talk to a Strategist\" flow for a tailored estimate.",
  },
  {
    q: "Is Infomist a good fit for startups or only enterprise clients?",
    a: "Infomist works with both — startups get lean MVP builds and staff augmentation, while enterprise clients get full architecture, Salesforce, and AI agent engagements.",
  },
  {
    q: "How long has Infomist been in business?",
    a: "Infomist has been building software since 2001, founded by Hisham Sarwar, with 200+ clients delivered for.",
  },
  {
    q: "How do I get started with Infomist?",
    a: "You can either submit a project brief via the Contact page or use the \"Talk to a Strategist\" 4-step scheduling flow to book a call directly.",
  },
];

export function HomeFaq() {
  return (
    <PageFaq
      faqs={HOME_FAQS}
      idPrefix="home-faq"
      heading="Frequently Asked Questions"
      subheading="Straight answers to what teams ask before working with Infomist."
    />
  );
}
