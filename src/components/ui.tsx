import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "ok" | "warn" | "danger";

const toneClass: Record<Tone, string> = {
  neutral: "bg-surface-2 text-muted",
  accent: "bg-accent-soft text-accent-strong",
  ok: "bg-ok-soft text-ok",
  warn: "bg-warn-soft text-warn",
  danger: "bg-danger-soft text-danger",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${toneClass[tone]}`}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: "sukses" | "gagal" | "menunggu persetujuan" }) {
  const tone: Tone = status === "sukses" ? "ok" : status === "gagal" ? "danger" : "warn";
  return <Badge tone={tone}>{status}</Badge>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-line bg-surface ${className}`}>{children}</div>;
}

export function PageHeader({ title, desc, action }: { title: string; desc?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {desc && <p className="mt-1 text-sm text-muted">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

export const btn =
  "inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors disabled:opacity-50";
export const btnPrimary = `${btn} bg-accent text-surface hover:bg-accent-strong`;
export const btnGhost = `${btn} border border-line bg-surface text-ink hover:bg-surface-2`;
