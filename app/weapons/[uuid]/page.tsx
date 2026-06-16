import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getWeapon, getWeapons } from "@/lib/api";
import { formatWeaponCategory, formatPrice } from "@/utils/format";

export async function generateStaticParams() {
  const weapons = await getWeapons();
  return weapons.map((w) => ({ uuid: w.uuid }));
}

export default async function WeaponPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  let weapon: Awaited<ReturnType<typeof getWeapon>>;
  try {
    const result = await getWeapon(uuid);
    if (!result) notFound();
    weapon = result;
  } catch {
    notFound();
  }
  weapon = weapon!;

  const stats = weapon.weaponStats;

  const coreStats = stats
    ? [
        { label: "Fire Rate",   value: `${stats.fireRate}/s` },
        { label: "Magazine",    value: String(stats.magazineSize) },
        { label: "Reload",      value: `${stats.reloadTimeSeconds}s` },
        { label: "Equip Time",  value: `${stats.equipTimeSeconds}s` },
        { label: "Run Speed",   value: `${(stats.runSpeedMultiplier * 100).toFixed(0)}%` },
        { label: "Wall Pen",    value: stats.wallPenetration.split("::")[1] ?? stats.wallPenetration },
        { label: "1st Bullet",  value: `${(stats.firstBulletAccuracy * 100).toFixed(0)}%` },
        ...(stats.shotgunPelletCount > 1
          ? [{ label: "Pellets", value: String(stats.shotgunPelletCount) }]
          : []),
      ]
    : [];

  // Pick image for each skin — fullRender > displayIcon > level icon > weapon icon
  function skinImage(skin: typeof weapon.skins[0]): string | null {
    return (
      skin.chromas?.[0]?.fullRender ??
      skin.displayIcon ??
      skin.chromas?.[0]?.displayIcon ??
      skin.levels?.[0]?.displayIcon ??
      weapon!.displayIcon ??
      null
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <Link
        href="/weapons"
        className="inline-flex items-center gap-2 font-mono text-xs text-valo-muted hover:text-valo-red transition-colors mb-10"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        ALL WEAPONS
      </Link>

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <span className="font-mono text-xs tracking-widest uppercase text-valo-red">
            {formatWeaponCategory(weapon.category)}
          </span>
          <h1 className="font-display font-900 text-5xl md:text-6xl tracking-tight text-valo-text mt-1 mb-4 leading-none">
            {weapon.displayName.toUpperCase()}
          </h1>

          {weapon.shopData && (
            <div className="inline-flex items-center gap-3 cut-tr-sm border border-valo-red/30 bg-valo-red/5 px-4 py-2 mb-8">
              <span className="font-mono font-bold text-valo-red text-sm">
                {formatPrice(weapon.shopData.cost)}
              </span>
              <span className="w-px h-3 bg-valo-border" />
              <span className="font-mono text-xs text-valo-muted">{weapon.shopData.categoryText}</span>
            </div>
          )}

          {/* Weapon image */}
          <div className="cut-tr-lg bg-valo-surface border border-valo-border flex items-center justify-center py-12 px-8">
            {weapon.displayIcon ? (
              <Image
                src={weapon.displayIcon}
                alt={weapon.displayName}
                width={380}
                height={140}
                unoptimized
                className="object-contain drop-shadow-2xl"
                priority
              />
            ) : (
              <span className="text-valo-muted/20 font-display font-900 text-4xl">—</span>
            )}
          </div>
        </div>

        {/* Stats column */}
        {stats ? (
          <div className="space-y-8">
            {/* Core stats grid */}
            <div>
              <p className="section-label mb-4">Weapon Stats</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-valo-border">
                {coreStats.map(({ label, value }) => (
                  <div key={label} className="bg-valo-surface px-4 py-3">
                    <p className="font-mono text-[10px] tracking-widest text-valo-muted uppercase mb-1">{label}</p>
                    <p className="font-mono font-bold text-valo-text text-base">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ADS stats */}
            {stats.adsStats && (
              <div>
                <p className="section-label mb-4">ADS Stats</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-valo-border">
                  {[
                    { label: "Zoom",     value: `${stats.adsStats.zoomMultiplier}x` },
                    { label: "Fire Rate", value: `${stats.adsStats.fireRate}/s` },
                    { label: "Run Speed", value: `${(stats.adsStats.runSpeedMultiplier * 100).toFixed(0)}%` },
                    { label: "1st Bullet", value: `${(stats.adsStats.firstBulletAccuracy * 100).toFixed(0)}%` },
                    ...(stats.adsStats.burstCount > 0
                      ? [{ label: "Burst", value: String(stats.adsStats.burstCount) }]
                      : []),
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-valo-surface px-4 py-3">
                      <p className="font-mono text-[10px] tracking-widest text-valo-muted uppercase mb-1">{label}</p>
                      <p className="font-mono font-bold text-valo-text text-base">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Damage ranges */}
            {stats.damageRanges.length > 0 && (
              <div>
                <p className="section-label mb-4">Damage Ranges</p>
                <div className="cut-tr border border-valo-border overflow-x-auto">
                  <table className="w-full min-w-[320px]">
                    <thead>
                      <tr className="bg-valo-surface2">
                        <th className="px-4 py-2.5 text-left font-mono text-[10px] tracking-widest uppercase text-valo-muted">Range</th>
                        <th className="px-4 py-2.5 text-right font-mono text-[10px] tracking-widest uppercase text-valo-red">Head</th>
                        <th className="px-4 py-2.5 text-right font-mono text-[10px] tracking-widest uppercase text-valo-muted">Body</th>
                        <th className="px-4 py-2.5 text-right font-mono text-[10px] tracking-widest uppercase text-valo-muted">Legs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.damageRanges.map((range, i) => (
                        <tr key={i} className="border-t border-valo-border hover:bg-valo-surface2 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-valo-muted">
                            {range.rangeStartMeters}–{range.rangeEndMeters}m
                          </td>
                          <td className="px-4 py-3 text-right font-mono font-bold text-valo-red text-sm">
                            {range.headDamage}
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-valo-text text-sm">
                            {range.bodyDamage}
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-valo-muted text-sm">
                            {range.legDamage}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 border border-valo-border bg-valo-surface cut-tr">
            <p className="font-mono text-xs text-valo-muted/40 tracking-widest uppercase">No stats available</p>
          </div>
        )}
      </div>

      {/* Skins */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <p className="section-label">Skins</p>
          <span className="font-mono text-xs text-valo-muted/40">{weapon.skins.length}</span>
          <div className="flex-1 h-px bg-valo-border" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {weapon.skins.map((skin) => {
            const icon = skinImage(skin);
            return (
              <div
                key={skin.uuid}
                className="group cut-tr-sm border border-valo-border bg-valo-surface hover:border-valo-red/30 transition-colors p-3"
              >
                <div className="flex items-center justify-center h-14 mb-2">
                  {icon ? (
                    <Image
                      src={icon}
                      alt={skin.displayName}
                      width={140}
                      height={52}
                      unoptimized
                      className="object-contain group-hover:brightness-110 transition-all"
                    />
                  ) : (
                    <div className="w-full h-full bg-valo-surface2 flex items-center justify-center">
                      <span className="text-valo-muted/20 text-xs font-mono">—</span>
                    </div>
                  )}
                </div>
                <p className="font-display font-700 text-[10px] tracking-wide text-valo-muted truncate" title={skin.displayName}>
                  {skin.displayName}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
