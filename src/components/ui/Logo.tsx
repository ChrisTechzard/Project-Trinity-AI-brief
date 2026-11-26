interface LogoProps {
  tone?: 'light' | 'dark';
  compact?: boolean;
  className?: string;
}

export function Logo({ tone = 'light', compact = false, className = '' }: LogoProps): JSX.Element {
  const textTone = tone === 'light' ? 'text-white' : 'text-navy-900';
  const subTone = tone === 'light' ? 'text-slate-400' : 'text-slate-500';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className="h-9 w-9 shrink-0"
        role="img"
        aria-label="Project Trinity AI mark"
      >
        <rect width="64" height="64" rx="14" fill={tone === 'light' ? '#0B1220' : '#0F172A'} />
        <g stroke="#38BDF8" strokeWidth="3" strokeLinecap="round">
          <path d="M32 13 32 35" />
          <path d="M14 48 32 35" />
          <path d="M50 48 32 35" />
        </g>
        <g fill="#7DD3FC">
          <circle cx="32" cy="13" r="4.5" />
          <circle cx="14" cy="48" r="4.5" />
          <circle cx="50" cy="48" r="4.5" />
        </g>
        <circle cx="32" cy="35" r="7" fill="#2563EB" stroke="#E0F2FE" strokeWidth="2" />
        <path d="M29 32.5h6M29 35.5h6M32 30v8" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[15px] font-bold tracking-[0.12em] ${textTone}`}>
          {compact ? 'TRINITY AI' : 'PROJECT TRINITY AI'}
        </span>
        <span className={`mt-1 font-mono text-[9px] uppercase tracking-[0.2em] ${subTone}`}>
          Ghana · Prototype
        </span>
      </span>
    </span>
  );
}
