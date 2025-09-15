'use client';

import type { BlogPost } from '@/lib/blog-types';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

import { Input } from '@/styles/components/ui/input';
import { Button } from '@/styles/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import {
  filterTagsBySearch,
  getTagPostCounts,
  sortTagsByPopularity,
  generateFilterSummary,
} from '@/lib/blog-filters';
import { getTagColor } from '@/lib/tag-colors';

interface BlogFilterProps {
  posts: BlogPost[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  availableTags: string[];
  filteredPostsCount: number;
}

export function BlogFilter({
  posts,
  selectedTags,
  onTagsChange,
  availableTags,
  filteredPostsCount,
}: BlogFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const tagCounts = getTagPostCounts(posts, availableTags);
  const filteredTags = filterTagsBySearch(availableTags, debouncedSearchTerm);
  const sortedTags = sortTagsByPopularity(filteredTags, tagCounts);

  const handleClearAll = () => {
    onTagsChange([]);
    setSearchTerm('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const filterSummary = generateFilterSummary(posts.length, filteredPostsCount, selectedTags);

  return (
    <div className='mb-8 space-y-6 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900/50'>
      {/* Filter Summary */}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>{filterSummary}</p>
        {selectedTags.length > 0 && (
          <Button className='w-fit text-xs' size='sm' variant='outline' onClick={handleClearAll}>
            <X className='mr-1 h-3 w-3' />
            Clear all
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {selectedTags.length > 0 && (
        <div className='space-y-2'>
          <p className='text-xs font-medium text-gray-500 dark:text-gray-400'>Active filters:</p>
          <div className='flex flex-wrap gap-2'>
            {selectedTags.map((tag) => (
              <button
                key={tag}
                className={`group inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors hover:opacity-80 ${getTagColor(tag)}`}
                onClick={() => handleRemoveTag(tag)}
              >
                {tag}
                <X className='h-3 w-3 opacity-60 group-hover:opacity-100' />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Tags */}
      <div className='relative'>
        <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
        <Input
          className='pl-10'
          placeholder='Search tags...'
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tags Filter */}
      <div className='space-y-4'>
        <h3 className='text-sm font-semibold text-gray-900 dark:text-gray-100'>Available tags</h3>

        {sortedTags.length === 0 ? (
          <p className='py-4 text-sm text-gray-500 italic dark:text-gray-400'>
            No tags match your search
          </p>
        ) : (
          <div className='flex flex-wrap gap-2'>
            {sortedTags.map((tag) => (
              <button
                key={tag}
                className={`inline-flex items-center rounded-md border px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                  selectedTags.includes(tag)
                    ? 'bg-brand border-brand text-white shadow-md'
                    : 'hover:border-brand/50 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                } `}
                type='button'
                onClick={() => {
                  const isSelected = selectedTags.includes(tag);

                  if (isSelected) {
                    onTagsChange(selectedTags.filter((t) => t !== tag));
                  } else {
                    onTagsChange([...selectedTags, tag]);
                  }
                }}
              >
                <span>{tag}</span>
                <span className='ml-1.5 rounded-full bg-black/10 px-1.5 py-0.5 text-xs opacity-75 dark:bg-white/10'>
                  {tagCounts[tag]}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
