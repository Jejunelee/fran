"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button, Card, Input, Label, Textarea } from "@/components/ui/forms";
import { StatusBadge } from "@/components/ui/status-badge";
import { useAppStore } from "@/components/providers/app-provider";
import { mappedTrend, parseWorkbook } from "@/lib/imports/parse";
import { classifyTrendFromPoints } from "@/lib/providers/trend/csv";
import { createId, nowIso } from "@/lib/id";
import type { TrendPoint } from "@/types";

export function TrendsWorkspace() {
  const { project, setProject } = useAppStore();
  const [compare, setCompare] = useState("");
  const [manual, setManual] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  if (!project) return <p>Create a research project first.</p>;
  const primary = project.trends[0];

  async function onFile(file: File, topic = project.topic) {
    try {
      const table = await parseWorkbook(file);
      const result = mappedTrend(table, topic);
      const series = {
        id: createId(),
        projectId: project.id,
        topic,
        points: result.points,
        direction: result.direction,
        seasonality: result.seasonality,
        relatedTopics: result.relatedTopics,
        risingQueries: result.risingQueries,
        status: result.status,
        source: result.source,
        notes: result.notes,
        createdAt: nowIso(),
      };
      const trends = topic === project.topic
        ? [series, ...project.trends.filter((item) => item.topic !== topic)]
        : [...project.trends.filter((item) => item.topic !== topic), series];
      setProject({
        ...project,
        trends,
        trendDirection: topic === project.topic ? series.direction : project.trendDirection,
        dataSources: [...new Set([...project.dataSources, `Trends import: ${file.name}`])],
        imports: [
          ...project.imports,
          { id: createId(), projectId: project.id, fileName: file.name, kind: "trends", rowCount: result.points.length, createdAt: nowIso() },
        ],
      });
      setMessage(result.notes);
    } catch {
      setMessage("Google Trends data could not be parsed. You can upload a Trends CSV or continue without trend data.");
    }
  }

  function addManualSeries() {
    const points: TrendPoint[] = manual
      .split("\n")
      .map((line) => {
        const [date, value] = line.split(/,|\t/);
        return { date: date?.trim() ?? "", value: Number(value) };
      })
      .filter((point) => point.date && !Number.isNaN(point.value));
    const { direction, seasonality } = classifyTrendFromPoints(points);
    const series = {
      id: createId(),
      projectId: project.id,
      topic: project.topic,
      points,
      direction,
      seasonality,
      relatedTopics: [],
      risingQueries: [],
      status: points.length ? ("user_supplied" as const) : ("unavailable" as const),
      source: "Manual trend entry",
      notes: points.length
        ? "Direction is computed from values you entered."
        : "Trend data unavailable. You can upload Google Trends data or continue without it.",
      createdAt: nowIso(),
    };
    setProject({ ...project, trends: [series, ...project.trends.filter((item) => item.topic !== project.topic)], trendDirection: direction });
  }

  const comparisonTopics = compare.split(/,|\n/).map((item) => item.trim()).filter(Boolean);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Trend analysis</h1>
        <p className="text-sm text-slate-600">
          No live Google Trends API is configured. Upload a Google Trends CSV, enter points, or continue without trend data.
        </p>
      </div>
      {message ? <p className="text-sm text-violet-800">{message}</p> : null}
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-medium">{project.topic}</h2>
            <p className="text-sm text-slate-600">
              Direction: {primary?.direction ?? "unknown"} · Seasonality: {primary?.seasonality ?? "Unknown"}
            </p>
          </div>
          {primary ? <StatusBadge status={primary.status} /> : <StatusBadge status="unavailable" />}
        </div>
        {!primary?.points.length ? (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            Trend data unavailable. You can upload Google Trends data or continue without it.
          </p>
        ) : (
          <div className="mt-4 h-72">
            <TrendChart points={primary.points} name={primary.topic} />
          </div>
        )}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <Label>Related topics</Label>
            <p className="text-sm text-slate-600">{primary?.relatedTopics.length ? primary.relatedTopics.join(", ") : "Not available"}</p>
          </div>
          <div>
            <Label>Rising queries</Label>
            <p className="text-sm text-slate-600">{primary?.risingQueries.length ? primary.risingQueries.join(", ") : "Not available"}</p>
          </div>
        </div>
      </Card>
      <Card className="space-y-3">
        <h2 className="font-medium">Import Google Trends CSV / XLSX</h2>
        <input type="file" accept=".csv,.xlsx,.xls" onChange={(e) => e.target.files?.[0] && void onFile(e.target.files[0])} />
        <Label>Or paste date,value rows</Label>
        <Textarea rows={5} value={manual} onChange={(e) => setManual(e.target.value)} placeholder={"2024-01-01,42\n2024-02-01,48"} />
        <Button variant="secondary" onClick={addManualSeries}>
          Save manual series
        </Button>
      </Card>
      <Card className="space-y-3">
        <h2 className="font-medium">Topic comparison</h2>
        <p className="text-sm text-slate-600">Compare additional topics using imported series. Scores are not invented when data is missing.</p>
        <Input value={compare} onChange={(e) => setCompare(e.target.value)} placeholder="digital marketing, SEO, social media marketing" />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="py-2">Topic</th>
                <th>Current trend</th>
                <th>Direction</th>
                <th>Seasonality</th>
                <th>Relative interest</th>
                <th>Notes</th>
                <th>Upload</th>
              </tr>
            </thead>
            <tbody>
              {[project.topic, ...comparisonTopics].map((topic) => {
                const series = project.trends.find((item) => item.topic.toLowerCase() === topic.toLowerCase());
                const last = series?.points.at(-1)?.value;
                return (
                  <tr key={topic} className="border-t border-slate-100">
                    <td className="py-2">{topic}</td>
                    <td>{series ? <StatusBadge status={series.status} /> : <StatusBadge status="unavailable" />}</td>
                    <td>{series?.direction ?? "unknown"}</td>
                    <td>{series?.seasonality ?? "Unknown"}</td>
                    <td>{last ?? "Not available"}</td>
                    <td className="max-w-xs text-slate-600">{series?.notes ?? "No series uploaded for this topic."}</td>
                    <td>
                      <input type="file" accept=".csv,.xlsx,.xls" onChange={(e) => e.target.files?.[0] && void onFile(e.target.files[0], topic)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function TrendChart({ points, name }: { points: TrendPoint[]; name: string }) {
  const data = useMemo(() => points, [points]);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" name={name} stroke="#7c3aed" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
