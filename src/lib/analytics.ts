"use client";

// posthog-js is initialised only in AnalyticsInit (loaded with ssr:false).
// These stubs forward calls to window.posthog if it has been loaded.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ph(): any {
  return typeof window !== "undefined" ? (window as any).posthog : undefined;
}

export function initAnalytics(): void {
  // No-op — initialisation is handled by <AnalyticsInit /> (ssr:false)
}

export function captureEvent(
  event: string,
  properties?: Record<string, unknown>,
): void {
  ph()?.capture(event, properties);
}

export function identifyUser(userId: string): void {
  ph()?.identify(userId);
}

export function resetAnalytics(): void {
  ph()?.reset();
}
