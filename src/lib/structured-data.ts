import type { BlogPost } from './blog-types';

import { DEFAULT_POST_IMAGE, SITE_AUTHOR, SITE_URL } from './site-metadata';

import { EXPERIENCE_ITEMS } from '@/components/Experience/Data/ExperienceItems';
import { SocialItems } from '@/components/Shared/SocialIcons/Data/SocialItems';

// schema.org descriptions of the site, its author and its posts, rendered as
// JSON-LD by <JsonLd />. Search engines and AI crawlers read these to know who
// wrote what, instead of inferring it from the page layout.
//
// Every node gets a stable @id so the pieces link up: posts name the same
// Person the home page describes, and the WebSite names that Person as its
// publisher.

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

type Node = Record<string, unknown>;

const absolute = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path}`);

/** Wraps nodes in the one @context a page's script tag needs. */
export function jsonLdGraph(...nodes: Node[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** The reference posts use for their author, so they point at one Person. */
const authorRef = { '@type': 'Person', '@id': PERSON_ID, name: SITE_AUTHOR, url: SITE_URL };

export function personNode(): Node {
  const current = EXPERIENCE_ITEMS.find((item) => item.actual);

  return {
    ...authorRef,
    image: absolute('/hero-image.jpg'),
    jobTitle: 'Software Engineer',
    address: { '@type': 'PostalAddress', addressLocality: 'Madrid', addressCountry: 'ES' },
    ...(current && {
      worksFor: { '@type': 'Organization', name: current.company, url: current.companyUrl },
    }),
    knowsAbout: [
      'Angular',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Frontend architecture',
      'Web performance',
      'Web accessibility',
    ],
    sameAs: SocialItems.map((item) => item.link),
  };
}

export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    // Google uses this as the site name shown above search results.
    name: SITE_AUTHOR,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
  };
}

export function blogPostingNode(post: BlogPost): Node {
  const url = absolute(`/blog/${post.slug}`);

  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: url,
    image: absolute(post.image ?? DEFAULT_POST_IMAGE.url),
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt ?? post.publishedAt,
    author: authorRef,
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
    keywords: post.tags.join(', '),
    inLanguage: 'en',
  };
}

/** Home is always the first crumb, so callers list only what follows it. */
export function breadcrumbNode(...trail: { name: string; path: string }[]): Node {
  const crumbs = [{ name: 'Home', path: '/' }, ...trail];

  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.path === '/' ? SITE_URL : absolute(crumb.path),
    })),
  };
}
