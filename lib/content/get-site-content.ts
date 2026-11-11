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

function withApprovedTestimonials(content: SiteContent): SiteContent {
  const homeItems = (defaultSiteContent.home.testimonials as { items?: ContentValue }).items;
  const workItems = (defaultSiteContent.work.testimonials as { items?: ContentValue }).items;
  const homeLegacy = isLegacyTestimonialList(content.home.testimonials);
  const workLegacy = isLegacyTestimonialList(content.work.testimonials);
  if (!homeLegacy && !workLegacy) return content;

  return {
    ...content,
    home: homeLegacy
      ? {
          ...content.home,
          testimonials: {
            ...(content.home.testimonials as object),
            items: homeItems,
          },
        }
      : content.home,
    work: workLegacy
      ? {
          ...content.work,
          testimonials: {
            ...(content.work.testimonials as object),
            items: workItems,
          },
        }
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

