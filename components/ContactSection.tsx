'use client';
import {
  HiOutlinePhone as PhoneIcon,
  HiOutlineMapPin as MapPinIcon,
  HiOutlineEnvelope as EnvelopeIcon,
} from 'react-icons/hi2';
import { useForm, SubmitHandler } from 'react-hook-form';

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
    window.location.href = `mailto:scuarissid@gmail.com?subject=${subject}&body=${message}`;
  };

  return (
    <section aria-label='contact' id='contact'>
      <div className='my-12 pb-12 md:pt-16 md:pb-40'>
        <h2 className='text-center font-bold text-4xl'>
          Let&#39;s stay in touch!{' '}
          <hr className='w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded'></hr>
        </h2>
        <div className='flex flex-col space-y-5'>
          <div className='space-y-2'>
            <div className='flex items-center space-x-3 justify-center'>
              <PhoneIcon className='contactIcon' />
              <p className='text-base'>{`+34 661 984 272`}</p>
            </div>

            <div className='flex items-center space-x-3 justify-center'>
              <MapPinIcon className='contactIcon' />
              <p className='text-base'>{`Madrid, Spain`}</p>
            </div>

            <div className='flex items-center space-x-3 justify-center'>
              <EnvelopeIcon className='contactIcon' />
              <p className='text-base'>{`scuarissid@gmail.com`}</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col space-y-2 md:w-fit md:mx-auto'
          >
            <div className='flex gap-2 md:gap-0 flex-col md:flex-row md:space-x-2'>
              <input
                {...register('name')}
                className='contactInput'
                placeholder='Name'
                type='text'
              />
              <input
                {...register('email')}
                className='contactInput'
                placeholder='Email'
                type='email'
              />
            </div>
            <input
              {...register('subject')}
              className='contactInput'
              placeholder='Subject'
              type='text'
            />
            <textarea
              {...register('message')}
              className='contactInput'
              placeholder='Message'
            />
            <button
              aria-label='contact me'
              type='submit'
              className='contactButton'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
