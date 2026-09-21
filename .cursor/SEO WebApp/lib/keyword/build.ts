import { classifyIntent } from "@/lib/intent/classify";
import { createId, nowIso } from "@/lib/id";
import { calculateOpportunity, fitFromScore } from "@/lib/scoring/opportunity";
import { scoreBusinessRelevance, scoreGoogleRelevance, scoreLocalRelevance, scoreSocialRelevance } from "@/lib/scoring/relevance";
import type { DataStatus, KeywordRecord, KeywordSource, Platform, SearchIntent, TrendDirection } from "@/types";

export function emptyMetric<T>(source = "Not available"): { value: T | null; status: DataStatus; source: string } {
  return { value: null, status: "unavailable", source };
}

export function buildKeyword(input: {
  projectId: string;
  keyword: string;
  topic: string;
  city: string;
  country: string;
  platform: Platform;
  source: KeywordSource;
  location?: string | null;
  volume?: number | null;
  volumeStatus?: DataStatus;
  volumeSource?: string;
  volumeOriginal?: string | null;
  seoKd?: number | null;
  seoKdStatus?: DataStatus;
  competition?: number | null;
  competitionStatus?: DataStatus;
  competitionLabel?: string | null;
  cpc?: number | null;
  cpcStatus?: DataStatus;
  trend?: TrendDirection | null;
  trendStatus?: DataStatus;
  intents?: SearchIntent[];
  notes?: string;
  selected?: boolean;
}): KeywordRecord {
  const createdAt = nowIso();
  const record: KeywordRecord = {
    id: createId("kw"),
    projectId: input.projectId,
    keyword: input.keyword.toLowerCase().replace(/\s+/g, " ").trim(),
    location: input.location ?? (input.city || input.country || null),
    source: input.source,
    intents: input.intents ?? classifyIntent(input.keyword),
    volume: {
      value: input.volume ?? null,
      status: input.volume == null ? "unavailable" : (input.volumeStatus ?? "user_supplied"),
      source: input.volumeSource ?? "Not available",
      original: input.volumeOriginal,
    },
    seoKd: {
      value: input.seoKd ?? null,
      status: input.seoKd == null ? "unavailable" : (input.seoKdStatus ?? "user_supplied"),
      source: input.seoKd == null ? "SEO KD: Not available" : "User supplied",
    },
    googleAdsCompetition: {
      value: input.competition ?? null,
      status: input.competition == null ? "unavailable" : (input.competitionStatus ?? "user_supplied"),
      source: input.competition == null ? "Google Ads Competition: Not available" : "Imported or user supplied",
    },
    googleAdsCompetitionLabel: {
      value: input.competitionLabel ?? null,
      status: input.competitionLabel ? "imported" : "unavailable",
      source: "Google Ads Competition label",
    },
    cpc: {
      value: input.cpc ?? null,
      status: input.cpc == null ? "unavailable" : (input.cpcStatus ?? "user_supplied"),
      source: input.cpc == null ? "Not available" : "Imported or user supplied",
    },
    trend: {
      value: input.trend ?? null,
      status: input.trend ? (input.trendStatus ?? "estimated") : "unavailable",
      source: input.trend ? "Derived from imported/live trend series" : "Not available",
    },
    socialRelevance: { value: scoreSocialRelevance(input.keyword, input.platform), status: "estimated", source: "Heuristic social relevance" },
    googleRelevance: { value: scoreGoogleRelevance(input.keyword), status: "estimated", source: "Heuristic Google relevance" },
    businessRelevance: { value: scoreBusinessRelevance(input.keyword, input.topic), status: "estimated", source: "Token overlap with research topic" },
    localRelevance: { value: scoreLocalRelevance(input.keyword, input.city, input.country), status: "estimated", source: "Location token overlap" },
    opportunityScore: emptyMetric("Internal opportunity formula"),
    googleFit: "unknown",
    socialFit: "unknown",
    selected: input.selected ?? false,
    notes: input.notes ?? "",
    createdAt,
    updatedAt: createdAt,
  };
  record.opportunityScore = calculateOpportunity(record);
  record.googleFit = fitFromScore(record.googleRelevance.value);
  record.socialFit = fitFromScore(record.socialRelevance.value);
  return record;
}
