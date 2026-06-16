"use client";

import { useState } from "react";
import Image from "next/image";
import type { WeaponSkin, ContentTier } from "@/lib/types";

const TIER_STYLES: Record<string, { label: string; color: string; dot: string }> = {
  Select:    { label: "Select",    color: "text-zinc-400",    dot: "#9ca3af" },
  Deluxe:    { label: "Deluxe",    color: "text-emerald-400", dot: "#34d399" },
  Premium:   { label: "Premium",   color: "text-blue-400",    dot: "#60a5fa" },
  Ultra:     { label: "Ultra",     color: "text-yellow-400",  dot: "#facc15" },
  Exclusive: { label: "Exclusive", color: "text-valo-red",    dot: "#ff4655" },
};

function resolveSkinImage(skin: WeaponSkin, weaponIcon?: string | null): string | null {
  const candidates = [
    skin.displayIcon,
    skin.chromas?.[0]?.displayIcon,
    skin.chromas?.[0]?.fullRender,
    skin.levels?.[0]?.displayIcon,
    weaponIcon,
  ];
  return candidates.find((c) => c && c.trim() !== "") ?? null;
}

interface SkinCardProps {
  skin: WeaponSkin;
  contentTier?: ContentTier;
  weaponIcon?: string | null;
}

export default function SkinCard({ skin, contentTier, weaponIcon }: SkinCardProps) {
  const [imgError, setImgError] = useState(false);
  const tier = contentTier ? TIER_STYLES[contentTier.devName] : null;
  const icon = resolveSkinImage(skin, weaponIcon);
  const showImage = icon && !imgError;

  return (
    <div className="group cut-tr-sm bg-valo-surface border border-valo-border hover:border-valo-red/30 transition-colors p-3 cursor-pointer">
      {/* Tier dot */}
      {tier ? (
        <div className="flex items-center gap-1 mb-2">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: tier.dot }} />
          <span className={`font-mono text-[9px] uppercase tracking-widest ${tier.color}`}>
            {tier.label}
          </span>
        </div>
      ) : (
        <div className="h-5 mb-2" />
      )}

      {/* Image */}
      <div className="flex items-center justify-center h-14 mb-2">
        {showImage ? (
          <Image
            src={icon}
            alt={skin.displayName}
            width={140}
            height={52}
            unoptimized
            onError={() => setImgError(true)}
            className="object-contain group-hover:brightness-110 transition-all"
          />
        ) : (
          <div className="w-full h-full bg-valo-surface2 flex items-center justify-center">
            <span className="font-mono text-[9px] text-valo-muted/30 tracking-widest uppercase">
              Standard
            </span>
          </div>
        )}
      </div>

      <p
        className="font-display font-700 text-xs tracking-wide text-valo-text/80 truncate leading-tight"
        title={skin.displayName}
      >
        {skin.displayName}
      </p>
    </div>
  );
}
