import { ArrowUpRight, Github, Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/ui/Logo';

const externalProps = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy-950 py-12 text-slate-300">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              {siteConfig.description}
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-soft">
              Student-led engineering · {siteConfig.location}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-display text-sm font-semibold text-white">Navigate</h3>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm transition hover:text-accent-bright">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 transition hover:text-accent-bright"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="inline-flex items-center gap-2 transition hover:text-accent-bright"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0" />
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-slate-400">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                {siteConfig.contact.location}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white">Project links</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={siteConfig.links.projectGithub}
                  {...externalProps}
                  className="inline-flex items-center gap-2 transition hover:text-accent-bright"
                >
                  <Github aria-hidden="true" className="h-4 w-4 shrink-0" />
                  Project repository
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.teamGithub}
                  {...externalProps}
                  className="inline-flex items-center gap-2 transition hover:text-accent-bright"
                >
                  <Github aria-hidden="true" className="h-4 w-4 shrink-0" />
                  Team lead GitHub
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.portfolio}
                  {...externalProps}
                  className="inline-flex items-center gap-2 transition hover:text-accent-bright"
                >
                  Team lead portfolio
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} PROJECT TRINITY AI. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.14em]">Prototype stage · Ghana</p>
        </div>
      </div>
    </footer>
  );
}
