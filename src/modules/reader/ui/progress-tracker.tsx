"use client";

import { useEffect } from "react";
import { markChapterRead } from "@/lib/reader-progress";
import { recordChapterProgress } from "@/modules/reader/server/record-progress";

interface Props {
  bookSlug: string;
  bookId: string;
  chapterId: string;
  chapterOrdering: number;
  isAuthenticated: boolean;
}

/**
 * Fires once on mount to record that this chapter was read.
 * - Anonymous: writes to IndexedDB under eili_reader/chapter_progress
 * - Authenticated: calls Server Action → chapter_progress table (RLS)
 * No UI — purely a side-effect component.
 */
export function ProgressTracker({
  bookSlug,
  bookId,
  chapterId,
  chapterOrdering,
  isAuthenticated,
}: Props) {
  useEffect(() => {
    // Always write to IndexedDB (covers anon + serves as local cache for auth)
    markChapterRead(bookSlug, chapterOrdering).catch(() => {
      // Non-fatal
    });

    // If authenticated, also persist to Supabase
    if (isAuthenticated) {
      recordChapterProgress(bookId, chapterId, chapterOrdering).catch(() => {
        // Non-fatal
      });
    }
  }, [bookSlug, bookId, chapterId, chapterOrdering, isAuthenticated]);

  return null;
}
