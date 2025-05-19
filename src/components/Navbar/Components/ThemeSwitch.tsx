import { Button } from '@/styles/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
// import { RiMoonFill, RiSunLine } from 'react-icons/ri';

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
      className='w-9 h-9 rounded-full'
    >
      {currentTheme === 'dark' ? (
        <Sun className='h-5 w-5 text-slate-300 hover:text-emerald-500 transition-colors' />
      ) : (
        <Moon className='h-5 w-5 text-slate-700 hover:text-emerald-500 transition-colors' />
      )}
    </Button>
  );
};
