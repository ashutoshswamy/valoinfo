import { getSprays } from "@/lib/api";
import SpraysClient from "./SpraysClient";

export default async function SpraysPage() {
  const sprays = await getSprays();
  return <SpraysClient sprays={sprays} />;
}
