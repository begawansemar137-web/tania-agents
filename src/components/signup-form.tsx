"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft, ArrowRight, Building2, Check, Code2, Eye, EyeOff, Lock, Mail, MessageCircle, UserRound, UsersRound,
  type LucideIcon,
} from "lucide-react";
import { industries } from "@/lib/solutions";

// Sign-up UI only. There is no account backend yet: nothing leaves the browser,
// and the last step says so plainly instead of pretending an account was created.

type Role = "pengguna" | "developer" | "admin" | "organisasi";

const roles: { id: Role; label: string; hint: string; icon: LucideIcon; next: { href: string; label: string } }[] = [
  { id: "pengguna", label: "Pengguna", hint: "Business User", icon: UserRound, next: { href: "/app", label: "Jelajahi katalog agen" } },
  { id: "developer", label: "Developer", hint: "Build & Integrate", icon: Code2, next: { href: "/developer", label: "Buka Developer Portal" } },
  { id: "admin", label: "Admin", hint: "Kelola Organisasi", icon: UsersRound, next: { href: "/app/settings", label: "Buka pengaturan" } },
  { id: "organisasi", label: "Organisasi", hint: "Perusahaan/Instansi", icon: Building2, next: { href: "/solusi", label: "Lihat solusi enterprise" } },
];

const steps = ["Data Akun", "Profil", "Selesai"] as const;
const teamSizes = ["1–10 orang", "11–50 orang", "51–200 orang", "201–1.000 orang", "> 1.000 orang"];

const fieldBox =
  "flex items-center gap-3 rounded-xl border border-line bg-surface px-4 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/15";
const inputCls = "min-w-0 flex-1 bg-transparent py-3 text-[15px] outline-none placeholder:text-muted";
const labelCls = "mb-1.5 block text-sm font-bold";
const Req = () => <span className="text-danger" aria-hidden="true">*</span>;

