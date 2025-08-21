'use client';
import Image from 'next/image';
import { Link } from 'react-scroll/modules';
import { Button } from '@/styles/components/ui/button';
import { ArrowRight, CircleArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section aria-label='home' id='home'>
      <div className='flex flex-col items-center justify-around mt-[85px] sm:py-32 py-16 lg:flex-row md:space-x-4 md:text-left md:py-52 md:min-h-[85vh]'>
        {/* <div className='md:w-1/2 md:mt-2'> */}
        <Image
          className='rounded-full shadow-2xl'
          src='/hero-image-2.jpg'
          alt='Daian Scuarissi image'
          width={300}
          height={300}
          priority
          style={{ width: 'auto', height: 'auto' }}
        />
        {/* </div> */}
        {/* <div className='md:mt-2 md:w-3/5'> */}
        <div>
          <h1 className='font-header font-extrabold tracking-tight text-5xl mt-6 md:text-8xl md:mt-0'>
            Hey, I&#39;m Daian<span className='text-brand'>.</span>
          </h1>
          <p className='sm:text-lg mt-4 mb-6 xl:text-2xl'>
            I&#39;m a{' '}
            <span className='font-semibold text-brand'>Software Engineer </span>
            based in Madrid, Spain.
            <br />
            Turning ideas into visually stunning and performant web
            applications.
          </p>
          <div className='flex justify-between md:justify-start gap-2'>
            <Link to='experience'>
              <Button
                size='lg'
                className='cursor-pointer flex-1 md:flex-initial bg-brand hover:bg-brand/80 px-8 py-6 text-lg'
              >
                View My Work
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>

            <Link to='contact'>
              <Button
                size='lg'
                variant='outline'
                className='cursor-pointer flex-1 md:flex-initial px-8 bg-transparent py-6 text-lg'
              >
                Get In Touch
              </Button>
            </Link>
            {/* <Link
              to='experience'
              className='text-neutral-100 font-semibold px-6 py-3 bg-brand rounded-sm shadow-sm hover:bg-teal-700 cursor-pointer'
              activeClass='active'
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              Experience
            </Link>
            <Link
              to='projects'
              className='text-neutral-100 font-semibold px-6 py-3 bg-brand rounded-sm shadow-sm hover:bg-teal-700 cursor-pointer'
              activeClass='active'
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              Projects
            </Link>
            <Link
              to='contact'
              className='text-neutral-100 font-semibold px-6 py-3 bg-brand rounded-sm shadow-sm hover:bg-teal-700 cursor-pointer'
              activeClass='active'
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              Contact Me
            </Link> */}
          </div>
        </div>
      </div>
      <div className='md:flex flex-row justify-center hidden'>
        <Link to='about' activeClass='active'>
          <CircleArrowDown size={35} className='animate-bounce' />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
