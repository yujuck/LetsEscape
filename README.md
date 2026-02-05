# Let's Escape

방탈출 정보 제공 및 후기 기록 애플리케이션

## 프로젝트 구조

```
LetsEscape/
├── apps/
│   ├── web/                    # Next.js 프론트엔드
│   │   ├── src/
│   │   │   ├── app/            # App Router (페이지)
│   │   │   ├── components/     # UI 컴포넌트
│   │   │   ├── hooks/          # 커스텀 훅
│   │   │   ├── lib/            # 유틸리티
│   │   │   └── styles/         # 스타일 (Tailwind)
│   │   └── public/
│   │
│   └── api/                    # NestJS 백엔드
│       ├── src/
│       │   ├── modules/        # 기능 모듈
│       │   │   └── crawling/   # 크롤링 모듈
│       │   └── main.ts
│       └── test/
│
├── packages/
│   ├── shared/                 # 공유 타입/상수/유틸리티
│   │   └── src/
│   │       ├── types/          # 타입 정의
│   │       ├── constants/      # 상수
│   │       └── utils/          # 유틸리티 함수
│   ├── eslint-config/          # 공유 ESLint 설정
│   └── tsconfig/               # 공유 TypeScript 설정
│
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

## 시작하기

### 요구사항

- Node.js >= 18.0.0
- pnpm >= 10.0.0

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
# 전체 실행 (Turborepo)
pnpm dev

# 개별 실행
pnpm dev:api    # API 서버 (http://localhost:3001)
pnpm dev:web    # Web 서버 (http://localhost:3000)
```

### 빌드

```bash
# 전체 빌드
pnpm build

# 개별 빌드
pnpm build:api
pnpm build:web
```

### 기타 명령어

```bash
pnpm lint       # 린트 검사
pnpm test       # 테스트 실행
pnpm format     # 코드 포맷팅
pnpm clean      # 빌드 결과물 및 node_modules 삭제
```

## 핵심 기능

### 개인 서비스
- **후기 CRUD**: 후기별 공개/비공개 설정
- **테마 모아보기**: 나만의 테마 리스트 생성 및 카테고리화
- **예약 관리**: 예약 리스트 및 알림 기능

### 전체 서비스
- **업체/테마 정보**: 운영 중인 테마, 매장별/테마별 탈출 시간 랭킹
- **리뷰 모아보기**: 테마별 리뷰 및 한줄평
- **인기 순위**: 인기 테마 Top 5, 예약률 1위
- **탈출 성공률**: 후기 데이터 기반 통계

## 기술 스택

| 영역 | 기술 | 버전 |
|------|------|------|
| 모노레포 | pnpm workspace + Turborepo | pnpm 10.x, turbo 2.x |
| 프론트엔드 | Next.js (App Router) | 16.x |
| UI 라이브러리 | React | 19.x |
| 백엔드 | NestJS | 11.x |
| ORM | TypeORM | 0.3.x |
| 데이터베이스 | PostgreSQL | - |
| 스타일링 | Tailwind CSS | 4.x |
| 상태관리 | TanStack Query | 5.x |
| 크롤링 | Puppeteer | 24.x |

## 워크스페이스 패키지

| 패키지 | 설명 |
|--------|------|
| `@lets-escape/web` | Next.js 프론트엔드 앱 |
| `@lets-escape/api` | NestJS 백엔드 앱 |
| `@lets-escape/shared` | 공유 타입, 상수, 유틸리티 |
| `@lets-escape/tsconfig` | 공유 TypeScript 설정 |
| `@lets-escape/eslint-config` | 공유 ESLint 설정 |

## 라이센스

UNLICENSED
