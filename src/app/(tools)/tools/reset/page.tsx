import type { Metadata } from "next";
import { ResetForm } from "@/modules/tools/ui/reset-form";

export const metadata: Metadata = {
  title: "30-Day Reset",
  description:
    "Four weeks. One action per day. A structured system to reset your financial habits — starting now.",
};

export default function ResetPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 font-serif text-3xl font-semibold text-ink">
            30-Day Reset
          </h1>
          <p className="font-sans text-base text-ink-secondary">
            Four weeks of structured actions — Awareness, Control, Adjustment,
            Stabilization. Tick each task as you complete it. Progress saves
            automatically, resets each calendar month.
          </p>
        </div>
      </section>

      {/* ── Tool ─────────────────────────────────────────────────────────── */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <ResetForm />
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
