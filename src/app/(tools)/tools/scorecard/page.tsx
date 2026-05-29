import type { Metadata } from "next";
import { ScorecardForm } from "@/modules/tools/ui/scorecard-form";

export const metadata: Metadata = {
  title: "Stability Scorecard",
  description:
    "Rate yourself across five pillars of financial stability. Score out of 25. Know exactly where to focus.",
};

export default function ScorecardPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 font-serif text-3xl font-semibold text-ink">
            Stability Scorecard
          </h1>
          <p className="font-sans text-base text-ink-secondary">
            Rate yourself 0–5 on each of the five pillars. Your total out of
            25 shows where you stand and where to focus next.
          </p>
        </div>
      </section>

      {/* ── Tool ─────────────────────────────────────────────────────────── */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <ScorecardForm />
        </div>
      </section>

      {/* ── Disclaimer ───────────────────────────────────────────────────── */}
      <div className="border-t border-border px-4 py-6 text-center">
        <p className="font-sans text-xs text-ink-secondary">
          EILI provides structured financial literacy, not personalised financial advice.
        </p>
      </div>
    </>
  );
}
