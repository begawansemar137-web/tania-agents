"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { ArrowLeft, Send, Loader2, Square, RotateCcw } from "lucide-react";
import type { Agent, Permission, ToolAccess } from "@/lib/data";
import { AUTO_MODEL, usd } from "@/lib/data";
import { Badge, btnPrimary, btnGhost } from "./ui";
import { ChatMarkdown } from "./chat-markdown";

// ModelHub also lists embedding models; they can't chat, so the picker hides them.
const isChatModel = (id: string) => !/embed/i.test(id);

// One-click prompts so a first-time visitor can see the agent work without thinking of a question.
const starters: Record<string, string[]> = {
  "sales-prep": ["Siapkan brief untuk panggilan dengan PT Sinar Logistik", "Apa saja yang kamu cek sebelum panggilan?"],
  "competitor-watch": ["Buat contoh digest kompetitor minggu ini", "Sumber apa saja yang kamu pantau?"],
  "inbound-lead": ["Balas lead: 'Kami butuh chatbot WhatsApp untuk 3 cabang'", "Bagaimana kamu menilai kualitas lead?"],
  "hr-onboarding": ["Buat checklist onboarding untuk karyawan baru tim Sales", "Apa yang terjadi di hari pertama?"],
};
const defaultStarters = ["Apa yang bisa kamu bantu?", "Tunjukkan contoh hasil kerjamu"];

function readError(error: Error) {
  try {
    return (JSON.parse(error.message) as { error?: string }).error ?? error.message;
  } catch {
    return error.message || "Terjadi kesalahan saat menghubungi model.";
  }
}

