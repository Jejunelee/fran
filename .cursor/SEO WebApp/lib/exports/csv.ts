import * as XLSX from "xlsx";
import type { ResearchProject } from "@/types";

export function keywordsToCsv(project: ResearchProject): string {
  const headers = [
    "Keyword",
    "Volume",
    "Volume status",
    "SEO KD",
    "SEO KD status",
    "Google Ads Competition",
    "Competition status",
    "CPC",
    "Trend",
    "Intent",
    "Social relevance",
    "Google relevance",
    "Opportunity Score",
    "Opportunity status",
    "Source",
    "Location",
  ];
  const lines = [headers.join(",")];
  for (const keyword of project.keywords) {
    const row = [
      keyword.keyword,
      keyword.volume.value ?? "",
      keyword.volume.status,
      keyword.seoKd.value ?? "",
      keyword.seoKd.status,
      keyword.googleAdsCompetition.value ?? keyword.googleAdsCompetitionLabel.value ?? "",
      keyword.googleAdsCompetition.status,
      keyword.cpc.value ?? "",
      keyword.trend.value ?? "",
      keyword.intents.join(" + "),
      keyword.socialRelevance.value ?? "",
      keyword.googleRelevance.value ?? "",
      keyword.opportunityScore.value ?? "",
      keyword.opportunityScore.status,
      keyword.source,
      keyword.location ?? "",
    ].map(csvCell);
    lines.push(row.join(","));
  }
  return lines.join("\n");
}

function csvCell(value: string | number): string {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

export function downloadText(filename: string, content: string, type = "text/csv;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function downloadXlsx(project: ResearchProject) {
  const workbook = XLSX.utils.book_new();
  const keywords = project.keywords.map((keyword) => ({
    Keyword: keyword.keyword,
    Volume: keyword.volume.value,
    "Volume status": keyword.volume.status,
    "SEO KD": keyword.seoKd.value,
    "SEO KD status": keyword.seoKd.status,
    "Google Ads Competition": keyword.googleAdsCompetition.value,
    CPC: keyword.cpc.value,
    Trend: keyword.trend.value,
    Intent: keyword.intents.join(" + "),
    "Social relevance": keyword.socialRelevance.value,
    "Google relevance": keyword.googleRelevance.value,
    "Opportunity Score": keyword.opportunityScore.value,
    Source: keyword.source,
    Location: keyword.location,
  }));
  const questions = project.questions.map((item) => ({
    Question: item.question,
    Intent: item.intents.join(" + "),
    Source: item.source,
  }));
  const trends = project.trends.flatMap((series) =>
    series.points.map((point) => ({
      Topic: series.topic,
      Date: point.date,
      Interest: point.value,
      Status: series.status,
      Source: series.source,
    })),
  );
  const ideas = project.contentIdeas.map((idea) => ({
    Title: idea.title,
    Hook: idea.hook,
    Angle: idea.angle,
    Format: idea.format,
    CTA: idea.cta,
    Platform: idea.platform,
  }));
  const clusters = project.clusters.map((cluster) => ({
    Cluster: cluster.name,
    Pillar: cluster.pillar,
    Supporting: cluster.supporting.join("; "),
    Questions: cluster.questions.join("; "),
    Commercial: cluster.commercial.join("; "),
  }));
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(keywords.length ? keywords : [{ Keyword: "" }]), "Keywords");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(questions.length ? questions : [{ Question: "" }]), "Questions");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(trends.length ? trends : [{ Topic: "" }]), "Trends");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(ideas.length ? ideas : [{ Title: "" }]), "Content Ideas");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(clusters.length ? clusters : [{ Cluster: "" }]), "Clusters");
  XLSX.writeFile(workbook, `${slug(project.name)}.xlsx`);
}

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "research";
}
