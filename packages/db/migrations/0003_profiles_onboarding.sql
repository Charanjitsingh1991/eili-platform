-- Migration 0003: add onboarding_completed_at to profiles
-- All other required columns (display_name, country_iso2, category,
-- literacy_self_assessment) already exist from migration 0000.
-- We also relax display_name / country_iso2 / category to nullable so that
-- a profile row can be created at magic-link signup before onboarding runs.

ALTER TABLE "profiles"
  ADD COLUMN IF NOT EXISTS "onboarding_completed_at" timestamptz;

-- Allow profile row creation with empty required fields (filled during onboarding)
ALTER TABLE "profiles"
  ALTER COLUMN "display_name"  DROP NOT NULL,
  ALTER COLUMN "country_iso2"  DROP NOT NULL,
  ALTER COLUMN "category"      DROP NOT NULL;

-- ── RLS: profile can only SELECT / UPDATE its own row ─────────────────────────
-- Drop any pre-existing policies first so this migration is idempotent.
DROP POLICY IF EXISTS "profiles_select_own" ON "profiles";
DROP POLICY IF EXISTS "profiles_insert_own" ON "profiles";
DROP POLICY IF EXISTS "profiles_update_own" ON "profiles";

ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON "profiles"
  FOR SELECT USING (
    auth.uid() = "user_id"
  );

CREATE POLICY "profiles_insert_own" ON "profiles"
  FOR INSERT WITH CHECK (
    auth.uid() = "user_id"
  );

CREATE POLICY "profiles_update_own" ON "profiles"
  FOR UPDATE USING (
    auth.uid() = "user_id"
  );
