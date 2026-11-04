import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 font-semibold tracking-tight text-ink">
      <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="var(--accent)" />
        <path d="M9 10h14M16 10v13" stroke="var(--surface)" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="23" cy="22" r="2.6" fill="var(--surface)" />
      </svg>
      <span>
        TANIA<span className="text-accent">-Agents</span>
      </span>
    </Link>
  );
}
