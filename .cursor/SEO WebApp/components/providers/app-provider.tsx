"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_SETTINGS } from "@/lib/constants";
import { nowIso } from "@/lib/id";
import {
  deleteProject as deleteLocal,
  getActiveProjectId,
  loadProjects,
  loadSettings,
  saveSettings as persistSettings,
  setActiveProjectId,
  upsertProject,
} from "@/lib/store/local";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { saveProjectToSupabase } from "@/lib/supabase/actions";
import type { AppSettings, ResearchProject } from "@/types";

type Store = {
  ready: boolean;
  projects: ResearchProject[];
  project: ResearchProject | null;
  settings: AppSettings;
  supabaseConfigured: boolean;
  setProject: (project: ResearchProject, sync?: boolean) => void;
  selectProject: (id: string) => void;
  removeProject: (id: string) => void;
  updateSettings: (settings: AppSettings) => void;
  cloudMessage: string | null;
};

const Ctx = createContext<Store | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [cloudMessage, setCloudMessage] = useState<string | null>(null);

  useEffect(() => {
    const loaded = loadProjects();
    setProjects(loaded);
    setSettings(loadSettings());
    setActiveId(getActiveProjectId() ?? loaded[0]?.id ?? null);
    setReady(true);
  }, []);

  const project = useMemo(
    () => projects.find((item) => item.id === activeId) ?? projects[0] ?? null,
    [projects, activeId],
  );

  const setProject = useCallback((next: ResearchProject, sync = true) => {
    const updated = { ...next, updatedAt: nowIso() };
    upsertProject(updated);
    setProjects(loadProjects());
    setActiveId(updated.id);
    if (sync && isSupabaseConfigured() && !updated.isDemo) {
      void saveProjectToSupabase(updated).then((result) => {
        setCloudMessage(result.ok ? "Saved to Supabase." : result.error ?? null);
      });
    }
  }, []);

  const selectProject = useCallback((id: string) => {
    setActiveProjectId(id);
    setActiveId(id);
  }, []);

  const removeProject = useCallback((id: string) => {
    deleteLocal(id);
    const remaining = loadProjects();
    setProjects(remaining);
    setActiveId(remaining[0]?.id ?? null);
  }, []);

  const updateSettings = useCallback((next: AppSettings) => {
    persistSettings(next);
    setSettings(next);
  }, []);

  return (
    <Ctx.Provider
      value={{
        ready,
        projects,
        project,
        settings,
        supabaseConfigured: isSupabaseConfigured(),
        setProject,
        selectProject,
        removeProject,
        updateSettings,
        cloudMessage,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAppStore() {
  const value = useContext(Ctx);
  if (!value) throw new Error("useAppStore must be used within AppProvider");
  return value;
}
