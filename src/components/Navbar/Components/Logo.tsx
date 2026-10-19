'use client';
import { Menu, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
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
  const smoothScroll = !useReducedMotion();

  const logoContent = (
    <motion.div
      animate={{ x: 0, opacity: 1, scale: 1 }}
      className='md:block md:py-3'
      initial={{ x: -500, opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.9 }}
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
          className='cursor-pointer'
          duration={500}
          href='#home'
          offset={-100}
          smooth={smoothScroll}
          to='home'
        >
          {logoContent}
        </Link>
      ) : (
        <NextLink className='cursor-pointer' href='/'>
          {logoContent}
        </NextLink>
      )}
      <div className='flex items-center gap-1 md:hidden'>
        <ThemeSwitch
          currentTheme={currentTheme}
          setTheme={setTheme}
          systemTheme={systemTheme}
          theme={theme}
        />
        <motion.button
          animate={{ x: 0, opacity: 1, scale: 1 }}
          // A fixed name plus aria-expanded tells screen readers whether the menu is open.
          aria-controls='primary-navigation'
          aria-expanded={navbar}
          aria-label='Menu'
          className='rounded-md border-none p-2 text-gray-700 dark:text-white'
          initial={{ x: 500, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.9 }}
          type='button'
          onClick={() => setNavbar(!navbar)}
        >
          {navbar ? <X size={30} /> : <Menu size={30} />}
        </motion.button>
      </div>
    </div>
  );
};
