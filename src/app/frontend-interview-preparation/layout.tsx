import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontend Interview Preparation | Daian Scuarissi',
  description:
    'Comprehensive frontend interview preparation guide covering JavaScript, React, Angular, and more.',
  openGraph: {
    title: 'Frontend Interview Preparation | Daian Scuarissi',
    description:
      'Comprehensive frontend interview preparation guide covering JavaScript, React, Angular, and more.',
    url: '/frontend-interview-preparation',
    siteName: 'Daian Scuarissi - Software Engineer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontend Interview Preparation | Daian Scuarissi',
    description:
      'Comprehensive frontend interview preparation guide covering JavaScript, React, Angular, and more.',
    creator: '@daianscuarissi',
  },
};

export default function FrontendInterviewPreparationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
