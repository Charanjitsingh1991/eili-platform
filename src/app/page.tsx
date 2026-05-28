import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="mb-4 font-serif text-3xl font-semibold text-ink md:text-4xl">
          Build Financial Stability with Simple Systems
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-ink-secondary">
          Read, plan, and track your money using simple tools designed for
          real-life use.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/start-reading"
            className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-card bg-accent px-8 font-sans text-base font-medium text-white transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Read Free Book
          </Link>
          <Link
            href="/tools/planner"
            className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-card border border-border bg-surface px-8 font-sans text-base font-medium text-ink transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Start Your Plan
          </Link>
        </div>
        <p className="mt-4 text-sm text-ink-secondary">
          Works on mobile · Low data usage · No account required
        </p>
      </section>
    </div>
  );
}
