import { NextRequest, NextResponse } from "next/server";
import { getChapter } from "@/modules/content/public";
import { renderToBuffer } from "@react-pdf/renderer";
import { ChapterPdf } from "@/modules/reader/ui/chapter-pdf";

interface Params {
  params: Promise<{ book: string; chapter: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { book: bookSlug, chapter: chapterStr } = await params;
  const ordering = parseInt(chapterStr, 10);

  if (isNaN(ordering)) {
    return new NextResponse("Invalid chapter", { status: 400 });
  }

  const data = await getChapter(bookSlug, ordering);
  if (!data) {
    return new NextResponse("Not found", { status: 404 });
  }

  const buffer = await renderToBuffer(
    <ChapterPdf
      bookTitle={data.book.title}
      chapterOrdering={ordering}
      chapterTitle={data.title}
      bodyMarkdown={data.bodyMarkdown}
    />,
  );

  const filename = `eili-${bookSlug}-chapter-${ordering}.pdf`;

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
