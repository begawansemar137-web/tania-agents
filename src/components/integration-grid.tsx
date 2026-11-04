"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { integrations as initial } from "@/lib/data";
import { Badge, btnGhost, btnPrimary } from "./ui";

const cats = ["Semua", ...Array.from(new Set(initial.map((i) => i.category)))];

export function IntegrationGrid() {
  const [items, setItems] = useState(initial);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Semua");

  const shown = items.filter((i) => (cat === "Semua" || i.category === cat) && i.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative sm:w-72">
          <Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted" aria-hidden="true" />
          <label htmlFor="q" className="sr-only">Cari integrasi</label>
          <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari integrasi…" className="w-full rounded-lg border border-line bg-surface py-2 pr-3 pl-9 text-sm placeholder:text-muted" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full px-3 py-1 text-xs ${cat === c ? "bg-ink text-bg" : "border border-line text-muted hover:text-ink"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((i) => (
          <div key={i.name} className="flex flex-col rounded-xl border border-line bg-surface p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 text-sm font-semibold">{i.name[0]}</span>
                <div>
                  <p className="font-medium">{i.name}</p>
                  <p className="text-xs text-muted">{i.category}</p>
                </div>
              </div>
              <Badge>{i.via}</Badge>
            </div>
            <p className="mt-3 flex-1 text-sm text-muted">{i.description}</p>
            <div className="mt-4 flex items-center justify-between">
              {i.connected ? <Badge tone="ok">Terhubung</Badge> : <span className="text-xs text-muted">Belum terhubung</span>}
              <button
                className={`${i.connected ? btnGhost : btnPrimary} px-3 py-1.5 text-xs`}
                onClick={() => setItems((xs) => xs.map((x) => (x.name === i.name ? { ...x, connected: !x.connected } : x)))}
              >
                {i.connected ? "Putuskan" : "Hubungkan"}
              </button>
            </div>
          </div>
        ))}
        {shown.length === 0 && <p className="text-sm text-muted">Tidak ada integrasi yang cocok dengan “{q}”.</p>}
      </div>
    </>
  );
}
