import { CircleDot, FlaskConical, Flag, Images } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { EvidenceLabel } from '@/types/content';

interface EvidenceTagProps {
  label: EvidenceLabel;
  variant?: 'light' | 'dark';
}

interface EvidenceStyle {
  icon: LucideIcon;
  light: string;
  dark: string;
}

const config: Record<EvidenceLabel, EvidenceStyle> = {
  MEASURED: {
    icon: CircleDot,
    light: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    dark: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  },
  SIMULATED: {
    icon: FlaskConical,
    light: 'border-amber-200 bg-amber-50 text-amber-700',
    dark: 'border-amber-300/30 bg-amber-300/10 text-amber-200',
  },
  PLANNED: {
    icon: Flag,
    light: 'border-blue-200 bg-blue-50 text-blue-700',
    dark: 'border-blue-300/30 bg-blue-300/10 text-blue-200',
  },
  'PROJECT SOURCE': {
    icon: Images,
    light: 'border-slate-200 bg-slate-100 text-slate-600',
    dark: 'border-white/20 bg-white/10 text-slate-200',
  },
} as const;

export function EvidenceTag({ label, variant = 'light' }: EvidenceTagProps): JSX.Element {
  const item = config[label];
  const Icon = item.icon;

  return (
    <span className={`evidence-badge ${variant === 'dark' ? item.dark : item.light}`}>
      <Icon aria-hidden="true" className="h-3 w-3" />
      {label}
    </span>
  );
}
