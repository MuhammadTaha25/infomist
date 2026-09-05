/**
 * Job-application client — talks to the PHP intake at /api/applications.php
 * (POST public · GET/PATCH admin · GET ?cv=1 downloads a CV).
 *
 * When that endpoint is unreachable (e.g. `vite dev` with no PHP server) every
 * call falls back to localStorage so the flow is fully testable locally. In a
 * real deployment the PHP endpoint is always present and is the source of truth.
 */

export const APPLICATION_STATUSES = [
  "new",
  "reviewing",
  "shortlisted",
  "rejected",
  "hired",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const STATUS_LABEL: Record<ApplicationStatus, string> = {
  new: "New",
  reviewing: "Reviewing",
  shortlisted: "Shortlisted",
  rejected: "Not moving forward",
  hired: "Hired",
};

export interface JobApplication {
  id: string;
  jobSlug: string;
  jobTitle: string;
  name: string;
  email: string;
  phone?: string;
  link?: string;
  coverNote?: string;
  cvName: string;
  cvExt: string;
  status: ApplicationStatus;
  submittedAt: string;
  /** Only set for records held in the dev localStorage fallback. */
  cvDataUri?: string;
}

export interface ApplicationDraft {
  jobSlug: string;
  jobTitle: string;
  name: string;
  email: string;
  phone?: string;
  link?: string;
  coverNote?: string;
  /** raw File from the <input type="file"> */
  cv: File;
}

export const CV_ACCEPT = ".pdf,.doc,.docx";
export const CV_MAX_BYTES = 6 * 1024 * 1024;
const CV_TYPE_EXT: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

export class ApplicationError extends Error {}

const BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
const ENDPOINT = `${BASE}/api/applications.php`;
const LS_KEY = "infomist.applications.v1";

/* ── helpers ──────────────────────────────────────────────────────────── */

function cvExtFor(file: File): string | null {
  if (CV_TYPE_EXT[file.type]) return CV_TYPE_EXT[file.type];
  const m = /\.(pdf|docx?|)$/i.exec(file.name);
  return m && m[1] ? m[1].toLowerCase() : null;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const s = String(reader.result);
      resolve(s.slice(s.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new ApplicationError("That file could not be read."));
    reader.readAsDataURL(file);
  });
}

async function parseJson(res: Response): Promise<any> {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    throw new Error("non-json response");
  }
}

function readLocal(): JobApplication[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeLocal(list: JobApplication[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  } catch {
    /* quota / private mode — dev fallback only */
  }
}

/* ── public: submit ──────────────────────────────────────────────────── */

export async function submitApplication(
  draft: ApplicationDraft,
): Promise<{ id: string; offline: boolean }> {
  const ext = cvExtFor(draft.cv);
  if (!ext) throw new ApplicationError("Attach your CV as a PDF or Word document.");
  if (draft.cv.size > CV_MAX_BYTES) throw new ApplicationError("Your CV is larger than 6 MB.");

  const cvBase64 = await fileToBase64(draft.cv);
  const payload = {
    jobSlug: draft.jobSlug,
    jobTitle: draft.jobTitle,
    name: draft.name.trim(),
    email: draft.email.trim(),
    phone: draft.phone?.trim() || "",
    link: draft.link?.trim() || "",
    coverNote: draft.coverNote?.trim() || "",
    cvName: draft.cv.name,
    cvType: draft.cv.type || `application/${ext === "pdf" ? "pdf" : "octet-stream"}`,
    cvBase64,
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await parseJson(res);
    if (res.ok && data?.ok && data.id) return { id: data.id as string, offline: false };
    if (data?.error) throw new ApplicationError(String(data.error));
    throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    if (err instanceof ApplicationError) throw err;
    // endpoint unreachable → keep the application locally so dev still works
    const id = `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    const record: JobApplication = {
      id,
      jobSlug: payload.jobSlug,
      jobTitle: payload.jobTitle,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      link: payload.link,
      coverNote: payload.coverNote,
      cvName: payload.cvName,
      cvExt: ext,
      status: "new",
      submittedAt: new Date().toISOString(),
      cvDataUri: `data:${payload.cvType};base64,${cvBase64}`,
    };
    writeLocal([record, ...readLocal()]);
    return { id, offline: true };
  }
}

/* ── admin: list / update / download ─────────────────────────────────── */

export async function listApplications(): Promise<{
  source: "api" | "local";
  applications: JobApplication[];
}> {
  try {
    const res = await fetch(ENDPOINT, { credentials: "include" });
    const data = await parseJson(res);
    if (res.ok && data?.ok && Array.isArray(data.applications)) {
      return { source: "api", applications: data.applications as JobApplication[] };
    }
    throw new Error(data?.error || `HTTP ${res.status}`);
  } catch {
    return { source: "local", applications: readLocal() };
  }
}

export async function setApplicationStatus(
  id: string,
  status: ApplicationStatus,
): Promise<void> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id, status }),
    });
    const data = await parseJson(res);
    if (res.ok && data?.ok) return;
    throw new Error(data?.error || `HTTP ${res.status}`);
  } catch {
    const list = readLocal();
    const next = list.map((a) => (a.id === id ? { ...a, status } : a));
    if (next.some((a) => a.id === id)) writeLocal(next);
  }
}

/** Where to point a "Download CV" link/button for one application. */
export function cvHref(app: JobApplication): string {
  if (app.cvDataUri) return app.cvDataUri;
  return `${ENDPOINT}?id=${encodeURIComponent(app.id)}&cv=1`;
}
