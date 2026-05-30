# Deployment Guide — EILI Phase 1

## Prerequisites

- Node.js ≥ 20, pnpm ≥ 9
- Vercel account (Hobby or Pro)
- Supabase project (free tier)
- Hostinger account with active hosting plan (for DNS, email, and cron)
- Resend account (free tier, for transactional email)
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

### 2. Email setup (Hostinger mailboxes + Resend sending)

#### 2a. Hostinger mailboxes (inbound)

Create these four mailboxes in Hostinger hPanel → Email → Email Accounts for `afriglobaltrade.com`:

| Mailbox | Purpose |
|---------|--------|
| `auth@afriglobaltrade.com` | Magic link sender (Resend sender address) |
| `privacy@afriglobaltrade.com` | Privacy / data requests |
| `legal@afriglobaltrade.com` | Legal / terms queries |
| `hello@afriglobaltrade.com` | General contact |

#### 2b. Resend domain verification (outbound sending)

1. Create account at [resend.com](https://resend.com) and add domain `afriglobaltrade.com`.
2. Resend will show DNS records to add. In Hostinger hPanel → Domains → DNS Zone Editor add:
   - **SPF** — `TXT` on `@`: merge Hostinger's default SPF with Resend's include.
     > ⚠️ **SPF merge warning:** There must be exactly **one** `TXT` SPF record on `@`.
     > Combine all `include:` values into a single record, e.g.:
     > `v=spf1 include:_spf.hostinger.com include:amazonses.com ~all`
     > (exact Resend include shown in Resend dashboard — do not add a second SPF record)
   - **DKIM** — 3 × `CNAME` records as shown by Resend.
   - **DMARC** — `TXT` on `_dmarc`: `v=DMARC1; p=none; rua=mailto:hello@afriglobaltrade.com`
3. Copy the Resend API key into Vercel env vars as `RESEND_API_KEY`.

#### 2c. Supabase Custom SMTP

In Supabase → Authentication → Email → SMTP Settings:

| Field | Value |
|-------|-------|
| Host | `smtp.resend.com` |
| Port | `465` (or `587`) |
| Username | `resend` |
| Password | `<RESEND_API_KEY>` |
| Sender name | `EILI` |
| Sender email | `auth@afriglobaltrade.com` |

### 3. Vercel

1. Import the GitHub repo into Vercel.
2. Set all env vars listed above.
3. Set the build command to `pnpm build` and output to `.next`.
4. Deploy. Vercel will assign a `.vercel.app` preview URL.
5. After confirming the preview works, promote to production:
   ```
   vercel --prod
   ```

### 4. Custom Domain (Hostinger DNS)

1. In Vercel → Project → Settings → Domains, add `afriglobaltrade.com`.
   Vercel will display the required DNS record(s) — typically one of:
   - `A @ 76.76.21.21` (Vercel IP), **or**
   - `CNAME www → cname.vercel-dns.com`
2. In Hostinger hPanel → Domains → DNS Zone Editor for `afriglobaltrade.com`:
   - Add the A / CNAME records exactly as shown by Vercel.
   - Do **not** proxy through any intermediary — Vercel handles SSL and CDN.
3. SSL auto-provisions via Vercel's Let's Encrypt integration within ~60 seconds of DNS propagation.
4. Update `NEXT_PUBLIC_SITE_URL` in Vercel env UI to `https://afriglobaltrade.com`.
5. Update Supabase → Auth → URL Configuration:
   - Site URL: `https://afriglobaltrade.com`
   - Redirect URLs: `https://afriglobaltrade.com/auth/callback`
6. Redeploy for the env change to take effect.

### 5. PostHog

1. Create project in PostHog Cloud EU region.
2. Copy Project API Key → `NEXT_PUBLIC_POSTHOG_KEY`.
3. Host: `https://eu.posthog.com` → `NEXT_PUBLIC_POSTHOG_HOST`.
4. Analytics only fires after cookie consent — verify in DevTools Network tab.

### 6. Supabase Anti-Pause Cron (Hostinger)

Supabase Free auto-pauses after 7 days of inactivity. Set up a cron job in Hostinger hPanel to ping it every 6 days.

1. Hostinger hPanel → Advanced → Cron Jobs → Add New Cron Job.
2. Schedule: `0 6 */6 * *` (06:00 UTC every 6 days).
3. Command:
   ```bash
   curl -s -o /dev/null -H "apikey: <SUPABASE_ANON_KEY>" \
     "https://<PROJECT_REF>.supabase.co/rest/v1/"
   ```
   Replace `<SUPABASE_ANON_KEY>` and `<PROJECT_REF>` with your actual values.
   The `anon` key is safe to use here — it is already public in the browser bundle.

**GitHub Actions fallback:** If Hostinger cron proves unreliable, add a scheduled workflow in `.github/workflows/supabase-ping.yml`:

```yaml
on:
  schedule:
    - cron: "0 6 */6 * *"
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - run: |
          curl -s -o /dev/null \
            -H "apikey: ${{ secrets.SUPABASE_ANON_KEY }}" \
            "https://${{ secrets.SUPABASE_PROJECT_REF }}.supabase.co/rest/v1/"
```

Store `SUPABASE_ANON_KEY` and `SUPABASE_PROJECT_REF` as GitHub repository secrets.

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
- [ ] Hostinger cron job configured (`0 6 */6 * *`, curl to Supabase REST)
- [ ] Privacy Policy and Terms of Use linked from footer
- [ ] Legal review completed for Privacy Policy and Terms of Use
- [ ] `NEXT_PUBLIC_SITE_URL` set to custom domain in Vercel
- [ ] Supabase Auth redirect URLs updated to custom domain
- [ ] All deviations documented in `docs/adr-notes.md`
- [ ] Sentry added before first public traffic
