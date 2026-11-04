// Data contoh (mock) untuk TANIA-Agents. Ganti dengan API/backend nyata nanti.

export type Permission = "off" | "read" | "write";

export type ToolAccess = { integration: string; permission: Permission; approval: boolean };

export type AgentVersion = { version: number; date: string; author: string; note: string };

export type Agent = {
  id: string;
  name: string;
  role: string;
  emoji: string;
  model: string;
  owner: string;
  channels: string[];
  instructions: string;
  skills: string[];
  tools: ToolAccess[];
  versions: AgentVersion[];
  runsThisWeek: number;
  costThisWeek: number; // USD
  status: "aktif" | "draf";
  greeting: string;
};

export const agents: Agent[] = [
  {
    id: "sales-prep",
    name: "Sari — Persiapan Sales",
    role: "Menyiapkan ringkasan prospek sebelum setiap panggilan penjualan.",
    emoji: "📞",
    model: "anthropic/claude-sonnet-5.5",
    owner: "Henri S.",
    channels: ["Web", "Slack"],
    instructions:
      "Kamu adalah asisten tim sales. Sebelum setiap panggilan, cari informasi perusahaan prospek, riwayat email terakhir, dan catatan CRM. Buat ringkasan maksimal 10 poin dalam Bahasa Indonesia, lalu kirim ke kanal #sales 30 menit sebelum jadwal.",
    skills: ["Riset perusahaan", "Ringkas email", "Format brief panggilan"],
    tools: [
      { integration: "Google Calendar", permission: "read", approval: false },
      { integration: "Gmail", permission: "read", approval: false },
      { integration: "HubSpot", permission: "write", approval: true },
      { integration: "Slack", permission: "write", approval: false },
      { integration: "Web Search", permission: "read", approval: false },
    ],
    versions: [
      { version: 4, date: "2026-11-02", author: "Henri S.", note: "Tambah batas 10 poin" },
      { version: 3, date: "2026-10-28", author: "Agen (belajar)", note: "Skill baru: Format brief panggilan" },
      { version: 2, date: "2026-10-20", author: "Dewi A.", note: "Hubungkan HubSpot (tulis + persetujuan)" },
      { version: 1, date: "2026-10-15", author: "Henri S.", note: "Versi awal" },
    ],
    runsThisWeek: 42,
    costThisWeek: 3.18,
    status: "aktif",
    greeting: "Halo! Saya Sari. Mau saya siapkan brief untuk panggilan berikutnya?",
  },
  {
    id: "competitor-watch",
    name: "Raka — Pantau Kompetitor",
    role: "Merangkum berita & perubahan harga kompetitor setiap Senin pagi.",
    emoji: "🔭",
    model: "anthropic/claude-haiku-5.5",
    owner: "Dewi A.",
    channels: ["Web", "Telegram"],
    instructions:
      "Setiap Senin jam 07.00 WIB, cari berita, rilis produk, dan perubahan harga dari daftar kompetitor di file kompetitor.md. Kirim ringkasan ke Gmail tim marketing.",
    skills: ["Pencarian web", "Bandingkan harga"],
    tools: [
      { integration: "Web Search", permission: "read", approval: false },
      { integration: "Gmail", permission: "write", approval: false },
      { integration: "Google Drive", permission: "read", approval: false },
    ],
    versions: [
      { version: 2, date: "2026-10-30", author: "Dewi A.", note: "Ganti model ke Haiku (hemat biaya)" },
      { version: 1, date: "2026-10-10", author: "Dewi A.", note: "Versi awal" },
    ],
    runsThisWeek: 1,
    costThisWeek: 0.21,
    status: "aktif",
    greeting: "Hai, saya Raka. Ingin tahu kabar kompetitor terbaru?",
  },
  {
    id: "inbound-lead",
    name: "Nadia — Lead Masuk",
    role: "Meriset, mengkualifikasi, dan membalas setiap lead baru.",
    emoji: "📥",
    model: "anthropic/claude-sonnet-5.5",
    owner: "Budi P.",
    channels: ["Web", "WhatsApp"],
    instructions:
      "Saat ada lead baru di formulir website, riset perusahaannya, beri skor 1–5 sesuai ICP, lalu siapkan balasan personal. Balasan untuk skor ≥4 harus disetujui manusia sebelum dikirim.",
    skills: ["Skor ICP", "Tulis balasan personal"],
    tools: [
      { integration: "Gmail", permission: "write", approval: true },
      { integration: "HubSpot", permission: "write", approval: false },
      { integration: "Web Search", permission: "read", approval: false },
    ],
    versions: [{ version: 1, date: "2026-11-01", author: "Budi P.", note: "Versi awal" }],
    runsThisWeek: 17,
    costThisWeek: 1.94,
    status: "aktif",
    greeting: "Halo, saya Nadia. Ada lead yang ingin saya periksa?",
  },
  {
    id: "hr-onboarding",
    name: "Tari — Onboarding HR",
    role: "Menjawab pertanyaan karyawan baru tentang kebijakan & administrasi.",
    emoji: "🧭",
    model: "google/gemini-3.8-flash",
    owner: "Sinta R.",
    channels: ["Web"],
    instructions:
      "Jawab pertanyaan karyawan baru berdasarkan dokumen kebijakan di folder HR. Jika tidak yakin, arahkan ke tim HR. Jangan pernah membagikan data gaji.",
    skills: ["Cari dokumen kebijakan"],
    tools: [{ integration: "Google Drive", permission: "read", approval: false }],
    versions: [{ version: 1, date: "2026-11-03", author: "Sinta R.", note: "Draf awal" }],
    runsThisWeek: 0,
    costThisWeek: 0,
    status: "draf",
    greeting: "Selamat datang! Saya Tari. Apa yang ingin kamu ketahui soal kantor?",
  },
];

