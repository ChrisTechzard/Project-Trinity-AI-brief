import { ArrowUpRight, Github } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/ui/Logo';

export function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy-950 py-10 text-slate-300">
      <div className="container-page">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              An integrated AI-powered smart-city prototype from Ghana.
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-soft">
              Student-led · Prototype stage
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-display text-sm font-semibold text-white">Navigate</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-1">
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
            <h3 className="font-display text-sm font-semibold text-white">Project</h3>
            <div className="mt-4 space-y-3 text-sm">
              <a
                href={siteConfig.links.projectGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 transition hover:text-accent-bright"
              >
                <Github aria-hidden="true" className="h-4 w-4" />
                Source repository
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
              <p className="text-xs leading-relaxed text-slate-500">
                Contact details are in the Collaborate section above.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} PROJECT TRINITY AI. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.14em]">Ghana · Prototype</p>
        </div>
      </div>
    </footer>
  );
}
