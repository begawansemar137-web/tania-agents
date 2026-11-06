"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, ShieldCheck, User } from "lucide-react";
import { LogoMark } from "./brand";

type UserSession = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export function AppHeader() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/masuk");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1680px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex shrink-0 items-center gap-2 text-lg tracking-tight whitespace-nowrap text-ink" aria-label="TANIA Agents, beranda">
          <LogoMark />
          <span className="hidden sm:inline">
            <span className="font-extrabold">TANIA</span> <span className="font-medium">Agents</span>
          </span>
        </Link>

        {user ? (
          <span
            className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-xs font-semibold whitespace-nowrap text-accent"
            title={`Masuk sebagai ${user.email}`}
          >
            <ShieldCheck size={14} aria-hidden="true" />
            Telkom Workspace
            <span className="hidden font-normal sm:inline">· {user.email}</span>
          </span>
        ) : (
          <span
            className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-warn/40 px-3 py-1 text-xs font-semibold whitespace-nowrap text-warn"
            title="Sesi lokal aktif."
          >
            Sesi Lokal
          </span>
        )}

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-ink truncate max-w-[150px]">{user.name}</span>
                <span className="text-[11px] text-muted truncate max-w-[150px]">{user.email}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2 text-xs font-medium text-muted hover:border-danger hover:text-danger transition"
                title="Keluar dari akun"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          ) : (
            <Link
              href="/masuk"
              className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-surface hover:bg-accent-strong"
            >
              <User size={14} />
              Masuk Telkom
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
