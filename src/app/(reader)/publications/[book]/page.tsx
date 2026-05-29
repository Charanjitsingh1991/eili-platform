import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, Download, ChevronRight } from "lucide-react";
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

// Static metadata per book — keyed off slug
const BOOK_META: Record<
  string,
  {
    whoShouldRead: string[];
    keyLessons: string[];
    pathLevel: string;
    seriesName: string;
    citationChicago: string;
    citationMla: string;
    isbn: string | null;
  }
> = {
  "household-money-literacy": {
    whoShouldRead: [
      "Adults managing a household on any income",
      "Anyone who has never been taught how to organise money",
      "Individuals starting to budget for the first time",
      "Parents who want to model good financial habits",
      "Students entering adult financial responsibilities",
    ],
    keyLessons: [
      "Understanding what income really means and how to measure it accurately",
      "Mapping essential expenses to identify your minimum monthly floor",
      "Building a simple monthly plan that fits your real life",
      "The difference between essential and non-essential spending",
      "Why a small savings habit beats a perfect plan you never start",
      "How to read your remaining balance as a signal, not a verdict",
      "The basics of protecting your household against unexpected costs",
    ],
    pathLevel: "Level 1 — Foundation",
    seriesName: "Household Money Literacy",
    citationChicago:
      "Economic & Industrial Literacy Institute. Household Money Literacy — Public Edition. EILI, 2025.",
    citationMla:
      "Economic & Industrial Literacy Institute. Household Money Literacy — Public Edition. EILI, 2025.",
    isbn: null,
  },
};

