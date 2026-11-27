import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Cpu,
  Github,
  Mail,
  Phone,
  PlayCircle,
  Radio,
  ShieldAlert,
  TrafficCone,
  Wind,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { collaborationItems, modules, problems, statusGroups, visionStatement } from '@/config/content';
import { heroImage, videos } from '@/config/media';
import { siteConfig } from '@/config/site';
import { useSectionScroll } from '@/hooks/useSectionScroll';
import { ActionLink } from '@/components/ui/ActionLink';
import { Badge } from '@/components/ui/Badge';
import { EvidenceTag } from '@/components/ui/EvidenceTag';
import { VideoEmbed } from '@/components/ui/VideoEmbed';
import { GalleryCollections } from './GalleryCollections';

const problemIcons: Record<string, LucideIcon> = {
  traffic: TrafficCone,
  environment: Wind,
  safety: ShieldAlert,
};

export function BriefPage(): JSX.Element {
  const scrollToSection = useSectionScroll();
  const featuredVideo = videos.find((video) => video.kind === 'local');

  return (
    <>
      <section id="home" className="relative overflow-hidden bg-navy-950 pb-16 pt-28 text-white sm:pb-20 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-grid-fine bg-grid opacity-30" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-accent-brand/20 blur-3xl" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Badge tone="light" icon={Radio}>
              {siteConfig.stage} · {siteConfig.location}
            </Badge>
            <h1 className="mt-6 font-display text-4xl font-bold leading-none tracking-tight sm:text-5xl">
              PROJECT <span className="text-accent-bright">TRINITY AI</span>
            </h1>
            <p className="mt-5 font-display text-lg font-medium leading-snug text-slate-100 sm:text-xl">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Traffic intelligence, environmental monitoring and safety detection in one decision-support engine.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ActionLink href="#technology" icon={ArrowRight} onClick={(event) => scrollToSection(event, '#technology')}>
                Explore the Project
              </ActionLink>
              <ActionLink
                href="#demonstrations"
                variant="secondary"
                icon={PlayCircle}
                onClick={(event) => scrollToSection(event, '#demonstrations')}
              >
                Watch Demonstration
              </ActionLink>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/15 bg-navy-900/80 shadow-glow">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
                Trinity AI · showcase
              </p>
              <EvidenceTag label={heroImage.evidence} variant="dark" />
            </div>
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              width={heroImage.width}
              height={heroImage.height}
              fetchPriority="high"
              className="block w-full bg-navy-950 object-cover"
            />
          </div>
        </div>
      </section>

      <section id="problem" className="bg-slate-50 py-14 sm:py-16">
        <div className="container-page">
          <p className="eyebrow text-accent-deep"><span className="h-px w-6 bg-current" aria-hidden="true" />The problem</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">Three gaps in urban operations.</h2>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {problems.map((problem) => {
              const Icon = problemIcons[problem.icon] ?? Cpu;
              return (
                <div key={problem.id} className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="flex items-start gap-3">
                    <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-accent-deep" />
                    <div>
                      <h3 className="font-display text-sm font-semibold text-navy-900">{problem.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{problem.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="technology" className="border-y border-white/5 bg-navy-900 py-14 text-white sm:py-16">
        <div className="container-page">
          <p className="eyebrow text-accent-bright"><span className="h-px w-6 bg-current" aria-hidden="true" />Our technology</p>
          <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">Three modules, one decision engine.</h2>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {modules.map((module) => (
              <div key={module.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-bright">{module.index}</p>
                <h3 className="mt-2 font-display text-base font-semibold">{module.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{module.summary}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 rounded-xl border border-accent-bright/30 bg-accent-deep/20 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-slate-200">
              <span className="font-semibold text-white">Central AI Decision Engine:</span> publishes the active phase, selected action and reason from stored traffic state. Environment and safety values provide context; they do not drive phase selection in this build.
            </p>
            <a href="#showcase" onClick={(event) => scrollToSection(event, '#showcase')} className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-accent-soft transition hover:text-white">
              See evidence <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="showcase" className="bg-white py-14 sm:py-16">
        <div className="container-page">
          <p className="eyebrow text-accent-deep"><span className="h-px w-6 bg-current" aria-hidden="true" />Project showcase</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">Authentic project evidence.</h2>
          <p className="mt-2 text-sm text-slate-600">Three labelled collections from the live test bed and simulated walkthroughs.</p>
          <div className="mt-7"><GalleryCollections compact /></div>
        </div>
      </section>

      <section id="demonstrations" className="bg-navy-950 py-14 text-white sm:py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-accent-bright"><span className="h-px w-6 bg-current" aria-hidden="true" />Demonstrations</p>
              <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">Explained by the team lead.</h2>
            </div>
            <a href="?view=detailed#demonstrations" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent-soft transition hover:text-white">
              More videos <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-7">{featuredVideo ? <VideoEmbed video={featuredVideo} /> : null}</div>
        </div>
      </section>

      <section id="status" className="bg-slate-50 py-14 sm:py-16">
        <div className="container-page">
          <p className="eyebrow text-accent-deep"><span className="h-px w-6 bg-current" aria-hidden="true" />Project status</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">Beyond an idea. Still a prototype.</h2>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {statusGroups.map((group) => (
              <div key={group.id} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-navy-900">
                  <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-accent-deep" />
                  {group.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {group.items.slice(0, 2).map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-slate-600">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vision" className="bg-accent-deep py-14 text-white sm:py-16">
        <div className="container-page max-w-4xl text-center">
          <p className="eyebrow justify-center text-cyan-100"><span className="h-px w-6 bg-current" aria-hidden="true" />Our vision</p>
          <blockquote className="mt-5 font-display text-xl font-semibold leading-snug sm:text-2xl">“{visionStatement}”</blockquote>
        </div>
      </section>

      <section id="collaboration" className="bg-white py-14 sm:py-16">
        <div className="container-page grid gap-7 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="eyebrow text-accent-deep"><span className="h-px w-6 bg-current" aria-hidden="true" />Collaboration</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">Let’s build this responsibly.</h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {collaborationItems.map((item) => (
                <li key={item.id} className="flex items-center gap-2 text-sm text-slate-700">
                  <BriefcaseBusiness aria-hidden="true" className="h-4 w-4 shrink-0 text-accent-deep" />
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-navy-700 bg-navy-900 p-5 text-white">
            <h3 className="font-display text-base font-semibold">Contact the team lead</h3>
            <div className="mt-4 space-y-2">
              <a href={`mailto:${siteConfig.contact.email}`} className="flex min-h-11 items-center gap-3 rounded-lg bg-white/5 px-3 text-sm transition hover:bg-white/10">
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-accent-bright" />
                <span className="break-all">{siteConfig.contact.email}</span>
              </a>
              <a href={siteConfig.contact.phoneHref} className="flex min-h-11 items-center gap-3 rounded-lg bg-white/5 px-3 text-sm transition hover:bg-white/10">
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-accent-bright" />
                {siteConfig.contact.phoneDisplay}
              </a>
              <a href={siteConfig.links.projectGithub} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 rounded-lg bg-white/5 px-3 text-sm transition hover:bg-white/10">
                <Github aria-hidden="true" className="h-4 w-4 shrink-0 text-accent-bright" />
                Project repository
                <ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4" />
              </a>
              <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-white/10 pt-3 text-sm">
                <a href={siteConfig.links.teamGithub} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 transition hover:text-accent-bright">
                  <Github aria-hidden="true" className="h-4 w-4" />
                  Team lead GitHub
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
                <a href={siteConfig.links.portfolio} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 transition hover:text-accent-bright">
                  Portfolio (local preview)
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
