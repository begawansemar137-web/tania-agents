"use client";

import { useState } from "react";
import { Bot, Wrench, Brain } from "lucide-react";
import { runs, agents, getAgent, usd, type Span } from "@/lib/data";
import { StatusBadge, btnPrimary, btnGhost } from "./ui";

const kindIcon = { agent: Bot, tool: Wrench, llm: Brain };

function SpanRow({ span, depth, total }: { span: Span; depth: number; total: number }) {
  const Icon = kindIcon[span.kind];
  const pct = Math.max(2, (span.ms / total) * 100);
  return (
    <>
      <li className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 py-2 sm:grid-cols-[minmax(0,1.3fr)_1fr_auto]" style={{ paddingLeft: depth * 18 }}>
        <div className="flex min-w-0 items-center gap-2">
          <Icon size={14} className={span.kind === "llm" ? "text-accent" : "text-muted"} aria-hidden="true" />
          <span className="truncate font-mono text-xs">{span.name}</span>
        </div>
        <div className="col-span-2 row-start-2 h-1.5 self-center rounded-full bg-surface-2 sm:col-span-1 sm:row-start-1">
          <div className={`h-full rounded-full ${span.kind === "llm" ? "bg-accent" : "bg-muted/50"}`} style={{ width: `${pct}%` }} />
        </div>
        <span className="text-right font-mono text-xs text-muted tabular-nums">
          {(span.ms / 1000).toFixed(1)}s{span.tokens ? ` · ${span.tokens.toLocaleString("id-ID")} tok` : ""}
        </span>
        <p className="col-span-full text-xs text-muted" style={{ paddingLeft: 22 }}>{span.detail}</p>
      </li>
      {span.children?.map((c) => <SpanRow key={c.name} span={c} depth={depth + 1} total={total} />)}
    </>
  );
}

export function RunExplorer() {
  const [filter, setFilter] = useState("semua");
  const [selected, setSelected] = useState(runs[0].id);
  const [approved, setApproved] = useState<Record<string, "ya" | "tidak">>({});

  const list = filter === "semua" ? runs : runs.filter((r) => r.agentId === filter);
  const run = list.find((r) => r.id === selected) ?? list[0];
  const total = list.reduce((s, r) => s + r.cost, 0);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label htmlFor="agent-filter" className="text-sm text-muted">Agen</label>
        <select id="agent-filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm">
          <option value="semua">Semua agen</option>
          {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
        <span className="ml-auto text-sm text-muted">{list.length} run · total <span className="font-mono text-ink">{usd(total)}</span></span>
      </div>

      {!run ? (
        <p className="rounded-xl border border-line bg-surface p-6 text-sm text-muted">Agen ini belum punya run. Jalankan dari halaman agen atau Automasi.</p>
      ) : (
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <ul className="divide-y divide-line self-start overflow-hidden rounded-xl border border-line bg-surface">
          {list.map((r) => (
            <li key={r.id}>
              <button
                onClick={() => setSelected(r.id)}
                aria-current={r.id === run.id}
                className={`w-full px-4 py-3 text-left transition-colors ${r.id === run.id ? "bg-accent-soft" : "hover:bg-surface-2"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm">{r.summary}</p>
                  <StatusBadge status={approved[r.id] === "ya" ? "sukses" : approved[r.id] === "tidak" ? "gagal" : r.status} />
                </div>
                <p className="mt-1 text-xs text-muted">
                  {getAgent(r.agentId)?.emoji} {r.source} · {r.startedAt} · <span className="font-mono">{usd(r.cost)}</span>
                </p>
              </button>
            </li>
          ))}
        </ul>

        <section aria-label="Detail jejak" className="rounded-xl border border-line bg-surface p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-mono text-sm font-medium">{run.id}</h2>
            <p className="text-xs text-muted">
              {(run.durationMs / 1000).toFixed(1)} dtk · {run.tokens.toLocaleString("id-ID")} token · <span className="font-mono">{usd(run.cost)}</span>
            </p>
          </div>
          <p className="mt-1 text-sm text-muted">{run.summary}</p>

          {run.status === "menunggu persetujuan" && !approved[run.id] && (
            <div className="mt-4 rounded-lg border border-warn/40 bg-warn-soft p-3">
              <p className="text-sm font-medium text-warn">Agen meminta persetujuan untuk mengirim email</p>
              <p className="mt-1 text-xs text-muted">“Halo Pak Andi, terima kasih sudah menghubungi kami. Melihat ekspansi CV Maju Bersama ke Jawa Timur…”</p>
              <div className="mt-3 flex gap-2">
                <button className={btnPrimary} onClick={() => setApproved((a) => ({ ...a, [run.id]: "ya" }))}>Setujui &amp; kirim</button>
                <button className={btnGhost} onClick={() => setApproved((a) => ({ ...a, [run.id]: "tidak" }))}>Tolak</button>
              </div>
            </div>
          )}
          {approved[run.id] && (
            <p role="status" className="mt-4 text-sm text-muted">
              {approved[run.id] === "ya" ? "Disetujui. Email dikirim oleh agen." : "Ditolak. Agen tidak mengirim email."}
            </p>
          )}

          <ul className="mt-4 divide-y divide-line">
            {run.spans.map((s) => <SpanRow key={s.name} span={s} depth={0} total={run.durationMs} />)}
          </ul>
        </section>
      </div>
      )}
    </div>
  );
}
