import Link from "next/link";
import { ChevronDown, Menu, Search } from "lucide-react";
import { Logo } from "@/components/brand";

type NavItem = { label: string; href?: string; children?: { label: string; href: string; desc: string }[] };

const nav: NavItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Agents",
    children: [
      { label: "Semua agen", href: "/app", desc: "Lihat dan kelola agen tim Anda" },
      { label: "Studio agen", href: "/app/agents/sales-prep", desc: "Atur model, instruksi, dan izin" },
      { label: "Automasi", href: "/app/automations", desc: "Jalankan agen sesuai jadwal" },
    ],
  },
  {
    label: "Solusi",
    children: [
      { label: "Sales & pemasaran", href: "#kategori", desc: "Riset prospek dan follow-up" },
      { label: "HR & operasional", href: "#kategori", desc: "Onboarding dan proses internal" },
      { label: "Layanan pelanggan", href: "#kategori", desc: "Triase dan jawab tiket" },
    ],
  },
  { label: "Use Case", href: "#template" },
  { label: "Developer", href: "/app/integrations" },
  {
    label: "Resources",
    children: [
      { label: "Dokumentasi", href: "https://github.com/begawansemar137-web/tania-agents#readme", desc: "Cara memasang dan mengatur" },
      { label: "Jejak & biaya", href: "/app/runs", desc: "Pantau setiap eksekusi agen" },
    ],
  },
];

const underline = "text-accent after:absolute after:inset-x-3 after:-bottom-[15px] after:h-0.5 after:rounded-full after:bg-accent";

export function SiteHeader({ active = "Beranda" }: { active?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <Logo />

        <nav aria-label="Utama" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button
                  className={`relative flex items-center gap-1 rounded-lg px-3.5 py-2 text-[15px] font-medium hover:text-accent ${item.label === active ? underline : "text-ink"}`}
                  aria-haspopup="true"
                  aria-current={item.label === active ? "page" : undefined}
                >
                  {item.label} <ChevronDown size={16} aria-hidden="true" />
                </button>
                <div className="invisible absolute top-full left-0 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="w-64 rounded-xl border border-line bg-surface p-2 shadow-[0_20px_50px_-20px_rgba(40,20,120,0.35)]">
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <Link href={c.href} className="block rounded-lg px-3 py-2 hover:bg-accent-soft">
                          <span className="block text-sm font-semibold">{c.label}</span>
                          <span className="block text-xs text-muted">{c.desc}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                aria-current={item.label === active ? "page" : undefined}
                className={`relative px-3.5 py-2 text-[15px] font-medium hover:text-accent ${
                  item.label === active ? underline : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/app/integrations" aria-label="Cari integrasi" className="grid h-10 w-10 place-items-center rounded-lg text-ink hover:bg-surface-2">
            <Search size={20} />
          </Link>
          <Link href="/app" className="rounded-lg border border-line bg-surface px-5 py-2.5 text-[15px] font-semibold hover:border-accent">
            Masuk
          </Link>
          <Link href="/app" className="rounded-lg bg-accent px-5 py-2.5 text-[15px] font-semibold text-surface hover:bg-accent-strong">
            Daftar Gratis
          </Link>
        </div>

        {/* Mobile menu */}
        <details className="group relative lg:hidden">
          <summary className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-lg border border-line [&::-webkit-details-marker]:hidden" aria-label="Buka menu">
            <Menu size={20} />
          </summary>
          <div className="absolute top-12 right-0 w-[min(88vw,320px)] rounded-xl border border-line bg-surface p-3 shadow-xl">
            <ul className="space-y-0.5">
              {nav
                .flatMap((item) =>
                  item.children
                    ? item.children.map((c) => ({ label: `${item.label}: ${c.label}`, href: c.href }))
                    : [{ label: item.label, href: item.href! }],
                )
                .map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-accent-soft">{l.label}</Link>
                  </li>
                ))}
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3">
              <Link href="/app" className="rounded-lg border border-line px-3 py-2 text-center text-sm font-semibold">Masuk</Link>
              <Link href="/app" className="rounded-lg bg-accent px-3 py-2 text-center text-sm font-semibold text-surface">Daftar Gratis</Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
