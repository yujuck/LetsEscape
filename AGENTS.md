# Repository Guidelines

## Project Structure & Module Organization
- `apps/web/` contains the Next.js App Router frontend (`src/app`, `src/components`, `src/hooks`, `src/lib`, `src/styles`).
- `apps/api/` contains the NestJS backend (`src/modules`, `src/main.ts`, `test/`).
- `packages/shared/` holds shared types, constants, and utilities used by both apps.
- `packages/eslint-config/` and `packages/tsconfig/` store shared linting and TS configs.

## Build, Test, and Development Commands
- `pnpm dev`: run all apps via Turborepo.
- `pnpm dev:web` / `pnpm dev:api`: run the Next.js or NestJS app only.
- `pnpm build`: build all packages; `pnpm build:web` / `pnpm build:api` for single targets.
- `pnpm lint`: run lint across the monorepo; `pnpm format` to apply Prettier.
- `pnpm test`: run test suites (currently defined in the API package).

## Coding Style & Naming Conventions
- Formatting is enforced with Prettier; see `.prettierrc` (2-space indent, single quotes, semicolons, trailing commas).
- ESLint is configured via `packages/eslint-config/`; follow existing patterns in each app.
- TypeScript is used across the repo; keep types explicit in shared contracts (`packages/shared/src/types`).

## Testing Guidelines
- API tests run with Jest; unit tests live in `apps/api/test` and use `*.spec.ts`.
- Run `pnpm --filter @lets-escape/api test` for API-only tests.
- There is no web test setup yet; add tests alongside features if you introduce one.

## Commit & Pull Request Guidelines
- Commit messages follow a short prefix style seen in history: `Feat:`, `Chore:`, `WIP:` (e.g., `Feat: crawler 분리`).
- PRs should include a concise description, linked issue (if any), and screenshots for UI changes.

## Configuration Notes
- Use `pnpm` (not npm/yarn); the workspace is managed by Turborepo.
- Puppeteer downloads can require `pnpm approve-builds` during install.
