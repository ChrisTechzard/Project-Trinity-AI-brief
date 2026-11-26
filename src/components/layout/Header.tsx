import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ActionLink } from '@/components/ui/ActionLink';
import { Logo } from '@/components/ui/Logo';

export function Header(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();
  const sectionIds = useMemo(() => siteConfig.nav.map((item) => item.href.slice(1)), []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition duration-250 ${
        scrolled || menuOpen
          ? 'border-white/10 bg-navy-950/90 shadow-lg shadow-navy-950/20 backdrop-blur-md'
          : 'border-transparent bg-navy-950/40 backdrop-blur-sm'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <a href="#home" aria-label="Project Trinity AI, back to top" className="shrink-0 cursor-pointer">
          <Logo tone="light" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative rounded-md px-3 py-2 text-[13px] font-medium transition duration-250 ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
                aria-current={isActive ? 'location' : undefined}
              >
                {item.label}
                {isActive ? (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-accent-bright" aria-hidden="true" />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <ActionLink href="#collaboration" variant="primary" className="px-4 py-2 text-[13px]">
            Collaborate
          </ActionLink>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-white transition hover:border-accent-bright hover:bg-white/10 lg:hidden"
        >
          {menuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile"
            initial={reducedMotion ? undefined : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.22, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/10 bg-navy-950/95 lg:hidden"
          >
            <div className="container-page flex flex-col py-4">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="min-h-11 border-b border-white/5 py-3 text-sm font-medium text-slate-200 transition hover:text-accent-bright"
                >
                  {item.label}
                </a>
              ))}
              <ActionLink
                href="#collaboration"
                variant="primary"
                className="mt-4 w-full"
                onClick={() => setMenuOpen(false)}
              >
                Collaborate
              </ActionLink>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
