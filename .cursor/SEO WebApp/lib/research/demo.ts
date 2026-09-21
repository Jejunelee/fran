import { clusterKeywords } from "@/lib/clustering/cluster";
import { generateContentIdea } from "@/lib/content/angles";
import { buildCalendarFromKeywords } from "@/lib/content/calendar";
import { createId, nowIso } from "@/lib/id";
import { buildKeyword } from "@/lib/keyword/build";
import { generateQuestions } from "@/lib/keyword/generate";
import type { ResearchProject } from "@/types";

export function createDemoProject(): ResearchProject {
  const createdAt = nowIso();
  const id = "11111111-1111-4111-8111-111111111111";
  const topic = "digital marketing agency";
  const city = "Sydney";
  const country = "Australia";
  const platform = "instagram" as const;
  const goal = "lead_generation" as const;

  const samples = [
    { keyword: "digital marketing sydney" },
    { keyword: "digital marketing agency sydney" },
    { keyword: "seo agency sydney" },
    { keyword: "social media marketing agency sydney" },
    { keyword: "how does seo work" },
    { keyword: "how to choose a digital marketing agency" },
    { keyword: "digital marketing tips for small business sydney" },
    { keyword: "how much does a digital marketing agency cost sydney" },
  ];

  const keywords = samples.map((sample) => {
    const record = buildKeyword({
      projectId: id,
      keyword: sample.keyword,
      topic,
      city,
      country,
      platform,
      source: "demo",
      location: "Sydney, Australia",
      notes: "Demo data — not live search metrics.",
    });
    record.volume = { value: null, status: "demo", source: "Demo data — not live search metrics." };
    record.seoKd = { value: null, status: "demo", source: "Demo data — SEO KD not available." };
    record.googleAdsCompetition = { value: null, status: "demo", source: "Demo data — Google Ads Competition not available." };
    record.cpc = { value: null, status: "demo", source: "Demo data — not live search metrics." };
    record.opportunityScore = {
      value: null,
      status: "insufficient",
      source: "Insufficient data — demo keywords have no real volume/KD.",
    };
    return record;
  });

  const questions = generateQuestions(topic, city).map((item) => ({
    id: createId("q"),
    projectId: id,
    question: item.question,
    intents: item.intents,
    source: "demo" as const,
    createdAt,
  }));

  const project: ResearchProject = {
    id,
    userId: null,
    name: "Digital Marketing Agency Sydney",
    topic,
    country,
    city,
    audience: "Small businesses looking for an agency",
    platform,
    goal,
    isDemo: true,
    trendDirection: "unknown",
    dataSources: ["Demo seed (no live metrics)", "Deterministic intent classifier"],
    settings: { minVolume: null, maxVolume: null, maxKd: null, maxCompetition: null, keywordLength: "any" },
    keywords,
    questions,
    trends: [
      {
        id: createId("trend"),
        projectId: id,
        topic,
        points: [],
        direction: "unknown",
        seasonality: "Unknown",
        relatedTopics: [],
        risingQueries: [],
        status: "demo",
        source: "Demo data — not live search metrics.",
        notes: "Trend data unavailable. You can upload Google Trends data or continue without it.",
        createdAt,
      },
    ],
    socialSuggestions: [
      {
        id: createId("soc"),
        projectId: id,
        phrase: "digital marketing sydney",
        platform,
        group: "Local",
        intents: ["commercial"],
        socialRelevance: { value: 72, status: "estimated", source: "Heuristic social relevance" },
        createdAt,
      },
    ],
    clusters: [],
    contentIdeas: [],
    calendar: [],
    imports: [],
    runLog: ["Demo project loaded. Metrics are labeled demo and are not live search data."],
    createdAt,
    updatedAt: createdAt,
  };

  project.clusters = clusterKeywords(id, keywords, questions);
  const selected = keywords.slice(0, 5);
  selected.forEach((item) => {
    item.selected = true;
  });
  project.contentIdeas = selected.map((keyword) =>
    generateContentIdea({
      projectId: id,
      keyword,
      supporting: keywords.filter((item) => item.id !== keyword.id).slice(0, 3).map((item) => item.keyword),
      platform,
      goal,
      city,
    }),
  );
  project.calendar = buildCalendarFromKeywords(
    id,
    project.contentIdeas.map((idea) => ({
      keyword: keywords.find((item) => item.id === idea.keywordId)?.keyword ?? idea.title,
      intents: idea.intents,
      supporting: idea.supportingKeywords,
      title: idea.title,
      format: idea.format,
      cta: idea.cta,
    })),
    platform,
    goal,
  );
  return project;
}
