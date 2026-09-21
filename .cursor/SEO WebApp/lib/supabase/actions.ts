"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import type { ResearchProject } from "@/types";

export async function saveProjectToSupabase(project: ResearchProject): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createServerSupabase();
  if (!supabase) {
    return { ok: false, error: "Supabase is not configured. Research is saved locally in this browser." };
  }
  const { data: claims, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claims?.claims?.sub) {
    return { ok: false, error: "Sign in to save research to Supabase." };
  }
  const userId = String(claims.claims.sub);
  const { error } = await supabase.from("research_projects").upsert({
    id: project.id,
    user_id: userId,
    name: project.name,
    topic: project.topic,
    country: project.country,
    city: project.city,
    audience: project.audience,
    platform: project.platform,
    goal: project.goal,
    is_demo: project.isDemo,
    trend_direction: project.trendDirection,
    data_sources: project.dataSources,
    payload: project,
    updated_at: new Date().toISOString(),
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function loadProjectsFromSupabase(): Promise<{ projects: ResearchProject[]; error?: string }> {
  const supabase = await createServerSupabase();
  if (!supabase) return { projects: [] };
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims?.sub) return { projects: [] };
  const { data, error } = await supabase
    .from("research_projects")
    .select("payload")
    .order("updated_at", { ascending: false });
  if (error) return { projects: [], error: error.message };
  const projects = (data ?? [])
    .map((row) => row.payload as ResearchProject)
    .filter(Boolean);
  return { projects };
}
