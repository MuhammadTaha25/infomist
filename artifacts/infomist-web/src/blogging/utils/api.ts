/**
 * Client for the PHP blogging API (public/api/*).
 *
 * Auth is a server-verified httpOnly session cookie — the browser never holds
 * the password or a decodable token. Every call sends credentials so the cookie
 * rides along.
 *
 * When the API is unreachable (e.g. `vite dev` with no PHP server), callers fall
 * back to localStorage so local development still works. In a real deployment
 * the PHP endpoints are always present and are the single source of truth.
 */

const BASE = import.meta.env.BASE_URL || "/";
const API = `${BASE.replace(/\/$/, "")}/api`;

export class ApiUnreachable extends Error {}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API}${path}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
      ...init,
    });
  } catch {
    throw new ApiUnreachable(`API unreachable: ${path}`);
  }
  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // Non-JSON body = not our API (dev proxy error page, host 5xx HTML, WAF …).
    throw new ApiUnreachable(`Non-JSON response (${res.status}): ${path}`);
  }
  // A 5xx with no parseable body is the dev proxy / host failing to reach PHP,
  // not our API answering — treat it as unreachable so the dev fallbacks engage.
  if (!res.ok && data === null && res.status >= 500) {
    throw new ApiUnreachable(`Empty ${res.status} from ${path}`);
  }
  if (!res.ok) {
    const err = new Error(data?.error || `HTTP ${res.status}`) as Error & { status?: number; data?: unknown };
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data as T;
}

export const api = {
  session: () =>
    call<{ authed: boolean; email: string | null; configured: boolean }>("/auth/session.php"),
  login: (email: string, password: string) =>
    call<{ ok: boolean; email: string }>("/auth/login.php", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  logout: () => call<{ ok: boolean }>("/auth/logout.php", { method: "POST" }),
  getState: () =>
    call<{ ok: boolean; scope: "admin" | "public"; state: any }>("/blog/state.php"),
  putState: (state: unknown) =>
    call<{ ok: boolean; savedAt: string }>("/blog/state.php", {
      method: "PUT",
      body: JSON.stringify({ state }),
    }),
};
