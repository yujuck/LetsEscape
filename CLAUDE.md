# CLAUDE.md

이 파일은 Claude Code가 프로젝트를 이해하는 데 도움이 되는 컨텍스트를 제공합니다.

## 프로젝트 개요

**Let's Escape**는 방탈출 정보 제공 및 후기 기록 서비스입니다.
pnpm workspace + Turborepo 기반 모노레포 구조로 구성되어 있습니다.

## 기술 스택

- **프론트엔드**: Next.js 16 (App Router), React 19, Tailwind CSS 4, TanStack Query 5
- **백엔드**: NestJS 11
- **데이터베이스**: Supabase (PostgreSQL)
- **인증**: Supabase Auth (프론트 직접) + NestJS Guard (토큰 검증)
- **파일 저장**: Supabase Storage (프론트 직접)
- **실시간**: Supabase Realtime (프론트 직접)
- **모노레포**: pnpm 10, Turborepo 2
- **크롤링**: Puppeteer 24
- **AI (예정)**: Claude API / OpenAI API

## 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                      Next.js (프론트엔드)                    │
├─────────────────────────────────────────────────────────────┤
│  Supabase 직접 호출        │  NestJS API 호출               │
│  • Auth (로그인/회원가입)   │  • 테마/매장/리뷰 CRUD         │
│  • Storage (이미지)        │  • AI 추천                     │
│  • Realtime (알림)         │  • 크롤링                      │
└──────────┬─────────────────┴──────────────┬─────────────────┘
           │                                │ (+ Auth Token)
           ▼                                ▼
┌──────────────────┐            ┌──────────────────────────────┐
│  Supabase        │            │  NestJS (백엔드 API)          │
│  • Auth          │◄───────────│  • Auth Guard (토큰 검증)     │
│  • Storage       │            │  • CRUD Services             │
│  • Realtime      │            │  • AI Service                │
│  • PostgreSQL ◄──────────────│  • Crawling Service          │
└──────────────────┘            └──────────────────────────────┘
```

### 역할 분담

| 기능 | 처리 위치 | 이유 |
|------|----------|------|
| 인증 (로그인/회원가입) | Supabase 직접 | 소셜 로그인, 세션 관리 |
| 파일 업로드 | Supabase 직접 | 간편한 업로드 |
| 실시간 알림 | Supabase 직접 | WebSocket 없이 구현 |
| CRUD (테마/매장/리뷰) | **NestJS 경유** | 백엔드 경험 |
| AI 기능 | **NestJS 경유** | API 키 보호 |
| 크롤링 | **NestJS 경유** | 서버 사이드 작업 |

## 프로젝트 구조

```
LetsEscape/
├── apps/
│   ├── web/                        # Next.js 프론트엔드
│   │   └── src/
│   │       ├── app/                # App Router 페이지
│   │       ├── components/         # UI 컴포넌트
│   │       ├── hooks/              # 커스텀 훅
│   │       ├── lib/
│   │       │   ├── supabase/       # Supabase (Auth, Storage, Realtime)
│   │       │   └── api.ts          # NestJS API 호출 유틸리티
│   │       └── middleware.ts       # 세션 관리
│   │
│   └── api/                        # NestJS 백엔드
│       └── src/
│           ├── common/
│           │   ├── supabase/       # Supabase DB 서비스
│           │   └── guards/         # Auth Guard (토큰 검증)
│           └── modules/
│               ├── themes/         # 테마 CRUD
│               ├── stores/         # 매장 CRUD
│               ├── reviews/        # 리뷰 CRUD
│               ├── crawling/       # 크롤링
│               └── ai/             # AI 추천
│
├── packages/
│   ├── shared/                     # 공유 타입/상수/유틸리티
│   ├── eslint-config/              # ESLint 설정
│   └── tsconfig/                   # TypeScript 설정
│
└── docs/
    └── DECISIONS.md                # 기술 결정 문서
```

## 주요 명령어

```bash
# 개발 서버
pnpm dev              # 전체 실행
pnpm dev:api          # API만 (localhost:3001)
pnpm dev:web          # Web만 (localhost:3000)

# 빌드
pnpm build

# 기타
pnpm lint
pnpm test
pnpm format
```

## 환경 변수

### apps/api/.env.local
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=3001
NODE_ENV=development
```

### apps/web/.env.local
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 코드 패턴

### 프론트엔드: Supabase Auth 사용
```typescript
// useAuth 훅 사용 (권장)
import { useAuth } from '@/hooks';

function LoginComponent() {
  const { user, signIn, signUp, signOut, signInWithOAuth, isAuthenticated } = useAuth();

  await signIn(email, password);
  await signInWithOAuth('google'); // 또는 'kakao'
  await signOut();
}
```

### 프론트엔드: NestJS API 호출
```typescript
// CRUD (NestJS 경유, 인증 토큰 자동 포함)
import { api } from '@/lib/api';

// 공개 API
const themes = await api.themes.getAll();

// 인증 필요 API (토큰 자동 포함)
const myReviews = await api.reviews.getMy();
await api.reviews.create({ content, rating, themeId });
```

### 백엔드: Auth Guard로 토큰 검증
```typescript
@UseGuards(SupabaseAuthGuard)
@Post('reviews')
async createReview(@CurrentUser() user, @Body() dto) {
  // user는 검증된 Supabase 유저 정보
}
```

### 백엔드: Supabase DB 사용
```typescript
@Injectable()
export class ThemesService {
  constructor(private supabase: SupabaseService) {}

  async findAll() {
    const { data } = await this.supabase.from('themes').select('*');
    return data;
  }
}
```

## 현재 구현된 기능

### API (apps/api)
- [x] 기본 NestJS 설정
- [x] Supabase 연동 모듈
- [x] 크롤링 모듈
- [x] Auth Guard (Supabase 토큰 검증)
- [x] CurrentUser 데코레이터
- [ ] 테마 모듈
- [ ] 매장 모듈
- [ ] 리뷰 모듈
- [ ] AI 추천 모듈

### Web (apps/web)
- [x] 기본 Next.js 설정
- [x] Tailwind CSS v4 설정
- [x] TanStack Query 설정
- [x] Supabase 클라이언트 (Auth/Storage/Realtime용)
- [x] 미들웨어 (세션 관리)
- [x] useAuth 훅 (로그인/회원가입/소셜 로그인)
- [x] Auth 콜백 라우트 (OAuth)
- [x] API 유틸리티 (인증 토큰 자동 포함)
- [ ] 인증 UI
- [ ] 테마/매장 목록
- [ ] 리뷰 CRUD UI

## 주의사항

1. **CRUD는 반드시 NestJS 경유**: 백엔드 학습 목적
2. **Auth/Storage/Realtime은 Supabase 직접**: 이점 활용
3. **pnpm 사용 필수**
4. **Tailwind v4**: CSS `@theme` 블록 사용
5. **Service Role Key**: API 서버에서만 사용
