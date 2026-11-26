# PROJECT TRINITY AI — Brief Website

Premium static website for **PROJECT TRINITY AI**, a student-led AI smart-city prototype from Ghana. Built with React, Vite, TypeScript, Tailwind CSS, Framer Motion and Lucide React.

## What this site presents

- The three urban challenges the prototype addresses.
- The three monitoring modules and the Central AI Decision Engine.
- Authentic project evidence: live camera calibration captures, clearly labelled simulated walkthroughs and team photographs.
- Two project recordings and an explicit placeholder for a future unlisted YouTube link.
- Prototype status, vision and collaboration opportunities.

No deployment, verified real-world impact, fake statistics, testimonials or partner logos are claimed.

## Requirements

- Node.js 20+
- npm 10+

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:5173/`.

## Quality checks

```bash
npm run typecheck
npm test
npm run build
npm run preview
```

## Editing content

All editable content is centralised under `src/config/`:

| File | Purpose |
| --- | --- |
| `src/config/site.ts` | Brand text, metadata, contact details, GitHub and portfolio links, deployed URL |
| `src/config/content.ts` | Problems, modules, architecture notes, status, vision, collaboration copy |
| `src/config/media.ts` | Grouped gallery collections, evidence labels and video sources |
| `src/config/` types live in `src/types/content.ts` |

### Adding a YouTube video

Replace the pending entry in `src/config/media.ts` with:

```ts
{
  id: 'your-video-id',
  kind: 'youtube',
  title: 'Video title',
  description: 'Short description.',
  url: 'https://www.youtube.com/watch?v=VIDEO_ID',
}
```

The player converts supported YouTube share links to a `youtube-nocookie.com` embed. No URL is invented.

### Publishing metadata

Set `siteUrl` in `src/config/site.ts` to the final hosted URL so Open Graph and Twitter image tags resolve as absolute URLs.

## Assets

Original uploads are kept in ignored `assets-source/` and are not committed. Optimised WebP images and compressed videos live in `public/media/`. The site uses relative asset paths and a relative Vite `base`, so it works on a GitHub Pages project site as well as a custom domain.

## Deploying

The site is a static frontend with no environment variables or API keys.

```bash
npm run build
```

Output is written to `dist/`. Deploy that folder with GitHub Pages, Vercel, Netlify or any static host.

## Contact

- Email: `kenchriski0@gmail.com`
- Phone: `025 644 3258`
- Project repository: https://github.com/ElGabby01/trinity
- Team lead GitHub: https://github.com/ChrisTechzard
