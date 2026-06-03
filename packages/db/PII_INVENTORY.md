# PII Inventory — EILI Platform

All columns containing personally identifiable information (PII). Update this file whenever a PII column is added, removed, or renamed.

| Table | Column | PII Type | Retention | Notes |
|-------|--------|----------|-----------|-------|
| `profiles` | `display_name` | Name | Until account deletion + 30 days | Collected at onboarding; nullable until onboarding complete |
| `profiles` | `country_iso2` | Location (country) | Until account deletion + 30 days | Collected at onboarding; nullable until onboarding complete |
| `profiles` | `category` | Self-categorisation | Until account deletion + 30 days | `household` or `student`; collected at onboarding |
| `profiles` | `literacy_self_assessment` | Self-reported literacy level | Until account deletion + 30 days | Optional; `beginner`, `intermediate`, or `advanced` |
| `profiles` | `onboarding_completed_at` | Behavioural timestamp | Until account deletion + 30 days | Records when onboarding form was submitted; used to gate redirect |
| `profiles` | `user_id` | Auth identifier | Until account deletion + 30 days | Links to Supabase `auth.users` |
| `profiles` | `consents` | Consent records | Until account deletion + 30 days | JSONB with marketing, research, terms |
| `anon_sessions` | `cookie_id` | Device fingerprint | 30 days after merge or 90 days if unmerged | Stable anonymous identifier |

## GDPR Notes

- Data export endpoint: planned for Phase 1 (stub), full implementation Phase 2.
- Deletion: soft-delete on `profiles` triggers hard-delete of dependent rows after 30-day retention window.
- No email column in `profiles` — email lives only in Supabase `auth.users`, managed by Supabase Auth.