export type Automation = {
  id: string;
  name: string;
  agentId: string;
  trigger: { kind: "jadwal" | "event"; label: string };
  enabled: boolean;
  lastRun: string;
  lastStatus: "sukses" | "gagal" | "menunggu persetujuan";
};

export const automations: Automation[] = [
  { id: "a1", name: "Brief sebelum panggilan", agentId: "sales-prep", trigger: { kind: "event", label: "30 menit sebelum acara Calendar bertag 'sales'" }, enabled: true, lastRun: "Hari ini, 09.30", lastStatus: "sukses" },
  { id: "a2", name: "Digest kompetitor mingguan", agentId: "competitor-watch", trigger: { kind: "jadwal", label: "Setiap Senin, 07.00 WIB" }, enabled: true, lastRun: "Senin, 07.00", lastStatus: "sukses" },
  { id: "a3", name: "Balas lead dari website", agentId: "inbound-lead", trigger: { kind: "event", label: "Formulir baru di HubSpot" }, enabled: true, lastRun: "Hari ini, 11.12", lastStatus: "menunggu persetujuan" },
  { id: "a4", name: "Rekap CRM akhir hari", agentId: "sales-prep", trigger: { kind: "jadwal", label: "Setiap hari kerja, 17.00 WIB" }, enabled: false, lastRun: "Kemarin, 17.00", lastStatus: "gagal" },
];

export type Span = { name: string; kind: "llm" | "tool" | "agent"; ms: number; tokens?: number; detail: string; children?: Span[] };

export type Run = {
  id: string;
  agentId: string;
  source: string;
  startedAt: string;
  durationMs: number;
  tokens: number;
  cost: number;
  status: "sukses" | "gagal" | "menunggu persetujuan";
  summary: string;
  spans: Span[];
};

