import type { Metadata } from 'next';
import { getBlogPostMetadata, generateBlogUrl, formatDate } from '@/lib/mdx';

function getTagColor(tag: string): string {
  const tagColors: { [key: string]: string } = {
    // Framework/Library tags - Blue variations
    'angular': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    'react': 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200',
    'nextjs': 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200',
    'vite': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',

    // Language tags - Green variations
    'typescript': 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200',
    'javascript': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',

    // Architecture/Concepts - Orange/Red variations
    'architecture': 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
    'microfrontends': 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    'scalability': 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200',
    'performance': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    'scaling': 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',

    // Best Practices - Teal variations
    'best-practices': 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200',
    'optimization': 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200',
    'code-quality': 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200',

    // Specialized - Pink/Rose variations
    'accessibility': 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200',
    'a11y': 'bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200',
    'inclusive-design': 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200',
    'wcag': 'bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200',

    // Tools/Utilities - Violet variations
    'eslint': 'bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200',
    'tooling': 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200',
    'custom-rules': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',

    // Content/Development - Lime variations
    'mdx': 'bg-lime-100 dark:bg-lime-900 text-lime-800 dark:text-lime-200',
    'blog': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    'seo': 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200',
    'social-media': 'bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200',
    'open-graph': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',

    // Technical - Slate variations
    'web-development': 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200',
    'migration': 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
    'upgrade': 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200',

    // Angular specific - Blue/Indigo variations
    'signals': 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200',
    'directive': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    'onpush': 'bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200',
    'lazy-loading': 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200',
    'bundle-optimization': 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200',

    // UX/Design - Pink variations
    'ux': 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200',
    'image-handling': 'bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200',
    'design-patterns': 'bg-fuchsia-100 dark:bg-fuchsia-900 text-fuchsia-800 dark:text-fuchsia-200',
  };

  // Return specific color or default gray
  return tagColors[tag] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
}

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
    <article className='mt-[65px] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
      <header className='mb-8'>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
          {post.title}
        </h1>
        <div className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
          <time dateTime={post.publishedAt}>
            Published on {formatDate(post.publishedAt)}
          </time>
          {post.modifiedAt && (
            <>
              {' • '}
              <time dateTime={post.modifiedAt}>
                Updated on {formatDate(post.modifiedAt)}
              </time>
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
                className={`px-3 py-1 text-xs rounded-full font-medium ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <hr className='border-t border-gray-200 dark:border-gray-700 mb-8' />
      <div className='prose prose-lg dark:prose-invert max-w-none'>
        <Post />
      </div>
    </article>
  );
}

export function generateStaticParams() {
  return [
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
