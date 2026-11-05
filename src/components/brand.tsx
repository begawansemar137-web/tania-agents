import Link from "next/link";

export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 36" aria-hidden="true">
      {/* Stylised "A": a bold triangle with a notch cut from the base */}
      <path
        d="M20 2c1.6 0 3 .9 3.8 2.3l14.7 25.4c1.5 2.7-.4 6.1-3.5 6.1h-6.6L20 20.6 11.6 35.8H5c-3.1 0-5-3.4-3.5-6.1L16.2 4.3C17 2.9 18.4 2 20 2Z"
        fill="var(--accent)"
      />
      {/* lighter right face gives the mark depth without a gradient id (ids collide when the logo renders twice) */}
      <path d="M20 2c1.6 0 3 .9 3.8 2.3l14.7 25.4c1.5 2.7-.4 6.1-3.5 6.1h-6.6L20 20.6Z" fill="var(--accent-2)" opacity="0.85" />
    </svg>
  );
}

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 text-lg tracking-tight text-ink" aria-label="TANIA Agents, beranda">
      <LogoMark />
      <span>
        <span className="font-extrabold">TANIA</span> <span className="font-medium">Agents</span>
      </span>
    </Link>
  );
}
