'use client';
import { useEffect, useRef } from 'react';
import { HiBriefcase, HiBolt, HiLink } from 'react-icons/hi2';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ResumeButton } from './ResumeButton';

const ExperienceSection = () => {
  const array = [1, 2];

  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
    console.log('Element is in view: ', isInView);
  }, [controls, isInView]);

  return (
    <section aria-label='experience' id='experience'>
      <div className='my-12 pb-12 md:pt-16 md:pb-40'>
        <h2 className='text-center font-bold text-4xl'>
          Experience
          <hr className='w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded'></hr>
        </h2>

        <section className='overflow-hidden md:px-4 md:py-12'>
          <div className='container max-w-5xl mx-auto p-0 relative timelineVertical'>
            {array.map((item, i) => (
              <motion.div
                ref={ref}
                animate={controls}
                initial='hidden'
                transition={{ duration: 0.6 }}
                variants={{
                  visible: { x: 0, opacity: 1, scale: 1 },
                  hidden: { x: i % 2 === 0 ? -50 : 50, opacity: 0, scale: 0.5 },
                }}
                key={i}
                className='timeline-item relative flex md:even:flex-row-reverse mb-8'
              >
                <div className='image flex items-center justify-center md:order-1 shrink-0 w-16 h-16 shadow-lg rounded-full bg-teal-500'>
                  <HiBriefcase className='inline-block text-white w-7 h-7' />
                </div>
                <div className='relative content bg-slate-200 p-4 grow md:grow-0 md:w-2/5 ribbon rounded-xl'>
                  <h3 className='text-blue-600 font-semibold cursor-pointer flex items-center gap-2 text-xl mb-2'>
                    Company <HiLink />
                  </h3>
                  <p className='dark:text-black'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Facere vero velit ea dolor cum adipisci quisquam, nam,
                    molestias molestiae enim amet dolorem nesciunt earum. Unde
                    mollitia ullam quis optio at!
                  </p>
                  <div className='flex justify-between items-center'>
                    <span className='date absolute w-full top-5 text-slate-500 text-sm md:text-base'>
                      Apr &#39;21 - Apr &#39;23
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className='hidden md:flex items-center justify-center p-4 mt-[-3rem]'>
            <div className='flex items-center justify-center w-16 h-16 shadow-lg rounded-full bg-teal-500'>
              <HiBolt className='inline-block text-white w-7 h-7' />
            </div>
          </div>
        </section>
        <ResumeButton />
      </div>
    </section>
  );
};

export default ExperienceSection;
