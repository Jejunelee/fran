import type { KeywordRecord, KeywordSource, SearchIntent, TrendDirection } from "@/types";

export type KeywordFilters = {
  search: string;
  minVolume: number | null;
  maxVolume: number | null;
  maxKd: number | null;
  maxCompetition: number | null;
  intents: SearchIntent[];
  trend: TrendDirection | "any";
  source: KeywordSource | "any";
  length: "any" | "short" | "long";
  location: string;
  preset: string;
};

export const EMPTY_FILTERS: KeywordFilters = {
  search: "",
  minVolume: null,
  maxVolume: null,
  maxKd: null,
  maxCompetition: null,
  intents: [],
  trend: "any",
  source: "any",
  length: "any",
  location: "",
  preset: "custom",
};

export const PRESETS: Record<string, Partial<KeywordFilters>> = {
  "High Demand": { minVolume: 100, preset: "High Demand" },
  "Low Competition": { maxKd: 40, maxCompetition: 40, preset: "Low Competition" },
  "High Demand / Lower Competition": { minVolume: 100, maxKd: 40, preset: "High Demand / Lower Competition" },
  "Long Tail": { length: "long", preset: "Long Tail" },
  Commercial: { intents: ["commercial"], preset: "Commercial" },
  Informational: { intents: ["informational"], preset: "Informational" },
  Local: { preset: "Local" },
  "Social SEO": { length: "short", preset: "Social SEO" },
  Custom: { preset: "custom" },
};

export function applyFilters(keywords: KeywordRecord[], filters: KeywordFilters) {
  return keywords.filter((keyword) => {
    if (filters.search && !keyword.keyword.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.minVolume != null && (keyword.volume.value == null || keyword.volume.value < filters.minVolume)) return false;
    if (filters.maxVolume != null && (keyword.volume.value == null || keyword.volume.value > filters.maxVolume)) return false;
    if (filters.maxKd != null && (keyword.seoKd.value == null || keyword.seoKd.value > filters.maxKd)) return false;
    if (filters.maxCompetition != null && (keyword.googleAdsCompetition.value == null || keyword.googleAdsCompetition.value > filters.maxCompetition)) return false;
    if (filters.intents.length && !filters.intents.some((intent) => keyword.intents.includes(intent))) return false;
    if (filters.trend !== "any" && keyword.trend.value !== filters.trend) return false;
    if (filters.source !== "any" && keyword.source !== filters.source) return false;
    const wordCount = keyword.keyword.trim().split(/\s+/).length;
    if (filters.length === "short" && wordCount > 3) return false;
    if (filters.length === "long" && wordCount < 4) return false;
    if (filters.location && !(keyword.location ?? "").toLowerCase().includes(filters.location.toLowerCase()) && !keyword.keyword.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.preset === "Local") {
      return Boolean(keyword.location) || /\b(sydney|melbourne|australia|near me|local)\b/i.test(keyword.keyword);
    }
    return true;
  });
}

export type SortKey = "keyword" | "volume" | "seoKd" | "competition" | "cpc" | "opportunity" | "social" | "google";

export function sortKeywords(keywords: KeywordRecord[], key: SortKey, dir: "asc" | "desc") {
  const copy = [...keywords];
  copy.sort((a, b) => {
    const av = sortValue(a, key);
    const bv = sortValue(b, key);
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av === "string" && typeof bv === "string") return dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    return dir === "asc" ? Number(av) - Number(bv) : Number(bv) - Number(av);
  });
  return copy;
}

function sortValue(keyword: KeywordRecord, key: SortKey): string | number | null {
  switch (key) {
    case "keyword":
      return keyword.keyword;
    case "volume":
      return keyword.volume.value;
    case "seoKd":
      return keyword.seoKd.value;
    case "competition":
      return keyword.googleAdsCompetition.value;
    case "cpc":
      return keyword.cpc.value;
    case "opportunity":
      return keyword.opportunityScore.value;
    case "social":
      return keyword.socialRelevance.value;
    case "google":
      return keyword.googleRelevance.value;
  }
}
