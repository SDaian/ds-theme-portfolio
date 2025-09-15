'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { Download } from 'lucide-react';

import { NavItems } from './Components/NavItems';
import { Logo } from './Components/Logo';
import { ThemeSwitch } from './Components/ThemeSwitch';

import { Button } from '@/styles/components/ui/button';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <header className='fixed top-0 z-40 flex w-full flex-col items-center justify-between px-5 py-1 shadow-2xs backdrop-blur-md md:flex-row md:px-8 lg:px-20 dark:shadow-slate-500'>
      <div className='flex w-full grow basis-full sm:basis-0'>
        <Logo
          currentTheme={currentTheme}
          navbar={navbar}
          setNavbar={setNavbar}
          setTheme={setTheme}
          systemTheme={systemTheme}
          theme={theme}
        />
      </div>
      {/* <nav className='hidden xl:block sm:hidden'>
        <SocialIcons className={'text-black'} />
      </nav> */}

      <nav className='flex w-full grow basis-0 md:justify-center'>
        <NavItems navbar={navbar} setNavbar={setNavbar} />
      </nav>
      <motion.div
        animate={{ x: 0, opacity: 1, scale: 1 }}
        className='hidden w-full grow basis-0 items-center gap-2 md:flex md:justify-end'
        initial={{ x: 500, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.9 }}
      >
        <Button
          className='bg-brand hover:bg-brand-lighter px-8 py-4 text-white'
          variant='default'
          onClick={() => window.open('/resume-daian-scuarissi.pdf', '_blank')}
        >
          Download CV <Download className='ml-2 h-4 w-4' />
        </Button>
        <ThemeSwitch
          currentTheme={currentTheme}
          setTheme={setTheme}
          systemTheme={systemTheme}
          theme={theme}
        />
      </motion.div>
    </header>
  );
};

export default Navbar;
