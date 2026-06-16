import Link from "next/link";
import Image from "next/image";
import type { Agent } from "@/lib/types";

export default function AgentCard({ agent }: { agent: Agent }) {
  const colors = agent.backgroundGradientColors ?? [];
  const grad =
    colors.length >= 2
      ? `linear-gradient(160deg, #${colors[0]} 0%, #${colors[1]} 60%, #${colors[2] ?? colors[0]} 100%)`
      : "linear-gradient(160deg, #1a1a2e 0%, #16213e 100%)";

  const portrait = agent.bustPortrait ?? agent.fullPortrait ?? agent.displayIconSmall;

  return (
    <Link href={`/agents/${agent.uuid}`} className="group block glow-hover">
      <div className="cut-tr relative overflow-hidden bg-valo-surface aspect-[3/4]">
        {/* Gradient background */}
        <div className="absolute inset-0 opacity-30" style={{ background: grad }} />
        <div className="absolute inset-0 bg-gradient-to-t from-valo-bg via-transparent to-transparent opacity-80" />

        {/* Portrait */}
        <div className="absolute inset-0 flex items-end justify-center">
          {portrait ? (
            <Image
              src={portrait}
              alt={agent.displayName}
              fill
              unoptimized
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <span className="text-7xl font-black text-white/20 mb-8">
              {agent.displayName[0]}
            </span>
          )}
        </div>

        {/* Role badge — top left */}
        {agent.role && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-valo-bg/70 backdrop-blur-sm px-2 py-1">
            {agent.role.displayIcon && (
              <Image
                src={agent.role.displayIcon}
                alt={agent.role.displayName}
                width={12}
                height={12}
                unoptimized
                className="opacity-70"
              />
            )}
            <span className="font-display font-700 text-[9px] tracking-[0.2em] uppercase text-valo-muted">
              {agent.role.displayName}
            </span>
          </div>
        )}

        {/* Name overlay — bottom */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-valo-bg to-transparent pt-8">
          <h3 className="font-display font-900 text-xl tracking-wide text-valo-text group-hover:text-white transition-colors leading-none">
            {agent.displayName.toUpperCase()}
          </h3>
        </div>

        {/* Red bottom accent */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-valo-red w-0 group-hover:w-full transition-all duration-300" />
      </div>
    </Link>
  );
}
