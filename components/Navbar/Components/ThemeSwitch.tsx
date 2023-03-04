import { useState, useEffect } from 'react';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

type ThemeSwitchProps = {
  setTheme: (theme: string) => void;
  currentTheme?: string;
  systemTheme?: string;
  theme?: string;
};

export const ThemeSwitch = ({ setTheme, currentTheme }: ThemeSwitchProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      {currentTheme === 'dark' ? (
        <button
          aria-label='Switch to light mode'
          onClick={() => setTheme('light')}
          className='bg-slate-100 p-2 rounded-xl'
        >
          {' '}
          <RiSunLine size={25} color='black' />
        </button>
      ) : (
        <button
          aria-label='Switch to dark mode'
          onClick={() => setTheme('dark')}
          className='bg-slate-100 p-2 rounded-xl'
        >
          {' '}
          <RiMoonFill size={25} />
        </button>
      )}
    </>
  );
};
