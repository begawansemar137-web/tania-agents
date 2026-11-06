import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
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
      { label: "Semua solusi", href: "/solusi", desc: "Solusi AI Agent untuk enterprise" },
      { label: "Per industri", href: "/solusi#industri", desc: "Pemerintahan, keuangan, manufaktur, dll." },
      { label: "Katalog solusi", href: "/solusi#katalog", desc: "CX, operasional, data, HR, finance" },
    ],
  },
  { label: "Use Case", href: "/use-case" },
  { label: "Developer", href: "/developer" },
  {
    label: "Resources",
    children: [
      { label: "Pusat Resources", href: "/resources", desc: "Dokumen, template, dan tools" },
      { label: "Library", href: "/resources#library", desc: "Cari dan unduh resources" },
      { label: "Dokumentasi", href: "https://github.com/begawansemar137-web/tania-agents#readme", desc: "Cara memasang dan mengatur" },
    ],
  },
];

const underline = "text-accent after:absolute after:inset-x-3 after:-bottom-[15px] after:h-0.5 after:rounded-full after:bg-accent";

export function SiteHeader({ active = "Beranda" }: { active?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <Logo />

        <nav aria-label="Utama" className="hidden items-center gap-1 xl:flex">
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

        <div className="hidden items-center gap-3 xl:flex">
          <Link href="/masuk" className="rounded-lg border border-line bg-surface px-5 py-2.5 text-[15px] font-semibold hover:border-accent">
            Masuk
          </Link>
          <Link href="/daftar" className="rounded-lg bg-accent px-5 py-2.5 text-[15px] font-semibold text-surface hover:bg-accent-strong">
            Daftar Gratis
          </Link>
        </div>

        {/* Mobile menu */}
        <details className="group relative xl:hidden">
          <summary className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-lg border border-line [&::-webkit-details-marker]:hidden" aria-label="Buka menu">
            <Menu size={20} />
          </summary>
          <div className="absolute top-12 right-0 max-h-[calc(100dvh-90px)] w-[min(88vw,340px)] overflow-y-auto rounded-xl border border-line bg-surface p-3 shadow-xl">
            <nav aria-label="Menu utama">
              {/* Direct pages first, then each group under its own heading so the list scans quickly. */}
              <ul className="space-y-0.5">
                {nav.filter((i) => !i.children).map((i) => (
                  <li key={i.label}>
                    <Link
                      href={i.href!}
                      aria-current={i.label === active ? "page" : undefined}
                      className={`block rounded-lg px-3 py-2 text-[15px] font-medium hover:bg-accent-soft ${i.label === active ? "bg-accent-soft text-accent" : ""}`}
                    >
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {nav.filter((i) => i.children).map((g) => (
                <div key={g.label} className="mt-2 border-t border-line pt-2">
                  <p className={`px-3 py-1 text-xs font-semibold tracking-wide uppercase ${g.label === active ? "text-accent" : "text-muted"}`}>{g.label}</p>
                  <ul className="space-y-0.5">
                    {g.children!.map((c) => (
                      <li key={c.label}>
                        <Link href={c.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-accent-soft">{c.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3">
              <Link href="/masuk" className="rounded-lg border border-line px-3 py-2 text-center text-sm font-semibold">Masuk</Link>
              <Link href="/daftar" className="rounded-lg bg-accent px-3 py-2 text-center text-sm font-semibold text-surface">Daftar Gratis</Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
