"use client";

import Link from "next/link";
import { ResearchDashboard } from "@/components/dashboard/research-dashboard";
import { useAppStore } from "@/components/providers/app-provider";

export default function DashboardPage() {
  const { project, ready } = useAppStore();
  if (!ready) return <p className="text-sm text-slate-500">Loading…</p>;
  if (!project) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-slate-600">No research yet.</p>
        <Link className="text-violet-700 hover:underline" href="/research/new">
          Create research
        </Link>
      </div>
    );
  }
  return <ResearchDashboard project={project} />;
}
