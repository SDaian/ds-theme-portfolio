import { SocialIcons } from '@/components/Shared/SocialIcons';

const Footer = () => {
  return (
    <footer className='mx-auto max-w-3xl px-4 sm:px-6 md:max-w-7xl'>
      <hr className='w-full h-0.5 mx-auto mt-8 bg-neutral-200 border-0'></hr>
      <div className='mx-auto p-4 flex flex-col text-center text-neutral-900 md:flex-row md:justify-between'>
        <div className='text-neutral-500 dark:text-neutral-100 text-lg'>
          © {new Date().getFullYear()} Daian Scuarissi
        </div>
        <SocialIcons />
      </div>
    </footer>
  );
};

export default Footer;
