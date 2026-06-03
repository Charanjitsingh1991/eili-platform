import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Account",
  description: "Manage your EILI account and reading progress.",
  robots: { index: false },
};

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, country_iso2, category, literacy_self_assessment, onboarding_completed_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile?.onboarding_completed_at) {
    redirect("/account/onboarding");
  }

  const categoryLabel =
    profile.category === "household" ? "Household" : "Student";

  const assessmentLabel: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="mb-8 font-serif text-2xl font-semibold text-ink">
        Your Account
      </h1>

      <div className="mb-8 rounded-card border border-border bg-surface p-6">
        <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-wider text-ink">
          Profile
        </h2>
        <dl className="space-y-3">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
            <dt className="w-40 shrink-0 font-sans text-sm text-ink-secondary">Name</dt>
            <dd className="font-sans text-sm text-ink">{profile.display_name}</dd>
          </div>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
            <dt className="w-40 shrink-0 font-sans text-sm text-ink-secondary">Country</dt>
            <dd className="font-sans text-sm text-ink">{profile.country_iso2}</dd>
          </div>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
            <dt className="w-40 shrink-0 font-sans text-sm text-ink-secondary">Category</dt>
            <dd className="font-sans text-sm text-ink">{categoryLabel}</dd>
          </div>
          {profile.literacy_self_assessment && (
            <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
              <dt className="w-40 shrink-0 font-sans text-sm text-ink-secondary">Experience level</dt>
              <dd className="font-sans text-sm text-ink">
                {assessmentLabel[profile.literacy_self_assessment] ?? profile.literacy_self_assessment}
              </dd>
            </div>
          )}
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
            <dt className="w-40 shrink-0 font-sans text-sm text-ink-secondary">Email</dt>
            <dd className="font-sans text-sm text-ink">{user.email}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/start-reading"
          className="inline-flex h-11 items-center justify-center rounded-card bg-accent px-6 font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
        >
          Continue Reading
        </Link>
        <Link
          href="/tools"
          className="inline-flex h-11 items-center justify-center rounded-card border border-border bg-background px-6 font-sans text-sm font-medium text-ink transition-colors hover:bg-border/30 focus-ring"
        >
          Open Tools
        </Link>
      </div>
    </section>
  );
}
