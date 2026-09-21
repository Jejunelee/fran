import type { SuggestionProvider, SuggestionResult } from "@/lib/providers/types";
import { generateKeywordCandidates } from "@/lib/keyword/generate";

export class LocalSuggestionProvider implements SuggestionProvider {
  id = "local-combinations";

  async getSuggestions(query: string): Promise<SuggestionResult> {
    const suggestions = generateKeywordCandidates({ topic: query }).slice(0, 12);
    return {
      query,
      suggestions,
      status: "generated",
      source: "Local keyword combinations",
    };
  }
}

const cache = new Map<string, { at: number; result: SuggestionResult }>();
const CACHE_MS = 10 * 60 * 1000;
let lastRequestAt = 0;
const MIN_GAP_MS = 400;

async function throttle() {
  const wait = Math.max(0, MIN_GAP_MS - (Date.now() - lastRequestAt));
  if (wait) await new Promise((resolve) => setTimeout(resolve, wait));
  lastRequestAt = Date.now();
}

export class GoogleSuggestProvider implements SuggestionProvider {
  id = "google-suggest";

  async getSuggestions(query: string): Promise<SuggestionResult> {
    const key = query.toLowerCase().trim();
    const cached = cache.get(key);
    if (cached && Date.now() - cached.at < CACHE_MS) return cached.result;

    await throttle();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    try {
      const url =
        typeof window !== "undefined"
          ? `/api/suggestions?q=${encodeURIComponent(query)}`
          : `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`;
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Suggest endpoint returned ${response.status}`);
      }
      const data = (await response.json()) as SuggestionResult | [string, string[]];
      const result: SuggestionResult = Array.isArray(data)
        ? {
            query,
            suggestions: Array.isArray(data[1]) ? data[1].map(String) : [],
            status: "live",
            source: "Google Suggest (public autocomplete)",
          }
        : {
            query: data.query ?? query,
            suggestions: data.suggestions ?? [],
            status: data.status ?? "live",
            source: data.source ?? "Google Suggest (public autocomplete)",
            error: data.error,
          };
      cache.set(key, { at: Date.now(), result });
      return result;
    } catch (error) {
      return {
        query,
        suggestions: [],
        status: "unavailable",
        source: "Google Suggest (public autocomplete)",
        error:
          error instanceof Error
            ? `${error.message}. You can continue with generated combinations or paste suggestions.`
            : "Suggest request failed.",
      };
    } finally {
      clearTimeout(timeout);
    }
  }
}
