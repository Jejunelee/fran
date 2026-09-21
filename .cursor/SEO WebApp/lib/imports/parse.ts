import Papa from "papaparse";
import * as XLSX from "xlsx";
import { detectMapping, parseCompetitionLabel, parseVolume, type InternalField } from "@/lib/imports/detect";
import { parseTrendsCsv } from "@/lib/providers/trend/csv";
import type { TrendResult } from "@/lib/providers/types";

export type ParsedTable = {
  headers: string[];
  rows: Record<string, string>[];
  mapping: Record<string, InternalField>;
};

export function parseCsvText(text: string): ParsedTable {
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });
  const headers = parsed.meta.fields?.filter(Boolean) ?? [];
  const rows = (parsed.data ?? []).filter((row) => Object.values(row).some((value) => String(value ?? "").trim()));
  return { headers, rows, mapping: detectMapping(headers) };
}

export async function parseWorkbook(file: File): Promise<ParsedTable> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".csv") || file.type.includes("csv")) {
    return parseCsvText(await file.text());
  }
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) return { headers: [], rows: [], mapping: {} };
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" });
  const headers = rows[0] ? Object.keys(rows[0]) : [];
  return { headers, rows, mapping: detectMapping(headers) };
}

export function mappedKeywordRows(
  table: ParsedTable,
  mapping: Record<string, InternalField> = table.mapping,
) {
  return table.rows
    .map((row) => {
      const get = (field: InternalField) => {
        const header = Object.keys(mapping).find((key) => mapping[key] === field);
        return header ? String(row[header] ?? "").trim() : "";
      };
      const keyword = get("keyword");
      const volume = parseVolume(get("volume"));
      const kd = parseVolume(get("kd"));
      const competitionIndex = parseVolume(get("competition"));
      const competitionLabel = get("competition_label");
      const cpc = parseVolume(get("cpc"));
      return {
        keyword,
        volume: volume.value,
        volumeOriginal: volume.original,
        kd: kd.value,
        competition: competitionIndex.value ?? parseCompetitionLabel(competitionLabel),
        competitionLabel: competitionLabel || null,
        cpc: cpc.value,
        intent: get("intent") || null,
      };
    })
    .filter((row) => row.keyword);
}

export function mappedTrend(table: ParsedTable, topic: string, mapping?: Record<string, InternalField>): TrendResult {
  const map = mapping ?? table.mapping;
  const rows = table.rows.map((row) => {
    const dateHeader = Object.keys(map).find((key) => map[key] === "date");
    const interestHeader = Object.keys(map).find((key) => map[key] === "interest");
    return {
      date: dateHeader ? String(row[dateHeader] ?? "") : "",
      value: interestHeader ? String(row[interestHeader] ?? "") : "",
    };
  });
  return parseTrendsCsv(rows, topic);
}
