"use client";

import { useState, useTransition } from "react";
import { completeOnboarding } from "@/modules/identity/server/complete-onboarding";
import { AFRICAN_COUNTRIES, WORLD_COUNTRIES } from "./country-list";

export function OnboardingForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await completeOnboarding(formData);
      if (!result.ok) {
        setErrors(result.errors);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {errors["_form"] && (
        <p role="alert" className="rounded-card border border-scorecard-low/30 bg-scorecard-low/5 px-4 py-3 font-sans text-sm text-scorecard-low">
          {errors["_form"]}
        </p>
      )}

      {/* ── Name ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="display_name" className="font-sans text-sm font-medium text-ink">
          Name <span className="text-scorecard-low" aria-hidden>*</span>
        </label>
        <input
          id="display_name"
          name="display_name"
          type="text"
          autoComplete="name"
          required
          maxLength={80}
          placeholder="Your full name or preferred name"
          className="h-11 rounded-input border border-border bg-surface px-3 font-sans text-sm text-ink outline-none placeholder:text-ink-secondary/50 focus:border-accent focus:ring-1 focus:ring-accent"
          aria-describedby={errors["display_name"] ? "name-error" : undefined}
          aria-invalid={errors["display_name"] ? true : undefined}
        />
        {errors["display_name"] && (
          <p id="name-error" role="alert" className="font-sans text-xs text-scorecard-low">
            {errors["display_name"]}
          </p>
        )}
      </div>

      {/* ── Country ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="country_iso2" className="font-sans text-sm font-medium text-ink">
          Country <span className="text-scorecard-low" aria-hidden>*</span>
        </label>
        <select
          id="country_iso2"
          name="country_iso2"
          required
          defaultValue=""
          className="h-11 rounded-input border border-border bg-surface px-3 font-sans text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          aria-describedby={errors["country_iso2"] ? "country-error" : undefined}
          aria-invalid={errors["country_iso2"] ? true : undefined}
        >
          <option value="" disabled>Select your country</option>
          <optgroup label="Africa">
            {AFRICAN_COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </optgroup>
          <optgroup label="Rest of world">
            {WORLD_COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </optgroup>
        </select>
        {errors["country_iso2"] && (
          <p id="country-error" role="alert" className="font-sans text-xs text-scorecard-low">
            {errors["country_iso2"]}
          </p>
        )}
      </div>

      {/* ── Category ──────────────────────────────────────────────────────── */}
      <fieldset>
        <legend className="mb-2 font-sans text-sm font-medium text-ink">
          I am using EILI as a <span className="text-scorecard-low" aria-hidden>*</span>
        </legend>
        <div className="space-y-3">
          {[
            { value: "household", label: "Household", desc: "Managing day-to-day household finances" },
            { value: "student", label: "Student", desc: "Learning about money management" },
          ].map(({ value, label, desc }) => (
            <label
              key={value}
              className="flex cursor-pointer items-start gap-3 rounded-card border border-border bg-surface p-4 transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/5"
            >
              <input
                type="radio"
                name="category"
                value={value}
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
                aria-describedby={errors["category"] ? "category-error" : undefined}
              />
              <span>
                <span className="block font-sans text-sm font-medium text-ink">{label}</span>
                <span className="block font-sans text-xs text-ink-secondary">{desc}</span>
              </span>
            </label>
          ))}
        </div>
        {errors["category"] && (
          <p id="category-error" role="alert" className="mt-1 font-sans text-xs text-scorecard-low">
            {errors["category"]}
          </p>
        )}
      </fieldset>

      {/* ── Literacy Self-Assessment (optional) ───────────────────────────── */}
      <fieldset>
        <legend className="mb-1 font-sans text-sm font-medium text-ink">
          How would you describe your current experience with money management?
        </legend>
        <p className="mb-3 font-sans text-xs text-ink-secondary">Optional — helps us surface the most relevant content for you.</p>
        <div className="space-y-3">
          {[
            { value: "beginner", label: "Beginner", desc: "New to managing money — looking for a starting point" },
            { value: "intermediate", label: "Intermediate", desc: "Some experience, want more structure and clarity" },
            { value: "advanced", label: "Advanced", desc: "Confident with basics, want refinement and depth" },
          ].map(({ value, label, desc }) => (
            <label
              key={value}
              className="flex cursor-pointer items-start gap-3 rounded-card border border-border bg-surface p-4 transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/5"
            >
              <input
                type="radio"
                name="literacy_self_assessment"
                value={value}
                className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
              />
              <span>
                <span className="block font-sans text-sm font-medium text-ink">{label}</span>
                <span className="block font-sans text-xs text-ink-secondary">{desc}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* ── Submit ────────────────────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-12 w-full items-center justify-center rounded-card bg-accent font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving…" : "Continue to Your Account"}
      </button>
    </form>
  );
}
