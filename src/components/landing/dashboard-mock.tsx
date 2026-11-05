import { Home, Bot, Workflow, BookOpen, Puzzle, Activity, Settings, Plus, Users, Repeat, Clock, Target, FileText, UserRound, ChevronRight } from "lucide-react";
import { LogoMark } from "@/components/brand";

const side = [
  { icon: Home, label: "Beranda", active: true },
  { icon: Bot, label: "My Agents" },
  { icon: Workflow, label: "Workflow" },
  { icon: BookOpen, label: "Knowledge" },
  { icon: Puzzle, label: "Integrations" },
  { icon: Activity, label: "Monitoring" },
  { icon: Settings, label: "Settings" },
];

const stats = [
  { icon: Users, label: "Active Agents", value: "24", tone: "bg-[#e7e3ff] text-[#4a2fd0]" },
  { icon: Repeat, label: "Total Eksekusi", value: "128.540", tone: "bg-[#ffe9dc] text-[#e8701a]" },
  { icon: Target, label: "Automasi Proses", value: "87%", tone: "bg-[#dcf5e6] text-[#16a34a]" },
  { icon: Clock, label: "Waktu Tersimpan", value: "1.320 jam", tone: "bg-[#f1e4ff] text-[#9b4ddb]" },
];

const active = [
  { icon: Target, name: "Sales Agent", desc: "Bantu kelola prospek & follow up" },
  { icon: FileText, name: "Report Agent", desc: "Buat laporan otomatis" },
  { icon: UserRound, name: "HR Agent", desc: "Dukung proses HR & onboarding" },
];

// Decorative preview of the app, drawn as a laptop. Fixed light palette so it reads the same in dark mode.
export function DashboardMock() {
  return (
    <div aria-hidden="true" className="select-none">
      <div className="rounded-t-[22px] border-[10px] border-b-0 border-[#1d1b2e] bg-white text-[#15132e] shadow-[0_30px_80px_-30px_rgba(40,20,120,0.45)]">
        <div className="flex items-center gap-1.5 border-b border-[#ecebf3] px-4 py-2.5 text-[11px] font-semibold">
          <LogoMark size={16} /> TANIA <span className="font-normal">Agents</span>
        </div>
        <div className="flex">
          <ul className="hidden w-[118px] shrink-0 space-y-0.5 border-r border-[#ecebf3] p-2 text-[9.5px] sm:block">
            {side.map(({ icon: Icon, label, active }) => (
              <li key={label} className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${active ? "bg-[#e9e5ff] font-semibold text-[#4a2fd0]" : "text-[#3b3955]"}`}>
                <Icon size={11} /> {label}
              </li>
            ))}
          </ul>
          <div className="min-w-0 flex-1 p-3 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[13px] font-bold">Selamat datang, Henri 👋</p>
                <p className="text-[8.5px] text-[#6b6886]">Kelola, jalankan, dan kembangkan AI Agent Anda di TANIA.</p>
              </div>
              <span className="flex shrink-0 items-center gap-1 rounded-md bg-[#7b5cff] px-2 py-1 text-[8.5px] font-semibold text-white">
                <Plus size={9} /> Buat Agent
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
              {stats.map(({ icon: Icon, label, value, tone }) => (
                <div key={label} className="flex items-center gap-2 rounded-lg border border-[#ecebf3] p-2">
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${tone}`}><Icon size={11} /></span>
                  <div className="min-w-0">
                    <p className="text-[7.5px] leading-tight text-[#6b6886]">{label}</p>
                    <p className="text-[12px] font-bold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-[9.5px]">
              <span className="font-bold">Agent Aktif</span>
              <span className="flex items-center text-[8.5px] font-semibold text-[#4a2fd0]">Lihat Semua <ChevronRight size={9} /></span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {active.map(({ icon: Icon, name, desc }) => (
                <div key={name} className="rounded-lg border border-[#ecebf3] p-2">
                  <div className="flex items-center gap-1.5">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ede9ff] text-[#4a2fd0]"><Icon size={10} /></span>
                    <span className="truncate text-[9px] font-bold">{name}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[7.5px] text-[#6b6886]">{desc}</p>
                  <span className="mt-1.5 inline-block rounded bg-[#dcf5e6] px-1.5 py-0.5 text-[7px] font-semibold text-[#16a34a]">• Aktif</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* laptop base */}
      <div className="mx-[-4%] h-3 rounded-b-xl bg-gradient-to-b from-[#c9c6d8] to-[#9d9ab0]" />
    </div>
  );
}

// Stylised glass office tower with trees, used as a backdrop for the "what is TANIA" section.
export function OfficeTower({ className = "" }: { className?: string }) {
  const cols = Array.from({ length: 8 }, (_, i) => i);
  const rows = Array.from({ length: 16 }, (_, i) => i);
  return (
    <svg viewBox="0 0 300 420" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="t-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dcd5ff" stopOpacity="0" />
          <stop offset="1" stopColor="#c9bfff" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="t-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef3ff" />
          <stop offset="0.5" stopColor="#b9c8ea" />
          <stop offset="1" stopColor="#8fa3cf" />
        </linearGradient>
        <linearGradient id="t-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8295c2" />
          <stop offset="1" stopColor="#6c7fae" />
        </linearGradient>
      </defs>
      <rect width="300" height="420" fill="url(#t-sky)" />
      <path d="M70 70 L200 40 L200 420 L70 420 Z" fill="url(#t-glass)" />
      <path d="M200 40 L250 64 L250 420 L200 420 Z" fill="url(#t-side)" />
      <path d="M70 70 L200 40 L250 64 L120 92 Z" fill="#f6f7ff" />
      {rows.map((r) =>
        cols.map((c) => (
          <rect key={`${r}-${c}`} x={76 + c * 15.5} y={78 + r * 21 - c * 3.6} width="12" height="15" fill="#ffffff" opacity={0.25 + ((r + c) % 3) * 0.12} />
        )),
      )}
      {rows.map((r) => (
        <line key={r} x1="200" y1={84 + r * 21} x2="250" y2={104 + r * 21} stroke="#ffffff" strokeOpacity="0.25" />
      ))}
      {/* trees */}
      {[[30, 360, 46], [90, 378, 40], [150, 372, 48], [215, 380, 42], [272, 366, 46]].map(([x, y, r]) => (
        <g key={x}>
          <circle cx={x} cy={y} r={r} fill="#3f8a4a" />
          <circle cx={x - r * 0.35} cy={y - r * 0.3} r={r * 0.6} fill="#5aa65e" />
          <circle cx={x + r * 0.3} cy={y - r * 0.45} r={r * 0.45} fill="#6fbd6c" />
        </g>
      ))}
    </svg>
  );
}
