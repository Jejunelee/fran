"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Button, Card, Input, Select } from "@/components/ui/forms";
import { MetricCell, StatusBadge } from "@/components/ui/status-badge";
import { useAppStore } from "@/components/providers/app-provider";
import { EditModal, ImportModal, ManualAdd } from "@/components/keywords/keyword-modals";
import { applyFilters, EMPTY_FILTERS, PRESETS, sortKeywords, type KeywordFilters, type SortKey } from "@/lib/keyword/filters";
import { calculateOpportunity } from "@/lib/scoring/opportunity";
import { downloadText, downloadXlsx, keywordsToCsv } from "@/lib/exports/csv";
import { nowIso } from "@/lib/id";
import { OPPORTUNITY_TOOLTIP } from "@/lib/constants";
import { intentLabel } from "@/lib/intent/classify";
import type { KeywordRecord, ResearchProject, SearchIntent } from "@/types";

const PAGE_SIZE = 50;

export function KeywordWorkspace() {
  const { project, setProject } = useAppStore();
  const [filters, setFilters] = useState<KeywordFilters>(EMPTY_FILTERS);
  const [sortKey, setSortKey] = useState<SortKey>("keyword");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<KeywordRecord | null>(null);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const filtered = useMemo(
    () => (project ? sortKeywords(applyFilters(project.keywords, filters), sortKey, sortDir) : []),
    [project, filters, sortKey, sortDir],
  );

  if (!project) return <p>Create a research project first.</p>;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  function commit(next: ResearchProject) {
    setProject(next);
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function applyPreset(name: string) {
    const preset = PRESETS[name];
    setFilters({ ...EMPTY_FILTERS, ...preset, preset: name === "Custom" ? "custom" : name });
    setPage(0);
  }

  function removeSelected() {
    commit({
      ...project,
      keywords: project.keywords.filter((item) => !selected.has(item.id)),
    });
    setSelected(new Set());
  }

  function bulkIntent(intent: SearchIntent) {
    commit({
      ...project,
      keywords: project.keywords.map((item) =>
        selected.has(item.id)
          ? { ...item, intents: [...new Set([...item.intents, intent])], updatedAt: nowIso() }
          : item,
      ),
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Keywords</h1>
          <p className="text-sm text-slate-600">
            {filtered.length} shown of {project.keywords.length}. Metrics are labeled by source. SEO KD and Google Ads Competition are not interchangeable.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setImporting(true)}>
            Import CSV/XLSX
          </Button>
          <Button variant="secondary" onClick={() => downloadText(`${project.name}-keywords.csv`, keywordsToCsv(project))}>
            Export CSV
          </Button>
          <Button variant="secondary" onClick={() => downloadXlsx(project)}>
            Export XLSX
          </Button>
        </div>
      </div>
      {message ? <p className="text-sm text-violet-800">{message}</p> : null}
      <Card className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {Object.keys(PRESETS).map((name) => (
            <button
              key={name}
              onClick={() => applyPreset(name)}
              className={`rounded-full border px-3 py-1 text-xs ${filters.preset === name || (name === "Custom" && filters.preset === "custom") ? "border-violet-300 bg-violet-50" : "border-slate-200"}`}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          <Input placeholder="Search keywords" value={filters.search} onChange={(e) => { setFilters({ ...filters, search: e.target.value, preset: "custom" }); setPage(0); }} />
          <Input type="number" placeholder="Min volume" value={filters.minVolume ?? ""} onChange={(e) => setFilters({ ...filters, minVolume: e.target.value ? Number(e.target.value) : null, preset: "custom" })} />
          <Input type="number" placeholder="Max volume" value={filters.maxVolume ?? ""} onChange={(e) => setFilters({ ...filters, maxVolume: e.target.value ? Number(e.target.value) : null, preset: "custom" })} />
          <Input type="number" placeholder="Max SEO KD" value={filters.maxKd ?? ""} onChange={(e) => setFilters({ ...filters, maxKd: e.target.value ? Number(e.target.value) : null, preset: "custom" })} />
          <Input type="number" placeholder="Max Google Ads competition" value={filters.maxCompetition ?? ""} onChange={(e) => setFilters({ ...filters, maxCompetition: e.target.value ? Number(e.target.value) : null, preset: "custom" })} />
          <Input placeholder="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value, preset: "custom" })} />
          <Select value={filters.length} onChange={(e) => setFilters({ ...filters, length: e.target.value as KeywordFilters["length"], preset: "custom" })}>
            <option value="any">Any length</option>
            <option value="short">Short</option>
            <option value="long">Long tail</option>
          </Select>
          <Select value={filters.source} onChange={(e) => setFilters({ ...filters, source: e.target.value as KeywordFilters["source"], preset: "custom" })}>
            <option value="any">Any source</option>
            <option value="generated">Generated</option>
            <option value="suggestion">Suggestion</option>
            <option value="csv">CSV</option>
            <option value="xlsx">XLSX</option>
            <option value="user">User</option>
            <option value="demo">Demo</option>
            <option value="social_paste">Social paste</option>
          </Select>
        </div>
      </Card>
      <ManualAdd
        project={project}
        onAdd={(keyword) => {
          commit({ ...project, keywords: [keyword, ...project.keywords] });
          setMessage("Keyword added as user supplied.");
        }}
      />
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" disabled={!selected.size} onClick={removeSelected}>
          Delete selected
        </Button>
        <Button variant="secondary" disabled={!selected.size} onClick={() => bulkIntent("commercial")}>
          Bulk: commercial
        </Button>
        <Button variant="secondary" disabled={!selected.size} onClick={() => bulkIntent("informational")}>
          Bulk: informational
        </Button>
        <Button variant="secondary" disabled={!selected.size} onClick={() => bulkIntent("transactional")}>
          Bulk: transactional
        </Button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-[1400px] w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  checked={rows.length > 0 && rows.every((row) => selected.has(row.id))}
                  onChange={(e) => {
                    const next = new Set(selected);
                    rows.forEach((row) => (e.target.checked ? next.add(row.id) : next.delete(row.id)));
                    setSelected(next);
                  }}
                />
              </th>
              <Th onClick={() => toggleSort("keyword")}>Keyword</Th>
              <Th onClick={() => toggleSort("volume")}>Volume</Th>
              <th className="p-3">SEO KD</th>
              <th className="p-3">Google Ads Competition</th>
              <Th onClick={() => toggleSort("cpc")}>CPC</Th>
              <th className="p-3">Trend</th>
              <th className="p-3">Intent</th>
              <th className="p-3">Source</th>
              <th className="p-3">Location</th>
              <Th onClick={() => toggleSort("social")}>Social relevance</Th>
              <Th onClick={() => toggleSort("google")}>Google relevance</Th>
              <Th onClick={() => toggleSort("opportunity")}>Opportunity score</Th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.has(row.id)}
                    onChange={(e) => {
                      const next = new Set(selected);
                      e.target.checked ? next.add(row.id) : next.delete(row.id);
                      setSelected(next);
                    }}
                  />
                </td>
                <td className="p-3 font-medium">
                  {row.keyword}
                  {project.isDemo || row.source === "demo" ? (
                    <div className="mt-1">
                      <StatusBadge status="demo" />
                    </div>
                  ) : null}
                </td>
                <td className="p-3">
                  <MetricCell value={row.volume.value} status={row.volume.status} />
                </td>
                <td className="p-3">
                  <MetricCell value={row.seoKd.value} status={row.seoKd.status} fallback="SEO KD: Not available" />
                </td>
                <td className="p-3">
                  <MetricCell
                    value={row.googleAdsCompetition.value ?? row.googleAdsCompetitionLabel.value}
                    status={row.googleAdsCompetition.status}
                    fallback="Google Ads Competition: Not available"
                  />
                </td>
                <td className="p-3">
                  <MetricCell value={row.cpc.value} status={row.cpc.status} />
                </td>
                <td className="p-3">
                  <MetricCell value={row.trend.value} status={row.trend.status} />
                </td>
                <td className="p-3">{intentLabel(row.intents)}</td>
                <td className="p-3">{row.source}</td>
                <td className="p-3">{row.location ?? "—"}</td>
                <td className="p-3">
                  <MetricCell value={row.socialRelevance.value} status={row.socialRelevance.status} />
                </td>
                <td className="p-3">
                  <MetricCell value={row.googleRelevance.value} status={row.googleRelevance.status} />
                </td>
                <td className="p-3" title={OPPORTUNITY_TOOLTIP}>
                  <MetricCell
                    value={row.opportunityScore.value}
                    status={row.opportunityScore.status}
                    fallback="Insufficient data"
                  />
                </td>
                <td className="p-3">
                  <button className="text-violet-700 hover:underline" onClick={() => setEditing(row)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Button variant="secondary" disabled={page === 0} onClick={() => setPage((value) => value - 1)}>
            Previous
          </Button>
          <Button variant="secondary" disabled={page + 1 >= totalPages} onClick={() => setPage((value) => value + 1)}>
            Next
          </Button>
        </div>
      </div>
      {editing ? (
        <EditModal
          keyword={editing}
          onClose={() => setEditing(null)}
          onSave={(nextKeyword) => {
            const updated = { ...nextKeyword, opportunityScore: calculateOpportunity(nextKeyword), updatedAt: nowIso() };
            commit({
              ...project,
              keywords: project.keywords.map((item) => (item.id === updated.id ? updated : item)),
            });
            setEditing(null);
          }}
        />
      ) : null}
      {importing ? (
        <ImportModal
          project={project}
          onClose={() => setImporting(false)}
          onImported={(next, count) => {
            commit(next);
            setImporting(false);
            setMessage(`Imported ${count} keyword rows. Values are labeled Imported, not live API data.`);
          }}
        />
      ) : null}
    </div>
  );
}

function Th({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <th className="p-3">
      <button onClick={onClick} className="font-medium uppercase">
        {children}
      </button>
    </th>
  );
}
