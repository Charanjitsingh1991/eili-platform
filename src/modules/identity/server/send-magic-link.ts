"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const EmailSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export type MagicLinkResult =
  | { ok: true }
  | { ok: false; error: string };

export async function sendMagicLink(
  formData: FormData,
): Promise<MagicLinkResult> {
  const raw = { email: formData.get("email") };
  const parsed = EmailSchema.safeParse(raw);

  if (!parsed.success) {
    return { ok: false, error: parsed.error.errors[0]?.message ?? "Invalid email" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/auth/callback`,
    },
  });

  if (error) {
    return { ok: false, error: "Unable to send the link. Please try again." };
  }

  return { ok: true };
}
