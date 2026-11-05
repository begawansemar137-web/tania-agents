"use client";

import { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { btnPrimary } from "./ui";

const examples = [
  "Setiap Jumat sore, rangkum tiket support minggu ini dan kirim ke #ops",
  "Ingatkan pelanggan yang invoice-nya jatuh tempo lewat WhatsApp",
  "Jawab pertanyaan karyawan baru dari dokumen kebijakan HR",
];

export function NewAgent({ initial = "", templateName }: { initial?: string; templateName?: string }) {
  const [text, setText] = useState(initial);
  const [created, setCreated] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setCreated(text.trim());
    setText("");
  }

  return (
    <div className="rounded-xl border border-line bg-surface p-5">
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
      {created && (
        <p role="status" className="mt-4 rounded-lg bg-accent-soft px-3 py-2 text-sm text-accent-strong">
          Draf agen dibuat dari: “{created}”. Di versi produksi, agen akan menanyakan aplikasi yang perlu dihubungkan.
        </p>
      )}
    </div>
  );
}
