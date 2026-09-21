import { z } from "zod";

export const wizardSchema = z.object({
  topic: z.string().trim().min(2, "Enter a topic").max(120),
  country: z.string().trim().min(2, "Enter a country").max(80),
  city: z.string().trim().max(80),
  audience: z.string().trim().max(160),
  platform: z.enum([
    "instagram",
    "tiktok",
    "youtube",
    "linkedin",
    "facebook",
    "pinterest",
    "google",
  ]),
  goal: z.enum([
    "awareness",
    "education",
    "lead_generation",
    "product_discovery",
    "sales",
    "mixed",
  ]),
  extraTopics: z.string().max(400).optional(),
  seedKeywords: z.string().max(4000).optional(),
});

export const authSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const manualKeywordSchema = z.object({
  keyword: z.string().trim().min(2).max(200),
  volume: z.string().optional(),
  competition: z.string().optional(),
  kd: z.string().optional(),
  cpc: z.string().optional(),
});

export const settingsSchema = z.object({
  defaultCountry: z.string().min(2).max(80),
  defaultPlatform: z.enum([
    "instagram",
    "tiktok",
    "youtube",
    "linkedin",
    "facebook",
    "pinterest",
    "google",
  ]),
  defaultMinVolume: z.string().optional(),
  defaultMaxKd: z.string().optional(),
  preferredCurrency: z.string().min(3).max(8),
  suggestionsEnabled: z.boolean(),
});
