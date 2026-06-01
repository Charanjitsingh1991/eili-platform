# EILI Platform — Build Progress

Live URL: **https://www.afriglobaltrade.com** (production domain, custom alias active)  
GitHub: https://github.com/Charanjitsingh1991/eili-platform  
Supabase project: `gwnqjltpbujqiwupousb`  
Last updated: 2026-06-01

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
- `sanitize-html` — server-safe HTML sanitisation (CJS-compatible; replaced `isomorphic-dompurify` which caused ESM crash on Vercel — see Sprint S10)
- `dotenv` (dev) — `.env.local` loading for standalone seed script

### Files created
| File | Purpose |
|------|---------|
| `packages/db/seed.ts` | Upserts 1 level + 1 book + 3 chapters with realistic institutional prose |
| `src/modules/content/domain/types.ts` | `Book`, `Chapter`, `ChapterSummary`, `BookWithChapters` types |
| `src/modules/content/data/queries.ts` | `getPublishedBooks`, `getBookBySlug`, `getChapter` — Supabase queries with sibling prev/next lookup |
| `src/modules/content/ui/markdown.tsx` | `renderMarkdown()` (marked → `sanitize-html` strict allowlist) + `SafeMarkdown` — **only** `dangerouslySetInnerHTML` site in codebase |

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

---

## Sprint S3b — Chapter progress write-through ✅
*Completed: 2026-05-29*

| File | Purpose |
|------|---------|
| `src/lib/reader-progress.ts` | IndexedDB helpers — `markChapterRead`, `getLastReadChapter`, `getAllProgress` (DB: `eili_reader`) |
| `src/modules/reader/server/record-progress.ts` | Server Actions — `recordChapterProgress` (upsert to `chapter_progress`), `getLastReadForBook` |
| `src/modules/reader/ui/progress-tracker.tsx` | `"use client"` — fires on chapter mount; anon → IndexedDB, auth → Server Action |
| `src/modules/reader/ui/continue-card.tsx` | `"use client"` — shows "Continue Where You Left Off" card; renders only if progress exists |

**Wired into:** chapter reader page (ProgressTracker), `/start-reading` page (ContinueCard + server-side `getLastReadForBook`)

---

## Sprint S3c — PDF Download mode ✅
*Completed: 2026-05-29*

| File | Purpose |
|------|---------|
| `src/app/api/download/chapter/[book]/[chapter]/route.tsx` | GET → `@react-pdf/renderer` → branded chapter PDF |
| `src/modules/reader/ui/chapter-pdf.tsx` | `ChapterPdf` — EILI-branded A4 PDF: header, stripped markdown body, footer disclaimer |

**Download button wired into:** chapter reader header bar, `/start-reading` book card, book detail page.

---

## Sprint S4 — Monthly Planner ✅
*Completed: 2026-05-29*

| File | Purpose |
|------|---------|
| `src/modules/tools/lib/idb.ts` | Shared IndexedDB helpers (`openToolsDb`, `idbGet`, `idbPut`) for all tools — DB: `eili_tools` |
| `src/modules/tools/ui/planner-form.tsx` | `"use client"` — income / essentials / other / savings inputs, allocation view, remaining balance, IndexedDB persistence |
| `src/app/(tools)/tools/planner/page.tsx` | Planner page with header + `PlannerForm` + disclaimer |
| `src/app/api/download/planner/route.tsx` | GET → branded A4 planner template PDF |

---

## Sprint S5 — Stability Scorecard ✅
*Completed: 2026-05-29*

| File | Purpose |
|------|---------|
| `src/modules/tools/ui/scorecard-form.tsx` | `"use client"` — 5 pillar × 0–5 buttons, total /25, band (Low/Moderate/Strong), progress bar, IndexedDB |
| `src/app/(tools)/tools/scorecard/page.tsx` | Scorecard page with header + `ScorecardForm` + disclaimer |
| `src/app/api/download/scorecard/route.tsx` | GET → branded A4 scorecard template PDF |

---

## Sprint S6 — 30-Day Reset ✅
*Completed: 2026-05-29*

