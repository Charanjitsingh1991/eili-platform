import Link from "next/link";
import { BookOpen, PenLine, TrendingUp, Globe } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "About the Economic & Industrial Literacy Institute (EILI) — building practical financial literacy for real-world stability.",
};

const coreActions = [
  {
    icon: BookOpen,
    title: "Learn",
    desc: "Access structured financial literacy content designed for real-life application.",
  },
  {
    icon: PenLine,
    title: "Apply",
    desc: "Use practical tools to plan, score, and organise your financial situation.",
  },
  {
    icon: TrendingUp,
    title: "Improve",
    desc: "Track progress and build consistent habits over time with simple systems.",
  },
];

const approach = [
  {
    title: "Simple",
    desc: "No jargon. No assumptions. Content is structured for people who have never studied finance.",
  },
  {
    title: "Practical",
    desc: "Every concept connects directly to a real-life action — planning, scoring, or resetting.",
  },
  {
    title: "Structured",
    desc: "A clear path from foundational literacy to applied stability. One step at a time.",
  },
];

const audiences = [
  {
    title: "Individuals and Households",
    desc: "People managing a household budget, building savings, or trying to understand where their money goes each month.",
  },
  {
    title: "Students",
    desc: "Young people building foundational financial knowledge through a structured, age-appropriate curriculum.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 font-serif text-3xl font-semibold text-ink md:text-4xl">
            About the Economic &amp; Industrial Literacy Institute (EILI)
          </h1>
          <p className="font-sans text-base text-ink-secondary">
            EILI is a structured financial literacy resource built for households,
            students, and communities that need practical guidance — not theory.
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-ink">
            Mission &amp; Vision
          </h2>
          <div className="mb-6 rounded-card border-l-4 border-accent bg-surface px-6 py-5">
            <p className="font-sans text-base font-medium text-ink">
              To build economic and industrial literacy in households and
              communities by providing simple, structured, and accessible
              financial education that leads to real-world stability.
            </p>
          </div>
          <p className="font-sans text-base text-ink-secondary">
            The vision is a world in which every household — regardless of income
            level, geography, or educational background — has access to the
            practical knowledge needed to manage money with clarity and confidence.
          </p>
        </div>
      </section>

      {/* ── Why This Platform Exists ─────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-ink">
            Why This Platform Exists
          </h2>
          <p className="mb-4 font-sans text-base text-ink-secondary">
            Most financial advice is written for people who already have a stable
            financial foundation. It assumes access, vocabulary, and a level of
            existing knowledge that most households do not have.
          </p>
          <p className="font-sans text-base text-ink-secondary">
            EILI was built to fill that gap. The content here starts from the
            beginning — from understanding income and expenses, to building a
            simple plan, to tracking stability over time. No background required.
            No account needed to start.
          </p>
        </div>
      </section>

      {/* ── What This Platform Does ──────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-ink">
            What This Platform Does
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {coreActions.map((a) => (
              <div key={a.title} className="rounded-card border border-border bg-surface p-6">
                <a.icon size={20} className="mb-3 text-accent" aria-hidden />
                <h3 className="mb-2 font-serif text-base font-semibold text-ink">
                  {a.title}
                </h3>
                <p className="font-sans text-sm text-ink-secondary">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Approach ─────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-ink">
            The Approach
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {approach.map((a) => (
              <div key={a.title} className="rounded-card border border-border bg-background p-6">
                <h3 className="mb-2 font-serif text-base font-semibold text-ink">
                  {a.title}
                </h3>
                <p className="font-sans text-sm text-ink-secondary">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It Is For ────────────────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 font-serif text-2xl font-semibold text-ink">
            Who It Is For
          </h2>
          <div className="space-y-5">
            {audiences.map((a) => (
              <div key={a.title} className="rounded-card border border-border bg-surface p-6">
                <h3 className="mb-2 font-serif text-base font-semibold text-ink">
                  {a.title}
                </h3>
                <p className="font-sans text-sm text-ink-secondary">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global Access ────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-start gap-4">
            <Globe size={24} className="mt-1 shrink-0 text-accent" aria-hidden />
            <div>
              <h2 className="mb-3 font-serif text-2xl font-semibold text-ink">
                Global Access
              </h2>
              <p className="font-sans text-base text-ink-secondary">
                EILI is designed to work in regions with limited infrastructure.
                The platform is mobile-first, uses minimal data, and does not
                require a physical delivery or a high-speed internet connection.
                All core content is free and accessible without an account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Looking Ahead ────────────────────────────────────────────────── */}
      <section className="border-b border-border px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-ink">
            Looking Ahead
          </h2>
          <p className="font-sans text-base text-ink-secondary">
            The platform will continue to expand — more books, additional tools,
            and broader resources for households and students across different
            regions and contexts. The foundation being built today is designed
            to support that growth.
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
              Start Your Plan
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
