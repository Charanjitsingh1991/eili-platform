import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { getChapter } = await import("@/modules/content/public");
    const data = await getChapter("household-money-literacy", 1);
    return NextResponse.json({
      ok: true,
      hasData: !!data,
      title: data?.title ?? null,
      env: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 40) ?? "MISSING",
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20) ?? "MISSING",
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "MISSING",
      },
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
