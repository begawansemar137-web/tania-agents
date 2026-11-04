import { PageHeader, btnPrimary } from "@/components/ui";
import { AutomationList } from "@/components/automation-list";

export default function AutomationsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Automasi"
        desc="Agen berjalan sesuai jadwal atau saat ada event di aplikasi terhubung."
        action={<button className={btnPrimary}>Automasi baru</button>}
      />
      <AutomationList />
    </div>
  );
}
