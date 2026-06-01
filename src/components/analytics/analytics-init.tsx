"use client";

import { useEffect } from "react";
import { hasAnalyticsConsent } from "@/lib/consent";

export function AnalyticsInit() {
  useEffect(() => {
    if (!hasAnalyticsConsent()) return;

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (!key || !host) return;

    import("posthog-js").then(({ default: posthog }) => {
      if (posthog.__loaded) return;
      posthog.init(key, {
        api_host: host,
        capture_pageview: false,
        persistence: "localStorage+cookie",
      });
    }).catch(() => {});
  }, []);

  return null;
}
