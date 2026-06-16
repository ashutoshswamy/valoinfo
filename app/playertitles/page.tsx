import { getPlayerTitles } from "@/lib/api";
import PlayerTitlesClient from "./PlayerTitlesClient";

export default async function PlayerTitlesPage() {
  const titles = await getPlayerTitles();
  return <PlayerTitlesClient titles={titles} />;
}
