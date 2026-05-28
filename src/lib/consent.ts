const CONSENT_KEY = "eili.consent";

export type ConsentState = {
  analytics: boolean;
  updatedAt: string;
};

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

export function setConsent(analytics: boolean): void {
  if (typeof window === "undefined") return;

  const state: ConsentState = {
    analytics,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
}

export function hasConsented(): boolean {
  const consent = getConsent();
  return consent?.analytics === true;
}
