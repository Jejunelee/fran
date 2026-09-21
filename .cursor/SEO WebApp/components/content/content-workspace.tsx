"use client";

import { Button, Card } from "@/components/ui/forms";
import { useAppStore } from "@/components/providers/app-provider";
import { generateContentIdea } from "@/lib/content/angles";
import { buildCalendarFromKeywords } from "@/lib/content/calendar";
import { clusterKeywords } from "@/lib/clustering/cluster";
import { intentLabel } from "@/lib/intent/classify";

export function ContentWorkspace() {
  const { project, setProject } = useAppStore();
  if (!project) return <p>Create a research project first.</p>;

  const selected = project.keywords.filter((item) => item.selected);

  function rebuild() {
    const chosen = selected.length ? selected : project.keywords.slice(0, 8);
    const ideas = chosen.map((keyword) =>
      generateContentIdea({
        projectId: project.id,
        keyword,
        supporting: project.keywords.filter((item) => item.id !== keyword.id).slice(0, 4).map((item) => item.keyword),
        platform: project.platform,
        goal: project.goal,
        city: project.city,
      }),
    );
    const clusters = clusterKeywords(project.id, project.keywords, project.questions);
    const calendar = buildCalendarFromKeywords(
      project.id,
      ideas.map((idea) => ({
        keyword: project.keywords.find((item) => item.id === idea.keywordId)?.keyword ?? idea.title,
        intents: idea.intents,
        supporting: idea.supportingKeywords,
        title: idea.title,
        format: idea.format,
        cta: idea.cta,
      })),
      project.platform,
      project.goal,
    );
    setProject({ ...project, contentIdeas: ideas, clusters, calendar });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Content opportunities</h1>
          <p className="text-sm text-slate-600">Deterministic titles, hooks, and clusters. No AI provider is required.</p>
        </div>
        <Button onClick={rebuild}>Rebuild ideas and clusters</Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {project.contentIdeas.map((idea) => (
          <Card key={idea.id}>
            <p className="text-xs uppercase text-slate-500">{idea.format} · {intentLabel(idea.intents)}</p>
            <h2 className="mt-1 text-lg font-medium">{idea.title}</h2>
            <p className="mt-2 text-sm"><span className="font-medium">Hook:</span> {idea.hook}</p>
            <p className="mt-2 text-sm"><span className="font-medium">Angle:</span> {idea.angle}</p>
            <p className="mt-2 text-sm"><span className="font-medium">CTA:</span> {idea.cta}</p>
            <p className="mt-2 text-xs text-slate-500">Supporting: {idea.supportingKeywords.join(", ") || "None"}</p>
          </Card>
        ))}
      </div>
      <div className="space-y-3">
        <h2 className="font-medium">Content clusters</h2>
        {project.clusters.map((cluster) => (
          <Card key={cluster.id}>
            <h3 className="font-medium">{cluster.name}</h3>
            <p className="text-sm">Pillar: {cluster.pillar}</p>
            <p className="text-sm text-slate-600">Supporting: {cluster.supporting.join(", ") || "None"}</p>
            <p className="text-sm text-slate-600">Questions: {cluster.questions.join("; ") || "None"}</p>
            <p className="text-sm text-slate-600">Commercial: {cluster.commercial.join(", ") || "None"}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function CalendarWorkspace() {
  const { project } = useAppStore();
  if (!project) return <p>Create a research project first.</p>;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Content calendar</h1>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-[1000px] w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Topic</th>
              <th className="p-3">Primary keyword</th>
              <th className="p-3">Supporting keywords</th>
              <th className="p-3">Intent</th>
              <th className="p-3">Platform</th>
              <th className="p-3">Format</th>
              <th className="p-3">Goal</th>
              <th className="p-3">CTA</th>
            </tr>
          </thead>
          <tbody>
            {project.calendar.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="p-3">{item.dateLabel}</td>
                <td className="p-3">{item.topic}</td>
                <td className="p-3">{item.primaryKeyword}</td>
                <td className="p-3">{item.supportingKeywords.join(", ")}</td>
                <td className="p-3">{intentLabel(item.intents)}</td>
                <td className="p-3 capitalize">{item.platform}</td>
                <td className="p-3">{item.format}</td>
                <td className="p-3">{item.goal.replaceAll("_", " ")}</td>
                <td className="p-3">{item.cta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
