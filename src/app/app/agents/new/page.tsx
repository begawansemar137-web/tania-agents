import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { NewAgent } from "@/components/new-agent";
import { PageHeader } from "@/components/ui";

export default function NewAgentPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-muted">
        <Link href="/app" className="hover:text-ink">Agents</Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span aria-current="page" className="font-medium text-accent">Buat Agent</span>
      </nav>
      <PageHeader title="Buat AI Agent" desc="Ceritakan pekerjaannya dengan bahasa sehari-hari, lalu agen langsung bisa diajak bicara." />
      <NewAgent />
    </div>
  );
}
