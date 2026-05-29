"use client";

import { useState, useTransition } from "react";
import { sendMagicLink } from "@/modules/identity/server/send-magic-link";

export function MagicLinkForm() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<
    { ok: true } | { ok: false; error: string } | null
  >(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await sendMagicLink(formData);
      setResult(res);
    });
  }

  if (result?.ok) {
    return (
      <div className="rounded-card border border-border bg-surface p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-accent"
            aria-hidden
          >
            <path
              d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="m22 6-10 7L2 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h2 className="mb-2 font-serif text-xl font-semibold text-ink">
          Check your email
        </h2>
        <p className="font-sans text-sm text-ink-secondary">
          We sent a sign-in link to{" "}
          <strong className="text-ink">{email}</strong>. Open it to continue —
          no password needed.
        </p>
        <p className="mt-4 font-sans text-xs text-ink-secondary">
          The link expires in 60 minutes. Check your spam folder if it does not
          arrive.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="font-sans text-sm font-medium text-ink"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-11 rounded-input border border-border bg-surface px-3 font-sans text-sm text-ink outline-none placeholder:text-ink-secondary/50 focus:border-accent focus:ring-1 focus:ring-accent"
          aria-describedby={
            result && !result.ok ? "email-error" : undefined
          }
          aria-invalid={result && !result.ok ? true : undefined}
        />
        {result && !result.ok && (
          <p
            id="email-error"
            role="alert"
            className="font-sans text-xs text-scorecard-low"
          >
            {result.error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending || !email}
        className="inline-flex h-11 w-full items-center justify-center rounded-card bg-accent font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Send Sign-in Link"}
      </button>

      <p className="text-center font-sans text-xs text-ink-secondary">
        No account is needed to read or use the tools. Sign in only to save
        your progress across devices.
      </p>
    </form>
  );
}
