import { getAllBlogPosts } from '@/lib/mdx';
import { pageMetadata } from '@/lib/site-metadata';
import { breadcrumbNode, jsonLdGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/JsonLd';
import { BlogContent } from '@/components/Blog/Components/BlogContent';

export const metadata = pageMetadata({
  title: 'Blog',
  description:
    'Technical blog posts about web development, React, Next.js, TypeScript, and modern software engineering practices.',
  path: '/blog',
});

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className='mx-auto mt-[65px] min-h-[calc(100vh-165px)] max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
      <JsonLd data={jsonLdGraph(breadcrumbNode({ name: 'Blog', path: '/blog' }))} />
      <BlogContent posts={posts} />
    </div>
  );
}
