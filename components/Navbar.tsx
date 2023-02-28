'use client';
import React, { useState } from 'react';
import { Link } from 'react-scroll/modules';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import ThemeSwitch from './ThemeSwitch';

type NavItem = {
  label: string;
  page: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    page: 'home',
  },
  {
    label: 'About',
    page: 'about',
  },
  {
    label: 'Projects',
    page: 'projects',
  },
  {
    label: 'Contact',
    page: 'contact',
  },
];

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [navbar, setNavbar] = useState(false);

  return (
    <header className='w-full mx-auto px-4 sm:px-20 fixed top-0 z-50 shadow backdrop-blur-md'>
      <div className='md:max-w-[1200px] md:mx-auto'>
        <div className='justify-between md:items-center md:flex'>
          <div>
            <div className='flex items-center justify-between py-2 md:block'>
              <Link to='home'>
                <motion.div
                  initial={{ x: -500, opacity: 0, scale: 0.5 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9 }}
                  className='md:py-3 md:block'
                >
                  <h2 className='text-2xl font-bold'>Daian Scuarissi</h2>
                </motion.div>
              </Link>
              <div className='md:hidden'>
                <motion.button
                  initial={{ x: 500, opacity: 0, scale: 0.5 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9 }}
                  className='border-none p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border dark:text-white'
                  onClick={() => setNavbar(!navbar)}
                  aria-label='toggle menu'
                >
                  {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
                </motion.button>
              </div>
            </div>
          </div>
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
                  <Link key={i} to={item.page} className='navbarButton'>
                    {item.label}
                  </Link>
                ))}
                <ThemeSwitch
                  currentTheme={currentTheme}
                  systemTheme={systemTheme}
                  theme={theme}
                  setTheme={setTheme}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
