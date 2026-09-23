import type { Metadata } from 'next';

import { isNoindex } from './routes';

// Single owner for every head tag a route needs. Routes call pageMetadata()
// so none can forget the canonical, the Open Graph card, or the Twitter card,
// and adding a tag site-wide means editing this file.

export const SITE_URL = 'https://daian-scuarissi.vercel.app';

export const SITE_NAME = 'Daian Scuarissi - Software Engineer';

/** The person behind the site: author of every post, subject of the home page. */
export const SITE_AUTHOR = 'Daian Scuarissi';

export const TWITTER_HANDLE = '@asdaian';

export const DEFAULT_OG_IMAGE = '/hero-image-2.jpg';

/** Share card for posts without their own image. The file is exactly this size. */
export const DEFAULT_POST_IMAGE: OgImage = {
  url: '/blog/og-default.jpg',
  width: 1200,
  height: 630,
};

export const MAX_DESCRIPTION = 150;

/** Search results cut titles off at about this length. */
export const MAX_TITLE = 60;

export type OgImage = {
  /** Path under /public. */
  url: string;
  /** Declare the size only when it matches the real file; the audit checks it. */
  width?: number;
  height?: number;
};

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

/**
 * The <title> for a page: "Title | Daian Scuarissi" when that fits in
 * MAX_TITLE, otherwise the title alone. Search engines show the site name
 * next to the result anyway (from the WebSite structured data), so a long
 * title keeps its words instead of losing them to an ellipsis.
 */
export function searchTitle(title: string): string {
  const withName = `${title} | ${SITE_AUTHOR}`;

  return withName.length <= MAX_TITLE ? withName : title;
}

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path, no trailing slash. "/" for the home page. */
  path: string;
  /** Use the title exactly as given, with no site name appended (the home page). */
  absoluteTitle?: boolean;
  /** Defaults to the site-wide hero image. */
  image?: OgImage;
  imageAlt?: string;
  /** Overrides the route registry; posts pass their frontmatter flag. */
  noindex?: boolean;
  /** Present on blog posts: switches the Open Graph type to article. */
  article?: {
    author: string;
    publishedTime: string;
    modifiedTime?: string;
    tags: string[];
  };
};

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image = { url: DEFAULT_OG_IMAGE },
  imageAlt,
  noindex = isNoindex(path),
  article,
}: PageMetadataInput): Metadata {
  // Social cards have room for the site name, so they always carry it.
  const shareTitle = absoluteTitle ? title : `${title} | ${SITE_AUTHOR}`;

  return {
    title: absoluteTitle ? title : searchTitle(title),
    description,
    ...(noindex && { robots: { index: false, follow: true } }),
    ...(article && { authors: [{ name: article.author, url: '/' }] }),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [{ ...image, alt: imageAlt ?? title }],
      ...(article
        ? {
            type: 'article',
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: [article.author],
            tags: article.tags,
          }
        : { type: 'website' }),
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [image.url],
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
    },
  };
}
