export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`../../../content/${slug}.mdx`);

  return (
    <article className='mt-[45px] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
      <div className='prose prose-lg dark:prose-invert max-w-none'>
        <Post />
      </div>
    </article>
  );
}

export function generateStaticParams() {
  return [{ slug: 'welcome' }];
}

export const dynamicParams = false;
