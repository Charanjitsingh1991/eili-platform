import Link from "next/link";
import { Monitor, Zap, Download, BookOpen, BarChart2, RotateCcw } from "lucide-react";
import { ContinueCard } from "@/modules/reader/public";
import { getLastReadForBook } from "@/modules/reader/public";
import { getBookBySlug } from "@/modules/content/public";

export const metadata = {
  title: "Start Reading",
  description:
    "Read Household Money Literacy — Public Edition free, with no account required. Available in Standard, Lite, and Download modes.",
};

const BOOK_SLUG = "household-money-literacy";

const readingModes = [
  {
    icon: Monitor,
    title: "Standard",
    desc: "Full text with comfortable reading layout. Best on Wi-Fi.",
    cta: "Read Standard",
    href: `/start-reading/${BOOK_SLUG}/1`,
  },
  {
    icon: Zap,
    title: "Lite",
    desc: "Text only, optimised for low data. Under 50 KB per chapter.",
    cta: "Read Lite",
    href: `/start-reading/${BOOK_SLUG}/1?mode=lite`,
  },
  {
    icon: Download,
    title: "Download",
    desc: "Save selected chapters as a small PDF for offline reading.",
    cta: "Download PDF",
    href: `/api/download/chapter/${BOOK_SLUG}/1`,
  },
];

const continuePathRows = [
  {
    label: "For Households",
    books: [
      { title: "Level 1 — Public Edition", href: "/start-reading", tag: "Free" },
      { title: "Level 2", href: "/publications", tag: "Available" },
      { title: "Level 3", href: "/publications", tag: "Available" },
    ],
  },
  {
    label: "For Students",
    books: [
      { title: "Level 2", href: "/publications", tag: "Available" },
      { title: "Level 3", href: "/publications", tag: "Available" },
      { title: "Level 1 & 4", href: "/publications", tag: "Coming Soon" },
    ],
  },
];

const actionTools = [
  { href: "/tools/planner", icon: BookOpen, label: "Monthly Planner" },
  { href: "/tools/scorecard", icon: BarChart2, label: "Stability Scorecard" },
  { href: "/tools/reset", icon: RotateCcw, label: "30-Day Reset" },
];

export default async function StartReadingPage() {
  const book = await getBookBySlug(BOOK_SLUG);
  const serverOrdering = book
    ? await getLastReadForBook(book.id).then((r) => r?.ordering ?? null).catch(() => null)
    : null;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-14 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-4 font-serif text-3xl font-semibold text-ink md:text-4xl">
            Start Reading — No Account Required
          </h1>
          <p className="mb-8 font-sans text-base text-ink-secondary">
            Access Household Money Literacy — Public Edition free. Read online,
            use Lite mode for low data, or download for offline use.
          </p>
          <Link
            href={`/start-reading/${BOOK_SLUG}/1`}
            className="inline-flex h-12 items-center justify-center rounded-card bg-accent px-8 font-sans text-base font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
          >
            Start Reading Free Book
          </Link>
        </div>
      </section>

      {/* ── Continue Card (client-side — renders only if progress exists) ────── */}
      <ContinueCard bookSlug={BOOK_SLUG} serverOrdering={serverOrdering} />

      {/* ── Reading Modes ────────────────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-ink">
            Choose Your Reading Mode
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {readingModes.map((mode) => (
              <div
                key={mode.title}
                className="flex flex-col rounded-card border border-border bg-surface p-6"
              >
                <mode.icon size={20} className="mb-3 text-accent" aria-hidden />
                <h3 className="mb-2 font-serif text-base font-semibold text-ink">
                  {mode.title}
                </h3>
                <p className="mb-5 flex-1 font-sans text-sm text-ink-secondary">
                  {mode.desc}
                </p>
                <Link
                  href={mode.href}
                  className="inline-flex h-10 items-center justify-center rounded-card border border-accent px-4 font-sans text-sm font-medium text-accent transition-colors hover:bg-accent/5 focus-ring"
                >
                  {mode.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Book ────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-serif text-2xl font-semibold text-ink">
            Household Money Literacy — Public Edition
          </h2>
          <div className="rounded-card border border-border bg-background p-6 sm:p-8">
            <div className="mb-2 flex flex-wrap gap-2">
              <span className="rounded-input bg-accent/10 px-2 py-0.5 font-sans text-xs font-medium text-accent">
                Free
              </span>
              <span className="rounded-input bg-border px-2 py-0.5 font-sans text-xs text-ink-secondary">
                Level 1
              </span>
            </div>
            <h3 className="mb-2 font-serif text-xl font-semibold text-ink">
              Household Money Literacy
            </h3>
            <p className="mb-6 font-sans text-sm text-ink-secondary">
              A structured introduction to managing household money. Covers
              income, expenses, savings, and building a simple monthly plan.
              Designed for real-life use with no financial background required.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/start-reading/${BOOK_SLUG}/1`}
                className="inline-flex h-11 items-center justify-center rounded-card bg-accent px-6 font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
              >
                Read Now
              </Link>
              <Link
                href={`/api/download/chapter/${BOOK_SLUG}/1`}
                className="inline-flex h-11 items-center justify-center rounded-card border border-border px-6 font-sans text-sm font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
              >
                Download PDF
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Continue Your Path ───────────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-serif text-2xl font-semibold text-ink">
            Continue Your Path
          </h2>
          <div className="space-y-8">
            {continuePathRows.map((row) => (
              <div key={row.label}>
                <p className="mb-3 font-sans text-sm font-semibold text-ink">
                  {row.label}
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {row.books.map((book) => (
                    <Link
                      key={book.title}
                      href={book.href}
                      className="flex items-center justify-between rounded-card border border-border bg-surface px-4 py-3 transition-shadow hover:shadow-card focus-ring"
                    >
                      <span className="font-sans text-sm text-ink">
                        {book.title}
                      </span>
                      <span className="ml-2 shrink-0 rounded-input bg-accent/10 px-2 py-0.5 font-sans text-xs font-medium text-accent">
                        {book.tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Move to Action ───────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-2 font-serif text-2xl font-semibold text-ink">
            Reading Is Step One — Action Builds Stability
          </h2>
          <p className="mb-8 font-sans text-base text-ink-secondary">
            Use the tools to put what you have read into practice.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {actionTools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="inline-flex h-11 items-center gap-2 rounded-card border border-border bg-background px-5 font-sans text-sm font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
              >
                <t.icon size={16} aria-hidden />
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accessibility ────────────────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-sm text-ink-secondary">
            Works on mobile&nbsp;•&nbsp;Low data usage&nbsp;•&nbsp;Offline reading available via PDF download&nbsp;•&nbsp;No account required
          </p>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="px-4 py-14 text-center">
        <div className="mx-auto max-w-xl">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/start-reading/${BOOK_SLUG}/1`}
              className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-card bg-accent px-8 font-sans text-base font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
            >
              Read Free Book
            </Link>
            <Link
              href="/tools/planner"
              className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-card border border-border bg-background px-8 font-sans text-base font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
            >
              Start Planner
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
