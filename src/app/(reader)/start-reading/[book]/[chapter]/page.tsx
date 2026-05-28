import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, List } from "lucide-react";
import { getChapter } from "@/modules/content/public";
import { SafeMarkdown } from "@/modules/content/ui/markdown";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ book: string; chapter: string }>;
  searchParams: Promise<{ mode?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { book: bookSlug, chapter: chapterStr } = await params;
  const ordering = parseInt(chapterStr, 10);
  if (isNaN(ordering)) return { title: "Chapter not found" };
  const data = await getChapter(bookSlug, ordering);
  if (!data) return { title: "Chapter not found" };
  return {
    title: `${data.title} — ${data.book.title}`,
    description: `Chapter ${ordering} of ${data.book.title}.`,
  };
}

export default async function ChapterPage({ params, searchParams }: Props) {
  const { book: bookSlug, chapter: chapterStr } = await params;
  const { mode: modeParam } = await searchParams;

  const ordering = parseInt(chapterStr, 10);
  if (isNaN(ordering)) notFound();

  const data = await getChapter(bookSlug, ordering);
  if (!data) notFound();

  const isLite = modeParam === "lite";
  const altModeHref = isLite
    ? `/start-reading/${bookSlug}/${ordering}`
    : `/start-reading/${bookSlug}/${ordering}?mode=lite`;
  const altModeLabel = isLite ? "Standard mode" : "Lite mode";

  return (
    <>
      {/* ── Breadcrumb + Mode Toggle ─────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-border bg-surface px-4 py-3"
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-2">
          <ol className="flex min-w-0 items-center gap-1 font-sans text-sm text-ink-secondary">
            <li className="shrink-0">
              <Link
                href="/start-reading"
                className="hover:text-ink focus-ring rounded"
              >
                Start Reading
              </Link>
            </li>
            <li aria-hidden className="shrink-0">
              <ChevronRight size={14} />
            </li>
            <li className="shrink-0">
              <Link
                href={`/start-reading/${bookSlug}`}
                className="hover:text-ink focus-ring rounded truncate max-w-[120px] sm:max-w-none inline-block"
              >
                {data.book.title}
              </Link>
            </li>
            <li aria-hidden className="shrink-0">
              <ChevronRight size={14} />
            </li>
            <li
              className="truncate font-sans text-sm text-ink"
              aria-current="page"
            >
              Ch.{ordering}
            </li>
          </ol>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href={altModeHref}
              className="font-sans text-xs text-accent hover:underline focus-ring rounded"
            >
              {altModeLabel}
            </Link>
            <Link
              href={`/start-reading/${bookSlug}`}
              className="flex items-center gap-1 font-sans text-xs text-ink-secondary hover:text-ink focus-ring rounded"
              aria-label="Chapter list"
            >
              <List size={14} aria-hidden />
              <span className="hidden sm:inline">Contents</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Mode Banner (Lite only) ──────────────────────────────────────── */}
      {isLite && (
        <div className="border-b border-border bg-surface px-4 py-2 text-center">
          <p className="font-sans text-xs text-ink-secondary">
            Lite mode — text only, minimal data.{" "}
            <Link
              href={`/start-reading/${bookSlug}/${ordering}`}
              className="text-accent hover:underline focus-ring rounded"
            >
              Switch to Standard
            </Link>
          </p>
        </div>
      )}

      {/* ── Chapter Header ───────────────────────────────────────────────── */}
      <header
        className={
          isLite
            ? "border-b border-border px-4 py-8"
            : "border-b border-border px-4 py-10"
        }
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-sans text-sm text-ink-secondary tabular-nums">
              Chapter {ordering}
            </span>
            {data.estimatedReadMinutes != null && (
              <span className="flex items-center gap-1 font-sans text-sm text-ink-secondary">
                <Clock size={13} aria-hidden />
                {data.estimatedReadMinutes} min read
              </span>
            )}
          </div>
          <h1
            className={
              isLite
                ? "font-serif text-2xl font-semibold text-ink"
                : "font-serif text-3xl font-semibold text-ink md:text-4xl"
            }
          >
            {data.title}
          </h1>
        </div>
      </header>

      {/* ── Chapter Body ─────────────────────────────────────────────────── */}
      <main
        id="chapter-body"
        className={
          isLite
            ? "px-4 py-8"
            : "px-4 py-10"
        }
      >
        <div className="mx-auto max-w-3xl">
          <SafeMarkdown
            content={data.bodyMarkdown}
            mode={isLite ? "lite" : "standard"}
          />
        </div>
      </main>

      {/* ── Prev / Next Navigation ───────────────────────────────────────── */}
      <nav
        aria-label="Chapter navigation"
        className="border-t border-border px-4 py-6"
      >
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4">
          {/* Prev */}
          <div>
            {data.prev ? (
              <Link
                href={`/start-reading/${bookSlug}/${data.prev.ordering}${isLite ? "?mode=lite" : ""}`}
                className="group flex h-full flex-col rounded-card border border-border bg-surface px-4 py-4 transition-colors hover:border-accent/40 hover:bg-accent/5 focus-ring"
              >
                <span className="mb-1 flex items-center gap-1 font-sans text-xs text-ink-secondary">
                  <ChevronLeft size={12} aria-hidden />
                  Previous
                </span>
                <span className="font-serif text-sm font-medium text-ink group-hover:text-accent line-clamp-2">
                  {data.prev.title}
                </span>
              </Link>
            ) : (
              <Link
                href={`/start-reading/${bookSlug}`}
                className="group flex h-full flex-col rounded-card border border-border bg-surface px-4 py-4 transition-colors hover:border-accent/40 hover:bg-accent/5 focus-ring"
              >
                <span className="mb-1 flex items-center gap-1 font-sans text-xs text-ink-secondary">
                  <ChevronLeft size={12} aria-hidden />
                  Back
                </span>
                <span className="font-serif text-sm font-medium text-ink group-hover:text-accent">
                  Chapter list
                </span>
              </Link>
            )}
          </div>

          {/* Next */}
          <div>
            {data.next ? (
              <Link
                href={`/start-reading/${bookSlug}/${data.next.ordering}${isLite ? "?mode=lite" : ""}`}
                className="group flex h-full flex-col items-end rounded-card border border-border bg-surface px-4 py-4 text-right transition-colors hover:border-accent/40 hover:bg-accent/5 focus-ring"
              >
                <span className="mb-1 flex items-center gap-1 font-sans text-xs text-ink-secondary">
                  Next
                  <ChevronRight size={12} aria-hidden />
                </span>
                <span className="font-serif text-sm font-medium text-ink group-hover:text-accent line-clamp-2">
                  {data.next.title}
                </span>
              </Link>
            ) : (
              <Link
                href={`/start-reading/${bookSlug}`}
                className="group flex h-full flex-col items-end rounded-card border border-border bg-surface px-4 py-4 text-right transition-colors hover:border-accent/40 hover:bg-accent/5 focus-ring"
              >
                <span className="mb-1 flex items-center gap-1 font-sans text-xs text-ink-secondary">
                  Done
                  <ChevronRight size={12} aria-hidden />
                </span>
                <span className="font-serif text-sm font-medium text-ink group-hover:text-accent">
                  Back to chapter list
                </span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ── Disclaimer ───────────────────────────────────────────────────── */}
      <div className="border-t border-border px-4 py-4 text-center">
        <p className="font-sans text-xs text-ink-secondary">
          EILI provides structured financial literacy, not personalised financial
          advice.
        </p>
      </div>
    </>
  );
}
