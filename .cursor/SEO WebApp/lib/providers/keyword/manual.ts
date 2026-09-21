import type { KeywordDemandProvider, KeywordIdea, KeywordMetrics } from "@/lib/providers/types";

export class ManualKeywordProvider implements KeywordDemandProvider {
  id = "manual";

  async getKeywordIdeas(seed: string): Promise<KeywordIdea[]> {
    if (!seed.trim()) return [];
    return [{ keyword: seed.trim(), source: "Manual entry", status: "user_supplied" }];
  }

  async getMetrics(): Promise<KeywordMetrics[]> {
    return [];
  }
}

export class CsvKeywordProvider implements KeywordDemandProvider {
  id = "csv";

  async getKeywordIdeas(): Promise<KeywordIdea[]> {
    return [];
  }

  async getMetrics(): Promise<KeywordMetrics[]> {
    return [];
  }
}
