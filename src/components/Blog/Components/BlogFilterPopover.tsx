'use client';

import type { BlogPost } from '@/lib/blog-types';

import { useState } from 'react';
import { Search, X, Filter, ChevronDown } from 'lucide-react';

import { Input } from '@/styles/components/ui/input';
import { Button } from '@/styles/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/styles/components/ui/popover';
import { useDebounce } from '@/hooks/useDebounce';
import {
  filterTagsBySearch,
  getTagPostCounts,
  sortTagsByPopularity,
  generateFilterSummary,
  getFilterableTags,
} from '@/lib/blog-filters';
import { getTagColor } from '@/lib/tag-colors';

interface BlogFilterPopoverProps {
  posts: BlogPost[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  availableTags: string[];
  filteredPostsCount: number;
}

export function BlogFilterPopover({
  posts,
  selectedTags,
  onTagsChange,
  availableTags,
  filteredPostsCount,
}: BlogFilterPopoverProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filterableAvailableTags = getFilterableTags(availableTags);
  const tagCounts = getTagPostCounts(posts, filterableAvailableTags);
  const filteredTags = filterTagsBySearch(filterableAvailableTags, debouncedSearchTerm);
  const sortedTags = sortTagsByPopularity(filteredTags, tagCounts);

  const handleClearAll = () => {
    onTagsChange([]);
    setSearchTerm('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagToggle = (tag: string) => {
    const isSelected = selectedTags.includes(tag);

    if (isSelected) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const filterSummary = generateFilterSummary(posts.length, filteredPostsCount, selectedTags);

  return (
    <div className='flex flex-col gap-3 sm:gap-4'>
      {/* Filter Summary and Button Row */}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4'>
        <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>{filterSummary}</p>

        {/* Filter Popover */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              className={`w-fit gap-2 ${selectedTags.length > 0 ? 'border-brand bg-brand/5' : ''}`}
              size='sm'
              variant='outline'
            >
              <Filter className='h-4 w-4' />
              Filter
              {selectedTags.length > 0 && (
                <span className='bg-brand rounded-full px-1.5 py-0.5 text-xs text-white'>
                  {selectedTags.length}
                </span>
              )}
              <ChevronDown className='h-3 w-3' />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            avoidCollisions
            align='end'
            className='max-h-[80vh] w-80 overflow-hidden border bg-white/95 p-0 shadow-xl backdrop-blur-sm sm:w-96 dark:bg-gray-900/95'
            collisionPadding={16}
            side='bottom'
            sideOffset={8}
          >
            <div className='space-y-4 p-4'>
              {/* Header */}
              <div className='flex items-center justify-between'>
                <h3 className='font-semibold text-gray-900 dark:text-gray-100'>Filter by tags</h3>
                {selectedTags.length > 0 && (
                  <Button
                    className='h-auto p-1 text-xs'
                    size='sm'
                    variant='ghost'
                    onClick={handleClearAll}
                  >
                    <X className='mr-1 h-3 w-3' />
                    Clear all
                  </Button>
                )}
              </div>

              {/* Search */}
              <div className='relative'>
                <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                <Input
                  className='h-9 pl-10'
                  placeholder='Search tags...'
                  type='text'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Active Filters (mobile) */}
              {selectedTags.length > 0 && (
                <div className='space-y-2'>
                  <p className='text-xs font-medium text-gray-500 dark:text-gray-400'>
                    Active filters:
                  </p>
                  <div className='flex flex-wrap gap-1.5'>
                    {getFilterableTags(selectedTags).map((tag) => (
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

              {/* Tags */}
              <div className='space-y-3'>
                <p className='text-xs font-medium text-gray-500 dark:text-gray-400'>
                  Available tags:
                </p>
                <div className='max-h-60 overflow-y-auto overscroll-contain'>
                  {sortedTags.length === 0 ? (
                    <p className='py-4 text-center text-sm text-gray-500 italic dark:text-gray-400'>
                      No tags match your search
                    </p>
                  ) : (
                    <div className='flex flex-wrap gap-1.5 p-1'>
                      {sortedTags.map((tag) => (
                        <button
                          key={tag}
                          className={`inline-flex items-center rounded-md border px-2.5 py-1.5 text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                            selectedTags.includes(tag)
                              ? 'bg-brand border-brand text-white shadow-md'
                              : 'hover:border-brand/50 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                          } `}
                          type='button'
                          onClick={() => handleTagToggle(tag)}
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
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
