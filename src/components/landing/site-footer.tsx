import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Logo } from "@/components/brand";

const REPO = "https://github.com/begawansemar137-web/tania-agents";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Produk",
    links: [
      { label: "Katalog Agents", href: "/app" },
      { label: "Buat Agent", href: "/app/agents/new" },
      { label: "Automasi", href: "/app/automations" },
      { label: "Monitoring", href: "/app/runs" },
    ],
  },
  {
    title: "Solusi",
    links: [
      { label: "Semua Solusi", href: "/solusi" },
      { label: "Per Industri", href: "/solusi#industri" },
      { label: "Use Case", href: "/use-case" },
    ],
  },
  {
    title: "Developer",
    links: [
      { label: "Developer Portal", href: "/developer" },
      { label: "Referensi API", href: "/developer#api" },
      { label: "Resources", href: "/resources" },
      { label: "Kode Sumber (GitHub)", href: REPO },
    ],
  },
  {
    title: "Akun",
    links: [
      { label: "Daftar Gratis", href: "/daftar" },
      { label: "Masuk", href: "/masuk" },
      { label: "Laporkan Masalah", href: `${REPO}/issues/new` },
    ],
  },
];

// Shared footer for marketing pages: a closing call to action, then a sitemap.
export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <section aria-labelledby="footer-cta" className="flex flex-col gap-5 border-b border-line py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="footer-cta" className="text-2xl font-extrabold tracking-tight">Siap mencoba AI Agent untuk tim Anda?</h2>
            <p className="mt-1 text-muted">Coba agen langsung di versi demo, tanpa kartu kredit.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/daftar" className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-surface hover:bg-accent-strong">
              Mulai Gratis <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/app/agents/sales-prep" className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-6 py-3 font-semibold hover:border-accent">
              <PlayCircle size={18} aria-hidden="true" /> Lihat Demo
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="col-span-2 max-w-xs lg:col-span-1">
            <Logo />
            <p className="mt-3 text-sm text-muted">Platform untuk membangun, mengelola, dan menjalankan AI Agent di organisasi Anda.</p>
          </div>
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="text-sm font-bold">{c.title}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-muted hover:text-accent">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-line py-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>© 2026 TANIA Agents.</p>
          <p>Versi demo: akun dan data belum disimpan.</p>
        </div>
      </div>
    </footer>
  );
}
