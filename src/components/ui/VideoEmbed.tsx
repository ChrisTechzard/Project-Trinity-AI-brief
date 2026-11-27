import { CalendarClock } from 'lucide-react';
import type { VideoItem } from '@/types/content';
import { toYouTubeEmbedUrl } from '@/utils/video';
import { Badge } from './Badge';

interface VideoEmbedProps {
  video: VideoItem;
}

export function VideoEmbed({ video }: VideoEmbedProps): JSX.Element {
  if (video.kind === 'local') {
    return (
      <div className="overflow-hidden rounded-xl border border-white/10 bg-navy-950 shadow-panel">
        <div className="flex min-h-[280px] items-center justify-center bg-black p-3 sm:min-h-[420px] sm:p-4">
          <video
            src={video.src}
            poster={video.poster}
            controls
            playsInline
            preload="metadata"
            aria-label={video.title}
            className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain shadow-panel"
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
          <p className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-400">
            This video link is not valid.
          </p>
        )}
      </div>
      <div className="border-t border-white/10 px-5 py-4">
        <h3 className="font-display text-lg font-semibold text-white">{video.title}</h3>
        <p className="mt-1 text-sm text-slate-300">{video.description}</p>
      </div>
    </div>
  );
}
