import { NavItem } from '../Models/NavItem';

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    page: 'home',
  },
  {
    label: 'About',
    page: 'about',
  },
  {
    label: 'Experience',
    page: 'experience',
  },
  {
    label: 'Projects',
    page: 'projects',
  },
  {
    label: 'Blog',
    page: '/blog',
    isExternal: true,
  },
  {
    label: 'Contact',
    page: 'contact',
  },
];
