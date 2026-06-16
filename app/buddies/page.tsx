import { getBuddies } from "@/lib/api";
import BuddiesClient from "./BuddiesClient";

export default async function BuddiesPage() {
  const buddies = await getBuddies();
  return <BuddiesClient buddies={buddies} />;
}
