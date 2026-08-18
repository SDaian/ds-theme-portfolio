import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ children }) => (
      <h1 className='mt-8 mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className='mt-8 mb-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white'>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className='mt-6 mb-3 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className='mt-4 mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className='mt-4 mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className='mt-4 mb-2 text-base font-semibold tracking-tight text-gray-900 dark:text-white'>
        {children}
      </h6>
    ),
    p: ({ children }) => (
      <p className='mb-4 leading-relaxed text-gray-700 dark:text-gray-300'>{children}</p>
    ),
    ul: ({ children }) => (
      <ul className='mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300'>
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className='mb-4 list-inside list-decimal space-y-2 text-gray-700 dark:text-gray-300'>
        {children}
      </ol>
    ),
    li: ({ children }) => <li className='text-gray-700 dark:text-gray-300'>{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className='my-6 rounded-r border-l-4 border-blue-500 bg-gray-50 py-2 pl-4 text-gray-600 italic dark:bg-gray-800/50 dark:text-gray-400'>
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className='rounded bg-gray-100 px-2 py-1 font-mono text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200'>
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className='mb-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100'>
        {children}
      </pre>
    ),
    a: ({ children, href }) => (
      <a
        className='text-blue-600 underline underline-offset-2 transition-all hover:text-blue-800 hover:underline-offset-4 dark:text-blue-400 dark:hover:text-blue-300'
        href={href}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        target={href?.startsWith('http') ? '_blank' : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className='font-semibold text-gray-900 dark:text-white'>{children}</strong>
    ),
    em: ({ children }) => <em className='text-gray-700 italic dark:text-gray-300'>{children}</em>,
    hr: () => <hr className='my-8 border-t border-gray-200 dark:border-gray-700' />,
    table: ({ children }) => (
      <div className='mb-4 overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => <thead className='bg-gray-50 dark:bg-gray-800'>{children}</thead>,
    tbody: ({ children }) => (
      <tbody className='divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900'>
        {children}
      </tbody>
    ),
    th: ({ children }) => (
      <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400'>
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100'>
        {children}
      </td>
    ),
  };
}
