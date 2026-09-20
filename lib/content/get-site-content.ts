import { cache } from "react";
import { defaultSiteContent } from "./defaults";
import { deepMerge } from "./merge";
import type { SiteContent } from "./types";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabase } from "@/lib/supabase/server";

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
    return deepMerge(defaultSiteContent, data.data);
  } catch {
    return defaultSiteContent;
  }
});

