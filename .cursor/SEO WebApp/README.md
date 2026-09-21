# Social SEO Keyword Research

Production-oriented Next.js app for social SEO + Google keyword research **without paid SEO APIs**.

The app stays useful with no external data: generate keyword combinations and questions, classify intent, cluster topics, score only when metrics exist, import CSV/XLSX, paste social suggestions, and export a report.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional — leave empty for local/demo mode
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Legacy anon key |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | No | Newer publishable key (used if set) |
| `SUGGESTIONS_PROVIDER_ENABLED` | No | Set `false` to disable the public suggest proxy |

No SEMrush, Ahrefs, or Google Ads key is required.

## What works without APIs

- Research wizard and local persistence
- Keyword / question generation
- Intent classification, clustering, content ideas, calendar
- CSV/XLSX import with column mapping
- Google Trends CSV / manual series
- Pasted social autocomplete suggestions
- Opportunity score only when demand, competition, or trend data exists
- Demo project labeled **Demo data — not live search metrics.**

## Optional providers

- **Supabase**: auth + cloud save (`supabase/migrations/20260921000000_init.sql`)
- **Google Suggest**: rate-limited server proxy at `/api/suggestions`
- **AI**: interface exists; deterministic fallback is the default

## Database

Apply `supabase/migrations/20260921000000_init.sql` in the Supabase SQL editor or via the CLI. RLS limits users to their own projects.

## Scripts

```bash
npm run lint
npx tsc --noEmit
```
