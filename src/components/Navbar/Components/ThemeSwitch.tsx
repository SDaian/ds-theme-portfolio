import { Button } from '@/styles/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

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
      variant='ghost'
      size='icon'
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      aria-label='Toggle theme'
      className='w-9 h-9 rounded-full md:w-9 md:h-9 md:rounded-full md:p-2 md:bg-transparent md:hover:bg-gray-100 md:dark:hover:bg-gray-800 p-2 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-300 transform hover:scale-110'
    >
      {currentTheme === 'dark' ? (
        <Sun className='h-5 w-5 md:text-slate-300 md:hover:text-emerald-500 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300' />
      ) : (
        <Moon className='h-5 w-5 md:text-slate-700 md:hover:text-emerald-500 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300' />
      )}
    </Button>
  );
};
