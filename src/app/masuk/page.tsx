import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Database, Gauge, Rocket, ShieldCheck, Sparkles, Workflow, Zap, type LucideIcon } from "lucide-react";
import { LogoMark } from "@/components/brand";
import { Robot } from "@/components/landing/robot";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Masuk — TANIA Agents",
  description: "Masuk ke platform AI Agent Enterprise TANIA Agents.",
};

const benefits: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Zap, title: "Produktif & Efisien", desc: "Otomatisasi pekerjaan, hemat waktu dan biaya." },
  { icon: Workflow, title: "Terintegrasi & Fleksibel", desc: "Hubungkan dengan sistem dan aplikasi yang Anda gunakan." },
  { icon: ShieldCheck, title: "Aman & Terpercaya", desc: "Izin dan persetujuan untuk setiap aksi agen." },
  { icon: Rocket, title: "Siap Berskala", desc: "Dari tim kecil hingga seluruh organisasi." },
];

const floating: { icon: LucideIcon; className: string }[] = [
  { icon: Bot, className: "left-[4%] top-[18%]" },
  { icon: Database, className: "right-[6%] top-[10%]" },
  { icon: Gauge, className: "left-[0%] bottom-[30%]" },
  { icon: Sparkles, className: "right-[0%] bottom-[36%]" },
];

export default function MasukPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#2a1590_0%,#4a2fd0_45%,#6344dc_100%)] text-white">
      {/* soft glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/3 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(160,140,255,0.45),transparent_65%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_65%)]" />

      {/* waves + dots */}
      <svg aria-hidden="true" viewBox="0 0 1440 260" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-[200px] w-full opacity-60">
        <path d="M0 170 C 240 110 480 230 720 170 S 1200 110 1440 160" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
        <path d="M0 200 C 260 150 500 250 760 195 S 1220 140 1440 190" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
        <path d="M0 230 C 280 190 540 260 800 225 S 1240 180 1440 220" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
        {Array.from({ length: 36 }, (_, i) => (
          <circle key={i} cx={20 + i * 40} cy={Math.round(175 + Math.sin(i / 2.3) * 28)} r={i % 3 === 0 ? 2.2 : 1.4} fill="rgba(255,255,255,0.55)" />
        ))}
      </svg>

      <header className="relative z-10 mx-auto flex max-w-[1440px] items-center px-5 pt-6 sm:px-10">
        <Link href="/" className="inline-flex items-center gap-2 text-lg tracking-tight" aria-label="TANIA Agents, beranda">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-lg">
            <LogoMark size={24} />
          </span>
          <span>
            <span className="font-extrabold">TANIA</span> <span className="font-medium">Agents</span>
          </span>
        </Link>
      </header>

      <main className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-10 px-5 pt-8 pb-24 sm:px-10 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-10 xl:grid-cols-[1fr_minmax(0,0.8fr)_minmax(0,460px)] xl:gap-8 lg:pt-10">
        <section className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Sparkles size={15} aria-hidden="true" /> Enterprise AI Agents Platform
          </span>
          <p className="mt-6 text-[44px] leading-[1.05] font-extrabold tracking-tight sm:text-[56px]">
            TANIA
            <span className="block bg-gradient-to-r from-white to-[#cfc3ff] bg-clip-text text-transparent">Agents</span>
          </p>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/85">
            Bangun, kelola, dan jalankan AI Agent untuk mempercepat pekerjaan tim Anda, dengan aman dan terukur.
          </p>
          <ul className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[15px] font-bold">{title}</span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-white/85">{desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div aria-hidden="true" className="relative order-3 mx-auto hidden aspect-square w-full max-w-[420px] lg:order-2 xl:block">
          <div className="absolute inset-[8%] rounded-full border border-white/25" />
          <div className="absolute inset-[18%] rounded-full border border-dashed border-white/20" />
          <div className="absolute inset-x-[14%] bottom-[6%] h-[14%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(255,255,255,0.5),transparent_70%)]" />
          <Robot className="relative h-full w-full drop-shadow-[0_30px_40px_rgba(20,10,80,0.45)]" />
          {floating.map(({ icon: Icon, className }, i) => (
            <span key={i} className={`absolute grid h-14 w-14 place-items-center rounded-2xl border border-white/30 bg-white/15 shadow-xl backdrop-blur ${className}`}>
              <Icon size={24} />
            </span>
          ))}
        </div>

        <div className="order-1 w-full text-ink lg:order-3">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
