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
      <div className='mb-8'>
        <BlogFilterPopover
          availableTags={availableTags}
          filteredPostsCount={filteredPosts.length}
          posts={posts}
          selectedTags={selectedTags}
          onTagsChange={handleTagsChange}
        />
      </div>

      <BlogPostList isLoading={isLoading} posts={filteredPosts} selectedTags={selectedTags} />
    </>
  );
}