| File | Purpose |
|------|---------|
| `src/modules/tools/ui/reset-form.tsx` | `"use client"` — 4 weeks × 7 tasks checklist, idempotent per calendar month, IndexedDB, overall progress bar |
| `src/app/(tools)/tools/reset/page.tsx` | Reset page with header + `ResetForm` + disclaimer |
| `src/app/api/download/reset/route.tsx` | GET → branded A4 30-day reset plan PDF |

---

## Sprint S7 — Publications Detail ✅
*Completed: 2026-05-29*

| File | Purpose |
|------|---------|
| `src/app/(reader)/publications/[book]/page.tsx` | Full book detail: breadcrumb, cover placeholder, thesis blockquote, tags, format buttons, who should read, key lessons, chapter list, APA/Chicago/MLA citation, continue your path |

Static `BOOK_META` record keyed by slug provides who-should-read, key lessons, and citations. Scales by adding new slug entries without a CMS.

---

## Sprint S8 — Auth Login Page ✅
*Completed: 2026-05-29*

| File | Purpose |
|------|---------|
| `src/modules/identity/server/send-magic-link.ts` | `sendMagicLink` Server Action — Zod validation → `supabase.auth.signInWithOtp` |
| `src/modules/identity/ui/magic-link-form.tsx` | `"use client"` — email input, submit with `useTransition`, error state, success "check your email" confirmation |
| `src/app/auth/login/page.tsx` | Login page wrapping `MagicLinkForm`, no-account-needed reminder |

---

---

## Sprint S9a — Compliance + Consent ✅
*Completed: 2026-05-29*

| File | Purpose |
|------|---------|
| `src/app/(marketing)/privacy/page.tsx` | Privacy Policy — 8 sections, amber "subject to legal review" banner, cookie inventory, data retention, third-party processors |
| `src/app/(marketing)/terms/page.tsx` | Terms of Use — 10 sections, nature-of-service disclaimer, permitted use, IP, liability |
| `src/lib/consent.ts` | `getConsentCookie`, `setConsentCookie`, `hasAnalyticsConsent` — first-party `eili_consent` cookie, SameSite=Lax, 365-day expiry |
| `src/lib/analytics.ts` | Updated to use `hasAnalyticsConsent` — PostHog **never** initialises until Accept is clicked |
| `src/components/consent/consent-banner.tsx` | Fixed-bottom consent banner: hidden if cookie present, focus moves to Accept on show, two buttons (Decline / Accept), links to Privacy Policy |
| `src/app/layout.tsx` | `ConsentBanner` wired into root layout |

Footer already had `/privacy` and `/terms` links — no change needed.

---

## Sprint S9b — Auth decision ✅
*Completed: 2026-05-29*

**Google OAuth deferred to Phase 2.** Documented in `docs/adr-notes.md`:
- Magic link covers 100% of Phase 1 sign-in use case (accounts are optional).
- Google verified OAuth consent screen takes days–weeks to clear review.
- Avoids mid-sprint delay before public launch.

---

## Sprint S9c — Performance + SEO ✅ (code complete; manual Lighthouse/Axe run required)
*Completed: 2026-05-29*

| Item | Status |
|------|--------|
| JSON-LD `Book` schema on `/publications/[book]` | ✅ Shipped — `@context: schema.org/Book`, author, publisher, url, isAccessibleForFree, datePublished |
| `themeColor` moved to `generateViewport` export | ✅ — fixed Next 15+ warning across all routes |
| Lighthouse mobile ≥90/95/95/95 on 6 routes | ⏳ Manual run required (see verification checklist below) |
| Axe: 0 violations on 6 routes | ⏳ Manual run required |
| Lite chapter ≤50 KB, Standard ≤250 KB | ⏳ Verify in Chrome DevTools Network (cache disabled, Fast 3G) |

---

## Sprint S9d — PWA ✅ (partial — service worker deferred)
*Completed: 2026-05-29*

| Item | Status |
|------|--------|
| `public/manifest.json` | ✅ name, short_name, theme_color, icons, shortcuts, display: standalone |
| `public/favicon.svg` | ✅ EILI teal "E" icon |
| `public/icons/icon-192.svg` | ✅ |
| `public/icons/icon-512.svg` | ✅ |
| Manifest + apple-web-app meta in `src/app/layout.tsx` | ✅ |
| Service worker (offline precache) | ❌ Deferred — `@serwist/next` webpack plugin hard-fails against Next 16 Turbopack. ADR logged. Revisit when `@serwist/turbopack` stabilises. |

