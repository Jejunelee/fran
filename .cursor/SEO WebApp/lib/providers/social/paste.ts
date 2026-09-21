export function parsePastedSuggestions(raw: string): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const line of raw.split(/\r?\n|,|;|\t/)) {
    const value = line.replace(/^[-*•\d.)\s]+/, "").replace(/\s+/g, " ").trim().toLowerCase();
    if (value.length < 2 || seen.has(value)) continue;
    seen.add(value);
    result.push(value);
  }
  return result;
}

export function groupSuggestion(phrase: string): string {
  if (/^(how|what|why|when|where|who)\b/.test(phrase)) return "Questions";
  if (/\b(sydney|melbourne|australia|london|nyc|near me)\b/.test(phrase)) return "Local";
  if (/\b(best|review|vs|recommend)\b/.test(phrase)) return "Commercial";
  return "Topic variants";
}
