import { useEffect } from 'react';
import type { SiteConfig } from '@/types/content';

function setMeta(attribute: 'name' | 'property', key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setCanonical(url: string): void {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!url) {
    link?.remove();
    return;
  }
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
}

/** Keeps document head metadata in sync with the single site configuration object. */
export function useSeo(config: SiteConfig): void {
  useEffect(() => {
    const { title, description, ogImage, ogType } = config.metadata;
    const siteUrl = config.siteUrl.trim().replace(/\/$/, '');
    const imageUrl = siteUrl
      ? new URL(ogImage, `${siteUrl}/`).toString()
      : ogImage;

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', imageUrl);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);
    setCanonical(siteUrl);
  }, [config]);
}
