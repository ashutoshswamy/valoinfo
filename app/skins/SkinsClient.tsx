"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import SkinCard from "@/components/SkinCard";
import SearchBar from "@/components/SearchBar";
import type { WeaponSkin, ContentTier, Weapon } from "@/lib/types";
import { formatWeaponCategory } from "@/utils/format";

const TIER_ORDER = ["Exclusive", "Ultra", "Premium", "Deluxe", "Select"];

interface SkinsClientProps {
  skins: WeaponSkin[];
  tiers: ContentTier[];
  weapons: Weapon[];
}

export default function SkinsClient({ skins, tiers, weapons }: SkinsClientProps) {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [weaponFilter, setWeaponFilter] = useState("all");

  const tierMap = useMemo(
    () => Object.fromEntries(tiers.map((t) => [t.uuid, t])),
    [tiers]
  );

  const skinWeaponMap = useMemo(() => {
    const map: Record<string, { name: string; uuid: string; icon: string }> = {};
    for (const weapon of weapons) {
      for (const skin of weapon.skins) {
        map[skin.uuid] = { name: weapon.displayName, uuid: weapon.uuid, icon: weapon.displayIcon };
      }
    }
    return map;
  }, [weapons]);

  const weaponList = useMemo(
    () =>
      [...weapons]
        .map((w) => ({ uuid: w.uuid, name: w.displayName, category: formatWeaponCategory(w.category) }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [weapons]
  );

  const filtered = useMemo(
    () =>
      skins
        .filter((s) => s.displayName.toLowerCase().includes(search.toLowerCase()))
        .filter((s) => {
          if (tierFilter === "all") return true;
          const tier = s.contentTierUuid ? tierMap[s.contentTierUuid] : null;
          return tier?.devName === tierFilter;
        })
        .filter((s) => {
          if (weaponFilter === "all") return true;
          return skinWeaponMap[s.uuid]?.uuid === weaponFilter;
        }),
    [skins, search, tierFilter, weaponFilter, tierMap, skinWeaponMap]
  );

  const btn = (active: boolean) =>
    `flex-shrink-0 font-display font-700 text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 cut-tr-sm border transition-colors ${
      active
        ? "border-valo-red text-valo-red bg-valo-red/5"
        : "border-valo-border text-valo-muted hover:text-valo-text hover:border-valo-muted"
    }`;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="section-label mb-3">Cosmetics</p>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h1 className="font-display font-900 text-5xl md:text-6xl tracking-tight text-valo-text">SKINS</h1>
          <span className="font-mono text-xs text-valo-muted pb-2">{filtered.length} results</span>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <div className="w-full sm:max-w-xs">
            <SearchBar value={search} onChange={setSearch} placeholder="Search skins..." />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setTierFilter("all")} className={btn(tierFilter === "all")}>All Tiers</button>
            {TIER_ORDER.map((t) => (
              <button key={t} onClick={() => setTierFilter(t)} className={btn(tierFilter === t)}>{t}</button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          <button onClick={() => setWeaponFilter("all")} className={btn(weaponFilter === "all")}>All Weapons</button>
          {weaponList.map((w) => (
            <button key={w.uuid} onClick={() => setWeaponFilter(w.uuid)} className={btn(weaponFilter === w.uuid)}>
              {w.name}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-32 text-center">
          <p className="font-display font-800 text-xl text-valo-muted tracking-wide">NO SKINS FOUND</p>
          <p className="text-valo-muted/40 text-sm mt-2 font-mono">Try adjusting filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((skin) => (
            <Link key={skin.uuid} href={`/skins/${skin.uuid}`} className="block">
              <SkinCard
                skin={skin}
                contentTier={skin.contentTierUuid ? tierMap[skin.contentTierUuid] : undefined}
                weaponIcon={skinWeaponMap[skin.uuid]?.icon}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
