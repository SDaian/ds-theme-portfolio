import { Project } from '../Models/Project';

export const PROJECT_ITEMS: Project[] = [
  {
    slug: 'capitol-ledger',
    name: 'Capitol Ledger',
    eyebrow: 'Recently shipped',
    description:
      'Tracks the stock trades US members of Congress must disclose under the STOCK Act. A pipeline reads the official House Clerk, Senate eFD and OGE portals every morning, parses the filings out of their PDFs, and publishes a searchable record with a page per member and per stock, plus one daily email digest. The data lives as JSON in git rather than a database, so every correction to a filing is a diff you can read.',
    stack: [
      'Python',
      'GitHub Actions',
      'Astro 5',
      'Tailwind v4',
      'Vercel',
      'Twelve Data',
      'Buttondown',
    ],
    liveUrl: 'https://capitolledger.io',
    repoUrl: 'https://github.com/SDaian/crush-monitoring',
    year: '2026',
    featured: true,
  },
  {
    slug: 'ds-theme-portfolio',
    name: 'This Portfolio',
    eyebrow: 'You are looking at it',
    description:
      'Personal site and technical blog on the Next.js App Router. Posts are MDX compiled at build time with Shiki syntax highlighting, the whole site works in light and dark, and the production build moved to Turbopack with Next.js 16 — which cut full builds from 42s to 17s.',
    stack: ['Next.js 16', 'TypeScript', 'Tailwind v4', 'MDX', 'Vercel'],
    liveUrl: 'https://daian-scuarissi.vercel.app/',
    repoUrl: 'https://github.com/SDaian/ds-theme-portfolio',
    image: '/projects/portfolio-home.jpg',
    imageAlt: 'The portfolio home page, showing the hero introduction and navigation',
    year: '2025—26',
    featured: true,
  },
];
