export type DataStatus =
  | "live"
  | "imported"
  | "user_supplied"
  | "estimated"
  | "generated"
  | "unavailable"
  | "demo"
  | "insufficient";

export type Platform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "linkedin"
  | "facebook"
  | "pinterest"
  | "google";

export type ContentGoal =
  | "awareness"
  | "education"
  | "lead_generation"
  | "product_discovery"
  | "sales"
  | "mixed";

export type SearchIntent = "informational" | "navigational" | "commercial" | "transactional";
export type TrendDirection = "rising" | "falling" | "stable" | "seasonal" | "unknown";
export type FitLevel = "strong" | "potential" | "weak" | "unknown";
export type KeywordSource =
  | "generated"
  | "suggestion"
  | "related"
  | "question"
  | "user"
  | "csv"
  | "xlsx"
  | "social_paste"
  | "demo";

export type Metric<T> = {
  value: T | null;
  status: DataStatus;
  source: string;
  original?: string | null;
};

export type KeywordRecord = {
  id: string;
  projectId: string;
  keyword: string;
  location: string | null;
  source: KeywordSource;
  intents: SearchIntent[];
  volume: Metric<number>;
  seoKd: Metric<number>;
  googleAdsCompetition: Metric<number>;
  googleAdsCompetitionLabel: Metric<string>;
  cpc: Metric<number>;
  trend: Metric<TrendDirection>;
  socialRelevance: Metric<number>;
  googleRelevance: Metric<number>;
  businessRelevance: Metric<number>;
  localRelevance: Metric<number>;
  opportunityScore: Metric<number>;
  googleFit: FitLevel;
  socialFit: FitLevel;
  selected: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type QuestionRecord = {
  id: string;
  projectId: string;
  question: string;
  intents: SearchIntent[];
  source: KeywordSource;
  createdAt: string;
};

export type TrendPoint = { date: string; value: number };

export type TrendSeries = {
  id: string;
  projectId: string;
  topic: string;
  points: TrendPoint[];
  direction: TrendDirection;
  seasonality: string;
  relatedTopics: string[];
  risingQueries: string[];
  status: DataStatus;
  source: string;
  notes: string;
  createdAt: string;
};

export type SocialSuggestion = {
  id: string;
  projectId: string;
  phrase: string;
  platform: Platform;
  group: string;
  intents: SearchIntent[];
  socialRelevance: Metric<number>;
  createdAt: string;
};

export type ContentIdea = {
  id: string;
  projectId: string;
  keywordId: string;
  title: string;
  hook: string;
  angle: string;
  format: string;
  platform: Platform;
  goal: ContentGoal;
  cta: string;
  supportingKeywords: string[];
  intents: SearchIntent[];
  createdAt: string;
};

export type ContentCluster = {
  id: string;
  projectId: string;
  name: string;
  pillar: string;
  supporting: string[];
  questions: string[];
  commercial: string[];
  createdAt: string;
};

export type CalendarItem = {
  id: string;
  projectId: string;
  week: number;
  dateLabel: string;
  topic: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  intents: SearchIntent[];
  platform: Platform;
  format: string;
  goal: ContentGoal;
  cta: string;
};

export type ImportRecord = {
  id: string;
  projectId: string;
  fileName: string;
  kind: "keywords" | "trends";
  rowCount: number;
  createdAt: string;
};

export type ResearchSettings = {
  minVolume: number | null;
  maxVolume: number | null;
  maxKd: number | null;
  maxCompetition: number | null;
  keywordLength: "any" | "short" | "long";
};

export type ResearchProject = {
  id: string;
  userId: string | null;
  name: string;
  topic: string;
  country: string;
  city: string;
  audience: string;
  platform: Platform;
  goal: ContentGoal;
  isDemo: boolean;
  trendDirection: TrendDirection;
  dataSources: string[];
  settings: ResearchSettings;
  keywords: KeywordRecord[];
  questions: QuestionRecord[];
  trends: TrendSeries[];
  socialSuggestions: SocialSuggestion[];
  clusters: ContentCluster[];
  contentIdeas: ContentIdea[];
  calendar: CalendarItem[];
  imports: ImportRecord[];
  runLog: string[];
  createdAt: string;
  updatedAt: string;
};

export type AppSettings = {
  defaultCountry: string;
  defaultPlatform: Platform;
  defaultMinVolume: number | null;
  defaultMaxKd: number | null;
  preferredCurrency: string;
  suggestionsEnabled: boolean;
};

export type WizardInput = {
  topic: string;
  country: string;
  city: string;
  audience: string;
  platform: Platform;
  goal: ContentGoal;
  extraTopics: string[];
  seedKeywords: string[];
};
