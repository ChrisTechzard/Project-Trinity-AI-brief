import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { MediaAsset } from '@/types/content';
import { EvidenceTag } from './EvidenceTag';

interface LightboxProps {
  open: boolean;
  items: readonly MediaAsset[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export function Lightbox({ open, items, index, onIndexChange, onClose }: LightboxProps): JSX.Element | null {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const item = items[index];

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'ArrowRight') {
        onIndexChange((index + 1) % items.length);
      }
      if (event.key === 'ArrowLeft') {
        onIndexChange((index - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, index, items.length, onClose, onIndexChange]);

  if (!open || !item || typeof document === 'undefined') {
    return null;
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const duration = reducedMotion ? 0 : 0.2;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="lightbox"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-sm sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title} image viewer`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration }}
        onClick={handleBackdropClick}
      >
        <div className="relative flex max-h-full w-full max-w-6xl flex-col">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold text-white sm:text-base">
                {item.title}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                {index + 1} / {items.length}
              </p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-accent-bright hover:bg-white/10"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <div className="flex min-h-0 items-center justify-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => onIndexChange((index - 1 + items.length) % items.length)}
              aria-label="Previous image"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-accent-bright hover:bg-white/10"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>

            <img
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="max-h-[68vh] w-auto max-w-full rounded-lg object-contain shadow-panel"
            />

            <button
              type="button"
              onClick={() => onIndexChange((index + 1) % items.length)}
              aria-label="Next image"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-accent-bright hover:bg-white/10"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <EvidenceTag label={item.evidence} variant="dark" />
            <p className="max-w-3xl text-sm leading-relaxed text-slate-300">{item.caption}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
