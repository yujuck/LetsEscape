# CLAUDE.md

이 파일은 Claude Code가 프로젝트를 이해하는 데 도움이 되는 컨텍스트를 제공합니다.

## 프로젝트 개요

**Let's Escape**는 방탈출 정보 제공 및 후기 기록 서비스입니다.
pnpm workspace + Turborepo 기반 모노레포 구조로 구성되어 있습니다.

## 기술 스택

- **프론트엔드**: Next.js 16 (App Router), React 19, Tailwind CSS 4, TanStack Query 5
- **백엔드**: NestJS 11, TypeORM 0.3, PostgreSQL
- **모노레포**: pnpm 10, Turborepo 2
- **크롤링**: Puppeteer 24

## 프로젝트 구조

```
LetsEscape/
├── apps/
│   ├── web/          # @lets-escape/web - Next.js 프론트엔드
│   └── api/          # @lets-escape/api - NestJS 백엔드
├── packages/
│   ├── shared/       # @lets-escape/shared - 공유 타입/상수/유틸리티
│   ├── eslint-config/# @lets-escape/eslint-config - ESLint 설정
│   └── tsconfig/     # @lets-escape/tsconfig - TypeScript 설정
```

## 주요 명령어

```bash
# 개발 서버
pnpm dev              # 전체 실행
pnpm dev:api          # API만 (localhost:3001)
pnpm dev:web          # Web만 (localhost:3000)

# 빌드
pnpm build            # 전체 빌드
pnpm build:api        # API만 빌드
pnpm build:web        # Web만 빌드

# 기타
pnpm lint             # 린트 검사
pnpm test             # 테스트
pnpm format           # Prettier 포맷팅
pnpm clean            # 정리

# 의존성 업데이트 확인
npx npm-check-updates --workspaces
```

## 코드 컨벤션

### TypeScript
- 공유 설정: `packages/tsconfig/` (base.json, next.json, nest.json)
- strict 모드 활성화

### ESLint
- 공유 설정: `packages/eslint-config/` (base.js, next.js, nest.js)
- Prettier 통합

### 스타일링 (Tailwind CSS v4)
- CSS 기반 설정 (`@theme` 블록 사용)
- `@import 'tailwindcss'` 문법
- PostCSS 플러그인: `@tailwindcss/postcss`

## 패키지 간 의존성

```
@lets-escape/web
  └── @lets-escape/shared
  └── @lets-escape/tsconfig
  └── @lets-escape/eslint-config

@lets-escape/api
  └── @lets-escape/shared
  └── @lets-escape/tsconfig
  └── @lets-escape/eslint-config
```

## API 포트

- **Web (Next.js)**: http://localhost:3000
- **API (NestJS)**: http://localhost:3001

## 공유 패키지 사용법

```typescript
// 타입 import
import { User, Theme, Review, Store } from '@lets-escape/shared';

// 상수 import
import { API_ROUTES, DIFFICULTY_LEVELS } from '@lets-escape/shared';

// 유틸리티 import
import { formatClearTime, getDifficultyLabel } from '@lets-escape/shared';
```

## 현재 구현된 기능

### API (apps/api)
- [x] 기본 NestJS 설정
- [x] 크롤링 모듈 (BeatPhobia 크롤러)
- [ ] 인증 모듈
- [ ] 사용자 모듈
- [ ] 테마 모듈
- [ ] 매장 모듈
- [ ] 리뷰 모듈
- [ ] 예약 모듈

### Web (apps/web)
- [x] 기본 Next.js 설정 (App Router)
- [x] Tailwind CSS v4 설정
- [x] TanStack Query 설정
- [x] 기본 레이아웃 및 페이지 구조
- [x] API 유틸리티 및 커스텀 훅
- [ ] 인증 UI
- [ ] 테마/매장 목록
- [ ] 리뷰 CRUD UI

### Shared (packages/shared)
- [x] 타입 정의 (User, Store, Theme, Review)
- [x] API 라우트 상수
- [x] 유틸리티 함수

## 환경 변수

API 서버 환경 변수 (`apps/api/.env.local`):

```bash
# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=lets_escape

# App
PORT=3001
NODE_ENV=development
```

## 주의사항

1. **pnpm 사용 필수**: npm/yarn 대신 pnpm 사용
2. **워크스페이스 의존성**: `workspace:*` 프로토콜 사용
3. **Tailwind v4**: JS 설정 파일 대신 CSS `@theme` 블록 사용
4. **빌드 스크립트**: puppeteer 등 일부 패키지는 `pnpm approve-builds` 필요할 수 있음
5. **PostgreSQL**: 데이터베이스로 PostgreSQL 사용 (pg 드라이버)
