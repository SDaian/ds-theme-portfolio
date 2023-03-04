import { motion } from 'framer-motion';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { Link } from 'react-scroll';

type LogoProps = {
  navbar: boolean;
  setNavbar: (navbar: boolean) => void;
};

export const Logo = ({ navbar, setNavbar }: LogoProps) => {
  return (
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
  );
};
