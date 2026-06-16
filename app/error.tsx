"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-valo-red/60 mb-6">
        Error · Something went wrong
      </span>
      <h1 className="font-display font-900 text-6xl md:text-8xl tracking-tight text-valo-text leading-none mb-4">
        OOPS
      </h1>
      <div className="h-0.5 w-16 bg-valo-red mx-auto mb-6" />
      <p className="font-mono text-sm text-valo-muted max-w-sm leading-relaxed mb-10">
        Failed to load data. The Valorant API may be temporarily unavailable.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-valo-red px-6 py-2.5 font-display font-800 text-xs tracking-[0.15em] uppercase text-white cut-tr-sm hover:bg-red-500 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-valo-border px-6 py-2.5 font-display font-800 text-xs tracking-[0.15em] uppercase text-valo-muted cut-tr-sm hover:border-valo-muted hover:text-valo-text transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
