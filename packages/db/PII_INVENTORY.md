# PII Inventory — EILI Platform

All columns containing personally identifiable information (PII). Update this file whenever a PII column is added, removed, or renamed.

| Table | Column | PII Type | Retention | Notes |
|-------|--------|----------|-----------|-------|
| `profiles` | `display_name` | Name | Until account deletion + 30 days | Required at registration |
| `profiles` | `country_iso2` | Location (country) | Until account deletion + 30 days | Required at registration |
| `profiles` | `user_id` | Auth identifier | Until account deletion + 30 days | Links to Supabase `auth.users` |
| `profiles` | `consents` | Consent records | Until account deletion + 30 days | JSONB with marketing, research, terms |
| `anon_sessions` | `cookie_id` | Device fingerprint | 30 days after merge or 90 days if unmerged | Stable anonymous identifier |

## GDPR Notes

- Data export endpoint: planned for Phase 1 (stub), full implementation Phase 2.
- Deletion: soft-delete on `profiles` triggers hard-delete of dependent rows after 30-day retention window.
- No email column in `profiles` — email lives only in Supabase `auth.users`, managed by Supabase Auth.
