import { pageMetadata } from '@/lib/site-metadata';

export const metadata = pageMetadata({
  title: 'Frontend Interview Preparation',
  description:
    'Comprehensive frontend interview preparation guide covering JavaScript, React, Angular, and more.',
  path: '/frontend-interview-preparation',
});

export default function FrontendInterviewPreparationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
