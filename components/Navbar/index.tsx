'use client';
import { useState } from 'react';

import { NavItems } from './Components/NavItems';
import { Logo } from './Components/Logo';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <header className='w-full mx-auto px-4 sm:px-20 fixed top-0 z-50 shadow backdrop-blur-md dark:shadow-slate-500'>
      <div className='md:max-w-[1200px] md:mx-auto'>
        <div className='justify-between md:items-center md:flex'>
          <Logo navbar={navbar} setNavbar={setNavbar} />
          <NavItems navbar={navbar} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
