# Infomist

Marketing website for Infomist, a software development company (custom software, AI automation, web/mobile development) founded in 2001.

## Run & Operate

- `pnpm --filter @workspace/infomist-web run dev` — run the website (frontend, port from workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind, shadcn/ui, wouter router, framer-motion
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (not yet used by the site — content is static)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/infomist-web` — the marketing site (react-vite artifact, previewPath `/`). Pages in `src/pages/` (Home, Solutions, CaseStudies, Company, Resources, SolutionsDirectory, CategoryPage, SubcategoryPage). Shared sections in `src/components/`. Solutions taxonomy data in `src/data/solutionsData.ts`.
- `artifacts/api-server` — shared Express API (currently just `/healthz`; unused by the site so far).
- `artifacts/mockup-sandbox` — canvas design mockup sandbox (unused so far).

## Architecture decisions

- The site content is fully static (no backend calls) — all copy and taxonomy data lives in TS files under `src/`.

## Product

- Public marketing site with a homepage, solutions directory (multi-level: solutions → category → subcategory pages), case studies, company/about page, and a resources section.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
