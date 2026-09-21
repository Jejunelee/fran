import { CsvKeywordProvider, ManualKeywordProvider } from "@/lib/providers/keyword/manual";
import { UnavailableTrendProvider } from "@/lib/providers/trend/csv";
import { GoogleSuggestProvider, LocalSuggestionProvider } from "@/lib/providers/suggestions";
import { deterministicAI } from "@/lib/providers/ai/deterministic";
import type { AIProvider, KeywordDemandProvider, SuggestionProvider, TrendProvider } from "@/lib/providers/types";

export function getTrendProvider(): TrendProvider {
  return new UnavailableTrendProvider();
}

export function getKeywordProvider(): KeywordDemandProvider {
  return new ManualKeywordProvider();
}

export function getCsvKeywordProvider(): KeywordDemandProvider {
  return new CsvKeywordProvider();
}

export function getSuggestionProviders(liveEnabled: boolean): SuggestionProvider[] {
  const local = new LocalSuggestionProvider();
  if (!liveEnabled) return [local];
  return [new GoogleSuggestProvider(), local];
}

export function getAIProvider(): AIProvider {
  return deterministicAI;
}
