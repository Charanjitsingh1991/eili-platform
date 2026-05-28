import Link from "next/link";
import { BookOpen, BarChart2, RotateCcw, CheckCircle, Download } from "lucide-react";

export const metadata = {
  title: "Tools & Planner",
  description:
    "Simple tools for financial stability. Monthly Planner, Stability Scorecard, and 30-Day Reset — no account required.",
};

const systemSteps = [
  { label: "Read", desc: "Start with the free book" },
  { label: "Plan", desc: "Build your monthly plan" },
  { label: "Score", desc: "Check your stability" },
  { label: "Improve", desc: "Act each week" },
];

const howToUse = [
  { step: "Step 1", action: "Read", desc: "Start with Household Money Literacy — Public Edition." },
  { step: "Step 2", action: "Build Plan", desc: "Enter your income, essentials, and savings in the Planner." },
  { step: "Step 3", action: "Check Score", desc: "Rate yourself on the Scorecard. See your total out of 25." },
  { step: "Step 4", action: "Improve Weekly", desc: "Follow the 30-Day Reset. One action at a time." },
];

const downloads = [
  { label: "Planner PDF", href: "/tools/planner?mode=download" },
  { label: "Scorecard PDF", href: "/tools/scorecard?mode=download" },
  { label: "30-Day Reset PDF", href: "/tools/reset?mode=download" },
];

