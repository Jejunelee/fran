import type { ContentGoal, ContentIdea, KeywordRecord, Platform, SearchIntent } from "@/types";
import { createId, nowIso } from "@/lib/id";

const FORMAT_BY_PLATFORM: Record<Platform, string[]> = {
  instagram: ["Instagram carousel", "Short-form video", "Caption + on-screen text"],
  tiktok: ["Short-form video", "Talking-head explainer", "Screen-recorded walkthrough"],
  youtube: ["YouTube video", "Shorts", "Blog supporting article"],
  linkedin: ["LinkedIn post", "Carousel document", "Thought-leadership article"],
  facebook: ["Facebook post", "Short-form video", "Guide post"],
  pinterest: ["Pin graphic", "Idea pin", "Supporting blog article"],
  google: ["Blog article", "Landing page", "FAQ page"],
};

function titleCase(value: string) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function titleFromKeyword(keyword: string, intents: SearchIntent[], city?: string) {
  const clean = keyword.replace(/\b(sydney|melbourne|australia)\b/gi, "").replace(/\s+/g, " ").trim();
  if (intents.includes("commercial")) return `How to Choose ${titleCase(clean)}${city ? ` in ${city}` : ""}`;
  if (intents.includes("transactional")) return `${titleCase(clean)} Pricing, Packages, and What to Expect`;
  if (keyword.toLowerCase().startsWith("how")) return titleCase(keyword);
  return `What ${titleCase(clean)} Means for Your Business`;
}

function hookFrom(keyword: string, goal: ContentGoal) {
  if (goal === "lead_generation") return `If you searched “${keyword}”, you are probably comparing options. Start with the decision criteria that actually change outcomes.`;
  if (goal === "education") return `Most people searching “${keyword}” want a clear process, not jargon. Here is the practical version.`;
  if (goal === "sales") return `Searching “${keyword}” usually means you are ready to act. Use this checklist before you buy or book.`;
  return `“${keyword}” is a discoverable phrase. Use it to answer one specific audience question in this piece.`;
}

function ctaFrom(goal: ContentGoal) {
  switch (goal) {
    case "lead_generation":
      return "Invite the viewer to request a short diagnostic call or download a checklist.";
    case "sales":
      return "Point to a pricing page, booking link, or product page.";
    case "education":
      return "Offer a follow-up guide or save/share prompt.";
    case "awareness":
      return "Ask a comment question to collect related search phrasing.";
    case "product_discovery":
      return "Show the offer in context and link to a comparison or product page.";
    default:
      return "End with one next step: save, comment, or visit a resource.";
  }
}

export function generateContentIdea(input: {
  projectId: string;
  keyword: KeywordRecord;
  supporting: string[];
  platform: Platform;
  goal: ContentGoal;
  city?: string;
}): ContentIdea {
  return {
    id: createId("idea"),
    projectId: input.projectId,
    keywordId: input.keyword.id,
    title: titleFromKeyword(input.keyword.keyword, input.keyword.intents, input.city),
    hook: hookFrom(input.keyword.keyword, input.goal),
    angle: `Position the phrase “${input.keyword.keyword}” as the core promise, then answer the ${input.keyword.intents.join(" + ")} need on ${input.platform}. Use the exact phrase in the title/hook and once in the body; do not claim it will rank.`,
    format: FORMAT_BY_PLATFORM[input.platform][0],
    platform: input.platform,
    goal: input.goal,
    cta: ctaFrom(input.goal),
    supportingKeywords: input.supporting.slice(0, 5),
    intents: input.keyword.intents,
    createdAt: nowIso(),
  };
}
