'use client';
import { useState } from 'react';

import { NavItems } from './Components/NavItems';
import { Logo } from './Components/Logo';
import { ThemeSwitch } from './Components/ThemeSwitch';
import { useTheme } from 'next-themes';
import { Button } from '@/styles/components/ui/button';
import { Download } from 'lucide-react';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <header className='py-1 px-5 md:px-8 lg:px-20 flex flex-col md:flex-row items-center fixed top-0 w-full justify-between z-40 shadow-2xs backdrop-blur-md dark:shadow-slate-500'>
      <div className='flex grow sm:basis-0 basis-full w-full'>
        <Logo
          navbar={navbar}
          setNavbar={setNavbar}
          currentTheme={currentTheme}
          systemTheme={systemTheme}
          theme={theme}
          setTheme={setTheme}
        />
      </div>
      {/* <nav className='hidden xl:block sm:hidden'>
        <SocialIcons className={'text-black'} />
      </nav> */}

      <nav className='flex grow md:justify-center basis-0 w-full'>
        <NavItems navbar={navbar} setNavbar={setNavbar} />
      </nav>
      <div
        className={`hidden grow basis-0 w-full md:flex md:justify-end gap-2 items-center`}
      >
        <Button
          variant='default'
          className='bg-brand hover:bg-brand-lighter text-white px-8 py-4'
          onClick={() => window.open('/resume-daian-scuarissi.pdf', '_blank')}
        >
          Download CV <Download className='ml-2 h-4 w-4' />
        </Button>
        <ThemeSwitch
          currentTheme={currentTheme}
          systemTheme={systemTheme}
          theme={theme}
          setTheme={setTheme}
        />
      </div>
    </header>
  );
};

export default Navbar;
