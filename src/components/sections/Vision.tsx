import { ArrowRight } from 'lucide-react';
import { visionStatement } from '@/config/content';
import { ActionLink } from '@/components/ui/ActionLink';
import { Reveal } from '@/components/ui/Reveal';

export function Vision(): JSX.Element {
  return (
    <section id="vision" className="relative overflow-hidden bg-accent-deep py-20 text-white sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-fine bg-grid opacity-25" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" aria-hidden="true" />
      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <div className="eyebrow justify-center text-cyan-100">
              <span className="h-px w-6 bg-current opacity-70" aria-hidden="true" />
              Our vision
            </div>
            <blockquote className="mt-8 font-display text-2xl font-semibold leading-snug tracking-tight sm:text-4xl lg:text-[2.6rem]">
              “{visionStatement}”
            </blockquote>
            <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-cyan-50/90 sm:text-base">
              Practical systems, careful validation and open collaboration are how the team intends to work toward that vision.
            </p>
            <div className="mt-9 flex justify-center">
              <ActionLink href="#collaboration" variant="secondary" icon={ArrowRight}>
                Explore collaboration
              </ActionLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