export default async function BookDetailPage({ params }: Props) {
  const { book: slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();

  const meta = BOOK_META[slug];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eili.org";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    ...(book.subtitle ? { alternativeHeadline: book.subtitle } : {}),
    ...(book.thesis ? { description: book.thesis } : {}),
    author: {
      "@type": "Organization",
      name: "Economic & Industrial Literacy Institute",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Economic & Industrial Literacy Institute",
    },
    url: `${siteUrl}/publications/${slug}`,
    inLanguage: "en",
    isAccessibleForFree: true,
    ...(book.publishedAt ? { datePublished: book.publishedAt.slice(0, 10) } : {}),
    ...(meta?.isbn ? { isbn: meta.isbn } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="border-b border-border bg-surface px-4 py-3">
        <ol className="mx-auto flex max-w-4xl items-center gap-1 font-sans text-xs text-ink-secondary">
          <li><Link href="/publications" className="hover:text-ink focus-ring rounded">Publications</Link></li>
          <li aria-hidden><ChevronRight size={12} /></li>
          <li className="text-ink" aria-current="page">{book.title}</li>
        </ol>
      </nav>

      {/* ── Hero / Book header ───────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-8 sm:flex-row">
            {/* Cover placeholder */}
            <div className="flex h-52 w-36 shrink-0 items-center justify-center rounded-card border border-border bg-background text-ink-secondary">
              <BookOpen size={32} aria-hidden />
            </div>

            <div className="flex-1">
              {meta && (
                <p className="mb-1 font-sans text-xs font-semibold uppercase tracking-wide text-accent">
                  Part of the {meta.seriesName} series — {meta.pathLevel}
                </p>
              )}
              <h1 className="mb-2 font-serif text-3xl font-semibold text-ink">
                {book.title}
              </h1>
              {book.subtitle && (
                <p className="mb-3 font-sans text-base text-ink-secondary">
                  {book.subtitle}
                </p>
              )}
              {book.thesis && (
                <blockquote className="mb-5 border-l-2 border-accent pl-4 font-serif text-base italic text-ink">
                  {book.thesis}
                </blockquote>
              )}

              {/* Tags */}
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded-input bg-accent/10 px-2 py-0.5 font-sans text-xs font-medium text-accent">
                  Free
                </span>
                <span className="rounded-input bg-border px-2 py-0.5 font-sans text-xs text-ink-secondary">
                  Reading Level {book.readingLevel}
                </span>
                {meta && (
                  <span className="rounded-input bg-border px-2 py-0.5 font-sans text-xs text-ink-secondary">
                    {meta.pathLevel}
                  </span>
                )}
              </div>

              {/* Format buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/start-reading/${slug}/1`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-card bg-accent px-6 font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
                >
                  <BookOpen size={16} aria-hidden />
                  Read Online
                </Link>
                <a
                  href={`/api/download/chapter/${slug}/1`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-card border border-border px-6 font-sans text-sm font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
                >
                  <Download size={16} aria-hidden />
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who Should Read ─────────────────────────────────────────────── */}
      {meta && (
        <section className="border-b border-border px-4 py-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-5 font-serif text-xl font-semibold text-ink">
              Who Should Read This
            </h2>
            <ul className="space-y-2">
              {meta.whoShouldRead.map((item) => (
                <li key={item} className="flex items-start gap-3 font-sans text-sm text-ink">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Key Lessons ─────────────────────────────────────────────────── */}
      {meta && (
        <section className="border-b border-border bg-surface px-4 py-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-5 font-serif text-xl font-semibold text-ink">
              Key Lessons
            </h2>
            <ol className="space-y-3">
              {meta.keyLessons.map((lesson, i) => (
                <li key={lesson} className="flex items-start gap-3 font-sans text-sm text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 font-sans text-xs font-semibold text-accent">
                    {i + 1}
                  </span>
                  {lesson}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── Chapters ────────────────────────────────────────────────────── */}
      {book.chapters.length > 0 && (
        <section className="border-b border-border px-4 py-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-5 font-serif text-xl font-semibold text-ink">
              Chapters
            </h2>
            <ol className="divide-y divide-border rounded-card border border-border">
              {book.chapters.map((ch) => (
                <li key={ch.id}>
                  <Link
                    href={`/start-reading/${slug}/${ch.ordering}`}
                    className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-surface focus-ring"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-xs text-ink-secondary">{ch.ordering}.</span>
                      <span className="font-sans text-sm text-ink">{ch.title}</span>
                    </div>
                    {ch.estimatedReadMinutes && (
                      <span className="ml-4 shrink-0 font-sans text-xs text-ink-secondary">
                        {ch.estimatedReadMinutes} min
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── Citation ────────────────────────────────────────────────────── */}
      {meta && (
        <section className="border-b border-border bg-surface px-4 py-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-5 font-serif text-xl font-semibold text-ink">
              Citation
            </h2>
            <div className="space-y-4">
              {book.citationApa && (
                <div>
                  <p className="mb-1 font-sans text-xs font-semibold uppercase tracking-wide text-ink-secondary">APA</p>
                  <p className="rounded-card border border-border bg-background px-4 py-3 font-sans text-sm text-ink">
                    {book.citationApa}
                  </p>
                </div>
              )}
              <div>
                <p className="mb-1 font-sans text-xs font-semibold uppercase tracking-wide text-ink-secondary">Chicago</p>
                <p className="rounded-card border border-border bg-background px-4 py-3 font-sans text-sm text-ink">
                  {meta.citationChicago}
                </p>
              </div>
              <div>
                <p className="mb-1 font-sans text-xs font-semibold uppercase tracking-wide text-ink-secondary">MLA</p>
                <p className="rounded-card border border-border bg-background px-4 py-3 font-sans text-sm text-ink">
                  {meta.citationMla}
                </p>
              </div>
              {meta.isbn && (
                <p className="font-sans text-xs text-ink-secondary">ISBN: {meta.isbn}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Continue Your Path ──────────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-5 font-serif text-xl font-semibold text-ink">
            Continue Your Path
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-card border border-border bg-surface p-5">
              <p className="mb-1 font-sans text-xs font-semibold uppercase tracking-wide text-accent">Step 1</p>
              <p className="mb-2 font-serif text-sm font-semibold text-ink">Read This Book</p>
              <Link
                href={`/start-reading/${slug}/1`}
                className="font-sans text-xs text-accent hover:underline focus-ring rounded"
              >
                Start reading →
              </Link>
            </div>
            <div className="rounded-card border border-border bg-surface p-5">
              <p className="mb-1 font-sans text-xs font-semibold uppercase tracking-wide text-accent">Step 2</p>
              <p className="mb-2 font-serif text-sm font-semibold text-ink">Build Your Plan</p>
              <Link
                href="/tools/planner"
                className="font-sans text-xs text-accent hover:underline focus-ring rounded"
              >
                Open Planner →
              </Link>
            </div>
            <div className="rounded-card border border-border bg-surface p-5">
              <p className="mb-1 font-sans text-xs font-semibold uppercase tracking-wide text-accent">Step 3</p>
              <p className="mb-2 font-serif text-sm font-semibold text-ink">Check Your Score</p>
              <Link
                href="/tools/scorecard"
                className="font-sans text-xs text-accent hover:underline focus-ring rounded"
              >
                Open Scorecard →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
