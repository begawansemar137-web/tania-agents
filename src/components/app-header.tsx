import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";
import { LogoMark } from "./brand";

// Header for the product area (/app). Unlike the marketing header it has no site nav (the sidebar is the nav),
// and it says plainly that this is a demo where nothing is saved.
export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1680px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex shrink-0 items-center gap-2 text-lg tracking-tight whitespace-nowrap text-ink" aria-label="TANIA Agents, beranda">
          <LogoMark />
          <span className="hidden sm:inline">
            <span className="font-extrabold">TANIA</span> <span className="font-medium">Agents</span>
          </span>
        </Link>
        <span
          className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-warn/40 px-3 py-1 text-xs font-semibold whitespace-nowrap text-warn"
          title="Versi demo: perubahan tidak disimpan setelah halaman ditutup."
        >
          <FlaskConical size={14} aria-hidden="true" />
          Mode demo
          <span className="hidden font-normal sm:inline">· data tidak disimpan</span>
        </span>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link href="/" className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-2 hover:text-ink md:inline-flex">
            <ArrowLeft size={16} aria-hidden="true" /> Situs utama
          </Link>
          <Link href="/daftar" className="rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold whitespace-nowrap text-surface hover:bg-accent-strong sm:px-5 sm:py-2.5 sm:text-[15px]">
            Daftar<span className="hidden sm:inline"> Gratis</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
