import { getCompetitiveTiers } from "@/lib/api";
import RankTier from "@/components/RankTier";

export default async function RanksPage() {
  const tierSets = await getCompetitiveTiers();
  const latest = tierSets[tierSets.length - 1];
  const tiers = latest.tiers.filter((t) => t.tierName !== "Unused" && t.largeIcon);

  const grouped = tiers.reduce<Record<string, typeof tiers>>((acc, t) => {
    const group = t.divisionName || "Other";
    acc[group] = acc[group] ?? [];
    acc[group].push(t);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <p className="section-label mb-3">Competitive</p>
        <h1 className="font-display font-900 text-5xl md:text-6xl tracking-tight text-valo-text">
          RANKS
        </h1>
      </div>

      <div className="space-y-10">
        {Object.entries(grouped).map(([division, divTiers]) => (
          <div key={division}>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="font-display font-900 text-xs tracking-[0.25em] uppercase text-valo-red">
                {division}
              </h2>
              <div className="flex-1 h-px bg-valo-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {divTiers.map((tier) => (
                <RankTier key={tier.tier} tier={tier} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
