import { SocialIcons } from '@/components/Shared/SocialIcons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full bg-gray-50 dark:bg-transparent border-t border-gray-200 dark:border-gray-800'>
      <div className='mx-auto max-w-3xl px-4 sm:px-6 md:max-w-7xl'>
        <div className='py-6'>
          {/* Simple Bottom Bar with Social Icons */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left'>
            <p className='text-gray-500 dark:text-gray-400 text-sm'>
              © {currentYear} Daian Scuarissi. All rights reserved.
            </p>

            <div className='flex justify-center'>
              <SocialIcons />
            </div>

            <p className='text-gray-400 dark:text-gray-500 text-xs'>
              Built with ❤️ using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
