import { Metadata } from 'next';

import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import ExperienceSection from '@/components/Experience/Components/ExperienceSection';
import HeroSection from '@/components/HeroSection';

export const metadata: Metadata = {
  metadataBase: new URL('https://daian-scuarissi.vercel.app/'),
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
    description:
      'Software Engineer based in Madrid, Spain. Turning ideas into visually stunning and performant web applications using Angular or React.',
    url: '/',
    images: 'hero-image-2.jpg',
  },
  alternates: {
    canonical: '/',
  },
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Daian Scuarissi' }],
  creator: 'Daian Scuarissi',
  publisher: 'Daian Scuarissi',
};

export default function Home() {
  return (
    <main className='mx-auto md:max-w-[1400px] px-6 sm:px-6'>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