export function SignupForm() {
  const [step, setStep] = useState(0);
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState<Role>("pengguna");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const chosen = roles.find((r) => r.id === role)!;

  return (
    <div className="rounded-[28px] border border-line bg-surface p-6 shadow-[0_30px_80px_-40px_rgba(40,20,120,0.45)] sm:p-9">
      <h1 className="text-[26px] leading-tight font-extrabold tracking-tight sm:text-[32px]">
        Daftar Gratis ke <span className="text-accent">TANIA Agents</span>
      </h1>
      <p className="mt-1.5 text-[15px] text-muted">Buat akun untuk mulai menggunakan platform AI Agent Enterprise.</p>

      <ol className="mt-6 flex items-start" aria-label="Langkah pendaftaran">
        {steps.map((label, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <li key={label} className={`flex items-start ${i < steps.length - 1 ? "flex-1" : ""}`} aria-current={current ? "step" : undefined}>
              <div className="flex w-20 shrink-0 flex-col items-center gap-1.5 text-center">
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full border-2 text-sm font-bold ${
                    current || done ? "border-accent bg-accent text-surface" : "border-line bg-surface text-muted"
                  }`}
                >
                  {done ? <Check size={16} strokeWidth={3} aria-hidden="true" /> : i + 1}
                </span>
                <span className={`text-sm ${current ? "border-b-2 border-accent pb-1 font-bold text-accent" : done ? "font-semibold text-ink" : "text-muted"}`}>
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && <span className={`mt-[18px] h-0.5 flex-1 ${done ? "bg-accent" : "bg-line"}`} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>

      {step === 0 && (
        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            setStep(1);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="su-name" className={labelCls}>Nama Lengkap <Req /></label>
              <div className={fieldBox}>
                <UserRound size={19} className="shrink-0 text-muted" aria-hidden="true" />
                <input id="su-name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan nama lengkap" className={inputCls} />
              </div>
            </div>
            <div>
              <label htmlFor="su-email" className={labelCls}>Email Kerja <Req /></label>
              <div className={fieldBox}>
                <Mail size={19} className="shrink-0 text-muted" aria-hidden="true" />
                <input id="su-email" required type="email" autoComplete="email" placeholder="nama@perusahaan.com" className={inputCls} />
              </div>
            </div>
            <div>
              <label htmlFor="su-wa" className={labelCls}>Nomor WhatsApp <Req /></label>
              <div className={fieldBox}>
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-whatsapp text-white" aria-hidden="true">
                  <MessageCircle size={13} strokeWidth={2.6} />
                </span>
                <input
                  id="su-wa"
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  pattern="(\+62|62|0)8[0-9]{7,12}"
                  title="Nomor WhatsApp Indonesia, contoh 081234567890"
                  placeholder="08xxxxxxxxxx"
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label htmlFor="su-pw" className={labelCls}>Password <Req /></label>
              <div className={fieldBox}>
                <Lock size={19} className="shrink-0 text-muted" aria-hidden="true" />
                <input id="su-pw" required minLength={8} type={showPw ? "text" : "password"} autoComplete="new-password" placeholder="Min. 8 karakter" className={inputCls} />
                <button type="button" onClick={() => setShowPw((s) => !s)} aria-label={showPw ? "Sembunyikan password" : "Tampilkan password"} className="text-muted hover:text-ink">
                  {showPw ? <Eye size={19} /> : <EyeOff size={19} />}
                </button>
              </div>
            </div>
          </div>

          <fieldset className="mt-5">
            <legend className={labelCls}>Pilih Peran Anda <Req /></legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {roles.map(({ id, label, hint, icon: Icon }) => {
                const on = role === id;
                return (
                  <label
                    key={id}
                    className={`relative flex cursor-pointer flex-col items-center gap-1 rounded-xl border px-2 py-3.5 text-center transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/40 ${
                      on ? "border-accent bg-accent-soft" : "border-line hover:border-accent/60"
                    }`}
                  >
                    <input type="radio" name="role" value={id} checked={on} onChange={() => setRole(id)} className="sr-only" />
                    {on && (
                      <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-accent text-surface" aria-hidden="true">
                        <Check size={14} strokeWidth={3} />
                      </span>
                    )}
                    <Icon size={24} strokeWidth={1.7} className={on ? "text-accent" : "text-ink"} aria-hidden="true" />
                    <span className="text-[15px] font-bold">{label}</span>
                    <span className={`text-xs ${on ? "text-accent" : "text-muted"}`}>({hint})</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <label className="mt-5 flex cursor-pointer items-start gap-3 text-[15px]">
            <input type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--accent)]" />
            <span>Saya memahami bahwa ini versi demo: data pendaftaran belum disimpan dan akun belum dibuat.</span>
          </label>

          <button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-base font-semibold text-surface shadow-[0_14px_30px_-14px_rgba(74,47,208,0.9)] hover:bg-accent-strong">
            Lanjut <ArrowRight size={18} aria-hidden="true" />
          </button>
        </form>
      )}

      {step === 1 && (
        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="su-company" className={labelCls}>Nama Perusahaan / Instansi <Req /></label>
              <div className={fieldBox}>
                <Building2 size={19} className="shrink-0 text-muted" aria-hidden="true" />
                <input id="su-company" required autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="PT Contoh Indonesia" className={inputCls} />
              </div>
            </div>
            <div>
              <label htmlFor="su-industry" className={labelCls}>Industri <Req /></label>
              <select id="su-industry" required defaultValue="" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] outline-none focus:border-accent">
                <option value="" disabled>Pilih industri</option>
                {industries.map((i) => <option key={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="su-size" className={labelCls}>Ukuran Tim <Req /></label>
              <select id="su-size" required defaultValue="" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] outline-none focus:border-accent">
                <option value="" disabled>Pilih ukuran tim</option>
                {teamSizes.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="su-goal" className={labelCls}>Apa yang ingin Anda otomatisasi? <span className="font-normal text-muted">(opsional)</span></label>
              <textarea id="su-goal" rows={3} placeholder="Contoh: menjawab pertanyaan pelanggan di WhatsApp" className="w-full resize-none rounded-xl border border-line bg-surface px-4 py-3 text-[15px] outline-none placeholder:text-muted focus:border-accent" />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={() => setStep(0)} className="flex items-center gap-2 rounded-xl border border-line px-5 py-3.5 font-semibold hover:border-accent">
              <ArrowLeft size={18} aria-hidden="true" /> Kembali
            </button>
            <button type="submit" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-base font-semibold text-surface hover:bg-accent-strong">
              Daftar Gratis <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="mt-6" role="status">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ok-soft text-ok">
              <Check size={24} strokeWidth={3} aria-hidden="true" />
            </span>
            <div>
              <p className="text-lg font-bold">Terima kasih, {name.split(" ")[0] || "Anda"}!</p>
              <p className="text-sm text-muted">{company ? `${company} · ` : ""}{chosen.label}</p>
            </div>
          </div>
          <p className="mt-4 rounded-xl bg-accent-soft px-4 py-3 text-sm text-accent-strong">
            Pendaftaran akun belum tersambung di versi ini, jadi data Anda tidak disimpan. Semua fitur tetap bisa dicoba lewat versi demo.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link href="/app" className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-semibold text-surface hover:bg-accent-strong">
              Buka versi demo <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href={chosen.next.href} className="flex items-center justify-center rounded-xl border border-line py-3.5 font-semibold hover:border-accent">
              {chosen.next.label}
            </Link>
          </div>
        </div>
      )}

      <p className="mt-6 border-t border-line pt-5 text-center text-[15px]">
        Sudah punya akun?{" "}
        <Link href="/masuk" className="ml-1 font-bold text-accent hover:underline">Masuk Sekarang</Link>
      </p>
    </div>
  );
}
