import type { BlogPost, BlogPostMetadata } from './blog-types';

import { readFileSync } from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

export type { BlogPost, BlogPostMetadata } from './blog-types';

export function getBlogPost(slug: string): BlogPost {
  const contentDirectory = join(process.cwd(), 'src/content');
  const filePath = join(contentDirectory, `${slug}.mdx`);

  try {
    const fileContent = readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      publishedAt: data.publishedAt || new Date().toISOString(),
      modifiedAt: data.modifiedAt,
      author: data.author || 'Daian Scuarissi',
      tags: data.tags || [],
      image: data.image,
      content,
    };
  } catch (error) {
    console.error(error);

    // Fallback for posts without frontmatter
    return {
      slug,
      title: slug.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      description: `Blog post about ${slug}`,
      publishedAt: new Date().toISOString(),
      author: 'Daian Scuarissi',
      tags: [],
      content: '',
    };
  }
}

export function getBlogPostMetadata(slug: string): BlogPostMetadata {
  const post = getBlogPost(slug);

  return {
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    modifiedAt: post.modifiedAt,
    author: post.author,
    tags: post.tags,
    image: post.image,
  };
}

export function generateBlogUrl(slug: string): string {
  return `/blog/${slug}`;
}

export { formatDate } from './date-utils';

export function getAllBlogPosts(): BlogPost[] {
  const blogSlugs = [
    'exploring-angular-19-control-flow',
    'modern-code-quality-pipeline-eslint-prettier-husky',
    'angular-feature-based-architecture',
    'web-accessibility-inclusive-ui',
    'react-microfrontends-vite',
    'angular-v16-to-v20-migration',
    'angular-performance-optimization-strategies',
    'angular-image-custom-directive',
    'custom-eslint-rules-img-fallback',
    'blog-seo-social-optimization',
    'building-blog-mdx-nextjs',
    'welcome',
  ];

  return blogSlugs
    .map((slug) => getBlogPost(slug))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
