"use client";

import { useState, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import type { PlayerTitle } from "@/lib/types";

export default function PlayerTitlesClient({ titles }: { titles: PlayerTitle[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      titles.filter(
        (t) =>
          t.titleText &&
          (t.titleText.toLowerCase().includes(search.toLowerCase()) ||
            t.displayName.toLowerCase().includes(search.toLowerCase()))
      ),
    [titles, search]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="section-label mb-3">Identity</p>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h1 className="font-display font-900 text-5xl md:text-6xl tracking-tight text-valo-text">TITLES</h1>
          <span className="font-mono text-xs text-valo-muted pb-2">{filtered.length} results</span>
        </div>
      </div>

      <div className="mb-8 w-full sm:max-w-sm">
        <SearchBar value={search} onChange={setSearch} placeholder="Search titles..." />
      </div>

      {filtered.length === 0 ? (
        <div className="py-32 text-center">
          <p className="font-display font-800 text-xl text-valo-muted tracking-wide">NO TITLES FOUND</p>
          <p className="font-mono text-xs text-valo-muted/40 mt-2">Try a different search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {filtered.map((title) => (
            <div
              key={title.uuid}
              className="group cut-tr-sm border border-valo-border bg-valo-surface hover:border-valo-red/30 transition-colors px-4 py-3"
            >
              <p className="font-display font-800 text-sm tracking-wide text-valo-text group-hover:text-white transition-colors leading-tight">
                {title.titleText}
              </p>
              <p className="font-mono text-[10px] text-valo-muted/40 mt-1 truncate" title={title.displayName}>
                {title.displayName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
