import { Suspense } from "react";
import { notFound } from "next/navigation";
import { allAgentIds, findAgent } from "@/lib/agent-lookup";
import { AgentStudio } from "@/components/agent-studio";

export function generateStaticParams() {
  return allAgentIds.map((id) => ({ id }));
}

async function AgentLoader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = findAgent(id);
  if (!agent) notFound();
  return <AgentStudio agent={agent} />;
}

export default function AgentPage({ params }: PageProps<"/app/agents/[id]">) {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Memuat agen…</p>}>
      <AgentLoader params={params} />
    </Suspense>
  );
}
