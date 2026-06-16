import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSpray } from "@/lib/api";

export default async function SprayPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;
  let spray;
  try {
    spray = await getSpray(uuid);
    if (!spray) notFound();
  } catch {
    notFound();
  }

  const mainIcon = spray.fullTransparentIcon ?? spray.fullIcon ?? spray.displayIcon;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/sprays"
          className="font-display font-700 text-xs tracking-widest uppercase text-valo-muted hover:text-valo-red transition-colors"
        >
          ← Sprays
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="flex items-center justify-center bg-valo-surface border border-valo-border cut-tr p-12">
          {mainIcon ? (
            <Image
              src={mainIcon}
              alt={spray.displayName}
              width={200}
              height={200}
              unoptimized
              className="object-contain drop-shadow-xl"
            />
          ) : (
            <div className="w-40 h-40 bg-valo-surface2 flex items-center justify-center">
              <span className="text-valo-muted/40 font-mono text-sm">No image</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="section-label mb-3">Spray</p>
          <h1 className="font-display font-900 text-4xl md:text-5xl tracking-tight text-valo-text mb-4">
            {spray.displayName}
          </h1>

          {spray.category && (
            <p className="font-mono text-xs text-valo-muted uppercase tracking-widest mb-6">
              {spray.category}
            </p>
          )}

          {spray.animationGif && (
            <div className="mt-4">
              <p className="font-display font-700 text-xs tracking-[0.2em] uppercase text-valo-red mb-3">
                Animated
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={spray.animationGif}
                alt={`${spray.displayName} animated`}
                className="w-32 h-32 object-contain"
              />
            </div>
          )}

          {spray.levels.length > 0 && (
            <div className="mt-6">
              <p className="font-display font-700 text-xs tracking-[0.2em] uppercase text-valo-red mb-3">
                Levels
              </p>
              <div className="flex flex-wrap gap-3">
                {spray.levels.map((level) => (
                  <div
                    key={level.uuid}
                    className="cut-tr-sm border border-valo-border bg-valo-surface p-3 flex flex-col items-center gap-2 w-20"
                  >
                    {level.displayIcon ? (
                      <Image
                        src={level.displayIcon}
                        alt={level.displayName}
                        width={48}
                        height={48}
                        unoptimized
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-valo-surface2" />
                    )}
                    <span className="font-mono text-[9px] text-valo-muted text-center">
                      LV {level.sprayLevel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
