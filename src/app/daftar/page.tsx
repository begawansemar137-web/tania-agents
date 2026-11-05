import type { Metadata } from "next";
import { BarChart3, Boxes, Code2, GraduationCap, Layers, Settings, Sparkles, Zap, type LucideIcon } from "lucide-react";
import { Logo } from "@/components/brand";
import { Robot } from "@/components/landing/robot";
import { SignupForm } from "@/components/signup-form";
import { catalog } from "@/lib/catalog";
import { solutions } from "@/lib/solutions";
import { useCases } from "@/lib/use-cases";

export const metadata: Metadata = {
  title: "Daftar Gratis — TANIA Agents",
  description: "Buat akun TANIA Agents dan mulai menjelajahi solusi AI Agent untuk organisasi Anda.",
};

const benefits: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Zap, title: "Akses Agent Siap Pakai", desc: "Berbagai AI Agent untuk kebutuhan bisnis." },
  { icon: Layers, title: "Build & Kustomisasi", desc: "Buat agen sesuai proses dan kebutuhan Anda." },
  { icon: Code2, title: "Integrasi Mudah", desc: "Terhubung dengan sistem dan data bisnis." },
  { icon: GraduationCap, title: "Resource & Learning", desc: "Panduan, tutorial, dan best practice." },
];

// Counts come from the real catalogs, not marketing numbers.
const stats: { icon: LucideIcon; value: number; label: string }[] = [
  { icon: Boxes, value: catalog.length, label: "Agen siap pakai" },
  { icon: Sparkles, value: useCases.length, label: "Contoh use case" },
  { icon: BarChart3, value: solutions.length, label: "Solusi industri" },
];

const floating: { icon: LucideIcon; className: string }[] = [
  { icon: Code2, className: "left-[44%] top-[0%] h-20 w-20" },
  { icon: Layers, className: "left-[18%] top-[16%] h-16 w-16" },
  { icon: BarChart3, className: "right-[4%] top-[18%] h-16 w-16" },
  { icon: Settings, className: "left-[2%] top-[38%] h-14 w-14" },
];

export default function DaftarPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_30%_30%,var(--hero-glow),transparent_70%)]" />
      <svg aria-hidden="true" viewBox="0 0 1440 260" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-[220px] w-full text-accent opacity-25">
        <path d="M0 200 C 300 90 560 240 860 160 S 1260 120 1440 170 L1440 260 L0 260Z" fill="currentColor" opacity="0.35" />
        {Array.from({ length: 48 }, (_, i) => (
          <circle key={i} cx={15 + i * 30} cy={Math.round(205 + Math.sin(i / 3) * 22)} r={i % 4 === 0 ? 2 : 1.2} fill="currentColor" />
        ))}
      </svg>

      <div className="relative z-10 mx-auto grid max-w-[1500px] gap-10 px-5 py-6 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,640px)] lg:items-center lg:gap-10 lg:py-8">
        <div className="order-2 lg:order-1">
          <div className="hidden lg:block">
            <Logo />
          </div>
          <div className="mt-8 grid items-center gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
            <section>
              <span className="inline-block rounded-full bg-accent-soft px-4 py-1.5 text-[15px] font-semibold text-accent">
                Bergabung dengan TANIA Agents
              </span>
              <p className="mt-4 text-[44px] leading-[1.05] font-extrabold tracking-tight sm:text-[60px]">
                Daftar <span className="text-accent">Gratis</span>
              </p>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink/85">
                Buat akun Anda dan mulai menjelajahi solusi AI Agent untuk meningkatkan produktivitas dan inovasi di organisasi Anda.
              </p>
              <ul className="mt-6 space-y-2.5">
                {benefits.map(({ icon: Icon, title, desc }) => (
                  <li key={title} className="flex max-w-md items-center gap-4 rounded-xl border border-line bg-surface/80 px-4 py-3 backdrop-blur">
                    <Icon size={24} strokeWidth={1.7} className="shrink-0 text-accent" aria-hidden="true" />
                    <span>
                      <span className="block text-[15px] font-bold">{title}</span>
                      <span className="block text-[13px] text-muted">{desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 flex max-w-md divide-x divide-line rounded-xl border border-line bg-surface/80 py-3 backdrop-blur">
                {stats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex flex-1 items-center gap-2.5 px-3 sm:px-4">
                    <Icon size={22} strokeWidth={1.7} className="shrink-0 text-accent" aria-hidden="true" />
                    <div>
                      <dt className="sr-only">{label}</dt>
                      <dd className="text-xl leading-none font-extrabold">{value}</dd>
                      <dd className="mt-1 text-xs leading-tight text-muted">{label}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </section>

            <div aria-hidden="true" className="relative mx-auto hidden aspect-[4/5] w-full max-w-[380px] xl:block">
              <div className="absolute inset-x-[6%] bottom-[4%] h-[18%] rounded-[50%] border-2 border-accent/30 bg-[radial-gradient(ellipse,var(--hero-glow),transparent_70%)]" />
              <Robot className="absolute inset-x-0 bottom-[6%] w-full drop-shadow-[0_30px_40px_rgba(40,20,120,0.3)]" />
              {floating.map(({ icon: Icon, className }, i) => (
                <span
                  key={i}
                  className={`absolute grid place-items-center rounded-2xl border border-white/60 bg-gradient-to-br from-accent-2/80 to-accent/80 text-white shadow-xl backdrop-blur ${className}`}
                >
                  <Icon size={28} strokeWidth={2} />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="mb-5 lg:hidden">
            <Logo />
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
