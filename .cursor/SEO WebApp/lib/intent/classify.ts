import type { SearchIntent } from "@/types";

const INFORMATIONAL = ["how", "what", "why", "when", "where", "who", "guide", "tutorial", "tips", "examples", "meaning", "definition", "learn", "explained"];
const COMMERCIAL = ["best", "top", "vs", "versus", "review", "compare", "comparison", "alternative", "agency", "agencies", "near me", "choose", "choosing"];
const TRANSACTIONAL = ["buy", "price", "pricing", "cost", "cheap", "quote", "book", "hire", "order", "discount", "deal", "coupon", "signup", "sign up", "subscribe"];
const NAVIGATIONAL = ["login", "log in", "sign in", "official", "website", "dashboard"];

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

export function classifyIntent(text: string): SearchIntent[] {
  const value = text.toLowerCase().trim();
  const intents = new Set<SearchIntent>();
  if (includesAny(value, INFORMATIONAL) || value.startsWith("is ") || value.startsWith("can ")) intents.add("informational");
  if (includesAny(value, COMMERCIAL)) intents.add("commercial");
  if (includesAny(value, TRANSACTIONAL)) intents.add("transactional");
  if (includesAny(value, NAVIGATIONAL)) intents.add("navigational");
  if (intents.size === 0) {
    if (/\b(agency|service|services|company|consultant)\b/.test(value)) intents.add("commercial");
    else intents.add("informational");
  }
  return [...intents];
}

export function intentLabel(intents: SearchIntent[]): string {
  if (!intents.length) return "Unclassified";
  return intents.map((intent) => intent.charAt(0).toUpperCase() + intent.slice(1)).join(" + ");
}
