import type {
  Agent,
  Weapon,
  WeaponSkin,
  GameMap,
  Spray,
  PlayerCard,
  PlayerTitle,
  Flex,
  Buddy,
  CompetitiveTierSet,
  ContentTier,
} from "./types";

const BASE_URL = "https://valorant-api.com/v1";
const CACHE_OPTIONS: RequestInit = {
  cache: "force-cache",
  next: { revalidate: 3600 },
};

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, CACHE_OPTIONS);
  if (!res.ok) throw new Error(`API error: ${res.status} for ${path}`);
  const json = await res.json();
  return json.data as T;
}

export async function getAgents(): Promise<Agent[]> {
  return apiFetch<Agent[]>("/agents?isPlayableCharacter=true&language=en-US");
}

export async function getAgent(uuid: string): Promise<Agent> {
  return apiFetch<Agent>(`/agents/${uuid}?language=en-US`);
}

export async function getWeapons(): Promise<Weapon[]> {
  return apiFetch<Weapon[]>("/weapons?language=en-US");
}

export async function getWeapon(uuid: string): Promise<Weapon> {
  return apiFetch<Weapon>(`/weapons/${uuid}?language=en-US`);
}

export async function getMaps(): Promise<GameMap[]> {
  return apiFetch<GameMap[]>("/maps?language=en-US");
}

export async function getMap(uuid: string): Promise<GameMap> {
  return apiFetch<GameMap>(`/maps/${uuid}?language=en-US`);
}

export async function getSkins(): Promise<WeaponSkin[]> {
  return apiFetch<WeaponSkin[]>("/weapons/skins?language=en-US");
}

export async function getContentTiers(): Promise<ContentTier[]> {
  return apiFetch<ContentTier[]>("/contenttiers?language=en-US");
}

export async function getSprays(): Promise<Spray[]> {
  return apiFetch<Spray[]>("/sprays?language=en-US");
}

export async function getPlayerCards(): Promise<PlayerCard[]> {
  return apiFetch<PlayerCard[]>("/playercards?language=en-US");
}

export async function getBuddies(): Promise<Buddy[]> {
  return apiFetch<Buddy[]>("/buddies?language=en-US");
}

export async function getBuddy(uuid: string): Promise<Buddy> {
  return apiFetch<Buddy>(`/buddies/${uuid}?language=en-US`);
}

export async function getSpray(uuid: string): Promise<Spray> {
  return apiFetch<Spray>(`/sprays/${uuid}?language=en-US`);
}

export async function getPlayerCard(uuid: string): Promise<PlayerCard> {
  return apiFetch<PlayerCard>(`/playercards/${uuid}?language=en-US`);
}

export async function getSkin(uuid: string): Promise<WeaponSkin> {
  return apiFetch<WeaponSkin>(`/weapons/skins/${uuid}?language=en-US`);
}

export async function getCompetitiveTiers(): Promise<CompetitiveTierSet[]> {
  return apiFetch<CompetitiveTierSet[]>("/competitivetiers?language=en-US");
}

export async function getPlayerTitles(): Promise<PlayerTitle[]> {
  return apiFetch<PlayerTitle[]>("/playertitles?language=en-US");
}

export async function getFlex(): Promise<Flex[]> {
  return apiFetch<Flex[]>("/flex?language=en-US");
}

export async function getFlexItem(uuid: string): Promise<Flex> {
  return apiFetch<Flex>(`/flex/${uuid}?language=en-US`);
}

