"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, MessageCircle, UserRound } from "lucide-react";

type Tab = "perusahaan" | "lainnya";

// Login UI only. There is no account backend yet, so we never pretend to authenticate:
// submitting explains that and offers the demo instead.
export function LoginForm() {
  const [tab, setTab] = useState<Tab>("perusahaan");
  const [showPw, setShowPw] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice("Login akun belum tersambung di versi ini. Anda tetap bisa mencoba semua fitur lewat versi demo.");
  }

  const field = "flex items-center gap-3 rounded-xl border border-line bg-surface px-4 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/15";

  return (
    <div className="rounded-[28px] border border-white/70 bg-surface/95 p-6 shadow-[0_30px_80px_-40px_rgba(40,20,120,0.55)] backdrop-blur sm:p-10">
      <h1 className="text-[28px] leading-tight font-extrabold tracking-tight sm:text-[32px]">
        Masuk ke
        <span className="block text-[34px] sm:text-[40px]">
          TANIA <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">Agents</span>
        </span>
      </h1>
      <p className="mt-2 text-[15px] text-muted">Gunakan akun Anda untuk mengakses platform AI Agent Enterprise.</p>

      <div role="tablist" aria-label="Jenis akun" className="mt-6 grid grid-cols-2 gap-1 rounded-xl border border-line bg-surface-2/60 p-1">
        {([["perusahaan", "Akun Perusahaan"], ["lainnya", "Akun Lainnya"]] as const).map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`rounded-lg py-2.5 text-sm font-semibold transition ${tab === key ? "bg-accent text-surface shadow" : "text-ink hover:text-accent"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setNotice("Masuk dengan WhatsApp belum tersambung di versi ini. Anda tetap bisa mencoba versi demo.")}
        className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-xl border border-line bg-surface py-3 text-[15px] font-semibold hover:border-accent"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-whatsapp text-white" aria-hidden="true">
          <MessageCircle size={16} strokeWidth={2.4} />
        </span>
        Masuk dengan WhatsApp
      </button>

      <div className="my-5 flex items-center gap-3 text-sm text-muted">
        <span className="h-px flex-1 bg-line" /> atau <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={submit} className="space-y-3">
        <label className={field}>
          <UserRound size={20} className="shrink-0 text-muted" aria-hidden="true" />
          <span className="sr-only">{tab === "perusahaan" ? "Email kantor atau username" : "Email atau username"}</span>
          <input
            required
            name="username"
            autoComplete="username"
            placeholder={tab === "perusahaan" ? "Email kantor atau Username" : "Email atau Username"}
            className="min-w-0 flex-1 bg-transparent py-3.5 text-[15px] outline-none placeholder:text-muted"
          />
        </label>
        <label className={field}>
          <Lock size={20} className="shrink-0 text-muted" aria-hidden="true" />
          <span className="sr-only">Password</span>
          <input
            required
            name="password"
            type={showPw ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Password"
            className="min-w-0 flex-1 bg-transparent py-3.5 text-[15px] outline-none placeholder:text-muted"
          />
          <button type="button" onClick={() => setShowPw((s) => !s)} aria-label={showPw ? "Sembunyikan password" : "Tampilkan password"} className="text-muted hover:text-ink">
            {showPw ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </label>

        <div className="flex items-center justify-between pt-1 text-sm">
          <label className="flex cursor-pointer items-center gap-2.5">
            <input type="checkbox" name="remember" className="h-[18px] w-[18px] rounded accent-[var(--accent)]" />
            Ingat saya
          </label>
          <button
            type="button"
            onClick={() => setNotice("Untuk reset password, hubungi admin workspace Anda.")}
            className="font-semibold text-accent hover:underline"
          >
            Lupa password?
          </button>
        </div>

        <button type="submit" className="mt-2 w-full rounded-xl bg-accent py-3.5 text-base font-semibold text-surface shadow-[0_14px_30px_-14px_rgba(74,47,208,0.9)] hover:bg-accent-strong">
          Masuk
        </button>
      </form>

      {notice && (
        <div role="status" className="mt-4 rounded-xl bg-accent-soft px-4 py-3 text-sm text-accent-strong">
          {notice}{" "}
          <Link href="/app" className="inline-flex items-center gap-1 font-semibold underline">
            Buka versi demo <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      )}

      <p className="mt-7 text-center text-[15px]">
        Belum punya akun?{" "}
        <Link href="/daftar" className="ml-1 font-bold text-accent hover:underline">Daftar Gratis</Link>
      </p>
    </div>
  );
}
