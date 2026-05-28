# EILI Platform — Build Progress

Live URL: https://eili-platform-b7jgw4cqq-developer-afris-projects.vercel.app  
GitHub: https://github.com/Charanjitsingh1991/eili-platform  
Supabase project: `gwnqjltpbujqiwupousb`

---

## Sprint S0 — Foundation scaffold ✅
*Completed: 2026-05-28*

### Files created
- **Root config** — `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `.eslintrc.cjs`, `.prettierrc`, `postcss.config.js`, `pnpm-workspace.yaml`, `vitest.config.ts`, `playwright.config.ts`, `vercel.json`
- **packages/ui/** — `tokens.ts` (design tokens: accent `#0F4C5C`, Source Serif 4, Inter), `components/button.tsx`, `components/input.tsx`, `components/label.tsx`, `components/card.tsx`, `lib/utils.ts`, `index.ts`
- **packages/db/** — `schema.ts`, `drizzle.config.ts`, `PII_INVENTORY.md`, schemas for content / reader / tools / identity
- **src/lib/** — `env.ts` (Zod env validation), `logger.ts`, `result.ts` (Result<T,E> type), `consent.ts`, `analytics.ts` (PostHog EU, consent-gated), `supabase/client.ts`, `supabase/server.ts`, `supabase/admin.ts`
- **src/app/** — root `layout.tsx` (Source Serif 4 + Inter fonts, skip-link), `page.tsx` (home), auth routes (`/auth/callback`, `/auth/login`)
- **src/app route stubs** — `/start-reading`, `/publications`, `/tools`, `/tools/planner`, `/tools/scorecard`, `/tools/reset`, `/for-households`, `/about`
- **src/modules/** — `content/public.ts`, `reader/public.ts`, `tools/public.ts`, `identity/public.ts` (boundary stubs)
- **src/middleware.ts** — Supabase auth refresh + anonymous session cookie (`eili_anon_session_id`), guarded against missing env vars
- **src/styles/globals.css** — Tailwind base, focus-ring utility
- **tests/** — `src/lib/result.test.ts` (3 unit tests, all pass), `tests/e2e/smoke.spec.ts`
- **CI** — `.github/workflows/ci.yml` (typecheck → lint → test → build)
- **Docs** — `README.md`, `docs/adr-notes.md`

### Verification
| Check | Result |
|-------|--------|
| `pnpm typecheck` | ✅ PASS |
| `pnpm build` | ✅ PASS (14 routes) |
| `pnpm test` | ✅ 3/3 PASS |
| Git push | ✅ `origin/main` |
| Vercel deploy | ✅ Live |

### Key decisions
- Next.js upgraded 15.1.6 → 16.2.6 (vulnerability fix)
- `vercel.json` added with `"framework": "nextjs"` (fixes output directory error)
- `NODE_TLS_REJECT_UNAUTHORIZED=0` required locally for Google Fonts fetch (SSL interception on local network — not an issue on Vercel CI)
- `pnpm config set strict-ssl false` set locally to unblock installs

---

## Sprint S1 — Supabase + Database ✅
*Completed: 2026-05-28*

### What was done
- Supabase project provisioned via Vercel ↔ Supabase integration
- Env vars auto-injected into Vercel: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `.env.local` created locally with all Supabase + Postgres credentials
- Drizzle migration generated and applied to Supabase

### Database tables live (12 tables)
| Table | Module |
|-------|--------|
| `books` | content |
| `chapters` | content |
| `series` | content |
| `themes` | content |
| `levels` | content |
| `reader_sessions` | reader |
| `chapter_progress` | reader |
| `planner_drafts` | tools |
| `scorecards` | tools |
| `reset_progress` | tools |
| `anon_sessions` | identity |
| `profiles` | identity |

### Enums
`book_status`, `literacy_level`, `scorecard_band`, `user_category`, `literacy_assessment`

### RLS policies applied
- All 13 tables have RLS enabled
- Content tables: public read (published books/chapters only)
- User tables: owner-check policies (profile_id matches `auth.uid()` or `service_role` for anon)
- Applied via `scripts/apply-rls.ts` using the `postgres` driver directly

### Migration files
- `packages/db/migrations/0000_mysterious_leader.sql` — all 12 tables + enums + FK constraints
- `packages/db/migrations/0001_rls_policies.sql` — all RLS policies

---

## Sprint S2 — Navigation + All Pages ✅
*Completed: 2026-05-28*

### Components created
- `src/components/layout/header.tsx` — sticky header, 6 nav links, mobile hamburger menu, "Read Free Book" CTA, 44px tap targets
- `src/components/layout/footer.tsx` — 4-zone desktop grid / stacked mobile: Identity, Navigation, Actions, Legal + Global Access Note + Copyright

### Root layout updated
- Header + Footer added to `src/app/layout.tsx`
- Body uses `flex flex-col min-h-screen` so footer sticks to bottom

### Pages with full content (per Phase 1 V2 spec)

#### `/` — Home
Sections: Hero · A Simple System That Works (Read→Plan→Score→Improve flow) · Start Here (3 cards) · Featured Books (3 books) · Tools Preview (3 tools) · Designed for Real Life · Final CTA

#### `/start-reading`
Sections: Hero · Reading Modes (Standard/Lite/Download cards) · Main Book (Household Money Literacy) · Continue Your Path (Households + Students) · Move to Action (tools links) · Accessibility note · Final CTA

#### `/publications`
Sections: Hero · Core Books (4 cards incl. Coming Soon) · Access Options (Read Online/Download/Buy Print) · Continue Your Path (3-step path) · Global Access note · Final CTA

#### `/tools`
Sections: Hero · System overview (Read→Plan→Score→Improve) · Tool 1 Planner (inputs list) · Tool 2 Scorecard (5 pillars + 3 bands) · Tool 3 30-Day Reset (4 weeks) · How to Use (4 steps) · Download Center · Disclaimer + Final CTA

#### `/for-households`
Sections: Hero · If This Feels Familiar (reality check + closing statement) · Start Here Step by Step (4 numbered steps) · What Will Change (Clarity/Control/Stability/Confidence) · Simple Tools (3 cards) · Start From Your Situation (3 branches) · Accessibility · Final CTA

#### `/about`
Sections: Hero · Mission & Vision (quoted mission statement in callout) · Why This Platform Exists · What This Platform Does (Learn/Apply/Improve) · The Approach (Simple/Practical/Structured) · Who It Is For (Households + Students) · Global Access · Looking Ahead · Final CTA

### Stub pages (content coming in later sprints)
- `/tools/planner` — Sprint S4
- `/tools/scorecard` — Sprint S5
- `/tools/reset` — Sprint S6
- `/start-reading/[book]` — Sprint S3
- `/start-reading/[book]/[chapter]` — Sprint S3
- `/publications/[book]` — Sprint S7
- `/auth/login` — Sprint S1 (form pending)

---

---

## Sprint S3a — Chapter Reader core ✅
*Completed: 2026-05-28*

### Packages added
- `marked` 18 — markdown → HTML parsing
- `isomorphic-dompurify` — server + client HTML sanitisation
- `dotenv` (dev) — `.env.local` loading for standalone seed script

### Files created
| File | Purpose |
|------|---------|
| `packages/db/seed.ts` | Upserts 1 level + 1 book + 3 chapters with realistic institutional prose |
| `src/modules/content/domain/types.ts` | `Book`, `Chapter`, `ChapterSummary`, `BookWithChapters` types |
| `src/modules/content/data/queries.ts` | `getPublishedBooks`, `getBookBySlug`, `getChapter` — Supabase queries with sibling prev/next lookup |
| `src/modules/content/ui/markdown.tsx` | `renderMarkdown()` (marked → DOMPurify strict allowlist) + `SafeMarkdown` — **only** `dangerouslySetInnerHTML` site in codebase |

### Files modified
| File | Change |
|------|--------|
| `src/modules/content/public.ts` | Exports queries, types, and `SafeMarkdown` |
| `src/app/(reader)/start-reading/[book]/page.tsx` | Book detail: breadcrumb, thesis blockquote, chapter list with ordering / time estimates, mode links |
| `src/app/(reader)/start-reading/[book]/[chapter]/page.tsx` | Chapter reader: breadcrumb + mode-toggle, Lite banner, `<header>`, `<main>` with `SafeMarkdown`, prev/next card nav, disclaimer |

### Seed data live in Supabase
- Book: **Household Money Literacy** (`slug: household-money-literacy`, status: published)
- Chapter 1: Understanding Your Income
- Chapter 2: Mapping Your Essential Expenses
- Chapter 3: Building a Simple Monthly Plan

### Key design decisions
- Lite mode = `?mode=lite` query param → `SafeMarkdown mode="lite"` (smaller prose, no table/code styling) — zero extra JS, purely SSR
- Chapter URL = `/start-reading/[slug]/[ordering]` (integer) — simpler, no slug collision
- `getChapter` fetches all sibling summaries in one query to compute prev/next (no N+1)
- DOMPurify allowlist blocks `script`, `style`, `iframe`, `form`, `input`, `object`

### Verification
| Check | Result |
|-------|--------|
| `pnpm typecheck` | ✅ PASS |
| `pnpm build` | ✅ PASS — 13 static + 2 dynamic routes |
| `pnpm db:seed` | ✅ 3 chapters inserted |
| Git push | ✅ `origin/main` |

---

## Up Next

### Sprint S3b — Chapter progress write-through
- [ ] Anonymous read → writes to IndexedDB under `eili.tools` namespace (key: `chapter_progress`)
- [ ] Authenticated read → writes to `chapter_progress` table (Supabase, RLS owner-check)
- [ ] "Continue Where You Left Off" card on `/start-reading` — reads IndexedDB or profile record

### Sprint S3c — Download mode (PDF)
- [ ] Playwright route handler at `/api/download/chapter/[book]/[chapter]` — returns branded PDF of one chapter
- [ ] Wire into Reading Modes section on `/start-reading` and into book detail page
- [ ] Wire into chapter reader header (Download button)

### S3 Verification checklist (before declaring S3 done)
- [ ] Lighthouse mobile on `/start-reading/[book]/[chapter]`: perf ≥90, a11y ≥95
- [ ] Lite chapter transferred bytes ≤50 KB (Chrome DevTools Network, throttled)
- [ ] Axe: 0 violations on the reader
- [ ] Anonymous read writes IndexedDB; authenticated read writes `chapter_progress`
- [ ] RLS: user cannot read another user's `chapter_progress` row

### Sprint S4 — Planner (functional)
- [ ] Form: income / essentials / other expenses / savings
- [ ] Output: remaining balance + simple allocation view
- [ ] State: IndexedDB `eili.tools` namespace; sync to `planner_drafts` on auth
- [ ] PDF download via route handler
- [ ] Disclaimer on page

### Sprint S5 — Stability Scorecard (functional)
- [ ] 5 pillars × 0–5 inputs → total /25
- [ ] Band display: 0–10 Low / 11–18 Moderate / 19–25 Strong
- [ ] State: IndexedDB; sync to `scorecards` on auth
- [ ] PDF download

### Sprint S6 — 30-Day Reset (functional)
- [ ] 4 weeks × daily checklist (Awareness / Control / Adjustment / Stabilization)
- [ ] Week-keyed, idempotent
- [ ] State: IndexedDB; sync to `reset_progress` on auth
- [ ] PDF download

### Sprint S7 — Publications Detail
- [ ] `/publications/[book]` — cover, title, thesis, who should read, key lessons, citation, format buttons

### Sprint S9 — Polish + Deploy
- [ ] Lighthouse mobile: perf ≥90, a11y ≥95, best-practices ≥95, SEO ≥95
- [ ] Axe a11y audit in Playwright
- [ ] PWA (`next-pwa`) — installable, offline reading
- [ ] Custom domain setup (afriglobaltrade.com → Vercel)
- [ ] Supabase anti-pause cron (ping every 6 days)
- [ ] `NEXT_PUBLIC_SITE_URL` update to custom domain
