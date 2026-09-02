import type { ComponentType } from "react";
import { Radar, Megaphone, Wallet, GanttChartSquare } from "lucide-react";

export interface Department {
  id: string;
  name: string;
  agents: number;
  color: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  /** one-line role */
  tagline: string;
  /** the specialised agents that make up the department */
  agentList: string[];
  /** angle on the orbit around Jarvis, in degrees (0 = right, clockwise) */
  angle: number;
}

/**
 * The Engineering Powerhouse model — four operating departments coordinated by
 * Jarvis. Agent counts are fixed: 8 + 5 + 3 + 4 = 20 specialised agents,
 * plus Jarvis as the orchestration layer.
 */
export const DEPARTMENTS: Department[] = [
  {
    id: "lead-generation",
    name: "Lead Generation",
    agents: 8,
    color: "#0EA5E9",
    icon: Radar,
    tagline: "Moves prospects from sourcing to qualified and booked meetings.",
    agentList: [
      "Lead Sourcing",
      "List Prep",
      "Outreach",
      "Follow-up / Reply",
      "Call List / Qualification",
      "Dialer",
      "Call Outcome & Booking",
      "Base",
    ],
    angle: 210,
  },
  {
    id: "marketing",
    name: "Marketing",
    agents: 5,
    color: "#8B5CF6",
    icon: Megaphone,
    tagline: "Creates, audits and improves marketing workflows.",
    agentList: [
      "Content Creation",
      "Content Audit & Improvement",
      "Ads Creation",
      "Ads Audit & Restrategization",
      "Base",
    ],
    angle: 150,
  },
  {
    id: "finance",
    name: "Finance",
    agents: 3,
    color: "#F97316",
    icon: Wallet,
    tagline: "Controls budget flow, approvals and financial visibility.",
    agentList: ["Ledger", "Decision", "Reporting"],
    angle: 330,
  },
  {
    id: "project-execution",
    name: "Project Execution",
    agents: 4,
    color: "#84CC16",
    icon: GanttChartSquare,
    tagline: "Tracks projects from closed deal to delivery and reporting.",
    agentList: ["Pipeline / Lead Status", "Project Progress", "Client Reporting", "Base"],
    angle: 30,
  },
];

export const TOTAL_AGENTS = DEPARTMENTS.reduce((n, d) => n + d.agents, 0); // 20

export const JARVIS = {
  name: "Jarvis",
  role: "AI Orchestration Layer",
  color: "#0EA5E9",
  does: [
    "Routes requests",
    "Connects departments",
    "Gathers information",
    "Returns company-wide insight",
  ],
};

/** The CEO → answer story, one step at a time. */
export const STORY: { step: string; title: string; body: string }[] = [
  { step: "01", title: "The CEO asks", body: "A question or instruction — by voice or text. “Give me today's company briefing.”" },
  { step: "02", title: "Jarvis receives it", body: "The request enters the orchestration layer, which reads intent and scope." },
  { step: "03", title: "Jarvis routes", body: "It decides which departments hold the answer and hands off the relevant parts." },
  { step: "04", title: "Departments respond", body: "Lead Generation, Marketing, Finance and Project Execution each return their slice." },
  { step: "05", title: "Agents do the work", body: "Inside each department the specialised agents run the actual tasks." },
  { step: "06", title: "Jarvis composes", body: "Results come back through Jarvis, which reconciles them into one coherent view." },
  { step: "07", title: "The CEO gets one answer", body: "A single unified response — the whole company, in one place." },
];

/** Illustrative telemetry for the floating cards — sample values, not live data. */
export const SAMPLE_STATUS: { dept: string; metric: string; state: string; tone: "active" | "running" | "pending" }[] = [
  { dept: "Leads", metric: "12 qualified", state: "in pipeline", tone: "active" },
  { dept: "Marketing", metric: "3 campaigns", state: "in flight", tone: "running" },
  { dept: "Finance", metric: "2 approvals", state: "awaiting sign-off", tone: "pending" },
  { dept: "Execution", metric: "4 projects", state: "on track", tone: "active" },
];
