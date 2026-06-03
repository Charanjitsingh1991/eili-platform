"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export const OnboardingSchema = z.object({
  display_name: z
    .string()
    .min(1, "Name is required")
    .max(80, "Name must be 80 characters or fewer")
    .trim(),
  country_iso2: z
    .string()
    .length(2, "Select a country")
    .regex(/^[A-Z]{2}$/, "Invalid country code"),
  category: z.enum(["household", "student"], {
    errorMap: () => ({ message: "Select a category" }),
  }),
  literacy_self_assessment: z
    .enum(["beginner", "intermediate", "advanced"])
    .optional()
    .nullable(),
});

export type OnboardingData = z.infer<typeof OnboardingSchema>;

export type OnboardingResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string> };

export async function completeOnboarding(
  formData: FormData,
): Promise<OnboardingResult> {
  const raw = {
    display_name: formData.get("display_name"),
    country_iso2: formData.get("country_iso2"),
    category: formData.get("category"),
    literacy_self_assessment: formData.get("literacy_self_assessment") || null,
  };

  const parsed = OnboardingSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key]) {
        errors[key] = issue.message;
      }
    }
    return { ok: false, errors };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, errors: { _form: "You must be signed in to continue." } };
  }

  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: user.id,
      display_name: parsed.data.display_name,
      country_iso2: parsed.data.country_iso2,
      category: parsed.data.category,
      literacy_self_assessment: parsed.data.literacy_self_assessment ?? null,
      onboarding_completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (error) {
    return { ok: false, errors: { _form: "Unable to save. Please try again." } };
  }

  redirect("/account");
}
