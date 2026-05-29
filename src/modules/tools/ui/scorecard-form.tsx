"use client";

import { useEffect, useState, useCallback } from "react";
import { idbGet, idbPut } from "@/modules/tools/lib/idb";

interface ScorecardState {
  id: string;
  income_clarity: number;
  expense_control: number;
  savings: number;
  protection: number;
  discipline: number;
  updatedAt: string;
}

const STORE = "scorecard_draft";
const KEY = "current";

const EMPTY: ScorecardState = {
  id: KEY,
  income_clarity: 0,
  expense_control: 0,
  savings: 0,
  protection: 0,
  discipline: 0,
  updatedAt: "",
};

const PILLARS: { key: keyof ScorecardState; label: string; desc: string }[] = [
  {
    key: "income_clarity",
    label: "Income Clarity",
    desc: "Do you know your exact monthly income from all sources?",
  },
  {
    key: "expense_control",
    label: "Expense Control",
    desc: "Do you track where your money goes each month?",
  },
  {
    key: "savings",
    label: "Savings",
    desc: "Do you set aside a fixed amount each month, however small?",
  },
  {
    key: "protection",
    label: "Protection",
    desc: "Do you have a buffer or plan for unexpected expenses?",
  },
  {
    key: "discipline",
    label: "Discipline",
    desc: "Do you stick to your plan even when it is inconvenient?",
  },
];

function getBand(total: number): { label: string; color: string; desc: string } {
  if (total <= 10)
    return {
      label: "Low Stability",
      color: "text-scorecard-low",
      desc: "Focus on the basics: tracking income and covering essentials consistently.",
    };
  if (total <= 18)
    return {
      label: "Moderate Stability",
      color: "text-scorecard-moderate",
      desc: "A foundation exists. Target the pillars scored below 3 to move forward.",
    };
  return {
    label: "Strong Stability",
    color: "text-scorecard-strong",
    desc: "Your financial system is solid. Maintain consistency and review quarterly.",
  };
}

interface PillarRowProps {
  label: string;
  desc: string;
  pillarKey: string;
  value: number;
  onChange: (v: number) => void;
}

function PillarRow({ label, desc, pillarKey, value, onChange }: PillarRowProps) {
  return (
    <div className="rounded-card border border-border bg-surface p-5">
      <div className="mb-3">
        <p className="font-serif text-base font-semibold text-ink">{label}</p>
        <p className="mt-0.5 font-sans text-sm text-ink-secondary">{desc}</p>
      </div>
      <div className="flex items-center gap-2" role="group" aria-label={`${label} score`}>
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-pressed={value === n}
            className={[
              "h-10 w-10 shrink-0 rounded-card border font-sans text-sm font-medium transition-colors focus-ring",
              value === n
                ? "border-accent bg-accent text-white"
                : "border-border bg-background text-ink hover:border-accent/50 hover:bg-accent/5",
            ].join(" ")}
          >
            {n}
          </button>
        ))}
        <span className="ml-2 font-sans text-xs text-ink-secondary">/ 5</span>
      </div>
    </div>
  );
}

export function ScorecardForm() {
  const [state, setState] = useState<ScorecardState>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    idbGet<ScorecardState>(STORE, KEY)
      .then((s) => { if (s) setState(s); })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const update = useCallback((field: keyof ScorecardState) => (value: number) => {
    setState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(async () => {
    await idbPut(STORE, { ...state, id: KEY, updatedAt: new Date().toISOString() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [state]);

  const handleReset = useCallback(() => {
    setState(EMPTY);
    idbPut(STORE, { ...EMPTY, updatedAt: new Date().toISOString() }).catch(() => {});
  }, []);

  const total =
    (state.income_clarity as number) +
    (state.expense_control as number) +
    (state.savings as number) +
    (state.protection as number) +
    (state.discipline as number);

  const band = getBand(total);

  if (!loaded) {
    return <div className="py-8 text-center font-sans text-sm text-ink-secondary">Loading…</div>;
  }

  return (
    <div className="space-y-8">
      {/* ── Pillars ──────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        {PILLARS.map((p) => (
          <PillarRow
            key={p.key}
            pillarKey={p.key}
            label={p.label}
            desc={p.desc}
            value={state[p.key] as number}
            onChange={update(p.key)}
          />
        ))}
      </div>

      {/* ── Score Result ─────────────────────────────────────────────────── */}
      <div className="rounded-card border border-border bg-background p-6 sm:p-8">
        <div className="mb-4 flex items-baseline gap-3">
          <span className="font-serif text-4xl font-bold text-ink">{total}</span>
          <span className="font-sans text-base text-ink-secondary">/ 25</span>
          <span className={`ml-2 font-serif text-lg font-semibold ${band.color}`}>
            {band.label}
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="mb-4 h-2 w-full overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuenow={total}
          aria-valuemin={0}
          aria-valuemax={25}
          aria-label={`Score: ${total} out of 25`}
        >
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${(total / 25) * 100}%` }}
          />
        </div>

        <p className="font-sans text-sm text-ink-secondary">{band.desc}</p>

        {/* Band reference */}
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            { range: "0–10", label: "Low", color: "text-scorecard-low" },
            { range: "11–18", label: "Moderate", color: "text-scorecard-moderate" },
            { range: "19–25", label: "Strong", color: "text-scorecard-strong" },
          ].map((b) => (
            <div key={b.label} className="rounded-card border border-border bg-surface px-2 py-2">
              <p className="font-sans text-xs text-ink-secondary">{b.range}</p>
              <p className={`font-sans text-xs font-semibold ${b.color}`}>{b.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Actions ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex h-11 flex-1 items-center justify-center rounded-card bg-accent font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
        >
          {saved ? "Saved ✓" : "Save Score"}
        </button>
        <a
          href="/api/download/scorecard"
          className="inline-flex h-11 flex-1 items-center justify-center rounded-card border border-border font-sans text-sm font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
        >
          Download PDF
        </a>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex h-11 items-center justify-center rounded-card border border-border px-5 font-sans text-sm font-medium text-ink-secondary transition-colors hover:bg-border/30 focus-ring"
        >
          Reset
        </button>
      </div>

      <p className="text-center font-sans text-xs text-ink-secondary">
        Your score is saved in this browser. No account required.
      </p>
    </div>
  );
}