---

## Sprint S9e — Operations ✅ (infra files complete; DNS/domain is manual)
*Completed: 2026-05-29*

| File | Purpose |
|------|---------|
| `docs/deployment.md` | Env vars table, first-time Supabase/Resend/Vercel/Cloudflare setup, migration procedure, rollback steps, secrets inventory, pre-launch checklist |
| `docs/adr-notes.md` | Backfilled: Next 15→16, Sentry deferral, @react-pdf/renderer, Source Serif 4, Google OAuth deferral, serwist deferral, proxy.ts rename, consent cookie choice |
| `src/proxy.ts` | Renamed from `middleware.ts`; exported function renamed `proxy` (Next 16 requirement) |
| `workers/supabase-ping/index.js` | Cloudflare Worker — scheduled `fetch` to Supabase REST health endpoint |
| `workers/supabase-ping/wrangler.toml` | Cron: `0 0 */6 * *` (every 6 days). Deploy: `wrangler secret put SUPABASE_URL && wrangler secret put SUPABASE_ANON_KEY && wrangler deploy` |

> **REVISED 2026-06-01** — Cloudflare dropped. `workers/supabase-ping/` directory deleted in the consolidation commit. Supabase keepalive now runs as a Hostinger hPanel cron job; see `docs/deployment.md` §6.

**Remaining manual steps:**
1. ~~Cloudflare DNS: add CNAME `@` → Vercel DNS value for `afriglobaltrade.com`~~ → **Hostinger DNS Zone Editor: CNAME/A → Vercel** ✅ Done
2. Vercel: add custom domain, wait for SSL provisioning ✅ Done
3. Update `NEXT_PUBLIC_SITE_URL` in Vercel env to `https://afriglobaltrade.com` ✅ Done
4. Update Supabase Auth → URL Configuration → Site URL + Redirect URLs
5. ~~Deploy Cloudflare Worker: `wrangler deploy` from `workers/supabase-ping/`~~ → **Hostinger hPanel → Advanced → Cron Jobs: `0 6 */6 * * curl <SUPABASE_REST_URL>`**
6. ~~Replace placeholder emails (`privacy@eili.org`, `legal@eili.org`) before public launch~~ ✅ Fixed in consolidation commit
7. Legal review of Privacy Policy and Terms of Use

---

## Sprint S10 — Post-Launch Production Fixes ✅
*Completed: 2026-06-01*

### Root cause of all 500 errors on `/start-reading/*`

Three independent issues stacked:

| # | Problem | Fix |
|---|---------|-----|
| 1 | `isomorphic-dompurify` → `jsdom` 25+ is ESM-only; Vercel serverless uses CJS `require()` → `ERR_REQUIRE_ESM` crash on every server route | Replaced with `sanitize-html` (CJS-safe) in `src/modules/content/ui/markdown.tsx` |
| 2 | `posthog-js` in the server bundle via `analytics.ts` static import; `detectStore()` runs at module load in Node (no `window`) → crash | Moved PostHog to `AnalyticsProvider` (`"use client"` + `dynamic(..., {ssr:false})`) — never runs on server |
| 3 | `env.ts` required `DIRECT_URL` + `SUPABASE_SERVICE_ROLE_KEY` at boot; missing on Vercel → Zod throw on every request | Made optional in `src/lib/env.ts` |
| 4 | Vercel `.vercel/` link missing — CLI deployed to orphaned preview URLs, never aliased to `afriglobaltrade.com` | Ran `vercel link`, then `vercel alias <url> afriglobaltrade.com` after each deploy |
| 5 | Vercel-Supabase integration injected stale env vars for a different Supabase project | Removed old keys, re-added correct `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` via CLI |

