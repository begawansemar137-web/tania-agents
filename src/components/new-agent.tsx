"use client";

import { useEffect, useState } from "react";
import { Plus, Sparkles, Send } from "lucide-react";
import type { Agent } from "@/lib/data";
import { customAgent } from "@/lib/agent-lookup";
import { getCatalogAgent } from "@/lib/catalog";
import { AgentStudio } from "./agent-studio";
import { btnGhost, btnPrimary } from "./ui";

const examples = [
  "Setiap Jumat sore, rangkum tiket support minggu ini dan kirim ke #ops",
  "Ingatkan pelanggan yang invoice-nya jatuh tempo lewat WhatsApp",
  "Jawab pertanyaan karyawan baru dari dokumen kebijakan HR",
];

// Describe the job, press Buat, and the agent opens right away so you can talk to it.
// Demo: the agent lives only in this tab and is gone after a reload.
export function NewAgent() {
  const [text, setText] = useState("");
  const [templateName, setTemplateName] = useState<string | undefined>();
  const [agent, setAgent] = useState<Agent | null>(null);

  // Read ?template= on mount (not via Suspense + searchParams, whose streamed content stayed hidden).
  useEffect(() => {
    const preset = getCatalogAgent(new URLSearchParams(window.location.search).get("template") ?? "");
    if (!preset) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL on mount
    setText(preset.brief);
    setTemplateName(preset.name);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const description = text.trim();
    if (!description) return;
    setAgent(customAgent(description, templateName));
  }

  if (agent) {
    return (
      <div>
        <div role="status" className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-accent-soft px-4 py-3 text-sm text-accent-strong">
          <span>Agen siap. Coba ajak bicara di bawah. Versi demo: agen ini hilang saat halaman dimuat ulang.</span>
          <button type="button" className={btnGhost} onClick={() => { setAgent(null); setText(""); }}>
            <Plus size={15} aria-hidden="true" /> Buat agen lain
          </button>
        </div>
        <AgentStudio key={agent.role} agent={agent} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl rounded-xl border border-line bg-surface p-5">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Sparkles size={16} className="text-accent" aria-hidden="true" />
        {templateName ? `Mulai dari template ${templateName}` : "Buat agen baru dengan mengobrol"}
      </div>
      <form onSubmit={submit} className="mt-3 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="new-agent" className="sr-only">Jelaskan pekerjaan untuk agen baru</label>
        <input
          id="new-agent"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={500}
          placeholder="Jelaskan pekerjaannya, misalnya: ‘Setiap pagi, siapkan brief untuk panggilan sales saya’"
          className="min-w-0 flex-1 rounded-lg border border-line bg-bg px-3 py-2 text-sm placeholder:text-muted"
        />
        <button className={btnPrimary} disabled={!text.trim()}>
          <Send size={15} aria-hidden="true" /> Buat
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {examples.map((x) => (
          <button key={x} type="button" onClick={() => setText(x)} className="rounded-full border border-line px-3 py-1 text-xs text-muted hover:border-accent hover:text-ink">
            {x}
          </button>
        ))}
      </div>
    </div>
  );
}
