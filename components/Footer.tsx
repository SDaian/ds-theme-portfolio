import {
  AiOutlineGithub,
  AiOutlineTwitter,
  AiOutlineLinkedin,
} from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className='mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl'>
      <hr className='w-full h-0.5 mx-auto mt-8 bg-neutral-200 border-0'></hr>
      <div className='mx-auto p-4 flex flex-col text-center text-neutral-900 md:flex-row md:justify-between'>
        <div className='text-neutral-500 dark:text-neutral-100'>© {new Date().getFullYear()} Daian Scuarissi</div>
        <div className='flex flex-row items-center justify-center space-x-2 mb-1'>
          <a href='https://github.com/SDaian' target='_blank' rel='noreferrer'>
            <AiOutlineGithub
              className='inline-block w-6 h-6 mx-2 text-neutral-500 hover:text-neutral-600 dark:text-neutral-100'
              size={30}
            />
          </a>
          <a
            href='https://twitter.com/SDaian'
            target='_blank'
            rel='noreferrer'
          >
            <AiOutlineTwitter
              className='inline-block w-6 h-6 mx-2 text-neutral-500 hover:text-neutral-600 dark:text-neutral-100'
              size={30}
            />
          </a>
          <a
            href='https://www.linkedin.com/in/daian-scuarissi/'
            target='_blank'
            rel='noreferrer'
          >
            <AiOutlineLinkedin
              className='inline-block w-6 h-6 mx-2 text-neutral-500 hover:text-neutral-600 dark:text-neutral-100'
              size={30}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
