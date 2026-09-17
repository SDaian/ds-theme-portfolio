import type { MetadataRoute } from 'next';

import { getAllBlogPosts } from '@/lib/mdx';
import { STATIC_ROUTES } from '@/lib/routes';
import { SITE_URL } from '@/lib/site-metadata';

// No trailing slashes: every canonical in the app is written the same way,
// so the sitemap must be too or Search Console reports the pair as duplicates.
//
// Both filters read the same noindex flag the page itself emits (the route
// registry for static pages, frontmatter for posts), so a page marked noindex
// can never be advertised here.

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.filter((route) => !route.noindex).map(
    ({ path }) => ({
      url: `${SITE_URL}${path === '/' ? '' : path}`,
      changeFrequency: path === '/' ? 'monthly' : 'weekly',
      priority: path === '/' ? 1 : 0.8,
    }),
  );

  const postEntries: MetadataRoute.Sitemap = getAllBlogPosts()
    .filter((post) => !post.noindex)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.modifiedAt ?? post.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  return [...staticEntries, ...postEntries];
}
