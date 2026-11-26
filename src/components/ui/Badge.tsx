import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'light' | 'dark' | 'blue';
  icon?: LucideIcon;
  className?: string;
}

const toneClasses = {
  light: 'border-accent-bright/30 bg-accent-bright/10 text-accent-soft',
  dark: 'border-slate-300 bg-slate-100 text-slate-600',
  blue: 'border-accent-brand/25 bg-accent-brand/10 text-accent-deep',
} as const;

export function Badge({ children, tone = 'light', icon: Icon, className = '' }: BadgeProps): JSX.Element {
  return (
    <span className={`evidence-badge ${toneClasses[tone]} ${className}`}>
      {Icon ? <Icon aria-hidden="true" className="h-3 w-3" /> : null}
      {children}
    </span>
  );
}
