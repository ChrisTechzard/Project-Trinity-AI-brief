import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { modules } from '@/config/content';
import { galleryAssets, galleryGroups, videos } from '@/config/media';
import { siteConfig } from '@/config/site';

const publicDir = resolve(process.cwd(), 'public');
const sectionIds = ['home', ...siteConfig.nav.map((item) => item.href.slice(1))];

function assetExists(path: string): boolean {
  return existsSync(resolve(publicDir, path.replace(/^\.?\/?/, '')));
}

describe('content integrity', () => {
  it('uses unique ids across gallery items and videos', () => {
    const ids = [...galleryAssets, ...videos].map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('points every gallery image and module image at a bundled asset', () => {
    for (const asset of galleryAssets) {
      expect(assetExists(asset.src), `Missing gallery asset: ${asset.src}`).toBe(true);
    }
    for (const module of modules) {
      expect(assetExists(module.image.src), `Missing module image: ${module.image.src}`).toBe(true);
    }
  });

  it('groups every gallery capture exactly once', () => {
    const groupedIds = galleryGroups.flatMap((group) => group.assetIds);
    expect(new Set(groupedIds).size).toBe(groupedIds.length);
    expect(groupedIds.sort()).toEqual(galleryAssets.map((asset) => asset.id).sort());
    for (const group of galleryGroups) {
      expect(group.assetIds).toContain(group.coverId);
    }
  });

  it('points local videos and posters at bundled assets', () => {
    const localVideos = videos.filter((video) => video.kind === 'local');
    expect(localVideos.length).toBeGreaterThan(0);
    for (const video of localVideos) {
      if (video.kind === 'local') {
        expect(assetExists(video.src)).toBe(true);
        expect(assetExists(video.poster)).toBe(true);
      }
    }
  });

  it('resolves every navigation anchor to a real section', () => {
    for (const item of siteConfig.nav) {
      expect(item.href.startsWith('#')).toBe(true);
      expect(sectionIds).toContain(item.href.slice(1));
    }
  });

  it('lists only supplied playable recordings', () => {
    expect(videos.length).toBeGreaterThan(0);
    for (const video of videos) {
      if (video.kind === 'youtube') {
        expect(video.url.length).toBeGreaterThan(0);
      }
    }
  });

  it('uses a supported contact address and project links', () => {
    expect(siteConfig.contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(siteConfig.links.projectGithub).toMatch(/^https:\/\/github\.com\//);
    expect(siteConfig.links.teamGithub).toMatch(/^https:\/\/github\.com\//);
  });
});
