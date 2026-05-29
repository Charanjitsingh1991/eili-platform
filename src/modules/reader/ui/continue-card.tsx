"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getLastReadChapter } from "@/lib/reader-progress";

interface Props {
  bookSlug: string;
  /** Server-side last read ordering (authenticated users only, null for anon) */
  serverOrdering: number | null;
}

/**
 * Shows a "Continue Where You Left Off" card.
 * Priority: IndexedDB (always available) → serverOrdering fallback.
 * Renders nothing until the client has checked IndexedDB to avoid hydration flicker.
 */
export function ContinueCard({ bookSlug, serverOrdering }: Props) {
  const [ordering, setOrdering] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getLastReadChapter(bookSlug)
      .then((entry) => {
        const resolved = entry?.chapterOrdering ?? serverOrdering ?? null;
        setOrdering(resolved);
      })
      .catch(() => {
        setOrdering(serverOrdering);
      })
      .finally(() => setReady(true));
  }, [bookSlug, serverOrdering]);

  if (!ready || ordering === null) return null;

  return (
    <section className="border-b border-border bg-surface px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between rounded-card border border-accent/30 bg-background px-5 py-4">
          <div className="flex items-center gap-3">
            <BookOpen size={18} className="shrink-0 text-accent" aria-hidden />
            <div>
              <p className="font-serif text-sm font-semibold text-ink">
                Continue Where You Left Off
              </p>
              <p className="font-sans text-xs text-ink-secondary">
                Household Money Literacy — Chapter {ordering}
              </p>
            </div>
          </div>
          <Link
            href={`/start-reading/${bookSlug}/${ordering}`}
            className="ml-4 shrink-0 inline-flex h-9 items-center justify-center rounded-card bg-accent px-4 font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
          >
            Continue
          </Link>
        </div>
      </div>
    </section>
  );
}