### Files changed
| File | Change |
|------|--------|
| `src/modules/content/ui/markdown.tsx` | `isomorphic-dompurify` → `sanitize-html` |
| `src/components/analytics/analytics-init.tsx` | New — dynamic `import('posthog-js')` inside `useEffect`, consent-gated |
| `src/components/analytics/analytics-provider.tsx` | New — `"use client"` wrapper with `dynamic(..., {ssr:false})` |
| `src/lib/analytics.ts` | Removed posthog static import; stubs forward to `window.posthog` |
| `src/lib/env.ts` | `DIRECT_URL`, `DATABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` → `.optional()` |
| `src/app/layout.tsx` | Replaced inline `dynamic()` with `<AnalyticsProvider />` (Server Components cannot use `ssr:false`) |
| `src/modules/reader/server/record-progress.ts` | `"use server"` scoped to mutation only; `getLastReadForBook` extracted to separate file |
| `src/modules/reader/server/queries.ts` | New — `getLastReadForBook` as plain async function (no Server Action) |
| `src/app/(reader)/start-reading/page.tsx` | Disabled `getLastReadForBook` call (returns `null`) until schema migrated — re-enabled in Sprint S11 |
| `src/app/(reader)/start-reading/[book]/[chapter]/error.tsx` | New — error boundary to show message instead of blank 500 |
| `package.json` / `pnpm-lock.yaml` | Added `sanitize-html` + `@types/sanitize-html`; removed `isomorphic-dompurify` |

### Production verification (2026-06-01)
| Route | HTTP Status |
|-------|-------------|
| `https://www.afriglobaltrade.com/` | ✅ 200 |
| `https://www.afriglobaltrade.com/start-reading` | ✅ 200 |
| `https://www.afriglobaltrade.com/start-reading/household-money-literacy` | ✅ 200 |
| `https://www.afriglobaltrade.com/start-reading/household-money-literacy/1` | ✅ 200 |
| `https://www.afriglobaltrade.com/start-reading/household-money-literacy/1?mode=lite` | ✅ 200 |
| `/api/download/chapter/household-money-literacy/1` | ✅ 200 |
| `pnpm build` | ✅ 0 errors |
| `pnpm typecheck` | ✅ 0 errors |
| Magic link email | ✅ Delivered to Primary inbox (SPF/DKIM/DMARC pass) |

---

## Sprint S11 — chapter_progress migration + progress resume ✅
*Completed: 2026-06-01*

### What was done
The `chapter_progress` table had an old schema incompatible with the app's queries. Migration `0002` adds the missing columns without touching existing rows.

#### Migration SQL — `packages/db/migrations/0002_chapter_progress_profile_columns.sql`
```sql
ALTER TABLE "chapter_progress"
  ADD COLUMN IF NOT EXISTS "profile_id"   uuid        REFERENCES "profiles"("id") ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS "book_id"      uuid        REFERENCES "books"("id")    ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS "last_read_at" timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS "completed"    boolean     NOT NULL DEFAULT false;

CREATE UNIQUE INDEX IF NOT EXISTS "chapter_progress_profile_chapter_uidx"
  ON "chapter_progress" ("profile_id", "chapter_id")
  WHERE "profile_id" IS NOT NULL;

CREATE INDEX IF NOT EXISTS "chapter_progress_profile_book_idx"
  ON "chapter_progress" ("profile_id", "book_id", "last_read_at" DESC)
  WHERE "profile_id" IS NOT NULL;
```
RLS policies on `chapter_progress` replaced: old policies joined through `reader_sessions` (anonymous path only). New policies use direct `profile_id` ownership for authenticated users while keeping the legacy `reader_session_id` path for anonymous rows.

### Files changed
| File | Change |
|------|--------|
| `packages/db/migrations/0002_chapter_progress_profile_columns.sql` | New — adds `profile_id`, `book_id`, `last_read_at`, `completed`, unique index, updated RLS |
| `scripts/apply-migration-0002.ts` | New — applies migration 0002 via `postgres` driver (same pattern as `apply-rls.ts`) |
| `src/modules/reader/server/queries.ts` | Fixed `getLastReadForBook` — now looks up `profiles.id` via `user_id` before querying `chapter_progress` |
| `src/modules/reader/server/record-progress.ts` | Fixed `recordChapterProgress` — same `profiles.id` lookup before upsert |
| `src/app/(reader)/start-reading/page.tsx` | Re-enabled `getLastReadForBook` — passes real `serverOrdering` to `ContinueCard` for authenticated users |

### Manual test required
1. Open `https://www.afriglobaltrade.com/start-reading/household-money-literacy/1` in incognito
2. Sign in via magic link → read a chapter → navigate to `/start-reading`
3. Confirm `ContinueCard` shows the chapter you read

