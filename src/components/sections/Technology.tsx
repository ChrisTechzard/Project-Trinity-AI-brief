import { Cpu, ShieldAlert, TrafficCone, Wind } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { modules } from '@/config/content';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const iconMap: Record<string, LucideIcon> = {
  traffic: TrafficCone,
  environment: Wind,
  safety: ShieldAlert,
};

export function Technology(): JSX.Element {
  return (
    <section id="technology" className="scroll-mt-20 border-y border-white/5 bg-navy-900 py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="Our technology"
            title={<>Three monitoring modules. One central decision engine.</>}
            description="The prototype brings separate streams into one operator-facing view. Each module has a defined role, and the interface labels where a value is measured, simulated or planned."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {modules.map((module, index) => {
            const Icon = iconMap[module.icon] ?? Cpu;
            return (
              <Reveal key={module.id} delay={index * 0.08}>
                <article className="dark-card group h-full hover:-translate-y-1 hover:border-accent-bright/40 hover:bg-white/[0.06]">
                  <img
                    src={module.image.src}
                    alt={module.image.alt}
                    width={1600}
                    height={738}
                    loading="lazy"
                    decoding="async"
                    className="h-36 w-full rounded-lg object-cover object-top"
                  />
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent-bright">
                      {module.index}
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-bright/10 text-accent-bright">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">{module.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{module.summary}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                    {module.capabilities.map((capability) => (
                      <li key={capability} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-bright" aria-hidden="true" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-slate-500">
                    {module.evidence}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-accent-bright/30 bg-gradient-to-br from-accent-deep/25 via-navy-800/60 to-navy-900 p-6 sm:p-9">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-brand/20 blur-3xl" aria-hidden="true" />
            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <Badge tone="light" icon={Cpu}>
                  Central AI Decision Engine
                </Badge>
                <h3 className="mt-5 font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
                  One place where junction state becomes an explained decision.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                  The engine consumes the stored traffic state and controller command, then publishes the active phase, selected action, reason and command duration. Environmental and safety values sit alongside it to give the operator context.
                </p>
              </div>
              <p className="shrink-0 border-l-2 border-accent-bright/60 pl-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-accent-soft lg:max-w-[210px]">
                Current build: traffic drives phase selection. Environment and safety do not yet trigger phase changes.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                System architecture
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                How information moves through the prototype today — not a proposed future architecture.
              </p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              Current prototype · v0.1.0
            </span>
          </div>
          <ArchitectureDiagram />
        </Reveal>
      </div>
    </section>
  );
}
