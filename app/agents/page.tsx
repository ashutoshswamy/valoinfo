import { getAgents } from "@/lib/api";
import AgentsClient from "./AgentsClient";

export default async function AgentsPage() {
  const agents = await getAgents();
  return <AgentsClient agents={agents} />;
}
