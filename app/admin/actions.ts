"use server";

import { revalidatePath } from "next/cache";
import { defaultSiteContent } from "@/lib/content/defaults";
import { deepMerge } from "@/lib/content/merge";
import type { SiteContent } from "@/lib/content/types";
import { createServerSupabase } from "@/lib/supabase/server";

export async function saveSiteContent(data: SiteContent) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false as const, error: "Not signed in." };
  }

  const merged = deepMerge(defaultSiteContent, data);
  const { error } = await supabase.from("site_content").upsert({
    id: "default",
    data: merged,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return { ok: false as const, error: error.message };
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
  return { ok: true as const };
}

export async function signOutAdmin() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  revalidatePath("/admin", "layout");
}
