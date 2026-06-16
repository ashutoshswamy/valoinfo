import Link from "next/link";
import Image from "next/image";
import type { Weapon } from "@/lib/types";
import { formatWeaponCategory, formatPrice } from "@/utils/format";

export default function WeaponCard({ weapon }: { weapon: Weapon }) {
  return (
    <Link href={`/weapons/${weapon.uuid}`} className="group block glow-hover">
      <div className="cut-tr bg-valo-surface border border-valo-border p-4 group-hover:border-valo-red/30 transition-colors">
        {/* Weapon image */}
        <div className="relative flex items-center justify-center h-20 mb-4 overflow-hidden">
          {weapon.displayIcon ? (
            <Image
              src={weapon.displayIcon}
              alt={weapon.displayName}
              width={200}
              height={72}
              unoptimized
              className="object-contain drop-shadow-lg group-hover:brightness-110 transition-all duration-300"
            />
          ) : (
            <div className="w-full h-full bg-valo-surface2 flex items-center justify-center">
              <span className="text-valo-muted text-xs font-mono">—</span>
            </div>
          )}
          {/* Subtle underline glow */}
          <div className="absolute bottom-0 inset-x-4 h-px bg-valo-red/0 group-hover:bg-valo-red/20 transition-colors" />
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h3 className="font-display font-800 text-base tracking-wide text-valo-text group-hover:text-white transition-colors leading-tight">
            {weapon.displayName.toUpperCase()}
          </h3>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-valo-muted tracking-widest uppercase">
              {formatWeaponCategory(weapon.category)}
            </span>
            {weapon.shopData && (
              <span className="font-mono text-xs text-valo-red font-bold">
                {formatPrice(weapon.shopData.cost)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
