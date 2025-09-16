'use client';

import type { BlogPost } from '@/lib/blog-types';

import Link from 'next/link';
import { Search, FileText, Lightbulb } from 'lucide-react';

import { formatDate } from '@/lib/date-utils';
import { getTagColor } from '@/lib/tag-colors';
import { getFilterableTags } from '@/lib/blog-filters';

interface BlogPostListProps {
  posts: BlogPost[];
  selectedTags: string[];
  isLoading?: boolean;
  allPosts?: BlogPost[];
}

function EmptyState({
  selectedTags,
  allPosts = [],
}: {
  selectedTags: string[];
  allPosts?: BlogPost[];
}) {
  if (selectedTags.length === 0) {
    return (
      <div className='py-16 text-center'>
        <FileText className='mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-600' />
        <h3 className='mb-2 text-lg font-medium text-gray-900 dark:text-gray-100'>
          No blog posts yet
        </h3>
        <p className='mx-auto max-w-sm text-gray-500 dark:text-gray-400'>
          Check back soon for technical insights about web development, React, Angular, and more.
        </p>
      </div>
    );
  }

  // Get latest posts as recommendations
  const latestPosts = allPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <div className='py-16 text-center'>
      <Search className='mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-600' />
      <h3 className='mb-2 text-lg font-medium text-gray-900 dark:text-gray-100'>No posts found</h3>
      <p className='mx-auto mb-6 max-w-sm text-gray-500 dark:text-gray-400'>
        No blog posts match the selected tags. Try selecting different tags or clearing your
        filters.
      </p>

      {/* Recommendations */}
      {latestPosts.length > 0 && (
        <div className='mx-auto max-w-2xl'>
          <div className='mb-6 flex items-center justify-center gap-2'>
            <Lightbulb className='h-5 w-5 text-yellow-500' />
            <h4 className='font-medium text-gray-900 dark:text-gray-100'>
              Maybe you&apos;d be interested in:
            </h4>
          </div>

          {/* Latest Posts */}
          <div>
            <p className='mb-3 text-sm text-gray-600 dark:text-gray-400'>Recent posts:</p>
            <div className='space-y-2 text-left'>
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  className='block rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                  href={`/blog/${post.slug}`}
                >
                  <h5 className='font-medium text-gray-900 dark:text-gray-100'>{post.title}</h5>
                  <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                    {post.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className='space-y-8'>
      {Array.from({ length: 3 }).map((_, index) => (
        <article
          key={index}
          className='border-b border-gray-200 pb-8 last:border-b-0 dark:border-gray-700'
        >
          <div className='animate-pulse space-y-4'>
            {/* Title skeleton */}
            <div className='h-8 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700' />

            {/* Description skeleton */}
            <div className='space-y-2'>
              <div className='h-4 w-full rounded bg-gray-200 dark:bg-gray-700' />
              <div className='h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700' />
            </div>

            {/* Meta and tags skeleton */}
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center space-x-4'>
                <div className='h-4 w-24 rounded bg-gray-200 dark:bg-gray-700' />
                <div className='h-4 w-16 rounded bg-gray-200 dark:bg-gray-700' />
              </div>
              <div className='flex gap-2'>
                <div className='h-6 w-16 rounded bg-gray-200 dark:bg-gray-700' />
                <div className='h-6 w-20 rounded bg-gray-200 dark:bg-gray-700' />
                <div className='h-6 w-14 rounded bg-gray-200 dark:bg-gray-700' />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function BlogPostList({
  posts,
  selectedTags,
  isLoading = false,
  allPosts = [],
}: BlogPostListProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (posts.length === 0) {
    return <EmptyState allPosts={allPosts} selectedTags={selectedTags} />;
  }

  return (
    <div className='grid gap-8 md:gap-12'>
      {posts.map((post) => (
        <article
          key={post.slug}
          className='group border-b border-gray-200 pb-8 transition-opacity duration-200 last:border-b-0 dark:border-gray-700'
        >
          <Link className='block hover:no-underline' href={`/blog/${post.slug}`}>
            <div className='flex flex-col space-y-4'>
              <div>
                <h2 className='group-hover:text-brand text-2xl font-semibold text-gray-900 transition-colors dark:text-gray-100'>
                  {post.title}
                </h2>
                <p className='mt-2 leading-relaxed text-gray-600 dark:text-gray-400'>
                  {post.description}
                </p>
              </div>

              <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div className='flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500'>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <span>•</span>
                  <span>By {post.author}</span>
                  {post.modifiedAt && (
                    <>
                      <span>•</span>
                      <span>Updated {formatDate(post.modifiedAt)}</span>
                    </>
                  )}
                </div>

                {getFilterableTags(post.tags).length > 0 && (
                  <div className='flex flex-wrap gap-2'>
                    {getFilterableTags(post.tags).map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${getTagColor(tag)}`}
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
  );
}
