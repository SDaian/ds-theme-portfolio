import {
  AiOutlineGithub,
  AiOutlineTwitter,
  AiOutlineLinkedin,
} from 'react-icons/ai';

export const SocialIcons = () => {
  return (
    <div className='flex flex-row items-center justify-center space-x-2 mb-1'>
      <a
        href='https://github.com/SDaian'
        target='_blank'
        rel='noreferrer'
        aria-label='Github'
      >
        <AiOutlineGithub
          className='inline-block w-6 h-6 mx-2 text-neutral-500 hover:text-neutral-600 dark:text-neutral-100'
          size={30}
        />
      </a>
      <a
        href='https://twitter.com/SDaian'
        target='_blank'
        rel='noreferrer'
        aria-label='Twitter'
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
        aria-label='Linkedin'
      >
        <AiOutlineLinkedin
          className='inline-block w-6 h-6 mx-2 text-neutral-500 hover:text-neutral-600 dark:text-neutral-100'
          size={30}
        />
      </a>
    </div>
  );
};
