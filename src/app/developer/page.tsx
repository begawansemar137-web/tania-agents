import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, BookOpen, Boxes, Braces, ChevronRight, CircleCheck, Code2, Database, FlaskConical, GitBranch, KeyRound,
  LayoutTemplate, Layers, MessageSquare, PlayCircle, Rocket, Sparkles, Triangle, Users, Workflow, Wrench, Zap, AppWindow,
  type LucideIcon,
} from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { Robot } from "@/components/landing/robot";
import { DeveloperSidebar } from "@/components/developer-sidebar";
import { CodeExample } from "@/components/code-example";

export const metadata: Metadata = {
  title: "Developer — TANIA Agents",
  description: "Platform developer untuk membangun, mengustomisasi, dan mengintegrasikan AI Agent ke aplikasi Anda.",
};

const REPO = "https://github.com/begawansemar137-web/tania-agents";
const README_API = `${REPO}#readme`;

const highlights: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Code2, title: "Build Agent", desc: "Rancang & buat AI Agent sesuai kebutuhan" },
  { icon: Layers, title: "Integrate", desc: "Hubungkan ke sistem & data perusahaan" },
  { icon: Rocket, title: "Deploy & Scale", desc: "Jalankan dengan aman, andal, dan terukur" },
];

const tiles: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: Braces, label: "API & SDK", href: "#api" },
  { icon: Layers, label: "Agent Builder", href: "/app/agents/new" },
  { icon: Boxes, label: "Model Hub", href: "/app/settings" },
  { icon: FlaskConical, label: "Playground", href: "/app/agents/sales-prep" },
  { icon: Workflow, label: "Integration", href: "/app/integrations" },
  { icon: LayoutTemplate, label: "Template", href: "/use-case" },
  { icon: AppWindow, label: "Sample App", href: REPO },
  { icon: Users, label: "Community", href: `${REPO}/issues` },
];

const steps = [
  { title: "Siapkan Kunci Model", desc: "Isi MODELHUB_API_KEY di environment server Anda." },
  { title: "Pilih Model / Agent", desc: "Gunakan model dari ModelHub atau agent siap pakai." },
  { title: "Integrasikan & Uji", desc: "Coba di Playground, lalu panggil /api/chat dari aplikasi Anda." },
];

const apis: { icon: LucideIcon; name: string; detail: string; ready: boolean }[] = [
  { icon: MessageSquare, name: "Chat API", detail: "POST /api/chat", ready: true },
  { icon: Boxes, name: "Models API", detail: "GET /api/models", ready: true },
  { icon: KeyRound, name: "Authentication", detail: "Kunci API per aplikasi", ready: false },
  { icon: Sparkles, name: "Agents API", detail: "Kelola agen lewat API", ready: false },
  { icon: Database, name: "Knowledge (RAG) API", detail: "Dokumen & pencarian", ready: false },
];

const tools: { icon: LucideIcon; name: string; desc: string; href: string }[] = [
  { icon: GitBranch, name: "GitHub", desc: "Kode sumber & contoh", href: REPO },
  { icon: Triangle, name: "Vercel", desc: "Deploy & hosting", href: "https://vercel.com/docs" },
  { icon: Boxes, name: "ModelHub", desc: "Gateway model AI", href: "https://api-modelhub.aiplayground.id" },
  { icon: Zap, name: "AI SDK", desc: "Streaming & UI chat", href: "https://ai-sdk.dev/docs" },
  { icon: LayoutTemplate, name: "Templates", desc: "Use case siap pakai", href: "/use-case" },
  { icon: BookOpen, name: "Best Practices", desc: "Panduan & standar", href: README_API },
];

const isExternal = (href: string) => href.startsWith("http");

