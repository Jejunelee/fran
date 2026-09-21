import type { CalendarItem, ContentGoal, Platform } from "@/types";
import { createId } from "@/lib/id";

export function buildCalendarFromKeywords(
  projectId: string,
  rows: { keyword: string; intents: CalendarItem["intents"]; supporting: string[]; title: string; format: string; cta: string }[],
  platform: Platform,
  goal: ContentGoal,
): CalendarItem[] {
  return rows.slice(0, 8).map((row, index) => ({
    id: createId("cal"),
    projectId,
    week: Math.floor(index / 2) + 1,
    dateLabel: `Week ${Math.floor(index / 2) + 1}`,
    topic: row.title,
    primaryKeyword: row.keyword,
    supportingKeywords: row.supporting,
    intents: row.intents,
    platform,
    format: row.format,
    goal,
    cta: row.cta,
  }));
}
