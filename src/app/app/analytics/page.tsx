import Link from "next/link";
import { agents, runs, usd } from "@/lib/data";
import { Badge, Card, PageHeader, StatusBadge } from "@/components/ui";

export default function AnalyticsPage() {
  const totalRuns = agents.reduce((s, a) => s + a.runsThisWeek, 0);
  const totalCost = agents.reduce((s, a) => s + a.costThisWeek, 0);
  const pending = runs.filter((r) => r.status === "menunggu persetujuan").length;

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Analytics" desc="Ringkasan pemakaian agen tim Growth minggu ini." />

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Agen aktif", value: agents.filter((a) => a.status === "aktif").length },
          { label: "Run minggu ini", value: totalRuns },
          { label: "Biaya minggu ini", value: usd(totalCost) },
          { label: "Menunggu persetujuan", value: pending },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-muted">{s.label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <div>
          <h2 className="mb-3 text-sm font-medium text-muted">Per agen</h2>
          <Card className="divide-y divide-line">
            {agents.map((a) => (
              <Link key={a.id} href={`/app/agents/${a.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-2">
                <span className="text-lg" aria-hidden="true">{a.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{a.name}</p>
                  <p className="text-xs text-muted">{a.runsThisWeek} run · {usd(a.costThisWeek)}</p>
                </div>
                <Badge tone={a.status === "aktif" ? "ok" : "neutral"}>{a.status}</Badge>
              </Link>
            ))}
          </Card>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-medium text-muted">Run terbaru</h2>
          <Card className="divide-y divide-line">
            {runs.slice(0, 4).map((r) => (
              <Link key={r.id} href="/app/runs" className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-surface-2">
                <div className="min-w-0">
                  <p className="truncate text-sm">{r.summary}</p>
                  <p className="text-xs text-muted">{r.startedAt}</p>
                </div>
                <StatusBadge status={r.status} />
              </Link>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
