-- Social SEO Keyword Research schema
-- Apply with Supabase CLI or the SQL editor.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  default_country text default 'Australia',
  default_platform text default 'instagram',
  default_min_volume integer,
  default_max_kd integer,
  preferred_currency text default 'AUD',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.research_projects (
  id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  topic text not null,
  country text,
  city text,
  audience text,
  platform text not null,
  goal text not null,
  is_demo boolean not null default false,
  trend_direction text,
  data_sources text[] not null default '{}',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.research_settings (
  id text primary key,
  project_id text not null references public.research_projects (id) on delete cascade,
  min_volume integer,
  max_volume integer,
  max_kd integer,
  max_competition integer,
  keyword_length text default 'any',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.keywords (
  id text primary key,
  project_id text not null references public.research_projects (id) on delete cascade,
  keyword text not null,
  location text,
  source text,
  intents text[] not null default '{}',
  google_fit text,
  social_fit text,
  selected boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.keyword_metrics (
  id text primary key,
  keyword_id text not null references public.keywords (id) on delete cascade,
  volume numeric,
  volume_status text,
  volume_source text,
  seo_kd numeric,
  seo_kd_status text,
  google_ads_competition numeric,
  google_ads_competition_status text,
  cpc numeric,
  trend text,
  trend_status text,
  social_relevance numeric,
  google_relevance numeric,
  opportunity_score numeric,
  opportunity_status text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.keyword_sources (
  id text primary key,
  keyword_id text not null references public.keywords (id) on delete cascade,
  source text not null,
  status text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.keyword_questions (
  id text primary key,
  project_id text not null references public.research_projects (id) on delete cascade,
  question text not null,
  intents text[] not null default '{}',
  source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trend_data (
  id text primary key,
  project_id text not null references public.research_projects (id) on delete cascade,
  topic text not null,
  points jsonb not null default '[]'::jsonb,
  direction text,
  seasonality text,
  related_topics text[] default '{}',
  rising_queries text[] default '{}',
  status text,
  source text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.social_suggestions (
  id text primary key,
  project_id text not null references public.research_projects (id) on delete cascade,
  phrase text not null,
  platform text,
  grouping text,
  intents text[] default '{}',
  social_relevance numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_clusters (
  id text primary key,
  project_id text not null references public.research_projects (id) on delete cascade,
  name text not null,
  pillar text,
  supporting text[] default '{}',
  questions text[] default '{}',
  commercial text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_ideas (
  id text primary key,
  project_id text not null references public.research_projects (id) on delete cascade,
  keyword_id text,
  title text not null,
  hook text,
  angle text,
  format text,
  platform text,
  goal text,
  cta text,
  supporting_keywords text[] default '{}',
  intents text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_calendar (
  id text primary key,
  project_id text not null references public.research_projects (id) on delete cascade,
  week integer,
  date_label text,
  topic text,
  primary_keyword text,
  supporting_keywords text[] default '{}',
  intents text[] default '{}',
  platform text,
  format text,
  goal text,
  cta text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.imports (
  id text primary key,
  project_id text not null references public.research_projects (id) on delete cascade,
  file_name text,
  kind text,
  row_count integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reports (
  id text primary key,
  project_id text not null references public.research_projects (id) on delete cascade,
  title text,
  body jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists keywords_project_id_idx on public.keywords (project_id);
create index if not exists keyword_metrics_keyword_id_idx on public.keyword_metrics (keyword_id);
create index if not exists keyword_questions_project_id_idx on public.keyword_questions (project_id);

alter table public.profiles enable row level security;
alter table public.research_projects enable row level security;
alter table public.research_settings enable row level security;
alter table public.keywords enable row level security;
alter table public.keyword_metrics enable row level security;
alter table public.keyword_sources enable row level security;
alter table public.keyword_questions enable row level security;
alter table public.trend_data enable row level security;
alter table public.social_suggestions enable row level security;
alter table public.content_clusters enable row level security;
alter table public.content_ideas enable row level security;
alter table public.content_calendar enable row level security;
alter table public.imports enable row level security;
alter table public.reports enable row level security;

create or replace function public.is_project_owner(pid text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.research_projects p
    where p.id = pid and p.user_id = auth.uid()
  );
$$;

create policy "profiles_own" on public.profiles
  for all using (id = auth.uid()) with check (id = auth.uid());

create policy "projects_own" on public.research_projects
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "settings_own" on public.research_settings
  for all using (public.is_project_owner(project_id)) with check (public.is_project_owner(project_id));

create policy "keywords_own" on public.keywords
  for all using (public.is_project_owner(project_id)) with check (public.is_project_owner(project_id));

create policy "questions_own" on public.keyword_questions
  for all using (public.is_project_owner(project_id)) with check (public.is_project_owner(project_id));

create policy "trends_own" on public.trend_data
  for all using (public.is_project_owner(project_id)) with check (public.is_project_owner(project_id));

create policy "social_own" on public.social_suggestions
  for all using (public.is_project_owner(project_id)) with check (public.is_project_owner(project_id));

create policy "clusters_own" on public.content_clusters
  for all using (public.is_project_owner(project_id)) with check (public.is_project_owner(project_id));

create policy "ideas_own" on public.content_ideas
  for all using (public.is_project_owner(project_id)) with check (public.is_project_owner(project_id));

create policy "calendar_own" on public.content_calendar
  for all using (public.is_project_owner(project_id)) with check (public.is_project_owner(project_id));

create policy "imports_own" on public.imports
  for all using (public.is_project_owner(project_id)) with check (public.is_project_owner(project_id));

create policy "reports_own" on public.reports
  for all using (public.is_project_owner(project_id)) with check (public.is_project_owner(project_id));

create policy "metrics_own" on public.keyword_metrics
  for all using (
    exists (
      select 1 from public.keywords k
      join public.research_projects p on p.id = k.project_id
      where k.id = keyword_id and p.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.keywords k
      join public.research_projects p on p.id = k.project_id
      where k.id = keyword_id and p.user_id = auth.uid()
    )
  );

create policy "kw_sources_own" on public.keyword_sources
  for all using (
    exists (
      select 1 from public.keywords k
      join public.research_projects p on p.id = k.project_id
      where k.id = keyword_id and p.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.keywords k
      join public.research_projects p on p.id = k.project_id
      where k.id = keyword_id and p.user_id = auth.uid()
    )
  );

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
