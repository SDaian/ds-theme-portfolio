import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts, formatDate } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Blog | Daian Scuarissi',
  description:
    'Technical blog posts about web development, React, Next.js, TypeScript, and modern software engineering practices.',
  openGraph: {
    title: 'Blog | Daian Scuarissi',
    description:
      'Technical blog posts about web development, React, Next.js, TypeScript, and modern software engineering practices.',
    type: 'website',
  },
  twitter: {
    title: 'Blog | Daian Scuarissi',
    description:
      'Technical blog posts about web development, React, Next.js, TypeScript, and modern software engineering practices.',
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className='min-h-[calc(100vh-165px)] mt-[65px] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
      <header className='mb-12'>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
          Blog
        </h1>
        <p className='text-lg text-gray-600 dark:text-gray-400'>
          Technical insights about web development, Angular, React, Next.js,
          TypeScript, and modern software engineering practices.
        </p>
      </header>

      <div className='grid gap-8 md:gap-12'>
        {posts.map((post) => (
          <article
            key={post.slug}
            className='group border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0'
          >
            <Link
              href={`/blog/${post.slug}`}
              className='block hover:no-underline'
            >
              <div className='flex flex-col space-y-4'>
                <div>
                  <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-brand transition-colors'>
                    {post.title}
                  </h2>
                  <p className='text-gray-600 dark:text-gray-400 mt-2 leading-relaxed'>
                    {post.description}
                  </p>
                </div>

                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                  <div className='flex items-center text-sm text-gray-500 dark:text-gray-500 space-x-4'>
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                    <span>•</span>
                    <span>By {post.author}</span>
                    {post.modifiedAt && (
                      <>
                        <span>•</span>
                        <span>Updated {formatDate(post.modifiedAt)}</span>
                      </>
                    )}
                  </div>

                  {post.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2'>
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className='px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className='text-center py-12'>
          <p className='text-gray-500 dark:text-gray-400'>
            No blog posts published yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
