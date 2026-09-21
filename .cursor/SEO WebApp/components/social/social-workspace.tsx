"use client";

import { useState } from "react";
import { Button, Card, Label, Textarea } from "@/components/ui/forms";
import { MetricCell } from "@/components/ui/status-badge";
import { useAppStore } from "@/components/providers/app-provider";
import { platformSearchUrl } from "@/lib/constants";
import { classifyIntent, intentLabel } from "@/lib/intent/classify";
import { buildKeyword } from "@/lib/keyword/build";
import { groupSuggestion, parsePastedSuggestions } from "@/lib/providers/social/paste";
import { scoreSocialRelevance } from "@/lib/scoring/relevance";
import { createId, nowIso } from "@/lib/id";

export function SocialWorkspace() {
  const { project, setProject } = useAppStore();
  const [raw, setRaw] = useState("");
  const [topic, setTopic] = useState("");
  if (!project) return <p>Create a research project first.</p>;

  function ingest() {
    const phrases = parsePastedSuggestions(raw);
    const suggestions = phrases.map((phrase) => ({
      id: createId(),
      projectId: project.id,
      phrase,
      platform: project.platform,
      group: groupSuggestion(phrase),
      intents: classifyIntent(phrase),
      socialRelevance: {
        value: scoreSocialRelevance(phrase, project.platform),
        status: "estimated" as const,
        source: "Heuristic social relevance",
      },
      createdAt: nowIso(),
    }));
    const keywords = phrases
      .filter((phrase) => !project.keywords.some((item) => item.keyword === phrase))
      .map((phrase) =>
        buildKeyword({
          projectId: project.id,
          keyword: phrase,
          topic: project.topic,
          city: project.city,
          country: project.country,
          platform: project.platform,
          source: "social_paste",
        }),
      );
    setProject({
      ...project,
      socialSuggestions: [...suggestions, ...project.socialSuggestions],
      keywords: [...keywords, ...project.keywords],
      dataSources: [...new Set([...project.dataSources, "Pasted social search suggestions"])],
    });
    setRaw("");
  }

  const searchTopic = topic || project.topic;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Social SEO</h1>
        <p className="text-sm text-slate-600">
          Social platforms often block scraping. Paste autocomplete suggestions yourself. This app will clean, dedupe, classify, and score them.
        </p>
      </div>
      <Card className="space-y-3">
        <Label>Broad topic</Label>
        <input
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={project.topic}
        />
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={async () => {
              await navigator.clipboard.writeText(platformSearchUrl(project.platform, searchTopic));
            }}
          >
            Copy search URL
          </Button>
          <a
            className="inline-flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm"
            href={platformSearchUrl(project.platform, searchTopic)}
            target="_blank"
            rel="noreferrer"
          >
            Open platform search
          </a>
        </div>
        <Label>Paste social search suggestions</Label>
        <Textarea rows={6} value={raw} onChange={(e) => setRaw(e.target.value)} placeholder={"matcha powder australia\nmatcha powder sydney"} />
        <Button onClick={ingest}>Clean, classify, and add</Button>
      </Card>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-3">Phrase</th>
              <th className="p-3">Group</th>
              <th className="p-3">Intent</th>
              <th className="p-3">Social relevance</th>
              <th className="p-3">Google fit / Social fit</th>
              <th className="p-3">Search</th>
            </tr>
          </thead>
          <tbody>
            {project.socialSuggestions.map((item) => {
              const keyword = project.keywords.find((row) => row.keyword === item.phrase);
              return (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="p-3">{item.phrase}</td>
                  <td className="p-3">{item.group}</td>
                  <td className="p-3">{intentLabel(item.intents)}</td>
                  <td className="p-3">
                    <MetricCell value={item.socialRelevance.value} status={item.socialRelevance.status} />
                  </td>
                  <td className="p-3 capitalize">
                    Google: {keyword?.googleFit ?? "unknown"} · Social: {keyword?.socialFit ?? "unknown"}
                  </td>
                  <td className="p-3">
                    <a className="text-violet-700 hover:underline" href={platformSearchUrl(item.platform, item.phrase)} target="_blank" rel="noreferrer">
                      Open
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Card>
        <h2 className="mb-2 font-medium">Google vs social strategy</h2>
        <p className="mb-3 text-sm text-slate-600">
          Fit is a heuristic, not a ranking prediction. Language used: strong fit, potential fit, weak fit, unknown.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="py-2">Keyword</th>
                <th>Google discoverability</th>
                <th>Social discoverability</th>
                <th>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {project.keywords.slice(0, 40).map((keyword) => (
                <tr key={keyword.id} className="border-t border-slate-100">
                  <td className="py-2">{keyword.keyword}</td>
                  <td className="capitalize">{keyword.googleFit} fit</td>
                  <td className="capitalize">{keyword.socialFit} fit</td>
                  <td className="text-slate-600">
                    Use the exact phrase naturally in caption, on-screen text, alt text where applicable, and supporting content. This does not claim the phrase will rank.
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
