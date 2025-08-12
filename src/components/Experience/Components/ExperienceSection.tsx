'use client';
import { ResumeButton } from '../../ResumeButton';
import { EXPERIENCE_ITEMS } from '../Data/ExperienceItems';
import { Reveal } from '@/components/Utils/Reveal';
import { Briefcase, Link, Zap } from 'lucide-react';

const ExperienceSection = () => {
  const array = EXPERIENCE_ITEMS;

  return (
    <section
      aria-labelledby='experience-heading'
      id='experience'
      className='scroll-mt-16'
    >
      <div className='container mx-auto py-16 md:py-24'>
        <header className='text-center mb-16'>
          <h2
            id='experience-heading'
            className='text-4xl md:text-5xl font-bold mb-4'
          >
            Experience
          </h2>
          <div className='w-16 h-1 mx-auto bg-brand rounded-full' />
        </header>

        <section className='overflow-hidden md:px-4 md:py-12'>
          <div className='container max-w-5xl mx-auto p-0 relative timelineVertical'>
            {array.map(
              (
                {
                  company,
                  companyUrl,
                  from,
                  to,
                  role,
                  description,
                  actual,
                  client,
                  keywords,
                },
                i
              ) => (
                <div
                  className='timeline-item md:even:flex-row-reverse mb-8'
                  key={i}
                >
                  <Reveal index={i}>
                    <div
                      className={`flex ${i % 2 ? 'md:flex-row-reverse' : ''}`}
                    >
                      <div className='image flex items-center justify-center md:order-1 shrink-0 w-16 h-16 shadow-lg rounded-full bg-brand'>
                        <Briefcase className='inline-block text-white w-7 h-7' />
                      </div>
                      <div className='relative content bg-slate-200 p-4 grow md:grow-0 md:w-2/5 ribbon rounded-xl'>
                        <div className='flex justify-between flex-col gap-0.5 mb-2 md:flex-row'>
                          <a
                            href={companyUrl}
                            target='_blank'
                            rel='noreferrer'
                            aria-label={`company URL: ${company}`}
                          >
                            <h3 className='text-blue-600 font-semibold cursor-pointer flex items-center gap-2 text-xl md:mb-0'>
                              {company}
                              <Link />
                            </h3>
                          </a>
                          <div className='flex justify-between items-center mb-1 md:mb-0'>
                            <span className='text-slate-500 text-sm md:text-base'>
                              {from} - {actual ? 'Present' : to}
                            </span>
                          </div>
                        </div>

                        <span className='dark:text-black'>
                          Role: <span className='font-bold'>{role}</span>{' '}
                          {client && <span>| Client: {client}</span>}
                        </span>

                        {description.map((item, idx) => (
                          <p key={idx} className='dark:text-black mt-2'>
                            - {item}
                          </p>
                        ))}
                        {keywords && (
                          <div className='dark: text-black mt-2'>
                            Keywords: <span>{keywords}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                </div>
              )
            )}
          </div>
          <div className='md:flex items-center justify-center p-4 pl-0 pt-0 md:pl-4 mt-[-3rem]'>
            <div className='flex items-center justify-center w-16 h-16 shadow-lg rounded-full bg-brand'>
              <Zap className='inline-block text-white w-7 h-7' />
            </div>
          </div>
        </section>
        <ResumeButton />
      </div>
    </section>
  );
};

export default ExperienceSection;
