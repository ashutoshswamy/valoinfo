"use client";

import { useState, useMemo } from "react";
import AgentCard from "@/components/AgentCard";
import SearchBar from "@/components/SearchBar";
import type { Agent } from "@/lib/types";

export default function AgentsClient({ agents }: { agents: Agent[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => agents.filter((a) => a.displayName.toLowerCase().includes(search.toLowerCase())),
    [agents, search]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <p className="section-label mb-3">Valorant Roster</p>
          <h1 className="font-display font-900 text-5xl md:text-6xl tracking-tight text-valo-text">
            AGENTS
          </h1>
        </div>
        <div className="w-full sm:max-w-xs">
          <SearchBar value={search} onChange={setSearch} placeholder="Search agents..." count={filtered.length} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-32 text-center">
          <p className="font-display font-800 text-xl text-valo-muted tracking-wide">NO AGENTS FOUND</p>
          <p className="text-valo-muted/50 text-sm mt-2">Nothing matching &quot;{search}&quot;</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((agent) => (
            <AgentCard key={agent.uuid} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
}
