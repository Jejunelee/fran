import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <p className="text-sm font-semibold text-violet-700">Social SEO Keyword Research</p>
        <div className="flex gap-3 text-sm">
          <Link href="/login" className="text-slate-600 hover:text-slate-900">
            Sign in
          </Link>
          <Link href="/dashboard" className="rounded-lg bg-violet-600 px-3 py-2 font-medium text-white">
            Open app
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-xs font-medium uppercase tracking-wide text-violet-700">Social SEO + Google research</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Keyword research that stays useful without paid SEO APIs.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-600">
          Generate keyword candidates, classify intent, import Keyword Planner or Trends files, paste social
          autocomplete suggestions, score opportunities from available data, and export a research report.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/research/new" className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white">
            Start research
          </Link>
          <Link href="/dashboard" className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium">
            Continue in demo mode
          </Link>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            "Works offline with generated keywords, questions, clusters, and content angles.",
            "Import volume, competition, KD, and Trends — clearly labeled Imported or User supplied.",
            "Never invents search volume, KD, CPC, or rankings.",
          ].map((item) => (
            <li key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
              {item}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
