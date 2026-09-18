import type { Metadata } from 'next';

import { isNoindex } from './routes';

// Single owner for every head tag a route needs. Routes call pageMetadata()
// so none can forget the canonical, the Open Graph card, or the Twitter card,
// and adding a tag site-wide means editing this file.

export const SITE_URL = 'https://daian-scuarissi.vercel.app';

export const SITE_NAME = 'Daian Scuarissi - Software Engineer';

export const TWITTER_HANDLE = '@daianscuarissi';

export const DEFAULT_OG_IMAGE = '/hero-image-2.jpg';

export const MAX_DESCRIPTION = 150;

/**
 * Build a meta description that stays within MAX_DESCRIPTION. The lead is
 * always kept; each optional clause is appended only while the whole string
 * still fits. Drops a whole clause rather than cutting mid-word, so a
 * description that interpolates data never overflows after a refresh.
 */
export function capDescription(lead: string, ...clauses: string[]): string {
  let out = lead.trim();

  for (const clause of clauses) {
    const next = `${out} ${clause.trim()}`;

    if (next.length > MAX_DESCRIPTION) break;
    out = next;
  }

  return out;
}

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path, no trailing slash. "/" for the home page. */
  path: string;
  /** Path under /public. Defaults to the site-wide hero image. */
  image?: string;
  imageAlt?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | Daian Scuarissi`;

  return {
    title: fullTitle,
    description,
    // Read from the same registry sitemap.ts filters on, so the two can't disagree.
    ...(isNoindex(path) && { robots: { index: false, follow: true } }),
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [{ url: image, alt: imageAlt ?? title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: TWITTER_HANDLE,
    },
  };
}
