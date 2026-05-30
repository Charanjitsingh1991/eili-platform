# EILI Platform — Phase 1

**Economic & Industrial Literacy Institute** — a mobile-first, low-bandwidth financial literacy and planning web app.

## Quick Start

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9
- A Supabase project (free tier)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/Charanjitsingh1991/eili-platform.git
cd eili-platform

# 2. Install dependencies
pnpm install

# 3. Copy environment variables
cp .env.example .env.local
# Fill in your Supabase credentials in .env.local

# 4. Run the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm test:e2e` | Run E2E tests (Playwright) |
| `pnpm db:generate` | Generate Drizzle migrations |
| `pnpm db:migrate` | Run Drizzle migrations |
| `pnpm db:push` | Push schema to database |
| `pnpm db:seed` | Seed database with sample data |

## Project Structure

```
src/
  app/           — Next.js App Router pages
  modules/       — Bounded contexts (content, reader, tools, identity)
  lib/           — Cross-module utilities
  styles/        — Global CSS
packages/
  ui/            — Design system tokens + shadcn components
  db/            — Drizzle schema + migrations
tests/
  e2e/           — Playwright E2E tests
docs/            — Architecture decision records
```

## Tech Stack

Next.js 16 · React 19 · TypeScript strict · Tailwind CSS · shadcn/ui · Supabase (Postgres + Auth) · Drizzle ORM · Vitest · Playwright

## License

All rights reserved. © Economic & Industrial Literacy Institute (EILI).
