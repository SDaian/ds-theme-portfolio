import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt?: string;
  author: string;
  tags: string[];
  image?: string;
  content: string;
}

export interface BlogPostMetadata {
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt?: string;
  author: string;
  tags: string[];
  image?: string;
}

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
    console.log(error);
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

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getAllBlogPosts(): BlogPost[] {
  const blogSlugs = [
    'welcome',
    'building-blog-mdx-nextjs',
    'blog-seo-social-optimization'
  ];
  
  return blogSlugs
    .map(slug => getBlogPost(slug))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
