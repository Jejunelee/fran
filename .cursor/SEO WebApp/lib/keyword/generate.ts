import { classifyIntent } from "@/lib/intent/classify";
import type { SearchIntent } from "@/types";

const SERVICE_MODIFIERS = ["agency", "agencies", "services", "service", "company", "consultant", "specialist", "studio"];
const INTENT_MODIFIERS = ["best", "top", "cheap", "affordable", "local", "near me", "pricing", "cost", "packages", "strategy", "tips", "ideas", "for small business"];

function unique(values: string[]) {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    const key = value.toLowerCase().replace(/\s+/g, " ").trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(key);
  }
  return result;
}

export function generateKeywordCandidates(input: {
  topic: string;
  city?: string;
  country?: string;
  extraTopics?: string[];
  seeds?: string[];
}) {
  const topic = input.topic.trim();
  const city = input.city?.trim() ?? "";
  const bases = unique([topic, ...(input.extraTopics ?? []), ...(input.seeds ?? [])]);
  const out: string[] = [];
  for (const base of bases) {
    out.push(base);
    if (city) {
      out.push(`${base} ${city}`, `${city} ${base}`);
    }
    for (const modifier of SERVICE_MODIFIERS) {
      out.push(`${base} ${modifier}`);
      if (city) out.push(`${base} ${modifier} ${city}`, `${city} ${base} ${modifier}`);
    }
    for (const modifier of INTENT_MODIFIERS) {
      out.push(`${base} ${modifier}`);
      if (city) out.push(`${base} ${modifier} ${city}`);
    }
    out.push(`${base} tips for small business${city ? ` ${city}` : ""}`);
    out.push(`how much does a ${base} cost${city ? ` ${city}` : ""}`);
    out.push(`best ${base} strategy for small businesses`);
  }
  return unique(out).slice(0, 250);
}

export function generateQuestions(topic: string, city?: string): { question: string; intents: SearchIntent[] }[] {
  const questions = [
    `what is ${topic}`,
    `how does ${topic} work`,
    `how to start ${topic}`,
    `how much does ${topic} cost`,
    `is ${topic} worth it`,
    `how do I choose a ${topic}`,
    `what does a ${topic} do`,
    `how long does ${topic} take`,
    `common ${topic} mistakes`,
    `best ${topic} strategy for beginners`,
  ];
  if (city) {
    questions.push(`best ${topic} in ${city}`, `how to choose a ${topic} in ${city}`, `how much does a ${topic} cost in ${city}`);
  }
  return unique(questions).map((question) => ({ question, intents: classifyIntent(question) }));
}
