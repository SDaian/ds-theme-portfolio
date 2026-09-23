import { getAllBlogPosts } from '@/lib/mdx';
import { SITE_AUTHOR, SITE_URL } from '@/lib/site-metadata';
import { PROJECT_ITEMS } from '@/components/Projects/Data/ProjectItems';
import { projectTagline } from '@/components/Projects/Models/Project';
import { SocialItems } from '@/components/Shared/SocialIcons/Data/SocialItems';

// /llms.txt: a plain-Markdown summary of the site for AI assistants
// (convention: https://llmstxt.org). Built from the same data the pages use,
// so a new post or project shows up here without a second edit.

export const dynamic = 'force-static';

const SOCIAL_LABELS: Record<string, string> = {
  Github: 'GitHub',
  Linkedin: 'LinkedIn',
  Twitter: 'X',
};

export function GET() {
  const posts = getAllBlogPosts().filter((post) => !post.noindex);

  const body = [
    `# ${SITE_AUTHOR}`,
    '',
    `> ${SITE_AUTHOR} is a software engineer based in Madrid, Spain, building web applications with Angular, React and Next.js and writing about frontend architecture, tooling and performance.`,
    '',
    '## Projects',
    '',
    ...PROJECT_ITEMS.map(
      (project) =>
        `- [${project.name}](${project.liveUrl ?? project.repoUrl}): ${projectTagline(project)}`,
    ),
    `- [All projects](${SITE_URL}/projects)`,
    '',
    '## Blog posts',
    '',
    ...posts.map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description}`),
    '',
    '## Links',
    '',
    `- Website: ${SITE_URL}`,
    ...SocialItems.map((item) => `- ${SOCIAL_LABELS[item.name] ?? item.name}: ${item.link}`),
    '',
    // Rendered once per build, so this is the date of the last deploy.
    `Last updated: ${new Date().toISOString().slice(0, 10)}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
