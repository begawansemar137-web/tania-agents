import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCatalogAgent } from "@/lib/catalog";
import { NewAgent } from "@/components/new-agent";
import { PageHeader } from "@/components/ui";

async function NewAgentFromTemplate({ searchParams }: { searchParams: Promise<{ template?: string | string[] }> }) {
  const { template } = await searchParams;
  const preset = typeof template === "string" ? getCatalogAgent(template) : undefined;
  return <NewAgent key={preset?.slug ?? "blank"} initial={preset?.brief} templateName={preset?.name} />;
}

export default function NewAgentPage({ searchParams }: PageProps<"/app/agents/new">) {
  return (
    <div className="mx-auto max-w-4xl">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-muted">
        <Link href="/app" className="hover:text-ink">Agents</Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span aria-current="page" className="font-medium text-accent">Buat Agent</span>
      </nav>
      <PageHeader title="Buat AI Agent" desc="Ceritakan pekerjaannya dengan bahasa sehari-hari. Agen akan menanyakan aplikasi yang perlu dihubungkan." />
      <Suspense fallback={<NewAgent />}>
        <NewAgentFromTemplate searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
