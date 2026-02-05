# Let's Escape 모노레포 구조화 계획

## 서비스 개요
**Let's Escape** - 방탈출 정보 제공 및 후기 기록 애플리케이션

### 핵심 기능
- **개인 서비스**: 후기 CRUD, 테마 모아보기/카테고리화, 예약 관리
- **전체 서비스**: 업체/테마 정보, 리뷰 모아보기, 인기 순위, 탈출 성공률

---

## 모노레포 구조

```
LetsEscape/
├── apps/
│   ├── web/                    # Next.js 프론트엔드
│   │   ├── src/
│   │   │   ├── app/            # App Router
│   │   │   ├── components/     # UI 컴포넌트
│   │   │   ├── hooks/          # 커스텀 훅
│   │   │   ├── lib/            # 유틸리티
│   │   │   └── styles/         # 스타일
│   │   ├── public/
│   │   ├── next.config.js
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── api/                    # NestJS 백엔드 (기존 src 이동)
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/       # 인증
│       │   │   ├── user/       # 사용자
│       │   │   ├── store/      # 매장
│       │   │   ├── theme/      # 테마
│       │   │   ├── review/     # 리뷰
│       │   │   ├── category/   # 카테고리
│       │   │   ├── reservation/# 예약
│       │   │   └── crawling/   # 크롤링
│       │   ├── common/         # 공통 모듈
│       │   └── main.ts
│       ├── test/
│       ├── nest-cli.json
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── shared/                 # 공유 타입/상수
│   │   ├── src/
│   │   │   ├── types/          # 공유 타입 정의
│   │   │   ├── constants/      # 공유 상수
│   │   │   └── utils/          # 공유 유틸리티
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── eslint-config/          # 공유 ESLint 설정
│   │   ├── base.js
│   │   ├── next.js
│   │   ├── nest.js
│   │   └── package.json
│   │
│   └── tsconfig/               # 공유 TypeScript 설정
│       ├── base.json
│       ├── next.json
│       ├── nest.json
│       └── package.json
│
├── pnpm-workspace.yaml         # pnpm 워크스페이스 설정
├── package.json                # 루트 package.json
├── turbo.json                  # Turborepo 설정 (빌드 최적화)
├── PLAN.md                     # 이 계획 문서
├── .gitignore
└── README.md
```

---

## 구현 단계

### Phase 1: 모노레포 기본 구조 설정
1. 프로젝트 루트에 `PLAN.md` 문서 생성
2. 루트 `pnpm-workspace.yaml` 생성
3. 루트 `package.json` 수정 (워크스페이스 스크립트 추가)
4. `turbo.json` 생성 (빌드 파이프라인 설정)

### Phase 2: 공유 패키지 생성
1. `packages/tsconfig/` - 공유 TypeScript 설정
2. `packages/eslint-config/` - 공유 ESLint 설정
3. `packages/shared/` - 공유 타입 정의 (기존 엔티티 타입 이동)

### Phase 3: 백엔드 앱 구조화
1. `apps/api/` 폴더 생성
2. 기존 NestJS 코드 이동 (`src/`, `test/`, 설정 파일들)
3. 모듈 구조 재정리 (modules 디렉토리)
4. 공유 패키지 의존성 연결

### Phase 4: 프론트엔드 앱 생성
1. `apps/web/` 폴더에 Next.js 프로젝트 생성
2. App Router 기반 구조 설정
3. 공유 패키지 의존성 연결
4. 기본 레이아웃 및 페이지 구조 설정

### Phase 5: 개발 환경 통합
1. 루트 레벨 스크립트 설정 (dev, build, lint, test)
2. 환경 변수 관리 구조 설정
3. Docker Compose 설정 (선택사항)

---

## 주요 파일 변경 사항

### 신규 생성
- `PLAN.md` (이 문서)
- `pnpm-workspace.yaml`
- `turbo.json`
- `apps/web/` (전체)
- `apps/api/` (기존 코드 이동)
- `packages/shared/`
- `packages/tsconfig/`
- `packages/eslint-config/`

### 수정
- 루트 `package.json` (워크스페이스 설정으로 변경)
- 루트 `.gitignore` (모노레포 패턴 추가)

### 이동/삭제
- `src/` → `apps/api/src/`
- `test/` → `apps/api/test/`
- 루트의 NestJS 관련 설정 파일들 → `apps/api/`

---

## 기술 스택 요약

| 영역 | 기술 |
|------|------|
| 모노레포 도구 | pnpm workspace + Turborepo |
| 프론트엔드 | Next.js 14+ (App Router) |
| 백엔드 | NestJS 10 |
| 데이터베이스 | MySQL + TypeORM |
| 스타일링 | Tailwind CSS |
| 상태관리 | TanStack Query (서버 상태) |

---

## 검증 방법

1. **구조 확인**: `pnpm install` 성공 여부
2. **백엔드 실행**: `pnpm --filter api dev` → 기존 기능 동작 확인
3. **프론트엔드 실행**: `pnpm --filter web dev` → Next.js 실행 확인
4. **빌드 테스트**: `pnpm build` → 전체 빌드 성공 여부
5. **공유 패키지**: apps에서 `@lets-escape/shared` import 가능 여부
