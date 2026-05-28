import Link from "next/link";
import { BookOpen, BarChart2, RotateCcw, CheckCircle } from "lucide-react";

export const metadata = {
  title: "For Households",
  description:
    "Take control of your household finances with a simple, structured system. Read, plan, score, and improve — no experience needed.",
};

const realityChecks = [
  "Money runs out before the month ends",
  "You are not sure where it all goes",
  "Saving feels impossible right now",
  "Small expenses add up in ways you did not expect",
];

const steps = [
  {
    num: "01",
    title: "Read",
    desc: "Start with the free book. No background required. Designed for real households.",
    cta: "Read Free Book",
    href: "/start-reading",
  },
  {
    num: "02",
    title: "Plan",
    desc: "Record your monthly income, essentials, and other expenses. See what remains.",
    cta: "Open Planner",
    href: "/tools/planner",
  },
  {
    num: "03",
    title: "Score",
    desc: "Rate your stability across five pillars. Know exactly where to focus.",
    cta: "Check Score",
    href: "/tools/scorecard",
  },
  {
    num: "04",
    title: "Improve",
    desc: "Follow the 30-Day Reset. Small weekly actions that build lasting habits.",
    cta: "Start Reset",
    href: "/tools/reset",
  },
];

const outcomes = [
  { title: "Clarity", desc: "Know exactly where your money goes each month." },
  { title: "Control", desc: "Make deliberate decisions rather than reactive ones." },
  { title: "Stability", desc: "Build a pattern that holds even in difficult months." },
  { title: "Confidence", desc: "Handle money discussions without anxiety or avoidance." },
];

const tools = [
  { href: "/tools/planner", icon: BookOpen, title: "Monthly Planner", desc: "Organise income, essentials, other expenses, and savings in one simple view." },
  { href: "/tools/scorecard", icon: BarChart2, title: "Stability Scorecard", desc: "Score yourself across five pillars. Total out of 25." },
  { href: "/tools/reset", icon: RotateCcw, title: "30-Day Reset", desc: "Four weeks. One action per day. A system you can repeat." },
];

const situations = [
  { label: "No plan at all", desc: "Start with the free book and the Planner.", href: "/start-reading" },
  { label: "Some control, not enough", desc: "Use the Scorecard to find your gaps.", href: "/tools/scorecard" },
  { label: "Under financial pressure", desc: "Start with the 30-Day Reset for quick structure.", href: "/tools/reset" },
];

export default function ForHouseholdsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-14 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-4 font-serif text-3xl font-semibold text-ink md:text-4xl">
            Take Control of Your Household Finances
          </h1>
          <p className="mb-3 font-sans text-base text-ink-secondary">
            No experience needed&nbsp;•&nbsp;Start small&nbsp;•&nbsp;Improve step by step
          </p>
          <p className="mb-8 font-sans text-base text-ink-secondary">
            A simple, structured system built for real households — not for people
            who already have it figured out.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/start-reading"
              className="inline-flex h-12 items-center justify-center rounded-card bg-accent px-8 font-sans text-base font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
            >
              Start With the Free Book
            </Link>
            <Link
              href="/tools/planner"
              className="inline-flex h-12 items-center justify-center rounded-card border border-border bg-background px-8 font-sans text-base font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
            >
              Start Your Plan
            </Link>
          </div>
        </div>
      </section>

      {/* ── Reality Check ────────────────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-ink">
            If This Feels Familiar, You Are Not Alone
          </h2>
          <ul className="mb-6 space-y-3">
            {realityChecks.map((r) => (
              <li key={r} className="flex items-start gap-3 font-sans text-base text-ink-secondary">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {r}
              </li>
            ))}
          </ul>
          <p className="font-sans text-base text-ink-secondary">
            This is not a personal failure. It is a lack of simple, structured guidance.
            EILI provides that guidance — practical, free, and built for your situation.
          </p>
        </div>
      </section>

      {/* ── The Solution ─────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-ink">
            Start Here — Step by Step
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col rounded-card border border-border bg-background p-6">
                <span className="mb-2 font-sans text-xs font-semibold text-accent">{s.num}</span>
                <h3 className="mb-2 font-serif text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mb-5 flex-1 font-sans text-sm text-ink-secondary">{s.desc}</p>
                <Link
                  href={s.href}
                  className="inline-flex h-10 w-fit items-center justify-center rounded-card border border-accent px-4 font-sans text-sm font-medium text-accent transition-colors hover:bg-accent/5 focus-ring"
                >
                  {s.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Will Change ─────────────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-ink">
            What Will Change
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((o) => (
              <div key={o.title} className="rounded-card border border-border bg-surface p-5">
                <CheckCircle size={16} className="mb-3 text-accent" aria-hidden />
                <h3 className="mb-2 font-serif text-base font-semibold text-ink">{o.title}</h3>
                <p className="font-sans text-sm text-ink-secondary">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Simple Tools ─────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-ink">
            Simple Tools — No Experience Required
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {tools.map((t) => (
              <div key={t.href} className="flex flex-col rounded-card border border-border bg-background p-6">
                <t.icon size={20} className="mb-3 text-accent" aria-hidden />
                <h3 className="mb-2 font-serif text-base font-semibold text-ink">{t.title}</h3>
                <p className="mb-5 flex-1 font-sans text-sm text-ink-secondary">{t.desc}</p>
                <Link
                  href={t.href}
                  className="inline-flex h-10 w-fit items-center justify-center rounded-card bg-accent px-4 font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
                >
                  Open
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center font-sans text-xs text-ink-secondary">
            EILI provides structured financial literacy, not personalised financial advice.
          </p>
        </div>
      </section>

      {/* ── Start From Your Situation ────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 font-serif text-2xl font-semibold text-ink">
            Start From Your Situation
          </h2>
          <div className="space-y-4">
            {situations.map((s) => (
              <div key={s.label} className="flex items-center justify-between rounded-card border border-border bg-surface px-5 py-4">
                <div>
                  <p className="font-serif text-base font-semibold text-ink">{s.label}</p>
                  <p className="font-sans text-sm text-ink-secondary">{s.desc}</p>
                </div>
                <Link
                  href={s.href}
                  className="ml-4 shrink-0 inline-flex h-9 items-center justify-center rounded-card bg-accent px-4 font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
                >
                  Start
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accessibility ────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-sm text-ink-secondary">
            Works on mobile&nbsp;•&nbsp;Low data usage&nbsp;•&nbsp;Simple language&nbsp;•&nbsp;No complex tools required
          </p>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="px-4 py-14 text-center">
        <div className="mx-auto max-w-xl">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/start-reading"
              className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-card bg-accent px-6 font-sans text-base font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
            >
              Read Free Book
            </Link>
            <Link
              href="/tools/planner"
              className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-card border border-border bg-background px-6 font-sans text-base font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
            >
              Start Plan
            </Link>
            <Link
              href="/tools/scorecard"
              className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-card border border-border bg-background px-6 font-sans text-base font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
            >
              Check Score
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
