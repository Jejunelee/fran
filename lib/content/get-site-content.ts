import { cache } from "react";
import { defaultSiteContent } from "./defaults";
import { deepMerge } from "./merge";
import type { ContentValue, SiteContent } from "./types";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabase } from "@/lib/supabase/server";

const LEGACY_TESTIMONIAL_AUTHORS = new Set(["BEA T.", "LIZA C.", "THEA D."]);

function isLegacyTestimonialList(section: ContentValue | undefined) {
  if (!section || typeof section !== "object" || Array.isArray(section)) return false;
  const items = (section as { items?: unknown }).items;
  if (!Array.isArray(items) || items.length === 0) return false;
  return items.every((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return false;
    const author = (item as { author?: unknown }).author;
    return typeof author === "string" && LEGACY_TESTIMONIAL_AUTHORS.has(author);
  });
}

function asRecord(section: ContentValue | undefined): Record<string, ContentValue> | undefined {
  if (!section || typeof section !== "object" || Array.isArray(section) || !("items" in section)) {
    return undefined;
  }
  return section;
}

function withApprovedItems(page: Record<string, ContentValue>, items: ContentValue | undefined) {
  const current = asRecord(page.testimonials) ?? {};
  if (!items) return page;
  return {
    ...page,
    testimonials: { ...current, items },
  };
}

function withApprovedTestimonials(content: SiteContent): SiteContent {
  const homeLegacy = isLegacyTestimonialList(content.home.testimonials);
  const workLegacy = isLegacyTestimonialList(content.work.testimonials);
  if (!homeLegacy && !workLegacy) return content;

  return {
    ...content,
    home: homeLegacy
      ? withApprovedItems(content.home, asRecord(defaultSiteContent.home.testimonials)?.items)
      : content.home,
    work: workLegacy
      ? withApprovedItems(content.work, asRecord(defaultSiteContent.work.testimonials)?.items)
      : content.work,
  };
}

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!isSupabaseConfigured()) return defaultSiteContent;

  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("id", "default")
      .maybeSingle();

    if (error || !data?.data) return defaultSiteContent;
    return withApprovedTestimonials(deepMerge(defaultSiteContent, data.data));
  } catch {
    return defaultSiteContent;
  }
});

