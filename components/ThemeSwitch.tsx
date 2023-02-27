'use client';
import { useState, useEffect } from 'react';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

type ThemeSwitchProps = {
  currentTheme?: string;
  setTheme: (theme: string) => void;
  systemTheme?: string;
  theme?: string;
};

const ThemeSwitch = ({ setTheme, currentTheme }: ThemeSwitchProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <>
      {currentTheme === 'dark' ? (
        <button
          onClick={() => setTheme('light')}
          className='bg-slate-100 p-2 rounded-xl'
        >
          {' '}
          <RiSunLine size={25} color='black' />
        </button>
      ) : (
        <button
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

export default ThemeSwitch;
