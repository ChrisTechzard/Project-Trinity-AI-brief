import type {
  CollaborationItem,
  Module,
  Problem,
  StatusGroup,
} from '@/types/content';

export const problems: readonly Problem[] = [
  {
    id: 'traffic',
    index: '01',
    title: 'Inefficient Urban Traffic Management',
    description:
      'Fixed signal plans cannot respond to the queue actually building at a junction. Vehicles wait longer than they need to, and operators have little visibility into which approach is under pressure.',
    detail:
      'The prototype explores queue-pressure and waiting-time based phase selection on a miniature junction test bed.',
    icon: 'traffic',
  },
  {
    id: 'environment',
    index: '02',
    title: 'Environmental Blind Spots',
    description:
      'Local air quality, temperature and humidity often go unobserved at the scale where people experience them, leaving decision-makers without indicative, local context.',
    detail:
      'A low-cost ESP32 sensor node streams indicative readings into the same dashboard as the traffic view.',
    icon: 'environment',
  },
  {
    id: 'safety',
    index: '03',
    title: 'Delayed Risk Detection',
    description:
      'Events such as a stopped vehicle or wrong-way movement can persist unnoticed. A detection is only useful when a person can review it and decide what it means.',
    detail:
      'The interface stages alert previews for operator verification; it does not dispatch emergency services.',
    icon: 'safety',
  },
];

export const modules: readonly Module[] = [
  {
    id: 'traffic',
    index: 'MODULE 01',
    name: 'AI Traffic Management',
    summary:
      'Observes a junction through a live phone-camera feed and turns vehicle presence into approach-level traffic state.',
    capabilities: [
      'Vehicle detection and tracking from the camera stream',
      'Per-approach queue, waiting-time and congestion views',
      'Adaptive phase selection for miniature LEDs using queue pressure and wait limits',
    ],
    evidence: 'MEASURED camera view · SIMULATED walkthrough views',
    icon: 'traffic',
    image: {
      src: 'media/calibration-03.webp',
      alt: 'Live phone-camera junction view with four detected vehicles',
    },
  },
  {
    id: 'environment',
    index: 'MODULE 02',
    name: 'Environmental Monitoring',
    summary:
      'Displays environmental context from an ESP32 node alongside junction operations.',
    capabilities: [
      'Temperature and humidity readings',
      'MQ135 gas sensor output shown as raw ADC, not calibrated concentration',
      'Reading history and an accessible readings table in the dashboard',
    ],
    evidence: 'Indicative sensor values · calibration still required',
    icon: 'environment',
    image: {
      src: 'media/demo-environment.webp',
      alt: 'Simulated environmental dashboard with temperature, humidity and raw gas readings',
    },
  },
  {
    id: 'safety',
    index: 'MODULE 03',
    name: 'Safety and Danger Detection',
    summary:
      'Presents safety events as alerts that require human review rather than automated action.',
    capabilities: [
      'Staged stopped-vehicle and wrong-way event previews',
      'Pending, verified and dismissed alert states',
      'Escalation recorded as a simulated log entry only',
    ],
    evidence: 'SIMULATED alert workflow · operator verification required',
    icon: 'safety',
    image: {
      src: 'media/demo-safety.webp',
      alt: 'Simulated safety alert review screen with pending operator decisions',
    },
  },
];

export const architectureNotes: readonly string[] = [
  'Phase selection in this build is driven by queue pressure and waiting-time limits.',
  'Environmental and safety values appear alongside the decision for operator context; they do not drive phase selection yet.',
  'AI detections remain alerts requiring operator verification. No face or number-plate recognition is performed.',
  'Signal output is limited to miniature LEDs. Public-road signal control is out of scope.',
];

export const statusGroups: readonly StatusGroup[] = [
  {
    id: 'built',
    title: 'Developed',
    description: 'Working parts of the current prototype.',
    items: [
      'Integrated dashboard with traffic, controller, safety, environment and evaluation views',
      'Live phone-camera vehicle detection and tracking on the miniature junction test bed',
      'Adaptive controller driving miniature LEDs with a published decision reason',
      'Telemetry transport and labelled PLANNED / SIMULATED / MEASURED data views',
      'Operator-review workflow for staged safety alerts',
    ],
  },
  {
    id: 'validating',
    title: 'Being validated',
    description: 'Areas the team is actively checking or improving.',
    items: [
      'Camera zone calibration and distance measurement (currently reported in pixels per second)',
      'MQ135 gas sensor calibration before readings can be treated as concentration',
      'Detection reliability and operator verification procedures',
      'A YOLO traffic candidate trained on synthetic artwork; not deployed in the live build',
    ],
  },
  {
    id: 'next',
    title: 'Intended next',
    description: 'Planned directions, not completed work.',
    items: [
      'Further validation through demonstrations and structured testing',
      'Exploration of real-world pilot opportunities with suitable partners',
      'Improved sensing and measurement using data from real junction conditions',
      'Continued refinement of coordinated decision-support behaviour',
    ],
  },
];

export const visionStatement =
  'To contribute to smarter, safer and more responsive African cities by developing practical AI-powered systems that help decision-makers understand urban conditions and respond more effectively.';

export const collaborationItems: readonly CollaborationItem[] = [
  {
    id: 'mentorship',
    title: 'Industry mentorship and technical guidance',
    description: 'Feedback from engineers and researchers on architecture, validation and system design.',
    icon: 'mentorship',
  },
  {
    id: 'professional',
    title: 'Collaboration with AI and smart-city professionals',
    description: 'Shared learning around urban sensing, computer vision and decision support.',
    icon: 'professional',
  },
  {
    id: 'partnership',
    title: 'Institutional and industry partnerships',
    description: 'Opportunities to align the prototype with real problems and responsible deployment practice.',
    icon: 'partnership',
  },
  {
    id: 'pilot',
    title: 'Demonstration and pilot-testing opportunities',
    description: 'Controlled settings where the prototype can be shown, tested and evaluated.',
    icon: 'pilot',
  },
  {
    id: 'infrastructure',
    title: 'Access to technical expertise and relevant infrastructure',
    description: 'Support that helps the team validate sensing, calibration and system reliability.',
    icon: 'infrastructure',
  },
];

export const evidenceLegend: readonly { label: string; meaning: string }[] = [
  { label: 'MEASURED', meaning: 'A reading from the live camera or sensor setup' },
  { label: 'SIMULATED', meaning: 'An offline demonstration or staged feed' },
  { label: 'PLANNED', meaning: 'A target, not a completed result' },
];
