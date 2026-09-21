"use client";

import { Button } from "@/components/ui/forms";
import { StatusBadge } from "@/components/ui/status-badge";
import { useAppStore } from "@/components/providers/app-provider";
import { downloadText, downloadXlsx, keywordsToCsv } from "@/lib/exports/csv";
import { opportunityFormulaText } from "@/lib/scoring/opportunity";
import { nowIso } from "@/lib/id";
import { saveProjectToSupabase } from "@/lib/supabase/actions";
import { useState } from "react";

export function ReportWorkspace() {
  const { project, setProject, supabaseConfigured } = useAppStore();
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  if (!project) return <p>Create a research project first.</p>;
  const trend = project.trends[0];
  const opportunities = project.keywords.filter((item) => item.opportunityScore.value != null);

  async function saveReport() {
    const next = {
      ...project,
      runLog: [...project.runLog, `Report saved locally at ${nowIso()}`],
    };
    setProject(next);
    if (supabaseConfigured) {
      const result = await saveProjectToSupabase(next);
      setSaveMsg(result.ok ? "Report saved to Supabase." : result.error ?? "Saved locally only.");
    } else {
      setSaveMsg("Report saved in this browser. Configure Supabase to persist across devices.");
    }
  }

  return (
    <div className="space-y-6 print:p-0">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <h1 className="text-2xl font-semibold">Research report</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => downloadText(`${project.name}.csv`, keywordsToCsv(project))}>
            Export CSV
          </Button>
          <Button variant="secondary" onClick={() => downloadXlsx(project)}>
            Export XLSX
          </Button>
          <Button variant="secondary" onClick={() => window.print()}>
            Print report
          </Button>
          <Button onClick={() => void saveReport()}>Save report</Button>
        </div>
      </div>
      {saveMsg ? <p className="text-sm text-violet-800 print:hidden">{saveMsg}</p> : null}
      {project.isDemo ? (
        <div className="rounded-lg border border-fuchsia-200 bg-fuchsia-50 p-3 text-sm">Demo data — not live search metrics.</div>
      ) : null}
      <article className="space-y-8 rounded-xl border border-slate-200 bg-white p-6">
        <header>
          <p className="text-xs uppercase tracking-wide text-violet-700">Social SEO Keyword Research</p>
          <h2 className="text-3xl font-semibold">{project.name}</h2>
        </header>
        <section>
          <h3 className="mb-2 text-lg font-medium">1. Executive Summary</h3>
          <p className="text-sm leading-6 text-slate-700">
            Research on “{project.topic}” for {project.city ? `${project.city}, ` : ""}
            {project.country}, aimed at {project.audience || "the stated audience"} on {project.platform} with a {project.goal.replaceAll("_", " ")} goal.
            {project.keywords.length} keyword candidates and {project.questions.length} questions were generated.
            Search volume and SEO KD are only present when imported or entered. Live paid SEO APIs were not used.
          </p>
        </section>
        <section>
          <h3 className="mb-2 text-lg font-medium">2. Topic Trend</h3>
          <p className="text-sm text-slate-700">
            Direction: {project.trendDirection}. {trend ? <StatusBadge status={trend.status} /> : null} {trend?.notes}
          </p>
        </section>
        <section>
          <h3 className="mb-2 text-lg font-medium">3. Keyword Demand</h3>
          <p className="text-sm text-slate-700">
            {project.keywords.filter((item) => item.volume.value != null).length} keywords have volume values (imported or user supplied).
            The rest are labeled Not available.
          </p>
        </section>
        <section>
          <h3 className="mb-2 text-lg font-medium">4. Keyword Opportunities</h3>
          <p className="mb-2 text-xs text-slate-500">{opportunityFormulaText()}</p>
          <ul className="list-disc pl-5 text-sm">
            {opportunities.slice(0, 15).map((item) => (
              <li key={item.id}>
                {item.keyword} — opportunity {item.opportunityScore.value} ({item.opportunityScore.status})
              </li>
            ))}
            {!opportunities.length ? <li>Insufficient data to score opportunities.</li> : null}
          </ul>
        </section>
        <section>
          <h3 className="mb-2 text-lg font-medium">5. Search Intent</h3>
          <p className="text-sm">
            Commercial: {project.keywords.filter((item) => item.intents.includes("commercial")).length}. Informational:{" "}
            {project.keywords.filter((item) => item.intents.includes("informational")).length}. Transactional:{" "}
            {project.keywords.filter((item) => item.intents.includes("transactional")).length}.
          </p>
        </section>
        <section>
          <h3 className="mb-2 text-lg font-medium">6. Social Search Suggestions</h3>
          <ul className="list-disc pl-5 text-sm">
            {project.socialSuggestions.slice(0, 20).map((item) => (
              <li key={item.id}>{item.phrase} ({item.group})</li>
            ))}
            {!project.socialSuggestions.length ? <li>None pasted yet.</li> : null}
          </ul>
        </section>
        <section>
          <h3 className="mb-2 text-lg font-medium">7. Content Opportunities</h3>
          <ul className="list-disc pl-5 text-sm">
            {project.contentIdeas.map((idea) => (
              <li key={idea.id}>{idea.title} — {idea.format}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="mb-2 text-lg font-medium">8. Content Clusters</h3>
          <ul className="list-disc pl-5 text-sm">
            {project.clusters.slice(0, 12).map((cluster) => (
              <li key={cluster.id}>
                {cluster.name}: {cluster.pillar}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="mb-2 text-lg font-medium">9. Recommended Content Calendar</h3>
          <ul className="list-disc pl-5 text-sm">
            {project.calendar.map((item) => (
              <li key={item.id}>
                {item.dateLabel}: {item.topic} ({item.format})
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="mb-2 text-lg font-medium">10. Data Sources / Limitations</h3>
          <ul className="list-disc pl-5 text-sm">
            {project.dataSources.map((source) => (
              <li key={source}>{source}</li>
            ))}
            <li>No SEMrush, Ahrefs, or Google Ads API was required or used for core functionality.</li>
            <li>Opportunity Score is an internal prioritization score, not a search-engine ranking metric.</li>
          </ul>
        </section>
      </article>
    </div>
  );
}
