"use client";

import { useEffect, useState, useCallback } from "react";
import { idbGet, idbPut } from "@/modules/tools/lib/idb";

interface ResetEntry {
  key: string;   // "w{week}:d{day}"
  done: boolean;
  updatedAt: string;
}

const STORE = "reset_progress";

const WEEKS = [
  {
    week: 1,
    label: "Awareness",
    tasks: [
      "Write down every source of income your household receives",
      "List all regular monthly expenses from memory",
      "Compare your list to your actual bank or mobile money records",
      "Note the three largest expenses you did not expect",
      "Calculate your total monthly income",
      "Calculate your total known monthly expenses",
      "Record the gap (income minus expenses) without judging it",
    ],
  },
  {
    week: 2,
    label: "Control",
    tasks: [
      "Separate your expenses into essential and non-essential",
      "Calculate your essential floor (minimum monthly cost)",
      "Identify one non-essential expense you can reduce this month",
      "Set a simple daily spending limit for discretionary items",
      "Track every expense today — write it down before spending",
      "Review yesterday's tracking — were there any surprises?",
      "Write a one-sentence plan for the rest of the month",
    ],
  },
  {
    week: 3,
    label: "Adjustment",
    tasks: [
      "Open the Monthly Planner and enter your current income and expenses",
      "Identify the single largest gap in your plan",
      "Find one action to close that gap (increase income or reduce expense)",
      "Set a savings target — even a small fixed amount counts",
      "Review your plan mid-week and note what is on track",
      "Adjust one line item based on what you have learned",
      "Calculate your updated remaining balance",
    ],
  },
  {
    week: 4,
    label: "Stabilization",
    tasks: [
      "Check your Stability Scorecard from the start of the Reset",
      "Re-score all five pillars based on the past 3 weeks",
      "Compare your before and after scores",
      "Write one habit you will continue next month",
      "Set a reminder to revisit your plan at the start of next month",
      "Share your plan with one other person in your household",
      "Mark this Reset complete — repeat next month",
    ],
  },
];

function makeKey(week: number, day: number): string {
  return `w${week}:d${day}`;
}

// Get the ISO week-year string to keep resets idempotent per calendar month
function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function ResetForm() {
  const [progress, setProgress] = useState<Map<string, boolean>>(new Map());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const monthKey = getCurrentMonthKey();
    idbGet<Record<string, boolean>>(STORE, monthKey)
      .then((stored) => {
        if (stored) {
          // stored is the whole map object keyed by task keys
          const entries = Object.entries(stored).filter(([k]) => k !== "key");
          setProgress(new Map(entries.map(([k, v]) => [k, v as boolean])));
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const toggle = useCallback((key: string) => {
    setProgress((prev) => {
      const next = new Map(prev);
      next.set(key, !prev.get(key));
      // Persist immediately — idempotent per month
      const monthKey = getCurrentMonthKey();
      const toStore: Record<string, unknown> = { key: monthKey };
      next.forEach((v, k) => { toStore[k] = v; });
      idbPut(STORE, toStore).catch(() => {});
      return next;
    });
  }, []);

  const totalTasks = WEEKS.reduce((acc, w) => acc + w.tasks.length, 0);
  const completedTasks = Array.from(progress.values()).filter(Boolean).length;
  const pct = Math.round((completedTasks / totalTasks) * 100);

  if (!loaded) {
    return <div className="py-8 text-center font-sans text-sm text-ink-secondary">Loading…</div>;
  }

  return (
    <div className="space-y-8">
      {/* ── Overall progress ─────────────────────────────────────────────── */}
      <div className="rounded-card border border-border bg-surface p-5">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-sans text-sm font-medium text-ink">
            Overall progress
          </span>
          <span className="font-sans text-sm font-semibold text-accent">
            {completedTasks} / {totalTasks} tasks
          </span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${pct}% complete`}
        >
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 font-sans text-xs text-ink-secondary">
          Progress resets each calendar month — actions are idempotent.
        </p>
      </div>

      {/* ── Weeks ────────────────────────────────────────────────────────── */}
      {WEEKS.map((w) => {
        const weekDone = w.tasks.filter((_, i) =>
          progress.get(makeKey(w.week, i + 1)),
        ).length;

        return (
          <div key={w.week} className="rounded-card border border-border bg-background">
            {/* Week header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <span className="font-sans text-xs font-semibold uppercase tracking-wide text-accent">
                  Week {w.week}
                </span>
                <p className="font-serif text-base font-semibold text-ink">
                  {w.label}
                </p>
              </div>
              <span className="font-sans text-xs text-ink-secondary">
                {weekDone}/{w.tasks.length}
              </span>
            </div>

            {/* Tasks */}
            <ul className="divide-y divide-border">
              {w.tasks.map((task, i) => {
                const key = makeKey(w.week, i + 1);
                const done = progress.get(key) ?? false;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => toggle(key)}
                      className="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-surface focus-ring"
                      aria-pressed={done}
                    >
                      {/* Checkbox visual */}
                      <span
                        className={[
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                          done
                            ? "border-accent bg-accent text-white"
                            : "border-border bg-background",
                        ].join(" ")}
                        aria-hidden
                      >
                        {done && (
                          <svg
                            viewBox="0 0 12 10"
                            fill="none"
                            className="h-3 w-3"
                          >
                            <path
                              d="M1 5l3.5 3.5L11 1"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      <span
                        className={[
                          "font-sans text-sm leading-relaxed",
                          done ? "text-ink-secondary line-through" : "text-ink",
                        ].join(" ")}
                      >
                        Day {i + 1} — {task}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      {/* ── Actions ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href="/api/download/reset"
          className="inline-flex h-11 flex-1 items-center justify-center rounded-card border border-border font-sans text-sm font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
        >
          Download Plan PDF
        </a>
      </div>

      <p className="text-center font-sans text-xs text-ink-secondary">
        EILI provides structured financial literacy, not personalised financial advice.
      </p>
    </div>
  );
}
