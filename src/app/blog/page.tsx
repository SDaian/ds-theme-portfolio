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
      <header className='mb-12'>
        <h1 className='mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100'>Blog</h1>
        <p className='text-lg text-gray-600 dark:text-gray-400'>
          Technical insights about web development, Angular, React, Next.js, TypeScript, and modern
          software engineering practices.
        </p>
      </header>

      <BlogContent posts={posts} />
    </div>
  );
}
