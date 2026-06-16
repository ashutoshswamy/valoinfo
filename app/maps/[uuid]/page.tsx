import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getMap, getMaps } from "@/lib/api";

export async function generateStaticParams() {
  const maps = await getMaps();
  return maps.map((m) => ({ uuid: m.uuid }));
}

export default async function MapPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  let map;
  try {
    map = await getMap(uuid);
  } catch {
    notFound();
  }
  if (!map) notFound();

  const calloutsBySuperRegion = (map.callouts ?? []).reduce<
    Record<string, string[]>
  >((acc, c) => {
    acc[c.superRegionName] = acc[c.superRegionName] ?? [];
    acc[c.superRegionName].push(c.regionName);
    return acc;
  }, {});

  return (
    <div>
      {/* Full-bleed hero */}
      <div className="relative h-[55vh] min-h-[320px] overflow-hidden">
        <Image
          src={map.splash}
          alt={map.displayName}
          fill
          unoptimized
          priority
          className="object-cover brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-valo-bg via-valo-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-valo-bg/60 to-transparent" />

        {/* Back */}
        <div className="absolute top-6 left-6">
          <Link
            href="/maps"
            className="inline-flex items-center gap-2 font-mono text-xs text-white/70 hover:text-valo-red transition-colors bg-valo-bg/50 backdrop-blur-sm px-3 py-1.5"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            ALL MAPS
          </Link>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-10 max-w-7xl mx-auto">
          {map.coordinates && (
            <p className="font-mono text-xs text-valo-red tracking-widest mb-2">
              {map.coordinates}
            </p>
          )}
          <h1
            className="font-display font-900 text-valo-text leading-none"
            style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
          >
            {map.displayName.toUpperCase()}
          </h1>
          {map.tacticalDescription && (
            <p className="mt-2 text-valo-muted text-sm max-w-lg">
              {map.tacticalDescription}
            </p>
          )}
        </div>
      </div>

      {/* Callouts */}
      {Object.keys(calloutsBySuperRegion).length > 0 && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <p className="section-label mb-8">Map Callouts</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.entries(calloutsBySuperRegion).map(([region, names]) => (
              <div
                key={region}
                className="cut-tr border border-valo-border bg-valo-surface p-4"
              >
                <h3 className="font-display font-800 text-sm tracking-wide text-valo-red uppercase mb-3">
                  {region}
                </h3>
                <ul className="space-y-1.5">
                  {names.map((name) => (
                    <li
                      key={name}
                      className="flex items-center gap-2.5 text-sm text-valo-muted"
                    >
                      <span className="w-1 h-1 rounded-full bg-valo-border flex-shrink-0" />
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
