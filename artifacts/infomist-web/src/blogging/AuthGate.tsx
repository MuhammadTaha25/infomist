import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Loader2, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBloggingAuth } from "./auth";

/**
 * Wraps the Blogging app. Shows a first-run setup screen, then a login screen,
 * then the app once authenticated. See ./auth.tsx for the (prototype) model.
 */
export function AuthGate({ children }: { children: ReactNode }) {
  const { status } = useBloggingAuth();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (status === "authed") return <>{children}</>;
  return <AuthScreen mode={status === "setup" ? "setup" : "login"} />;
}

function AuthScreen({ mode }: { mode: "setup" | "login" }) {
  const { register, login, resetAccount } = useBloggingAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSetup = mode === "setup";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const mail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return setError("Enter a valid email address.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (isSetup && password !== confirm) return setError("Passwords don't match.");

    setBusy(true);
    try {
      if (isSetup) {
        await register(mail, password);
        toast.success("Admin account created");
      } else {
        await login(mail, password);
        toast.success("Signed in");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  function onReset() {
    if (window.confirm("Reset the admin account? This clears the saved email and password on this browser. Blog content is not deleted.")) {
      resetAccount();
      setEmail("");
      setPassword("");
      setConfirm("");
      setError(null);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2 text-foreground">
          <LockKeyhole className="h-5 w-5" />
          <span className="text-sm font-black uppercase tracking-[0.14em]">Infomist Blogging</span>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{isSetup ? "Create the admin account" : "Sign in"}</CardTitle>
            <CardDescription>
              {isSetup
                ? "First run — set the email and password you'll use to sign in. Stored on this browser only."
                : "Enter your admin email and password."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="ag-email">Email</Label>
                <Input
                  id="ag-email"
                  type="email"
                  autoComplete={isSetup ? "email" : "username"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  autoFocus
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="ag-password">Password</Label>
                <Input
                  id="ag-password"
                  type="password"
                  autoComplete={isSetup ? "new-password" : "current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSetup ? "At least 8 characters" : "••••••••"}
                  required
                />
              </div>
              {isSetup && (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="ag-confirm">Confirm password</Label>
                  <Input
                    id="ag-confirm"
                    type="password"
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </div>
              )}

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" disabled={busy} className="mt-1">
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSetup ? "Create account & sign in" : "Sign in"}
              </Button>
            </form>

            {!isSetup && (
              <button
                type="button"
                onClick={onReset}
                className="mt-4 w-full text-center text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Forgot password? Reset the admin account
              </button>
            )}
          </CardContent>
        </Card>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Prototype gate — verification is client-side only.
        </p>
      </div>
    </div>
  );
}
