import type { Platform } from "@/types";

function tokens(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((part) => part.length > 1);
}

function overlap(a: string[], b: string[]) {
  if (!a.length || !b.length) return 0;
  const set = new Set(b);
  return a.filter((token) => set.has(token)).length / Math.max(a.length, 1);
}

export function scoreBusinessRelevance(keyword: string, topic: string) {
  return Math.round(Math.min(100, overlap(tokens(keyword), tokens(topic)) * 120));
}

export function scoreLocalRelevance(keyword: string, city: string, country: string) {
  const value = keyword.toLowerCase();
  let score = 20;
  if (city && value.includes(city.toLowerCase())) score += 50;
  if (country && value.includes(country.toLowerCase())) score += 25;
  if (/\b(near me|local)\b/.test(value)) score += 15;
  return Math.min(100, score);
}

export function scoreGoogleRelevance(keyword: string) {
  const value = keyword.toLowerCase();
  let score = 45;
  if (keyword.split(/\s+/).length >= 3) score += 15;
  if (/^(how|what|why|when|where|who|best|vs)\b/.test(value)) score += 20;
  if (/\b(cost|pricing|agency|service|review)\b/.test(value)) score += 10;
  return Math.min(100, score);
}

export function scoreSocialRelevance(keyword: string, platform: Platform) {
  const words = keyword.trim().split(/\s+/).length;
  let score = 40;
  if (words <= 6) score += 25;
  if (words > 10) score -= 20;
  if (/\b(login|pricing|buy online|official website)\b/i.test(keyword)) score -= 25;
  if (platform === "linkedin" && /\b(b2b|agency|strategy|lead)\b/i.test(keyword)) score += 15;
  if ((platform === "tiktok" || platform === "instagram") && /\b(tips|how to|ideas|aesthetic)\b/i.test(keyword)) score += 15;
  return Math.max(0, Math.min(100, score));
}
