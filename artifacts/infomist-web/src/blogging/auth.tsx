import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Client-side auth gate for the Blogging module.
 *
 * This is a PROTOTYPE gate, not real security: the check runs entirely in the
 * browser, so anyone with devtools access can bypass it and there is no server
 * verifying anything. It exists to keep the admin out of casual view and to
 * provide a real email/password flow for the frontend-only CMS.
 *
 * Model: first visit -> "setup" (admin picks their own email + password).
 * Thereafter -> "locked" until they sign in. Credentials + session live in
 * localStorage on that one browser; clearing site data resets everything.
 */

const ACCOUNT_KEY = "infomist.blog.account";
const SESSION_KEY = "infomist.blog.session";
const SESSION_DAYS = 30;

interface Account {
  email: string;
  salt: string;
  hash: string;
  createdAt: string;
}

type Status = "loading" | "setup" | "locked" | "authed";

interface AuthCtx {
  status: Status;
  email: string | null;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  /** wipes the admin account (used by the "forgot password" escape hatch) */
  resetAccount: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function randomHex(bytes: number): string {
  const a = new Uint8Array(bytes);
  (globalThis.crypto ?? ({} as Crypto)).getRandomValues?.(a);
  if (!a.some(Boolean)) for (let i = 0; i < a.length; i++) a[i] = Math.floor(Math.random() * 256);
  return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const subtle = globalThis.crypto?.subtle;
  if (subtle) {
    const digest = await subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
  }
  // Non-secure-context fallback (djb2). Still not plaintext.
  let h = 5381;
  for (const ch of `${salt}:${password}`) h = ((h << 5) + h + ch.charCodeAt(0)) >>> 0;
  return `djb2$${h.toString(16)}`;
}

function sessionValid(): boolean {
  const s = readJSON<{ token: string; exp: number }>(SESSION_KEY);
  return !!s && typeof s.exp === "number" && s.exp > Date.now();
}

export function BloggingAuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const acc = readJSON<Account>(ACCOUNT_KEY);
    setAccount(acc);
    setAuthed(!!acc && sessionValid());
    setReady(true);
  }, []);

  const startSession = useCallback(() => {
    const session = { token: randomHex(16), exp: Date.now() + SESSION_DAYS * 864e5 };
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
      /* storage disabled — session lasts for this page only */
    }
    setAuthed(true);
  }, []);

  const register = useCallback(
    async (email: string, password: string) => {
      const salt = randomHex(12);
      const acc: Account = {
        email: email.trim().toLowerCase(),
        salt,
        hash: await hashPassword(password, salt),
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(ACCOUNT_KEY, JSON.stringify(acc));
      setAccount(acc);
      startSession();
    },
    [startSession],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const acc = account ?? readJSON<Account>(ACCOUNT_KEY);
      if (!acc) throw new Error("No admin account exists yet.");
      const ok =
        email.trim().toLowerCase() === acc.email &&
        (await hashPassword(password, acc.salt)) === acc.hash;
      if (!ok) throw new Error("Incorrect email or password.");
      startSession();
    },
    [account, startSession],
  );

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      /* noop */
    }
    setAuthed(false);
  }, []);

  const resetAccount = useCallback(() => {
    try {
      localStorage.removeItem(ACCOUNT_KEY);
      localStorage.removeItem(SESSION_KEY);
    } catch {
      /* noop */
    }
    setAccount(null);
    setAuthed(false);
  }, []);

  const value = useMemo<AuthCtx>(() => {
    const status: Status = !ready ? "loading" : !account ? "setup" : authed ? "authed" : "locked";
    return { status, email: account?.email ?? null, register, login, logout, resetAccount };
  }, [ready, account, authed, register, login, logout, resetAccount]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBloggingAuth(): AuthCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBloggingAuth must be used within <BloggingAuthProvider>");
  return ctx;
}
