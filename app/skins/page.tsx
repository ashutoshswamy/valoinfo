import { getSkins, getContentTiers, getWeapons } from "@/lib/api";
import SkinsClient from "./SkinsClient";

export default async function SkinsPage() {
  const [skins, tiers, weapons] = await Promise.all([getSkins(), getContentTiers(), getWeapons()]);
  return <SkinsClient skins={skins} tiers={tiers} weapons={weapons} />;
}
