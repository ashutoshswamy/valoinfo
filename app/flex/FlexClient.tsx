"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import type { Flex } from "@/lib/types";

export default function FlexClient({ items }: { items: Flex[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => items.filter((i) => i.displayName.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="section-label mb-3">Cosmetics</p>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h1 className="font-display font-900 text-5xl md:text-6xl tracking-tight text-valo-text">FLEX</h1>
          <span className="font-mono text-xs text-valo-muted pb-2">{filtered.length} items</span>
        </div>
      </div>

      <div className="mb-8 w-full sm:max-w-sm">
        <SearchBar value={search} onChange={setSearch} placeholder="Search flex items..." />
      </div>

      {filtered.length === 0 ? (
        <div className="py-32 text-center">
          <p className="font-display font-800 text-xl text-valo-muted tracking-wide">NO RESULTS</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-valo-border">
          {filtered.map((item) => (
            <Link
              key={item.uuid}
              href={`/flex/${item.uuid}`}
              className="group relative bg-valo-bg hover:bg-valo-surface transition-colors overflow-hidden flex flex-col"
            >
              <div className="relative flex items-center justify-center p-8 aspect-square overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: "radial-gradient(ellipse at center, rgba(255,70,85,0.08) 0%, transparent 70%)"
                }} />
                <Image
                  src={item.displayIcon}
                  alt={item.displayName}
                  width={140}
                  height={140}
                  unoptimized
                  className="object-contain relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-xl"
                />
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[24px] border-b-[24px] border-l-transparent border-b-valo-red opacity-0 group-hover:opacity-80 transition-opacity duration-200" />
              </div>
              <div className="px-4 py-3 border-t border-valo-border flex-1 flex flex-col justify-center">
                <p className="font-display font-800 text-xs tracking-wide text-valo-text group-hover:text-white transition-colors leading-snug">
                  {item.displayName}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 bg-valo-red w-0 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
