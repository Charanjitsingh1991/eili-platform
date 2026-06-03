import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "@/modules/identity/public";

export const metadata: Metadata = {
  title: "Complete Your Profile",
  description: "Tell us a little about yourself so we can surface the most relevant content.",
  robots: { index: false },
};

export default async function OnboardingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profile?.onboarding_completed_at) {
    redirect("/account");
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-14">
      <div className="mb-10">
        <h1 className="mb-2 font-serif text-2xl font-semibold text-ink">
          Complete Your Profile
        </h1>
        <p className="font-sans text-sm text-ink-secondary">
          This takes less than a minute. Your information is used only to
          personalise your reading experience — it is never sold or shared.
        </p>
      </div>

      <div className="rounded-card border border-border bg-surface p-6 sm:p-8">
        <OnboardingForm />
      </div>
    </section>
  );
}
