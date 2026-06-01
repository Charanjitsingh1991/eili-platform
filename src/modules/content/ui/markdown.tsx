import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

// Configure marked for clean, accessible output
marked.setOptions({
  gfm: true,
  breaks: false,
});

/**
 * Parse and sanitize markdown → safe HTML string.
 * Server-safe: sanitize-html is CJS-compatible and does not require jsdom.
 * This is the ONLY place in the codebase that produces HTML for dangerouslySetInnerHTML.
 */
export function renderMarkdown(markdown: string): string {
  const raw = marked.parse(markdown) as string;
  return sanitizeHtml(raw, {
    allowedTags: [
      "h1","h2","h3","h4","h5","h6",
      "p","br","hr",
      "strong","em","s","code","pre","blockquote",
      "ul","ol","li",
      "table","thead","tbody","tr","th","td",
      "a",
    ],
    allowedAttributes: {
      a: ["href", "title", "rel", "target"],
    },
  });
}

interface MarkdownProps {
  content: string;
  /** "standard" = full prose styling; "lite" = plain text-only styling */
  mode?: "standard" | "lite";
  className?: string;
}

/**
 * SafeMarkdown — the single authorised component for rendering user-facing
 * body markdown. Never use dangerouslySetInnerHTML elsewhere.
 */
export function SafeMarkdown({
  content,
  mode = "standard",
  className,
}: MarkdownProps) {
  const html = renderMarkdown(content);

  const proseClass =
    mode === "standard"
      ? [
          "prose prose-ink max-w-none",
          "prose-headings:font-serif prose-headings:text-ink prose-headings:font-semibold",
          "prose-p:font-sans prose-p:text-ink-secondary prose-p:leading-relaxed",
          "prose-strong:text-ink prose-strong:font-semibold",
          "prose-a:text-accent prose-a:no-underline hover:prose-a:underline",
          "prose-blockquote:border-l-accent prose-blockquote:text-ink-secondary prose-blockquote:font-sans prose-blockquote:not-italic",
          "prose-code:text-ink prose-code:bg-surface prose-code:rounded prose-code:px-1 prose-code:text-sm prose-code:font-mono",
          "prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-card",
          "prose-table:font-sans prose-th:text-ink prose-td:text-ink-secondary",
          "prose-li:text-ink-secondary prose-li:font-sans",
          "prose-hr:border-border",
          className,
        ]
          .filter(Boolean)
          .join(" ")
      : [
          "prose prose-sm prose-ink max-w-none",
          "prose-headings:font-serif prose-headings:text-ink prose-headings:font-semibold",
          "prose-p:font-sans prose-p:text-ink-secondary",
          "prose-strong:text-ink",
          "prose-a:text-accent",
          "prose-blockquote:border-l-accent prose-blockquote:text-ink-secondary prose-blockquote:font-sans prose-blockquote:not-italic",
          "prose-li:text-ink-secondary prose-li:font-sans",
          className,
        ]
          .filter(Boolean)
          .join(" ");

  return (
    <div
      className={proseClass}
      // Safe: HTML is produced only by renderMarkdown() which sanitizes
      // via isomorphic-dompurify with a strict allowlist.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
