import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Cpu, PlayCircle, Radio, ShieldCheck } from 'lucide-react';
import { heroImage } from '@/config/media';
import { siteConfig } from '@/config/site';
import { ActionLink } from '@/components/ui/ActionLink';
import { Badge } from '@/components/ui/Badge';
import { EvidenceTag } from '@/components/ui/EvidenceTag';

export function Hero(): JSX.Element {
  const reducedMotion = useReducedMotion();
  const entrance = (delay: number) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay: reducedMotion ? 0 : delay, ease: 'easeOut' as const },
  });

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-navy-950 pb-20 pt-28 text-white lg:pb-28 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-fine bg-grid opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-32 -top-40 h-[560px] w-[560px] rounded-full bg-accent-brand/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-56 left-1/4 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <motion.div {...entrance(0)}>
          <Badge tone="light" icon={Radio}>
            {siteConfig.stage} · {siteConfig.location}
          </Badge>

          <h1 className="mt-7 font-display text-[2.65rem] font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-[4.15rem]">
            PROJECT
            <br />
            <span className="text-accent-bright">TRINITY AI</span>
          </h1>

          <p className="mt-6 max-w-xl font-display text-xl font-medium leading-snug text-slate-100 sm:text-2xl">
            {siteConfig.tagline}
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {siteConfig.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ActionLink href="#technology" icon={ArrowRight}>
              Explore the Project
            </ActionLink>
            <ActionLink href="#demonstrations" variant="secondary" icon={PlayCircle}>
              Watch Demonstration
            </ActionLink>
          </div>

          <div className="mt-11 grid max-w-xl grid-cols-1 gap-4 border-t border-white/10 pt-7 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <Cpu aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent-bright" />
              <p className="text-sm leading-snug text-slate-300">
                <span className="font-semibold text-white">3 modules</span>
                <br /> one decision engine
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Radio aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent-bright" />
              <p className="text-sm leading-snug text-slate-300">
                <span className="font-semibold text-white">Live camera</span>
                <br /> calibration views
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent-bright" />
              <p className="text-sm leading-snug text-slate-300">
                <span className="font-semibold text-white">Operator-first</span>
                <br /> alerts need review
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div {...entrance(0.12)} className="relative">
          <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-accent-brand/30 via-transparent to-cyan-400/20 blur-2xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-navy-900/90 shadow-glow">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Trinity AI · system showcase
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
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
              <p className="text-xs leading-relaxed text-slate-400">
                Simulated interface · miniature junction test bed
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-soft">
                Traffic · Environment · Safety
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container-page relative mt-16 flex items-center gap-3 text-xs text-slate-500">
        <span className="h-px w-10 bg-slate-700" aria-hidden="true" />
        Scroll to explore the problem, the technology and the evidence
      </div>
    </section>
  );
}
