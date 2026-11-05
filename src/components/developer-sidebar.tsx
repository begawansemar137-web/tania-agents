import Link from "next/link";
import {
  Activity, Boxes, Code2, CreditCard, FlaskConical, FolderOpen, Home, Layers, Rocket, Workflow, type LucideIcon,
} from "lucide-react";
import { LogoMark } from "./brand";

const nav: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/developer", label: "Overview", icon: Home },
  { href: "/developer#quick-start", label: "Quick Start", icon: Rocket },
  { href: "/developer#api", label: "API & SDK", icon: Code2 },
  { href: "/app/agents/new", label: "Agent Builder", icon: Layers },
  { href: "/app/settings", label: "Model Hub", icon: Boxes },
  { href: "/app/integrations", label: "Integration", icon: Workflow },
  { href: "/app/agents/sales-prep", label: "Playground", icon: FlaskConical },
  { href: "/app/workspace", label: "Project", icon: FolderOpen },
  { href: "/app/runs", label: "Monitoring", icon: Activity },
  { href: "/app/analytics", label: "Billing & Quota", icon: CreditCard },
];

export function DeveloperSidebar() {
  return (
    <>
      <nav aria-label="Menu developer" className="sticky top-[72px] z-30 flex gap-1 overflow-x-auto border-b border-line bg-surface px-4 py-2 lg:hidden">
        {nav.map(({ href, label, icon: Icon }, i) => (
          <Link
            key={href}
            href={href}
            aria-current={i === 0 ? "page" : undefined}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm ${i === 0 ? "bg-accent-soft font-semibold text-accent" : "text-muted"}`}
          >
            <Icon size={16} aria-hidden="true" /> {label}
          </Link>
        ))}
      </nav>

      <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] w-[256px] shrink-0 flex-col gap-6 overflow-y-auto border-r border-line bg-surface px-4 py-6 lg:flex">
        <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-3 shadow-[0_8px_24px_-18px_rgba(40,20,120,0.5)]">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft">
            <LogoMark size={24} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold">TANIA Developer</p>
            <p className="text-[11px] whitespace-nowrap text-muted">Build • Integrate • Extend</p>
          </div>
        </div>
        <nav aria-label="Menu developer" className="flex flex-col gap-1">
          {nav.map(({ href, label, icon: Icon }, i) => (
            <Link
              key={href}
              href={href}
              aria-current={i === 0 ? "page" : undefined}
              className={`flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-[15px] transition-colors ${
                i === 0 ? "bg-accent-soft font-semibold text-accent" : "font-medium text-ink hover:bg-surface-2"
              }`}
            >
              <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
