const ALLOWED_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
  'youtu.be',
]);

/** Converts a supplied YouTube watch/share URL into a privacy-friendly embed URL. */
export function toYouTubeEmbedUrl(rawUrl: string): string | null {
  if (!rawUrl.trim()) {
    return null;
  }

  try {
    const url = new URL(rawUrl);
    if (!ALLOWED_HOSTS.has(url.hostname.toLowerCase())) {
      return null;
    }

    const videoId =
      url.hostname === 'youtu.be'
        ? url.pathname.split('/').filter(Boolean)[0]
        : url.searchParams.get('v') ?? url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1] ?? null;

    if (!videoId || !/^[a-zA-Z0-9_-]{6,}$/.test(videoId)) {
      return null;
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  } catch {
    return null;
  }
}
