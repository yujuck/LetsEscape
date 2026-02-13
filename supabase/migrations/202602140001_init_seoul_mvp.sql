-- Let's Escape Seoul MVP initial schema

create type public.difficulty_level as enum (
  'very_easy',
  'easy',
  'normal',
  'hard',
  'very_hard'
);

create type public.fear_level as enum ('none', 'low', 'medium', 'high', 'extreme');
create type public.review_visibility as enum ('public', 'private');
create type public.crawl_job_status as enum (
  'queued',
  'running',
  'success',
  'partial_success',
  'failed'
);
create type public.crawl_record_status as enum ('parsed', 'skipped', 'failed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null unique,
  phone text,
  role text not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.stores (
  id bigint generated always as identity primary key,
  name text not null,
  district text not null,
  address text not null,
  address_detail text,
  phone text,
  homepage_url text,
  reservation_url text,
  lat numeric(10,7),
  lng numeric(10,7),
  reservation_open_note text,
  source_confidence smallint not null default 50,
  is_active boolean not null default true,
  last_crawled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index stores_name_address_unique_idx on public.stores (name, address);
create index stores_district_idx on public.stores (district);
create index stores_active_idx on public.stores (is_active);

create table public.themes (
  id bigint generated always as identity primary key,
  store_id bigint not null references public.stores(id) on delete cascade,
  name text not null,
  description text,
  genre text,
  difficulty public.difficulty_level,
  fear public.fear_level,
  recommended_min_players smallint,
  recommended_max_players smallint,
  play_time_minutes smallint,
  price_krw integer,
  is_active boolean not null default true,
  source_confidence smallint not null default 50,
  last_crawled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint themes_player_range_chk check (
    recommended_min_players is null
    or recommended_max_players is null
    or recommended_min_players <= recommended_max_players
  )
);

create unique index themes_store_name_unique_idx on public.themes (store_id, name);
create index themes_store_idx on public.themes (store_id);
create index themes_active_idx on public.themes (is_active);
create index themes_fear_difficulty_idx on public.themes (fear, difficulty);
create index themes_play_time_idx on public.themes (play_time_minutes);

create table public.reviews (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  theme_id bigint not null references public.themes(id) on delete cascade,
  title text,
  content text not null,
  visibility public.review_visibility not null default 'public',
  rating smallint not null check (rating between 1 and 5),
  perceived_difficulty public.difficulty_level,
  cleared boolean not null,
  clear_time_minutes smallint,
  used_hint_count smallint not null default 0,
  tags text[] not null default '{}',
  likes_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index reviews_theme_idx on public.reviews (theme_id);
create index reviews_user_idx on public.reviews (user_id);
create index reviews_visibility_idx on public.reviews (visibility);
create index reviews_created_at_idx on public.reviews (created_at desc);

create table public.crawl_sources (
  id bigint generated always as identity primary key,
  code text not null unique,
  name text not null,
  base_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.crawl_jobs (
  id bigint generated always as identity primary key,
  source_id bigint not null references public.crawl_sources(id),
  status public.crawl_job_status not null default 'queued',
  started_at timestamptz,
  finished_at timestamptz,
  store_count integer not null default 0,
  theme_count integer not null default 0,
  parsed_count integer not null default 0,
  failed_count integer not null default 0,
  error_message text,
  created_at timestamptz not null default now()
);

create index crawl_jobs_source_created_idx on public.crawl_jobs (source_id, created_at desc);

create table public.crawl_records (
  id bigint generated always as identity primary key,
  job_id bigint not null references public.crawl_jobs(id) on delete cascade,
  source_id bigint not null references public.crawl_sources(id),
  entity_type text not null check (entity_type in ('store', 'theme')),
  source_key text,
  source_url text,
  raw_payload jsonb not null,
  normalized_payload jsonb,
  status public.crawl_record_status not null,
  error_message text,
  created_at timestamptz not null default now()
);

create index crawl_records_job_idx on public.crawl_records (job_id);
create index crawl_records_source_key_idx on public.crawl_records (source_id, source_key);

create table public.data_corrections (
  id bigint generated always as identity primary key,
  entity_type text not null check (entity_type in ('store', 'theme')),
  entity_id bigint not null,
  changed_by uuid references public.profiles(id),
  reason text,
  before_data jsonb,
  after_data jsonb not null,
  created_at timestamptz not null default now()
);

create index data_corrections_entity_idx
  on public.data_corrections (entity_type, entity_id, created_at desc);
