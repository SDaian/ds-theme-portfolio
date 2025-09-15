import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/styles/components/ui/button';

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
    <Button
      aria-label='Toggle theme'
      className='h-9 w-9 transform rounded-full bg-gray-100 p-2 transition-all duration-300 hover:scale-110 hover:bg-blue-100 md:h-9 md:w-9 md:rounded-full md:bg-transparent md:p-2 md:hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-blue-900 md:dark:hover:bg-gray-800'
      size='icon'
      variant='ghost'
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
    >
      {currentTheme === 'dark' ? (
        <Sun className='h-5 w-5 text-gray-600 transition-colors duration-300 group-hover:text-blue-600 md:text-slate-300 md:hover:text-emerald-500 dark:text-gray-300 dark:group-hover:text-blue-400' />
      ) : (
        <Moon className='h-5 w-5 text-gray-600 transition-colors duration-300 group-hover:text-blue-600 md:text-slate-700 md:hover:text-emerald-500 dark:text-gray-300 dark:group-hover:text-blue-400' />
      )}
    </Button>
  );
};
