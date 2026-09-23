export type Project = {
  slug: string;
  name: string;
  /** Small label above the title, e.g. "Recently shipped". */
  eyebrow: string;
  /** One short line for compact listings. Falls back to the first sentence of description. */
  tagline?: string;
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

/** One short line for a project: its tagline, or the first sentence of its description. */
export const projectTagline = ({ tagline, description }: Project): string =>
  tagline ?? description.split(/(?<=\.)\s/)[0];
