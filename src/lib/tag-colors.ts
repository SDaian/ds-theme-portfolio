export function getTagColor(tag: string): string {
  const tagColors: { [key: string]: string } = {
    // Framework/Library tags - Blue variations
    angular: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    react: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200',
    nextjs: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200',
    vite: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',

    // Language tags - Green variations
    typescript: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200',
    javascript: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',

    // Architecture/Concepts - Orange/Red variations
    architecture: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
    microfrontends: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    scalability: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200',
    performance: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    scaling: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',

    // Best Practices - Teal variations
    'best-practices': 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200',
    optimization: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200',
    'code-quality': 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200',

    // Specialized - Pink/Rose variations
    accessibility: 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200',
    a11y: 'bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200',
    'inclusive-design': 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200',
    wcag: 'bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200',

    // Tools/Utilities - Violet variations
    eslint: 'bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200',
    tooling: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200',
    'custom-rules': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',

    // Content/Development - Lime variations
    mdx: 'bg-lime-100 dark:bg-lime-900 text-lime-800 dark:text-lime-200',
    blog: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    seo: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200',
    'social-media': 'bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200',
    'open-graph': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',

    // Technical - Slate variations
    'web-development': 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200',
    migration: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
    upgrade: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200',

    // Angular specific - Blue/Indigo variations
    signals: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200',
    directive: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    onpush: 'bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200',
    'lazy-loading': 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200',
    'bundle-optimization': 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200',

    // UX/Design - Pink variations
    ux: 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200',
    'image-handling': 'bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200',
    'design-patterns': 'bg-fuchsia-100 dark:bg-fuchsia-900 text-fuchsia-800 dark:text-fuchsia-200',
  };

  // Return specific color or default gray
  return tagColors[tag] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
}
