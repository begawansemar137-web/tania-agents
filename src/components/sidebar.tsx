"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bot, Workflow, Activity, Plug, FolderOpen, Menu, X, Settings } from "lucide-react";
import { Logo } from "./brand";

const nav = [
  { href: "/app", label: "Agen", icon: Bot },
  { href: "/app/automations", label: "Automasi", icon: Workflow },
  { href: "/app/runs", label: "Jejak & Biaya", icon: Activity },
  { href: "/app/integrations", label: "Integrasi", icon: Plug },
  { href: "/app/workspace", label: "Workspace", icon: FolderOpen },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/app" ? pathname === "/app" || pathname.startsWith("/app/agents") : pathname.startsWith(href);

  const links = (
    <nav className="flex flex-col gap-1">
      {nav.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setOpen(false)}
          aria-current={isActive(href) ? "page" : undefined}
          className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
            isActive(href) ? "bg-accent-soft font-medium text-accent-strong" : "text-muted hover:bg-surface-2 hover:text-ink"
          }`}
        >
          <Icon size={17} aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  );

  const footer = (
    <div className="mt-auto border-t border-line pt-4">
      <div className="flex items-center gap-3 px-2">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-semibold text-surface">HS</div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">Henri S.</p>
          <p className="truncate text-xs text-muted">Tim Growth · Admin</p>
        </div>
        <Settings size={16} className="text-muted" aria-label="Pengaturan" />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-surface px-4 py-3 lg:hidden">
        <Logo href="/app" />
        <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Tutup menu" : "Buka menu"} className="rounded-md p-1.5 hover:bg-surface-2">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 top-[57px] z-20 flex flex-col bg-surface p-4 lg:hidden">
          {links}
          {footer}
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col gap-6 border-r border-line bg-surface p-4 lg:flex">
        <div className="px-2 pt-1">
          <Logo href="/app" />
        </div>
        {links}
        {footer}
      </aside>
    </>
  );
}