export function AgentStudio({ agent }: { agent: Agent }) {
  const [tab, setTab] = useState<"konfigurasi" | "izin" | "versi">("konfigurasi");
  const { messages, sendMessage, status, error, stop, regenerate, clearError, setMessages } = useChat();
  const [input, setInput] = useState("");
  const busy = status === "submitted" || status === "streaming";
  const [model, setModel] = useState(agent.model);
  const [instructions, setInstructions] = useState(agent.instructions);
  const [tools, setTools] = useState<ToolAccess[]>(agent.tools);
  const [saved, setSaved] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState<string[] | null>(null);

  // Models come from the ModelHub key on the server, so the picker matches what the key can use.
  useEffect(() => {
    let alive = true;
    fetch("/api/models")
      .then((r) => r.json() as Promise<{ models?: string[] }>)
      .then((d) => alive && setAvailable((d.models ?? []).filter(isChatModel)))
      .catch(() => alive && setAvailable([]));
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, status]);

  // Current (unsaved) config from the side panel travels with every request.
  const requestBody = () => ({ body: { agentId: agent.id, model, instructions } });

  function submitText(raw: string) {
    const text = raw.trim();
    if (!text || busy) return;
    setInput("");
    clearError();
    sendMessage({ text }, requestBody());
  }

  function send(e: React.FormEvent) {
    e.preventDefault();
    submitText(input);
  }

  function setPerm(i: number, permission: Permission) {
    setTools((t) => t.map((x, j) => (j === i ? { ...x, permission } : x)));
    setSaved(false);
  }

  function toggleApproval(i: number) {
    setTools((t) => t.map((x, j) => (j === i ? { ...x, approval: !x.approval } : x)));
    setSaved(false);
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Link href="/app" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft size={15} /> Semua agen
      </Link>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-surface text-2xl ring-1 ring-line">{agent.emoji}</span>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-semibold tracking-tight">{agent.name}</h1>
          <p className="text-sm text-muted">{agent.role}</p>
        </div>
        <div className="flex w-full flex-wrap gap-2 sm:w-auto">
          {agent.channels.map((c) => <Badge key={c} tone="accent">{c}</Badge>)}
          <Badge>{agent.runsThisWeek} run · {usd(agent.costThisWeek)}</Badge>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_400px]">
        {/* Chat */}
        <section aria-label="Obrolan dengan agen" className="flex h-[640px] flex-col rounded-xl border border-line bg-surface">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2 text-xs text-muted">
            <span className="min-w-0 truncate">Model: <span className="font-mono text-ink">{model}</span></span>
            {messages.length > 0 && (
              <button onClick={() => { stop(); setMessages([]); clearError(); }} className="shrink-0 hover:text-ink">Mulai ulang</button>
            )}
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
            <div className="max-w-[85%] rounded-xl rounded-bl-sm border border-line px-3.5 py-2 text-sm">{agent.greeting}</div>
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2" aria-label="Contoh pertanyaan">
                {(starters[agent.id] ?? defaultStarters).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => submitText(s)}
                    className="rounded-full border border-accent/40 bg-accent-soft px-3 py-1.5 text-left text-xs font-medium text-accent hover:border-accent"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m) => {
              const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
              return m.role === "user" ? (
                <div key={m.id} className="ml-auto max-w-[80%] rounded-xl rounded-br-sm bg-accent px-3.5 py-2 text-sm whitespace-pre-wrap text-surface">{text}</div>
              ) : (
                <div key={m.id} className="max-w-[85%] rounded-xl rounded-bl-sm border border-line px-3.5 py-2 text-sm leading-relaxed">
                  <ChatMarkdown text={text} />
                </div>
              );
            })}
            {status === "submitted" && (
              <p className="flex items-center gap-2 text-sm text-muted"><Loader2 size={14} className="animate-spin" /> Sedang berpikir…</p>
            )}
            {error && (
              <div role="alert" className="max-w-[90%] rounded-lg border border-danger/40 bg-danger-soft px-3.5 py-2.5 text-sm text-danger">
                <p>{readError(error)}</p>
                <button onClick={() => { clearError(); regenerate(requestBody()); }} className="mt-2 inline-flex items-center gap-1 text-xs font-medium underline">
                  <RotateCcw size={12} /> Coba lagi
                </button>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-line p-3">
            <label htmlFor="chat" className="sr-only">Pesan untuk agen</label>
            <input
              id="chat"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Kirim pesan ke ${agent.name.split(" ")[0]}… atau koreksi hasilnya`}
              className="min-w-0 flex-1 rounded-lg border border-line bg-bg px-3 py-2 text-sm placeholder:text-muted"
            />
            {busy ? (
              <button type="button" className={btnGhost} onClick={() => stop()} aria-label="Hentikan">
                <Square size={15} />
              </button>
            ) : (
              <button className={btnPrimary} disabled={!input.trim()} aria-label="Kirim">
                <Send size={15} />
              </button>
            )}
          </form>
        </section>

        {/* Config */}
        <section aria-label="Konfigurasi agen" className="rounded-xl border border-line bg-surface">
          <div role="tablist" className="flex border-b border-line px-2">
            {(["konfigurasi", "izin", "versi"] as const).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`-mb-px border-b-2 px-3 py-3 text-sm capitalize ${tab === t ? "border-accent font-medium text-ink" : "border-transparent text-muted hover:text-ink"}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="p-4">
            {tab === "konfigurasi" && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="model" className="text-xs font-medium text-muted">Model</label>
                  <select id="model" value={model} onChange={(e) => { setModel(e.target.value); setSaved(false); }} className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2 font-mono text-sm">
                    <option value={AUTO_MODEL}>auto (default ModelHub)</option>
                    {model !== AUTO_MODEL && !available?.includes(model) && <option value={model}>{model}</option>}
                    {available?.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <p className="mt-1 text-xs text-muted">
                    {available === null ? "Memuat daftar model…" : available.length ? `${available.length} model tersedia dari ModelHub.` : "Daftar model belum tersedia. Periksa MODELHUB_API_KEY."}
                  </p>
                </div>
                <div>
                  <label htmlFor="instr" className="text-xs font-medium text-muted">Instruksi</label>
                  <textarea id="instr" rows={8} value={instructions} onChange={(e) => { setInstructions(e.target.value); setSaved(false); }} className="mt-1 w-full resize-y rounded-lg border border-line bg-bg px-3 py-2 text-sm leading-relaxed" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted">Skill</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {agent.skills.map((s) => <Badge key={s}>{s}</Badge>)}
                  </div>
                </div>
              </div>
            )}

            {tab === "izin" && (
              <div>
                <p className="mb-3 text-xs text-muted">Atur alat yang boleh dipakai agen, dan aksi tulis mana yang harus Anda setujui lebih dulu.</p>
                <ul className="divide-y divide-line">
                  {tools.map((t, i) => (
                    <li key={t.integration} className="py-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium">{t.integration}</span>
                        <div role="radiogroup" aria-label={`Izin ${t.integration}`} className="flex rounded-lg border border-line p-0.5 text-xs">
                          {(["off", "read", "write"] as Permission[]).map((p) => (
                            <button
                              key={p}
                              role="radio"
                              aria-checked={t.permission === p}
                              onClick={() => setPerm(i, p)}
                              className={`rounded-md px-2 py-1 ${t.permission === p ? "bg-accent text-surface" : "text-muted hover:text-ink"}`}
                            >
                              {p === "off" ? "Mati" : p === "read" ? "Baca" : "Tulis"}
                            </button>
                          ))}
                        </div>
                      </div>
                      {t.permission === "write" && (
                        <label className="mt-2 flex items-center gap-2 text-xs text-muted">
                          <input type="checkbox" checked={t.approval} onChange={() => toggleApproval(i)} className="accent-[var(--accent)]" />
                          Minta persetujuan sebelum menulis
                        </label>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === "versi" && (
              <ol className="space-y-3">
                {agent.versions.map((v, i) => (
                  <li key={v.version} className="flex gap-3">
                    <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${i === 0 ? "bg-accent" : "bg-line"}`} />
                    <div className="text-sm">
                      <p><span className="font-mono font-medium">v{v.version}</span> · {v.note}</p>
                      <p className="text-xs text-muted">{v.date} · {v.author}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {tab !== "versi" && (
            <div className="flex items-center justify-end gap-2 border-t border-line p-3">
              {saved && <span role="status" className="mr-auto text-xs text-ok">Dipakai di sesi ini (versi demo, tidak disimpan permanen)</span>}
              <button className={btnGhost} onClick={() => { setModel(agent.model); setInstructions(agent.instructions); setTools(agent.tools); setSaved(false); }}>Batalkan</button>
              <button className={btnPrimary} onClick={() => setSaved(true)}>Simpan versi baru</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
