"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, FieldError, Input, Label } from "@/components/ui/forms";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { authSchema } from "@/lib/validations";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const configured = isSupabaseConfigured();

  async function submit() {
    const parsed = authSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid email or password");
      return;
    }
    if (!configured) {
      setError("Supabase is not configured. Use demo mode from the home page, or add NEXT_PUBLIC_SUPABASE_URL and an anon/publishable key.");
      return;
    }
    const supabase = createClient();
    if (!supabase) {
      setError("Supabase client is unavailable.");
      return;
    }
    setError(null);
    if (mode === "signup") {
      const { error: signError } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      if (signError) {
        setError(signError.message);
        return;
      }
      setInfo("Account created. If email confirmation is enabled, check your inbox, then sign in.");
      return;
    }
    const { error: signError } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    if (signError) {
      setError(signError.message);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-2xl font-semibold">{mode === "login" ? "Sign in" : "Create account"}</h1>
        <p className="text-sm text-slate-600">
          Email and password via Supabase. Google OAuth can be added later in the Supabase dashboard.
        </p>
      </div>
      {!configured ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          Supabase env vars are not set. The app still works in local/demo mode.
        </p>
      ) : null}
      <div>
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <Label>Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <FieldError message={error ?? undefined} />
      {info ? <p className="text-sm text-emerald-700">{info}</p> : null}
      <Button className="w-full" onClick={() => void submit()}>
        {mode === "login" ? "Sign in" : "Sign up"}
      </Button>
      <p className="text-center text-sm text-slate-600">
        {mode === "login" ? (
          <>
            No account? <Link className="text-violet-700" href="/signup">Sign up</Link>
          </>
        ) : (
          <>
            Already have an account? <Link className="text-violet-700" href="/login">Sign in</Link>
          </>
        )}
      </p>
      <p className="text-center text-sm">
        <Link className="text-violet-700" href="/dashboard">
          Continue in demo mode
        </Link>
      </p>
    </div>
  );
}
