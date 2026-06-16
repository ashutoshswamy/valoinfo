import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlayerCard } from "@/lib/api";

export default async function PlayerCardPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;
  let card;
  try {
    card = await getPlayerCard(uuid);
    if (!card) notFound();
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/playercards"
          className="font-display font-700 text-xs tracking-widest uppercase text-valo-muted hover:text-valo-red transition-colors"
        >
          ← Player Cards
        </Link>
      </div>

      <p className="section-label mb-3">Identity</p>
      <h1 className="font-display font-900 text-4xl md:text-5xl tracking-tight text-valo-text mb-10">
        {card.displayName}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Art — tall portrait */}
        {card.largeArt && (
          <div className="md:row-span-2">
            <p className="font-display font-700 text-xs tracking-[0.2em] uppercase text-valo-red mb-3">
              Large Art
            </p>
            <div className="relative w-full border border-valo-border cut-tr overflow-hidden" style={{ aspectRatio: "9/16" }}>
              <Image
                src={card.largeArt}
                alt={`${card.displayName} large`}
                fill
                unoptimized
                className="object-contain object-top bg-valo-surface"
              />
            </div>
          </div>
        )}

        {/* Wide Art */}
        <div className={card.largeArt ? "md:col-span-2" : "md:col-span-3"}>
          <p className="font-display font-700 text-xs tracking-[0.2em] uppercase text-valo-red mb-3">
            Wide Art
          </p>
          <div className="relative w-full border border-valo-border cut-tr overflow-hidden" style={{ aspectRatio: "4/1" }}>
            <Image
              src={card.wideArt}
              alt={`${card.displayName} wide`}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>

        {/* Icon */}
        <div className={card.largeArt ? "md:col-span-2" : "md:col-span-3"}>
          <p className="font-display font-700 text-xs tracking-[0.2em] uppercase text-valo-red mb-3">
            Icon
          </p>
          <div className="relative aspect-square w-32 border border-valo-border cut-tr overflow-hidden">
            <Image
              src={card.displayIcon}
              alt={`${card.displayName} icon`}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
