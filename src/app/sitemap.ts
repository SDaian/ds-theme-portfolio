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
//
// Only real dates go in lastmod: a post's own date, and the newest post's for
// the blog index. Static pages get none rather than a made-up one. changefreq
// and priority are left out because Google ignores both.

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts().filter((post) => !post.noindex);
  const postDate = (post: (typeof posts)[number]) => new Date(post.modifiedAt ?? post.publishedAt);
  const newestPost = posts.length
    ? new Date(Math.max(...posts.map((post) => postDate(post).getTime())))
    : undefined;

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.filter((route) => !route.noindex).map(
    ({ path }) => ({
      url: `${SITE_URL}${path === '/' ? '' : path}`,
      ...(path === '/blog' && newestPost && { lastModified: newestPost }),
    }),
  );

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: postDate(post),
  }));

  return [...staticEntries, ...postEntries];
}
