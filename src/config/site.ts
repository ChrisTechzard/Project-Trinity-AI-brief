import type { SiteConfig } from '@/types/content';

/**
 * All external details live here. Set `siteUrl` to the deployed Vercel URL so
 * social crawlers can resolve the Open Graph image as an absolute URL.
 */
export const siteConfig: SiteConfig = {
  name: 'PROJECT TRINITY AI',
  shortName: 'TRINITY AI',
  tagline: 'Intelligent Systems for Smarter, Safer and More Responsive Cities.',
  description:
    'An integrated AI-powered smart-city initiative bringing traffic intelligence, environmental monitoring and safety detection together through a central decision-support engine.',
  location: 'Ghana',
  stage: 'Functioning prototype',
  siteUrl: 'https://christechzard.github.io/Project-Trinity-AI-brief/',
  nav: [
    { label: 'Problem', href: '#problem' },
    { label: 'Technology', href: '#technology' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Demonstrations', href: '#demonstrations' },
    { label: 'Status', href: '#status' },
    { label: 'Vision', href: '#vision' },
    { label: 'Collaborate', href: '#collaboration' },
  ],
  contact: {
    email: 'kenchriski0@gmail.com',
    phoneDisplay: '025 644 3258',
    phoneHref: 'tel:+233256443258',
    location: 'Ghana',
  },
  links: {
    projectGithub: 'https://github.com/ElGabby01/trinity',
    teamGithub: 'https://github.com/ChrisTechzard',
    // Local preview supplied by the team lead; replace with a hosted URL before public sharing.
    portfolio: 'http://localhost:5173/christechzard-portfolio/',
  },
  metadata: {
    title: 'PROJECT TRINITY AI — Intelligent Systems for Smarter Cities',
    description:
      'Project Trinity AI is a student-led Ghanaian smart-city prototype combining AI traffic management, environmental monitoring and safety detection in one decision-support engine.',
    ogImage: 'media/og-image.jpg',
    ogType: 'website',
  },
};
