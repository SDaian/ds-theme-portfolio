import type { MetadataRoute } from 'next';

import { getAllBlogPosts } from '@/lib/mdx';
import { SITE_URL } from '@/lib/site-metadata';

// No trailing slashes: every canonical in the app is written the same way,
// so the sitemap must be too or Search Console reports the pair as duplicates.
const STATIC_ROUTES = ['', '/blog', '/projects', '/frontend-interview-preparation'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === '' ? 'monthly' : 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedAt ?? post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
