import { Button } from '@/styles/components/ui/button';
import { Download } from 'lucide-react';

export const ResumeButton = () => {
  return (
    <section className='mt-12 flex items-center justify-center'>
      <a
        href='/Resume-Daian_Scuarissi.pdf'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Button
          size='lg'
          className='flex-1 md:flex-initial bg-brand hover:bg-brand/80 px-12 py-6 text-lg'
        >
          Download CV <Download className='ml-2 h-6 w-6' />
        </Button>
      </a>
    </section>
  );
};
