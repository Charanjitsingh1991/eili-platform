/** Cookie name for consent — first-party, SameSite=Lax, 365-day expiry */
const COOKIE_NAME = "eili_consent";

export type ConsentChoice = "accepted" | "declined";

/** Read the consent cookie (client-side only). Returns null if not yet decided. */
export function getConsentCookie(): ConsentChoice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  const value = match.split("=")[1];
  if (value === "accepted" || value === "declined") return value;
  return null;
}

/** Write the consent cookie — 365-day, SameSite=Lax, Secure in production. */
export function setConsentCookie(choice: ConsentChoice): void {
  if (typeof document === "undefined") return;
  const maxAge = 365 * 24 * 60 * 60; // seconds
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${COOKIE_NAME}=${choice}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}

/** True only when the user has explicitly accepted analytics. */
export function hasAnalyticsConsent(): boolean {
  return getConsentCookie() === "accepted";
}
