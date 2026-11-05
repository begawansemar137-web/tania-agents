"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, BarChart3, BookOpen, Bot, Home, Network, Puzzle, Activity, Settings } from "lucide-react";
import { LogoMark } from "./brand";

const nav = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/app", label: "Agents", icon: Bot },
  { href: "/app/automations", label: "Workflow", icon: Network },
  { href: "/app/workspace", label: "Knowledge", icon: BookOpen },
  { href: "/app/integrations", label: "Integrations", icon: Puzzle },
  { href: "/app/runs", label: "Monitoring", icon: Activity },
  { href: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return false;
  if (href === "/app") return pathname === "/app" || pathname.startsWith("/app/agents");
  return pathname.startsWith(href);
}

// Small stacked cubes for the "build your own agent" card. Solid fills so repeated renders never clash on ids.
function Cubes() {
  return (
    <svg viewBox="0 0 96 88" className="h-[84px] w-[92px]" aria-hidden="true">
      <g opacity="0.55">
        <path d="M14 52 30 43l16 9-16 9Z" fill="#cbbcff" />
        <path d="M14 52v18l16 9V61Z" fill="#b29dff" />
        <path d="M46 52v18l-16 9V61Z" fill="#9c82ff" />
      </g>
      <path d="M46 56 64 46l18 10-18 10Z" fill="#a993ff" />
      <path d="M46 56v20l18 10V66Z" fill="#7f5cff" />
      <path d="M82 56v20L64 86V66Z" fill="#5f3ae6" />
      <path d="M44 12 62 2l18 10-18 10Z" fill="#b6a2ff" />
      <path d="M44 12v20l18 10V22Z" fill="#7b55ff" />
      <path d="M80 12v20L62 42V22Z" fill="#5a35e0" />
      <path d="M62 15v12M56 21h12" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile: horizontal section nav under the site header */}
      <nav aria-label="Menu aplikasi" className="sticky top-[72px] z-30 flex gap-1 overflow-x-auto border-b border-line bg-surface px-4 py-2 lg:hidden">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm ${active ? "bg-accent-soft font-semibold text-accent" : "text-muted"}`}
            >
              <Icon size={16} aria-hidden="true" /> {label}
            </Link>
          );
        })}
      </nav>

      {/* Desktop sidebar */}
      <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] w-[256px] shrink-0 flex-col gap-6 overflow-y-auto border-r border-line bg-surface px-4 py-6 lg:flex">
        <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-3 shadow-[0_8px_24px_-18px_rgba(40,20,120,0.5)]">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft">
            <LogoMark size={24} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold">TANIA Platform</p>
            <p className="truncate text-xs text-muted">Enterprise AI Agents</p>
          </div>
        </div>

        <nav aria-label="Menu aplikasi" className="flex flex-col gap-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-[15px] transition-colors ${
                  active ? "bg-accent-soft font-semibold text-accent" : "font-medium text-ink hover:bg-surface-2"
                }`}
              >
                <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="relative mt-auto shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-accent-soft to-surface-2 p-5">
          <div className="absolute -top-1 -right-2">
            <Cubes />
          </div>
          <p className="relative max-w-[62%] text-lg leading-snug font-extrabold">Buat AI Agent Anda Sendiri</p>
          <p className="relative mt-2 text-sm text-muted">Rancang, latih, dan deploy agent sesuai kebutuhan bisnis.</p>
          <Link href="/app/agents/new" className="relative mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-surface hover:bg-accent-strong">
            Buat Agent <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </aside>
    </>
  );
}