function CodeBoard() {
  return (
    <div aria-hidden="true" className="absolute top-[30px] left-0 h-[170px] w-[150px] -rotate-6 rounded-2xl border border-white/70 bg-gradient-to-br from-[#c9b8ff]/95 to-[#8a68ff]/90 p-4 text-white shadow-[0_24px_40px_-18px_rgba(74,47,208,0.8)]">
      <Code2 size={30} strokeWidth={2.2} />
      <ul className="mt-4 space-y-2.5">
        {[70, 56, 64].map((w) => (
          <li key={w} className="flex items-center gap-1.5">
            <CircleCheck size={13} className="fill-white text-[#8a68ff]" />
            <span className="h-1.5 rounded-full bg-white/75" style={{ width: w }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DeveloperPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader active="Developer" />
      <div className="mx-auto flex max-w-[1680px] flex-col lg:flex-row">
        <DeveloperSidebar />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-6">
          {/* Hero */}
          <section className="relative">
            <div aria-hidden="true" className="pointer-events-none absolute -top-6 -right-8 -z-10 h-[400px] w-[75%] bg-[radial-gradient(ellipse_at_top_right,var(--hero-glow),transparent_68%)]" />
            <div className="grid items-center gap-6 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_330px_350px]">
              <div>
                <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">Developer Platform</span>
                <h1 className="mt-3 text-[34px] leading-[1.15] font-extrabold tracking-tight sm:text-[40px]">
                  Bangun, Integrasikan, dan <br className="hidden sm:block" />
                  Kembangkan <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">AI Agent</span> Anda
                </h1>
                <p className="mt-3 max-w-xl text-[15px] text-ink/85 sm:text-base">
                  Platform developer untuk membangun, mengustomisasi, dan mengintegrasikan AI Agent ke aplikasi, sistem, dan proses bisnis Anda.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/app/agents/new" className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-[15px] font-semibold text-surface hover:bg-accent-strong">
                    Mulai Build <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                  <a href={README_API} className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-6 py-3 text-[15px] font-semibold hover:border-accent">
                    <PlayCircle size={20} aria-hidden="true" /> Lihat Dokumentasi
                  </a>
                </div>
              </div>

              <div className="relative mx-auto hidden h-[260px] w-[330px] 2xl:block">
                <CodeBoard />
                <Robot className="absolute right-0 bottom-0 h-[250px] w-[250px]" />
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

          {/* Product tiles */}
          <nav aria-label="Produk developer" className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 2xl:grid-cols-8">
            {tiles.map(({ icon: Icon, label, href }, i) => (
              <Link
                key={label}
                href={href}
                {...(isExternal(href) ? { target: "_blank", rel: "noreferrer" } : {})}
                className={`relative flex flex-col items-center gap-2 rounded-xl border px-2 py-4 text-center text-[15px] transition ${
                  i === 0
                    ? "border-accent/30 bg-accent-soft font-semibold text-accent after:absolute after:bottom-1.5 after:h-1 after:w-6 after:rounded-full after:bg-accent"
                    : "border-line bg-surface font-medium hover:border-accent/40"
                }`}
              >
                <Icon size={28} strokeWidth={1.6} aria-hidden="true" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Quick start · API docs · Code */}
          <div className="mt-5 grid gap-4 xl:grid-cols-2 2xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1.25fr)]">
            <section id="quick-start" aria-labelledby="qs-title" className="scroll-mt-24 rounded-2xl border border-line bg-surface p-5">
              <h2 id="qs-title" className="flex items-center gap-2.5 text-lg font-bold">
                <Zap size={22} className="text-accent" aria-hidden="true" /> Quick Start
              </h2>
              <p className="mt-1 text-sm text-muted">Mulai mengembangkan AI Agent dalam 3 langkah mudah.</p>
              <ol className="mt-4 space-y-4">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-surface">{i + 1}</span>
                    <div>
                      <p className="font-semibold">{s.title}</p>
                      <p className="text-sm text-muted">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a href={README_API} className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-surface hover:bg-accent-strong">
                Panduan Lengkap <ArrowRight size={16} aria-hidden="true" />
              </a>
            </section>

            <section id="api" aria-labelledby="api-title" className="scroll-mt-24 rounded-2xl border border-line bg-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 id="api-title" className="flex items-center gap-2.5 text-lg font-bold">
                    <BookOpen size={22} className="text-accent" aria-hidden="true" /> API Documentation
                  </h2>
                  <p className="mt-1 text-sm text-muted">Dokumentasi untuk integrasi dan pengembangan.</p>
                </div>
                <a href={README_API} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent hover:underline">
                  Lihat Semua <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
              <ul className="mt-4 space-y-2">
                {apis.map(({ icon: Icon, name, detail, ready }) => {
                  const body = (
                    <>
                      <Icon size={19} className="shrink-0 text-accent" aria-hidden="true" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">{name}</span>
                        <span className="block font-mono text-xs text-muted">{detail}</span>
                      </span>
                      {ready ? (
                        <ChevronRight size={18} className="text-muted" aria-hidden="true" />
                      ) : (
                        <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted">Segera</span>
                      )}
                    </>
                  );
                  return (
                    <li key={name}>
                      {ready ? (
                        <a href={README_API} className="flex items-center gap-3 rounded-xl border border-line px-3.5 py-2.5 hover:border-accent/50 hover:bg-surface-2/50">{body}</a>
                      ) : (
                        <div className="flex items-center gap-3 rounded-xl border border-line px-3.5 py-2.5 opacity-80">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>

            <div className="xl:col-span-2 2xl:col-span-1">
              <CodeExample />
            </div>
          </div>

          {/* Tools & resources */}
          <section aria-labelledby="tools-title" className="mt-5 grid gap-4 rounded-2xl border border-line bg-surface p-5 lg:grid-cols-[260px_1fr] lg:items-center">
            <div className="flex gap-3">
              <Wrench size={24} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <h2 id="tools-title" className="text-lg font-bold">Tools & Resources</h2>
                <p className="mt-1 text-sm text-muted">Alat bantu untuk mempercepat pengembangan.</p>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 2xl:grid-cols-6">
              {tools.map(({ icon: Icon, name, desc, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    {...(isExternal(href) ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="flex h-full flex-col items-center gap-1 rounded-xl border border-line px-2 py-3 text-center hover:border-accent/50"
                  >
                    <Icon size={26} className="text-accent" strokeWidth={1.7} aria-hidden="true" />
                    <span className="text-sm font-bold">{name}</span>
                    <span className="text-xs text-muted">{desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
