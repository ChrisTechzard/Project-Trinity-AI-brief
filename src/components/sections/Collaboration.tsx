import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Github,
  GraduationCap,
  Mail,
  Phone,
  FlaskConical,
  UsersRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { collaborationItems } from '@/config/content';
import { siteConfig } from '@/config/site';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const iconMap: Record<string, LucideIcon> = {
  mentorship: GraduationCap,
  professional: UsersRound,
  partnership: Building2,
  pilot: FlaskConical,
  infrastructure: BriefcaseBusiness,
};

const externalProps = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function Collaboration(): JSX.Element {
  return (
    <section id="collaboration" className="scroll-mt-20 bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Collaboration"
            title={<>We welcome opportunities to build this responsibly.</>}
            description="TRINITY AI is a student-led engineering project at prototype stage. Guidance, technical collaboration and carefully scoped testing opportunities can help the team validate the work properly."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {collaborationItems.map((item, index) => {
                const Icon = iconMap[item.icon] ?? UsersRound;
                return (
                  <li
                    key={item.id}
                    className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 transition duration-250 hover:border-accent-brand/30 hover:bg-white"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-accent-deep shadow-sm">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-semibold leading-snug text-navy-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.description}</p>
                    </div>
                    <span className="sr-only">{index + 1}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-navy-700 bg-navy-900 p-6 text-white shadow-panel sm:p-8">
              <p className="eyebrow text-accent-bright">
                <span className="h-px w-6 bg-current opacity-70" aria-hidden="true" />
                Get in touch
              </p>
              <h3 className="mt-5 font-display text-2xl font-semibold">Start a conversation.</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Reach the team lead directly to discuss the project, arrange a demonstration or explore a scoped pilot.
              </p>

              <div className="mt-7 space-y-3">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex min-h-11 items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-accent-bright hover:bg-white/10"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-accent-bright" />
                  <span className="break-all">{siteConfig.contact.email}</span>
                  <ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4 shrink-0 text-slate-500" />
                </a>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="flex min-h-11 items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-accent-bright hover:bg-white/10"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-accent-bright" />
                  {siteConfig.contact.phoneDisplay}
                  <ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4 shrink-0 text-slate-500" />
                </a>
              </div>

              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  Project &amp; team links
                </p>
                <div className="mt-4 flex flex-col gap-3 text-sm">
                  <a
                    href={siteConfig.links.projectGithub}
                    {...externalProps}
                    className="inline-flex min-h-11 items-center gap-2 transition hover:text-accent-bright"
                  >
                    <Github aria-hidden="true" className="h-4 w-4" />
                    Project repository
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={siteConfig.links.teamGithub}
                    {...externalProps}
                    className="inline-flex min-h-11 items-center gap-2 transition hover:text-accent-bright"
                  >
                    <Github aria-hidden="true" className="h-4 w-4" />
                    Team lead GitHub
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={siteConfig.links.portfolio}
                    {...externalProps}
                    className="inline-flex min-h-11 items-center gap-2 transition hover:text-accent-bright"
                  >
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    Team lead portfolio (local preview)
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
