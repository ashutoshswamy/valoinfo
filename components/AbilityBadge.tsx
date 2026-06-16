import Image from "next/image";
import type { Ability } from "@/lib/types";

const SLOT_META: Record<string, { key: string; color: string; bg: string }> = {
  Passive:  { key: "P", color: "#9ca3af", bg: "rgba(156,163,175,0.1)" },
  Basic:    { key: "Q", color: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
  Grenade:  { key: "E", color: "#34d399", bg: "rgba(52,211,153,0.1)" },
  Ultimate: { key: "X", color: "#ff4655", bg: "rgba(255,70,85,0.1)" },
};

export default function AbilityBadge({ ability }: { ability: Ability }) {
  const meta = SLOT_META[ability.slot] ?? { key: ability.slot[0], color: "#ece8e1", bg: "rgba(255,255,255,0.05)" };

  return (
    <div className="group cut-tr-sm border border-valo-border bg-valo-surface p-4 hover:border-valo-red/20 transition-colors">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center font-mono font-bold text-xs"
          style={{ background: meta.bg, color: meta.color, clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)" }}
        >
          {meta.key}
        </div>

        {ability.displayIcon && (
          <Image
            src={ability.displayIcon}
            alt={ability.displayName}
            width={22}
            height={22}
            unoptimized
            className="opacity-70"
          />
        )}

        <span className="font-display font-800 text-sm tracking-wide text-valo-text uppercase">
          {ability.displayName}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-valo-muted leading-relaxed">{ability.description}</p>
    </div>
  );
}
