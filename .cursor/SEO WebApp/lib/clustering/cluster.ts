import type { ContentCluster, KeywordRecord, QuestionRecord } from "@/types";
import { createId, nowIso } from "@/lib/id";

function tokens(text: string) {
  return new Set(text.toLowerCase().split(/\s+/).filter((part) => part.length > 2 && !["the", "and", "for", "with"].includes(part)));
}

function similarity(a: string, b: string) {
  const left = tokens(a);
  const right = tokens(b);
  let hits = 0;
  left.forEach((token) => {
    if (right.has(token)) hits += 1;
  });
  return hits / Math.max(1, Math.min(left.size, right.size));
}

export function clusterKeywords(projectId: string, keywords: KeywordRecord[], questions: QuestionRecord[]): ContentCluster[] {
  const remaining = [...keywords].sort((a, b) => a.keyword.length - b.keyword.length);
  const clusters: ContentCluster[] = [];
  while (remaining.length > 0) {
    const pillar = remaining.shift()!;
    const members = [pillar];
    for (let i = remaining.length - 1; i >= 0; i -= 1) {
      if (similarity(pillar.keyword, remaining[i].keyword) >= 0.5) {
        members.push(remaining[i]);
        remaining.splice(i, 1);
      }
    }
    clusters.push({
      id: createId("cluster"),
      projectId,
      name: pillar.keyword.replace(/\b\w/g, (char) => char.toUpperCase()),
      pillar: pillar.keyword,
      supporting: members.map((item) => item.keyword).filter((item) => item !== pillar.keyword).slice(0, 12),
      questions: questions.filter((question) => similarity(question.question, pillar.keyword) >= 0.3).map((question) => question.question).slice(0, 8),
      commercial: members.filter((item) => item.intents.includes("commercial") || item.intents.includes("transactional")).map((item) => item.keyword),
      createdAt: nowIso(),
    });
  }
  return clusters.slice(0, 40);
}
