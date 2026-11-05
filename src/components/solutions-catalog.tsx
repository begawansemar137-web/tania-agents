"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight, Building2, ClipboardList, Code2, Coins, Database, Ellipsis, Factory, GraduationCap, HeartPulse,
  Headset, Landmark, LayoutGrid, Search, Sprout, Store, TrendingUp, Truck, Users, type LucideIcon,
} from "lucide-react";
import { industries, solutions, type Industry, type Solution, type SolutionIcon } from "@/lib/solutions";

const solutionIcons: Record<SolutionIcon, { icon: LucideIcon; color: string }> = {
  cx: { icon: Headset, color: "#6d4cff" },
  ops: { icon: ClipboardList, color: "#7b4dff" },
  data: { icon: TrendingUp, color: "#2f6bff" },
  dev: { icon: Code2, color: "#7b3fe4" },
  hr: { icon: Users, color: "#3b6cf6" },
  finance: { icon: Coins, color: "#6a45e0" },
  gov: { icon: Landmark, color: "#3557d6" },
  industry: { icon: Sprout, color: "#2f9e57" },
};

const industryIcons: Record<Industry, LucideIcon> = {
  Enterprise: Building2, Pemerintahan: Landmark, Keuangan: Database, Manufaktur: Factory, Kesehatan: HeartPulse,
  Pendidikan: GraduationCap, "Ritel & UMKM": Store, Logistik: Truck, Lainnya: Ellipsis,
};

function SolutionCard({ s }: { s: Solution }) {
  const { icon: Icon, color } = solutionIcons[s.icon];
  return (
    <Link
      href={`/app?kategori=${encodeURIComponent(s.agentCategory)}`}
      className="group flex gap-3.5 rounded-2xl border border-line bg-surface p-4 shadow-[0_10px_30px_-24px_rgba(40,20,120,0.45)] transition hover:border-accent/50 hover:shadow-[0_14px_34px_-20px_rgba(74,47,208,0.45)]"
    >
      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-accent-soft/70" style={{ color }}>
        <Icon size={32} strokeWidth={1.6} aria-hidden="true" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-[17px] font-bold group-hover:text-accent">{s.title}</h3>
        <p className="mt-1 text-sm text-muted">{s.desc}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <ul className="flex flex-wrap gap-1.5" aria-label="Tag">
            {s.tags.map((t) => (
              <li key={t} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink/80">{t}</li>
            ))}
          </ul>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition group-hover:border-accent group-hover:bg-accent group-hover:text-surface">
            <ArrowRight size={16} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function SolutionsCatalog() {
  const [industry, setIndustry] = useState<Industry | "all">("all");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return solutions
      .filter((s) => industry === "all" || s.industries.includes(industry))
      .filter((s) => !q || [s.title, s.desc, ...s.tags].some((x) => x.toLowerCase().includes(q)));
  }, [industry, query]);

  const chip = (selected: boolean) =>
    `inline-flex shrink-0 items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium whitespace-nowrap transition xl:flex-1 xl:justify-center xl:px-3 ${
      selected ? "border-accent bg-accent text-surface shadow-[0_10px_24px_-14px_rgba(74,47,208,0.9)]" : "border-line bg-surface text-ink hover:border-accent/50"
    }`;

  return (
    <div id="industri" className="scroll-mt-24">
      <div role="group" aria-label="Filter industri" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        <button type="button" aria-pressed={industry === "all"} onClick={() => setIndustry("all")} className={chip(industry === "all")}>
          <LayoutGrid size={19} strokeWidth={1.7} aria-hidden="true" /> Semua Solusi
        </button>
        {industries.map((i) => {
          const Icon = industryIcons[i];
          return (
            <button key={i} type="button" aria-pressed={industry === i} onClick={() => setIndustry(i)} className={chip(industry === i)}>
              <Icon size={19} strokeWidth={1.7} aria-hidden="true" /> {i}
            </button>
          );
        })}
      </div>

      <div id="katalog" className="mt-10 flex scroll-mt-24 flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Katalog Solusi</h2>
          <p className="mt-1.5 text-[15px] text-ink/80">Temukan solusi AI Agent yang sesuai dengan kebutuhan organisasi Anda.</p>
        </div>
        <label className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 focus-within:border-accent md:max-w-[580px]">
          <Search size={19} className="text-muted" aria-hidden="true" />
          <span className="sr-only">Cari solusi</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari solusi (mis. otomatisasi, layanan pelanggan, analitik...)"
            className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted"
          />
        </label>
      </div>

      <p className="sr-only" role="status">{shown.length} solusi ditampilkan</p>
      {shown.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line bg-surface px-6 py-12 text-center">
          <p className="font-semibold">Tidak ada solusi yang cocok.</p>
          <p className="mt-1 text-sm text-muted">Coba kata kunci lain atau pilih industri berbeda.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {shown.map((s) => <SolutionCard key={s.slug} s={s} />)}
        </div>
      )}
    </div>
  );
}
