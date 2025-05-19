'use client';
import { motion } from 'motion/react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { Link } from 'react-scroll';

type LogoProps = {
  navbar: boolean;
  setNavbar: (navbar: boolean) => void;
};

export const Logo = ({ navbar, setNavbar }: LogoProps) => {
  return (
    <div className='flex grow items-center justify-between py-2 md:block'>
      <Link
        to='home'
        className='cursor-pointer'
        smooth={true}
        offset={-100}
        duration={500}
      >
        <motion.div
          initial={{ x: -500, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className='md:py-3 md:block'
        >
          <h2 className='text-2xl font-bold'>
            <span className='md:hidden'>DS</span>
            <span className='hidden md:inline-block'>Daian Scuarissi</span>
            <span className='text-brand'>.</span>
          </h2>
        </motion.div>
      </Link>
      <div className='md:hidden'>
        <motion.button
          initial={{ x: 500, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className='border-none p-2 text-gray-700 rounded-md outline-hidden focus:border-gray-400 focus:border dark:text-white'
          onClick={() => setNavbar(!navbar)}
          aria-label='toggle menu'
        >
          {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
        </motion.button>
      </div>
    </div>
  );
};
