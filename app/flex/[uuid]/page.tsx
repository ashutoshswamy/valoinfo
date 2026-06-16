import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFlexItem } from "@/lib/api";

export default async function FlexDetailPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;
  let item;
  try {
    item = await getFlexItem(uuid);
    if (!item) notFound();
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/flex"
          className="font-display font-700 text-xs tracking-widest uppercase text-valo-muted hover:text-valo-red transition-colors"
        >
          ← Flex
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Icon display */}
        <div className="relative flex items-center justify-center border border-valo-border cut-tr overflow-hidden bg-valo-surface aspect-square">
          {/* Grid bg */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(255,70,85,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,70,85,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }} />
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at center, rgba(255,70,85,0.08) 0%, transparent 65%)"
          }} />
          <Image
            src={item.displayIcon}
            alt={item.displayName}
            width={280}
            height={280}
            unoptimized
            className="object-contain relative z-10 drop-shadow-2xl"
          />
        </div>

        {/* Info */}
        <div>
          <p className="section-label mb-4">Flex Item</p>
          <h1 className="font-display font-900 text-4xl md:text-5xl tracking-tight text-valo-text leading-tight mb-6">
            {item.displayNameAllCaps}
          </h1>
          <div className="h-0.5 w-12 bg-valo-red mb-6" />
          <p className="font-mono text-xs text-valo-muted/40 tracking-wider break-all">
            {item.uuid}
          </p>
        </div>
      </div>
    </div>
  );
}
