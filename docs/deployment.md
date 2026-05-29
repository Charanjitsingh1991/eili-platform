# Deployment Guide — EILI Phase 1

## Prerequisites

- Node.js ≥ 20, pnpm ≥ 9
- Vercel account (Hobby or Pro)
- Supabase project (free tier)
- Cloudflare account (free tier, for DNS + cron Worker)
- Resend account (free tier, for email)
- PostHog Cloud EU account (free tier, optional)

---

## Environment Variables

Set these in Vercel → Project → Settings → Environment Variables (all environments unless noted).

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | From Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Secret — never expose client-side |
| `DATABASE_URL` | ✅ | Pooled connection string (Supabase → Connect → Connection pooling) |
| `DIRECT_URL` | ✅ | Direct connection string (used by Drizzle migrations) |
| `NEXT_PUBLIC_SITE_URL` | ✅ | `https://afriglobaltrade.com` in prod; `http://localhost:3000` in dev |
| `RESEND_API_KEY` | ✅ for email | From Resend dashboard |
| `NEXT_PUBLIC_POSTHOG_KEY` | Optional | From PostHog project settings |
| `NEXT_PUBLIC_POSTHOG_HOST` | Optional | `https://eu.posthog.com` |

### Local development (.env.local)

Copy `.env.example` (if present) to `.env.local` and fill in values. This file is gitignored.

---

## First-Time Setup

### 1. Supabase

1. Create a new project at [supabase.com](https://supabase.com).
2. Copy the project URL and anon key into `.env.local`.
3. Copy the service role key (keep secret).
4. Run migrations:
   ```bash
   pnpm db:migrate
   ```
5. Seed initial content:
   ```bash
   pnpm db:seed
   ```
6. Enable Email magic link in Supabase → Auth → Providers → Email.
7. Set Site URL in Supabase → Auth → URL Configuration:
   - Site URL: `https://afriglobaltrade.com`
   - Redirect URLs: `https://afriglobaltrade.com/auth/callback`

### 2. Resend

1. Create account at [resend.com](https://resend.com).
2. Verify your sending domain (or use the sandbox for testing).
3. Copy the API key into Vercel env vars.
4. In Supabase → Auth → SMTP Settings, configure Resend as the SMTP provider:
   - Host: `smtp.resend.com`, Port: `465`, User: `resend`, Password: `<RESEND_API_KEY>`

### 3. Vercel

1. Import the GitHub repo into Vercel.
2. Set all env vars listed above.
3. Set the build command to `pnpm build` and output to `.next`.
4. Deploy. Vercel will assign a `.vercel.app` preview URL.
5. After confirming the preview works, promote to production:
   ```
   vercel --prod
   ```

### 4. Custom Domain (Cloudflare DNS)

1. In Vercel → Project → Domains, add `afriglobaltrade.com`.
2. Vercel will show the required DNS records.
3. In Cloudflare → DNS for `afriglobaltrade.com`, add:
   - `CNAME @ → cname.vercel-dns.com` (or the A record Vercel specifies)
   - Proxy status: **DNS only** (grey cloud) — Vercel handles SSL
4. SSL auto-provisions via Vercel within ~60 seconds of DNS propagation.
5. Update `NEXT_PUBLIC_SITE_URL` in Vercel env to `https://afriglobaltrade.com`.
6. Update Supabase Auth redirect URLs to the custom domain.
7. Redeploy for the env change to take effect.

### 5. PostHog

1. Create project in PostHog Cloud EU region.
2. Copy Project API Key → `NEXT_PUBLIC_POSTHOG_KEY`.
3. Host: `https://eu.posthog.com` → `NEXT_PUBLIC_POSTHOG_HOST`.
4. Analytics only fires after cookie consent — verify in DevTools Network tab.

### 6. Supabase Anti-Pause Cron

See `workers/supabase-ping/README.md` for the Cloudflare Worker setup that pings Supabase every 6 days to prevent auto-pause on the free tier.

---

## Routine Deployments

All pushes to `main` trigger a Vercel preview deployment via GitHub Actions CI. To promote to production:

```bash
git push origin main
# Then in Vercel dashboard: Deployments → promote to Production
# Or via CLI:
vercel --prod
```

---

## Database Migrations

Migrations are forward-only. **Never edit a migration that has been applied to staging or production.** Add a new migration instead.

```bash
# Generate a migration from schema changes
pnpm db:generate

# Apply to the connected database
pnpm db:migrate
```

---

## Rollback Procedure

### Application rollback

1. In Vercel → Deployments, find the last known-good deployment.
2. Click **Promote to Production** on that deployment.
3. Takes effect immediately — no rebuild required.

### Database rollback

Drizzle does not generate automatic down migrations. If a migration must be reversed:

1. Write a new migration that undoes the change (e.g. `DROP COLUMN` / `ALTER TABLE`).
2. Test against a Supabase branch or local Postgres first.
3. Apply via `pnpm db:migrate`.
4. Never run destructive SQL directly in the Supabase dashboard on production without a backup.

---

## Secrets Inventory

| Secret | Where stored | Rotation procedure |
|--------|-------------|-------------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel env (server only) | Rotate in Supabase → Settings → API → Reset service_role |
| `RESEND_API_KEY` | Vercel env (server only) | Revoke and re-create in Resend dashboard |
| `NEXT_PUBLIC_POSTHOG_KEY` | Vercel env (public) | Rotate in PostHog Project Settings |
| Supabase DB password | Not stored in code | Managed by Supabase; reset in project settings |

No secrets are committed to the repository. `.env.local` is in `.gitignore`.

---

## Pre-Launch Checklist

- [ ] Lighthouse mobile ≥ 90 perf / ≥ 95 a11y / ≥ 95 best-practices / ≥ 95 SEO (all 6 routes)
- [ ] Axe: 0 violations
- [ ] PostHog fires 0 events before consent click (DevTools Network)
- [ ] PWA installable (Chrome DevTools → Application → Manifest)
- [ ] Offline read: cached chapter loads with network disabled
- [ ] `afriglobaltrade.com` loads over HTTPS with valid cert
- [ ] Supabase anti-pause Worker deployed and scheduled
- [ ] Privacy Policy and Terms of Use linked from footer
- [ ] Contact email placeholders (`privacy@eili.org`, `legal@eili.org`) replaced with real addresses
- [ ] Legal review completed for Privacy Policy and Terms of Use
- [ ] `NEXT_PUBLIC_SITE_URL` set to custom domain in Vercel
- [ ] Supabase Auth redirect URLs updated to custom domain
- [ ] All deviations documented in `docs/adr-notes.md`
- [ ] Sentry added before first public traffic
