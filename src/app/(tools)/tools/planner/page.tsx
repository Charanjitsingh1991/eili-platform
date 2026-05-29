import type { Metadata } from "next";
import { PlannerForm } from "@/modules/tools/ui/planner-form";

export const metadata: Metadata = {
  title: "Monthly Planner",
  description:
    "Organise your monthly income, essential expenses, other expenses, and savings. See your remaining balance instantly.",
};

export default function PlannerPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 font-serif text-3xl font-semibold text-ink">
            Monthly Planner
          </h1>
          <p className="font-sans text-base text-ink-secondary">
            Enter your monthly income, essentials, other expenses, and savings.
            See what remains — before the month begins.
          </p>
        </div>
      </section>

      {/* ── Tool ─────────────────────────────────────────────────────────── */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <PlannerForm />
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
