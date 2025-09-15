import type { BlogPost } from './blog-types';

export interface FilterState {
  selectedTags: string[];
  searchTerm: string;
}

/**
 * Extract all unique tags from blog posts
 */
export function extractUniqueTagsFromPosts(posts: BlogPost[]): string[] {
  const allTags = posts.flatMap((post) => post.tags);

  return Array.from(new Set(allTags)).sort();
}

/**
 * Filter posts by selected tags
 * If no tags are selected, return all posts
 */
export function filterPostsByTags(posts: BlogPost[], selectedTags: string[]): BlogPost[] {
  if (selectedTags.length === 0) {
    return posts;
  }

  return posts.filter((post) => selectedTags.some((tag) => post.tags.includes(tag)));
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
