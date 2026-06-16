import Link from "next/link";
import Image from "next/image";
import { getAgents, getWeapons } from "@/lib/api";

const SECTIONS = [
  { href: "/agents",      label: "Agents",       sub: "Duelists · Initiators · Controllers · Sentinels", num: "25+" },
  { href: "/weapons",     label: "Weapons",      sub: "Stats, damage tables, every skin",                num: "17"  },
  { href: "/maps",        label: "Maps",         sub: "Callouts and tactical layouts",                   num: "12+" },
  { href: "/skins",       label: "Skins",        sub: "Every weapon cosmetic ever released",             num: "600+"},
  { href: "/sprays",      label: "Sprays",       sub: "All sprays and animated variants",               num: "200+"},
  { href: "/playercards", label: "Player Cards", sub: "Wide and large art for every card",              num: "400+"},
  { href: "/buddies",     label: "Buddies",      sub: "Gun charms and buddy levels",                    num: "300+"},
  { href: "/playertitles", label: "Player Titles", sub: "In-game title text for your nameplate", num: "393+" },
  { href: "/flex",         label: "Flex",          sub: "Equippable flex cosmetic items",         num: "20"   },
  { href: "/ranks",        label: "Ranks",         sub: "Current competitive tier icons",         num: "25"   },
];

