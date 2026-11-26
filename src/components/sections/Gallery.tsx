import { useMemo, useState } from 'react';
import { Images, Layers3 } from 'lucide-react';
import type { GalleryFilter, GalleryGroupId, MediaAsset } from '@/types/content';
import { evidenceLegend } from '@/config/content';
import { galleryAssets, galleryFilters, galleryGroups } from '@/config/media';
import { EvidenceTag } from '@/components/ui/EvidenceTag';
import { Lightbox } from '@/components/ui/Lightbox';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const assetById = new Map(galleryAssets.map((asset) => [asset.id, asset]));

function resolveAssets(ids: readonly string[]): MediaAsset[] {
  return ids.flatMap((id) => {
    const asset = assetById.get(id);
    return asset ? [asset] : [];
  });
}

export function Gallery(): JSX.Element {
  const [filter, setFilter] = useState<GalleryFilter['id']>('all');
  const [activeGroupId, setActiveGroupId] = useState<GalleryGroupId | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleGroups = useMemo(
    () => galleryGroups.filter((group) => filter === 'all' || group.id === filter),
    [filter],
  );

  const activeGroup = galleryGroups.find((group) => group.id === activeGroupId) ?? null;
  const activeAssets = activeGroup ? resolveAssets(activeGroup.assetIds) : [];
  const coverFor = (id: string): MediaAsset | undefined => assetById.get(id);

  return (
    <section id="showcase" className="scroll-mt-20 bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Project showcase"
            title={<>What the system looks like in operation.</>}
            description="Authentic captures from the project, grouped into three collections: live calibration, offline simulated walkthroughs and the team behind the work. Each set opens as one explorable gallery."
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
                    setActiveGroupId(null);
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
              {galleryAssets.length} captures · {galleryGroups.length} collections
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {visibleGroups.map((group, index) => {
            const cover = coverFor(group.coverId);
            const groupAssets = resolveAssets(group.assetIds);
            if (!cover) {
              return null;
            }

            return (
              <Reveal key={group.id} delay={index * 0.07}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-250 hover:-translate-y-1 hover:border-accent-brand/40 hover:shadow-panel">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveGroupId(group.id);
                      setActiveIndex(0);
                    }}
                    aria-label={`Open ${group.title} gallery`}
                    className="relative block w-full cursor-pointer bg-navy-950 text-left"
                  >
                    <span className="block aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={cover.src}
                        alt={cover.alt}
                        width={cover.width}
                        height={cover.height}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                      />
                    </span>
                    <span className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-t from-navy-950/90 via-navy-950/50 to-transparent px-4 pb-3 pt-10">
                      <EvidenceTag label={group.evidence} variant="dark" />
                      <span className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 font-mono text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                        <Layers3 aria-hidden="true" className="h-3.5 w-3.5" />
                        {groupAssets.length} images
                      </span>
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-900">
                      <Images aria-hidden="true" className="h-5 w-5 text-accent-deep" />
                      {group.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{group.description}</p>

                    <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
                      {groupAssets.slice(1, 5).map((asset) => (
                        <img
                          key={asset.id}
                          src={asset.src}
                          alt=""
                          width={asset.width}
                          height={asset.height}
                          loading="lazy"
                          decoding="async"
                          className="h-10 w-14 rounded border border-slate-200 bg-navy-950 object-cover"
                        />
                      ))}
                      <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">
                        Open set →
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
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
              The calibration collection shows the phone-camera feed used with the miniature junction test bed. The simulated collection was recorded before live data was fed into the system and is not the final live interface.
            </p>
          </div>
        </Reveal>
      </div>

      <Lightbox
        open={activeGroup !== null}
        items={activeAssets}
        index={activeIndex}
        onIndexChange={setActiveIndex}
        onClose={() => setActiveGroupId(null)}
      />
    </section>
  );
}
