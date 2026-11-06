import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleCheck, Layers, PlayCircle, Settings, Target, Zap, type LucideIcon } from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { Robot } from "@/components/landing/robot";
import { UseCaseCatalog } from "@/components/use-case-catalog";

export const metadata: Metadata = {
  title: "Use Case — TANIA Agents",
  description: "Kumpulan contoh penerapan AI Agent di berbagai industri dan fungsi bisnis.",
};

const highlights: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Target, title: "Nyata & Terukur", desc: "Dampak dinyatakan dengan metrik yang jelas" },
  { icon: Zap, title: "Siap Direplikasi", desc: "Dapat diadaptasi untuk kebutuhan Anda" },
  { icon: Layers, title: "Lintas Industri & Fungsi", desc: "Dari operasional, layanan, hingga inovasi produk" },
];

function FloatTile({ icon: Icon, className }: { icon: LucideIcon; className: string }) {
  return (
    <span aria-hidden="true" className={`absolute grid place-items-center rounded-2xl border border-white/70 bg-gradient-to-br from-[#e2d9ff] to-[#a58bff] text-white shadow-[0_16px_30px_-14px_rgba(74,47,208,0.7)] ${className}`}>
      <Icon size={26} strokeWidth={2} />
    </span>
  );
}

// Tilted glass "Use Case" board with a checklist and a rising bar chart.
function UseCaseBoard() {
  return (
    <div aria-hidden="true" className="absolute top-[78px] left-0 h-[150px] w-[190px] -rotate-6 rounded-2xl border border-white/70 bg-gradient-to-br from-[#9f86ff] to-[#6a45f0] p-4 text-white shadow-[0_24px_40px_-18px_rgba(74,47,208,0.8)]">
      <p className="text-[15px] font-bold">Use Case</p>
      <div className="mt-3 flex items-end justify-between">
        <ul className="space-y-1.5">
          {[44, 36, 40, 30].map((w) => (
            <li key={w} className="flex items-center gap-1.5">
              <CircleCheck size={12} className="fill-white text-[#6a45f0]" />
              <span className="h-1.5 rounded-full bg-white/70" style={{ width: w }} />
            </li>
          ))}
        </ul>
        <div className="flex items-end gap-1">
          {[18, 28, 38, 52].map((h) => (
            <span key={h} className="w-3 rounded-t bg-white/80" style={{ height: h }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UseCasePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader active="Use Case" />

      <main id="konten">
      <section className="relative overflow-hidden bg-gradient-to-r from-bg via-hero-glow/60 to-hero-glow">
        <div className="mx-auto grid max-w-[1600px] items-center gap-8 px-4 pt-8 pb-10 sm:px-6 lg:px-10 xl:grid-cols-[minmax(0,1fr)_420px_390px] xl:pb-6">
          <div>
            <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">Use Case TANIA</span>
            <h1 className="mt-4 text-4xl leading-[1.12] font-extrabold tracking-tight sm:text-5xl xl:text-[44px] 2xl:text-5xl">
              Kumpulan <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">Use Case</span>
              <br className="hidden sm:block" /> AI Agent di Dunia Nyata
            </h1>
            <p className="mt-4 max-w-xl text-base text-ink/85 sm:text-lg">
              Eksplorasi berbagai penerapan AI Agent yang memberikan dampak nyata di berbagai industri dan fungsi bisnis.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="#daftar" className="inline-flex w-full items-center justify-center gap-2 sm:w-auto rounded-xl bg-accent px-6 py-3.5 text-[15px] font-semibold text-surface hover:bg-accent-strong">
                Jelajahi Use Case <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/app/agents/sales-prep" className="inline-flex w-full items-center justify-center gap-2 sm:w-auto rounded-xl border border-line bg-surface px-6 py-3.5 text-[15px] font-semibold hover:border-accent">
                <PlayCircle size={20} aria-hidden="true" /> Lihat Demo Nyata
              </Link>
            </div>
          </div>

          <div className="relative mx-auto hidden h-[300px] w-[420px] lg:block">
            <FloatTile icon={Settings} className="top-1 left-[30px] h-[60px] w-[60px] -rotate-3" />
            <FloatTile icon={Target} className="top-[14px] left-[104px] h-[56px] w-[56px] rotate-6" />
            <UseCaseBoard />
            <Robot className="absolute right-0 bottom-0 h-[280px] w-[280px]" />
          </div>

          <ul className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex items-center gap-4 rounded-2xl border border-white/60 bg-surface/85 px-4 py-3.5 shadow-[0_10px_30px_-22px_rgba(40,20,120,0.6)] backdrop-blur">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
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

      <div className="mx-auto max-w-[1600px] px-4 pt-6 pb-16 sm:px-6 lg:px-10">
        <UseCaseCatalog />
      </div>
      </main>

      <SiteFooter />
    </div>
  );
}