export const runs: Run[] = [
  {
    id: "run_8f21", agentId: "sales-prep", source: "Automasi: Brief sebelum panggilan", startedAt: "04 Nov 2026, 09.30", durationMs: 18400, tokens: 12840, cost: 0.091, status: "sukses",
    summary: "Brief panggilan PT Sinar Logistik dikirim ke #sales",
    spans: [
      { name: "Agen: Sari", kind: "agent", ms: 18400, detail: "Rencana: kalender → email → CRM → web → tulis brief", children: [
        { name: "google_calendar.list_events", kind: "tool", ms: 640, detail: "1 acara: 'Demo — PT Sinar Logistik' 10.00" },
        { name: "gmail.search", kind: "tool", ms: 1210, detail: "6 email terkait dalam 30 hari terakhir" },
        { name: "hubspot.get_deal", kind: "tool", ms: 830, detail: "Deal: Rp 420jt, tahap Negosiasi" },
        { name: "web_search", kind: "tool", ms: 3900, detail: "3 berita: ekspansi gudang Surabaya" },
        { name: "LLM: tulis brief", kind: "llm", ms: 9800, tokens: 11200, detail: "anthropic/claude-sonnet-5.5 · 10 poin" },
        { name: "slack.post_message", kind: "tool", ms: 420, detail: "#sales · terkirim" },
      ] },
    ],
  },
  {
    id: "run_8f1c", agentId: "inbound-lead", source: "Automasi: Balas lead dari website", startedAt: "04 Nov 2026, 11.12", durationMs: 12100, tokens: 8420, cost: 0.064, status: "menunggu persetujuan",
    summary: "Lead CV Maju Bersama — skor 4/5, draf balasan menunggu persetujuan",
    spans: [
      { name: "Agen: Nadia", kind: "agent", ms: 12100, detail: "Lead baru dari formulir", children: [
        { name: "web_search", kind: "tool", ms: 3100, detail: "Profil perusahaan ditemukan" },
        { name: "LLM: skor ICP", kind: "llm", ms: 2900, tokens: 2600, detail: "Skor 4/5 — distribusi, 50–200 karyawan" },
        { name: "LLM: tulis balasan", kind: "llm", ms: 5400, tokens: 5820, detail: "Draf balasan personal" },
        { name: "gmail.send (butuh persetujuan)", kind: "tool", ms: 0, detail: "Menunggu persetujuan Budi P." },
      ] },
    ],
  },
  {
    id: "run_8e90", agentId: "competitor-watch", source: "Automasi: Digest kompetitor mingguan", startedAt: "03 Nov 2026, 07.00", durationMs: 41200, tokens: 22100, cost: 0.021, status: "sukses",
    summary: "Digest 5 kompetitor dikirim ke marketing@",
    spans: [
      { name: "Agen: Raka", kind: "agent", ms: 41200, detail: "Baca kompetitor.md lalu riset", children: [
        { name: "google_drive.read_file", kind: "tool", ms: 500, detail: "kompetitor.md · 5 nama" },
        { name: "web_search ×5", kind: "tool", ms: 21000, detail: "15 hasil relevan" },
        { name: "LLM: ringkas", kind: "llm", ms: 17800, tokens: 21000, detail: "anthropic/claude-haiku-5.5" },
        { name: "gmail.send", kind: "tool", ms: 900, detail: "Terkirim ke marketing@" },
      ] },
    ],
  },
  {
    id: "run_8d77", agentId: "sales-prep", source: "Automasi: Rekap CRM akhir hari", startedAt: "03 Nov 2026, 17.00", durationMs: 5200, tokens: 1900, cost: 0.012, status: "gagal",
    summary: "Token HubSpot kedaluwarsa — perlu hubungkan ulang",
    spans: [
      { name: "Agen: Sari", kind: "agent", ms: 5200, detail: "Rekap aktivitas hari ini", children: [
        { name: "hubspot.list_activities", kind: "tool", ms: 4100, detail: "Error 401: token kedaluwarsa" },
        { name: "LLM: laporkan error", kind: "llm", ms: 1100, tokens: 1900, detail: "Kirim notifikasi ke pemilik" },
      ] },
    ],
  },
  {
    id: "run_8d40", agentId: "sales-prep", source: "Slack: @Sari", startedAt: "03 Nov 2026, 14.22", durationMs: 9600, tokens: 6200, cost: 0.044, status: "sukses",
    summary: "Menjawab pertanyaan status deal PT Cahaya Retail",
    spans: [
      { name: "Agen: Sari", kind: "agent", ms: 9600, detail: "Pertanyaan dari Dewi A. di Slack", children: [
        { name: "hubspot.get_deal", kind: "tool", ms: 900, detail: "Tahap: Proposal" },
        { name: "LLM: jawab", kind: "llm", ms: 8300, tokens: 6200, detail: "Jawaban di thread" },
      ] },
    ],
  },
];

