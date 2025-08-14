import { SocialIcons } from '@/components/Shared/SocialIcons';
import { motion } from 'motion/react';
import { Link } from 'react-scroll';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '../Data/NavItems';

type NavItemsProps = {
  navbar: boolean;
  setNavbar: (navbar: boolean) => void;
};

export const NavItems = ({ navbar, setNavbar }: NavItemsProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

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
          {NAV_ITEMS.map((item, i) => {
            if (isHomePage) {
              // On home page, use react-scroll for smooth scrolling
              return (
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
              );
            } else {
              // On other pages, use Next.js Link to navigate to home with hash
              return (
                <NextLink
                  key={i}
                  href={`/#${item.page}`}
                  className='navbarButton'
                  onClick={() => setNavbar(!navbar)}
                >
                  {item.label}
                </NextLink>
              );
            }
          })}
          <div className='md:hidden flex'>
            <SocialIcons className={'text-black'} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
