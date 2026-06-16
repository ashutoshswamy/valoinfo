import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSkin, getContentTiers } from "@/lib/api";

const TIER_STYLES: Record<string, { label: string; color: string; dot: string }> = {
  Select:    { label: "Select",    color: "text-zinc-400",    dot: "#9ca3af" },
  Deluxe:    { label: "Deluxe",    color: "text-emerald-400", dot: "#34d399" },
  Premium:   { label: "Premium",   color: "text-blue-400",    dot: "#60a5fa" },
  Ultra:     { label: "Ultra",     color: "text-yellow-400",  dot: "#facc15" },
  Exclusive: { label: "Exclusive", color: "text-valo-red",    dot: "#ff4655" },
};

export default async function SkinPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;
  let skin, tiers;
  try {
    [skin, tiers] = await Promise.all([getSkin(uuid), getContentTiers()]);
    if (!skin) notFound();
  } catch {
    notFound();
  }

  const tierMap = Object.fromEntries(tiers.map((t) => [t.uuid, t]));
  const contentTier = skin.contentTierUuid ? tierMap[skin.contentTierUuid] : null;
  const tier = contentTier ? TIER_STYLES[contentTier.devName] : null;

  const defaultChroma = skin.chromas[0];
  const mainImage = defaultChroma?.fullRender ?? skin.displayIcon;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/skins"
          className="font-display font-700 text-xs tracking-widest uppercase text-valo-muted hover:text-valo-red transition-colors"
        >
          ← Skins
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* Main image */}
        <div className="flex items-center justify-center bg-valo-surface border border-valo-border cut-tr p-10">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={skin.displayName}
              width={400}
              height={150}
              unoptimized
              className="object-contain drop-shadow-xl"
            />
          ) : (
            <div className="w-full h-32 bg-valo-surface2 flex items-center justify-center">
              <span className="text-valo-muted/40 font-mono text-sm">No image</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          {tier && (
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-2 h-2 rounded-full" style={{ background: tier.dot }} />
              <span className={`font-mono text-xs uppercase tracking-widest ${tier.color}`}>
                {tier.label}
              </span>
            </div>
          )}
          <p className="section-label mb-3">Weapon Skin</p>
          <h1 className="font-display font-900 text-4xl md:text-5xl tracking-tight text-valo-text mb-6">
            {skin.displayName}
          </h1>
          <p className="font-mono text-xs text-valo-muted/50 tracking-wider">
            {skin.chromas.length} chroma{skin.chromas.length !== 1 ? "s" : ""} · {skin.levels.length} level{skin.levels.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Chromas */}
      {skin.chromas.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-5">
            <h2 className="font-display font-900 text-xs tracking-[0.25em] uppercase text-valo-red">
              Chromas
            </h2>
            <div className="flex-1 h-px bg-valo-border" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skin.chromas.map((chroma) => (
              <div
                key={chroma.uuid}
                className="cut-tr-sm border border-valo-border bg-valo-surface p-4"
              >
                <div className="flex items-center justify-center h-20 mb-3">
                  {chroma.fullRender ? (
                    <Image
                      src={chroma.fullRender}
                      alt={chroma.displayName}
                      width={220}
                      height={80}
                      unoptimized
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-valo-surface2" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-display font-700 text-[10px] tracking-wide text-valo-muted truncate">
                    {chroma.displayName}
                  </p>
                  {chroma.swatch && (
                    <div
                      className="w-3 h-3 rounded-full border border-valo-border flex-shrink-0 ml-2"
                      style={{ backgroundImage: `url(${chroma.swatch})`, backgroundSize: "cover" }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Levels */}
      {skin.levels.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-5">
            <h2 className="font-display font-900 text-xs tracking-[0.25em] uppercase text-valo-red">
              Levels
            </h2>
            <div className="flex-1 h-px bg-valo-border" />
            <span className="font-mono text-xs text-valo-muted/40">{skin.levels.length}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skin.levels.map((level, i) => {
              const levelImg =
                level.displayIcon ??
                skin.displayIcon ??
                skin.chromas?.[0]?.fullRender ??
                skin.chromas?.[0]?.displayIcon ??
                null;
              return (
                <div
                  key={level.uuid}
                  className="cut-tr-sm border border-valo-border bg-valo-surface p-4"
                >
                  {/* Level number badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[9px] text-valo-muted/40 tracking-widest">
                      LVL {String(i + 1).padStart(2, "0")}
                    </span>
                    {level.levelItem && (
                      <span className="font-mono text-[9px] text-valo-red/70 tracking-wider truncate max-w-[80px]">
                        {level.levelItem.split("::")[1] ?? level.levelItem}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-center h-16 mb-3">
                    {levelImg ? (
                      <Image
                        src={levelImg}
                        alt={level.displayName || `Level ${i + 1}`}
                        width={180}
                        height={60}
                        unoptimized
                        className="object-contain opacity-80"
                      />
                    ) : (
                      <div className="w-full h-full bg-valo-surface2 flex items-center justify-center">
                        <span className="font-mono text-xs text-valo-muted/20">—</span>
                      </div>
                    )}
                  </div>

                  <p className="font-display font-700 text-[10px] tracking-wide text-valo-muted truncate">
                    {level.displayName || `Level ${i + 1}`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
