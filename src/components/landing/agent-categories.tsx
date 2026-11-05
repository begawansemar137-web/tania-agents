"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BarChart3, Briefcase, CalendarCheck, Code2, Database, Headphones, Plus, Settings, Users, ArrowRight,
  type LucideIcon,
} from "lucide-react";

type Category = { name: string; icon: LucideIcon; desc: string; href: string; cta: string };

const categories: Category[] = [
  { name: "Business Agent", icon: Briefcase, desc: "Siapkan brief sales, pantau kompetitor, dan tindak lanjuti prospek otomatis.", href: "/app/agents/sales-prep", cta: "Coba Sari, agen sales" },
  { name: "Productivity Agent", icon: CalendarCheck, desc: "Ringkas rapat, kelola jadwal, dan rapikan tugas harian tim.", href: "/app", cta: "Lihat agen" },
  { name: "Data Agent", icon: BarChart3, desc: "Kumpulkan data dari web dan sistem internal, lalu ubah jadi laporan.", href: "/app/agents/competitor-watch", cta: "Coba Raka, agen riset" },
  { name: "IT & Dev Agent", icon: Code2, desc: "Bantu triase insiden, review perubahan, dan dokumentasi teknis.", href: "/app/integrations", cta: "Lihat integrasi developer" },
  { name: "Operations Agent", icon: Settings, desc: "Jalankan proses operasional berulang sesuai jadwal atau event.", href: "/app/automations", cta: "Lihat automasi" },
  { name: "Customer Agent", icon: Headphones, desc: "Balas lead dan tiket pelanggan dengan cepat dan konsisten.", href: "/app/agents/inbound-lead", cta: "Coba Nadia, agen lead" },
  { name: "Finance Agent", icon: Database, desc: "Ingatkan penagihan, cocokkan invoice, dan siapkan rekap biaya.", href: "/app", cta: "Lihat agen" },
  { name: "HR Agent", icon: Users, desc: "Jawab pertanyaan karyawan dan pandu onboarding dari dokumen kebijakan.", href: "/app/agents/hr-onboarding", cta: "Coba Tari, agen HR" },
  { name: "Custom Agent", icon: Plus, desc: "Ceritakan pekerjaannya, lalu bangun agen Anda sendiri lewat chat.", href: "/app", cta: "Buat agen baru" },
];

export function AgentCategories() {
  const [active, setActive] = useState(0);
  const current = categories[active];

  return (
    <div id="kategori" className="scroll-mt-24">
      <div role="tablist" aria-label="Kategori agen" className="-mx-4 flex gap-3 overflow-x-auto px-4 pt-1 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-9 lg:overflow-visible lg:px-0">
        {categories.map(({ name, icon: Icon }, i) => {
          const selected = i === active;
          return (
            <button
              key={name}
              role="tab"
              id={`kat-${i}`}
              aria-selected={selected}
              aria-controls="kat-panel"
              onClick={() => setActive(i)}
              className={`relative flex min-w-[132px] shrink-0 flex-col items-center gap-2.5 rounded-xl border px-2 py-4 text-center text-[15px] xl:text-sm 2xl:text-[15px] transition lg:min-w-0 ${
                selected
                  ? "border-accent/30 bg-accent-soft font-semibold text-accent shadow-[0_10px_30px_-18px_rgba(74,47,208,0.7)] after:absolute after:bottom-1.5 after:h-1 after:w-6 after:rounded-full after:bg-accent"
                  : "border-line bg-surface font-medium text-ink hover:border-accent/40 hover:shadow-sm"
              }`}
            >
              <Icon size={28} strokeWidth={1.6} aria-hidden="true" />
              <span className="leading-tight xl:whitespace-nowrap">{name}</span>
            </button>
          );
        })}
      </div>
      <div id="kat-panel" role="tabpanel" aria-labelledby={`kat-${active}`} className="mt-3 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted">
          <span className="font-semibold text-ink">{current.name}:</span> {current.desc}
        </p>
        <Link href={current.href} className="inline-flex shrink-0 items-center gap-1 font-semibold text-accent hover:underline">
          {current.cta} <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
