export const CHOICES = ["A", "B", "C", "D"] as const;

export type Choice = (typeof CHOICES)[number];

export function isChoice(value: unknown): value is Choice {
  return typeof value === "string" && (CHOICES as readonly string[]).includes(value);
}
