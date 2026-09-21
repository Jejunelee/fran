"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  FileText,
  HelpCircle,
  KeyRound,
  LayoutDashboard,
  Lightbulb,
  Menu,
  Search,
  Settings,
  Share2,
  TrendingUp,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useAppStore } from "@/components/providers/app-provider";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/research", label: "Research", icon: Search },
  { href: "/keywords", label: "Keywords", icon: KeyRound },
  { href: "/trends", label: "Trends", icon: TrendingUp },
  { href: "/questions", label: "Questions", icon: HelpCircle },
  { href: "/social", label: "Social SEO", icon: Share2 },
  { href: "/content", label: "Content Opportunities", icon: Lightbulb },
  { href: "/calendar", label: "Content Calendar", icon: CalendarDays },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { project, supabaseConfigured, cloudMessage } = useAppStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 z-30 w-64 border-r border-slate-200 bg-white p-4 lg:static ${open ? "block" : "hidden lg:block"}`}>
          <div className="mb-6 flex items-center justify-between">
            <Link href="/dashboard" className="text-sm font-semibold tracking-tight text-violet-700">
              Social SEO Keyword Research
            </Link>
            <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="space-y-1">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                    active ? "bg-violet-50 font-medium text-violet-800" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center gap-3">
              <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-sm font-medium">{project?.name ?? "No research selected"}</p>
                <p className="text-xs text-slate-500">
                  {project?.isDemo ? "Demo data — not live search metrics." : project ? `${project.topic} · ${project.platform}` : "Create a research project to begin."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <BarChart3 className="h-4 w-4 text-violet-600" />
              {supabaseConfigured ? "Supabase configured" : "Local / demo mode"}
              {cloudMessage ? <span className="hidden max-w-xs truncate sm:inline">{cloudMessage}</span> : null}
              <Link href="/login" className="text-violet-700 hover:underline">
                Account
              </Link>
            </div>
          </header>
          <main className="flex-1 p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
