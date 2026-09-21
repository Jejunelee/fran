import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/env";

export function createClient() {
  if (!isSupabaseConfigured()) return null;
  const { url, key } = getSupabaseEnv();
  return createBrowserClient(url, key);
}
