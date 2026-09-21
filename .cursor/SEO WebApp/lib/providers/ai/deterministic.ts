import { clusterKeywords } from "@/lib/clustering/cluster";
import { generateContentIdea } from "@/lib/content/angles";
import { classifyIntent } from "@/lib/intent/classify";
import type { AIProvider } from "@/lib/providers/types";
import type { KeywordRecord, SearchIntent } from "@/types";

function placeholderKeyword(keyword: string, intents: SearchIntent[]): KeywordRecord {
  return {
    id: keyword,
    projectId: "tmp",
    keyword,
    location: null,
    source: "generated",
    intents,
    volume: { value: null, status: "unavailable", source: "none" },
    seoKd: { value: null, status: "unavailable", source: "none" },
    googleAdsCompetition: { value: null, status: "unavailable", source: "none" },
    googleAdsCompetitionLabel: { value: null, status: "unavailable", source: "none" },
    cpc: { value: null, status: "unavailable", source: "none" },
    trend: { value: null, status: "unavailable", source: "none" },
    socialRelevance: { value: null, status: "unavailable", source: "none" },
    googleRelevance: { value: null, status: "unavailable", source: "none" },
    businessRelevance: { value: null, status: "unavailable", source: "none" },
    localRelevance: { value: null, status: "unavailable", source: "none" },
    opportunityScore: { value: null, status: "insufficient", source: "none" },
    googleFit: "unknown",
    socialFit: "unknown",
    selected: false,
    notes: "",
    createdAt: "",
    updatedAt: "",
  };
}

export const deterministicAI: AIProvider = {
  id: "deterministic",
  async classifyIntent(text: string): Promise<SearchIntent[]> {
    return classifyIntent(text);
  },
  async clusterKeywords(keywords: string[]) {
    const fake = keywords.map((keyword) => placeholderKeyword(keyword, classifyIntent(keyword)));
    return clusterKeywords("tmp", fake, []).map((cluster) => ({
      name: cluster.name,
      members: [cluster.pillar, ...cluster.supporting],
    }));
  },
  async generateContentIdeas(input) {
    const idea = generateContentIdea({
      projectId: "tmp",
      keyword: placeholderKeyword(input.keyword, input.intents),
      supporting: [],
      platform: "instagram",
      goal: "education",
    });
    return { title: idea.title, hook: idea.hook, angle: idea.angle, cta: idea.cta };
  },
};
