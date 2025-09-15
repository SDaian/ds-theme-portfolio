'use client';
import { Briefcase, Link, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import { ResumeButton } from '../../ResumeButton';
import { EXPERIENCE_ITEMS } from '../Data/ExperienceItems';

import { Reveal } from '@/components/Utils/Reveal';

const ExperienceSection = () => {
  const array = EXPERIENCE_ITEMS;
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);

    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section aria-labelledby='experience-heading' className='scroll-mt-16' id='experience'>
      <div className='container mx-auto py-16 md:py-24'>
        <header className='mb-16 text-center'>
          <h2 className='mb-4 text-4xl font-bold md:text-5xl' id='experience-heading'>
            Experience
          </h2>
          <div className='bg-brand mx-auto h-1 w-16 rounded-full' />
        </header>

        <section className='overflow-hidden md:px-4 md:py-12'>
          <div className='timelineVertical relative container mx-auto max-w-5xl p-0'>
            {array.map(
              (
                { company, companyUrl, from, to, role, description, actual, client, keywords },
                i,
              ) => (
                <div key={i} className='timeline-item mb-8 md:even:flex-row-reverse'>
                  <Reveal index={i}>
                    <div className={`flex ${i % 2 ? 'md:flex-row-reverse' : ''}`}>
                      <div className='image bg-brand flex h-16 w-16 shrink-0 items-center justify-center rounded-full shadow-lg md:order-1'>
                        <Briefcase className='inline-block h-7 w-7 text-white' />
                      </div>
                      <div className='content ribbon relative grow rounded-xl bg-slate-200 p-4 md:w-2/5 md:grow-0'>
                        <div className='mb-2 flex flex-col justify-between gap-0.5 md:flex-row'>
                          <a
                            aria-label={`company URL: ${company}`}
                            href={companyUrl}
                            rel='noreferrer'
                            target='_blank'
                          >
                            <h3 className='flex cursor-pointer items-center gap-2 text-xl font-semibold text-blue-600 md:mb-0'>
                              {company}
                              <Link />
                            </h3>
                          </a>
                          <div className='mb-1 flex items-center justify-between md:mb-0'>
                            <span className='text-sm text-slate-500 md:text-base'>
                              {from} - {actual ? 'Present' : to}
                            </span>
                          </div>
                        </div>

                        <div className='flex items-center justify-between'>
                          <span className='dark:text-black'>
                            Role: <span className='font-bold'>{role}</span>{' '}
                            {client && <span>| Client: {client}</span>}
                          </span>
                          <button
                            aria-label={expandedItems.has(i) ? 'Hide details' : 'Show details'}
                            className='ml-2 rounded-md p-1 transition-colors duration-200 hover:bg-slate-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none'
                            onClick={() => toggleExpanded(i)}
                          >
                            {expandedItems.has(i) ? (
                              <ChevronUp className='h-5 w-5 text-slate-600' />
                            ) : (
                              <ChevronDown className='h-5 w-5 text-slate-600' />
                            )}
                          </button>
                        </div>

                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expandedItems.has(i)
                              ? 'mt-3 max-h-full opacity-100'
                              : 'max-h-0 opacity-0'
                          }`}
                        >
                          {description.map((item, idx) => (
                            <p key={idx} className='mt-2 dark:text-black'>
                              - {item}
                            </p>
                          ))}
                          {keywords && (
                            <div className='dark: mt-2 text-black'>
                              Keywords: <span>{keywords}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              ),
            )}
          </div>
          <div className='mt-[-3rem] items-center justify-center p-4 pt-0 pl-0 md:flex md:pl-4'>
            <div className='bg-brand flex h-16 w-16 items-center justify-center rounded-full shadow-lg'>
              <Zap className='inline-block h-7 w-7 text-white' />
            </div>
          </div>
        </section>
        <ResumeButton />
      </div>
    </section>
  );
};

export default ExperienceSection;