export default function ToolsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-14 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-4 font-serif text-3xl font-semibold text-ink md:text-4xl">
            Take Control of Your Money with Simple Tools
          </h1>
          <p className="mb-3 font-sans text-sm text-ink-secondary">
            Simple&nbsp;•&nbsp;Fast&nbsp;•&nbsp;No experience required
          </p>
          <p className="mb-8 font-sans text-base text-ink-secondary">
            Three tools that work together. Use them without an account.
            Download for offline use.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/tools/planner"
              className="inline-flex h-12 items-center justify-center rounded-card bg-accent px-8 font-sans text-base font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
            >
              Start Your Plan
            </Link>
            <Link
              href="/tools/scorecard"
              className="inline-flex h-12 items-center justify-center rounded-card border border-border bg-background px-8 font-sans text-base font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
            >
              Check Your Score
            </Link>
          </div>
        </div>
      </section>

      {/* ── System Overview ──────────────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-ink">
            The System
          </h2>
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center">
            {systemSteps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className="flex min-w-[120px] flex-1 flex-col items-center rounded-card border border-border bg-surface px-4 py-4 text-center sm:flex-none">
                  <span className="mb-1 font-serif text-base font-semibold text-accent">{s.label}</span>
                  <span className="font-sans text-xs text-ink-secondary">{s.desc}</span>
                </div>
                {i < systemSteps.length - 1 && (
                  <span className="hidden font-sans text-ink-secondary sm:block" aria-hidden>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tool 1: Planner ──────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
            <div className="flex-1">
              <BookOpen size={24} className="mb-3 text-accent" aria-hidden />
              <h2 className="mb-2 font-serif text-2xl font-semibold text-ink">
                Plan Your Money — Before It Is Spent
              </h2>
              <p className="mb-4 font-sans text-base text-ink-secondary">
                Enter your monthly income, essential expenses, other expenses, and
                savings. The Planner shows your remaining balance in a clear,
                simple view. No complex budgeting logic — just what matters.
              </p>
              <ul className="mb-6 space-y-1">
                {["Monthly income", "Essential expenses", "Other expenses", "Savings (optional)"].map((item) => (
                  <li key={item} className="flex items-center gap-2 font-sans text-sm text-ink-secondary">
                    <CheckCircle size={14} className="shrink-0 text-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/tools/planner"
                  className="inline-flex h-11 items-center justify-center rounded-card bg-accent px-6 font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
                >
                  Start Planning
                </Link>
                <Link
                  href="/tools/planner?mode=download"
                  className="inline-flex h-11 items-center justify-center rounded-card border border-border px-6 font-sans text-sm font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
                >
                  Download Planner PDF
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tool 2: Scorecard ────────────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <BarChart2 size={24} className="mb-3 text-accent" aria-hidden />
          <h2 className="mb-2 font-serif text-2xl font-semibold text-ink">
            Know Where You Stand
          </h2>
          <p className="mb-4 font-sans text-base text-ink-secondary">
            Rate yourself across five pillars on a 0–5 scale. Your total score
            out of 25 places you in one of three stability bands.
          </p>
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-5">
            {["Income Clarity", "Expense Control", "Savings", "Protection", "Discipline"].map((pillar) => (
              <div key={pillar} className="rounded-card border border-border bg-surface px-3 py-3 text-center">
                <span className="font-sans text-xs text-ink-secondary">{pillar}</span>
              </div>
            ))}
          </div>
          <div className="mb-6 flex flex-col gap-2 sm:flex-row">
            {[
              { label: "0–10", band: "Low Stability", color: "text-scorecard-low" },
              { label: "11–18", band: "Moderate Stability", color: "text-scorecard-moderate" },
              { label: "19–25", band: "Strong Stability", color: "text-scorecard-strong" },
            ].map((b) => (
              <div key={b.band} className="flex flex-1 items-center gap-2 rounded-card border border-border bg-surface px-4 py-3">
                <span className="font-sans text-sm font-semibold text-ink">{b.label}</span>
                <span className={`font-sans text-sm ${b.color}`}>{b.band}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tools/scorecard"
              className="inline-flex h-11 items-center justify-center rounded-card bg-accent px-6 font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
            >
              Start Scorecard
            </Link>
            <Link
              href="/tools/scorecard?mode=download"
              className="inline-flex h-11 items-center justify-center rounded-card border border-border px-6 font-sans text-sm font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
            >
              Download
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tool 3: 30-Day Reset ─────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <RotateCcw size={24} className="mb-3 text-accent" aria-hidden />
          <h2 className="mb-2 font-serif text-2xl font-semibold text-ink">
            Reset Your Financial System in 30 Days
          </h2>
          <p className="mb-4 font-sans text-base text-ink-secondary">
            Four weeks of structured, weekly actions. Each week builds on the
            previous one to establish a pattern you can maintain.
          </p>
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-4">
            {[
              { week: "Week 1", label: "Awareness" },
              { week: "Week 2", label: "Control" },
              { week: "Week 3", label: "Adjustment" },
              { week: "Week 4", label: "Stabilization" },
            ].map((w) => (
              <div key={w.week} className="rounded-card border border-border bg-background px-4 py-4 text-center">
                <p className="font-sans text-xs text-ink-secondary">{w.week}</p>
                <p className="font-serif text-sm font-semibold text-ink">{w.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tools/reset"
              className="inline-flex h-11 items-center justify-center rounded-card bg-accent px-6 font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
            >
              Start Reset
            </Link>
            <Link
              href="/tools/reset?mode=download"
              className="inline-flex h-11 items-center justify-center rounded-card border border-border px-6 font-sans text-sm font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
            >
              Download Plan
            </Link>
          </div>
        </div>
      </section>

      {/* ── How to Use ───────────────────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-ink">
            How to Use the Tools
          </h2>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {howToUse.map((h) => (
              <li key={h.step} className="rounded-card border border-border bg-surface p-5">
                <span className="mb-2 block font-sans text-xs font-semibold text-accent">{h.step}</span>
                <p className="mb-1 font-serif text-base font-semibold text-ink">{h.action}</p>
                <p className="font-sans text-sm text-ink-secondary">{h.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Download Center ──────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-ink">
            Download Center
          </h2>
          <p className="mb-6 font-sans text-sm text-ink-secondary">
            Designed for low internet and offline use. Small file sizes, printable.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {downloads.map((d) => (
              <Link
                key={d.label}
                href={d.href}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-card border border-border bg-background font-sans text-sm font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
              >
                <Download size={14} aria-hidden />
                {d.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Disclaimer + Final CTA ───────────────────────────────────────── */}
      <section className="px-4 py-14 text-center">
        <div className="mx-auto max-w-xl">
          <p className="mb-8 font-sans text-xs text-ink-secondary">
            EILI provides structured financial literacy, not personalised financial advice.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/tools/planner"
              className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-card bg-accent px-6 font-sans text-base font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
            >
              Start Planning
            </Link>
            <Link
              href="/tools/scorecard"
              className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-card border border-border bg-background px-6 font-sans text-base font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
            >
              Check Score
            </Link>
            <Link
              href="/start-reading"
              className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-card border border-border bg-background px-6 font-sans text-base font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
            >
              Read Free Book
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