export default async function Home() {
  const [agents, weapons] = await Promise.all([getAgents(), getWeapons()]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden border-b border-valo-border">

        {/* Grid background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,70,85,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,70,85,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Diagonal slash accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute" style={{
            top: "-20%", right: "12%", width: 2, height: "140%",
            background: "linear-gradient(to bottom, transparent, rgba(255,70,85,0.15) 30%, rgba(255,70,85,0.15) 70%, transparent)",
            transform: "rotate(15deg)",
          }} />
          <div className="absolute" style={{
            top: "-20%", right: "22%", width: 1, height: "140%",
            background: "linear-gradient(to bottom, transparent, rgba(255,70,85,0.07) 30%, rgba(255,70,85,0.07) 70%, transparent)",
            transform: "rotate(15deg)",
          }} />
          <div className="absolute" style={{
            top: "-20%", right: "6%", width: 1, height: "140%",
            background: "linear-gradient(to bottom, transparent, rgba(255,70,85,0.05) 30%, rgba(255,70,85,0.05) 70%, transparent)",
            transform: "rotate(15deg)",
          }} />
        </div>

        {/* Crosshair — top right decorative */}
        <div className="absolute top-12 right-12 pointer-events-none hidden md:block opacity-20">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="20" stroke="#ff4655" strokeWidth="1" />
            <circle cx="32" cy="32" r="2" fill="#ff4655" />
            <line x1="32" y1="4" x2="32" y2="20" stroke="#ff4655" strokeWidth="1" />
            <line x1="32" y1="44" x2="32" y2="60" stroke="#ff4655" strokeWidth="1" />
            <line x1="4" y1="32" x2="20" y2="32" stroke="#ff4655" strokeWidth="1" />
            <line x1="44" y1="32" x2="60" y2="32" stroke="#ff4655" strokeWidth="1" />
          </svg>
        </div>

        {/* Corner bracket — bottom right */}
        <div className="absolute bottom-16 right-16 pointer-events-none hidden lg:block opacity-15">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M48 0 L48 48 L0 48" stroke="#ff4655" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Corner bracket — top left */}
        <div className="absolute top-16 left-8 pointer-events-none hidden lg:block opacity-15">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M0 48 L0 0 L48 0" stroke="#ff4655" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Ambient red glow */}
        <div className="absolute bottom-0 left-0 w-[700px] h-[500px] pointer-events-none" style={{
          background: "radial-gradient(ellipse at 10% 100%, rgba(255,70,85,0.10) 0%, transparent 65%)"
        }} />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none" style={{
          background: "radial-gradient(ellipse at 90% 0%, rgba(255,70,85,0.06) 0%, transparent 60%)"
        }} />

        {/* Content */}
        <div className="relative z-20 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-20">

          {/* Status line */}
          <div className="flex items-center gap-3 mb-10 fade-up" style={{ animationDelay: "0ms" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-valo-red animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-valo-muted/60">
              Valorant Encyclopedia · Live Data
            </span>
          </div>

          <h1
            className="font-display font-black leading-[0.85] tracking-tight fade-up"
            style={{ fontSize: "clamp(5rem, 14vw, 10.5rem)", animationDelay: "60ms" }}
          >
            <span className="text-valo-text">VALO</span><span className="text-valo-red">.</span>
            <br />
            <span style={{ WebkitTextStroke: "2px rgba(236,232,225,0.20)", color: "transparent" }}>INFO</span>
          </h1>

          {/* Inline stats row */}
          <div className="mt-8 flex flex-wrap gap-6 fade-up" style={{ animationDelay: "130ms" }}>
            {[
              { num: agents.length, label: "Agents" },
              { num: weapons.length, label: "Weapons" },
              { num: "600+", label: "Skins" },
              { num: "12+", label: "Maps" },
            ].map(({ num, label }) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span className="font-display font-900 text-2xl text-valo-text">{num}</span>
                <span className="font-mono text-[10px] text-valo-muted/50 tracking-widest uppercase">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 h-px w-24 bg-valo-red fade-up" style={{ animationDelay: "170ms" }} />

          <p className="mt-5 text-valo-muted max-w-sm leading-relaxed fade-up text-sm" style={{ animationDelay: "200ms" }}>
            Complete database for Valorant — agents, weapons, maps, skins, ranks and more.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-3 fade-up" style={{ animationDelay: "240ms" }}>
            <Link
              href="/agents"
              className="inline-flex items-center gap-2.5 bg-valo-red px-7 py-3 font-display font-800 text-sm tracking-[0.15em] uppercase text-white cut-tr-sm hover:bg-red-500 transition-colors"
            >
              Browse Agents
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/weapons"
              className="inline-flex items-center gap-2.5 border border-valo-border px-7 py-3 font-display font-800 text-sm tracking-[0.15em] uppercase text-valo-muted cut-tr-sm hover:border-valo-muted hover:text-valo-text transition-colors"
            >
              Weapons
            </Link>
            <Link
              href="/maps"
              className="inline-flex items-center gap-2.5 border border-valo-border px-7 py-3 font-display font-800 text-sm tracking-[0.15em] uppercase text-valo-muted cut-tr-sm hover:border-valo-muted hover:text-valo-text transition-colors"
            >
              Maps
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-30">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-valo-muted">Scroll</span>
          <div className="w-px h-8 bg-valo-muted animate-pulse" />
        </div>
      </section>

      {/* ── SECTION GRID ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-4 mb-12">
          <p className="section-label">Browse Categories</p>
          <div className="flex-1 h-px bg-valo-border" />
          <span className="font-mono text-[10px] text-valo-muted/30 tracking-widest">{SECTIONS.length} SECTIONS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {SECTIONS.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              className="group relative bg-valo-surface border border-valo-border hover:border-valo-red/50 transition-all duration-300 overflow-hidden cut-tr-sm block"
            >
              {/* Big watermark number */}
              <span
                className="absolute -top-3 -right-2 font-display font-900 leading-none select-none pointer-events-none transition-all duration-300 group-hover:opacity-100"
                style={{
                  fontSize: "7rem",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,70,85,0.08)",
                  lineHeight: 1,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Red top border on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-valo-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="relative p-5 pt-6">
                {/* Index + arrow row */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-valo-red/60 uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <svg
                    className="w-3.5 h-3.5 text-valo-muted/20 group-hover:text-valo-red group-hover:translate-x-0.5 transition-all duration-200"
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Count — hero element */}
                <div className="mb-3">
                  <span className="font-display font-900 text-3xl text-valo-red leading-none tracking-tight">
                    {s.num}
                  </span>
                </div>

                {/* Label */}
                <h2 className="font-display font-900 text-lg tracking-widest uppercase text-valo-text group-hover:text-white transition-colors leading-tight mb-1.5">
                  {s.label}
                </h2>

                {/* Sub */}
                <p className="font-mono text-[10px] text-valo-muted/50 leading-relaxed tracking-wide">
                  {s.sub}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── AGENT SHOWCASE ───────────────────────────────────────── */}
      <section className="border-t border-valo-border py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label mb-3">Roster</p>
              <h2 className="font-display font-900 text-4xl md:text-5xl tracking-tight text-valo-text">
                AGENTS
              </h2>
            </div>
            <Link
              href="/agents"
              className="font-mono text-xs text-valo-muted hover:text-valo-red transition-colors flex items-center gap-1.5"
            >
              View all
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {agents.slice(0, 16).map((agent) => {
              const colors = agent.backgroundGradientColors ?? [];
              const grad = colors.length >= 2
                ? `linear-gradient(160deg, #${colors[0]}40 0%, #${colors[1]}25 100%)`
                : "rgba(255,70,85,0.08)";
              return (
                <Link
                  key={agent.uuid}
                  href={`/agents/${agent.uuid}`}
                  className="group relative overflow-hidden cut-tr-sm aspect-[3/4] block"
                  style={{ background: grad }}
                >
                  {(agent.bustPortrait ?? agent.displayIconSmall) && (
                    <Image
                      src={agent.bustPortrait ?? agent.displayIconSmall!}
                      alt={agent.displayName}
                      fill
                      unoptimized
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-400"
                      sizes="120px"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-valo-bg/80 via-transparent to-transparent" />
                  <p className="absolute bottom-1.5 left-0 right-0 text-center font-display font-800 text-[9px] tracking-widest text-valo-text/80 uppercase px-1 leading-tight">
                    {agent.displayName}
                  </p>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-valo-red w-0 group-hover:w-full transition-all duration-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
