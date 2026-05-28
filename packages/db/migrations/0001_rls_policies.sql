-- Enable RLS on all user-data tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE anon_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reader_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapter_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE planner_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE scorecards ENABLE ROW LEVEL SECURITY;
ALTER TABLE reset_progress ENABLE ROW LEVEL SECURITY;

-- Content tables are public read, admin write (no RLS needed for reads)
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE series ENABLE ROW LEVEL SECURITY;
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE levels ENABLE ROW LEVEL SECURITY;

-- ── Content tables: public read ──────────────────────────────────────────────
CREATE POLICY "books_public_read" ON books
  FOR SELECT USING (status = 'published');

CREATE POLICY "chapters_public_read" ON chapters
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM books WHERE books.id = chapters.book_id AND books.status = 'published')
  );

CREATE POLICY "series_public_read" ON series FOR SELECT USING (true);
CREATE POLICY "themes_public_read" ON themes FOR SELECT USING (true);
CREATE POLICY "levels_public_read" ON levels FOR SELECT USING (true);

-- ── Profiles: users own their own row ────────────────────────────────────────
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- ── Anon sessions: service role only (set from middleware) ───────────────────
CREATE POLICY "anon_sessions_service_role" ON anon_sessions
  USING (auth.role() = 'service_role');

-- ── Reader sessions ──────────────────────────────────────────────────────────
CREATE POLICY "reader_sessions_select_own" ON reader_sessions
  FOR SELECT USING (
    (profile_id IS NOT NULL AND auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id))
    OR (anon_session_id IS NOT NULL AND auth.role() = 'service_role')
  );

CREATE POLICY "reader_sessions_insert_own" ON reader_sessions
  FOR INSERT WITH CHECK (
    (profile_id IS NOT NULL AND auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id))
    OR (anon_session_id IS NOT NULL AND auth.role() = 'service_role')
  );

CREATE POLICY "reader_sessions_update_own" ON reader_sessions
  FOR UPDATE USING (
    (profile_id IS NOT NULL AND auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id))
    OR (anon_session_id IS NOT NULL AND auth.role() = 'service_role')
  );

-- ── Chapter progress ─────────────────────────────────────────────────────────
CREATE POLICY "chapter_progress_select_own" ON chapter_progress
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM reader_sessions rs WHERE rs.id = chapter_progress.reader_session_id
      AND (
        (rs.profile_id IS NOT NULL AND auth.uid() = (SELECT user_id FROM profiles WHERE id = rs.profile_id))
        OR (rs.anon_session_id IS NOT NULL AND auth.role() = 'service_role')
      )
    )
  );

CREATE POLICY "chapter_progress_insert_own" ON chapter_progress
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM reader_sessions rs WHERE rs.id = chapter_progress.reader_session_id
      AND (
        (rs.profile_id IS NOT NULL AND auth.uid() = (SELECT user_id FROM profiles WHERE id = rs.profile_id))
        OR (rs.anon_session_id IS NOT NULL AND auth.role() = 'service_role')
      )
    )
  );

CREATE POLICY "chapter_progress_update_own" ON chapter_progress
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM reader_sessions rs WHERE rs.id = chapter_progress.reader_session_id
      AND (
        (rs.profile_id IS NOT NULL AND auth.uid() = (SELECT user_id FROM profiles WHERE id = rs.profile_id))
        OR (rs.anon_session_id IS NOT NULL AND auth.role() = 'service_role')
      )
    )
  );

-- ── Planner drafts ───────────────────────────────────────────────────────────
CREATE POLICY "planner_drafts_select_own" ON planner_drafts
  FOR SELECT USING (
    (profile_id IS NOT NULL AND auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id))
    OR (anon_session_id IS NOT NULL AND auth.role() = 'service_role')
  );

CREATE POLICY "planner_drafts_insert_own" ON planner_drafts
  FOR INSERT WITH CHECK (
    (profile_id IS NOT NULL AND auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id))
    OR (anon_session_id IS NOT NULL AND auth.role() = 'service_role')
  );

CREATE POLICY "planner_drafts_update_own" ON planner_drafts
  FOR UPDATE USING (
    (profile_id IS NOT NULL AND auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id))
    OR (anon_session_id IS NOT NULL AND auth.role() = 'service_role')
  );

-- ── Scorecards ───────────────────────────────────────────────────────────────
CREATE POLICY "scorecards_select_own" ON scorecards
  FOR SELECT USING (
    (profile_id IS NOT NULL AND auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id))
    OR (anon_session_id IS NOT NULL AND auth.role() = 'service_role')
  );

CREATE POLICY "scorecards_insert_own" ON scorecards
  FOR INSERT WITH CHECK (
    (profile_id IS NOT NULL AND auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id))
    OR (anon_session_id IS NOT NULL AND auth.role() = 'service_role')
  );

CREATE POLICY "scorecards_update_own" ON scorecards
  FOR UPDATE USING (
    (profile_id IS NOT NULL AND auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id))
    OR (anon_session_id IS NOT NULL AND auth.role() = 'service_role')
  );

-- ── Reset progress ───────────────────────────────────────────────────────────
CREATE POLICY "reset_progress_select_own" ON reset_progress
  FOR SELECT USING (
    (profile_id IS NOT NULL AND auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id))
    OR (anon_session_id IS NOT NULL AND auth.role() = 'service_role')
  );

CREATE POLICY "reset_progress_insert_own" ON reset_progress
  FOR INSERT WITH CHECK (
    (profile_id IS NOT NULL AND auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id))
    OR (anon_session_id IS NOT NULL AND auth.role() = 'service_role')
  );

CREATE POLICY "reset_progress_update_own" ON reset_progress
  FOR UPDATE USING (
    (profile_id IS NOT NULL AND auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id))
    OR (anon_session_id IS NOT NULL AND auth.role() = 'service_role')
  );
