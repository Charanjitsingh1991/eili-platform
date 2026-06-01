-- Migration 0002: Add profile_id, book_id, last_read_at, completed to chapter_progress
-- Keeps all existing columns intact; adds new ones for direct profile-keyed progress.
-- The old reader_session_id path remains valid for existing anonymous rows.

-- ── 1. Add new columns (nullable first so existing rows don't violate NOT NULL) ────
ALTER TABLE "chapter_progress"
  ADD COLUMN IF NOT EXISTS "profile_id"   uuid        REFERENCES "profiles"("id") ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS "book_id"      uuid        REFERENCES "books"("id")    ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS "last_read_at" timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS "completed"    boolean     NOT NULL DEFAULT false;

-- ── 2. Unique constraint for upsert on (profile_id, chapter_id) ──────────────────
-- Partial: only enforced when profile_id IS NOT NULL (anonymous rows are excluded).
CREATE UNIQUE INDEX IF NOT EXISTS "chapter_progress_profile_chapter_uidx"
  ON "chapter_progress" ("profile_id", "chapter_id")
  WHERE "profile_id" IS NOT NULL;

-- ── 3. Index for fast last-read lookup per profile + book ────────────────────────
CREATE INDEX IF NOT EXISTS "chapter_progress_profile_book_idx"
  ON "chapter_progress" ("profile_id", "book_id", "last_read_at" DESC)
  WHERE "profile_id" IS NOT NULL;

-- ── 4. Drop old RLS policies on chapter_progress (they join via reader_sessions) ──
DROP POLICY IF EXISTS "chapter_progress_select_own" ON "chapter_progress";
DROP POLICY IF EXISTS "chapter_progress_insert_own" ON "chapter_progress";
DROP POLICY IF EXISTS "chapter_progress_update_own" ON "chapter_progress";

-- ── 5. New RLS policies — direct profile_id check (Phase 1 path) ────────────────
--    Also preserves the legacy reader_session_id path for existing anonymous rows.

CREATE POLICY "chapter_progress_select_own" ON "chapter_progress"
  FOR SELECT USING (
    -- authenticated path: direct profile ownership
    (
      "profile_id" IS NOT NULL
      AND auth.uid() = (SELECT user_id FROM profiles WHERE id = "profile_id")
    )
    OR
    -- legacy anonymous path via reader_session join
    (
      "profile_id" IS NULL
      AND EXISTS (
        SELECT 1 FROM reader_sessions rs
        WHERE rs.id = "chapter_progress"."reader_session_id"
          AND rs.anon_session_id IS NOT NULL
          AND auth.role() = 'service_role'
      )
    )
  );

CREATE POLICY "chapter_progress_insert_own" ON "chapter_progress"
  FOR INSERT WITH CHECK (
    (
      "profile_id" IS NOT NULL
      AND auth.uid() = (SELECT user_id FROM profiles WHERE id = "profile_id")
    )
    OR
    (
      "profile_id" IS NULL
      AND EXISTS (
        SELECT 1 FROM reader_sessions rs
        WHERE rs.id = "chapter_progress"."reader_session_id"
          AND rs.anon_session_id IS NOT NULL
          AND auth.role() = 'service_role'
      )
    )
  );

CREATE POLICY "chapter_progress_update_own" ON "chapter_progress"
  FOR UPDATE USING (
    (
      "profile_id" IS NOT NULL
      AND auth.uid() = (SELECT user_id FROM profiles WHERE id = "profile_id")
    )
    OR
    (
      "profile_id" IS NULL
      AND EXISTS (
        SELECT 1 FROM reader_sessions rs
        WHERE rs.id = "chapter_progress"."reader_session_id"
          AND rs.anon_session_id IS NOT NULL
          AND auth.role() = 'service_role'
      )
    )
  );

CREATE POLICY "chapter_progress_delete_own" ON "chapter_progress"
  FOR DELETE USING (
    "profile_id" IS NOT NULL
    AND auth.uid() = (SELECT user_id FROM profiles WHERE id = "profile_id")
  );
