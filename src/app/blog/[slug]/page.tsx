import type { Metadata } from 'next';

import { getBlogPost, getBlogPostMetadata, generateBlogUrl, formatDate } from '@/lib/mdx';
import { DEFAULT_POST_IMAGE, pageMetadata } from '@/lib/site-metadata';
import { blogPostingNode, breadcrumbNode, jsonLdGraph } from '@/lib/structured-data';
import { getTagColor } from '@/lib/tag-colors';
import CodeEnhancer from '@/components/CodeEnhancer';
import { JsonLd } from '@/components/JsonLd';
import PostOutro from '@/components/PostOutro/Components/PostOutro';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostMetadata(slug);

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: generateBlogUrl(slug),
    // A post's own image has no declared size; the default's is known.
    image: post.image ? { url: post.image } : DEFAULT_POST_IMAGE,
    imageAlt: post.title,
    // Same frontmatter flag sitemap.ts filters on, so the two can't disagree.
    noindex: post.noindex === true,
    article: {
      author: post.author,
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      tags: post.tags,
    },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const { default: Post } = await import(`../../../content/${slug}.mdx`);
  const post = getBlogPost(slug);

  return (
    <article className='mx-auto mt-[65px] max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
      <JsonLd
        data={jsonLdGraph(
          blogPostingNode(post),
          breadcrumbNode(
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${slug}` },
          ),
        )}
      />
      <header className='mb-8'>
        <h1 className='mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100'>{post.title}</h1>
        <div className='mb-4 text-sm text-gray-600 dark:text-gray-400'>
          <time dateTime={post.publishedAt}>Published on {formatDate(post.publishedAt)}</time>
          {post.modifiedAt && (
            <>
              {' • '}
              <time dateTime={post.modifiedAt}>Updated on {formatDate(post.modifiedAt)}</time>
            </>
          )}
          {' • '}
          <span>By {post.author}</span>
        </div>
        {post.tags.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className={`rounded-full px-3 py-1 text-xs font-medium ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <hr className='mb-8 border-t border-gray-200 dark:border-gray-700' />
      <div className='prose prose-lg dark:prose-invert max-w-none'>
        <Post />
      </div>
      <CodeEnhancer />
      <PostOutro currentSlug={slug} />
    </article>
  );
}

export function generateStaticParams() {
  return [
    { slug: 'nextjs-15-to-16-upgrade' },
    { slug: 'angular-constructor-vs-inject' },
    { slug: 'exploring-angular-control-flow-syntax' },
    { slug: 'modern-code-quality-pipeline-eslint-prettier-husky' },
    { slug: 'angular-feature-based-architecture' },
    { slug: 'web-accessibility-inclusive-ui' },
    { slug: 'react-microfrontends-vite' },
    { slug: 'angular-v16-to-v20-migration' },
    { slug: 'angular-performance-optimization-strategies' },
    { slug: 'angular-image-custom-directive' },
    { slug: 'custom-eslint-rules-img-fallback' },
    { slug: 'blog-seo-social-optimization' },
    { slug: 'building-blog-mdx-nextjs' },
    { slug: 'welcome' },
  ];
}

export const dynamicParams = false;
