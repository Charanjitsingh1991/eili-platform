import type { Metadata } from "next";
import Link from "next/link";
import { MagicLinkForm } from "@/modules/identity/public";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in with a magic link to save your reading progress and tool results across devices.",
};

export default function LoginPage() {
  return (
    <section className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-serif text-2xl font-semibold text-ink">
            Sign In
          </h1>
          <p className="font-sans text-sm text-ink-secondary">
            Save your progress across devices. No password needed.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-card border border-border bg-surface p-8">
          <MagicLinkForm />
        </div>

        {/* No account needed reminder */}
        <p className="mt-6 text-center font-sans text-xs text-ink-secondary">
          Reading and all tools are available without an account.{" "}
          <Link
            href="/start-reading"
            className="text-accent hover:underline focus-ring rounded"
          >
            Start reading free
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
