import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, Clock, ChevronRight } from "lucide-react";
import { getBookBySlug } from "@/modules/content/public";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ book: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { book: slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return { title: "Book not found" };
  return {
    title: book.title,
    description: book.thesis ?? book.subtitle ?? undefined,
  };
}

export default async function BookPage({ params }: Props) {
  const { book: slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();

  const totalMinutes = book.chapters.reduce(
    (acc, ch) => acc + (ch.estimatedReadMinutes ?? 0),
    0,
  );

  return (
    <>
      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-border bg-surface px-4 py-3"
      >
        <ol className="mx-auto flex max-w-3xl items-center gap-1 font-sans text-sm text-ink-secondary">
          <li>
            <Link href="/start-reading" className="hover:text-ink focus-ring rounded">
              Start Reading
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight size={14} />
          </li>
          <li className="text-ink" aria-current="page">
            {book.title}
          </li>
        </ol>
      </nav>

      {/* ── Book Header ──────────────────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-0.5 font-sans text-xs text-ink-secondary capitalize">
              {book.literacyLevel}
            </span>
            {totalMinutes > 0 && (
              <span className="inline-flex items-center gap-1 font-sans text-xs text-ink-secondary">
                <Clock size={12} aria-hidden />
                {totalMinutes} min read
              </span>
            )}
          </div>

          <h1 className="mb-2 font-serif text-3xl font-semibold text-ink md:text-4xl">
            {book.title}
          </h1>

          {book.subtitle && (
            <p className="mb-4 font-sans text-base text-ink-secondary">
              {book.subtitle}
            </p>
          )}

          {book.thesis && (
            <blockquote className="mb-6 border-l-4 border-accent pl-4 font-sans text-base text-ink-secondary">
              {book.thesis}
            </blockquote>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            {book.chapters[0] && (
              <Link
                href={`/start-reading/${book.slug}/${book.chapters[0].ordering}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-card bg-accent px-6 font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
              >
                <BookOpen size={16} aria-hidden />
                Start Reading
              </Link>
            )}
            <Link
              href={`/start-reading/${book.slug}/1?mode=lite`}
              className="inline-flex h-11 items-center justify-center rounded-card border border-border px-6 font-sans text-sm font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
            >
              Read in Lite Mode
            </Link>
          </div>
        </div>
      </section>

      {/* ── Chapter List ─────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-ink">
            Chapters
          </h2>
          <ol className="space-y-3">
            {book.chapters.map((ch) => (
              <li key={ch.id}>
                <Link
                  href={`/start-reading/${book.slug}/${ch.ordering}`}
                  className="group flex items-center justify-between rounded-card border border-border bg-background px-5 py-4 transition-colors hover:border-accent/40 hover:bg-accent/5 focus-ring"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 w-7 shrink-0 font-sans text-sm text-ink-secondary tabular-nums">
                      {String(ch.ordering).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-base font-medium text-ink group-hover:text-accent">
                      {ch.title}
                    </span>
                  </div>
                  <div className="ml-4 flex shrink-0 items-center gap-3">
                    {ch.estimatedReadMinutes != null && (
                      <span className="hidden font-sans text-xs text-ink-secondary sm:block">
                        {ch.estimatedReadMinutes} min
                      </span>
                    )}
                    <ChevronRight
                      size={16}
                      className="text-ink-secondary transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Reading Mode Note ────────────────────────────────────────────── */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-sm text-ink-secondary">
            <strong className="font-semibold text-ink">Reading modes:</strong>{" "}
            Standard mode includes full formatting and tables. Lite mode is
            text-only and uses minimal data — suitable for slow connections.
          </p>
        </div>
      </section>
    </>
  );
}
