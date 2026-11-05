// Friendly TANIA mascot: white shell, dark visor, glowing smile, one arm presenting.
export function Robot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 420" className={className} role="img" aria-label="Maskot robot TANIA Agents">
      <defs>
        <linearGradient id="r-shell" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.65" stopColor="#f1effa" />
          <stop offset="1" stopColor="#d9d4f0" />
        </linearGradient>
        <linearGradient id="r-visor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2563" />
          <stop offset="1" stopColor="#0f0d2e" />
        </linearGradient>
        <linearGradient id="r-ear" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fe3ff" />
          <stop offset="1" stopColor="#5b6cff" />
        </linearGradient>
        <linearGradient id="r-mark" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#4a2fd0" />
          <stop offset="1" stopColor="#8b5cff" />
        </linearGradient>
        <filter id="r-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="r-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#4a2fd0" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* floor shadow */}
      <ellipse cx="215" cy="400" rx="110" ry="12" fill="#4a2fd0" opacity="0.12" />

      <g filter="url(#r-shadow)">
        {/* right arm (resting) */}
        <path d="M292 262 C318 290 322 330 306 360" stroke="url(#r-shell)" strokeWidth="38" strokeLinecap="round" fill="none" />
        {/* body */}
        <path d="M150 250 C150 222 172 206 214 206 C256 206 280 222 280 250 L286 352 C288 382 258 398 216 398 C172 398 142 382 145 352 Z" fill="url(#r-shell)" />
        <path d="M168 300 C190 312 240 312 262 300" stroke="#cfc8ee" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* chest mark */}
        <path
          d="M215 318c1.3 0 2.5.7 3.2 1.9l12.3 21.3c1.3 2.2-.3 5.1-2.9 5.1h-5.5L215 333.6l-7.1 12.7h-5.5c-2.6 0-4.2-2.9-2.9-5.1l12.3-21.3c.7-1.2 1.9-1.9 3.2-1.9Z"
          fill="url(#r-mark)"
          transform="translate(-50 -150) scale(1.25)"
        />
        {/* left arm (presenting) */}
        <path d="M156 252 C120 262 92 262 64 250" stroke="url(#r-shell)" strokeWidth="36" strokeLinecap="round" fill="none" />
        <ellipse cx="52" cy="242" rx="26" ry="18" transform="rotate(-18 52 242)" fill="url(#r-shell)" />
        <path d="M40 226 C46 214 60 212 66 222" stroke="url(#r-shell)" strokeWidth="12" strokeLinecap="round" fill="none" />
        <path d="M30 240 C26 230 34 222 42 226" stroke="url(#r-shell)" strokeWidth="11" strokeLinecap="round" fill="none" />

        {/* neck */}
        <rect x="192" y="190" width="46" height="26" rx="10" fill="#d9d4f0" />
        {/* head */}
        <rect x="104" y="28" width="222" height="178" rx="86" fill="url(#r-shell)" />
        {/* ears */}
        <circle cx="104" cy="118" r="30" fill="url(#r-shell)" />
        <circle cx="104" cy="118" r="17" fill="url(#r-ear)" opacity="0.9" />
        <circle cx="326" cy="118" r="30" fill="url(#r-shell)" />
        <circle cx="326" cy="118" r="17" fill="url(#r-ear)" opacity="0.9" />
        {/* visor */}
        <rect x="128" y="56" width="174" height="124" rx="60" fill="url(#r-visor)" />
        <path d="M150 78 C170 66 200 64 222 66" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* eyes + smile */}
        <g filter="url(#r-glow)" stroke="#6fe2ff" strokeLinecap="round" fill="none">
          <path d="M162 126 Q180 104 198 126" strokeWidth="10" />
          <path d="M232 126 Q250 104 268 126" strokeWidth="10" />
          <path d="M202 146 Q215 156 228 146" strokeWidth="6" />
        </g>
      </g>
    </svg>
  );
}
