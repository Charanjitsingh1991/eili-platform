"use client";

import dynamic from "next/dynamic";

const AnalyticsInit = dynamic(
  () => import("./analytics-init").then((m) => m.AnalyticsInit),
  { ssr: false },
);

export function AnalyticsProvider() {
  return <AnalyticsInit />;
}
