import { getFlex } from "@/lib/api";
import FlexClient from "./FlexClient";

export default async function FlexPage() {
  const items = await getFlex();
  return <FlexClient items={items} />;
}
