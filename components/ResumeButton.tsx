import { HiArrowDownTray } from 'react-icons/hi2';

export const ResumeButton = () => {
  return (
    <section className='mt-12 flex items-center justify-center'>
      <a
        href='/Resume-Daian_Scuarissi.pdf'
        target='_blank'
        rel='noopener noreferrer'
      >
        <button
          type='button'
          data-te-ripple-init
          data-te-ripple-color='light'
          className='w-80 h-12 flex items-center justify-center rounded-xl bg-blue-500 px-6 pt-2.5 pb-2 text-lg font-semibold leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg'
        >
          <HiArrowDownTray className='mr-2 h-6 w-6' />
          Download Resume
        </button>
      </a>
    </section>
  );
};
