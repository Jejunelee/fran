import type { ContentGoal, Platform } from "@/types";

export const PLATFORMS: { value: Platform; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "facebook", label: "Facebook" },
  { value: "pinterest", label: "Pinterest" },
  { value: "google", label: "Google" },
];

export const GOALS: { value: ContentGoal; label: string }[] = [
  { value: "awareness", label: "Awareness" },
  { value: "education", label: "Education" },
  { value: "lead_generation", label: "Lead generation" },
  { value: "product_discovery", label: "Product/service discovery" },
  { value: "sales", label: "Sales" },
  { value: "mixed", label: "Mixed" },
];

export const OPPORTUNITY_TOOLTIP =
  "This is an internal prioritization score generated from available data. It is not a search-engine ranking metric.";

export const STORAGE_KEY = "sskr.projects.v1";
export const SETTINGS_KEY = "sskr.settings.v1";
export const ACTIVE_PROJECT_KEY = "sskr.activeProject";

export const DEFAULT_SETTINGS = {
  defaultCountry: "Australia",
  defaultPlatform: "instagram" as const,
  defaultMinVolume: null as number | null,
  defaultMaxKd: null as number | null,
  preferredCurrency: "AUD",
  suggestionsEnabled: true,
};

export function platformSearchUrl(platform: Platform, query: string): string {
  const q = encodeURIComponent(query);
  switch (platform) {
    case "instagram":
      return `https://www.instagram.com/explore/search/keyword/?q=${q}`;
    case "tiktok":
      return `https://www.tiktok.com/search?q=${q}`;
    case "youtube":
      return `https://www.youtube.com/results?search_query=${q}`;
    case "linkedin":
      return `https://www.linkedin.com/search/results/content/?keywords=${q}`;
    case "facebook":
      return `https://www.facebook.com/search/posts/?q=${q}`;
    case "pinterest":
      return `https://www.pinterest.com/search/pins/?q=${q}`;
    default:
      return `https://www.google.com/search?q=${q}`;
  }
}
