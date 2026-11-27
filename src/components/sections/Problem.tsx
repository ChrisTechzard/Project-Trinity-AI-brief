import { ShieldAlert, TrafficCone, Wind } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { problems } from '@/config/content';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const iconMap: Record<string, LucideIcon> = {
  traffic: TrafficCone,
  environment: Wind,
  safety: ShieldAlert,
};

export function Problem(): JSX.Element {
  return (
    <section id="problem" className="bg-slate-50 py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="The problem"
            title={<>Cities need to see what is happening — and respond in time.</>}
            description="In rapidly growing African cities, pressure on junctions, local environmental conditions and safety events can outpace the systems used to observe them. TRINITY AI begins with three concrete gaps."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {problems.map((problem, index) => {
            const Icon = iconMap[problem.icon] ?? TrafficCone;
            return (
              <Reveal key={problem.id} delay={index * 0.08}>
                <article className="surface-card group h-full hover:-translate-y-1 hover:border-accent-brand/30 hover:shadow-panel">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-deep/10 text-accent-deep transition group-hover:bg-accent-brand group-hover:text-white">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-xs font-medium tracking-[0.18em] text-slate-400">
                      {problem.index}
                    </span>
                  </div>
                  <h3 className="mt-7 font-display text-xl font-semibold leading-snug text-navy-900">
                    {problem.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{problem.description}</p>
                  <p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
                    {problem.detail}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
              The project treats these as connected operational questions: what is happening at the junction, what conditions surround it, and which events need a person to look closer.
            </p>
            <a
              href="#technology"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-accent-deep transition hover:text-accent-brand"
            >
              See our approach <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
