"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, UserRound, AlertCircle, Loader2 } from "lucide-react";

function MicrosoftIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 21 21">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          router.push("/app");
        }
      })
      .catch(() => {});
  }, [router]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.endsWith("@telkom.co.id") && !cleanEmail.endsWith("@digitaltelkom.id")) {
      setNotice("Akses khusus karyawan Telkom: Harap gunakan email @telkom.co.id atau @digitaltelkom.id");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/dev-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        setNotice(data.error || "Gagal masuk. Periksa kembali email Anda.");
      } else {
        router.push("/app");
      }
    } catch {
      setNotice("Terjadi kesalahan jaringan saat mencoba masuk.");
    } finally {
      setLoading(false);
    }
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
      <p className="mt-2 text-[15px] text-muted">
        Gunakan akun SSO Telkom Anda untuk mengakses workspace AI Agent Enterprise.
      </p>

      {/* Google & Microsoft SSO Buttons */}
      <div className="mt-6 flex flex-col gap-2.5">
        <a
          href="/api/auth/google"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-line bg-surface py-3 text-[14px] font-semibold transition hover:border-accent hover:bg-surface-2 shadow-sm"
        >
          <GoogleIcon />
          <span>Masuk dengan Google (Akun Telkom)</span>
        </a>

        <a
          href="/api/auth/azure"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-line bg-surface py-3 text-[14px] font-semibold transition hover:border-accent hover:bg-surface-2 shadow-sm text-ink/90"
        >
          <MicrosoftIcon />
          <span>Masuk dengan Microsoft 365 (Telkom)</span>
        </a>
      </div>

      <div className="my-5 flex items-center gap-3 text-sm text-muted">
        <span className="h-px flex-1 bg-line" /> atau masuk langsung <span className="h-px flex-1 bg-line" />
      </div>

      {(urlError || notice) && (
        <div role="alert" className="mb-4 flex items-start gap-2.5 rounded-xl border border-danger/40 bg-danger-soft p-3 text-sm text-danger">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{urlError || notice}</span>
        </div>
      )}

      <form onSubmit={submit} className="space-y-3">
        <label className={field}>
          <UserRound size={20} className="shrink-0 text-muted" aria-hidden="true" />
          <span className="sr-only">Email Telkom</span>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            placeholder="nik@telkom.co.id atau nama@telkom.co.id"
            className="min-w-0 flex-1 bg-transparent py-3.5 text-[15px] outline-none placeholder:text-muted"
          />
        </label>
        <label className={field}>
          <Lock size={20} className="shrink-0 text-muted" aria-hidden="true" />
          <span className="sr-only">Password</span>
          <input
            name="password"
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Password (opsional di dev)"
            className="min-w-0 flex-1 bg-transparent py-3.5 text-[15px] outline-none placeholder:text-muted"
          />
          <button type="button" onClick={() => setShowPw((s) => !s)} aria-label={showPw ? "Sembunyikan password" : "Tampilkan password"} className="text-muted hover:text-ink">
            {showPw ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </label>

        <div className="flex items-center justify-between pt-1 text-sm">
          <label className="flex cursor-pointer items-center gap-2.5">
            <input type="checkbox" name="remember" defaultChecked className="h-[18px] w-[18px] rounded accent-[var(--accent)]" />
            Ingat saya
          </label>
          <span className="text-xs text-muted">Domain: @telkom.co.id</span>
        </div>

        <button
          type="submit"
          disabled={loading || !email}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-base font-semibold text-surface shadow-[0_14px_30px_-14px_rgba(74,47,208,0.9)] hover:bg-accent-strong disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Menghubungkan...
            </>
          ) : (
            <>
              Masuk ke Workspace <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <p className="mt-7 text-center text-xs text-muted">
        Terhubung secara aman dengan Single Sign-On (SSO) Telkom Indonesia &amp; ModelHub.
      </p>
    </div>
  );
}
