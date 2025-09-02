'use client';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-scroll';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeSwitch } from './ThemeSwitch';

type LogoProps = {
  navbar: boolean;
  setNavbar: (navbar: boolean) => void;
  currentTheme?: string;
  systemTheme?: string;
  theme?: string;
  setTheme: (theme: string) => void;
};

export const Logo = ({
  navbar,
  setNavbar,
  currentTheme,
  systemTheme,
  theme,
  setTheme,
}: LogoProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const logoContent = (
    <motion.div
      initial={{ x: -500, opacity: 0, scale: 0.5 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.9 }}
      className='md:py-3 md:block'
    >
      <h2 className='text-2xl font-bold'>
        <span className='lg:hidden'>DS</span>
        <span className='hidden lg:inline-block'>Daian Scuarissi</span>
        <span className='text-brand'>.</span>
      </h2>
    </motion.div>
  );

  return (
    <div className='flex grow items-center justify-between py-2 md:block'>
      {isHomePage ? (
        <Link
          to='home'
          className='cursor-pointer'
          smooth={true}
          offset={-100}
          duration={500}
        >
          {logoContent}
        </Link>
      ) : (
        <NextLink href='/' className='cursor-pointer'>
          {logoContent}
        </NextLink>
      )}
      <div className='md:hidden flex items-center gap-1'>
        <ThemeSwitch
          currentTheme={currentTheme}
          systemTheme={systemTheme}
          theme={theme}
          setTheme={setTheme}
        />
        <motion.button
          initial={{ x: 500, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className='border-none p-2 text-gray-700 rounded-md outline-hidden focus:border-gray-400 focus:border dark:text-white'
          onClick={() => setNavbar(!navbar)}
          aria-label='toggle menu'
        >
          {navbar ? <X size={30} /> : <Menu size={30} />}
        </motion.button>
      </div>
    </div>
  );
};
