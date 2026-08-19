import type { Metadata } from 'next';

import { PROJECT_ITEMS } from '@/components/Projects/Data/ProjectItems';
import { ProjectCard } from '@/components/Projects/Components/ProjectCard';

const description =
  'Things I have designed and built, with the stack behind each one and links to the live site and source.';

export const metadata: Metadata = {
  title: 'Projects | Daian Scuarissi',
  description,
  openGraph: {
    title: 'Projects | Daian Scuarissi',
    description,
    type: 'website',
  },
  twitter: {
    title: 'Projects | Daian Scuarissi',
    description,
  },
};

export default function ProjectsPage() {
  return (
    <div className='mx-auto mt-[65px] min-h-[calc(100vh-165px)] max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
      <header className='mb-16 text-center'>
        <h1 className='mb-4 text-4xl font-bold md:text-5xl'>Projects</h1>
        <div className='bg-brand mx-auto mb-6 h-1 w-16 rounded-full' />
        <p className='mx-auto max-w-2xl text-gray-600 dark:text-gray-400'>{description}</p>
      </header>

      <div className='flex flex-col gap-16 md:gap-24'>
        {PROJECT_ITEMS.map((project, i) => (
          <ProjectCard key={project.slug} index={i} project={project} />
        ))}
      </div>
    </div>
  );
}
