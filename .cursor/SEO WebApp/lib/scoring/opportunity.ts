import type { FitLevel, KeywordRecord, Metric, TrendDirection } from "@/types";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function calculateOpportunity(keyword: KeywordRecord): Metric<number> {
  const demand = keyword.volume.value == null ? null : clamp(Math.log10(keyword.volume.value + 1) * 25, 0, 100);
  const competition =
    keyword.seoKd.value ?? keyword.googleAdsCompetition.value ?? null;
  const trend = trendScore(keyword.trend.value);
  const parts: { weight: number; score: number }[] = [];
  if (demand != null) parts.push({ weight: 0.28, score: demand });
  if (competition != null) parts.push({ weight: 0.22, score: 100 - clamp(competition, 0, 100) });
  if (trend != null) parts.push({ weight: 0.12, score: (trend + 100) / 2 });
  if (keyword.businessRelevance.value != null) parts.push({ weight: 0.16, score: keyword.businessRelevance.value });
  if (keyword.socialRelevance.value != null) parts.push({ weight: 0.12, score: keyword.socialRelevance.value });
  if (keyword.localRelevance.value != null) parts.push({ weight: 0.1, score: keyword.localRelevance.value });
  if ((demand == null && competition == null && trend == null) || parts.length < 2) {
    return { value: null, status: "insufficient", source: "Internal opportunity formula" };
  }
  const weightSum = parts.reduce((sum, part) => sum + part.weight, 0);
  const score = parts.reduce((sum, part) => sum + (part.score * part.weight) / weightSum, 0);
  return { value: Math.round(clamp(score, 0, 100)), status: "estimated", source: "Internal opportunity formula" };
}

function trendScore(direction: TrendDirection | null): number | null {
  if (!direction || direction === "unknown") return null;
  if (direction === "rising") return 70;
  if (direction === "seasonal") return 20;
  if (direction === "stable") return 0;
  return -60;
}

export function fitFromScore(score: number | null): FitLevel {
  if (score == null) return "unknown";
  if (score >= 70) return "strong";
  if (score >= 40) return "potential";
  return "weak";
}

export function opportunityFormulaText() {
  return "Opportunity = weighted mix of available Demand (log volume), inverse Competition/KD, Trend, Business, Social, and Local relevance. Missing metrics are omitted. Not shown unless demand, competition, or trend data exists.";
}
