import { Download } from 'lucide-react';

import { Button } from '@/styles/components/ui/button';

export const ResumeButton = () => {
  return (
    <section className='mt-12 flex items-center justify-center'>
      <a href='/Resume-Daian_Scuarissi.pdf' rel='noopener noreferrer' target='_blank'>
        <Button
          className='bg-brand hover:bg-brand/80 flex-1 px-12 py-6 text-lg md:flex-initial'
          size='lg'
        >
          Download CV <Download className='ml-2 h-6 w-6' />
        </Button>
      </a>
    </section>
  );
};
