import { CalendarClock, CircleAlert, PlayCircle } from 'lucide-react';
import type { VideoItem } from '@/types/content';
import { toYouTubeEmbedUrl } from '@/utils/video';
import { Badge } from './Badge';

interface VideoEmbedProps {
  video: VideoItem;
}

function PendingPlayer({ note }: { note: string }): JSX.Element {
  return (
    <div className="flex aspect-video flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/[0.03] p-6 text-center">
      <CircleAlert aria-hidden="true" className="h-8 w-8 text-accent-soft" />
      <p className="mt-4 font-display text-base font-semibold text-white">Awaiting video link</p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">{note}</p>
    </div>
  );
}

export function VideoEmbed({ video }: VideoEmbedProps): JSX.Element {
  if (video.kind === 'local') {
    return (
      <div className="overflow-hidden rounded-xl border border-white/10 bg-navy-950 shadow-panel">
        <div className="flex aspect-[4/5] items-center justify-center bg-black sm:aspect-video">
          <video
            src={video.src}
            poster={video.poster}
            controls
            playsInline
            preload="metadata"
            aria-label={video.title}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-white">{video.title}</h3>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-300">{video.description}</p>
          </div>
          {video.meta ? <Badge tone="light" icon={CalendarClock}>{video.meta}</Badge> : null}
        </div>
      </div>
    );
  }

  if (video.kind === 'youtube') {
    const embedUrl = toYouTubeEmbedUrl(video.url);
    return (
      <div className="overflow-hidden rounded-xl border border-white/10 bg-navy-950">
        <div className="aspect-video w-full">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full"
            />
          ) : (
            <PendingPlayer note="The configured YouTube URL is not a valid share link. Update src/config/media.ts." />
          )}
        </div>
        <div className="border-t border-white/10 px-5 py-4">
          <h3 className="font-display text-lg font-semibold text-white">{video.title}</h3>
          <p className="mt-1 text-sm text-slate-300">{video.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-navy-950">
      <PendingPlayer note={video.note} />
      <div className="border-t border-white/10 px-5 py-4">
        <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
          <PlayCircle aria-hidden="true" className="h-5 w-5 text-accent-soft" />
          {video.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-300">{video.description}</p>
      </div>
    </div>
  );
}
