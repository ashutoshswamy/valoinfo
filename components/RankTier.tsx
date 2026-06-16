import Image from "next/image";
import type { CompetitiveTier } from "@/lib/types";

export default function RankTier({ tier }: { tier: CompetitiveTier }) {
  const isRadiant = tier.tierName.toLowerCase() === "radiant";

  return (
    <div
      className={`group cut-tr-sm flex items-center gap-4 border p-4 transition-all hover:bg-valo-surface2 ${
        isRadiant
          ? "border-yellow-500/40 bg-yellow-500/5"
          : "border-valo-border bg-valo-surface"
      }`}
    >
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
        {tier.largeIcon ? (
          <Image
            src={tier.largeIcon}
            alt={tier.tierName}
            width={48}
            height={48}
            unoptimized
            className="object-contain group-hover:scale-110 transition-transform duration-200"
          />
        ) : (
          <div className="w-10 h-10 bg-valo-surface2 cut-tr-sm" />
        )}
      </div>

      <div className="min-w-0">
        <p
          className={`font-display font-900 text-base tracking-wide leading-tight ${
            isRadiant ? "text-yellow-400" : "text-valo-text"
          }`}
        >
          {tier.tierName.toUpperCase()}
        </p>
        {tier.divisionName && tier.divisionName !== tier.tierName && (
          <p className="font-mono text-[10px] text-valo-muted tracking-widest mt-0.5">
            {tier.divisionName}
          </p>
        )}
      </div>

      {/* Tier number */}
      <span className="ml-auto font-mono text-xs text-valo-muted/40">
        {String(tier.tier).padStart(2, "0")}
      </span>
    </div>
  );
}
