export type InternalField =
  | "keyword"
  | "volume"
  | "competition"
  | "competition_label"
  | "kd"
  | "cpc"
  | "intent"
  | "date"
  | "interest"
  | "ignore";

const ALIASES: Record<InternalField, string[]> = {
  keyword: ["keyword", "search term", "query", "keywords", "phrase", "key word"],
  volume: [
    "volume",
    "search volume",
    "avg. monthly searches",
    "avg monthly searches",
    "average monthly searches",
    "searches",
  ],
  competition: ["competition index", "competition (indexed value)", "comp index"],
  competition_label: ["competition", "google competition"],
  kd: ["kd", "keyword difficulty", "difficulty", "seo difficulty"],
  cpc: ["cpc", "cost per click", "top of page bid", "top of page bid (high range)", "avg. cpc"],
  intent: ["intent", "search intent"],
  date: ["date", "week", "month", "time", "day"],
  interest: ["interest", "interest over time", "value", "trend"],
  ignore: [],
};

function normalizeHeader(header: string): string {
  return header.toLowerCase().replace(/[_./]+/g, " ").replace(/\s+/g, " ").trim();
}

export function detectMapping(headers: string[]): Record<string, InternalField> {
  const mapping: Record<string, InternalField> = {};
  const used = new Set<InternalField>();
  for (const header of headers) {
    const normalized = normalizeHeader(header);
    let matched: InternalField = "ignore";
    (Object.keys(ALIASES) as InternalField[]).some((field) => {
      if (field === "ignore" || used.has(field)) return false;
      if (ALIASES[field].includes(normalized)) {
        matched = field;
        used.add(field);
        return true;
      }
      return false;
    });
    mapping[header] = matched;
  }
  return mapping;
}

export function parseVolume(raw: string | undefined): { value: number | null; original: string | null } {
  if (!raw) return { value: null, original: null };
  const text = String(raw).trim();
  if (!text || text === "-" || text.toLowerCase() === "not available") {
    return { value: null, original: text };
  }
  const range = text.match(/([\d,.]+)\s*[-–]\s*([\d,.]+)/);
  if (range) {
    const low = Number(range[1].replace(/,/g, ""));
    const high = Number(range[2].replace(/,/g, ""));
    if (!Number.isNaN(low) && !Number.isNaN(high)) {
      return { value: Math.round((low + high) / 2), original: text };
    }
  }
  const compact = text.replace(/,/g, "").toUpperCase();
  if (compact.endsWith("K")) return { value: Number(compact.slice(0, -1)) * 1000, original: text };
  if (compact.endsWith("M")) return { value: Number(compact.slice(0, -1)) * 1_000_000, original: text };
  const numeric = Number(compact.replace(/[^\d.-]/g, ""));
  return { value: Number.isNaN(numeric) ? null : numeric, original: text };
}

export function parseCompetitionLabel(raw: string | undefined): number | null {
  if (!raw) return null;
  const value = raw.toLowerCase().trim();
  if (value === "low") return 20;
  if (value === "medium") return 50;
  if (value === "high") return 80;
  const numeric = Number(value);
  return Number.isNaN(numeric) ? null : numeric;
}
