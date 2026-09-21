"use client";

import { useState } from "react";
import { Button, Card, Input, Label, Select, Textarea } from "@/components/ui/forms";
import { mappedKeywordRows, parseWorkbook, type ParsedTable } from "@/lib/imports/parse";
import { type InternalField } from "@/lib/imports/detect";
import { buildKeyword } from "@/lib/keyword/build";
import { classifyIntent } from "@/lib/intent/classify";
import { calculateOpportunity } from "@/lib/scoring/opportunity";
import { createId, nowIso } from "@/lib/id";
import { manualKeywordSchema } from "@/lib/validations";
import type { KeywordRecord, ResearchProject } from "@/types";
import type { ReactNode } from "react";

export function ManualAdd({ project, onAdd }: { project: ResearchProject; onAdd: (keyword: KeywordRecord) => void }) {
  const [form, setForm] = useState({ keyword: "", volume: "", competition: "", kd: "", cpc: "" });
  const [error, setError] = useState<string | null>(null);
  return (
    <Card>
      <h2 className="mb-3 font-medium">Manual keyword entry</h2>
      <div className="grid gap-3 md:grid-cols-5">
        <Input placeholder="Keyword" value={form.keyword} onChange={(e) => setForm({ ...form, keyword: e.target.value })} />
        <Input placeholder="Volume" value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} />
        <Input placeholder="Google Ads competition" value={form.competition} onChange={(e) => setForm({ ...form, competition: e.target.value })} />
        <Input placeholder="SEO KD" value={form.kd} onChange={(e) => setForm({ ...form, kd: e.target.value })} />
        <Input placeholder="CPC" value={form.cpc} onChange={(e) => setForm({ ...form, cpc: e.target.value })} />
      </div>
      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
      <Button
        className="mt-3"
        onClick={() => {
          const parsed = manualKeywordSchema.safeParse(form);
          if (!parsed.success) {
            setError(parsed.error.issues[0]?.message ?? "Invalid input");
            return;
          }
          setError(null);
          onAdd(
            buildKeyword({
              projectId: project.id,
              keyword: parsed.data.keyword,
              topic: project.topic,
              city: project.city,
              country: project.country,
              platform: project.platform,
              source: "user",
              volume: parsed.data.volume ? Number(parsed.data.volume) : null,
              volumeStatus: parsed.data.volume ? "user_supplied" : "unavailable",
              volumeSource: parsed.data.volume ? "Manual entry" : "Not available",
              competition: parsed.data.competition ? Number(parsed.data.competition) : null,
              seoKd: parsed.data.kd ? Number(parsed.data.kd) : null,
              seoKdStatus: parsed.data.kd ? "user_supplied" : "unavailable",
              cpc: parsed.data.cpc ? Number(parsed.data.cpc) : null,
            }),
          );
          setForm({ keyword: "", volume: "", competition: "", kd: "", cpc: "" });
        }}
      >
        Add keyword
      </Button>
    </Card>
  );
}

export function EditModal({
  keyword,
  onClose,
  onSave,
}: {
  keyword: KeywordRecord;
  onClose: () => void;
  onSave: (keyword: KeywordRecord) => void;
}) {
  const [notes, setNotes] = useState(keyword.notes);
  const [volume, setVolume] = useState(keyword.volume.value?.toString() ?? "");
  const [kd, setKd] = useState(keyword.seoKd.value?.toString() ?? "");
  return (
    <Modal title={`Edit ${keyword.keyword}`} onClose={onClose}>
      <Label>Notes</Label>
      <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div>
          <Label>Volume (user supplied)</Label>
          <Input value={volume} onChange={(e) => setVolume(e.target.value)} />
        </div>
        <div>
          <Label>SEO KD (user supplied)</Label>
          <Input value={kd} onChange={(e) => setKd(e.target.value)} />
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={() =>
            onSave({
              ...keyword,
              notes,
              volume: {
                value: volume ? Number(volume) : null,
                status: volume ? "user_supplied" : "unavailable",
                source: volume ? "Manual edit" : "Not available",
              },
              seoKd: {
                value: kd ? Number(kd) : null,
                status: kd ? "user_supplied" : "unavailable",
                source: kd ? "Manual edit" : "SEO KD: Not available",
              },
            })
          }
        >
          Save
        </Button>
      </div>
    </Modal>
  );
}