export type Integration = { name: string; category: string; description: string; connected: boolean; via: "MCP" | "Composio" | "Bawaan" };

export const integrations: Integration[] = [
  { name: "Gmail", category: "Komunikasi", description: "Baca, cari, dan kirim email.", connected: true, via: "Composio" },
  { name: "Slack", category: "Komunikasi", description: "Ngobrol dengan agen & kirim pesan ke kanal.", connected: true, via: "Bawaan" },
  { name: "WhatsApp Business", category: "Komunikasi", description: "Agen menjawab pelanggan di WhatsApp.", connected: true, via: "Bawaan" },
  { name: "Telegram", category: "Komunikasi", description: "Bot Telegram untuk setiap agen.", connected: true, via: "Bawaan" },
  { name: "Google Calendar", category: "Produktivitas", description: "Lihat dan buat jadwal.", connected: true, via: "Composio" },
  { name: "Google Drive", category: "Produktivitas", description: "Baca dan tulis dokumen.", connected: true, via: "Composio" },
  { name: "Notion", category: "Produktivitas", description: "Halaman, database, dan wiki.", connected: false, via: "MCP" },
  { name: "HubSpot", category: "CRM", description: "Kontak, deal, dan aktivitas.", connected: true, via: "Composio" },
  { name: "Salesforce", category: "CRM", description: "Akun, peluang, dan laporan.", connected: false, via: "Composio" },
  { name: "GitHub", category: "Engineering", description: "Issue, PR, dan repositori.", connected: false, via: "MCP" },
  { name: "Jira", category: "Engineering", description: "Tiket dan sprint.", connected: false, via: "Composio" },
  { name: "Web Search", category: "Riset", description: "Cari dan baca halaman web.", connected: true, via: "Bawaan" },
  { name: "Browser Agen", category: "Riset", description: "Komputer sendiri: browser + file system.", connected: true, via: "Bawaan" },
  { name: "Xendit", category: "Keuangan", description: "Invoice dan status pembayaran.", connected: false, via: "MCP" },
  { name: "Jurnal.id", category: "Keuangan", description: "Pembukuan dan laporan keuangan.", connected: false, via: "MCP" },
];

export const templates = [
  { name: "Persiapan panggilan sales", emoji: "📞", desc: "Brief otomatis dari kalender, email, dan CRM." },
  { name: "Pantau kompetitor", emoji: "🔭", desc: "Digest mingguan berita & harga kompetitor." },
  { name: "Balas lead masuk", emoji: "📥", desc: "Riset, skor, dan balas lead baru." },
  { name: "Asisten onboarding", emoji: "🧭", desc: "Jawab pertanyaan karyawan dari dokumen kebijakan." },
  { name: "Penagihan invoice", emoji: "🧾", desc: "Ingatkan pelanggan yang jatuh tempo via WhatsApp." },
  { name: "Triase tiket support", emoji: "🎧", desc: "Kategorikan dan jawab tiket umum." },
];

export const models = [
  "anthropic/claude-opus-5.5",
  "anthropic/claude-sonnet-5.5",
  "anthropic/claude-haiku-5.5",
  "openai/gpt-6.1-sol",
  "google/gemini-3.8-flash",
  "google/gemma-4-31b-it",
];

export function getAgent(id: string) {
  return agents.find((a) => a.id === id);
}

export const usd = (n: number) => `$${n.toFixed(n < 1 ? 3 : 2)}`;
