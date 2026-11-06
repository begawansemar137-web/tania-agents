"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight, Award, BookOpen, ChevronDown, Code2, Database, Download, ExternalLink, FileArchive, FileText, Filter,
  GraduationCap, Home, Layers, LayoutGrid, Lightbulb, Link2, PlayCircle, RefreshCw, Rocket, Search, Star, Users,
  Wrench, type LucideIcon,
} from "lucide-react";
import { LogoMark } from "./brand";
import { Robot } from "./landing/robot";
import { downloads, quickLinks, REPO, resources, resourceTypes, type Resource, type ResourceType } from "@/lib/resources";

const typeIcons: Record<ResourceType, LucideIcon> = {
  Dokumentasi: FileText, "Tutorial & Learning": GraduationCap, Template: LayoutGrid, "Tool & Integrasi": Wrench,
  "Model & Dataset": Database, "Best Practice": Star, "Knowledge Base": Lightbulb, Komunitas: Users,
};

const highlights: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: BookOpen, title: "Lengkap & Terstruktur", desc: "Dokumen, panduan, dan contoh siap pakai" },
  { icon: Layers, title: "Praktis & Implementatif", desc: "Dari konsep hingga deployment" },
  { icon: RefreshCw, title: "Selalu Terbaru", desc: "Mengikuti setiap pembaruan di repositori" },
];

