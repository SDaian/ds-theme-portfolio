import type { Metadata } from 'next';

import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import ExperienceSection from '@/components/Experience/Components/ExperienceSection';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/Projects/Components/ProjectsSection';
import { HashScrollHandler } from '@/components/HashScrollHandler';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata, SITE_AUTHOR } from '@/lib/site-metadata';
import { jsonLdGraph, personNode, websiteNode } from '@/lib/structured-data';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Daian Scuarissi | Software Engineer | Frontend Developer',
    absoluteTitle: true,
    description:
      'Software Engineer based in Madrid, Spain. Turning ideas into visually stunning and performant web applications using Angular or React.',
    path: '/',
    imageAlt: 'Portrait of Daian Scuarissi',
  }),
  keywords: [
    'personal website',
    'daian scuarissi',
    'angular',
    'react',
    'software engineer',
    'frontend development',
    'contact me',
  ],
  referrer: 'origin-when-cross-origin',
  authors: [{ name: SITE_AUTHOR }],
  creator: SITE_AUTHOR,
  publisher: SITE_AUTHOR,
};

export default function Home() {
  return (
    <div className='mx-auto px-6 sm:px-6 md:max-w-[1400px]'>
      <JsonLd data={jsonLdGraph(personNode(), websiteNode())} />
      <HashScrollHandler />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
