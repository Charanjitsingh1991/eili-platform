"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  getConsentCookie,
  setConsentCookie,
  type ConsentChoice,
} from "@/lib/consent";
import { initAnalytics } from "@/lib/analytics";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Only show if no prior decision
    if (getConsentCookie() === null) {
      setVisible(true);
    }
  }, []);

  // Move focus to Accept button when banner appears (a11y)
  useEffect(() => {
    if (visible) {
      // Defer one frame so the element is painted
      const id = requestAnimationFrame(() => acceptRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [visible]);

  function handleChoice(choice: ConsentChoice) {
    setConsentCookie(choice);
    setVisible(false);
    if (choice === "accepted") {
      void initAnalytics();
    }
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      aria-describedby="consent-desc"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface shadow-lg"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Description */}
        <p
          id="consent-desc"
          className="font-sans text-sm text-ink-secondary"
        >
          We use analytics cookies (PostHog, EU region) to understand how the
          Platform is used.{" "}
          <strong className="text-ink">No tracking happens by default.</strong>{" "}
          See our{" "}
          <Link
            href="/privacy"
            className="text-accent underline hover:no-underline focus-ring rounded"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {/* Actions */}
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => handleChoice("declined")}
            className="inline-flex h-10 min-w-[6rem] items-center justify-center rounded-card border border-border px-4 font-sans text-sm font-medium text-ink transition-colors hover:bg-border/40 focus-ring"
          >
            Decline
          </button>
          <button
            ref={acceptRef}
            type="button"
            onClick={() => handleChoice("accepted")}
            className="inline-flex h-10 min-w-[6rem] items-center justify-center rounded-card bg-accent px-4 font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
