import { ACTIVE_PROJECT_KEY, DEFAULT_SETTINGS, SETTINGS_KEY, STORAGE_KEY } from "@/lib/constants";
import { createDemoProject } from "@/lib/research/demo";
import type { AppSettings, ResearchProject } from "@/types";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function loadProjects(): ResearchProject[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const demo = createDemoProject();
      saveProjects([demo]);
      return [demo];
    }
    const parsed = JSON.parse(raw) as ResearchProject[];
    if (!parsed.some((project) => project.isDemo)) {
      parsed.unshift(createDemoProject());
      saveProjects(parsed);
    }
    return parsed;
  } catch {
    return [createDemoProject()];
  }
}

export function saveProjects(projects: ResearchProject[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function upsertProject(project: ResearchProject) {
  const projects = loadProjects();
  const index = projects.findIndex((item) => item.id === project.id);
  if (index >= 0) projects[index] = project;
  else projects.unshift(project);
  saveProjects(projects);
  setActiveProjectId(project.id);
}

export function deleteProject(id: string) {
  const projects = loadProjects().filter((project) => project.id !== id);
  saveProjects(projects);
}

export function getActiveProjectId(): string | null {
  if (!canUseStorage()) return null;
  return localStorage.getItem(ACTIVE_PROJECT_KEY);
}

export function setActiveProjectId(id: string) {
  if (!canUseStorage()) return;
  localStorage.setItem(ACTIVE_PROJECT_KEY, id);
}

export function loadSettings(): AppSettings {
  if (!canUseStorage()) return { ...DEFAULT_SETTINGS };
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: AppSettings) {
  if (!canUseStorage()) return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
