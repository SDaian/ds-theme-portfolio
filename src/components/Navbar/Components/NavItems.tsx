import { motion } from 'motion/react';
import { Link } from 'react-scroll';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '../Data/NavItems';

import { SocialIcons } from '@/components/Shared/SocialIcons';
import { useScrollSpy } from '@/hooks/useScrollSpy';

type NavItemsProps = {
  navbar: boolean;
  setNavbar: (navbar: boolean) => void;
};

export const NavItems = ({ navbar, setNavbar }: NavItemsProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Get section IDs for home page navigation
  const sectionIds = NAV_ITEMS.filter((item) => !item.isExternal).map((item) => item.page);

  const activeSection = useScrollSpy(sectionIds);

  return (
    <div>
      <div
        className={`mt-0 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
          navbar ? 'block' : 'hidden'
        } md:block`}
      >
        <motion.div
          animate={{ y: 0, opacity: 1, scale: 1 }}
          className='items-center justify-center space-y-6 md:flex md:space-y-0 md:space-x-6'
          initial={{ y: -500, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.9 }}
        >
          {NAV_ITEMS.map((item, i) => {
            // Handle external links (like /blog)
            if (item.isExternal) {
              const isActive = pathname === item.page || pathname.startsWith(item.page + '/');

              return (
                <NextLink
                  key={i}
                  className={`navbarButton ${isActive ? 'navbarButton--active' : ''}`}
                  href={item.page}
                  onClick={() => setNavbar(!navbar)}
                >
                  {item.label}
                </NextLink>
              );
            }

            if (isHomePage) {
              // On home page, use react-scroll for smooth scrolling
              const isActive = activeSection === item.page;

              return (
                <Link
                  key={i}
                  smooth
                  className={`navbarButton ${isActive ? 'navbarButton--active' : ''}`}
                  duration={500}
                  offset={-100}
                  to={item.page}
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
                  className='navbarButton'
                  href={`/#${item.page}`}
                  onClick={() => setNavbar(!navbar)}
                >
                  {item.label}
                </NextLink>
              );
            }
          })}
          <div className='flex md:hidden'>
            <SocialIcons className='text-black' />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
