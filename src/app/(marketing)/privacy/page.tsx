import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the Economic & Industrial Literacy Institute collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 rounded-card border border-amber-300 bg-amber-50 px-4 py-3">
          <p className="font-sans text-xs font-medium text-amber-800">
            <strong>Subject to legal review.</strong> This draft policy is
            provided for transparency during development. It has not yet been
            reviewed by a qualified legal professional and does not constitute
            legal advice. A reviewed version will replace this notice before
            public launch.
          </p>
        </div>

        <h1 className="mb-2 font-serif text-3xl font-semibold text-ink">
          Privacy Policy
        </h1>
        <p className="mb-8 font-sans text-sm text-ink-secondary">
          Last updated: May 2026 (draft — subject to legal review)
        </p>

        <div className="prose-eili space-y-8 font-sans text-sm leading-relaxed text-ink">

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">1. Who we are</h2>
            <p>
              The Economic &amp; Industrial Literacy Institute (<strong>EILI</strong>) operates
              this website (&ldquo;the Platform&rdquo;) to provide free financial literacy
              resources. References to &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo; mean EILI.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">2. What we collect and why</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1 font-sans text-sm font-semibold text-ink">Account information (optional)</h3>
                <p>
                  If you choose to create an account, we collect your email address, name,
                  country, and category (Household / Student). This is used solely to
                  enable cross-device progress sync and to send you the magic link
                  sign-in email. We do not sell or share this data with third parties
                  for marketing purposes.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-sans text-sm font-semibold text-ink">Reading and tool progress (anonymous)</h3>
                <p>
                  Without an account, your reading progress and tool results (Planner,
                  Scorecard, 30-Day Reset) are stored only in your browser&rsquo;s IndexedDB.
                  This data never leaves your device until you sign in and choose to sync.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-sans text-sm font-semibold text-ink">Analytics (consent-gated)</h3>
                <p>
                  We use PostHog (EU region) to understand how the Platform is used.
                  Analytics are only enabled after you explicitly accept cookies via
                  the consent banner. If you decline, no analytics events are sent.
                  PostHog data is processed on servers located in the European Union.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-sans text-sm font-semibold text-ink">Server logs</h3>
                <p>
                  Our hosting provider (Vercel) automatically logs standard HTTP request
                  data (IP address, browser type, pages visited, timestamps). These logs
                  are retained for up to 30 days and are used only for security and
                  performance monitoring. We do not use these logs to build user profiles.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">3. Cookies and local storage</h2>
            <p className="mb-3">We use the following storage mechanisms:</p>
            <ul className="space-y-2 pl-4">
              <li>
                <strong>Authentication cookie</strong> — set by Supabase when you sign in.
                HTTP-only, SameSite=Lax, session-scoped. Required for the service to function.
              </li>
              <li>
                <strong>Consent cookie</strong> (<code>eili_consent</code>) — a first-party
                cookie that records your analytics preference. Expires after 365 days.
              </li>
              <li>
                <strong>IndexedDB</strong> — browser-side storage for your reading progress
                and tool data. Not a cookie; not transmitted to our servers without your
                explicit action (signing in).
              </li>
            </ul>
            <p className="mt-3">
              Analytics cookies (PostHog) are only set after you click &ldquo;Accept&rdquo; in the
              consent banner. The default state is no tracking.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">4. Your rights</h2>
            <p className="mb-3">
              Depending on your jurisdiction you may have the right to:
            </p>
            <ul className="space-y-1 pl-4">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your account and associated data</li>
              <li>Object to or withdraw consent for analytics at any time</li>
              <li>Data portability</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at the address in Section 7.
              We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">5. Data retention</h2>
            <p>
              Account data is retained for as long as your account is active. You may
              delete your account at any time, after which your data will be removed
              from our systems within 30 days. Anonymous IndexedDB data exists only in
              your browser and can be cleared by clearing your browser storage.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">6. Third-party processors</h2>
            <ul className="space-y-2 pl-4">
              <li><strong>Supabase</strong> — database and authentication (EU region)</li>
              <li><strong>Vercel</strong> — hosting and edge network</li>
              <li><strong>PostHog</strong> — product analytics (EU region, consent-gated)</li>
              <li><strong>Resend</strong> — transactional email (magic link delivery)</li>
            </ul>
            <p className="mt-3">
              We do not use advertising networks or sell data to data brokers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">7. Contact</h2>
            <p>
              For privacy-related queries, data requests, or to withdraw consent, contact
              us at: <strong>privacy@eili.org</strong> (placeholder — update before launch).
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">8. Changes to this policy</h2>
            <p>
              We will notify registered users by email of material changes to this policy.
              The &ldquo;last updated&rdquo; date at the top of this page will reflect the most
              recent revision.
            </p>
          </section>

        </div>
      </div>
    </section>
  );
}
