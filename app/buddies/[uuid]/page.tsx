import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBuddy } from "@/lib/api";

export default async function BuddyPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;
  let buddy;
  try {
    buddy = await getBuddy(uuid);
    if (!buddy) notFound();
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/buddies"
          className="font-display font-700 text-xs tracking-widest uppercase text-valo-muted hover:text-valo-red transition-colors"
        >
          ← Buddies
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Icon */}
        <div className="flex items-center justify-center bg-valo-surface border border-valo-border cut-tr p-12">
          <Image
            src={buddy.displayIcon}
            alt={buddy.displayName}
            width={200}
            height={200}
            unoptimized
            className="object-contain drop-shadow-xl"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="section-label mb-3">Gun Charm</p>
          <h1 className="font-display font-900 text-4xl md:text-5xl tracking-tight text-valo-text mb-6">
            {buddy.displayName}
          </h1>

          {buddy.levels.length > 1 && (
            <div>
              <p className="font-display font-700 text-xs tracking-[0.2em] uppercase text-valo-red mb-3">
                Levels
              </p>
              <div className="flex flex-wrap gap-3">
                {buddy.levels.map((level) => (
                  <div
                    key={level.uuid}
                    className="cut-tr-sm border border-valo-border bg-valo-surface p-3 flex flex-col items-center gap-2 w-20"
                  >
                    <Image
                      src={level.displayIcon}
                      alt={level.displayName}
                      width={48}
                      height={48}
                      unoptimized
                      className="object-contain"
                    />
                    <span className="font-mono text-[9px] text-valo-muted text-center">
                      LV {level.charmLevel}
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
