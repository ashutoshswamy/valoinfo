import Link from "next/link";
import Image from "next/image";
import type { GameMap } from "@/lib/types";

export default function MapCard({ map }: { map: GameMap }) {
  return (
    <Link href={`/maps/${map.uuid}`} className="group block glow-hover">
      <div className="cut-tr-lg relative overflow-hidden bg-valo-surface aspect-video">
        {/* Splash image */}
        <Image
          src={map.splash}
          alt={map.displayName}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-75 group-hover:brightness-90"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-valo-bg via-valo-bg/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 inset-x-0 p-5">
          {map.coordinates && (
            <p className="font-mono text-[10px] text-valo-red tracking-widest mb-1">
              {map.coordinates}
            </p>
          )}
          <h3 className="font-display font-900 text-3xl tracking-wide text-white leading-none">
            {map.displayName.toUpperCase()}
          </h3>
          {map.tacticalDescription && (
            <p className="text-xs text-valo-muted mt-1">{map.tacticalDescription}</p>
          )}
        </div>

        {/* Red corner accent */}
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[28px] border-b-[28px] border-l-transparent border-b-valo-red opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Bottom slide */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-valo-red w-0 group-hover:w-full transition-all duration-400" />
      </div>
    </Link>
  );
}
