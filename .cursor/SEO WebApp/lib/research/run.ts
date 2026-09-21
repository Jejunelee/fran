import { clusterKeywords } from "@/lib/clustering/cluster";
import { generateContentIdea } from "@/lib/content/angles";
import { buildCalendarFromKeywords } from "@/lib/content/calendar";
import { createId, nowIso } from "@/lib/id";
import { generateKeywordCandidates, generateQuestions } from "@/lib/keyword/generate";
import { buildKeyword } from "@/lib/keyword/build";
import { getSuggestionProviders, getTrendProvider } from "@/lib/providers/registry";
import type { ResearchProject, WizardInput } from "@/types";

export type RunStage =
  | "analyzing_topic"
  | "finding_keyword_ideas"
  | "finding_questions"
  | "analyzing_trends"
  | "processing_metrics"
  | "classifying_intent"
  | "building_clusters"
  | "generating_opportunities";

export const RUN_STAGES: { id: RunStage; label: string }[] = [
  { id: "analyzing_topic", label: "Analyzing topic" },
  { id: "finding_keyword_ideas", label: "Finding keyword ideas" },
  { id: "finding_questions", label: "Finding questions" },
  { id: "analyzing_trends", label: "Analyzing trends" },
  { id: "processing_metrics", label: "Processing metrics" },
  { id: "classifying_intent", label: "Classifying intent" },
  { id: "building_clusters", label: "Building clusters" },
  { id: "generating_opportunities", label: "Generating opportunities" },
];

export async function runResearch(
  input: WizardInput,
  options: { liveSuggestions?: boolean; userId?: string | null; onStage?: (stage: RunStage) => void } = {},
): Promise<ResearchProject> {
  const createdAt = nowIso();
  const id = createId("proj");
  const location = [input.city, input.country].filter(Boolean).join(", ");
  const sources: string[] = ["Local keyword combinations", "Deterministic intent classifier"];
  const runLog: string[] = [];

  const project: ResearchProject = {
    id,
    userId: options.userId ?? null,
    name: `${input.topic}${input.city ? ` — ${input.city}` : ""}`,
    topic: input.topic,
    country: input.country,
    city: input.city,
    audience: input.audience,
    platform: input.platform,
    goal: input.goal,
    isDemo: false,
    trendDirection: "unknown",
    dataSources: sources,
    settings: { minVolume: null, maxVolume: null, maxKd: null, maxCompetition: null, keywordLength: "any" },
    keywords: [],
    questions: [],
    trends: [],
    socialSuggestions: [],
    clusters: [],
    contentIdeas: [],
    calendar: [],
    imports: [],
    runLog,
    createdAt,
    updatedAt: createdAt,
  };

  options.onStage?.("analyzing_topic");
  runLog.push(`Analyzed topic “${input.topic}” for ${location || "unspecified location"}.`);

  options.onStage?.("finding_keyword_ideas");
  const generated = generateKeywordCandidates({
    topic: input.topic,
    city: input.city,
    country: input.country,
    extraTopics: input.extraTopics,
    seeds: input.seedKeywords,
  });
  const liveQueries = [input.topic, input.city ? `${input.topic} ${input.city}` : ""].filter(Boolean);
  if (options.liveSuggestions) {
    const providers = getSuggestionProviders(true);
    const live = providers[0];
    for (const query of liveQueries) {
      const result = await live.getSuggestions(query);
      runLog.push(
        result.status === "live"
          ? `Received ${result.suggestions.length} live suggestions for “${query}”.`
          : `Live suggestions unavailable for “${query}”: ${result.error ?? "provider not available"}.`,
      );
      if (result.status === "live") {
        sources.push(result.source);
        generated.push(...result.suggestions);
      }
    }
  } else {
    runLog.push("Live suggestion provider skipped. Using generated combinations only.");
  }

  const unique = [...new Set(generated.map((item) => item.toLowerCase().trim()))];
  project.keywords = unique.map((keyword) =>
    buildKeyword({
      projectId: id,
      keyword,
      topic: input.topic,
      city: input.city,
      country: input.country,
      platform: input.platform,
      source: "generated",
      location,
    }),
  );
  runLog.push(`Stored ${project.keywords.length} keyword candidates. Volume/KD are not available unless imported.`);

  options.onStage?.("finding_questions");
  project.questions = generateQuestions(input.topic, input.city).map((item) => ({
    id: createId("q"),
    projectId: id,
    question: item.question,
    intents: item.intents,
    source: "question" as const,
    createdAt: nowIso(),
  }));
  runLog.push(`Generated ${project.questions.length} questions with rule-based intent.`);

  options.onStage?.("analyzing_trends");
  const trend = await getTrendProvider().getTrend(input.topic, input.country);
  project.trends = [
    {
      id: createId("trend"),
      projectId: id,
      topic: input.topic,
      points: trend.points,
      direction: trend.direction,
      seasonality: trend.seasonality,
      relatedTopics: trend.relatedTopics,
      risingQueries: trend.risingQueries,
      status: trend.status,
      source: trend.source,
      notes: trend.notes,
      createdAt: nowIso(),
    },
  ];
  project.trendDirection = trend.direction;
  sources.push(trend.source);
  runLog.push(trend.notes);

  options.onStage?.("processing_metrics");
  runLog.push("No paid demand provider configured. Metrics remain unavailable until CSV/XLSX import or manual entry.");

  options.onStage?.("classifying_intent");
  runLog.push("Intent classification complete (deterministic rules).");

  options.onStage?.("building_clusters");
  project.clusters = clusterKeywords(id, project.keywords, project.questions);
  runLog.push(`Built ${project.clusters.length} content clusters from token overlap.`);

  options.onStage?.("generating_opportunities");
  const selected = project.keywords.filter((keyword) => keyword.intents.includes("commercial")).slice(0, 8);
  if (selected.length === 0) selected.push(...project.keywords.slice(0, 6));
  selected.forEach((keyword) => {
    keyword.selected = true;
  });
  project.contentIdeas = selected.map((keyword) =>
    generateContentIdea({
      projectId: id,
      keyword,
      supporting: project.keywords
        .filter((item) => item.keyword !== keyword.keyword)
        .slice(0, 4)
        .map((item) => item.keyword),
      platform: input.platform,
      goal: input.goal,
      city: input.city,
    }),
  );
  project.calendar = buildCalendarFromKeywords(
    id,
    project.contentIdeas.map((idea) => ({
      keyword: project.keywords.find((item) => item.id === idea.keywordId)?.keyword ?? idea.title,
      intents: idea.intents,
      supporting: idea.supportingKeywords,
      title: idea.title,
      format: idea.format,
      cta: idea.cta,
    })),
    input.platform,
    input.goal,
  );
  project.dataSources = [...new Set(sources)];
  project.updatedAt = nowIso();
  return project;
}
