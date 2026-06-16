import { getMaps } from "@/lib/api";
import MapCard from "@/components/MapCard";

export default async function MapsPage() {
  const maps = await getMaps();
  const playable = maps.filter((m) => m.splash);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <p className="section-label mb-3">Battlegrounds</p>
        <h1 className="font-display font-900 text-5xl md:text-6xl tracking-tight text-valo-text">
          MAPS
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {playable.map((map) => (
          <MapCard key={map.uuid} map={map} />
        ))}
      </div>
    </div>
  );
}
