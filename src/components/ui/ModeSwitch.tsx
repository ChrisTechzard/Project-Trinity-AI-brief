import type { ViewMode } from '@/types/content';
import { useViewMode } from '@/context/ViewModeContext';

interface ModeSwitchProps {
  compact?: boolean;
}

const options: { value: ViewMode; label: string }[] = [
  { value: 'brief', label: 'Brief' },
  { value: 'detailed', label: 'Detailed' },
];

export function ModeSwitch({ compact = false }: ModeSwitchProps): JSX.Element {
  const { mode, setMode } = useViewMode();

  return (
    <div
      role="group"
      aria-label="Page detail level"
      className={`inline-flex items-center rounded-lg border border-white/15 bg-white/5 p-1 ${compact ? 'w-full' : ''}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={mode === option.value}
          onClick={() => setMode(option.value)}
          className={`min-h-11 flex-1 rounded-md px-3 text-xs font-semibold transition duration-250 cursor-pointer ${
            mode === option.value
              ? 'bg-white text-navy-900 shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
