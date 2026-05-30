import Link from "next/link";
import { Globe, Download, BookOpen } from "lucide-react";

export const metadata = {
  title: "Publications",
  description:
    "A structured library of financial literacy books for households and students. Read free online, download, or buy in print.",
};

const coreBooks = [
  {
    href: "/start-reading",
    title: "Household Money Literacy",
    subtitle: "Public Edition",
    tag: "Free",
    level: "Level 1",
    audience: "Households",
    desc: "A structured introduction to managing household money. Income, expenses, savings, and a simple monthly plan.",
  },
  {
    href: "/publications/money-literacy-level-2",
    title: "Money Literacy",
    subtitle: "Level 2",
    tag: "Ages 9–11",
    level: "Level 2",
    audience: "Students",
    desc: "Builds on foundational concepts. Introduces budgeting, earning, and basic financial decisions.",
  },
  {
    href: "/publications/money-literacy-level-3",
    title: "Money Literacy",
    subtitle: "Level 3",
    tag: "Ages 12–14",
    level: "Level 3",
    audience: "Students",
    desc: "Explores savings, credit, risk, and structured financial planning for young adults.",
  },
  {
    href: "/publications",
    title: "More Books",
    subtitle: "Coming Soon",
    tag: "Coming Soon",
    level: "Level 4+",
    audience: "All",
    desc: "Additional titles are in preparation. Check back for updates.",
    comingSoon: true,
  },
];

const accessOptions = [
  {
    icon: BookOpen,
    title: "Read Online",
    desc: "Free access. No account required. Standard and Lite modes available.",
  },
  {
    icon: Download,
    title: "Download PDF",
    desc: "Selected books available for offline reading. Small file size.",
  },
  {
    icon: Globe,
    title: "Buy Print",
    desc: "Physical copies available via Amazon. Ships globally.",
  },
];

const pathSteps = [
  { step: "Step 1", label: "Household", action: "Read the free Public Edition" },
  { step: "Step 2", label: "Level 2 / Level 3", action: "Continue with structured curriculum" },
  { step: "Step 3", label: "Apply with Tools", action: "Use the Planner, Scorecard, and Reset" },
];

export default function PublicationsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-14 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-4 font-serif text-3xl font-semibold text-ink md:text-4xl">
            A Structured Library for Real-Life Understanding
          </h1>
          <p className="mb-8 font-sans text-base text-ink-secondary">
            Books designed for households and students. Read free online,
            download for offline use, or buy a print copy.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/start-reading"
              className="inline-flex h-12 items-center justify-center rounded-card bg-accent px-8 font-sans text-base font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
            >
              Read Free Book
            </Link>
            <Link
              href="/start-reading/household-money-literacy/chapter-1?mode=download"
              className="inline-flex h-12 items-center justify-center rounded-card border border-border bg-background px-8 font-sans text-base font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
            >
              Download
            </Link>
          </div>
        </div>
      </section>

      {/* ── Core Books ───────────────────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-serif text-2xl font-semibold text-ink">
            Core Books
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {coreBooks.map((book) => (
              <div
                key={book.title + book.subtitle}
                className={`flex flex-col rounded-card border p-6 ${book.comingSoon ? "border-border bg-background" : "border-border bg-surface"}`}
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className={`rounded-input px-2 py-0.5 font-sans text-xs font-medium ${book.comingSoon ? "bg-border text-ink-secondary" : "bg-accent/10 text-accent"}`}>
                    {book.tag}
                  </span>
                  <span className="font-sans text-xs text-ink-secondary">
                    {book.level} · {book.audience}
                  </span>
                </div>
                <h3 className={`mb-1 font-serif text-lg font-semibold ${book.comingSoon ? "text-ink-secondary" : "text-ink"}`}>
                  {book.title}
                </h3>
                <p className="mb-1 font-sans text-sm text-ink-secondary">
                  {book.subtitle}
                </p>
                <p className="mb-5 flex-1 font-sans text-sm text-ink-secondary">
                  {book.desc}
                </p>
                {!book.comingSoon && (
                  <Link
                    href={book.href}
                    className="inline-flex h-10 w-fit items-center justify-center rounded-card bg-accent px-5 font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
                  >
                    Read Now
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Access Options ───────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-ink">
            Access Options
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {accessOptions.map((opt) => (
              <div key={opt.title} className="flex flex-col items-start rounded-card border border-border bg-background p-6">
                <opt.icon size={20} className="mb-3 text-accent" aria-hidden />
                <h3 className="mb-2 font-serif text-base font-semibold text-ink">
                  {opt.title}
                </h3>
                <p className="font-sans text-sm text-ink-secondary">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Continue Your Path ───────────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-serif text-2xl font-semibold text-ink">
            Continue Your Path
          </h2>
          <ol className="flex flex-col gap-4 sm:flex-row sm:gap-0">
            {pathSteps.map((s, i) => (
              <li key={s.step} className="flex flex-1 items-start gap-3 sm:flex-col sm:gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                  <span className="shrink-0 rounded-full bg-accent px-3 py-1 font-sans text-xs font-semibold text-white">
                    {s.step}
                  </span>
                  {i < pathSteps.length - 1 && (
                    <span className="mt-2 hidden h-px flex-1 bg-border sm:block" aria-hidden />
                  )}
                </div>
                <div>
                  <p className="font-serif text-base font-semibold text-ink">{s.label}</p>
                  <p className="font-sans text-sm text-ink-secondary">{s.action}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Global Access ────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-sm text-ink-secondary">
            Works on mobile&nbsp;•&nbsp;Low data usage&nbsp;•&nbsp;No physical delivery required&nbsp;•&nbsp;Available globally
          </p>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="px-4 py-14 text-center">
        <div className="mx-auto max-w-xl">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/start-reading"
              className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-card bg-accent px-8 font-sans text-base font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
            >
              Read Free Book
            </Link>
            <Link
              href="/tools/planner"
              className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-card border border-border bg-background px-8 font-sans text-base font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
            >
              Start Plan
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
