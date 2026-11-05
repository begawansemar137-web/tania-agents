"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight, BarChart3, Building2, ChevronDown, Database, Ellipsis, Factory, Filter, Gavel, GraduationCap, HardHat,
  Headset, HeartPulse, Landmark, LayoutGrid, Search, Store, TrendingUp, Truck, UserRound, type LucideIcon,
} from "lucide-react";
import { industries, type Industry } from "@/lib/solutions";
import { useCaseFunctions, useCases, type UseCase, type UseCaseFunction, type UseCaseIcon } from "@/lib/use-cases";

const thumbIcons: Record<UseCaseIcon, LucideIcon> = {
  headset: Headset, hardhat: HardHat, chart: BarChart3, users: UserRound, gavel: Gavel, landmark: Landmark, store: Store, graduation: GraduationCap,
};

const industryIcons: Record<Industry, LucideIcon> = {
  Enterprise: Building2, Pemerintahan: Landmark, Keuangan: Database, Manufaktur: Factory, Kesehatan: HeartPulse,
  Pendidikan: GraduationCap, "Ritel & UMKM": Store, Logistik: Truck, Lainnya: Ellipsis,
};

// Illustrated thumbnail (fixed light palette so it reads the same in dark mode).
function Thumb({ uc }: { uc: UseCase }) {
  const Icon = thumbIcons[uc.icon];
  return (
    <div
      aria-hidden="true"
      className="relative grid h-[128px] w-[96px] shrink-0 place-items-center overflow-hidden rounded-xl"
      style={{ background: `linear-gradient(150deg, ${uc.tone[0]}, ${uc.tone[1]})` }}
    >
      <span className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-white/40" />
      <span className="absolute -bottom-8 -left-5 h-20 w-20 rounded-full bg-white/30" />
      <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white/80 text-[#3a2a8f] shadow-[0_10px_24px_-12px_rgba(40,20,120,0.5)]">
        <Icon size={30} strokeWidth={1.6} />
      </span>
    </div>
  );
}

function UseCaseCard({ uc }: { uc: UseCase }) {
  return (
    <Link
      href={uc.href}
      className="group flex gap-3.5 rounded-2xl border border-line bg-surface p-2.5 pr-3.5 shadow-[0_10px_30px_-24px_rgba(40,20,120,0.45)] transition hover:border-accent/50 hover:shadow-[0_14px_34px_-20px_rgba(74,47,208,0.45)]"
    >
      <Thumb uc={uc} />
      <div className="flex min-w-0 flex-1 flex-col py-1">
        <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-accent">{uc.fn}</span>
          <span className="rounded-full border border-line px-2 py-0.5 text-accent">{uc.industry}</span>
        </div>
        <h3 className="mt-2 text-base leading-snug font-bold group-hover:text-accent">{uc.title}</h3>
        <p className="mt-1 text-sm text-muted">{uc.desc}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <ul className="flex flex-wrap gap-1" aria-label="Dampak">
            {uc.metrics.map((m, i) => (
              <li key={m.label} className="inline-flex items-center gap-1 rounded-full bg-ok-soft px-2 py-1 text-[11px] whitespace-nowrap text-ok">
                {i === 0 && <TrendingUp size={13} aria-hidden="true" />}
                <span className="font-bold">{m.value}</span> {m.label}
              </li>
            ))}
          </ul>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-soft text-accent transition group-hover:bg-accent group-hover:text-surface">
            <ArrowRight size={15} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function UseCaseCatalog() {
  const [industry, setIndustry] = useState<Industry | "all">("all");
  const [fn, setFn] = useState<UseCaseFunction | "all">("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c = new Map<Industry, number>();
    for (const u of useCases) c.set(u.industry, (c.get(u.industry) ?? 0) + 1);
    return c;
  }, []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return useCases
      .filter((u) => industry === "all" || u.industry === industry)
      .filter((u) => fn === "all" || u.fn === fn)
      .filter((u) => !q || [u.title, u.desc, u.fn, u.industry].some((x) => x.toLowerCase().includes(q)));
  }, [industry, fn, query]);

  const chip = (selected: boolean) =>
    `inline-flex shrink-0 items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium whitespace-nowrap transition ${
      selected ? "border-accent bg-accent text-surface shadow-[0_10px_24px_-14px_rgba(74,47,208,0.9)]" : "border-line bg-surface text-ink hover:border-accent/50"
    }`;

  return (
    <div>
      <div role="group" aria-label="Filter industri" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        <button type="button" aria-pressed={industry === "all"} onClick={() => setIndustry("all")} className={chip(industry === "all")}>
          <LayoutGrid size={19} strokeWidth={1.7} aria-hidden="true" /> Semua Industri ({useCases.length})
        </button>
        {industries.filter((i) => counts.has(i)).map((i) => {
          const Icon = industryIcons[i];
          return (
            <button key={i} type="button" aria-pressed={industry === i} onClick={() => setIndustry(i)} className={chip(industry === i)}>
              <Icon size={19} strokeWidth={1.7} aria-hidden="true" /> {i} ({counts.get(i)})
            </button>
          );
        })}
      </div>

      <div id="daftar" className="mt-9 flex scroll-mt-24 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Daftar Use Case</h2>
          <p className="mt-1.5 text-[15px] text-ink/80">Temukan contoh penerapan AI Agent sesuai industri, fungsi, dan kebutuhan bisnis Anda.</p>
        </div>
        <div className="flex w-full gap-2 lg:max-w-[720px]">
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 focus-within:border-accent">
            <Search size={19} className="text-muted" aria-hidden="true" />
            <span className="sr-only">Cari use case</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari use case (mis. otomatisasi, customer service, analisis...)"
              className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted"
            />
          </label>
          <label className="relative flex shrink-0 items-center gap-2 rounded-xl border border-line bg-surface pr-3 pl-4 text-sm font-semibold focus-within:border-accent">
            <Filter size={17} aria-hidden="true" />
            <span className="sr-only">Filter fungsi</span>
            <select
              value={fn}
              onChange={(e) => setFn(e.target.value as UseCaseFunction | "all")}
              className="w-[5.5rem] cursor-pointer appearance-none truncate bg-transparent py-3 pr-6 outline-none sm:w-auto"
            >
              <option value="all">Filter</option>
              {useCaseFunctions.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3" aria-hidden="true" />
          </label>
        </div>
      </div>

      <p className="sr-only" role="status">{shown.length} use case ditampilkan</p>
      {shown.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line bg-surface px-6 py-12 text-center">
          <p className="font-semibold">Tidak ada use case yang cocok.</p>
          <p className="mt-1 text-sm text-muted">Coba kata kunci lain, atau ubah filter industri dan fungsi.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {shown.map((uc) => <UseCaseCard key={uc.slug} uc={uc} />)}
        </div>
      )}
      <p className="mt-6 text-xs text-muted">Angka dampak pada kartu adalah contoh ilustrasi, bukan hasil pelanggan tertentu.</p>
    </div>
  );
}
