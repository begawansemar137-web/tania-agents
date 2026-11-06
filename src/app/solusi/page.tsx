import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Code2, Database, Layers, PlayCircle, Settings, ShieldCheck, Target, type LucideIcon } from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { Robot } from "@/components/landing/robot";
import { SolutionsCatalog } from "@/components/solutions-catalog";

export const metadata: Metadata = {
  title: "Solusi — TANIA Agents",
  description: "Kumpulan solusi siap pakai berbasis AI Agent untuk berbagai kebutuhan enterprise.",
};

const highlights: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Target, title: "Siap Implementasi", desc: "Solusi end-to-end, cepat dan terukur" },
  { icon: Layers, title: "Modular & Fleksibel", desc: "Disesuaikan dengan kebutuhan bisnis" },
  { icon: ShieldCheck, title: "Aman & Enterprise Grade", desc: "Dengan governance dan kontrol yang lengkap" },
];

// Tilted glass tiles floating around the robot.
function FloatTile({ icon: Icon, className, size = 28 }: { icon: LucideIcon; className: string; size?: number }) {
  return (
    <span aria-hidden="true" className={`absolute grid place-items-center rounded-2xl border border-white/70 bg-gradient-to-br from-[#cdbfff] to-[#8f6bff] text-white shadow-[0_16px_30px_-14px_rgba(74,47,208,0.7)] ${className}`}>
      <Icon size={size} strokeWidth={2} />
    </span>
  );
}

export default function SolusiPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader active="Solusi" />

      <main id="konten">
      <section className="relative overflow-hidden bg-gradient-to-r from-bg via-hero-glow/60 to-hero-glow">
        <div className="mx-auto grid max-w-[1600px] items-center gap-8 px-4 pt-8 pb-10 sm:px-6 lg:px-10 xl:grid-cols-[minmax(0,1fr)_420px_370px] xl:pb-6">
          <div>
            <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">Solusi TANIA</span>
            <h1 className="mt-4 text-4xl leading-[1.12] font-extrabold tracking-tight sm:text-5xl xl:text-[44px] 2xl:text-5xl">
              Solusi <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">AI Agent</span> untuk
              <br className="hidden sm:block" /> Berbagai Kebutuhan Enterprise
            </h1>
            <p className="mt-4 max-w-xl text-base text-ink/85 sm:text-lg">
              Kumpulan solusi siap pakai berbasis AI Agent yang membantu meningkatkan produktivitas, efisiensi, dan pertumbuhan bisnis lintas industri.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/app" className="inline-flex w-full items-center justify-center gap-2 sm:w-auto rounded-xl bg-accent px-6 py-3.5 text-[15px] font-semibold text-surface hover:bg-accent-strong">
                Lihat Agen Siap Pakai <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/app/agents/sales-prep" className="inline-flex w-full items-center justify-center gap-2 sm:w-auto rounded-xl border border-line bg-surface px-6 py-3.5 text-[15px] font-semibold hover:border-accent">
                <PlayCircle size={20} aria-hidden="true" /> Lihat Demo
              </Link>
            </div>
          </div>

          <div className="relative mx-auto hidden h-[300px] w-[420px] lg:block">
            <FloatTile icon={BarChart3} className="top-1 left-[68px] h-[66px] w-[66px] -rotate-6" />
            <FloatTile icon={Settings} className="top-0 left-[148px] h-[52px] w-[52px] rotate-6" size={24} />
            <FloatTile icon={Database} className="top-[92px] left-2 h-16 w-16 rotate-3" />
            <FloatTile icon={Code2} className="top-[150px] left-[84px] h-[58px] w-[58px] -rotate-3" />
            <div aria-hidden="true" className="absolute right-4 bottom-3 h-14 w-60 rounded-[50%] border-2 border-white/60" />
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
        <SolutionsCatalog />
      </div>
      </main>

      <SiteFooter />
    </div>
  );
}
