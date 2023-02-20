'use client';
import React, { useState } from 'react';
import { Link } from 'react-scroll/modules';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
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
];

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <header className='w-full mx-auto px-4 sm:px-20 fixed top-0 z-50 shadow backdrop-blur-md'>
      <div className='justify-between md:items-center md:flex'>
        <div>
          <div className='flex items-center justify-between py-2 md:block'>
            <Link to='home'>
              <div className='md:py-3 md:block'>
                <h2 className='text-2xl font-bold'>Daian Scuarissi</h2>
              </div>
            </Link>
            <div className='md:hidden'>
              <button
                className='border-none p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border dark:text-white'
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-0 md:block md:pb-0 md:mt-0 ${
              navbar ? 'block' : 'hidden'
            }`}
          >
            <div className='items-center justify-center space-y-6 md:flex md:space-x-6 md:space-y-0'>
              {NAV_ITEMS.map((item, i) => (
                <Link key={i} to={item.page} className='navbarButton'>
                  {item.label}
                </Link>
              ))}
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
