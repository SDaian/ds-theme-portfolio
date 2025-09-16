'use client';

import type { BlogPost } from '@/lib/blog-types';

import { useState, useMemo } from 'react';

import { BlogFilterPopover, BlogPostList } from '@/components/Blog';
import { extractUniqueTagsFromPosts, filterPostsByTags } from '@/lib/blog-filters';

interface BlogContentProps {
  posts: BlogPost[];
}

export function BlogContent({ posts }: BlogContentProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const availableTags = useMemo(() => extractUniqueTagsFromPosts(posts), [posts]);

  const filteredPosts = useMemo(() => {
    return filterPostsByTags(posts, selectedTags);
  }, [posts, selectedTags]);

  const handleTagsChange = async (tags: string[]) => {
    setIsLoading(true);

    // Add a small delay to show loading state for better UX
    await new Promise((resolve) => setTimeout(resolve, 150));

    setSelectedTags(tags);
    setIsLoading(false);
  };

  return (
    <>
      <header className='mb-12'>
        <div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-100'>Blog</h1>
          <div className='flex-shrink-0'>
            <BlogFilterPopover
              availableTags={availableTags}
              filteredPostsCount={filteredPosts.length}
              posts={posts}
              selectedTags={selectedTags}
              onTagsChange={handleTagsChange}
            />
          </div>
        </div>
        <p className='mt-4 text-lg text-gray-600 dark:text-gray-400'>
          Technical insights about web development, Angular, React, Next.js, TypeScript, and modern
          software engineering practices.
        </p>
      </header>

      <BlogPostList
        allPosts={posts}
        isLoading={isLoading}
        posts={filteredPosts}
        selectedTags={selectedTags}
      />
    </>
  );
}
