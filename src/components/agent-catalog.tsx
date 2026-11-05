"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, BarChart3, Briefcase, CalendarCheck, ChevronDown, ChevronRight, CircleCheck, Code2, Database,
  FileText, Headphones, Headset, LayoutGrid, List, Megaphone, MessageSquare, Search, Settings, ShieldCheck,
  Sparkles, Target, Telescope, Users, Wallet, type LucideIcon,
} from "lucide-react";
import { Robot } from "@/components/landing/robot";
import { catalog, catalogCategories, type CatalogAgent, type CatalogCategory, type CatalogIcon } from "@/lib/catalog";

const agentIcons: Record<CatalogIcon, LucideIcon> = {
  sales: Headphones, marketing: Megaphone, customer: Headset, hr: Users, finance: Database, code: Code2,
  data: BarChart3, operations: Settings, compliance: ShieldCheck, lead: Target, research: Telescope, meeting: CalendarCheck,
};

const categoryIcons: Record<CatalogCategory, LucideIcon> = {
  Business: Briefcase, Productivity: CalendarCheck, "Data & Analytics": Database, "IT & Developer": Code2,
  Operations: Settings, Customer: Headphones, HR: Users, Finance: Wallet,
};

const sorts = {
  populer: { label: "Paling Populer", fn: (a: CatalogAgent, b: CatalogAgent) => b.popularity - a.popularity },
  terbaru: { label: "Terbaru", fn: (a: CatalogAgent, b: CatalogAgent) => b.added.localeCompare(a.added) },
  nama: { label: "Nama A–Z", fn: (a: CatalogAgent, b: CatalogAgent) => a.name.localeCompare(b.name) },
} as const;

type SortKey = keyof typeof sorts;

const benefits = ["Siap pakai & cepat di-deploy", "Terintegrasi dengan sistem Anda", "Aman & sesuai governance", "Dapat dikustomisasi (low-code)"];

const hrefFor = (a: CatalogAgent) => (a.agentId ? `/app/agents/${a.agentId}` : `/app/agents/new?template=${a.slug}`);

function AgentBadge({ badge }: { badge: CatalogAgent["badge"] }) {
  if (!badge) return null;
  const tone = badge === "Baru" ? "bg-ok-soft text-ok" : "bg-accent-soft text-accent";
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tone}`}>{badge}</span>;
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tag">
      {tags.map((t) => (
        <li key={t} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink/80">{t}</li>
      ))}
    </ul>
  );
}

function IconTile({ icon: Icon, size = "lg" }: { icon: LucideIcon; size?: "lg" | "md" }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent ${size === "lg" ? "h-16 w-16" : "h-12 w-12"}`}>
      <Icon size={size === "lg" ? 30 : 24} strokeWidth={1.7} aria-hidden="true" />
    </span>
  );
}

