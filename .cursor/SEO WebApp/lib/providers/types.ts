import type { DataStatus, SearchIntent, TrendDirection, TrendPoint } from "@/types";

export type SuggestionResult = {
  query: string;
  suggestions: string[];
  status: DataStatus;
  source: string;
  error?: string;
};

export interface SuggestionProvider {
  id: string;
  getSuggestions(query: string): Promise<SuggestionResult>;
}

export type KeywordIdea = { keyword: string; source: string; status: DataStatus };
export type KeywordMetrics = {
  keyword: string;
  volume: number | null;
  competition: number | null;
  kd: number | null;
  cpc: number | null;
  status: DataStatus;
  source: string;
};

export interface KeywordDemandProvider {
  id: string;
  getKeywordIdeas(seed: string): Promise<KeywordIdea[]>;
  getMetrics(keywords: string[]): Promise<KeywordMetrics[]>;
}

export type TrendResult = {
  topic: string;
  points: TrendPoint[];
  direction: TrendDirection;
  seasonality: string;
  relatedTopics: string[];
  risingQueries: string[];
  status: DataStatus;
  source: string;
  notes: string;
};

export interface TrendProvider {
  id: string;
  getTrend(topic: string, geo?: string): Promise<TrendResult>;
}

export interface SocialSuggestionProvider {
  id: string;
  parsePasted(raw: string): string[];
}

export interface AIProvider {
  id: string;
  classifyIntent(text: string): Promise<SearchIntent[]>;
  clusterKeywords(keywords: string[]): Promise<{ name: string; members: string[] }[]>;
  generateContentIdeas(input: {
    keyword: string;
    intents: SearchIntent[];
    platform: string;
    goal: string;
  }): Promise<{ title: string; hook: string; angle: string; cta: string }>;
}
