import type { Metadata } from 'next';

import { getAllBlogPosts } from '@/lib/mdx';
import { BlogContent } from '@/components/Blog/Components/BlogContent';

export const metadata: Metadata = {
  title: 'Blog | Daian Scuarissi',
  description:
    'Technical blog posts about web development, React, Next.js, TypeScript, and modern software engineering practices.',
  openGraph: {
    title: 'Blog | Daian Scuarissi',
    description:
      'Technical blog posts about web development, React, Next.js, TypeScript, and modern software engineering practices.',
    type: 'website',
  },
  twitter: {
    title: 'Blog | Daian Scuarissi',
    description:
      'Technical blog posts about web development, React, Next.js, TypeScript, and modern software engineering practices.',
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className='mx-auto mt-[65px] min-h-[calc(100vh-165px)] max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
      <BlogContent posts={posts} />
    </div>
  );
}
