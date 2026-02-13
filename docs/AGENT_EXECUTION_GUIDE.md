# Let's Escape Agent Execution Guide (Seoul MVP)

이 문서는 Claude Code, Cursor, Codex가 동일한 목표/범위로 병렬 개발할 때 사용하는 공통 실행 문서다.

## 1) 목표

- 초기 완성 목표: 서울 방탈출 데이터 기반 MVP를 실제 동작 가능한 상태로 완성한다.
- 범위 우선순위: 데이터 확보 > 탐색/조회 기능 > 리뷰/기록 > 운영 보정.
- 서울 우선 권역: 강남, 홍대, 건대, 신촌.

## 2) P0 체크리스트

아래 항목이 모두 체크되면 MVP 완료로 간주한다.

### A. 데이터 파이프라인

- [ ] `store`, `theme`, `crawl_job`, `crawl_result` 테이블(또는 동등 구조) 설계/반영
- [ ] 매장 후보 수집(서울 대상) 입력 경로 확보 (API/수동 업로드 중 최소 1개)
- [ ] 사이트별 크롤러 어댑터 구조 확립 (`source`별 분리)
- [ ] 크롤링 결과 정규화 저장 (매장명, 권역, 테마명, 인원, 시간, 가격, 공포도)
- [ ] 크롤링 실패 로그/사유 저장
- [ ] 재수집 실행 경로 확보 (수동 트리거 API 또는 스케줄러)

### B. API

- [ ] `GET /stores` 서울 필터 포함 동작
- [ ] `GET /themes` 검색/필터 동작 (권역, 인원, 공포도, 플레이시간)
- [ ] 목록 API 응답에 페이지에서 필요한 필드가 누락 없이 포함
- [ ] API 실패 시 에러 응답 형식 일관성 유지

### C. Web (사용자 기능)

- [ ] `/stores` 페이지가 실제 API 데이터로 렌더링
- [ ] `/themes` 페이지가 실제 API 데이터로 렌더링
- [ ] 필터 UI와 API 파라미터 연동
- [ ] 로딩/빈 상태/오류 상태 UI 반영
- [ ] `/reviews` 후기/기록 CRUD 기본 동작
- [ ] 모바일/데스크톱 반응형 깨짐 없음

### D. 운영/품질

- [ ] 잘못 수집된 매장/테마를 수동 수정할 최소 관리자 경로 확보
- [ ] 중복 데이터 병합 또는 비활성 처리 정책 구현
- [ ] `pnpm --filter @lets-escape/web build` 성공
- [ ] `pnpm --filter @lets-escape/api test` 실행 가능 상태 확인
- [ ] 핵심 플로우 수동 QA 완료 (탐색 -> 조회 -> 기록)

## 3) 구현 원칙

- 전국 확장 금지: 서울 권역 완성 전 범위 확장하지 않는다.
- AI 기능 후순위: 추천 챗봇/요약은 P0 제외.
- 크롤러 단일 거대 스크립트 금지: 소스별 어댑터로 분리.
- 실패 허용 설계: 크롤러 일부 실패가 사용자 API 전체 장애로 이어지지 않아야 한다.
- 데이터 품질 우선: 데이터 개수보다 정확도/최신성 우선.

## 4) 작업 분할 템플릿 (에이전트 공통)

각 작업 시작 시 아래 형식으로 선언하고 진행한다.

- Task: 무엇을 끝낼지 한 줄로 정의
- Scope: 수정 파일/모듈 범위
- Done When: 완료 조건 2~4개
- Validation: 실행할 명령어
- Risk: 실패 가능성 1~2개

예시:

- Task: `/themes`를 샘플 데이터에서 API 연동으로 전환
- Scope: `apps/web/src/app/themes/page.tsx`, `apps/web/src/lib/api.ts`
- Done When: 목록/필터/빈상태가 API 기반으로 동작
- Validation: `pnpm --filter @lets-escape/web build`
- Risk: 응답 타입 불일치

## 5) 에이전트 핸드오프 규칙

- 새 작업 전 `git status --short` 확인
- 본인이 수정한 파일만 커밋 대상으로 관리
- 예상 못한 외부 변경 발견 시 즉시 중단 후 공유
- 완료 시 반드시 아래 4줄 보고

핸드오프 보고 포맷:

1. What changed
2. Validation run
3. Known gaps
4. Next suggested task

## 6) 공통 실행 프롬프트 (복사용)

아래 프롬프트를 Claude Code, Cursor, Codex 중 어디서든 시작 프롬프트로 사용한다.

```text
목표는 Let’s Escape 서울 MVP 완성이다.
범위는 강남/홍대/건대/신촌 데이터 기반의 stores/themes/reviews 핵심 플로우다.

반드시 docs/AGENT_EXECUTION_GUIDE.md의 P0 체크리스트 기준으로 작업하고,
이번 턴에서는 체크리스트 항목을 최소 1개 이상 실제 완료 상태로 바꿔라.

규칙:
1) 범위 확장 금지 (전국, AI 고도화 금지)
2) 데이터 정확도 우선
3) 크롤러는 어댑터 구조 유지
4) 작업 후 Validation 명령 실행 결과를 요약
5) 마지막에 아래 형식으로 보고
- What changed
- Validation run
- Known gaps
- Next suggested task
```

## 7) 즉시 시작 권장 순서

- [ ] `themes/stores`를 샘플 배열에서 API 실데이터 연동으로 전환
- [ ] API 필터 파라미터와 UI 필터 동기화
- [ ] 크롤링 결과 정규화/저장 + 실패 로그 저장
- [ ] 리뷰 CRUD 실제 저장 연동
- [ ] 수동 보정 최소 관리자 경로 추가

