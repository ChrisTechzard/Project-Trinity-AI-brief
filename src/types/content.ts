export type ViewMode = 'brief' | 'detailed';

export type EvidenceLabel = 'MEASURED' | 'SIMULATED' | 'PLANNED' | 'PROJECT SOURCE';

export type GalleryCategory =
  | 'showcase'
  | 'live-calibration'
  | 'traffic'
  | 'controller'
  | 'safety'
  | 'environment'
  | 'evaluation'
  | 'team';

export interface GalleryFilter {
  id: 'all' | 'live' | 'simulated' | 'team';
  label: string;
}

export type GalleryGroupId = 'live' | 'simulated' | 'team';

export interface GalleryGroup {
  id: GalleryGroupId;
  title: string;
  description: string;
  evidence: EvidenceLabel;
  coverId: string;
  assetIds: readonly string[];
}

export interface MediaAsset {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  evidence: EvidenceLabel;
  category: GalleryCategory;
  width: number;
  height: number;
  featured?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

interface VideoBase {
  id: string;
  title: string;
  description: string;
  meta?: string;
  featured?: boolean;
}

export interface LocalVideo extends VideoBase {
  kind: 'local';
  src: string;
  poster: string;
}

export interface YoutubeVideo extends VideoBase {
  kind: 'youtube';
  url: string;
}

export type VideoItem = LocalVideo | YoutubeVideo;

export interface Problem {
  id: string;
  index: string;
  title: string;
  description: string;
  detail: string;
  icon: 'traffic' | 'environment' | 'safety';
}

export interface Module {
  id: string;
  index: string;
  name: string;
  summary: string;
  capabilities: readonly string[];
  evidence: string;
  icon: 'traffic' | 'environment' | 'safety';
  image: {
    src: string;
    alt: string;
  };
}

export interface StatusGroup {
  id: 'built' | 'validating' | 'next';
  title: string;
  description: string;
  items: readonly string[];
}

export interface CollaborationItem {
  id: string;
  title: string;
  description: string;
  icon: 'mentorship' | 'professional' | 'partnership' | 'pilot' | 'infrastructure';
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  location: string;
  stage: string;
  siteUrl: string;
  nav: readonly NavItem[];
  contact: {
    email: string;
    phoneDisplay: string;
    phoneHref: string;
    location: string;
  };
  links: {
    projectGithub: string;
    teamGithub: string;
    portfolio: string;
  };
  metadata: {
    title: string;
    description: string;
    ogImage: string;
    ogType: string;
  };
}
