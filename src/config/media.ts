import type {
  GalleryFilter,
  GalleryGroup,
  MediaAsset,
  VideoItem,
} from '@/types/content';

export const heroImage: MediaAsset = {
  id: 'hero-showcase',
  src: 'media/demo-showcase.webp',
  alt: 'Trinity AI dashboard showing traffic, environment and safety modules around the Central AI Decision Engine',
  title: 'Simulated system showcase',
  caption:
    'Simulated dashboard: the three monitoring views are presented around the Central AI Decision Engine.',
  evidence: 'SIMULATED',
  category: 'showcase',
  width: 1600,
  height: 738,
  featured: true,
};

export const galleryAssets: readonly MediaAsset[] = [
  heroImage,
  {
    id: 'calibration-01',
    src: 'media/calibration-01.webp',
    alt: 'Calibration session with a vehicle detection view beside the Trinity AI traffic dashboard',
    title: 'Camera calibration session',
    caption:
      'Calibration capture showing how the camera view was checked alongside the traffic dashboard.',
    evidence: 'MEASURED',
    category: 'live-calibration',
    width: 1600,
    height: 900,
  },
  {
    id: 'calibration-02',
    src: 'media/calibration-02.webp',
    alt: 'Live Trinity AI traffic operations dashboard with WebSocket and MQTT telemetry indicators',
    title: 'Live traffic operations',
    caption:
      'Traffic operations view on the miniature junction test bed with live WebSocket and MQTT telemetry indicators.',
    evidence: 'MEASURED',
    category: 'live-calibration',
    width: 1600,
    height: 900,
    featured: true,
  },
  {
    id: 'calibration-03',
    src: 'media/calibration-03.webp',
    alt: 'Phone camera junction view showing four detected vehicles and measured sample statistics',
    title: 'Four vehicles detected',
    caption:
      'Phone-camera junction view showing four detected vehicles with statistics measured across recent live samples.',
    evidence: 'MEASURED',
    category: 'live-calibration',
    width: 1600,
    height: 900,
  },
  {
    id: 'calibration-04',
    src: 'media/calibration-04.webp',
    alt: 'Close-up of the live camera feed control during system calibration',
    title: 'Live feed control',
    caption:
      'Close-up of the live camera feed control captured during calibration. Detection output still requires operator verification.',
    evidence: 'MEASURED',
    category: 'live-calibration',
    width: 860,
    height: 502,
  },
  {
    id: 'demo-traffic-detail',
    src: 'media/demo-traffic-detail.webp',
    alt: 'Simulated traffic detail view with approach pressure scores and detector status',
    title: 'Traffic detail and priority zone',
    caption:
      'Simulated traffic detail: approach pressure scores, detector status and priority-zone information.',
    evidence: 'SIMULATED',
    category: 'traffic',
    width: 1600,
    height: 738,
  },
  {
    id: 'demo-controller',
    src: 'media/demo-controller.webp',
    alt: 'Simulated adaptive controller view with phase, command reason and miniature LED state',
    title: 'Adaptive controller decision',
    caption:
      'Simulated controller: active phase, command reason and the miniature LED state explained by the engine.',
    evidence: 'SIMULATED',
    category: 'controller',
    width: 1600,
    height: 738,
  },
  {
    id: 'demo-safety',
    src: 'media/demo-safety.webp',
    alt: 'Simulated safety alerts for stopped vehicle and wrong-way events awaiting operator review',
    title: 'Safety alert review',
    caption:
      'Simulated safety alerts: staged stopped-vehicle and wrong-way events await operator verification.',
    evidence: 'SIMULATED',
    category: 'safety',
    width: 1600,
    height: 738,
  },
  {
    id: 'demo-environment',
    src: 'media/demo-environment.webp',
    alt: 'Simulated environmental module with temperature, humidity and raw MQ135 gas sensor readings',
    title: 'Environmental readings',
    caption:
      'Simulated environment view: temperature, humidity and raw MQ135 ADC values. Gas is not reported as calibrated concentration.',
    evidence: 'SIMULATED',
    category: 'environment',
    width: 1600,
    height: 738,
  },
  {
    id: 'demo-evaluation',
    src: 'media/demo-evaluation.webp',
    alt: 'Simulated evaluation view comparing fixed and adaptive signal control metrics',
    title: 'Fixed vs adaptive evaluation',
    caption:
      'Simulated evaluation view comparing fixed and adaptive control metrics in the offline model.',
    evidence: 'SIMULATED',
    category: 'evaluation',
    width: 1600,
    height: 738,
  },
  {
    id: 'team-01',
    src: 'media/team-01.webp',
    alt: 'Project Trinity AI team photographed at an AI hackathon and innovation showcase in Ghana',
    title: 'Team at an AI hackathon',
    caption:
      'The student team at an AI hackathon and innovation showcase in Ghana.',
    evidence: 'PROJECT SOURCE',
    category: 'team',
    width: 1600,
    height: 1200,
  },
  {
    id: 'team-02',
    src: 'media/team-02.webp',
    alt: 'Project Trinity AI team members together at a student technology event',
    title: 'Team together at the showcase',
    caption:
      'Team members photographed together during a student technology showcase.',
    evidence: 'PROJECT SOURCE',
    category: 'team',
    width: 1600,
    height: 1200,
  },
  {
    id: 'team-03',
    src: 'media/team-03.webp',
    alt: 'Team at a student innovation festival featuring AI hackathon and innovation pitch activities',
    title: 'Innovation festival',
    caption:
      'Team at a student innovation festival with AI hackathon, robotics and innovation-pitch activities.',
    evidence: 'PROJECT SOURCE',
    category: 'team',
    width: 1600,
    height: 1200,
  },
  {
    id: 'team-04',
    src: 'media/team-04.webp',
    alt: 'Team group photograph at an innovation pitch and hackathon event',
    title: 'Innovation pitch event',
    caption:
      'Group photograph from the innovation pitch and hackathon environment.',
    evidence: 'PROJECT SOURCE',
    category: 'team',
    width: 1600,
    height: 1200,
  },
];

