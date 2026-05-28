# Architecture Decision Records — EILI Phase 1

Log of any deviation from the locked stack in `.windsurf/rules/02-tech-stack.md`.

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-28 | Sentry deferred to pre-launch | Not in Phase 1 V2 source doc. Using Vercel logs + `src/lib/logger.ts` thin wrapper for dev. Will add Sentry free tier before first public traffic. |
| 2026-05-28 | `@react-pdf/renderer` instead of Playwright for PDF export | Playwright chromium binary exceeds Vercel Hobby 50 MB function size limit. `@react-pdf/renderer` is lightweight and works within free tier. Can revisit if output quality demands it. |
| 2026-05-28 | `Source Serif 4` used in place of `Source Serif Pro` | Google Fonts renamed Source Serif Pro to Source Serif 4. Same typeface, updated name. |
