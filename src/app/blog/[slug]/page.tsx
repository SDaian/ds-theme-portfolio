import type { Metadata } from 'next';

import { getBlogPostMetadata, generateBlogUrl, formatDate } from '@/lib/mdx';
import { getTagColor } from '@/lib/tag-colors';
import CodeEnhancer from '@/components/CodeEnhancer';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostMetadata(slug);

  const blogUrl = generateBlogUrl(slug);
  const ogImage = post.image || '/blog/default-og.svg';

  return {
    title: `${post.title} | Daian Scuarissi`,
    description: post.description,
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: post.author,
    keywords: post.tags,
    openGraph: {
      type: 'article',
      title: `${post.title} | Daian Scuarissi`,
      description: post.description,
      url: blogUrl,
      siteName: 'Daian Scuarissi - Software Engineer',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 627,
          alt: post.title,
        },
      ],
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Daian Scuarissi`,
      description: post.description,
      images: [ogImage],
      creator: '@daianscuarissi',
    },
    alternates: {
      canonical: blogUrl,
    },
    other: {
      'article:author': post.author,
      'article:published_time': post.publishedAt,
      ...(post.modifiedAt && { 'article:modified_time': post.modifiedAt }),
      'article:tag': post.tags.join(','),
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const { default: Post } = await import(`../../../content/${slug}.mdx`);
  const post = getBlogPostMetadata(slug);

  return (
    <article className='mx-auto mt-[65px] max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
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
    </article>
  );
}

export function generateStaticParams() {
  return [
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
