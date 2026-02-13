# DB Schema Proposal (Seoul MVP)

서울 MVP 완성을 위한 최소 스키마 설계안.

## 1) 설계 원칙

- 사용자 인증은 Supabase Auth(`auth.users`)를 사용한다.
- 앱 도메인 데이터(매장/테마/리뷰/크롤링)는 `public` 스키마에 둔다.
- 서울 권역 완성을 목표로 하며, 전국 확장은 후순위다.
- 문자열 대신 가능한 정규 타입(분/원/좌표/enum)을 사용한다.

## 2) 테이블 목록 (P0)

- `profiles`: 앱 사용자 프로필
- `stores`: 매장
- `themes`: 테마
- `reviews`: 사용자 후기/기록
- `crawl_sources`: 크롤링 소스 메타
- `crawl_jobs`: 크롤링 실행 이력
- `crawl_records`: 크롤링 원본/정규화 결과
- `data_corrections`: 수동 보정 이력

## 3) 타입/키 결정

- `profiles.id`는 `uuid`이며 `auth.users.id`를 FK로 참조한다.
- `reviews.user_id`도 `uuid`로 `profiles.id`를 참조한다.
- 도메인 PK(`stores`, `themes`, `reviews`)는 `bigint identity` 사용.
- 시간은 `minutes` 정수 컬럼 사용(예: 70분 -> `70`).
- 가격은 `price_krw` 정수 컬럼 사용(예: 28000원 -> `28000`).
- 좌표는 `numeric(10,7)` (`lat`, `lng`)로 분리 저장.

## 4) DDL (초안)

```sql
-- enum
create type public.difficulty_level as enum ('very_easy', 'easy', 'normal', 'hard', 'very_hard');
create type public.fear_level as enum ('none', 'low', 'medium', 'high', 'extreme');
create type public.review_visibility as enum ('public', 'private');
create type public.crawl_job_status as enum ('queued', 'running', 'success', 'partial_success', 'failed');
create type public.crawl_record_status as enum ('parsed', 'skipped', 'failed');

-- profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null unique,
  phone text,
  role text not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- stores
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

create unique index stores_name_address_unique_idx
  on public.stores (name, address);
create index stores_district_idx on public.stores (district);
create index stores_active_idx on public.stores (is_active);

-- themes
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
  constraint themes_player_range_chk
    check (
      recommended_min_players is null
      or recommended_max_players is null
      or recommended_min_players <= recommended_max_players
    )
);

create unique index themes_store_name_unique_idx
  on public.themes (store_id, name);
create index themes_store_idx on public.themes (store_id);
create index themes_active_idx on public.themes (is_active);
create index themes_fear_difficulty_idx on public.themes (fear, difficulty);
create index themes_play_time_idx on public.themes (play_time_minutes);

-- reviews
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

-- crawl_sources
create table public.crawl_sources (
  id bigint generated always as identity primary key,
  code text not null unique,
  name text not null,
  base_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- crawl_jobs
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

create index crawl_jobs_source_created_idx
  on public.crawl_jobs (source_id, created_at desc);

-- crawl_records
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

-- data_corrections
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
```

## 5) RLS 초안

- `profiles`: 본인 조회/수정 허용.
- `reviews`: `public` 리뷰는 전체 조회 허용, `private`는 작성자만 조회 허용.
- `stores/themes`: 조회는 전체 허용, 수정/삭제는 서버(Role key) 또는 admin만 허용.
- `crawl_*`, `data_corrections`: 일반 사용자 접근 차단, 서버 또는 admin만 허용.

## 6) 코드 타입 변경 필요사항 (중요)

현재 공유 타입과 충돌하는 지점이 있으므로 아래 변경이 필요하다.

- `packages/shared/src/types/user.ts`
  - `id?: number` -> `id?: string` (`uuid`)
  - `password` 필드 제거 (Auth는 Supabase가 관리)
- `packages/shared/src/types/review.ts`
  - `userId?: number` -> `userId?: string`
  - `clearTime: string` -> `clearTimeMinutes: number`
- `packages/shared/src/types/store.ts`
  - `coordinate: number` -> `lat?: number`, `lng?: number`
- `packages/shared/src/types/theme.ts`
  - `time: string` -> `playTimeMinutes?: number`
  - `price: string` -> `priceKrw?: number`

## 7) P0 완료 체크포인트

- `stores/themes/reviews` API가 위 스키마 기준으로 CRUD 동작
- 크롤러가 `crawl_jobs`, `crawl_records`를 남기고 정상/실패를 구분
- 목록 API에서 서울 권역 필터(강남/홍대/건대/신촌) 동작
- 리뷰 공개/비공개 정책이 RLS와 API 양쪽에서 일치

