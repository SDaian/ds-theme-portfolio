import { Metadata } from 'next';

import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import ExperienceSection from '@/components/Experience/Components/ExperienceSection';
import HeroSection from '@/components/HeroSection';

export const metadata: Metadata = {
  title: 'Daian Scuarissi | Software Engineer | Frontend Developer',
  description:
    'Software Engineer based in Madrid, Spain. Turning ideas into visually stunning and performant web applications using Angular or React.',
  keywords: [
    'personal website',
    'daian scuarissi',
    'angular',
    'react',
    'software engineer',
    'frontend development',
    'contact me',
  ],
  openGraph: {
    title: 'Daian Scuarissi - Software Engineer',
    siteName: 'Daian Scuarissi - Software Engineer',
  },
  alternates: {
    canonical: 'https://daian-scuarissi.vercel.app/',
  },
};

export default function Home() {
  return (
    <main className='mx-auto max-w-3xl px-4 sm:px-6 md:max-w-6xl'>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
