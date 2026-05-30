"use client";

import { hasAnalyticsConsent } from "./consent";

let initialized = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _posthog: any = null;

export async function initAnalytics(): Promise<void> {
  if (typeof window === "undefined") return;
  if (initialized) return;
  if (!hasAnalyticsConsent()) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!key || !host) return;

  const { default: posthog } = await import("posthog-js");
  _posthog = posthog;

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
  if (!initialized || !hasAnalyticsConsent() || !_posthog) return;
  _posthog.capture(event, properties);
}

export function identifyUser(userId: string): void {
  if (!initialized || !hasAnalyticsConsent() || !_posthog) return;
  _posthog.identify(userId);
}

export function resetAnalytics(): void {
  if (!initialized || !_posthog) return;
  _posthog.reset();
}
