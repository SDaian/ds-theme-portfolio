import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { PROJECT_ITEMS } from '@/components/Projects/Data/ProjectItems';
import { SocialItems } from '@/components/Shared/SocialIcons/Data/SocialItems';
import { getAllBlogPosts, generateBlogUrl, formatDate } from '@/lib/mdx';

type PostOutroProps = {
  /** Slug of the post being read, so it never recommends itself. */
  currentSlug: string;
};

const AUTHOR = 'Daian Scuarissi';
const BIO = 'Software Engineer in Madrid, Spain.';
const LINKEDIN_URL = SocialItems.find((item) => item.name === 'Linkedin')?.link;

const eyebrowClass =
  'text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400';
const entryLinkClass =
  'hover:text-brand font-medium text-gray-900 transition-colors dark:text-gray-100';
/** Inline so the arrow trails the last word when a title wraps. */
const entryArrowClass = 'ml-1.5 inline h-4 w-4 align-[-0.125em]';
const entryMetaClass = 'mt-1 text-sm text-gray-600 dark:text-gray-400';

/** First sentence of a paragraph, for projects that don't set a tagline. */
const firstSentence = (text: string) => text.split(/(?<=\.)\s/)[0];

export const PostOutro = ({ currentSlug }: PostOutroProps) => {
  const projects = PROJECT_ITEMS.filter((project) => project.featured);
  const posts = getAllBlogPosts()
    .filter((post) => post.slug !== currentSlug && !post.noindex)
    .slice(0, 2);

  return (
    <aside
      aria-label='About the author and more to explore'
      className='mt-16 border-t border-gray-200 pt-10 dark:border-gray-700'
    >
      <div className='flex items-center gap-4'>
        <Image
          alt=''
          className='h-14 w-14 shrink-0 rounded-full object-cover'
          height={56}
          src='/hero-image.jpg'
          width={56}
        />
        <div className='min-w-0'>
          <p className='text-gray-900 dark:text-gray-100'>
            <span className='font-semibold'>{AUTHOR}</span>
            <span className='text-gray-600 dark:text-gray-400'> · {BIO}</span>
          </p>
          {LINKEDIN_URL && (
            <a
              className='text-brand hover:text-brand-lighter mt-1 inline-flex items-center gap-1.5 font-semibold transition-colors'
              href={LINKEDIN_URL}
              rel='noreferrer'
              target='_blank'
            >
              Follow on LinkedIn
              <ArrowRight aria-hidden='true' className='h-4 w-4' />
              <span className='sr-only'>(opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>

      <div className='mt-10 grid gap-10 md:grid-cols-2'>
        <div>
          <span className={eyebrowClass}>Things I&apos;ve built</span>
          <ul className='mt-4 flex flex-col gap-5'>
            {projects.map(({ slug, name, liveUrl, repoUrl, tagline, description }) => {
              const href = liveUrl ?? repoUrl;

              if (!href) return null;

              return (
                <li key={slug}>
                  <a className={entryLinkClass} href={href} rel='noreferrer' target='_blank'>
                    {name}
                    <ArrowRight aria-hidden='true' className={entryArrowClass} />
                    <span className='sr-only'>(opens in a new tab)</span>
                  </a>
                  <p className={entryMetaClass}>{tagline ?? firstSentence(description)}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <span className={eyebrowClass}>Keep reading</span>
          <ul className='mt-4 flex flex-col gap-5'>
            {posts.map(({ slug, title, publishedAt }) => (
              <li key={slug}>
                <Link className={entryLinkClass} href={generateBlogUrl(slug)}>
                  {title}
                  <ArrowRight aria-hidden='true' className={entryArrowClass} />
                </Link>
                <p className={entryMetaClass}>
                  <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default PostOutro;
