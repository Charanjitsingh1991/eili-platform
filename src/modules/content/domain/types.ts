export type BookStatus = "draft" | "published" | "archived";
export type LiteracyLevel =
  | "foundational"
  | "developing"
  | "structural"
  | "institutional";

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  thesis: string | null;
  readingLevel: number;
  literacyLevel: LiteracyLevel;
  publishedAt: string | null;
  coverUrl: string | null;
  citationApa: string | null;
  status: BookStatus;
}

export interface ChapterSummary {
  id: string;
  bookId: string;
  ordering: number;
  title: string;
  wordCount: number | null;
  estimatedReadMinutes: number | null;
}

export interface Chapter extends ChapterSummary {
  bodyMarkdown: string;
}

export interface BookWithChapters extends Book {
  chapters: ChapterSummary[];
}
