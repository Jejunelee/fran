"use client";

import { useMemo, type ReactNode } from "react";
import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/forms";
import { StatusBadge } from "@/components/ui/status-badge";
import { intentLabel } from "@/lib/intent/classify";
import type { ResearchProject } from "@/types";

const COLORS = ["#7c3aed", "#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#f43f5e"];

export function ResearchDashboard({ project }: { project: ResearchProject }) {
  const commercial = project.keywords.filter((item) => item.intents.includes("commercial")).length;
  const informational = project.keywords.filter((item) => item.intents.includes("informational")).length;
  const highOpp = project.keywords.filter((item) => (item.opportunityScore.value ?? 0) >= 60).length;
  const questions = project.questions.length;

  const intentData = useMemo(() => {
    const counts = new Map<string, number>();
    for (const keyword of project.keywords) {
      const label = intentLabel(keyword.intents);
      counts.set(label, (counts.get(label) ?? 0) + 1);
    }
    return [...counts.entries()].map(([name, value]) => ({ name, value }));
  }, [project.keywords]);

  const volumeData = useMemo(() => {
    const buckets = { "Has volume": 0, "Not available": 0 };
    for (const keyword of project.keywords) {
      if (keyword.volume.value != null) buckets["Has volume"] += 1;
      else buckets["Not available"] += 1;
    }
    return Object.entries(buckets).map(([name, value]) => ({ name, value }));
  }, [project.keywords]);

  const competitionData = useMemo(() => {
    const buckets = { "Has Google Ads competition": 0, "SEO KD present": 0, "Not available": 0 };
    for (const keyword of project.keywords) {
      if (keyword.seoKd.value != null) buckets["SEO KD present"] += 1;
      else if (keyword.googleAdsCompetition.value != null) buckets["Has Google Ads competition"] += 1;
      else buckets["Not available"] += 1;
    }
    return Object.entries(buckets).map(([name, value]) => ({ name, value }));
  }, [project.keywords]);

  const fitData = useMemo(() => {
    const google = project.keywords.filter((item) => item.googleFit === "strong").length;
    const social = project.keywords.filter((item) => item.socialFit === "strong").length;
    return [
      { name: "Strong Google fit", value: google },
      { name: "Strong social fit", value: social },
    ];
  }, [project.keywords]);

  const trend = project.trends[0];

  return (
    <div className="space-y-6">
      {project.isDemo ? (
        <div className="rounded-lg border border-fuchsia-200 bg-fuchsia-50 px-4 py-3 text-sm text-fuchsia-900">
          Demo data — not live search metrics. Volume, KD, CPC, and Trends are intentionally empty.
        </div>
      ) : null}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{project.name}</h1>
          <p className="text-sm text-slate-600">
            {project.topic} · {project.city ? `${project.city}, ` : ""}
            {project.country} · {project.platform} · {project.goal.replace("_", " ")}
          </p>
        </div>
        <Link href="/research/new" className="rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white">
          New Research
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Keywords" value={project.keywords.length} />
        <Stat label="Questions" value={questions} />
        <Stat label="Commercial keywords" value={commercial} />
        <Stat label="Informational keywords" value={informational} />
        <Stat label="High-opportunity (scored ≥ 60)" value={highOpp} hint="Requires imported demand or competition data" />
        <Stat label="Trend direction" value={project.trendDirection} />
      </div>
      <Card>
        <h2 className="mb-2 font-medium">Data sources</h2>
        <div className="flex flex-wrap gap-2">
          {project.dataSources.map((source) => (
            <span key={source} className="rounded-full border border-slate-200 px-2 py-1 text-xs">
              {source}
            </span>
          ))}
        </div>
        {trend ? (
          <p className="mt-3 text-sm text-slate-600">
            Trend status: <StatusBadge status={trend.status} /> {trend.notes}
          </p>
        ) : null}
      </Card>
      <div className="grid gap-4 xl:grid-cols-2">
        <ChartCard title="Keyword intent distribution">
          <PieBlock data={intentData} />
        </ChartCard>
        <ChartCard title="Volume distribution">
          <BarBlock data={volumeData} />
        </ChartCard>
        <ChartCard title="Competition distribution">
          <BarBlock data={competitionData} />
        </ChartCard>
        <ChartCard title="Google vs Social (strong fit counts)">
          <BarBlock data={fitData} />
        </ChartCard>
      </div>
      <Card>
        <h2 className="mb-2 font-medium">Run log</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
          {project.runLog.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <Card>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold capitalize">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </Card>
  );
}

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card>
      <h2 className="mb-4 font-medium">{title}</h2>
      <div className="h-64">{children}</div>
    </Card>
  );
}

function PieBlock({ data }: { data: { name: string; value: number }[] }) {
  if (!data.length) return <p className="text-sm text-slate-500">No data yet.</p>;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={80}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

function BarBlock({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" hide={false} interval={0} tick={{ fontSize: 11 }} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value" fill="#7c3aed" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
