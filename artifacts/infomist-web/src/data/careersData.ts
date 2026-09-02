/**
 * Careers data. `JOBS` holds the currently open roles; clear the array (or filter
 * it down) when a role closes — the Careers page renders a premium empty state
 * automatically when there is nothing open. `findJob` mirrors `findSubcategory`
 * in `solutionsData.ts` for the /careers/:slug detail route.
 */

export interface Job {
  slug: string;
  title: string;
  /** e.g. "Full-time", "Internship" */
  type: string;
  /** e.g. "Remote", "Hybrid · Islamabad" */
  location: string;
  /** one-line card summary */
  summary: string;
  skills: string[];
  /** 1–2 sentence intro on the detail page */
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
}

export const JOBS: Job[] = [
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    type: "Full-time",
    location: "Remote",
    summary:
      "Build and integrate AI-powered solutions that solve real-world business problems.",
    skills: ["Python", "AI", "LLMs", "Automation"],
    about:
      "You'll design and ship AI features that go into production for real clients — assistants, retrieval systems, and decision workflows built around a specific business outcome rather than a demo.",
    responsibilities: [
      "Design, build, and integrate AI features into client software and internal tools.",
      "Work with large language models, retrieval, and prompt/response evaluation.",
      "Turn ambiguous business problems into clear, testable technical solutions.",
      "Collaborate with engineers and designers to ship features end to end.",
      "Monitor quality in production and iterate based on real usage.",
    ],
    requirements: [
      "Strong Python and solid software engineering fundamentals.",
      "Hands-on experience working with LLMs or other ML systems.",
      "Comfort with APIs, data handling, and connecting systems together.",
      "Clear written and verbal communication.",
      "A practical, outcome-first approach to problem solving.",
    ],
    niceToHave: [
      "Experience with automation platforms or agent frameworks.",
      "Familiarity with evaluation, guardrails, or observability for AI systems.",
    ],
  },
  {
    slug: "software-engineer",
    title: "Software Engineer",
    type: "Full-time",
    location: "Remote",
    summary:
      "Design and develop scalable software experiences for modern digital products.",
    skills: ["JavaScript", "React", "Node.js"],
    about:
      "You'll build web applications and product features that clients depend on day to day — with an emphasis on clean architecture, performance, and maintainability.",
    responsibilities: [
      "Build and maintain web applications across the front and back end.",
      "Translate designs and requirements into reliable, well-structured code.",
      "Contribute to architecture decisions and code review.",
      "Write code that is documented and easy for the next person to extend.",
      "Support features in production and resolve issues as they arise.",
    ],
    requirements: [
      "Solid experience with JavaScript/TypeScript, React, and Node.js.",
      "Understanding of APIs, databases, and application architecture.",
      "Attention to detail in UI implementation and edge cases.",
      "Ability to work independently and communicate progress clearly.",
    ],
    niceToHave: [
      "Experience with cloud infrastructure and CI/CD.",
      "Interest in integrating AI or automation into products.",
    ],
  },
  {
    slug: "ai-automation-intern",
    title: "AI Automation Intern",
    type: "Internship",
    location: "Remote",
    summary:
      "Work with modern automation and AI technologies while contributing to real-world projects.",
    skills: ["AI", "Automation", "n8n"],
    about:
      "A hands-on internship for someone early in their career who wants to learn how automation and AI are used in production — you'll contribute to real client work with support from the team.",
    responsibilities: [
      "Help build and test automation workflows for internal and client use.",
      "Learn to connect apps, data sources, and AI services into working pipelines.",
      "Document what you build so others can maintain it.",
      "Share what you learn and ask good questions.",
    ],
    requirements: [
      "Curiosity about automation and AI, and a willingness to learn quickly.",
      "Basic programming or scripting ability.",
      "Logical problem solving and attention to detail.",
      "Clear communication and reliability.",
    ],
    niceToHave: [
      "Any exposure to n8n, Zapier, Make, or similar automation tools.",
      "Small personal projects or coursework you can talk through.",
    ],
  },
];

export function findJob(slug: string): Job | null {
  return JOBS.find((j) => j.slug === slug) ?? null;
}
