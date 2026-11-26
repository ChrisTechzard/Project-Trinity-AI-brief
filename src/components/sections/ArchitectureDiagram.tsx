import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Cpu, ShieldAlert, TrafficCone, Wind } from 'lucide-react';
import { architectureNotes } from '@/config/content';

const modules = [
  { label: '01 · TRAFFIC', y: 44, tone: '#38BDF8', dashed: false },
  { label: '02 · ENVIRONMENT', y: 167, tone: '#7DD3FC', dashed: true },
  { label: '03 · SAFETY', y: 290, tone: '#7DD3FC', dashed: true },
] as const;

export function ArchitectureDiagram(): JSX.Element {
  const reducedMotion = useReducedMotion();

  return (
    <div className="mt-12">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-900/70 p-4 shadow-panel sm:p-7">
        <div className="hidden md:block">
          <svg
            viewBox="0 0 1000 430"
            className="h-auto w-full"
            role="img"
            aria-labelledby="architecture-title architecture-desc"
          >
            <title id="architecture-title">Three monitoring modules connected to the Central AI Decision Engine</title>
            <desc id="architecture-desc">
              Traffic feeds phase selection directly. Environment and safety feed the engine as contextual information in the current build. The engine produces a decision with a reason for operator review and miniature LED output.
            </desc>
            <defs>
              <linearGradient id="engine-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#123A6B" />
                <stop offset="100%" stopColor="#0B1E3A" />
              </linearGradient>
              <marker id="arrow-solid" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 z" fill="#38BDF8" />
              </marker>
              <marker id="arrow-context" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 z" fill="#64748B" />
              </marker>
            </defs>

            {modules.map((module) => (
              <g key={module.label}>
                <rect
                  x="30"
                  y={module.y}
                  width="250"
                  height="96"
                  rx="14"
                  fill="#111C31"
                  stroke={module.dashed ? '#334155' : '#38BDF8'}
                  strokeOpacity={module.dashed ? 0.8 : 0.65}
                />
                <circle cx="58" cy={module.y + 31} r="6" fill={module.tone} />
                <text x="76" y={module.y + 36} fill="#E2E8F0" fontSize="14" fontWeight="600" fontFamily="Inter, sans-serif">
                  {module.label}
                </text>
                <text x="52" y={module.y + 66} fill="#94A3B8" fontSize="12" fontFamily="Inter, sans-serif">
                  {module.dashed ? 'Context for operator' : 'Drives phase selection'}
                </text>
                <text x="52" y={module.y + 84} fill="#64748B" fontSize="10" fontFamily="Inter, sans-serif">
                  {module.dashed ? 'not a phase trigger in this build' : 'queue pressure + wait limits'}
                </text>
              </g>
            ))}

            {modules.map((module, index) => {
              const startY = module.y + 48;
              const path = `M280 ${startY} C330 ${startY}, 330 215, 374 215`;
              return (
                <motion.path
                  key={module.label}
                  d={path}
                  fill="none"
                  stroke={module.dashed ? '#64748B' : '#38BDF8'}
                  strokeWidth={module.dashed ? 1.5 : 2.5}
                  strokeDasharray={module.dashed ? '6 6' : undefined}
                  markerEnd={module.dashed ? 'url(#arrow-context)' : 'url(#arrow-solid)'}
                  initial={reducedMotion ? undefined : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : index * 0.12 }}
                />
              );
            })}

            <rect x="380" y="140" width="260" height="150" rx="18" fill="url(#engine-fill)" stroke="#38BDF8" strokeOpacity="0.55" strokeWidth="1.5" />
            <text x="510" y="190" textAnchor="middle" fill="#7DD3FC" fontSize="11" letterSpacing="2" fontFamily="Inter, sans-serif">
              CENTRAL AI
            </text>
            <text x="510" y="216" textAnchor="middle" fill="#FFFFFF" fontSize="19" fontWeight="700" fontFamily="Space Grotesk, Inter, sans-serif">
              DECISION ENGINE
            </text>
            <text x="510" y="242" textAnchor="middle" fill="#CBD5E1" fontSize="12" fontFamily="Inter, sans-serif">
              decision + published reason
            </text>
            <text x="510" y="266" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="Inter, sans-serif">
              PLANNED / SIMULATED / MEASURED labels
            </text>

            <path
              d="M640 215 L724 215"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2.5"
              markerEnd="url(#arrow-solid)"
            />
            <rect x="730" y="160" width="240" height="110" rx="14" fill="#111C31" stroke="#334155" />
            <text x="850" y="203" textAnchor="middle" fill="#E2E8F0" fontSize="13" fontWeight="600" fontFamily="Inter, sans-serif">
              OPERATOR REVIEW
            </text>
            <text x="850" y="226" textAnchor="middle" fill="#94A3B8" fontSize="12" fontFamily="Inter, sans-serif">
              &amp; miniature LED output
            </text>

            <text x="30" y="398" fill="#64748B" fontSize="11" fontFamily="Inter, sans-serif">
              Solid = direct input to phase selection · Dashed = contextual input in the current build
            </text>
          </svg>
        </div>

        <div className="flex flex-col gap-3 md:hidden">
          {[
            { icon: TrafficCone, title: '01 · Traffic', note: 'Drives phase selection', dashed: false },
            { icon: Wind, title: '02 · Environment', note: 'Context only in this build', dashed: true },
            { icon: ShieldAlert, title: '03 · Safety', note: 'Context only in this build', dashed: true },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title}>
                <div className={`rounded-xl border p-4 ${item.dashed ? 'border-white/10 bg-white/[0.03]' : 'border-accent-bright/30 bg-accent-bright/[0.07]'}`}>
                  <div className="flex items-center gap-3">
                    <Icon aria-hidden="true" className="h-5 w-5 text-accent-bright" />
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{item.note}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center py-1.5" aria-hidden="true">
                  <ArrowDown className={`h-4 w-4 ${item.dashed ? 'text-slate-600' : 'text-accent-bright'}`} />
                </div>
              </div>
            );
          })}

          <div className="rounded-xl border border-accent-bright/40 bg-accent-deep/20 p-5 text-center">
            <Cpu aria-hidden="true" className="mx-auto h-6 w-6 text-accent-bright" />
            <p className="mt-2 font-display text-base font-semibold text-white">Central AI Decision Engine</p>
            <p className="mt-1 text-xs text-slate-300">Decision + published reason</p>
          </div>
          <div className="flex justify-center py-1" aria-hidden="true">
            <ArrowDown className="h-4 w-4 text-accent-bright" />
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
            <p className="text-sm font-semibold text-white">Operator review</p>
            <p className="mt-1 text-xs text-slate-400">&amp; miniature LED output</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {architectureNotes.map((note) => (
          <p key={note} className="flex gap-3 text-sm leading-relaxed text-slate-300">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-bright" aria-hidden="true" />
            {note}
          </p>
        ))}
      </div>
    </div>
  );
}
