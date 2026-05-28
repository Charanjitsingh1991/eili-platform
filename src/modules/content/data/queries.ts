import { createClient } from "@/lib/supabase/server";
import type {
  Book,
  BookWithChapters,
  Chapter,
  ChapterSummary,
} from "../domain/types";

export async function getPublishedBooks(): Promise<Book[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("books")
    .select(
      "id, slug, title, subtitle, thesis, reading_level, literacy_level, published_at, cover_url, citation_apa, status",
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw new Error(`getPublishedBooks: ${error.message}`);
  return (data ?? []).map(mapBook);
}

export async function getBookBySlug(
  slug: string,
): Promise<BookWithChapters | null> {
  const supabase = await createClient();
  const { data: book, error: bookErr } = await supabase
    .from("books")
    .select(
      "id, slug, title, subtitle, thesis, reading_level, literacy_level, published_at, cover_url, citation_apa, status",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (bookErr || !book) return null;

  const { data: chapters, error: chapErr } = await supabase
    .from("chapters")
    .select("id, book_id, ordering, title, word_count, estimated_read_minutes")
    .eq("book_id", book.id)
    .order("ordering", { ascending: true });

  if (chapErr) throw new Error(`getBookBySlug chapters: ${chapErr.message}`);

  return {
    ...mapBook(book),
    chapters: (chapters ?? []).map(mapChapterSummary),
  };
}

export async function getChapter(
  bookSlug: string,
  ordering: number,
): Promise<
  | (Chapter & {
      book: Pick<Book, "slug" | "title">;
      prev: ChapterSummary | null;
      next: ChapterSummary | null;
    })
  | null
> {
  const supabase = await createClient();

  const { data: book, error: bookErr } = await supabase
    .from("books")
    .select("id, slug, title")
    .eq("slug", bookSlug)
    .eq("status", "published")
    .single();

  if (bookErr || !book) return null;

  const { data: allChapters, error: allErr } = await supabase
    .from("chapters")
    .select("id, book_id, ordering, title, word_count, estimated_read_minutes")
    .eq("book_id", book.id)
    .order("ordering", { ascending: true });

  if (allErr) throw new Error(`getChapter siblings: ${allErr.message}`);
  const siblings = (allChapters ?? []).map(mapChapterSummary);

  const { data: chapter, error: chapErr } = await supabase
    .from("chapters")
    .select(
      "id, book_id, ordering, title, body_markdown, word_count, estimated_read_minutes",
    )
    .eq("book_id", book.id)
    .eq("ordering", ordering)
    .single();

  if (chapErr || !chapter) return null;

  const idx = siblings.findIndex((s) => s.id === chapter.id);

  return {
    id: chapter.id,
    bookId: chapter.book_id,
    ordering: chapter.ordering,
    title: chapter.title,
    bodyMarkdown: chapter.body_markdown,
    wordCount: chapter.word_count ?? null,
    estimatedReadMinutes: chapter.estimated_read_minutes ?? null,
    book: { slug: book.slug, title: book.title },
    prev: idx > 0 ? (siblings[idx - 1] ?? null) : null,
    next: idx < siblings.length - 1 ? (siblings[idx + 1] ?? null) : null,
  };
}

// ── Mappers ────────────────────────────────────────────────────────────────

function mapBook(row: Record<string, unknown>): Book {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    subtitle: (row.subtitle as string | null) ?? null,
    thesis: (row.thesis as string | null) ?? null,
    readingLevel: row.reading_level as number,
    literacyLevel: row.literacy_level as Book["literacyLevel"],
    publishedAt: (row.published_at as string | null) ?? null,
    coverUrl: (row.cover_url as string | null) ?? null,
    citationApa: (row.citation_apa as string | null) ?? null,
    status: row.status as Book["status"],
  };
}

function mapChapterSummary(row: Record<string, unknown>): ChapterSummary {
  return {
    id: row.id as string,
    bookId: row.book_id as string,
    ordering: row.ordering as number,
    title: row.title as string,
    wordCount: (row.word_count as number | null) ?? null,
    estimatedReadMinutes: (row.estimated_read_minutes as number | null) ?? null,
  };
}
