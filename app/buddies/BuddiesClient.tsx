"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import type { Buddy } from "@/lib/types";

export default function BuddiesClient({ buddies }: { buddies: Buddy[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => buddies.filter((b) => b.displayName.toLowerCase().includes(search.toLowerCase())),
    [buddies, search]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="section-label mb-3">Cosmetics</p>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h1 className="font-display font-900 text-5xl md:text-6xl tracking-tight text-valo-text">BUDDIES</h1>
          <span className="font-mono text-xs text-valo-muted pb-2">{filtered.length} total</span>
        </div>
      </div>

      <div className="mb-8 w-full sm:max-w-sm">
        <SearchBar value={search} onChange={setSearch} placeholder="Search buddies..." />
      </div>

      {filtered.length === 0 ? (
        <div className="py-32 text-center">
          <p className="font-display font-800 text-xl text-valo-muted tracking-wide">NO BUDDIES FOUND</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {filtered.map((buddy) => (
            <Link
              key={buddy.uuid}
              href={`/buddies/${buddy.uuid}`}
              className="group cut-tr-sm border border-valo-border bg-valo-surface hover:border-valo-red/25 transition-colors p-3 block"
            >
              <div className="flex items-center justify-center h-16 mb-2">
                <Image
                  src={buddy.displayIcon}
                  alt={buddy.displayName}
                  width={60}
                  height={60}
                  unoptimized
                  className="object-contain group-hover:scale-110 group-hover:drop-shadow-lg transition-all duration-200"
                />
              </div>
              <p className="font-display font-700 text-[10px] tracking-wide text-valo-muted text-center truncate leading-tight" title={buddy.displayName}>
                {buddy.displayName}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