---

## Phase 1 — "When Done" Verification Checklist

| Check | Status |
|-------|--------|
| Build: 0 errors, 0 warnings | ✅ 21 routes |
| TypeScript strict: no errors | ✅ |
| All server routes return 200 in production | ✅ Confirmed 2026-06-01 |
| Magic link auth working | ✅ Confirmed — lands in Primary inbox |
| `afriglobaltrade.com` loads over HTTPS | ✅ Live |
| Privacy Policy + Terms linked from footer | ✅ |
| All deviations in adr-notes.md | ✅ 8+ entries |
| Secrets inventory in deployment.md | ✅ |
| Google OAuth decision documented | ✅ Deferred Phase 2 |
| JSON-LD Book schema | ✅ |
| `proxy.ts` rename complete | ✅ |
| PostHog never loads before consent | ✅ Code confirmed; verify in DevTools Network tab |
| PWA installable (manifest + icons) | ✅ Manifest shipped; SW deferred — see ADR |
| Lighthouse mobile perf ≥90 | ⏳ Re-run — PostHog now deferred, score expected to improve |
| Lighthouse a11y ≥95 | ⏳ Re-run on production |
| Lighthouse best-practices ≥95 | ⏳ Re-run on production |
| Lighthouse SEO ≥95 | ⏳ Re-run on production |
| Axe: 0 violations | ⏳ Run `pnpm test:e2e` against production URL |
| Lite chapter ≤50 KB transferred | ⏳ Verify in DevTools Network (cache disabled, Fast 3G) |
| Standard chapter ≤250 KB transferred | ⏳ Verify in DevTools Network |
| `chapter_progress` schema migration applied | ✅ Migration 0002 applied 2026-06-01 |
| Progress resume (`ContinueCard`) re-enabled | ✅ `getLastReadForBook` live; manual E2E test required |
| Hostinger cron for Supabase keepalive scheduled | ⏳ Hostinger hPanel → Advanced → Cron Jobs: `0 6 */6 * * curl <SUPABASE_REST_URL>` |
| GitHub → Vercel auto-deploy connected | ⏳ Fix in Vercel Dashboard → Settings → Git |

---

## Pending / Known Issues

### 🔴 Must fix before promoting to the real EILI domain

| Issue | Detail |
|-------|--------|
| **GitHub → Vercel auto-deploy not working** | Pushes to `main` don't trigger a production deploy. Each deploy requires `npx vercel --prod` + `npx vercel alias <url> afriglobaltrade.com` manually. **Fix:** Vercel Dashboard → Project → Settings → Git → confirm Production Branch = `main` and GitHub repo is connected. |

### 🟡 Should fix before first public traffic

| Issue | Detail |
|-------|--------|
| **Supabase keepalive Hostinger cron not yet scheduled** | Supabase free tier auto-pauses after 7 days of inactivity. Schedule via Hostinger hPanel → Advanced → Cron Jobs: `0 6 */6 * *` → `curl https://gwnqjltpbujqiwupousb.supabase.co/rest/v1/`. See `docs/deployment.md` §6. |
| **Legal review** | Privacy Policy and Terms of Use carry an amber "subject to legal review" banner — complete before public launch. |
| **Sentry not set up** | Deferred per ADR. Add Sentry DSN env var and initialise before first public traffic. |
| **Progress resume E2E test** | Manual test required: incognito → magic link sign-in → read chapter → navigate to `/start-reading` → confirm `ContinueCard` shows chapter. |

### 🟢 Nice to have / Phase 2

| Issue | Detail |
|-------|--------|
| **Lighthouse perf score** | Last measured: 78/100 (homepage, before PostHog fix). PostHog now deferred-loaded — re-run to confirm ≥90. |
| **Service Worker (offline cache)** | `@serwist/next` incompatible with Next 16 Turbopack. Revisit when `@serwist/turbopack` stabilises. |
| **Google OAuth** | Deferred Phase 2 — requires Google verified consent screen review (days–weeks). |
| **Bundle budget verification** | Confirm Lite chapter ≤50 KB and Standard ≤250 KB in Chrome DevTools with cache disabled and Fast 3G throttling. |
