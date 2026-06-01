"use server";

import { createClient } from "@/lib/supabase/server";

export async function recordChapterProgress(
  bookId: string,
  chapterId: string,
  ordering: number,
): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return; // anonymous — caller handles IndexedDB

  // profiles.id (PK) ≠ auth.uid() — look up the profile row first
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!profile) return; // user exists in auth but has no profile yet

  // Upsert: one row per (profile_id, chapter_id), update read_at on re-read
  const { error } = await supabase.from("chapter_progress").upsert(
    {
      profile_id: profile.id,
      chapter_id: chapterId,
      book_id: bookId,
      completed: true,
      last_read_at: new Date().toISOString(),
    },
    {
      onConflict: "profile_id,chapter_id",
      ignoreDuplicates: false,
    },
  );

  if (error) {
    // Non-fatal: log but do not throw — reading must never break on progress failure
    // eslint-disable-next-line no-console
    console.warn("[reader] recordChapterProgress error:", error.message);
  }
}
