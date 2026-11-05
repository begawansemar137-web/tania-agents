// Katalog agen siap pakai (data contoh). Agen yang sudah punya studio menautkan `agentId`;
// sisanya dibuka sebagai template di /app/agents/new.

export const catalogCategories = [
  "Business",
  "Productivity",
  "Data & Analytics",
  "IT & Developer",
  "Operations",
  "Customer",
  "HR",
  "Finance",
] as const;

export type CatalogCategory = (typeof catalogCategories)[number];

export type CatalogIcon =
  | "sales" | "marketing" | "customer" | "hr" | "finance" | "code"
  | "data" | "operations" | "compliance" | "lead" | "research" | "meeting";

export type CatalogAgent = {
  slug: string;
  name: string;
  desc: string;
  tags: string[];
  category: CatalogCategory;
  icon: CatalogIcon;
  badge?: "Populer" | "Baru";
  popularity: number; // makin besar makin populer
  added: string; // ISO date
  agentId?: string; // studio yang sudah ada
  brief: string; // deskripsi awal saat dibuat dari template
};

export const catalog: CatalogAgent[] = [
  {
    slug: "sales", name: "Sales Agent", badge: "Populer", category: "Business", icon: "sales", popularity: 98, added: "2026-09-02", agentId: "sales-prep",
    desc: "Membantu prospek, menjawab pertanyaan produk, dan mendukung proses penjualan.", tags: ["Sales", "CRM", "Lead"],
    brief: "Siapkan brief prospek sebelum setiap panggilan sales.",
  },
  {
    slug: "marketing", name: "Marketing Agent", category: "Business", icon: "marketing", popularity: 90, added: "2026-09-10",
    desc: "Menyusun konten, kampanye, dan analisis performa pemasaran.", tags: ["Marketing", "Content", "Campaign"],
    brief: "Setiap minggu, susun ide konten dan ringkas performa kampanye ke tim marketing.",
  },
  {
    slug: "customer", name: "Customer Agent", badge: "Populer", category: "Customer", icon: "customer", popularity: 96, added: "2026-09-05",
    desc: "Menangani pertanyaan, keluhan, dan permintaan layanan pelanggan 24/7.", tags: ["Support", "Ticket", "FAQ"],
    brief: "Jawab pertanyaan pelanggan dari FAQ dan buat tiket untuk keluhan yang belum terjawab.",
  },
  {
    slug: "hr", name: "HR Agent", category: "HR", icon: "hr", popularity: 88, added: "2026-09-18", agentId: "hr-onboarding",
    desc: "Mendukung proses rekrutmen, onboarding, admin HR, dan layanan karyawan.", tags: ["Rekrutmen", "Employee Service", "Policy"],
    brief: "Jawab pertanyaan karyawan baru dari dokumen kebijakan HR.",
  },
  {
    slug: "finance", name: "Finance Agent", category: "Finance", icon: "finance", popularity: 84, added: "2026-09-22",
    desc: "Membantu analisis biaya, laporan, dan proses keuangan rutin.", tags: ["AP/AR", "Budgeting", "Reporting"],
    brief: "Ingatkan invoice yang jatuh tempo dan siapkan rekap biaya per departemen setiap akhir bulan.",
  },
  {
    slug: "it-dev", name: "IT & Dev Agent", badge: "Baru", category: "IT & Developer", icon: "code", popularity: 80, added: "2026-11-01",
    desc: "Membantu troubleshooting, manajemen tiket, dan dukungan pengembangan aplikasi.", tags: ["IT Support", "DevOps", "Code Assistant"],
    brief: "Triase tiket IT yang masuk dan sarankan langkah perbaikan awal.",
  },
  {
    slug: "data", name: "Data Agent", category: "Data & Analytics", icon: "data", popularity: 86, added: "2026-09-28",
    desc: "Mengolah, menganalisis, dan menyajikan insight dari data bisnis Anda.", tags: ["Data Analysis", "Dashboard", "Insight"],
    brief: "Setiap Senin, ringkas metrik penjualan minggu lalu dan tandai perubahan besar.",
  },
  {
    slug: "operations", name: "Operations Agent", category: "Operations", icon: "operations", popularity: 78, added: "2026-10-04",
    desc: "Mengotomasi proses operasional, monitoring, dan koordinasi aktivitas harian.", tags: ["Automation", "Monitoring", "Workflow"],
    brief: "Pantau status pesanan harian dan laporkan yang terlambat ke kanal #ops.",
  },
  {
    slug: "compliance", name: "Compliance Agent", category: "Operations", icon: "compliance", popularity: 74, added: "2026-10-12",
    desc: "Membantu cek kepatuhan, regulasi, dan manajemen risiko bisnis.", tags: ["Regulasi", "Audit", "Risk"],
    brief: "Periksa dokumen kontrak baru terhadap daftar cek kepatuhan perusahaan.",
  },
  {
    slug: "lead", name: "Lead Agent", category: "Business", icon: "lead", popularity: 82, added: "2026-10-20", agentId: "inbound-lead",
    desc: "Meriset, mengkualifikasi, dan membalas setiap lead baru dari website.", tags: ["Lead", "ICP", "Follow-up"],
    brief: "Riset dan beri skor setiap lead baru, lalu siapkan balasan personal.",
  },
  {
    slug: "market-research", name: "Market Research Agent", category: "Data & Analytics", icon: "research", popularity: 76, added: "2026-10-08", agentId: "competitor-watch",
    desc: "Merangkum berita, rilis produk, dan perubahan harga kompetitor.", tags: ["Kompetitor", "Riset", "Digest"],
    brief: "Setiap Senin pagi, rangkum kabar kompetitor dan kirim ke tim marketing.",
  },
  {
    slug: "meeting", name: "Meeting Agent", badge: "Baru", category: "Productivity", icon: "meeting", popularity: 72, added: "2026-11-03",
    desc: "Meringkas rapat, mencatat keputusan, dan mengirim daftar tindak lanjut.", tags: ["Notulen", "Kalender", "Action Item"],
    brief: "Setelah setiap rapat, ringkas keputusan dan kirim daftar tindak lanjut ke peserta.",
  },
];

export const getCatalogAgent = (slug: string) => catalog.find((a) => a.slug === slug);
