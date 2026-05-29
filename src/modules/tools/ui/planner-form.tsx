"use client";

import { useEffect, useState, useCallback } from "react";
import { idbGet, idbPut } from "@/modules/tools/lib/idb";

interface PlannerState {
  id: string;
  income: string;
  essentials: string;
  other: string;
  savings: string;
  updatedAt: string;
}

const STORE = "planner_draft";
const KEY = "current";

const EMPTY: PlannerState = {
  id: KEY,
  income: "",
  essentials: "",
  other: "",
  savings: "",
  updatedAt: "",
};

function toNum(v: string): number {
  const n = parseFloat(v.replace(/,/g, ""));
  return isNaN(n) ? 0 : n;
}

function fmt(n: number): string {
  return n.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface RowProps {
  label: string;
  hint?: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
}

function AmountRow({ label, hint, id, value, onChange }: RowProps) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
      <label
        htmlFor={id}
        className="w-full font-sans text-sm font-medium text-ink sm:w-48 sm:shrink-0"
      >
        {label}
        {hint && (
          <span className="ml-1 font-sans text-xs font-normal text-ink-secondary">
            ({hint})
          </span>
        )}
      </label>
      <div className="flex flex-1 items-center rounded-input border border-border bg-surface px-3 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
        <span className="pr-2 font-sans text-sm text-ink-secondary" aria-hidden>
          $
        </span>
        <input
          id={id}
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.00"
          className="h-11 flex-1 bg-transparent font-sans text-sm text-ink outline-none placeholder:text-ink-secondary/50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
    </div>
  );
}

export function PlannerForm() {
  const [state, setState] = useState<PlannerState>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load from IndexedDB on mount
  useEffect(() => {
    idbGet<PlannerState>(STORE, KEY)
      .then((saved) => {
        if (saved) setState(saved);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const update = useCallback(
    (field: keyof PlannerState) => (value: string) => {
      setState((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleSave = useCallback(async () => {
    const toSave: PlannerState = { ...state, id: KEY, updatedAt: new Date().toISOString() };
    await idbPut(STORE, toSave);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [state]);

  const handleReset = useCallback(() => {
    setState(EMPTY);
    idbPut(STORE, { ...EMPTY, updatedAt: new Date().toISOString() }).catch(() => {});
  }, []);

  // Computed values
  const income = toNum(state.income);
  const essentials = toNum(state.essentials);
  const other = toNum(state.other);
  const savings = toNum(state.savings);
  const totalOut = essentials + other + savings;
  const remaining = income - totalOut;
  const remainingColor =
    remaining > 0 ? "text-scorecard-strong" : remaining < 0 ? "text-scorecard-low" : "text-ink";

  if (!loaded) {
    return (
      <div className="py-8 text-center font-sans text-sm text-ink-secondary">
        Loading…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ── Inputs ───────────────────────────────────────────────────────── */}
      <div className="rounded-card border border-border bg-surface p-6 sm:p-8">
        <h2 className="mb-6 font-serif text-xl font-semibold text-ink">
          Monthly Plan
        </h2>
        <div className="space-y-5">
          <AmountRow
            id="income"
            label="Monthly income"
            hint="after tax"
            value={state.income}
            onChange={update("income")}
          />
          <div className="border-t border-border pt-4">
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-wide text-ink-secondary">
              Expenses
            </p>
            <div className="space-y-4">
              <AmountRow
                id="essentials"
                label="Essential expenses"
                hint="rent, food, transport…"
                value={state.essentials}
                onChange={update("essentials")}
              />
              <AmountRow
                id="other"
                label="Other expenses"
                hint="non-essential"
                value={state.other}
                onChange={update("other")}
              />
            </div>
          </div>
          <div className="border-t border-border pt-4">
            <AmountRow
              id="savings"
              label="Savings"
              hint="optional"
              value={state.savings}
              onChange={update("savings")}
            />
          </div>
        </div>
      </div>

      {/* ── Results ──────────────────────────────────────────────────────── */}
      <div className="rounded-card border border-border bg-background p-6 sm:p-8">
        <h2 className="mb-5 font-serif text-xl font-semibold text-ink">
          Allocation View
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between font-sans text-sm">
            <span className="text-ink-secondary">Monthly income</span>
            <span className="font-medium text-ink">$ {fmt(income)}</span>
          </div>
          <div className="flex items-center justify-between font-sans text-sm">
            <span className="text-ink-secondary">Essential expenses</span>
            <span className="text-ink">− $ {fmt(essentials)}</span>
          </div>
          <div className="flex items-center justify-between font-sans text-sm">
            <span className="text-ink-secondary">Other expenses</span>
            <span className="text-ink">− $ {fmt(other)}</span>
          </div>
          <div className="flex items-center justify-between font-sans text-sm">
            <span className="text-ink-secondary">Savings</span>
            <span className="text-ink">− $ {fmt(savings)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3 font-sans">
            <span className="font-semibold text-ink">Remaining balance</span>
            <span className={`text-lg font-bold ${remainingColor}`}>
              $ {fmt(remaining)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Actions ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex h-11 flex-1 items-center justify-center rounded-card bg-accent font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
        >
          {saved ? "Saved ✓" : "Save Plan"}
        </button>
        <a
          href="/api/download/planner"
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
        Your plan is saved in this browser. No account required.
      </p>
    </div>
  );
}
