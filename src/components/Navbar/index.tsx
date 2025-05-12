'use client';
import { useState } from 'react';

import { NavItems } from './Components/NavItems';
import { Logo } from './Components/Logo';
import { SocialIcons } from '../Shared/SocialIcons';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    // <header className='w-full mx-auto px-4 sm:px-20 fixed top-0 z-50 shadow-sm backdrop-blur-md dark:shadow-slate-500'>
    //   <div className='md:max-w-[1200px] md:mx-auto'>
    //     <div className='relative justify-between md:items-center md:flex'>
    //       <Logo navbar={navbar} setNavbar={setNavbar} />
    //       <div className='hidden lg:block absolute left-[43%]'>
    //         <SocialIcons className={'text-black'} />
    //       </div>
    //       <NavItems navbar={navbar} />
    //     </div>
    //   </div>
    // </header>
    <header className='py-1 px-5 sm:px-20 flex flex-col md:flex-row items-center fixed top-0 w-full justify-between z-40 shadow-sm backdrop-blur-md dark:shadow-slate-500'>
      <div className='flex grow sm:basis-0 basis-full w-full'>
        <Logo navbar={navbar} setNavbar={setNavbar} />
      </div>
      <nav className='hidden xl:block sm:hidden'>
        <SocialIcons className={'text-black'} />
      </nav>
      <nav className='flex grow md:justify-end basis-0 w-full'>
        <NavItems navbar={navbar} setNavbar={setNavbar} />
      </nav>
    </header>
  );
};

export default Navbar;
