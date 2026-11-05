import type { CatalogCategory } from "./catalog";

// Katalog solusi (data contoh). Setiap solusi membuka katalog Agents yang sudah difilter ke kategori terkait.

export const industries = [
  "Enterprise",
  "Pemerintahan",
  "Keuangan",
  "Manufaktur",
  "Kesehatan",
  "Pendidikan",
  "Ritel & UMKM",
  "Logistik",
  "Lainnya",
] as const;

export type Industry = (typeof industries)[number];

export type SolutionIcon = "cx" | "ops" | "data" | "dev" | "hr" | "finance" | "gov" | "industry";

export type Solution = {
  slug: string;
  title: string;
  desc: string;
  tags: string[];
  industries: Industry[];
  icon: SolutionIcon;
  agentCategory: CatalogCategory;
};

export const solutions: Solution[] = [
  {
    slug: "customer-experience", title: "Customer Experience", icon: "cx", agentCategory: "Customer",
    desc: "Layanan pelanggan cerdas 24/7 berbasis AI Agent.", tags: ["Contact Center", "Self-service"],
    industries: ["Enterprise", "Keuangan", "Kesehatan", "Ritel & UMKM", "Logistik", "Pemerintahan"],
  },
  {
    slug: "operasional", title: "Operasional & Otomasi", icon: "ops", agentCategory: "Operations",
    desc: "Otomatisasi proses bisnis, workflow, dan monitoring.", tags: ["BPA", "RPA", "AIOps"],
    industries: ["Enterprise", "Manufaktur", "Logistik", "Ritel & UMKM"],
  },
  {
    slug: "data-analitik", title: "Data & Analitik", icon: "data", agentCategory: "Data & Analytics",
    desc: "Ubah data menjadi insight dan keputusan bisnis yang lebih cepat.", tags: ["BI", "Analytics", "Forecasting"],
    industries: ["Enterprise", "Keuangan", "Manufaktur", "Ritel & UMKM", "Kesehatan", "Pemerintahan"],
  },
  {
    slug: "developer", title: "Developer Productivity", icon: "dev", agentCategory: "IT & Developer",
    desc: "Percepat pengembangan aplikasi dengan AI untuk developer.", tags: ["Code Assistant", "DevOps"],
    industries: ["Enterprise", "Keuangan", "Lainnya"],
  },
  {
    slug: "hr-people", title: "HR & People", icon: "hr", agentCategory: "HR",
    desc: "Rekrutmen, onboarding, pelatihan, dan layanan karyawan berbasis AI.", tags: ["Talent", "Learning", "HR Service"],
    industries: ["Enterprise", "Pemerintahan", "Pendidikan", "Kesehatan"],
  },
  {
    slug: "finance-risk", title: "Finance & Risk", icon: "finance", agentCategory: "Finance",
    desc: "Otomatisasi proses keuangan, kontrol biaya, dan manajemen risiko.", tags: ["AP/AR", "Budgeting", "Compliance"],
    industries: ["Enterprise", "Keuangan", "Ritel & UMKM"],
  },
  {
    slug: "government", title: "Government Solution", icon: "gov", agentCategory: "Operations",
    desc: "Dukungan transformasi digital sektor publik yang aman dan terintegrasi.", tags: ["SPBE", "Layanan Publik", "Data"],
    industries: ["Pemerintahan", "Pendidikan"],
  },
  {
    slug: "industry", title: "Industry Solution", icon: "industry", agentCategory: "Operations",
    desc: "Solusi AI Agent khusus untuk kebutuhan industri (manufaktur, energi, logistik, dll).", tags: ["IoT", "Predictive Maintenance", "ESG"],
    industries: ["Manufaktur", "Logistik", "Lainnya"],
  },
];
