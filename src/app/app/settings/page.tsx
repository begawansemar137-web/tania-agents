import { Card, PageHeader } from "@/components/ui";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Settings" desc="Profil dan pengaturan workspace." />
      <Card className="divide-y divide-line">
        <div className="flex items-center gap-4 p-5">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-accent text-sm font-semibold text-surface">HS</div>
          <div>
            <p className="font-semibold">Henri S.</p>
            <p className="text-sm text-muted">Tim Growth · Admin</p>
          </div>
        </div>
        <dl className="grid gap-4 p-5 text-sm sm:grid-cols-[180px_1fr]">
          <dt className="text-muted">Workspace</dt>
          <dd>Tim Growth</dd>
          <dt className="text-muted">Penyedia model</dt>
          <dd>ModelHub (diatur lewat MODELHUB_API_KEY di server)</dd>
          <dt className="text-muted">Zona waktu</dt>
          <dd>Asia/Jakarta (WIB)</dd>
        </dl>
      </Card>
    </div>
  );
}
