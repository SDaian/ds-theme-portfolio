import { pageMetadata } from '@/lib/site-metadata';
import { breadcrumbNode, jsonLdGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/JsonLd';

const TITLE = 'Frontend Interview Preparation';
const PATH = '/frontend-interview-preparation';

export const metadata = pageMetadata({
  title: TITLE,
  description:
    'Comprehensive frontend interview preparation guide covering JavaScript, React, Angular, and more.',
  path: PATH,
});

export default function FrontendInterviewPreparationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbNode({ name: TITLE, path: PATH }))} />
      {children}
    </>
  );
}
