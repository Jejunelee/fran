"use client";

import Link from "next/link";
import { Button, Card } from "@/components/ui/forms";
import { StatusBadge } from "@/components/ui/status-badge";
import { useAppStore } from "@/components/providers/app-provider";

export function ResearchList() {
  const { projects, selectProject, removeProject, ready } = useAppStore();
  if (!ready) return <p className="text-sm text-slate-500">Loading research…</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Research</h1>
          <p className="text-sm text-slate-600">Each project is a full keyword research workspace.</p>
        </div>
        <Link href="/research/new" className="rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white">
          New Research
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-medium">{project.name}</h2>
                <p className="text-sm text-slate-600">
                  {project.topic} · {project.city || project.country} · {project.platform}
                </p>
              </div>
              {project.isDemo ? <StatusBadge status="demo" /> : <StatusBadge status="generated" />}
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {project.keywords.length} keywords · {project.questions.length} questions
            </p>
            <div className="mt-4 flex gap-2">
              <Link
                href="/dashboard"
                onClick={() => selectProject(project.id)}
                className="inline-flex items-center rounded-lg bg-violet-600 px-3.5 py-2 text-sm font-medium text-white"
              >
                Open
              </Link>
              {!project.isDemo ? (
                <Button variant="danger" onClick={() => removeProject(project.id)}>
                  Delete
                </Button>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
