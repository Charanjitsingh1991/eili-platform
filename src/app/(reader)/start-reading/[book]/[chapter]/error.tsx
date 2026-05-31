"use client";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ChapterError({ error, reset }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="mb-4 font-serif text-2xl font-semibold text-ink">
        This chapter could not be loaded
      </h1>
      <p className="mb-2 font-sans text-sm text-ink-secondary">
        {error.message}
      </p>
      {error.digest && (
        <p className="mb-6 font-mono text-xs text-ink-secondary">
          Error ID: {error.digest}
        </p>
      )}
      <button
        onClick={reset}
        className="inline-flex h-10 items-center justify-center rounded-card bg-accent px-6 font-sans text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-ring"
      >
        Try again
      </button>
    </div>
  );
}
