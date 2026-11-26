import { describe, expect, it } from 'vitest';
import { toYouTubeEmbedUrl } from '@/utils/video';

describe('toYouTubeEmbedUrl', () => {
  it('converts a standard watch URL', () => {
    expect(toYouTubeEmbedUrl('https://www.youtube.com/watch?v=abc123XYZ_-')).toBe(
      'https://www.youtube-nocookie.com/embed/abc123XYZ_-',
    );
  });

  it('converts a youtu.be share URL', () => {
    expect(toYouTubeEmbedUrl('https://youtu.be/abc123XYZ_-')).toBe(
      'https://www.youtube-nocookie.com/embed/abc123XYZ_-',
    );
  });

  it('rejects empty, foreign and malformed URLs', () => {
    expect(toYouTubeEmbedUrl('')).toBeNull();
    expect(toYouTubeEmbedUrl('https://example.com/watch?v=abc123XYZ_-')).toBeNull();
    expect(toYouTubeEmbedUrl('https://www.youtube.com/watch?v=short')).toBeNull();
    expect(toYouTubeEmbedUrl('not a url')).toBeNull();
  });
});
