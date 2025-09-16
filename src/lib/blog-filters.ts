import type { BlogPost } from './blog-types';

// Tags that should be excluded from filtering UI (implementation details, too broad, etc.)
const EXCLUDED_FILTER_TAGS = [
  'mdx', // Implementation detail
  'blog', // Redundant in blog context
  'image-handling', // Too specific/technical
  'onpush', // Too technical
  'directive', // Too technical
  'migration', // Too specific
  'signals', // Too technical
  'seo', // Too specific
  'wcag', // Technical standard acronym
  'scaling', // Subset of architecture/performance
  'lazy-loading', // Technical implementation detail
  'open-graph', // Too specific/technical
  'social-media', // Narrow subset
  'inclusive-design', // Subset of accessibility
  'custom-rules', // Too specific/technical
];

export interface FilterState {
  selectedTags: string[];
  searchTerm: string;
}

/**
 * Filter tags to only include those suitable for filtering UI
 */
export function getFilterableTags(tags: string[]): string[] {
  return tags.filter((tag) => !EXCLUDED_FILTER_TAGS.includes(tag));
}

/**
 * Extract all unique tags from blog posts (filtered for UI)
 */
export function extractUniqueTagsFromPosts(posts: BlogPost[]): string[] {
  const allTags = posts.flatMap((post) => post.tags);
  const uniqueTags = Array.from(new Set(allTags));

  return getFilterableTags(uniqueTags).sort();
}

/**
 * Filter posts by selected tags (AND logic)
 * If no tags are selected, return all posts
 * Posts must have ALL selected tags to be included
 */
export function filterPostsByTags(posts: BlogPost[], selectedTags: string[]): BlogPost[] {
  if (selectedTags.length === 0) {
    return posts;
  }

  return posts.filter((post) => selectedTags.every((tag) => post.tags.includes(tag)));
}

/**
 * Filter tags by search term
 */
export function filterTagsBySearch(tags: string[], searchTerm: string): string[] {
  if (!searchTerm.trim()) {
    return tags;
  }

  const normalizedSearchTerm = searchTerm.toLowerCase().trim();

  return tags.filter((tag) => tag.toLowerCase().includes(normalizedSearchTerm));
}

/**
 * Get post count for each tag
 */
export function getTagPostCounts(posts: BlogPost[], tags: string[]): Record<string, number> {
  const tagCounts: Record<string, number> = {};

  tags.forEach((tag) => {
    tagCounts[tag] = posts.filter((post) => post.tags.includes(tag)).length;
  });

  return tagCounts;
}

/**
 * Generate filter summary text
 */
export function generateFilterSummary(
  totalPosts: number,
  filteredPosts: number,
  selectedTags: string[],
): string {
  if (selectedTags.length === 0) {
    return `Showing all ${totalPosts} posts`;
  }

  if (filteredPosts === 0) {
    return `No posts found for selected tags`;
  }

  const tagText = selectedTags.length === 1 ? 'tag' : 'tags';

  return `Showing ${filteredPosts} of ${totalPosts} posts for ${selectedTags.length} ${tagText}`;
}

/**
 * Sort tags by post count (descending) and then alphabetically
 */
export function sortTagsByPopularity(tags: string[], tagCounts: Record<string, number>): string[] {
  return tags.sort((a, b) => {
    const countDiff = tagCounts[b] - tagCounts[a];

    if (countDiff !== 0) {
      return countDiff;
    }

    return a.localeCompare(b);
  });
}
