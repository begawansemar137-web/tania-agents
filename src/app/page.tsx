import Link from "next/link";
import {
  MessageSquare, Users, Eye, ShieldCheck, Lock, Receipt, Server, Sparkles,
  CalendarClock, Monitor, Plug, Network, ArrowRight, Check,
} from "lucide-react";
import { Logo } from "@/components/brand";
import { btnPrimary, btnGhost } from "@/components/ui";
import { templates } from "@/lib/data";

const principles = [
  { icon: Users, title: "Multiplayer sejak awal", desc: "Undang tim atau klien, atur peran, dan bagikan agen serta sesi obrolan." },
  { icon: Eye, title: "Transparan", desc: "Lihat konfigurasi, versi, dan setiap perubahan pada agen." },
  { icon: ShieldCheck, title: "Anda tetap memegang kendali", desc: "Izin per alat: baca atau tulis, dan aksi mana yang perlu persetujuan." },
  { icon: Lock, title: "Aman", desc: "Setiap sesi berjalan di sandbox terisolasi. Kredensial model tak pernah terlihat agen." },
  { icon: Receipt, title: "Bisa diaudit", desc: "Setiap eksekusi dilacak. Setiap rupiah biaya tercatat." },
  { icon: Server, title: "Milik Anda", desc: "Self-host di server sendiri, dengan model dan data Anda sendiri." },
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
    <div className="flex flex-col">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            <a href="#fitur" className="hover:text-ink">Fitur</a>
            <a href="#cara-kerja" className="hover:text-ink">Cara kerja</a>
            <a href="#template" className="hover:text-ink">Template</a>
            <a href="#self-host" className="hover:text-ink">Self-host</a>
          </nav>
          <Link href="/app" className={btnPrimary}>Buka aplikasi</Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Open source · bisa self-host
            </p>
            <h1 className="text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Rekan kerja AI untuk tim Anda, dibuat cukup dengan mengobrol.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted text-pretty">
              TANIA-Agents adalah workspace tempat tim membangun agen spesialis untuk sales, HR, keuangan, support, dan operasional.
              Bagikan ke tim, ajak ngobrol di Slack atau WhatsApp, dan pantau setiap langkahnya.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/app" className={`${btnPrimary} px-5 py-2.5`}>
                Mulai bangun agen <ArrowRight size={16} />
              </Link>
              <a href="#self-host" className={`${btnGhost} px-5 py-2.5`}>Self-host</a>
            </div>
          </div>

          {/* Product preview */}
          <div className="rounded-2xl border border-line bg-surface p-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
            <div className="mb-3 flex items-center gap-2 border-b border-line pb-3">
              <span className="text-lg">📞</span>
              <div>
                <p className="text-sm font-medium">Sari — Persiapan Sales</p>
                <p className="text-xs text-muted">anthropic/claude-sonnet-5.5 · Slack, Web</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-accent px-3 py-2 text-surface">
                Siapkan brief untuk demo jam 10 dengan PT Sinar Logistik.
              </div>
              <div className="space-y-1.5 rounded-lg border border-line bg-surface-2 p-2.5 font-mono text-xs text-muted">
                <p>✓ google_calendar.list_events <span className="float-right">0,6 dtk</span></p>
                <p>✓ gmail.search · 6 email <span className="float-right">1,2 dtk</span></p>
                <p>✓ hubspot.get_deal · Negosiasi <span className="float-right">0,8 dtk</span></p>
                <p>✓ web_search · 3 berita <span className="float-right">3,9 dtk</span></p>
              </div>
              <div className="max-w-[90%] rounded-xl rounded-bl-sm border border-line px-3 py-2">
                <p className="font-medium">Brief: PT Sinar Logistik</p>
                <ul className="mt-1 list-disc space-y-0.5 pl-4 text-muted">
                  <li>Deal Rp 420 jt, tahap negosiasi</li>
                  <li>Baru ekspansi gudang di Surabaya</li>
                  <li>Keberatan terakhir: integrasi WMS</li>
                </ul>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-warn-soft px-3 py-2 text-xs text-warn">
                <span>Perbarui catatan deal di HubSpot?</span>
                <span className="font-medium">Butuh persetujuan</span>
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="border-y border-line bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight">Dibuat untuk kerja profesional, bukan sekadar asisten pribadi.</h2>
            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {principles.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <Icon size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="mt-1 text-sm text-muted">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="cara-kerja" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight">Tanpa diagram alur. Cukup jelaskan pekerjaannya.</h2>
          <p className="mt-3 max-w-2xl text-muted">Agen menentukan langkahnya sendiri. Anda menentukan batasannya.</p>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="rounded-xl border border-line bg-surface p-6">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-soft font-mono text-sm font-semibold text-accent-strong">{s.n}</span>
                <h3 className="mt-4 font-medium">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Features */}
        <section id="fitur" className="scroll-mt-20 border-t border-line">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <h2 className="text-3xl font-semibold tracking-tight">Semua yang dibutuhkan rekan kerja AI</h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-surface p-6">
                  <Icon size={20} className="text-accent" aria-hidden="true" />
                  <h3 className="mt-4 font-medium">{title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates */}
        <section id="template" className="scroll-mt-20 border-t border-line bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <h2 className="text-3xl font-semibold tracking-tight">Mulai dari template</h2>
            <p className="mt-3 text-muted">Sesuaikan lewat chat dalam hitungan menit.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((t) => (
                <Link key={t.name} href="/app" className="group rounded-xl border border-line p-5 transition-colors hover:border-accent">
                  <span className="text-2xl">{t.emoji}</span>
                  <h3 className="mt-3 font-medium group-hover:text-accent">{t.name}</h3>
                  <p className="mt-1 text-sm text-muted">{t.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Self host */}
        <section id="self-host" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
          <div className="grid gap-10 rounded-2xl bg-ink p-8 text-bg sm:p-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Pakai model apa pun. Simpan data di server Anda.</h2>
              <ul className="mt-6 space-y-2.5 text-sm opacity-85">
                {["Model via API (Claude, GPT) atau lokal dengan Ollama", "Pakai langganan Claude/ChatGPT yang sudah Anda bayar", "Lihat biaya per agen, pilih model murah untuk tugas rutin", "Sandbox terisolasi per sesi"].map((x) => (
                  <li key={x} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0" />{x}</li>
                ))}
              </ul>
            </div>
            <pre className="overflow-x-auto rounded-xl bg-black/30 p-5 font-mono text-sm leading-relaxed">
{`git clone https://github.com/<org>/tania-agents
cd tania-agents
cp .env.example .env
docker compose up -d
# buka http://localhost:3000`}
            </pre>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Logo />
          <p>Terinspirasi dari proyek open-source Agenta (MIT). © 2026 TANIA-Agents.</p>
        </div>
      </footer>
    </div>
  );
}
