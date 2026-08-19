import Image from 'next/image';
import { ExternalLink, Github, ImageIcon } from 'lucide-react';

import { Project } from '../Models/Project';

type ProjectCardProps = {
  project: Project;
  /** Even rows put the screenshot first, odd rows reverse it. */
  index: number;
};

const Screenshot = ({ image, imageAlt, name }: Pick<Project, 'image' | 'imageAlt' | 'name'>) => (
  <div className='relative aspect-[16/10] overflow-hidden rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800'>
    {image ? (
      <Image
        fill
        alt={imageAlt ?? `${name} screenshot`}
        className='object-cover'
        sizes='(min-width: 768px) 50vw, 100vw'
        src={image}
      />
    ) : (
      <div className='flex h-full flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-500'>
        <ImageIcon className='h-8 w-8' />
        <span className='text-xs tracking-wider uppercase'>Screenshot coming</span>
      </div>
    )}
  </div>
);

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { name, eyebrow, description, stack, liveUrl, repoUrl, image, imageAlt, year } = project;
  const isReversed = index % 2 === 1;

  return (
    <article className='grid items-center gap-8 md:grid-cols-2 md:gap-12'>
      <div className={isReversed ? 'md:order-2' : ''}>
        <Screenshot image={image} imageAlt={imageAlt} name={name} />
      </div>

      <div className={`flex flex-col gap-5 ${isReversed ? 'md:order-1' : ''}`}>
        <div className='flex items-center gap-3'>
          <span className='bg-brand h-2 w-2 rounded-full' />
          <span className='text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400'>
            {eyebrow}
          </span>
          <span className='text-xs text-gray-400 dark:text-gray-500'>{year}</span>
        </div>

        <h3 className='text-3xl font-bold tracking-tight'>{name}</h3>

        <p className='leading-relaxed text-gray-700 dark:text-gray-300'>{description}</p>

        <ul aria-label={`${name} tech stack`} className='flex flex-wrap gap-2'>
          {stack.map((tech) => (
            <li
              key={tech}
              className='rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200'
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className='flex flex-wrap gap-6 pt-1'>
          {liveUrl && (
            <a
              className='text-brand hover:text-brand-lighter flex items-center gap-2 font-semibold transition-colors'
              href={liveUrl}
              rel='noreferrer'
              target='_blank'
            >
              <ExternalLink className='h-4 w-4' />
              Live site
              <span className='sr-only'>({name}, opens in a new tab)</span>
            </a>
          )}
          {repoUrl && (
            <a
              className='text-brand hover:text-brand-lighter flex items-center gap-2 font-semibold transition-colors'
              href={repoUrl}
              rel='noreferrer'
              target='_blank'
            >
              <Github className='h-4 w-4' />
              Source
              <span className='sr-only'>({name}, opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
