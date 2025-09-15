import { SocialIcons } from '@/components/Shared/SocialIcons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-transparent'>
      <div className='mx-auto max-w-3xl px-4 sm:px-6 md:max-w-7xl'>
        <div className='py-6'>
          {/* Simple Bottom Bar with Social Icons */}
          <div className='flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              © {currentYear} Daian Scuarissi. All rights reserved.
            </p>

            <div className='flex justify-center'>
              <SocialIcons />
            </div>

            <p className='text-xs text-gray-400 dark:text-gray-500'>
              Built with ❤️ using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
