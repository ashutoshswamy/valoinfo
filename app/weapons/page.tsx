import { getWeapons } from "@/lib/api";
import WeaponCard from "@/components/WeaponCard";
import { formatWeaponCategory } from "@/utils/format";

export default async function WeaponsPage() {
  const weapons = await getWeapons();

  const grouped = weapons.reduce<Record<string, typeof weapons>>((acc, w) => {
    const cat = formatWeaponCategory(w.category);
    acc[cat] = acc[cat] ?? [];
    acc[cat].push(w);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <p className="section-label mb-3">Arsenal</p>
        <h1 className="font-display font-900 text-5xl md:text-6xl tracking-tight text-valo-text">
          WEAPONS
        </h1>
      </div>

      <div className="space-y-12">
        {Object.entries(grouped).map(([category, categoryWeapons]) => (
          <div key={category}>
            <div className="flex items-center gap-4 mb-5">
              <h2 className="font-display font-900 text-xs tracking-[0.25em] uppercase text-valo-red">
                {category}
              </h2>
              <div className="flex-1 h-px bg-valo-border" />
              <span className="font-mono text-xs text-valo-muted/40">
                {categoryWeapons.length}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {categoryWeapons.map((weapon) => (
                <WeaponCard key={weapon.uuid} weapon={weapon} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
