"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/start-reading", label: "Start Reading" },
  { href: "/publications", label: "Publications" },
  { href: "/tools", label: "Tools & Planner" },
  { href: "/for-households", label: "For Households" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="font-serif text-lg font-semibold text-ink focus-ring rounded-input"
          onClick={() => setOpen(false)}
        >
          EILI
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-6">
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
        </nav>

        <div className="hidden md:block">
          <Link
            href="/start-reading"
            className="inline-flex h-10 items-center justify-center rounded-card bg-accent px-5 font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
          >
            Read Free Book
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-card text-ink focus-ring md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-border bg-surface md:hidden">
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col px-4 py-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block py-3 font-sans text-base text-ink-secondary transition-colors hover:text-ink focus-ring rounded-input"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="py-3">
                <Link
                  href="/start-reading"
                  className="inline-flex h-11 w-full items-center justify-center rounded-card bg-accent px-5 font-sans text-base font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
                  onClick={() => setOpen(false)}
                >
                  Read Free Book
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
