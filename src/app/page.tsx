import Link from "next/link";
import {
  MessageSquare, Users, Eye, ShieldCheck, Lock, Receipt, Server, Sparkles,
  CalendarClock, Monitor, Plug, Network, ArrowRight, PlayCircle, Zap, FileText, Share2, CheckCircle2,
} from "lucide-react";
import { Logo } from "@/components/brand";
import { SiteHeader } from "@/components/landing/site-header";
import { Robot } from "@/components/landing/robot";
import { AgentCategories } from "@/components/landing/agent-categories";
import { DashboardMock, OfficeTower } from "@/components/landing/dashboard-mock";
import { templates } from "@/lib/data";

const heroFeatures = [
  { icon: Zap, title: "Otomasi Pekerjaan", desc: "Jalankan proses bisnis end-to-end", offset: "xl:ml-2" },
  { icon: FileText, title: "Asisten Cerdas", desc: "Dukung analisis, riset, dan keputusan", offset: "xl:ml-9" },
  { icon: Share2, title: "Terintegrasi", desc: "Terhubung dengan data, aplikasi, dan sistem", offset: "xl:ml-5" },
  { icon: ShieldCheck, title: "Aman & Terkendali", desc: "Governance, akses, dan audit yang lengkap", offset: "xl:ml-0" },
];

const whyList = [
  "Bangun agent tanpa kompleksitas",
  "Otomasi proses bisnis dan operasional",
  "Terhubung dengan sistem perusahaan",
  "Siap digunakan lintas unit dan industri",
];

const principles = [
  { icon: Users, title: "Multiplayer sejak awal", desc: "Undang tim atau klien, atur peran, dan bagikan agen serta sesi obrolan." },
  { icon: Eye, title: "Transparan", desc: "Lihat konfigurasi, versi, dan setiap perubahan pada agen." },
  { icon: ShieldCheck, title: "Anda tetap memegang kendali", desc: "Izin per alat: baca atau tulis, dan aksi mana yang perlu persetujuan." },
  { icon: Lock, title: "Aman", desc: "Setiap sesi berjalan di sandbox terisolasi. Kredensial model tak pernah terlihat agen." },
  { icon: Receipt, title: "Bisa diaudit", desc: "Setiap eksekusi dilacak. Setiap rupiah biaya tercatat." },
  { icon: Server, title: "Pilih model sendiri", desc: "Ganti model per agen lewat ModelHub, dan pakai model murah untuk tugas rutin." },
];

const features = [
  { icon: MessageSquare, title: "Ngobrol di Slack, Telegram, atau WhatsApp", desc: "Tim dan pelanggan memakai agen dari aplikasi chat yang sudah mereka pakai. Web app juga nyaman di ponsel." },
  { icon: Sparkles, title: "Agen yang belajar", desc: "Koreksi sekali, agen mengingatnya. Agen menyimpan memori, membuat skill, dan memperbarui instruksinya sendiri." },
  { icon: CalendarClock, title: "Automasi", desc: "Jalankan agen sesuai jadwal atau saat ada event di aplikasi terhubung. Lanjutkan sesi dari run mana pun untuk memperbaikinya." },
  { icon: Monitor, title: "Komputer untuk setiap agen", desc: "Browser dan file system sendiri, jadi agen bisa bekerja di situs dan file apa pun." },
  { icon: Plug, title: "1.000+ integrasi", desc: "Hubungkan lewat MCP atau Composio: Gmail, Slack, Notion, GitHub, HubSpot, hingga aplikasi lokal." },
  { icon: Network, title: "Tim agen", desc: "Agen bisa memanggil agen lain dan menyerahkan pekerjaan ke spesialis." },
];

