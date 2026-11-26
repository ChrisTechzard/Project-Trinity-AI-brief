import { useMemo, useState } from 'react';
import { Expand } from 'lucide-react';
import type { GalleryFilter, MediaAsset } from '@/types/content';
import { evidenceLegend } from '@/config/content';
import { galleryAssets, galleryFilters } from '@/config/media';
import { EvidenceTag } from '@/components/ui/EvidenceTag';
import { Lightbox } from '@/components/ui/Lightbox';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

function matchesFilter(asset: MediaAsset, filter: GalleryFilter['id']): boolean {
  if (filter === 'all') {
    return true;
  }
  if (filter === 'live') {
    return asset.category === 'live-calibration';
  }
  if (filter === 'team') {
    return asset.category === 'team';
  }
  return asset.evidence === 'SIMULATED';
}

export function Gallery(): JSX.Element {
  const [filter, setFilter] = useState<GalleryFilter['id']>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visibleAssets = useMemo(
    () => galleryAssets.filter((asset) => matchesFilter(asset, filter)),
    [filter],
  );

  return (
    <section id="showcase" className="scroll-mt-20 bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Project showcase"
            title={<>What the system looks like in operation.</>}
            description="Authentic captures from the project: live calibration views, offline simulated walkthroughs and the team behind the work. Every image is labelled with the kind of evidence it shows."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-4">
            <div className="no-scrollbar -mx-1 flex max-w-full gap-2 overflow-x-auto px-1">
              {galleryFilters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={filter === item.id}
                  onClick={() => {
                    setFilter(item.id);
                    setActiveIndex(null);
                  }}
                  className={`min-h-11 shrink-0 rounded-full border px-4 text-[13px] font-medium transition duration-250 cursor-pointer ${
                    filter === item.id
                      ? 'border-navy-800 bg-navy-800 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-accent-brand hover:text-accent-deep'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
              {visibleAssets.length} captures
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleAssets.map((asset, index) => (
            <Reveal key={asset.id} delay={Math.min(index, 5) * 0.05} className={asset.featured ? 'sm:col-span-2' : ''}>
              <figure className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-250 hover:-translate-y-1 hover:border-accent-brand/40 hover:shadow-panel">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Open ${asset.title} in image viewer`}
                  className="relative block w-full cursor-pointer bg-navy-950"
                >
                  <span className="block aspect-[16/9] w-full">
                    <img
                      src={asset.src}
                      alt={asset.alt}
                      width={asset.width}
                      height={asset.height}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                    />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-navy-950/90 via-navy-950/50 to-transparent px-4 pb-3 pt-10">
                    <EvidenceTag label={asset.evidence} variant="dark" />
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm">
                      <Expand aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </span>
                </button>
                <figcaption className="p-5">
                  <h3 className="font-display text-base font-semibold text-navy-900">{asset.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{asset.caption}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <div className="mt-10 rounded-2xl bg-slate-50 p-6 sm:p-7">
            <h3 className="font-display text-sm font-semibold text-navy-900">How to read this evidence</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {evidenceLegend.map((item) => (
                <div key={item.label}>
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-deep">
                    {item.label}
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.meaning}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-500">
              The calibration captures show the phone-camera feed used with the miniature junction test bed. The simulated walkthrough views were recorded before live data was fed into the system and are not the final live interface.
            </p>
          </div>
        </Reveal>
      </div>

      <Lightbox
        open={activeIndex !== null}
        items={visibleAssets}
        index={activeIndex ?? 0}
        onIndexChange={setActiveIndex}
        onClose={() => setActiveIndex(null)}
      />
    </section>
  );
}
