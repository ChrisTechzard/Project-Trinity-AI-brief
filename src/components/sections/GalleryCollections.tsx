import { useMemo, useState } from 'react';
import { Images, Layers3 } from 'lucide-react';
import type { GalleryFilter, GalleryGroupId, MediaAsset } from '@/types/content';
import { galleryAssets, galleryFilters, galleryGroups } from '@/config/media';
import { EvidenceTag } from '@/components/ui/EvidenceTag';
import { Lightbox } from '@/components/ui/Lightbox';

const assetById = new Map(galleryAssets.map((asset) => [asset.id, asset]));

function resolveAssets(ids: readonly string[]): MediaAsset[] {
  return ids.flatMap((id) => {
    const asset = assetById.get(id);
    return asset ? [asset] : [];
  });
}

interface GalleryCollectionsProps {
  compact?: boolean;
}

export function GalleryCollections({ compact = false }: GalleryCollectionsProps): JSX.Element {
  const [filter, setFilter] = useState<GalleryFilter['id']>('all');
  const [activeGroupId, setActiveGroupId] = useState<GalleryGroupId | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleGroups = useMemo(
    () => galleryGroups.filter((group) => filter === 'all' || group.id === filter),
    [filter],
  );

  const activeGroup = galleryGroups.find((group) => group.id === activeGroupId) ?? null;
  const activeAssets = activeGroup ? resolveAssets(activeGroup.assetIds) : [];

  return (
    <div>
      <div className={`${compact ? 'mb-6' : 'mb-8'} flex flex-wrap items-center justify-between gap-3 border-y border-slate-200 py-3`}>
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

      <div className={`grid gap-5 md:grid-cols-3 ${compact ? '' : 'lg:gap-6'}`}>
        {visibleGroups.map((group, index) => {
          const cover = assetById.get(group.coverId);
          const groupAssets = resolveAssets(group.assetIds);
          if (!cover) {
            return null;
          }

          return (
            <article
              key={group.id}
              className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-250 hover:-translate-y-1 hover:border-accent-brand/40 hover:shadow-panel"
            >
              <button
                type="button"
                onClick={() => {
                  setActiveGroupId(group.id);
                  setActiveIndex(0);
                }}
                aria-label={`Open ${group.title} gallery`}
                className="flex h-full w-full cursor-pointer flex-col text-left"
              >
                <span className="relative block aspect-[16/10] w-full overflow-hidden bg-navy-950">
                  <img
                    src={cover.src}
                    alt={cover.alt}
                    width={cover.width}
                    height={cover.height}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-t from-navy-950/90 via-navy-950/50 to-transparent px-4 pb-3 pt-10">
                    <EvidenceTag label={group.evidence} variant="dark" />
                    <span className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 font-mono text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                      <Layers3 aria-hidden="true" className="h-3.5 w-3.5" />
                      {groupAssets.length} images
                    </span>
                  </span>
                </span>

                <span className={`flex flex-1 flex-col ${compact ? 'p-4' : 'p-5'}`}>
                  <span className="flex items-center gap-2 font-display text-base font-semibold text-navy-900 sm:text-lg">
                    <Images aria-hidden="true" className="h-5 w-5 shrink-0 text-accent-deep" />
                    {group.title}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-slate-600">
                    {group.description}
                  </span>

                  <span className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
                    {groupAssets.slice(1, 5).map((asset) => (
                      <img
                        key={asset.id}
                        src={asset.src}
                        alt=""
                        aria-hidden="true"
                        width={asset.width}
                        height={asset.height}
                        loading="lazy"
                        decoding="async"
                        className="h-10 w-14 rounded border border-slate-200 bg-navy-950 object-cover"
                      />
                    ))}
                    <span className="ml-auto whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">
                      Open set →
                    </span>
                  </span>
                </span>
              </button>
            </article>
          );
        })}
      </div>

      <Lightbox
        open={activeGroup !== null}
        items={activeAssets}
        index={activeIndex}
        onIndexChange={setActiveIndex}
        onClose={() => setActiveGroupId(null)}
      />
    </div>
  );
}
