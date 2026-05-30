import { createClient } from "@/lib/supabase/server";

export async function getLastReadForBook(
  bookId: string,
): Promise<{ chapterId: string; ordering: number } | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("chapter_progress")
    .select("chapter_id, chapters(ordering)")
    .eq("profile_id", user.id)
    .eq("book_id", bookId)
    .order("last_read_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;

  const chaptersRaw = data.chapters as unknown;
  const chaptersArr = Array.isArray(chaptersRaw) ? chaptersRaw : [chaptersRaw];
  const first = chaptersArr[0] as { ordering: number } | undefined;
  if (!first) return null;

  return { chapterId: data.chapter_id, ordering: first.ordering };
}