function AgentCard({ agent }: { agent: CatalogAgent }) {
  return (
    <Link
      href={hrefFor(agent)}
      className="group flex gap-4 rounded-2xl border border-line bg-surface p-5 shadow-[0_10px_30px_-24px_rgba(40,20,120,0.45)] transition hover:border-accent/50 hover:shadow-[0_14px_34px_-20px_rgba(74,47,208,0.45)]"
    >
      <IconTile icon={agentIcons[agent.icon]} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[17px] font-bold group-hover:text-accent">{agent.name}</h3>
          <AgentBadge badge={agent.badge} />
        </div>
        <p className="mt-1 text-sm text-muted">{agent.desc}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <Tags tags={agent.tags} />
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-ink transition group-hover:border-accent group-hover:bg-accent group-hover:text-surface">
            <ArrowRight size={15} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function AgentRow({ agent }: { agent: CatalogAgent }) {
  return (
    <Link href={hrefFor(agent)} className="group flex items-center gap-4 px-5 py-4 hover:bg-surface-2/60">
      <IconTile icon={agentIcons[agent.icon]} size="md" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-bold group-hover:text-accent">{agent.name}</h3>
          <AgentBadge badge={agent.badge} />
          <span className="text-xs text-muted">· {agent.category}</span>
        </div>
        <p className="mt-0.5 text-sm text-muted">{agent.desc}</p>
      </div>
      <div className="hidden lg:block">
        <Tags tags={agent.tags} />
      </div>
      <ChevronRight size={18} className="shrink-0 text-muted group-hover:text-accent" aria-hidden="true" />
    </Link>
  );
}

// Decorative tilted glass tiles that float around the robot.
function FloatTile({ icon: Icon, className }: { icon: LucideIcon; className: string }) {
  return (
    <span aria-hidden="true" className={`absolute grid place-items-center rounded-2xl border border-white/70 bg-gradient-to-br from-[#d9cfff]/90 to-[#b9a6ff]/70 text-white shadow-[0_12px_28px_-12px_rgba(74,47,208,0.55)] backdrop-blur ${className}`}>
      <Icon size={22} strokeWidth={2} />
    </span>
  );
}

export function AgentCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CatalogCategory | "all">("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<SortKey>("populer");

  // Links from /solusi open the catalog on a category via ?kategori=. Read it after mount so /app stays static.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("kategori");
    const match = catalogCategories.find((c) => c === param);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL on mount
    if (match) setCategory(match);
  }, []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog
      .filter((a) => category === "all" || a.category === category)
      .filter((a) => !q || [a.name, a.desc, a.category, a.brief, ...a.tags].some((s) => s.toLowerCase().includes(q)))
      .sort(sorts[sort].fn);
  }, [query, category, sort]);

  const chip = (selected: boolean) =>
    `inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium whitespace-nowrap transition ${
      selected ? "border-accent bg-accent text-surface shadow-[0_10px_24px_-14px_rgba(74,47,208,0.9)]" : "border-line bg-surface text-ink hover:border-accent/50"
    }`;

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute -top-8 -right-8 -z-10 h-[380px] w-[75%] bg-[radial-gradient(ellipse_at_top_right,var(--hero-glow),transparent_68%)]" />
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-ink">Beranda</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page" className="font-medium text-accent">Agents</span>
        </nav>

        <div className="mt-4 grid items-center gap-6 xl:grid-cols-[minmax(0,1fr)_220px_auto] 2xl:grid-cols-[minmax(0,1fr)_260px_auto]">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-[44px]">
              Katalog <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">AI Agents</span>
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] text-ink/80 sm:text-base">
              Kumpulan AI Agent siap pakai untuk berbagai fungsi bisnis. Pilih, gunakan, atau sesuaikan sesuai kebutuhan organisasi Anda.
            </p>
            <label className="mt-6 flex max-w-2xl items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 shadow-[0_8px_24px_-20px_rgba(40,20,120,0.6)] focus-within:border-accent">
              <Search size={20} className="text-muted" aria-hidden="true" />
              <span className="sr-only">Cari agent</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari agent (mis. sales, HR, invoice, support...)"
                className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted"
              />
            </label>
          </div>

          <div className="relative mx-auto hidden h-[230px] w-[230px] xl:block">
            <FloatTile icon={Sparkles} className="top-1 left-14 h-12 w-12 -rotate-12" />
            <FloatTile icon={MessageSquare} className="top-14 -left-4 h-12 w-12 rotate-6" />
            <FloatTile icon={FileText} className="top-[118px] left-6 h-11 w-11 -rotate-6" />
            <Robot className="absolute right-0 bottom-0 h-[210px] w-[210px]" />
          </div>

          <ul className="grid gap-3 rounded-2xl bg-surface/70 p-4 text-[15px] backdrop-blur sm:grid-cols-2 xl:grid-cols-1 xl:bg-transparent xl:p-0">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 font-medium">
                <CircleCheck size={22} className="shrink-0 fill-accent text-surface" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Filters */}
      <div className="mt-8 flex items-center gap-3">
        <div role="group" aria-label="Filter kategori" className="-mx-4 flex min-w-0 flex-1 gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          <button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")} className={chip(category === "all")}>
            Semua Agent
          </button>
          {catalogCategories.map((c) => {
            const Icon = categoryIcons[c];
            return (
              <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)} className={chip(category === c)}>
                <Icon size={18} strokeWidth={1.7} aria-hidden="true" /> {c}
              </button>
            );
          })}
        </div>
        <div role="group" aria-label="Tampilan" className="hidden shrink-0 gap-1.5 sm:flex">
          {([["grid", LayoutGrid, "Tampilan grid"], ["list", List, "Tampilan daftar"]] as const).map(([v, Icon, label]) => (
            <button
              key={v}
              type="button"
              aria-label={label}
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`grid h-11 w-11 place-items-center rounded-xl border ${view === v ? "border-accent bg-accent text-surface" : "border-line bg-surface text-ink hover:border-accent/50"}`}
            >
              <Icon size={19} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="text-muted" role="status">
          Menampilkan <span className="font-bold text-ink">{shown.length}</span> dari <span className="font-bold text-ink">{catalog.length}</span> agent
        </p>
        <label className="flex items-center gap-1 text-muted">
          Urutkan:
          <span className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="cursor-pointer appearance-none bg-transparent pr-6 font-semibold text-ink outline-none"
            >
              {Object.entries(sorts).map(([k, s]) => (
                <option key={k} value={k}>{s.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-ink" aria-hidden="true" />
          </span>
        </label>
      </div>

      {shown.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-line bg-surface px-6 py-12 text-center">
          <p className="font-semibold">Tidak ada agent yang cocok.</p>
          <p className="mt-1 text-sm text-muted">Coba kata kunci lain, atau buat agent sendiri.</p>
          <Link href="/app/agents/new" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-surface hover:bg-accent-strong">
            Buat Agent <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      ) : view === "grid" ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {shown.map((a) => <AgentCard key={a.slug} agent={a} />)}
        </div>
      ) : (
        <div className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {shown.map((a) => <AgentRow key={a.slug} agent={a} />)}
        </div>
      )}
    </div>
  );
}