export function ImportModal({
  project,
  onClose,
  onImported,
}: {
  project: ResearchProject;
  onClose: () => void;
  onImported: (project: ResearchProject, count: number) => void;
}) {
  const [table, setTable] = useState<ParsedTable | null>(null);
  const [mapping, setMapping] = useState<Record<string, InternalField>>({});
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  return (
    <Modal title="Import keyword metrics" onClose={onClose}>
      <p className="mb-3 text-sm text-slate-600">
        Supports Google Keyword Planner, Ahrefs, SEMrush, and custom files. Columns are mapped, not assumed identical. Imported metrics are labeled Imported.
      </p>
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          setFileName(file.name);
          try {
            const parsed = await parseWorkbook(file);
            if (!parsed.headers.length) {
              setError("No headers found. Check the file format.");
              return;
            }
            setTable(parsed);
            setMapping(parsed.mapping);
            setError(null);
          } catch {
            setError("The file could not be parsed. Try CSV, or export a simpler XLSX sheet.");
          }
        }}
      />
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      {table ? (
        <div className="mt-4 space-y-3">
          {table.headers.map((header) => (
            <div key={header} className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 px-3 py-2">{header}</div>
              <Select
                value={mapping[header]}
                onChange={(e) => setMapping({ ...mapping, [header]: e.target.value as InternalField })}
              >
                <option value="ignore">Ignore</option>
                <option value="keyword">Keyword</option>
                <option value="volume">Search volume</option>
                <option value="kd">SEO keyword difficulty</option>
                <option value="competition">Google Ads competition index</option>
                <option value="competition_label">Google Ads competition label</option>
                <option value="cpc">CPC</option>
                <option value="intent">Intent</option>
              </Select>
            </div>
          ))}
          <Button
            onClick={() => {
              const rows = mappedKeywordRows(table, mapping);
              if (!rows.length) {
                setError("No keyword column mapped, or no rows found.");
                return;
              }
              const existing = new Map(project.keywords.map((item) => [item.keyword, item]));
              for (const row of rows) {
                const current = existing.get(row.keyword.toLowerCase());
                const source = fileName.toLowerCase().endsWith(".csv") ? "csv" : "xlsx";
                if (current) {
                  const next = {
                    ...current,
                    volume: {
                      value: row.volume,
                      status: row.volume == null ? ("unavailable" as const) : ("imported" as const),
                      source: fileName,
                      original: row.volumeOriginal,
                    },
                    seoKd: {
                      value: row.kd,
                      status: row.kd == null ? ("unavailable" as const) : ("imported" as const),
                      source: row.kd == null ? "SEO KD: Not available" : fileName,
                    },
                    googleAdsCompetition: {
                      value: row.competition,
                      status: row.competition == null ? ("unavailable" as const) : ("imported" as const),
                      source: "Google Ads Competition (imported)",
                    },
                    googleAdsCompetitionLabel: {
                      value: row.competitionLabel,
                      status: row.competitionLabel ? ("imported" as const) : ("unavailable" as const),
                      source: "Google Ads Competition label",
                    },
                    cpc: {
                      value: row.cpc,
                      status: row.cpc == null ? ("unavailable" as const) : ("imported" as const),
                      source: fileName,
                    },
                    intents: row.intent ? classifyIntent(row.intent) : current.intents,
                    source,
                  };
                  next.opportunityScore = calculateOpportunity(next);
                  existing.set(row.keyword.toLowerCase(), next);
                } else {
                  existing.set(
                    row.keyword.toLowerCase(),
                    buildKeyword({
                      projectId: project.id,
                      keyword: row.keyword,
                      topic: project.topic,
                      city: project.city,
                      country: project.country,
                      platform: project.platform,
                      source,
                      volume: row.volume,
                      volumeStatus: row.volume == null ? "unavailable" : "imported",
                      volumeSource: fileName,
                      volumeOriginal: row.volumeOriginal,
                      seoKd: row.kd,
                      seoKdStatus: row.kd == null ? "unavailable" : "imported",
                      competition: row.competition,
                      competitionLabel: row.competitionLabel,
                      cpc: row.cpc,
                      cpcStatus: row.cpc == null ? "unavailable" : "imported",
                    }),
                  );
                }
              }
              onImported(
                {
                  ...project,
                  keywords: [...existing.values()],
                  imports: [
                    ...project.imports,
                    { id: createId(), projectId: project.id, fileName, kind: "keywords", rowCount: rows.length, createdAt: nowIso() },
                  ],
                  dataSources: [...new Set([...project.dataSources, `Imported file: ${fileName}`])],
                },
                rows.length,
              );
            }}
          >
            Import {table.rows.length} rows
          </Button>
        </div>
      ) : null}
    </Modal>
  );
}

export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose} className="text-sm text-slate-500">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
