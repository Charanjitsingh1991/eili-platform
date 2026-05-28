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

## Up Next

### Sprint S3 — Chapter Reader
- [ ] Seed data: insert `household-money-literacy` book + 3 sample chapters into Supabase
- [ ] Book detail page: `/start-reading/[book]` — chapter list, book info
- [ ] Chapter reader: `/start-reading/[book]/[chapter]` — Standard mode (full layout) + Lite mode (text only, ≤50 KB)
- [ ] Markdown renderer: safe HTML from `body_markdown` (no `dangerouslySetInnerHTML` outside sanitized renderer)
- [ ] Chapter navigation: prev/next links

### Sprint S4-S6 — Functional Tools
- [ ] Planner: form with income/essentials/other/savings → remaining balance, IndexedDB state, PDF download
- [ ] Scorecard: 5 pillars 0–5 sliders → total /25 → band, IndexedDB state, PDF download
- [ ] 30-Day Reset: week-keyed checklist (4 weeks), idempotent, IndexedDB state, PDF download

### Sprint S7 — Publications Detail
- [ ] `/publications/[book]` — cover, title, thesis, who should read, key lessons, citation, format buttons

### Sprint S9 — Polish + Deploy
- [ ] Lighthouse mobile: perf ≥90, a11y ≥95, best-practices ≥95, SEO ≥95
- [ ] Axe a11y audit in Playwright
- [ ] PWA (`next-pwa`) — installable, offline reading
- [ ] Custom domain setup (afriglobaltrade.com → Vercel)
- [ ] Supabase anti-pause cron (ping every 6 days)
- [ ] `NEXT_PUBLIC_SITE_URL` update to custom domain