/** Each similarly named set is presented as a single explorable collection. */
export const galleryGroups: readonly GalleryGroup[] = [
  {
    id: 'live',
    title: 'Live calibration set',
    description:
      'Four calibration captures of the camera detection view alongside the live traffic dashboard.',
    evidence: 'MEASURED',
    coverId: 'calibration-02',
    assetIds: ['calibration-01', 'calibration-02', 'calibration-03', 'calibration-04'],
  },
  {
    id: 'simulated',
    title: 'Simulated walkthrough set',
    description:
      'Six offline demonstration views: showcase, traffic detail, controller, safety, environment and evaluation.',
    evidence: 'SIMULATED',
    coverId: 'hero-showcase',
    assetIds: [
      'hero-showcase',
      'demo-traffic-detail',
      'demo-controller',
      'demo-safety',
      'demo-environment',
      'demo-evaluation',
    ],
  },
  {
    id: 'team',
    title: 'Team photograph set',
    description:
      'Four photographs of the student team at AI hackathon and innovation showcase events in Ghana.',
    evidence: 'PROJECT SOURCE',
    coverId: 'team-01',
    assetIds: ['team-01', 'team-02', 'team-03', 'team-04'],
  },
];

export const galleryFilters: readonly GalleryFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live calibration' },
  { id: 'simulated', label: 'Simulated' },
  { id: 'team', label: 'Team' },
];

export const videos: readonly VideoItem[] = [
  {
    id: 'team-lead-walkthrough',
    kind: 'local',
    title: 'Project Trinity AI — team lead walkthrough',
    description:
      'A short recording in which the team lead explains the project, the problem it addresses and how the prototype is structured.',
    meta: '≈ 70 seconds · project recording',
    src: 'media/trinity-explanation.mp4',
    poster: 'media/video-poster.webp',
    featured: true,
  },
  {
    id: 'camera-calibration',
    kind: 'local',
    title: 'Camera calibration walkthrough',
    description:
      'A project recording showing the camera calibration process alongside the detection view used with the miniature junction test bed.',
    meta: '≈ 49 seconds · calibration recording',
    src: 'media/calibration-video.mp4',
    poster: 'media/calibration-video-poster.webp',
  },
  {
    id: 'youtube-demonstration',
    kind: 'pending',
    title: 'Extended demonstration',
    description:
      'Space is reserved for a dedicated presentation or module walkthrough video when a sharing link is available.',
    note: 'No YouTube URL supplied. Add one in src/config/media.ts to enable this player.',
  },
];
