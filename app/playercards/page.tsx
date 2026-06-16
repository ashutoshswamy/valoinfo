import { getPlayerCards } from "@/lib/api";
import PlayerCardsClient from "./PlayerCardsClient";

export default async function PlayerCardsPage() {
  const cards = await getPlayerCards();
  return <PlayerCardsClient cards={cards} />;
}
