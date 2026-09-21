import type { TrendProvider, TrendResult } from "@/lib/providers/types";
import type { TrendDirection, TrendPoint } from "@/types";

export class UnavailableTrendProvider implements TrendProvider {
  id = "unavailable";
  async getTrend(topic: string): Promise<TrendResult> {
    return {
      topic,
      points: [],
      direction: "unknown",
      seasonality: "Unknown",
      relatedTopics: [],
      risingQueries: [],
      status: "unavailable",
      source: "No live trend provider configured",
      notes: "Trend data unavailable. You can upload Google Trends data or continue without it.",
    };
  }
}

export function classifyTrendFromPoints(points: TrendPoint[]): { direction: TrendDirection; seasonality: string } {
  if (points.length < 4) return { direction: "unknown", seasonality: "Not enough points" };
  const values = points.map((point) => point.value);
  const third = Math.ceil(values.length / 3);
  const first = values.slice(0, third).reduce((a, b) => a + b, 0) / third;
  const last = values.slice(-third).reduce((a, b) => a + b, 0) / third;
  const delta = last - first;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  let direction: TrendDirection = "stable";
  if (delta > 8) direction = "rising";
  else if (delta < -8) direction = "falling";
  let seasonality = "No strong seasonal pattern detected from supplied points.";
  if (variance > 200 && Math.max(...values) - Math.min(...values) >= 30) {
    direction = direction === "stable" ? "seasonal" : direction;
    seasonality = "Variation in the supplied series is large enough to suggest seasonality. Confirm with a full 12+ month file.";
  }
  return { direction, seasonality };
}

export function parseTrendsCsv(rows: Record<string, string>[], topic: string): TrendResult {
  const points: TrendPoint[] = [];
  for (const row of rows) {
    const date = row.date || row.week || row.month || row.time || Object.values(row)[0];
    const valueRaw = row.value ?? row.interest ?? row["interest over time"] ?? Object.values(row)[1];
    const value = Number(String(valueRaw ?? "").replace(/[^\d.-]/g, ""));
    if (!date || Number.isNaN(value)) continue;
    points.push({ date: String(date), value });
  }
  const { direction, seasonality } = classifyTrendFromPoints(points);
  return {
    topic,
    points,
    direction,
    seasonality,
    relatedTopics: [],
    risingQueries: [],
    status: points.length ? "imported" : "unavailable",
    source: "Imported Google Trends / custom CSV",
    notes: points.length
      ? "Direction is computed from imported values, not from a live Google Trends API."
      : "No usable trend points found in the file.",
  };
}
