"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Card, Input, Label } from "@/components/ui/forms";
import { useAppStore } from "@/components/providers/app-provider";
import { PLATFORMS } from "@/lib/constants";
import { settingsSchema } from "@/lib/validations";

export function SettingsWorkspace() {
  const { settings, updateSettings, supabaseConfigured } = useAppStore();
  const [form, setForm] = useState({
    defaultCountry: settings.defaultCountry,
    defaultPlatform: settings.defaultPlatform,
    defaultMinVolume: settings.defaultMinVolume?.toString() ?? "",
    defaultMaxKd: settings.defaultMaxKd?.toString() ?? "",
    preferredCurrency: settings.preferredCurrency,
    suggestionsEnabled: settings.suggestionsEnabled,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-slate-600">Defaults apply to new research. Paid API credentials are not required.</p>
      </div>
      <Card className="space-y-4">
        <div>
          <Label>Default country</Label>
          <Input value={form.defaultCountry} onChange={(e) => setForm({ ...form, defaultCountry: e.target.value })} />
        </div>
        <div>
          <Label>Default platform</Label>
          <select
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            value={form.defaultPlatform}
            onChange={(e) => setForm({ ...form, defaultPlatform: e.target.value as typeof form.defaultPlatform })}
          >
            {PLATFORMS.map((platform) => (
              <option key={platform.value} value={platform.value}>
                {platform.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>Default minimum volume</Label>
            <Input value={form.defaultMinVolume} onChange={(e) => setForm({ ...form, defaultMinVolume: e.target.value })} placeholder="Optional" />
          </div>
          <div>
            <Label>Default maximum SEO KD</Label>
            <Input value={form.defaultMaxKd} onChange={(e) => setForm({ ...form, defaultMaxKd: e.target.value })} placeholder="Optional" />
          </div>
        </div>
        <div>
          <Label>Preferred currency</Label>
          <Input value={form.preferredCurrency} onChange={(e) => setForm({ ...form, preferredCurrency: e.target.value })} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.suggestionsEnabled}
            onChange={(e) => setForm({ ...form, suggestionsEnabled: e.target.checked })}
          />
          Enable optional public search suggestions on new research
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {message ? <p className="text-sm text-violet-800">{message}</p> : null}
        <Button
          onClick={() => {
            const parsed = settingsSchema.safeParse(form);
            if (!parsed.success) {
              setError(parsed.error.issues[0]?.message ?? "Invalid settings");
              return;
            }
            updateSettings({
              defaultCountry: parsed.data.defaultCountry,
              defaultPlatform: parsed.data.defaultPlatform,
              defaultMinVolume: parsed.data.defaultMinVolume ? Number(parsed.data.defaultMinVolume) : null,
              defaultMaxKd: parsed.data.defaultMaxKd ? Number(parsed.data.defaultMaxKd) : null,
              preferredCurrency: parsed.data.preferredCurrency,
              suggestionsEnabled: parsed.data.suggestionsEnabled,
            });
            setError(null);
            setMessage("Settings saved locally.");
          }}
        >
          Save settings
        </Button>
      </Card>
      <Card>
        <h2 className="font-medium">Data providers</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
          <li>Keyword demand: CSV import + manual entry (no paid API)</li>
          <li>Trends: CSV import + manual entry (no live Trends API)</li>
          <li>Suggestions: optional public Google Suggest proxy</li>
          <li>AI: deterministic fallback only</li>
          <li>Supabase: {supabaseConfigured ? "configured" : "not configured — local/demo mode"}</li>
        </ul>
        <p className="mt-3 text-sm text-slate-600">
          Google OAuth can be enabled later in the Supabase dashboard. Email/password is available when Supabase env vars are set.
        </p>
        <div className="mt-3">
          <Link href="/login" className="text-sm text-violet-700 hover:underline">
            Account
          </Link>
        </div>
      </Card>
    </div>
  );
}
