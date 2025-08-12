'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/styles/components/ui/button';
import { Mail, MapPin, Phone } from 'lucide-react';

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
    window.location.href = `mailto:scuarissid@gmail.com?subject=${subject}&body=Hi, ny name is ${name} ${email}. ${message}`;
  };

  return (
    <section
      aria-labelledby='contact-heading'
      id='contact'
      className='scroll-mt-16'
    >
      <div className='container mx-auto py-16 md:py-24'>
        <header className='text-center mb-16'>
          <h2
            id='contact-heading'
            className='text-4xl md:text-5xl font-bold mb-4'
          >
            Let&#39;s stay in touch!
          </h2>
          <div className='w-16 h-1 mx-auto bg-brand rounded-full' />
        </header>
        <div className='flex flex-col space-y-5'>
          <div className='space-y-2'>
            <div className='flex items-center space-x-3 justify-center'>
              <Phone className='contactIcon' />
              <p className='text-lg'>{`+34 641 936 070`}</p>
            </div>

            <div className='flex items-center space-x-3 justify-center'>
              <MapPin className='contactIcon' />
              <p className='text-lg'>{`Madrid, Spain`}</p>
            </div>

            <div className='flex items-center space-x-3 justify-center'>
              <Mail className='contactIcon' />
              <p className='text-lg'>{`scuarissid@gmail.com`}</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col space-y-2 md:w-4/5 md:mx-auto'
          >
            <div className='flex gap-2 md:gap-0 flex-col md:flex-row md:space-x-2'>
              <input
                {...register('name')}
                className='w-full dark:text-black px-4 py-3 rounded-lg border bg-white focus:ring-brand focus:border-transparent transition-colors'
                placeholder='Name'
                type='text'
              />
              <input
                {...register('email')}
                className='w-full dark:text-black  px-4 py-3 rounded-lg border bg-white focus:ring-brand focus:border-transparent transition-colors'
                placeholder='Email'
                type='email'
              />
            </div>
            <input
              {...register('subject')}
              className='w-full dark:text-black px-4 py-3 rounded-lg border bg-white focus:ring-brand focus:border-transparent transition-colors'
              placeholder='Subject'
              type='text'
            />
            <textarea
              {...register('message')}
              className='w-full dark:text-black px-4 py-3 rounded-lg border bg-white focus:ring-brand focus:border-transparent transition-colors'
              placeholder='Message'
            />
            <div className='flex justify-end'>
              <Button
                aria-label='contact me'
                type='submit'
                className='bg-brand hover:bg-brand/80 px-12 py-6 rounded-lg text-white text-lg'
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
