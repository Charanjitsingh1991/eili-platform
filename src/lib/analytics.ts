"use client";

import posthog from "posthog-js";
import { hasConsented } from "./consent";

let initialized = false;

export function initAnalytics(): void {
  if (typeof window === "undefined") return;
  if (initialized) return;
  if (!hasConsented()) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!key || !host) return;

  posthog.init(key, {
    api_host: host,
    capture_pageview: false,
    persistence: "localStorage+cookie",
  });

  initialized = true;
}

export function captureEvent(
  event: string,
  properties?: Record<string, unknown>,
): void {
  if (!initialized || !hasConsented()) return;
  posthog.capture(event, properties);
}

export function identifyUser(userId: string): void {
  if (!initialized || !hasConsented()) return;
  posthog.identify(userId);
}

export function resetAnalytics(): void {
  if (!initialized) return;
  posthog.reset();
}
