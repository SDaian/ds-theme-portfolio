import type { NextConfig } from 'next';

import createMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  eslint: {
    dirs: ['src'],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
          keepBackground: true,
        },
      ],
    ],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
