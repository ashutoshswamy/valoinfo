import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAgent, getAgents } from "@/lib/api";
import AbilityBadge from "@/components/AbilityBadge";

export async function generateStaticParams() {
  const agents = await getAgents();
  return agents.map((a) => ({ uuid: a.uuid }));
}

export default async function AgentPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  let agent;
  try {
    agent = await getAgent(uuid);
  } catch {
    notFound();
  }
  if (!agent) notFound();

  const colors = agent.backgroundGradientColors ?? [];
  const meshGrad =
    colors.length >= 2
      ? `radial-gradient(ellipse 70% 80% at 30% 50%, #${colors[0]}25 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 70% 40%, #${colors[1]}18 0%, transparent 50%)`
      : "radial-gradient(ellipse 60% 80% at 30% 50%, rgba(255,70,85,0.1) 0%, transparent 60%)";

  return (
    <div className="relative min-h-screen">
      {/* Background gradient mesh from agent colors */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: meshGrad }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Back link */}
        <Link
          href="/agents"
          className="inline-flex items-center gap-2 font-mono text-xs text-valo-muted hover:text-valo-red transition-colors mb-10"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ALL AGENTS
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-start">
          {/* Portrait column */}
          <div className="relative">
            {/* Role label behind portrait — hide on mobile to save space */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 font-display font-900 text-[8rem] leading-none tracking-tighter text-white/[0.04] select-none pointer-events-none hidden lg:block"
              style={{ writingMode: "vertical-rl" }}
            >
              {agent.role?.displayName?.toUpperCase() ?? ""}
            </div>

            <div className="relative flex justify-center lg:justify-start">
              {agent.fullPortrait ? (
                <Image
                  src={agent.fullPortrait}
                  alt={agent.displayName}
                  width={420}
                  height={630}
                  unoptimized
                  priority
                  className="object-contain drop-shadow-2xl relative z-10 max-h-[320px] sm:max-h-[420px] lg:max-h-[580px] w-auto"
                />
              ) : (
                <div className="w-64 h-96 bg-valo-surface cut-tr-lg flex items-center justify-center">
                  <span className="font-display font-900 text-8xl text-valo-muted/20">
                    {agent.displayName[0]}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info column */}
          <div className="space-y-8">
            {/* Role */}
            <div className="flex items-center gap-2.5">
              {agent.role?.displayIcon && (
                <Image
                  src={agent.role.displayIcon}
                  alt={agent.role.displayName}
                  width={18}
                  height={18}
                  unoptimized
                  className="opacity-50"
                />
              )}
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-valo-muted">
                {agent.role?.displayName}
              </span>
            </div>

            {/* Name */}
            <div>
              <h1
                className="font-display font-900 tracking-tight text-valo-text leading-none"
                style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
              >
                {agent.displayName.toUpperCase()}
              </h1>
              <div className="h-0.5 bg-valo-red w-16 mt-3" />
            </div>

            {/* Description */}
            <p className="text-valo-muted leading-relaxed text-[15px] max-w-lg">
              {agent.description}
            </p>

            {/* Abilities */}
            <div>
              <p className="section-label mb-5">Abilities</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {agent.abilities.map((ability) => (
                  <AbilityBadge key={ability.slot} ability={ability} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
