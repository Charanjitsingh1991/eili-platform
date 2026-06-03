import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ANON_COOKIE = "eili_anon_session_id";

// Routes that bypass the onboarding redirect even for signed-in users
const ONBOARDING_BYPASS = [
  "/",
  "/privacy",
  "/terms",
  "/account/onboarding",
];
const ONBOARDING_BYPASS_PREFIXES = ["/auth/", "/_next/", "/api/"];

function shouldBypassOnboarding(pathname: string): boolean {
  if (ONBOARDING_BYPASS.includes(pathname)) return true;
  return ONBOARDING_BYPASS_PREFIXES.some((p) => pathname.startsWith(p));
}

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[],
        ) {
          cookiesToSet.forEach(
            ({ name, value }: { name: string; value: string }) =>
              request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(
            ({
              name,
              value,
              options,
            }: {
              name: string;
              value: string;
              options: CookieOptions;
            }) => supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Onboarding gate: signed-in user with no completed profile → redirect
    if (user && !shouldBypassOnboarding(request.nextUrl.pathname)) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed_at")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!profile?.onboarding_completed_at) {
        const onboardingUrl = request.nextUrl.clone();
        onboardingUrl.pathname = "/account/onboarding";
        return NextResponse.redirect(onboardingUrl);
      }
    }
  }

  if (!request.cookies.get(ANON_COOKIE)) {
    const anonId = crypto.randomUUID();
    supabaseResponse.cookies.set(ANON_COOKIE, anonId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 90,
      path: "/",
    });
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
