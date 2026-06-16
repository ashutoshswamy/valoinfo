import type { MetadataRoute } from "next";
import { getAgents, getWeapons, getMaps } from "@/lib/api";

const BASE = "https://valo-info-ashutosh.vercel.app";

const STATIC_ROUTES = [
  "/",
  "/agents",
  "/weapons",
  "/maps",
  "/skins",
  "/sprays",
  "/playercards",
  "/buddies",
  "/ranks",
  "/playertitles",
  "/flex",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [agents, weapons, maps] = await Promise.all([getAgents(), getWeapons(), getMaps()]);

  const statics = STATIC_ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const agentPages = agents.map((a) => ({
    url: `${BASE}/agents/${a.uuid}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const weaponPages = weapons.map((w) => ({
    url: `${BASE}/weapons/${w.uuid}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const mapPages = maps.map((m) => ({
    url: `${BASE}/maps/${m.uuid}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...statics, ...agentPages, ...weaponPages, ...mapPages];
}
