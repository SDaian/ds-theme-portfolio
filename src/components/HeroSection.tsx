'use client';
import Image from 'next/image';
import { Link } from 'react-scroll/modules';
import { ArrowRight, CircleArrowDown } from 'lucide-react';

import { Button } from '@/styles/components/ui/button';

const HeroSection = () => {
  return (
    <section aria-label='home' id='home'>
      <div className='mt-[85px] flex flex-col items-center justify-around py-16 sm:py-32 md:min-h-[85vh] md:space-x-4 md:py-52 md:text-left lg:flex-row'>
        {/* <div className='md:w-1/2 md:mt-2'> */}
        {/* Fixed box so the page doesn't shift when it loads; it's also the LCP element. */}
        <Image
          preload
          alt='Daian Scuarissi image'
          className='h-80 w-80 rounded-full object-cover shadow-2xl'
          height={320}
          src='/hero-image-2.jpg'
          width={320}
        />
        {/* </div> */}
        {/* <div className='md:mt-2 md:w-3/5'> */}
        <div>
          <h1 className='font-header mt-6 text-5xl font-extrabold tracking-tight md:mt-0 md:text-8xl'>
            Hey, I&#39;m Daian<span className='text-brand'>.</span>
          </h1>
          <p className='mt-4 mb-6 sm:text-lg xl:text-2xl'>
            I&#39;m a <span className='text-brand font-semibold'>Software Engineer </span>
            based in Madrid, Spain.
            <br />
            Turning ideas into visually stunning and performant web applications.
          </p>
          <div className='flex justify-between gap-2 md:justify-start'>
            {/* asChild renders the button styles onto the link itself: one real,
                crawlable <a>, not a <button> nested inside an href-less <a>. */}
            <Button
              asChild
              className='bg-brand hover:bg-brand/80 flex-1 cursor-pointer px-8 py-6 text-lg md:flex-initial'
              size='lg'
            >
              <Link href='#experience' to='experience'>
                View My Work
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>

            <Button
              asChild
              className='flex-1 cursor-pointer bg-transparent px-8 py-6 text-lg md:flex-initial'
              size='lg'
              variant='outline'
            >
              <Link href='#contact' to='contact'>
                Get In Touch
              </Link>
            </Button>
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
      <div className='hidden flex-row justify-center md:flex'>
        <Link activeClass='active' aria-label='Scroll to About' href='#about' to='about'>
          <CircleArrowDown aria-hidden='true' className='animate-bounce' size={35} />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
