export type Project = {
  slug: string;
  name: string;
  /** Small label above the title, e.g. "Recently shipped". */
  eyebrow: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Path under /public. Falls back to a placeholder frame when absent. */
  image?: string;
  imageAlt?: string;
  year: string;
  /** Shown in the home page teaser. */
  featured: boolean;
};
