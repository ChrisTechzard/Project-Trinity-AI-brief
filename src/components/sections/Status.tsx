import { Activity, CheckCircle2, Compass } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { statusGroups } from '@/config/content';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const iconMap: Record<string, LucideIcon> = {
  built: CheckCircle2,
  validating: Activity,
  next: Compass,
};

const toneMap: Record<string, string> = {
  built: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  validating: 'border-amber-200 bg-amber-50 text-amber-700',
  next: 'border-blue-200 bg-blue-50 text-blue-700',
};

export function Status(): JSX.Element {
  return (
    <section id="status" className="bg-slate-50 py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Project status"
              title={<>Beyond an idea. Still a prototype.</>}
              description="TRINITY AI has moved into a functioning prototype with real interfaces and test-bed behaviour. It is being prepared for further validation, demonstrations and potential pilot opportunities."
            />
            <Badge tone="blue" className="shrink-0">
              Not commercially deployed
            </Badge>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {statusGroups.map((group, index) => {
            const Icon = iconMap[group.id] ?? CheckCircle2;
            return (
              <Reveal key={group.id} delay={index * 0.08}>
                <article className="surface-card h-full hover:-translate-y-1 hover:shadow-panel">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${toneMap[group.id]}`}>
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-navy-900">{group.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{group.description}</p>
                  <ul className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-brand" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.12}>
          <p className="mt-8 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm leading-relaxed text-slate-600">
            Prototype behaviour is demonstrated on a miniature junction test bed. Public-road signal control, verified real-world impact and commercial deployment are not claimed.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
