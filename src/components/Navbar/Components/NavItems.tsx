import { SocialIcons } from '@/components/Shared/SocialIcons';
import { motion } from 'motion/react';
import { Link } from 'react-scroll';

import { NAV_ITEMS } from '../Data/NavItems';

type NavItemsProps = {
  navbar: boolean;
  setNavbar: (navbar: boolean) => void;
};

export const NavItems = ({ navbar, setNavbar }: NavItemsProps) => {
  // const { systemTheme, theme, setTheme } = useTheme();
  // const currentTheme = theme === 'system' ? systemTheme : theme;

  console.log('navbar', navbar);
  return (
    <div>
      <div
        className={`flex-1 justify-self-center pb-3 mt-0 md:block md:pb-0 md:mt-0 ${
          navbar ? 'block' : 'hidden'
        }`}
      >
        <motion.div
          initial={{ x: 500, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className='items-center justify-center space-y-6 md:flex md:space-x-6 md:space-y-0'
        >
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={i}
              to={item.page}
              smooth={true}
              offset={-100}
              duration={500}
              className='navbarButton'
              onClick={() => setNavbar(!navbar)}
            >
              {item.label}
            </Link>
          ))}
          <div className='md:hidden flex'>
            <SocialIcons className={'text-black'} />
          </div>
          {/* <ThemeSwitch
            currentTheme={currentTheme}
            systemTheme={systemTheme}
            theme={theme}
            setTheme={setTheme}
          /> */}
        </motion.div>
      </div>
    </div>
  );
};
