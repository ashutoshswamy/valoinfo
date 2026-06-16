"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import type { PlayerCard } from "@/lib/types";

export default function PlayerCardsClient({ cards }: { cards: PlayerCard[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => cards.filter((c) => c.displayName.toLowerCase().includes(search.toLowerCase())),
    [cards, search]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="section-label mb-3">Identity</p>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h1 className="font-display font-900 text-5xl md:text-6xl tracking-tight text-valo-text">PLAYER CARDS</h1>
          <span className="font-mono text-xs text-valo-muted pb-2">{filtered.length} total</span>
        </div>
      </div>

      <div className="mb-8 w-full sm:max-w-sm">
        <SearchBar value={search} onChange={setSearch} placeholder="Search player cards..." />
      </div>

      {filtered.length === 0 ? (
        <div className="py-32 text-center">
          <p className="font-display font-800 text-xl text-valo-muted tracking-wide">NO CARDS FOUND</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map((card) => (
            <Link
              key={card.uuid}
              href={`/playercards/${card.uuid}`}
              className="group cut-tr border border-valo-border bg-valo-surface overflow-hidden hover:border-valo-red/40 transition-colors block"
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/1" }}>
                <Image
                  src={card.wideArt}
                  alt={card.displayName}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-75 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-valo-surface/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 h-0.5 bg-valo-red w-0 group-hover:w-full transition-all duration-300" />
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5">
                <div className="relative w-8 h-8 flex-shrink-0 border border-valo-border overflow-hidden">
                  <Image src={card.smallArt} alt="" fill unoptimized className="object-cover" />
                </div>
                <p className="font-display font-700 text-xs tracking-wide text-valo-muted group-hover:text-valo-text transition-colors truncate" title={card.displayName}>
                  {card.displayName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
