"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!isSupabaseConfigured()) {
      setError("Supabase is not connected yet.");
      return;
    }

    setLoading(true);
    const supabase = createBrowserSupabase();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-[#750000]/10 bg-white p-8 shadow-sm">
      <h1 className="font-serif text-4xl font-light tracking-[-0.03em] text-[#5B0706]">
        Sign in
      </h1>
      <p className="mt-3 font-josefin text-sm leading-relaxed text-[#5a0a0a]/70">
        Use the account added in Supabase. There is no public signup.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-1.5 block font-josefin text-[11px] uppercase tracking-[0.12em] text-[#750000]/55">
            Email
          </span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-[#750000]/15 bg-[#F8F2E7]/50 px-3 py-3 font-josefin text-sm outline-none focus:border-[#750000]/35 focus:bg-white"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-josefin text-[11px] uppercase tracking-[0.12em] text-[#750000]/55">
            Password
          </span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-[#750000]/15 bg-[#F8F2E7]/50 px-3 py-3 font-josefin text-sm outline-none focus:border-[#750000]/35 focus:bg-white"
          />
        </label>
        {error && <p className="font-josefin text-sm text-[#750000]">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#5B0706] py-3 font-josefin text-sm font-semibold uppercase tracking-[0.08em] text-[#f7f3ee] disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
