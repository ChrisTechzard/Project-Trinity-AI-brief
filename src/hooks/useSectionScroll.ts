import { useCallback } from 'react';
import type { MouseEvent } from 'react';
import { useReducedMotion } from 'framer-motion';

/** Reliable in-page navigation that respects the fixed header and reduced-motion preference. */
export function useSectionScroll(): (event: MouseEvent<HTMLAnchorElement>, href: string) => void {
  const reducedMotion = useReducedMotion();

  return useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string): void => {
      if (!href.startsWith('#')) {
        return;
      }
      const target = document.getElementById(href.slice(1));
      if (!target) {
        return;
      }
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      const url = new URL(window.location.href);
      url.hash = href;
      window.history.replaceState(null, '', url);
    },
    [reducedMotion],
  );
}
