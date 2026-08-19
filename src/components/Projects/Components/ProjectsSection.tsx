'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { PROJECT_ITEMS } from '../Data/ProjectItems';

import { ProjectCard } from './ProjectCard';

import { Reveal } from '@/components/Utils/Reveal';

const ProjectsSection = () => {
  const featured = PROJECT_ITEMS.filter((project) => project.featured);

  return (
    <section aria-labelledby='projects-heading' className='scroll-mt-16' id='projects'>
      <div className='container mx-auto py-16 md:py-24'>
        <header className='mb-16 text-center'>
          <h2 className='mb-4 text-4xl font-bold md:text-5xl' id='projects-heading'>
            Projects
          </h2>
          <div className='bg-brand mx-auto h-1 w-16 rounded-full' />
        </header>

        <div className='flex flex-col gap-16 md:gap-24'>
          {featured.map((project, i) => (
            <Reveal key={project.slug} index={i} width='100%'>
              <ProjectCard index={i} project={project} />
            </Reveal>
          ))}
        </div>

        <div className='mt-14 text-center'>
          <Link
            className='text-brand hover:text-brand-lighter inline-flex items-center gap-2 font-semibold transition-colors'
            href='/projects'
          >
            See all projects
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