const featured: { badge: string; title: string; desc: string; href: string; icon: LucideIcon; tone: string }[] = [
  { badge: "Guide", title: "Panduan Lengkap Membangun AI Agent", desc: "Dari setup, konfigurasi model, hingga deployment.", href: `${REPO}#readme`, icon: Layers, tone: "from-[#b9a4ff] to-[#6a45f0]" },
  { badge: "Template", title: "Katalog AI Agents untuk Enterprise", desc: "Agen siap pakai untuk berbagai fungsi bisnis.", href: "/app", icon: LayoutGrid, tone: "from-[#c7d4ff] to-[#7d93f0]" },
  { badge: "Tutorial", title: "Quick Start Developer", desc: "Panggil agen dari aplikasi Anda lewat API.", href: "/developer#quick-start", icon: Rocket, tone: "from-[#d6c6ff] to-[#8a68ff]" },
  { badge: "Best Practice", title: "Contoh Penerapan per Industri", desc: "Use case untuk pemerintahan, keuangan, dan lainnya.", href: "/use-case", icon: Award, tone: "from-[#cdbdff] to-[#7b4dff]" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

const isExternal = (href: string) => href.startsWith("http") || href.startsWith("/api/");
const ext = (href: string) => (isExternal(href) ? { target: "_blank", rel: "noreferrer" } : {});

function FormatIcon({ format }: { format: Resource["format"] }) {
  if (format === "zip") return <FileArchive size={20} className="shrink-0 text-warn" aria-label="ZIP" />;
  if (format === "doc") return <FileText size={20} className="shrink-0 text-danger" aria-label="Dokumen" />;
  return <Link2 size={20} className="shrink-0 text-accent" aria-label="Tautan" />;
}

function FloatTile({ icon: Icon, className }: { icon: LucideIcon; className: string }) {
  return (
    <span aria-hidden="true" className={`absolute grid place-items-center rounded-2xl border border-white/70 bg-gradient-to-br from-[#e2d9ff] to-[#a58bff] text-white shadow-[0_16px_30px_-14px_rgba(74,47,208,0.7)] ${className}`}>
      <Icon size={24} strokeWidth={2} />
    </span>
  );
}

export function ResourcesView() {
  const [type, setType] = useState<ResourceType | "all">("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c = new Map<ResourceType, number>();
    for (const r of resources) c.set(r.type, (c.get(r.type) ?? 0) + 1);
    return c;
  }, []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources
      .filter((r) => type === "all" || r.type === type)
      .filter((r) => !q || [r.title, r.type, ...r.topics].some((x) => x.toLowerCase().includes(q)));
  }, [type, query]);

  function pick(t: ResourceType | "all", scroll = true) {
    setType(t);
    if (scroll) document.getElementById("library")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  const sideItems: { key: ResourceType | "all"; label: string; icon: LucideIcon }[] = [
    { key: "all", label: "Overview", icon: Home },
    ...resourceTypes.map((t) => ({ key: t, label: t, icon: typeIcons[t] })),
  ];

  return (
    <div className="mx-auto flex max-w-[1680px] flex-col lg:flex-row">
      {/* Mobile section nav */}
      <nav aria-label="Menu resources" className="sticky top-[72px] z-30 flex gap-1 overflow-x-auto border-b border-line bg-surface px-4 py-2 lg:hidden">
        {sideItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            aria-pressed={type === key}
            onClick={() => pick(key, key !== "all")}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm ${type === key ? "bg-accent-soft font-semibold text-accent" : "text-muted"}`}
          >
            <Icon size={16} aria-hidden="true" /> {label}
          </button>
        ))}
      </nav>

      {/* Desktop sidebar */}
      <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] w-[256px] shrink-0 flex-col gap-6 overflow-y-auto border-r border-line bg-surface px-4 py-6 lg:flex">
        <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-3 shadow-[0_8px_24px_-18px_rgba(40,20,120,0.5)]">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft">
            <LogoMark size={24} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold">TANIA Resources</p>
            <p className="text-[11px] whitespace-nowrap text-muted">Dokumen • Tools • Learning</p>
          </div>
        </div>
        <nav aria-label="Menu resources" className="flex flex-col gap-1">
          {sideItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              aria-pressed={type === key}
              onClick={() => pick(key, key !== "all")}
              className={`flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-left text-[15px] transition-colors ${
                type === key ? "bg-accent-soft font-semibold text-accent" : "font-medium text-ink hover:bg-surface-2"
              }`}
            >
              <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <main id="konten" className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute -top-6 -right-8 -z-10 h-[400px] w-[75%] bg-[radial-gradient(ellipse_at_top_right,var(--hero-glow),transparent_68%)]" />
          <div className="grid items-center gap-6 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_320px_360px]">
            <div>
              <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">Resources TANIA</span>
              <h1 className="mt-3 text-[36px] leading-[1.1] font-extrabold tracking-tight sm:text-[42px]">
                Pusat Sumber Daya <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">TANIA</span> Agents
              </h1>
              <p className="mt-3 max-w-xl text-[15px] text-ink/85 sm:text-base">
                Kumpulan dokumentasi, panduan, template, tools, dan materi pembelajaran untuk membangun, mengoperasikan, dan mengoptimalkan AI Agent di organisasi Anda.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button type="button" onClick={() => pick("all")} className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-[15px] font-semibold text-surface hover:bg-accent-strong">
                  Jelajahi Resources <ArrowRight size={18} aria-hidden="true" />
                </button>
                <Link href="/developer#quick-start" className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-6 py-3 text-[15px] font-semibold hover:border-accent">
                  <PlayCircle size={20} aria-hidden="true" /> Mulai dari Panduan
                </Link>
              </div>
            </div>

            <div className="relative mx-auto hidden h-[250px] w-[320px] 2xl:block">
              <FloatTile icon={Code2} className="top-0 left-[56px] h-14 w-14 -rotate-6" />
              <FloatTile icon={Layers} className="top-[64px] left-0 h-14 w-14 rotate-3" />
              <FloatTile icon={PlayCircle} className="top-[96px] left-[78px] h-12 w-12 -rotate-3" />
              <FloatTile icon={GraduationCap} className="top-[150px] left-[8px] h-14 w-14 rotate-6" />
              <Robot className="absolute right-0 bottom-0 h-[240px] w-[240px]" />
            </div>

            <ul className="grid gap-2.5 sm:grid-cols-3 xl:grid-cols-1">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex items-center gap-3.5 rounded-2xl border border-line/70 bg-surface/90 px-4 py-3 shadow-[0_10px_30px_-22px_rgba(40,20,120,0.6)] backdrop-blur">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold">{title}</p>
                    <p className="text-sm text-muted">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Type tiles */}
        <div role="group" aria-label="Tipe resources" className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-5 2xl:grid-cols-9">
          {sideItems.map(({ key, label, icon: Icon }) => {
            const selected = type === key;
            const n = key === "all" ? resources.length : (counts.get(key) ?? 0);
            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                onClick={() => pick(key, false)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border px-1.5 py-3 text-center text-[13px] leading-tight transition ${
                  selected ? "border-accent/40 bg-accent-soft font-semibold text-accent" : "border-line bg-surface font-medium hover:border-accent/40"
                }`}
              >
                {key === "all" ? <BookOpen size={24} strokeWidth={1.6} aria-hidden="true" /> : <Icon size={24} strokeWidth={1.6} aria-hidden="true" />}
                <span>{key === "all" ? "Semua Resources" : label}</span>
                <span className="text-xs opacity-80">({n})</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-5 2xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            {/* Featured */}
            <h2 className="text-2xl font-extrabold tracking-tight">Pilihan Utama</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {featured.map(({ badge, title, desc, href, icon: Icon, tone }) => (
                <Link
                  key={title}
                  href={href}
                  {...ext(href)}
                  className="group flex gap-3 rounded-2xl border border-line bg-gradient-to-br from-surface to-accent-soft/50 p-3.5 transition hover:border-accent/50"
                >
                  <span aria-hidden="true" className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-[0_12px_24px_-12px_rgba(74,47,208,0.7)] ${tone}`}>
                    <Icon size={24} strokeWidth={1.8} />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="self-start rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold text-surface">{badge}</span>
                    <p className="mt-1.5 text-[15px] leading-snug font-bold group-hover:text-accent">{title}</p>
                    <p className="mt-1 text-xs text-muted">{desc}</p>
                    <span className="mt-2 grid h-7 w-7 place-items-center self-end rounded-full border border-line transition group-hover:border-accent group-hover:bg-accent group-hover:text-surface">
                      <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Library */}
            <div id="library" className="mt-8 flex scroll-mt-36 lg:scroll-mt-24 flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-extrabold tracking-tight">Library Resources</h2>
              <div className="flex w-full gap-2 md:max-w-[620px]">
                <label className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 focus-within:border-accent">
                  <Search size={18} className="text-muted" aria-hidden="true" />
                  <span className="sr-only">Cari resources</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari resources (mis. API, integrasi, template...)"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
                  />
                </label>
                <label className="relative flex shrink-0 items-center gap-2 rounded-xl border border-line bg-surface pr-3 pl-3.5 text-sm font-semibold focus-within:border-accent">
                  <Filter size={16} aria-hidden="true" />
                  <span className="sr-only">Tipe resource</span>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as ResourceType | "all")}
                    className="w-[6.5rem] cursor-pointer appearance-none truncate bg-transparent py-2.5 pr-6 outline-none sm:w-auto"
                  >
                    <option value="all">Semua Tipe</option>
                    {resourceTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-3" aria-hidden="true" />
                </label>
              </div>
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="hidden grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,0.9fr)_96px] gap-3 border-b border-line bg-surface-2/60 px-4 py-2.5 text-xs font-semibold text-muted md:grid">
                <span>Nama Resource</span><span>Tipe</span><span>Topik</span><span>Terakhir Diupdate</span><span>Aksi</span>
              </div>
              {shown.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-muted">Tidak ada resource yang cocok. Coba kata kunci atau tipe lain.</p>
              ) : (
                <ul className="divide-y divide-line">
                  {shown.map((r) => (
                    <li key={r.title} className="grid gap-2 px-4 py-3 md:grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,0.9fr)_96px] md:items-center md:gap-3">
                      <span className="flex min-w-0 items-center gap-2.5 text-sm font-semibold">
                        <FormatIcon format={r.format} />
                        <span className="truncate">{r.title}</span>
                      </span>
                      <span><span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">{r.type}</span></span>
                      <span className="flex flex-wrap gap-1">
                        {r.topics.map((t) => (
                          <span key={t} className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-medium text-ink/80">{t}</span>
                        ))}
                      </span>
                      <span className="text-sm text-muted md:text-ink">{fmtDate(r.updated)}</span>
                      <Link
                        href={r.href}
                        {...ext(r.href)}
                        className="inline-flex items-center justify-center gap-1.5 justify-self-start rounded-lg border border-line px-3 py-1.5 text-sm font-semibold text-accent hover:border-accent md:justify-self-stretch"
                      >
                        {r.action === "Unduh" ? <Download size={15} aria-hidden="true" /> : <ExternalLink size={15} aria-hidden="true" />}
                        {r.action}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="grid content-start gap-4 sm:grid-cols-2 2xl:grid-cols-1">
            <section aria-labelledby="ql-title" className="rounded-2xl border border-line bg-surface p-4">
              <h2 id="ql-title" className="flex items-center gap-2 text-lg font-bold">
                <Link2 size={20} className="text-accent" aria-hidden="true" /> Quick Links
              </h2>
              <ul className="mt-3 divide-y divide-line">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} {...ext(l.href)} className="flex items-center gap-2.5 py-2.5 text-sm font-medium hover:text-accent">
                      <FileText size={16} className="text-muted" aria-hidden="true" />
                      <span className="flex-1">{l.label}</span>
                      <ExternalLink size={15} className="text-accent" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="dl-title" className="rounded-2xl border border-line bg-surface p-4">
              <h2 id="dl-title" className="flex items-center gap-2 text-lg font-bold">
                <Download size={20} className="text-accent" aria-hidden="true" /> Unduhan Populer
              </h2>
              <ul className="mt-3 divide-y divide-line">
                {downloads.map((d) => (
                  <li key={d.label}>
                    <a href={d.href} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 py-2.5 text-sm font-medium hover:text-accent">
                      <FileText size={16} className="text-muted" aria-hidden="true" />
                      <span className="flex-1">{d.label}</span>
                      <Download size={16} className="text-accent" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
