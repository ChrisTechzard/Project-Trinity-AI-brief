import { useEffect, useState } from 'react';

/**
 * Highlights the section whose top has passed just below the fixed header.
 * Measurements are taken from the live DOM on every scroll so view switches
 * and short final sections cannot leave a stale highlight behind.
 */
export function useActiveSection(sectionIds: readonly string[]): string {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let frame = 0;

    const measure = (): void => {
      frame = 0;
      const sections = sectionIds
        .map((sectionId) => document.getElementById(sectionId))
        .filter((element): element is HTMLElement => element !== null)
        .sort((a, b) =>
          a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
        );

      if (sections.length === 0) {
        setActiveId('');
        return;
      }

      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
      const line = headerHeight + 24;
      let current: HTMLElement | null = null;

      for (const section of sections) {
        if (section.getBoundingClientRect().top > line) {
          break;
        }
        current = section;
      }

      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        current = sections[sections.length - 1];
      }

      setActiveId(current?.id ?? '');
    };

    const schedule = (): void => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    const main = document.getElementById('main');
    const mutationObserver =
      typeof MutationObserver !== 'undefined' && main
        ? new MutationObserver(schedule)
        : null;
    mutationObserver?.observe(main as Node, { childList: true });

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      mutationObserver?.disconnect();
    };
  }, [sectionIds]);

  return activeId;
}
