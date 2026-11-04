import Link from "next/link";
import { agents, runs, templates, usd } from "@/lib/data";
import { Badge, Card, PageHeader, StatusBadge } from "@/components/ui";
import { NewAgent } from "@/components/new-agent";

export default function AgentsPage() {
  const totalRuns = agents.reduce((s, a) => s + a.runsThisWeek, 0);
  const totalCost = agents.reduce((s, a) => s + a.costThisWeek, 0);
  const pending = runs.filter((r) => r.status === "menunggu persetujuan").length;

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Agen" desc="Rekan kerja AI yang dibagikan ke tim Growth." />

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

      <NewAgent />

      <h2 className="mt-8 mb-3 text-sm font-medium text-muted">Semua agen</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {agents.map((a) => (
          <Link key={a.id} href={`/app/agents/${a.id}`} className="group rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface-2 text-xl">{a.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium group-hover:text-accent">{a.name}</h3>
                  <Badge tone={a.status === "aktif" ? "ok" : "neutral"}>{a.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted">{a.role}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
              <span className="font-mono">{a.model}</span>
              <span>{a.channels.join(" · ")}</span>
              <span>{a.runsThisWeek} run · {usd(a.costThisWeek)}</span>
              <span>v{a.versions[0].version} · {a.owner}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="mb-3 text-sm font-medium text-muted">Run terbaru</h2>
          <Card className="divide-y divide-line">
            {runs.slice(0, 4).map((r) => (
              <Link key={r.id} href="/app/runs" className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-surface-2">
                <div className="min-w-0">
                  <p className="truncate text-sm">{r.summary}</p>
                  <p className="text-xs text-muted">{r.source} · {r.startedAt}</p>
                </div>
                <StatusBadge status={r.status} />
              </Link>
            ))}
          </Card>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-medium text-muted">Template</h2>
          <Card className="divide-y divide-line">
            {templates.slice(0, 4).map((t) => (
              <div key={t.name} className="flex items-center gap-3 px-4 py-3">
                <span className="text-lg">{t.emoji}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm">{t.name}</p>
                  <p className="truncate text-xs text-muted">{t.desc}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
