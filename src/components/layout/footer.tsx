import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/start-reading", label: "Start Reading" },
  { href: "/publications", label: "Publications" },
  { href: "/tools", label: "Tools & Planner" },
  { href: "/for-households", label: "For Households" },
  { href: "/about", label: "About" },
];

const actionLinks = [
  { href: "/start-reading", label: "Read Free Book" },
  { href: "/tools/planner", label: "Start Your Plan" },
  { href: "/tools/scorecard", label: "Check Your Score" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      {/* Main footer grid */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Desktop: 4 columns | Mobile: stacked */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Zone 1 — Identity */}
          <div className="md:col-span-1">
            <p className="mb-2 font-serif text-base font-semibold text-ink">
              Economic &amp; Industrial Literacy Institute (EILI)
            </p>
            <p className="mb-4 font-sans text-sm text-ink-secondary">
              Building practical literacy for real-world financial stability.
            </p>
            <p className="font-sans text-xs text-ink-secondary">
              Simple systems&nbsp;•&nbsp;Global access&nbsp;•&nbsp;Real-life application
            </p>
          </div>

          {/* Zone 2 — Navigation */}
          <div>
            <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-ink">
              Navigation
            </p>
            <ul className="space-y-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-ink-secondary transition-colors hover:text-ink focus-ring rounded-input"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zone 3 — Actions */}
          <div>
            <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-ink">
              Get Started
            </p>
            <ul className="space-y-2">
              {actionLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-ink-secondary transition-colors hover:text-ink focus-ring rounded-input"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zone 4 — Trust & Legal */}
          <div>
            <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-ink">
              Legal
            </p>
            <ul className="space-y-2">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-ink-secondary transition-colors hover:text-ink focus-ring rounded-input"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Zone 5 — Global Access Note */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center font-sans text-sm text-ink-secondary">
            Designed for global access:&nbsp;
            <span className="font-medium text-ink">Mobile-friendly</span>
            &nbsp;•&nbsp;
            <span className="font-medium text-ink">Low data usage</span>
            &nbsp;•&nbsp;
            <span className="font-medium text-ink">No physical delivery required</span>
          </p>
        </div>

        {/* Zone 6 — Copyright */}
        <div className="mt-4">
          <p className="text-center font-sans text-xs text-ink-secondary">
            © {new Date().getFullYear()} Economic &amp; Industrial Literacy Institute (EILI). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
