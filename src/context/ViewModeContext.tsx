import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { ViewMode } from '@/types/content';

interface ViewModeContextValue {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextValue | null>(null);

function readModeFromUrl(): ViewMode {
  try {
    return new URLSearchParams(window.location.search).get('view') === 'detailed'
      ? 'detailed'
      : 'brief';
  } catch {
    return 'brief';
  }
}

interface ViewModeProviderProps {
  children: ReactNode;
}

export function ViewModeProvider({ children }: ViewModeProviderProps): JSX.Element {
  const [mode, setModeState] = useState<ViewMode>(readModeFromUrl);

  useEffect(() => {
    const onPopState = (): void => setModeState(readModeFromUrl());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const setMode = useCallback(
    (next: ViewMode): void => {
      if (next === mode) {
        return;
      }
      const url = new URL(window.location.href);
      if (next === 'brief') {
        url.searchParams.delete('view');
      } else {
        url.searchParams.set('view', 'detailed');
      }
      url.hash = '';
      window.history.pushState({}, '', url);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setModeState(next);
    },
    [mode],
  );

  const value = useMemo<ViewModeContextValue>(() => ({ mode, setMode }), [mode, setMode]);

  return <ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>;
}

export function useViewMode(): ViewModeContextValue {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error('useViewMode must be used inside ViewModeProvider.');
  }
  return context;
}
