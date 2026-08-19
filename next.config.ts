import type { NextConfig } from 'next';

import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

// Plugins are named as strings, not imported functions: Turbopack serializes
// loader options, and a function reference is not serializable.
const withMDX = createMDX({
  options: {
    remarkPlugins: [['remark-frontmatter'], ['remark-mdx-frontmatter']],
    rehypePlugins: [
      [
        'rehype-pretty-code',
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
