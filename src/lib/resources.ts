// Pusat resources. Setiap entri menunjuk ke halaman, dokumen, atau file yang benar-benar ada.

export const REPO = "https://github.com/begawansemar137-web/tania-agents";
const RAW = "https://raw.githubusercontent.com/begawansemar137-web/tania-agents/main";

export const resourceTypes = [
  "Dokumentasi",
  "Tutorial & Learning",
  "Template",
  "Tool & Integrasi",
  "Model & Dataset",
  "Best Practice",
  "Knowledge Base",
  "Komunitas",
] as const;

export type ResourceType = (typeof resourceTypes)[number];

export type Resource = {
  title: string;
  type: ResourceType;
  topics: string[];
  updated: string; // ISO date
  format: "doc" | "zip" | "link";
  action: "Buka" | "Unduh";
  href: string;
};

export const resources: Resource[] = [
  { title: "README — Panduan TANIA Agents", type: "Dokumentasi", topics: ["Developer", "Setup"], updated: "2026-11-05", format: "doc", action: "Buka", href: `${REPO}#readme` },
  { title: "Referensi API (Chat & Models)", type: "Dokumentasi", topics: ["API", "Streaming"], updated: "2026-11-05", format: "link", action: "Buka", href: "/developer#api" },
  { title: "Contoh konfigurasi .env", type: "Dokumentasi", topics: ["Setup", "ModelHub"], updated: "2026-11-05", format: "doc", action: "Unduh", href: `${RAW}/.env.example` },
  { title: "Quick Start Developer", type: "Tutorial & Learning", topics: ["Quick Start", "API"], updated: "2026-11-05", format: "link", action: "Buka", href: "/developer#quick-start" },
  { title: "Buat agen baru lewat obrolan", type: "Tutorial & Learning", topics: ["No-Code", "Agent Builder"], updated: "2026-11-05", format: "link", action: "Buka", href: "/app/agents/new" },
  { title: "Template: Customer Service Agent", type: "Template", topics: ["Customer Service", "FAQ"], updated: "2026-11-05", format: "link", action: "Buka", href: "/app/agents/customer" },
  { title: "Template: Sales Agent (Sari)", type: "Template", topics: ["Sales", "CRM"], updated: "2026-11-04", format: "link", action: "Buka", href: "/app/agents/sales-prep" },
  { title: "Katalog AI Agents", type: "Template", topics: ["Katalog", "12 agen"], updated: "2026-11-05", format: "link", action: "Buka", href: "/app" },
  { title: "Daftar integrasi aplikasi", type: "Tool & Integrasi", topics: ["Integrasi", "MCP"], updated: "2026-11-04", format: "link", action: "Buka", href: "/app/integrations" },
  { title: "Kode sumber TANIA Agents (ZIP)", type: "Tool & Integrasi", topics: ["Next.js", "AI SDK"], updated: "2026-11-05", format: "zip", action: "Unduh", href: `${REPO}/archive/refs/heads/main.zip` },
  { title: "Model yang tersedia di ModelHub", type: "Model & Dataset", topics: ["ModelHub", "API"], updated: "2026-11-05", format: "link", action: "Buka", href: "/api/models" },
  { title: "Izin & persetujuan untuk agen", type: "Best Practice", topics: ["Keamanan", "Governance"], updated: "2026-11-04", format: "link", action: "Buka", href: "/app/agents/sales-prep" },
  { title: "Pantau jejak & biaya setiap run", type: "Best Practice", topics: ["Monitoring", "Biaya"], updated: "2026-11-04", format: "link", action: "Buka", href: "/app/runs" },
  { title: "Katalog Use Case per industri", type: "Knowledge Base", topics: ["Use Case", "Industri"], updated: "2026-11-05", format: "link", action: "Buka", href: "/use-case" },
  { title: "Katalog Solusi enterprise", type: "Knowledge Base", topics: ["Solusi", "Industri"], updated: "2026-11-05", format: "link", action: "Buka", href: "/solusi" },
  { title: "Diskusi & laporan isu di GitHub", type: "Komunitas", topics: ["GitHub", "Feedback"], updated: "2026-11-05", format: "link", action: "Buka", href: `${REPO}/issues` },
];

export const quickLinks = [
  { label: "Developer Portal", href: "/developer" },
  { label: "API Reference", href: "/developer#api" },
  { label: "Riwayat Perubahan", href: `${REPO}/commits/main` },
  { label: "Laporkan Masalah", href: `${REPO}/issues/new` },
  { label: "Kode Sumber", href: REPO },
];

export const downloads = [
  { label: "Kode sumber (ZIP)", href: `${REPO}/archive/refs/heads/main.zip` },
  { label: "README.md", href: `${RAW}/README.md` },
  { label: "Contoh .env", href: `${RAW}/.env.example` },
];
