export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt?: string;
  author: string;
  tags: string[];
  image?: string;
  /** Frontmatter `noindex: true` keeps the post out of the index and the sitemap. */
  noindex?: boolean;
  content: string;
}

export interface BlogPostMetadata {
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt?: string;
  author: string;
  tags: string[];
  image?: string;
  noindex?: boolean;
}
