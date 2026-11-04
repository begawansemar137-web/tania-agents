"use client";

import { useState } from "react";
import { CalendarClock, Zap, Play } from "lucide-react";
import { automations as initial, getAgent } from "@/lib/data";
import { StatusBadge, btnGhost } from "./ui";

export function AutomationList() {
  const [items, setItems] = useState(initial);
  const [ran, setRan] = useState<string | null>(null);

  return (
    <>
      {ran && <p role="status" className="mb-4 rounded-lg bg-accent-soft px-3 py-2 text-sm text-accent-strong">“{ran}” dijalankan manual. Hasilnya akan muncul di Jejak &amp; Biaya.</p>}
      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <ul className="divide-y divide-line">
          {items.map((a) => {
            const agent = getAgent(a.agentId);
            const Icon = a.trigger.kind === "jadwal" ? CalendarClock : Zap;
            return (
              <li key={a.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-accent"><Icon size={17} aria-hidden="true" /></span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{a.name}</p>
                  <p className="text-sm text-muted">{agent?.emoji} {agent?.name} · {a.trigger.label}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span>Terakhir: {a.lastRun}</span>
                  <StatusBadge status={a.lastStatus} />
                  <button className={`${btnGhost} px-2.5 py-1.5 text-xs`} onClick={() => setRan(a.name)}>
                    <Play size={13} aria-hidden="true" /> Jalankan
                  </button>
                  <label className="inline-flex cursor-pointer items-center gap-2">
                    <span className="sr-only">Aktifkan {a.name}</span>
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={a.enabled}
                      onChange={() => setItems((xs) => xs.map((x) => (x.id === a.id ? { ...x, enabled: !x.enabled } : x)))}
                    />
                    <span className="relative h-5 w-9 rounded-full bg-line transition-colors peer-checked:bg-accent peer-focus-visible:outline-2 peer-focus-visible:outline-accent after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-surface after:transition-transform peer-checked:after:translate-x-4" />
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
