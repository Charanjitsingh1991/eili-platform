import Link from "next/link";
import { BookOpen, BarChart2, RotateCcw, CheckCircle } from "lucide-react";

export const metadata = {
  title: "EILI — Economic & Industrial Literacy Institute",
  description:
    "Build financial stability with simple systems. Read, plan, and track your money using simple tools designed for real-life use.",
};

const systemSteps = [
  { label: "Read", desc: "Start with the free book" },
  { label: "Plan", desc: "Build your monthly plan" },
  { label: "Score", desc: "Check your stability score" },
  { label: "Improve", desc: "Act on what you learn" },
];

const outcomes = [
  "Understand where your money goes each month",
  "Build a simple plan that fits your real income",
  "Know your financial stability score",
  "Take small, consistent steps toward improvement",
];

const startHereCards = [
  {
    href: "/start-reading",
    title: "Read the Free Book",
    desc: "Household Money Literacy — Public Edition. Start here, no account needed.",
    cta: "Start Reading",
  },
  {
    href: "/tools/planner",
    title: "Build Your Plan",
    desc: "Organise your income, essentials, and savings in one simple view.",
    cta: "Open Planner",
  },
  {
    href: "/tools/scorecard",
    title: "Check Your Score",
    desc: "Rate your stability across five pillars and see where to focus.",
    cta: "Start Scorecard",
  },
];

const featuredBooks = [
  {
    href: "/start-reading",
    title: "Household Money Literacy",
    subtitle: "Public Edition",
    tag: "Free",
    level: "Level 1",
  },
  {
    href: "/publications",
    title: "Money Literacy",
    subtitle: "Level 2",
    tag: "Ages 9–11",
    level: "Level 2",
  },
  {
    href: "/publications",
    title: "Money Literacy",
    subtitle: "Level 3",
    tag: "Ages 12–14",
    level: "Level 3",
  },
];

const tools = [
  {
    href: "/tools/planner",
    icon: BookOpen,
    title: "Monthly Planner",
    desc: "Plan your money before it is spent. Track income, essentials, and savings.",
    cta: "Start Planning",
  },
  {
    href: "/tools/scorecard",
    icon: BarChart2,
    title: "Stability Scorecard",
    desc: "Score yourself across five pillars. See your total out of 25.",
    cta: "Check Score",
  },
  {
    href: "/tools/reset",
    icon: RotateCcw,
    title: "30-Day Reset",
    desc: "Four weeks of structured actions to reset your financial system.",
    cta: "Start Reset",
  },
];

const trustPoints = [
  "Simple to use — no financial background required",
  "No account needed to read or use the tools",
  "Works in all regions on any mobile device",
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-4 font-serif text-3xl font-semibold text-ink md:text-4xl">
            Build Financial Stability with Simple Systems
          </h1>
          <p className="mb-8 font-sans text-lg text-ink-secondary">
            Read, plan, and track your money using simple tools designed for
            real-life use.
          </p>
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
              Start Your Plan
            </Link>
          </div>
          <p className="mt-5 font-sans text-sm text-ink-secondary">
            Works on mobile&nbsp;•&nbsp;Low data usage&nbsp;•&nbsp;No account required
          </p>
        </div>
      </section>

      {/* ── Core System ──────────────────────────────────────────────────── */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center font-serif text-2xl font-semibold text-ink">
            A Simple System That Works
          </h2>
          <p className="mb-8 text-center font-sans text-base text-ink-secondary">
            Four steps. Repeat each month. Build stability over time.
          </p>
          <div className="mb-10 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center">
            {systemSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="flex min-w-[120px] flex-1 flex-col items-center rounded-card border border-border bg-surface px-4 py-4 text-center sm:flex-none">
                  <span className="mb-1 font-serif text-base font-semibold text-accent">
                    {step.label}
                  </span>
                  <span className="font-sans text-xs text-ink-secondary">
                    {step.desc}
                  </span>
                </div>
                {i < systemSteps.length - 1 && (
                  <span className="hidden font-sans text-ink-secondary sm:block" aria-hidden>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
          <ul className="mx-auto grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
            {outcomes.map((o) => (
              <li key={o} className="flex items-start gap-2 font-sans text-sm text-ink-secondary">
                <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                {o}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Start Here ───────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-ink">
            Start Here
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {startHereCards.map((card) => (
              <div
                key={card.href + card.title}
                className="flex flex-col rounded-card border border-border bg-background p-6"
              >
                <h3 className="mb-2 font-serif text-lg font-semibold text-ink">
                  {card.title}
                </h3>
                <p className="mb-5 flex-1 font-sans text-sm text-ink-secondary">
                  {card.desc}
                </p>
                <Link
                  href={card.href}
                  className="inline-flex h-10 items-center justify-center rounded-card bg-accent px-5 font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
                >
                  {card.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Books ───────────────────────────────────────────────── */}
      <section className="border-t border-border px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-semibold text-ink">
              Featured Books
            </h2>
            <Link
              href="/publications"
              className="font-sans text-sm text-accent underline-offset-2 hover:underline focus-ring rounded-input"
            >
              View All Books
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {featuredBooks.map((book) => (
              <Link
                key={book.title + book.subtitle}
                href={book.href}
                className="group flex flex-col rounded-card border border-border bg-surface p-5 transition-shadow hover:shadow-card focus-ring"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-input bg-accent/10 px-2 py-0.5 font-sans text-xs font-medium text-accent">
                    {book.tag}
                  </span>
                  <span className="font-sans text-xs text-ink-secondary">
                    {book.level}
                  </span>
                </div>
                <p className="font-serif text-base font-semibold text-ink group-hover:text-accent">
                  {book.title}
                </p>
                <p className="mt-1 font-sans text-sm text-ink-secondary">
                  {book.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools Preview ────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center font-serif text-2xl font-semibold text-ink">
            Simple Tools for Financial Stability
          </h2>
          <p className="mb-8 text-center font-sans text-sm text-ink-secondary">
            No account required. Works on any device.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {tools.map((tool) => (
              <div key={tool.href} className="flex flex-col rounded-card border border-border bg-background p-6">
                <tool.icon size={20} className="mb-3 text-accent" aria-hidden />
                <h3 className="mb-2 font-serif text-base font-semibold text-ink">
                  {tool.title}
                </h3>
                <p className="mb-5 flex-1 font-sans text-sm text-ink-secondary">
                  {tool.desc}
                </p>
                <Link
                  href={tool.href}
                  className="inline-flex h-10 items-center justify-center rounded-card border border-accent px-5 font-sans text-sm font-medium text-accent transition-colors hover:bg-accent/5 focus-ring"
                >
                  {tool.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Signal ─────────────────────────────────────────────────── */}
      <section className="border-t border-border px-4 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-ink">
            Designed for Real Life
          </h2>
          <ul className="space-y-3">
            {trustPoints.map((p) => (
              <li key={p} className="flex items-center justify-center gap-2 font-sans text-base text-ink-secondary">
                <CheckCircle size={16} className="shrink-0 text-accent" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-surface px-4 py-14 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-3 font-serif text-2xl font-semibold text-ink">
            Start Today
          </h2>
          <p className="mb-8 font-sans text-base text-ink-secondary">
            Reading is step one. Action builds stability.
          </p>
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
