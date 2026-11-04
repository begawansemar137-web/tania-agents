import { PageHeader } from "@/components/ui";
import { IntegrationGrid } from "@/components/integration-grid";

export default function IntegrationsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Integrasi" desc="Hubungkan aplikasi lewat MCP atau Composio. Izin per agen diatur di halaman agen." />
      <IntegrationGrid />
    </div>
  );
}
