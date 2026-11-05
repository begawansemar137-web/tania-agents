import type { Industry } from "./solutions";

// Contoh use case (data contoh). Angka dampak adalah ilustrasi — ganti dengan hasil implementasi nyata.

export const useCaseFunctions = [
  "Customer Service",
  "Operasional",
  "Analitik",
  "HR & People",
  "Dokumen & Legal",
  "Layanan Publik",
  "Data & Insight",
  "Pendidikan",
] as const;

export type UseCaseFunction = (typeof useCaseFunctions)[number];

export type UseCaseIcon = "headset" | "hardhat" | "chart" | "users" | "gavel" | "landmark" | "store" | "graduation";

export type UseCase = {
  slug: string;
  title: string;
  desc: string;
  fn: UseCaseFunction;
  industry: Industry;
  metrics: { value: string; label: string }[];
  icon: UseCaseIcon;
  tone: [string, string]; // gradient warna thumbnail
  href: string;
};

export const useCases: UseCase[] = [
  {
    slug: "contact-center", title: "AI Contact Center Agent", fn: "Customer Service", industry: "Enterprise", icon: "headset", tone: ["#e9e3ff", "#c9bbff"],
    desc: "Layanan pelanggan 24/7 dengan AI Agent yang responsif dan akurat.",
    metrics: [{ value: "-40%", label: "Cost" }, { value: "+90%", label: "CSAT" }], href: "/app/agents/new?template=customer",
  },
  {
    slug: "maintenance", title: "AI Maintenance Agent", fn: "Operasional", industry: "Manufaktur", icon: "hardhat", tone: ["#fff1d6", "#ffd28a"],
    desc: "Prediksi dan penanganan maintenance secara proaktif.",
    metrics: [{ value: "-50%", label: "Downtime" }, { value: "+30%", label: "OEE" }], href: "/app/agents/new?template=operations",
  },
  {
    slug: "financial-analyst", title: "AI Financial Analyst", fn: "Analitik", industry: "Keuangan", icon: "chart", tone: ["#dceaff", "#a9c8ff"],
    desc: "Analisis laporan keuangan, proyeksi, dan insight risiko.",
    metrics: [{ value: "+5x", label: "Analisis Lebih Cepat" }], href: "/app/agents/new?template=finance",
  },
  {
    slug: "hr-assistant", title: "AI HR Assistant", fn: "HR & People", industry: "Enterprise", icon: "users", tone: ["#e3f6ff", "#b5e3ff"],
    desc: "Dukungan rekrutmen, onboarding, dan layanan karyawan.",
    metrics: [{ value: "-70%", label: "Waktu Proses" }, { value: "+60%", label: "Efisiensi" }], href: "/app/agents/hr-onboarding",
  },
  {
    slug: "legal-compliance", title: "AI Legal & Compliance Agent", fn: "Dokumen & Legal", industry: "Pemerintahan", icon: "gavel", tone: ["#f7e6d8", "#e0b48e"],
    desc: "Analisis regulasi, review kontrak, dan pemantauan kepatuhan.",
    metrics: [{ value: "-80%", label: "Waktu Review" }, { value: "+95%", label: "Akurasi" }], href: "/app/agents/new?template=compliance",
  },
  {
    slug: "government-service", title: "AI Government Service Agent", fn: "Layanan Publik", industry: "Pemerintahan", icon: "landmark", tone: ["#e6ecf7", "#bfcde8"],
    desc: "Asisten layanan publik digital yang cepat, konsisten, dan transparan.",
    metrics: [{ value: "+70%", label: "Kecepatan Layanan" }], href: "/app/agents/new?template=customer",
  },
  {
    slug: "umkm-insight", title: "AI Business Insight for UMKM", fn: "Data & Insight", industry: "Ritel & UMKM", icon: "store", tone: ["#ffe9dc", "#ffc29e"],
    desc: "Rekomendasi produk, promosi, dan analisis pelanggan untuk UMKM.",
    metrics: [{ value: "+25%", label: "Penjualan" }, { value: "+40%", label: "Repeat Order" }], href: "/app/agents/new?template=data",
  },
  {
    slug: "learning-assistant", title: "AI Learning Assistant", fn: "Pendidikan", industry: "Pendidikan", icon: "graduation", tone: ["#e3f7ec", "#ade3c4"],
    desc: "Asisten belajar personal, rangkuman materi, dan latihan interaktif.",
    metrics: [{ value: "+60%", label: "Engagement" }, { value: "+35%", label: "Hasil Belajar" }], href: "/app/agents/new?template=meeting",
  },
];
