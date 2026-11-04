import { PageHeader } from "@/components/ui";
import { RunExplorer } from "@/components/run-explorer";

export default function RunsPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Jejak & Biaya" desc="Setiap run dilacak langkah demi langkah, lengkap dengan token dan biayanya." />
      <RunExplorer />
    </div>
  );
}
