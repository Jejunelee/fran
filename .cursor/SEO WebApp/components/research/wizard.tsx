"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, FieldError, Input, Label, Select, Textarea } from "@/components/ui/forms";
import { GOALS, PLATFORMS } from "@/lib/constants";
import { runResearch, RUN_STAGES, type RunStage } from "@/lib/research/run";
import { wizardSchema } from "@/lib/validations";
import { useAppStore } from "@/components/providers/app-provider";

const STEPS = ["Topic", "Audience / Location", "Platform", "Data sources", "Run research"];

export function ResearchWizard() {
  const router = useRouter();
  const { settings, setProject } = useAppStore();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState<RunStage[]>([]);
  const [current, setCurrent] = useState<RunStage | null>(null);
  const [form, setForm] = useState({
    topic: "",
    country: settings.defaultCountry,
    city: "",
    audience: "",
    platform: settings.defaultPlatform,
    goal: "lead_generation" as const,
    extraTopics: "",
    seedKeywords: "",
    liveSuggestions: settings.suggestionsEnabled,
  });

  const canBack = step > 0 && !running;

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function start() {
    const parsed = wizardSchema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "topic");
        next[key] = issue.message;
      }
      setErrors(next);
      setStep(0);
      return;
    }
    setRunning(true);
    setCompleted([]);
    const extraTopics = form.extraTopics.split(/,|\n/).map((item) => item.trim()).filter(Boolean);
    const seedKeywords = form.seedKeywords.split(/,|\n/).map((item) => item.trim()).filter(Boolean);
    const project = await runResearch(
      {
        topic: parsed.data.topic,
        country: parsed.data.country,
        city: parsed.data.city,
        audience: parsed.data.audience,
        platform: parsed.data.platform,
        goal: parsed.data.goal,
        extraTopics,
        seedKeywords,
      },
      {
        liveSuggestions: form.liveSuggestions,
        onStage: (stage) => {
          setCurrent(stage);
          setCompleted((prev) => (prev.includes(stage) ? prev : [...prev, stage]));
        },
      },
    );
    setProject(project);
    setRunning(false);
    router.push("/dashboard");
  }

  const progress = useMemo(() => completed.length, [completed.length]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">New research</h1>
        <p className="text-sm text-slate-600">Guided social SEO + Google keyword research. No paid SEO APIs required.</p>
      </div>
      <ol className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-5">
        {STEPS.map((label, index) => (
          <li
            key={label}
            className={`rounded-lg border px-3 py-2 ${index === step ? "border-violet-300 bg-violet-50 text-violet-800" : "border-slate-200 bg-white"}`}
          >
            Step {index + 1}: {label}
          </li>
        ))}
      </ol>
      <Card>
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <Label>Topic / business</Label>
              <Input value={form.topic} onChange={(e) => update("topic", e.target.value)} placeholder="Digital marketing agency" />
              <FieldError message={errors.topic} />
            </div>
            <div>
              <Label>Additional candidate topics (optional)</Label>
              <Textarea rows={3} value={form.extraTopics} onChange={(e) => update("extraTopics", e.target.value)} placeholder="SEO, social media marketing" />
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Country</Label>
              <Input value={form.country} onChange={(e) => update("country", e.target.value)} />
              <FieldError message={errors.country} />
            </div>
            <div>
              <Label>City / region</Label>
              <Input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Sydney" />
            </div>
            <div className="sm:col-span-2">
              <Label>Target audience</Label>
              <Input value={form.audience} onChange={(e) => update("audience", e.target.value)} placeholder="Small business owners" />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Primary platform</Label>
              <Select value={form.platform} onChange={(e) => update("platform", e.target.value as typeof form.platform)}>
                {PLATFORMS.map((platform) => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Content goal</Label>
              <Select value={form.goal} onChange={(e) => update("goal", e.target.value as typeof form.goal)}>
                {GOALS.map((goal) => (
                  <option key={goal.value} value={goal.value}>
                    {goal.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label>Seed keywords or paste a list (optional)</Label>
              <Textarea rows={5} value={form.seedKeywords} onChange={(e) => update("seedKeywords", e.target.value)} placeholder={"digital marketing sydney\nseo agency sydney"} />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.liveSuggestions} onChange={(e) => update("liveSuggestions", e.target.checked)} />
              Try public search suggestions (free, rate-limited, may be unavailable)
            </label>
            <p className="text-sm text-slate-600">
              Search volume, KD, and Google Trends are not fetched automatically. You can import CSV/XLSX after the run.
            </p>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              This will generate keyword combinations, questions, clusters, and content angles from your inputs. Stages complete only after the work finishes.
            </p>
            <ul className="space-y-2">
              {RUN_STAGES.map((stage) => {
                const done = completed.includes(stage.id);
                const active = current === stage.id;
                return (
                  <li key={stage.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm">
                    <span>{stage.label}</span>
                    <span className={done ? "text-emerald-700" : active ? "text-violet-700" : "text-slate-400"}>
                      {done ? "Completed" : active ? "Running" : "Waiting"}
                    </span>
                  </li>
                );
              })}
            </ul>
            {running ? <p className="text-xs text-slate-500">{progress} / {RUN_STAGES.length} stages finished.</p> : null}
            <Button onClick={() => void start()} disabled={running}>
              {running ? "Running research…" : "Start Research"}
            </Button>
          </div>
        )}
        <div className="mt-6 flex justify-between">
          <Button variant="secondary" disabled={!canBack} onClick={() => setStep((value) => value - 1)}>
            Back
          </Button>
          {step < 4 ? (
            <Button onClick={() => setStep((value) => value + 1)}>Continue</Button>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
