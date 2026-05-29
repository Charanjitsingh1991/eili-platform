import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing your use of the EILI platform and its resources.",
};

export default function TermsPage() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 rounded-card border border-amber-300 bg-amber-50 px-4 py-3">
          <p className="font-sans text-xs font-medium text-amber-800">
            <strong>Subject to legal review.</strong> This draft is provided for
            transparency during development. It has not been reviewed by a
            qualified legal professional and does not constitute legal advice.
            A reviewed version will replace this notice before public launch.
          </p>
        </div>

        <h1 className="mb-2 font-serif text-3xl font-semibold text-ink">
          Terms of Use
        </h1>
        <p className="mb-8 font-sans text-sm text-ink-secondary">
          Last updated: May 2026 (draft — subject to legal review)
        </p>

        <div className="space-y-8 font-sans text-sm leading-relaxed text-ink">

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">1. Acceptance</h2>
            <p>
              By accessing or using this Platform you agree to be bound by these Terms.
              If you do not agree, please do not use the Platform. Use of the Platform
              is governed by these Terms and our{" "}
              <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">2. Nature of the service</h2>
            <p className="mb-3">
              EILI provides structured financial literacy content and planning tools.
              The Platform is educational in nature. It does <strong>not</strong>:
            </p>
            <ul className="space-y-1 pl-4">
              <li>Provide personalised financial advice</li>
              <li>Constitute financial, legal, tax, or investment advice</li>
              <li>Create any advisory relationship between EILI and the user</li>
            </ul>
            <p className="mt-3">
              Always seek qualified professional advice before making financial decisions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">3. Permitted use</h2>
            <p className="mb-3">You may:</p>
            <ul className="space-y-1 pl-4">
              <li>Read, download (where permitted), and share individual chapters for personal, non-commercial use</li>
              <li>Use the planning tools for your own household budgeting</li>
              <li>Cite this content in academic or educational contexts, with attribution</li>
            </ul>
            <p className="mt-3 mb-3">You may not:</p>
            <ul className="space-y-1 pl-4">
              <li>Reproduce or redistribute the full text of any publication for commercial purposes without written permission</li>
              <li>Scrape, crawl, or systematically download content beyond normal browsing</li>
              <li>Use the Platform in any way that violates applicable law</li>
              <li>Attempt to reverse-engineer, modify, or interfere with the Platform</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">4. Accounts</h2>
            <p>
              Accounts are optional. If you create an account, you are responsible for
              maintaining the security of your access credentials and for all activity
              under your account. Notify us immediately of any unauthorised use.
              We reserve the right to suspend accounts that violate these Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">5. Intellectual property</h2>
            <p>
              All content on this Platform — including text, tools, and design — is the
              property of the Economic &amp; Industrial Literacy Institute or its licensors
              and is protected by applicable intellectual property law. The EILI name and
              mark may not be used without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">6. Disclaimer of warranties</h2>
            <p>
              The Platform and its content are provided &ldquo;as is&rdquo; without warranty of
              any kind, express or implied. EILI does not warrant that the Platform will
              be uninterrupted, error-free, or free of harmful components. Financial
              figures used in examples are illustrative only.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">7. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by applicable law, EILI shall not be
              liable for any indirect, incidental, or consequential damages arising from
              your use of or inability to use the Platform, including any financial
              decisions made in reliance on content provided here.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">8. Changes to these terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the Platform
              after changes are posted constitutes acceptance of the revised Terms.
              Registered users will be notified by email of material changes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">9. Governing law</h2>
            <p>
              These Terms are governed by and construed in accordance with applicable law
              (jurisdiction to be confirmed following legal review before public launch).
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">10. Contact</h2>
            <p>
              Questions about these Terms:{" "}
              <strong>legal@eili.org</strong> (placeholder — update before launch).
            </p>
          </section>

        </div>
      </div>
    </section>
  );
}
