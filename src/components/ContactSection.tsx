'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Mail, MapPin, Phone } from 'lucide-react';

import { Button } from '@/styles/components/ui/button';

const EMAIL = 'scuarissid@gmail.com';
const PHONE = '+34 641 936 070';

// Same color as other links, so the address reads as something to click.
const contactLinkClass =
  'text-brand-text hover:text-brand-text-hover text-lg underline-offset-4 hover:underline';

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactSection = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const { name, email, subject, message } = formData;
    const mailtoUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi, my name is ${name} (${email}). ${message}`)}`;

    window.open(mailtoUrl, '_self');
  };

  return (
    <section aria-labelledby='contact-heading' className='scroll-mt-16' id='contact'>
      <div className='container mx-auto py-16 md:py-24'>
        <header className='mb-16 text-center'>
          <h2 className='mb-4 text-4xl font-bold md:text-5xl' id='contact-heading'>
            Let&#39;s stay in touch!
          </h2>
          <div className='bg-brand mx-auto h-1 w-16 rounded-full' />
        </header>
        <div className='flex flex-col space-y-5'>
          <div className='space-y-2'>
            <div className='flex items-center justify-center space-x-3'>
              <Phone className='contactIcon' />
              <a className={contactLinkClass} href={`tel:${PHONE.replace(/\s/g, '')}`}>
                {PHONE}
              </a>
            </div>

            <div className='flex items-center justify-center space-x-3'>
              <MapPin className='contactIcon' />
              <p className='text-lg'>Madrid, Spain</p>
            </div>

            <div className='flex items-center justify-center space-x-3'>
              <Mail className='contactIcon' />
              <a className={contactLinkClass} href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </div>
          </div>

          <form
            className='mx-auto flex w-full flex-col space-y-2 md:w-4/5'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='flex flex-col gap-2 md:flex-row md:gap-0 md:space-x-2'>
              <input
                {...register('name')}
                className='focus:ring-brand w-full rounded-lg border bg-white px-4 py-3 transition-colors focus:border-transparent dark:text-black'
                placeholder='Name'
                type='text'
              />
              <input
                {...register('email')}
                className='focus:ring-brand w-full rounded-lg border bg-white px-4 py-3 transition-colors focus:border-transparent dark:text-black'
                placeholder='Email'
                type='email'
              />
            </div>
            <input
              {...register('subject')}
              className='focus:ring-brand w-full rounded-lg border bg-white px-4 py-3 transition-colors focus:border-transparent dark:text-black'
              placeholder='Subject'
              type='text'
            />
            <textarea
              {...register('message')}
              className='focus:ring-brand w-full rounded-lg border bg-white px-4 py-3 transition-colors focus:border-transparent dark:text-black'
              placeholder='Message'
            />
            {/* The form doesn't send anything itself: it hands the message to the
                visitor's email app, so the label says exactly that. */}
            <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
              <p className='text-sm text-gray-600 dark:text-gray-400' id='contact-hint'>
                {`This opens your email app with your message ready to send. No email app? Write to ${EMAIL}.`}
              </p>
              <Button
                aria-describedby='contact-hint'
                className='bg-brand hover:bg-brand/80 text-brand-foreground w-full rounded-lg px-12 py-6 text-lg md:w-auto'
                type='submit'
              >
                Open in email app
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