const steps = [
  { n: "1", title: "Ceritakan pekerjaannya", desc: "“Setiap pagi, siapkan brief untuk setiap panggilan sales di kalender saya.”" },
  { n: "2", title: "Hubungkan aplikasi", desc: "Pilih alat yang boleh dipakai agen, dan tentukan izin baca/tulisnya." },
  { n: "3", title: "Perbaiki lewat umpan balik", desc: "Koreksi hasilnya di chat. Agen menyimpan pelajaran sebagai skill baru." },
];

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-clip">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative isolate">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_62%_20%,var(--hero-glow),transparent_70%)]" />
          <div aria-hidden="true" className="absolute top-[-12%] left-[48%] -z-10 hidden h-[620px] w-[620px] rounded-full border-[40px] border-accent-2/10 lg:block" />
          <div className="mx-auto grid max-w-[1440px] gap-10 px-4 pt-10 pb-8 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:px-10 lg:pt-8">
            <div className="lg:pt-6">
              <p className="inline-flex rounded-lg bg-accent-soft px-3.5 py-1.5 text-sm font-semibold text-accent">TANIA Platform</p>
              <h1 className="mt-4 text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl xl:text-7xl">
                TANIA <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">Agents</span>
              </h1>
              <p className="mt-5 max-w-2xl text-2xl leading-snug font-bold sm:text-[28px]">
                Platform AI Agent Enterprise untuk <br className="hidden sm:block" />
                Co-working, Automasi, dan Produktivitas.
              </p>
              <p className="mt-4 max-w-xl text-lg text-muted text-pretty">
                Bangun, kelola, dan jalankan AI Agent untuk berbagai kebutuhan bisnis dengan aman, terintegrasi, dan siap skala.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/daftar" className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-[17px] font-semibold text-surface shadow-[0_12px_30px_-12px_rgba(74,47,208,0.8)] hover:bg-accent-strong">
                  Mulai Gratis <ArrowRight size={18} />
                </Link>
                <Link href="/app/agents/sales-prep" className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-8 py-3.5 text-[17px] font-semibold hover:border-accent">
                  <PlayCircle size={20} /> Lihat Demo
                </Link>
              </div>
            </div>

            <div className="grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <Robot className="mx-auto w-full max-w-[300px] drop-shadow-xl sm:max-w-none" />
              <ul className="space-y-3">
                {heroFeatures.map(({ icon: Icon, title, desc, offset }) => (
                  <li key={title} className={`flex items-center gap-3.5 rounded-xl border border-line bg-surface/90 px-4 py-3.5 shadow-[0_12px_32px_-22px_rgba(40,20,120,0.5)] backdrop-blur ${offset}`}>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent"><Icon size={22} strokeWidth={1.8} /></span>
                    <span>
                      <span className="block text-[17px] font-bold">{title}</span>
                      <span className="block text-sm text-muted">{desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mx-auto max-w-[1440px] px-4 pb-14 sm:px-6 lg:px-10">
            <AgentCategories />
          </div>
        </section>

        {/* What is TANIA Agents */}
        <section className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-accent-soft via-surface-2 to-hero-glow px-6 pt-10 sm:px-10 lg:pt-12">
            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.25fr)_minmax(0,0.6fr)]">
              <div className="self-start pb-2 lg:pb-12">
                <p className="inline-flex rounded-lg bg-surface/70 px-3 py-1 text-sm font-medium">
                  Apa itu&nbsp;<span className="font-bold text-accent">TANIA Agents</span>?
                </p>
                <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">AI Agent untuk Bisnis yang Nyata</h2>
                <p className="mt-4 text-[17px] text-muted">
                  Platform <span className="font-semibold text-ink">enterprise</span> untuk membangun dan menjalankan <span className="font-semibold text-ink">AI Agent</span> yang dapat berpikir, beraksi, dan berkolaborasi secara mandiri.
                </p>
                <ul className="mt-6 space-y-3">
                  {whyList.map((x) => (
                    <li key={x} className="flex items-center gap-3 text-[16px]">
                      <CheckCircle2 size={22} className="shrink-0 fill-accent text-surface" aria-hidden="true" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
              <DashboardMock />
              <OfficeTower className="hidden h-full max-h-[420px] w-full self-end xl:block" />
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="border-y border-line bg-surface">
          <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10">
            <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight">Dibuat untuk kerja profesional, bukan sekadar asisten pribadi.</h2>
            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {principles.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <Icon size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-1 text-sm text-muted">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="cara-kerja" className="mx-auto max-w-[1440px] scroll-mt-20 px-4 py-20 sm:px-6 lg:px-10">
          <h2 className="text-3xl font-extrabold tracking-tight">Tanpa diagram alur. Cukup jelaskan pekerjaannya.</h2>
          <p className="mt-3 max-w-2xl text-muted">Agen menentukan langkahnya sendiri. Anda menentukan batasannya.</p>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="rounded-xl border border-line bg-surface p-6">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-soft font-mono text-sm font-semibold text-accent-strong">{s.n}</span>
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Features */}
        <section id="fitur" className="scroll-mt-20 border-t border-line">
          <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10">
            <h2 className="text-3xl font-extrabold tracking-tight">Semua yang dibutuhkan rekan kerja AI</h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-surface p-6">
                  <Icon size={20} className="text-accent" aria-hidden="true" />
                  <h3 className="mt-4 font-bold">{title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates */}
        <section id="template" className="scroll-mt-20 border-t border-line bg-surface">
          <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10">
            <h2 className="text-3xl font-extrabold tracking-tight">Mulai dari template</h2>
            <p className="mt-3 text-muted">Sesuaikan lewat chat dalam hitungan menit.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((t) => (
                <Link key={t.name} href="/app" className="group rounded-xl border border-line p-5 transition-colors hover:border-accent">
                  <span className="text-2xl">{t.emoji}</span>
                  <h3 className="mt-3 font-bold group-hover:text-accent">{t.name}</h3>
                  <p className="mt-1 text-sm text-muted">{t.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <Logo />
          <p>© 2026 TANIA Agents.</p>
        </div>
      </footer>
    </div>
  );
}
