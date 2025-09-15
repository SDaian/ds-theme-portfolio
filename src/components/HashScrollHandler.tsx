'use client';
import { useEffect } from 'react';
import { scroller } from 'react-scroll';

export const HashScrollHandler = () => {
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.replace('#', '');

      if (hash) {
        // Small delay to ensure page is rendered
        setTimeout(() => {
          scroller.scrollTo(hash, {
            smooth: true,
            offset: -100,
            duration: 500,
          });
        }, 100);
      }
    };

    // Handle initial page load with hash
    handleHashScroll();

    // Handle hash changes
    window.addEventListener('hashchange', handleHashScroll);

    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);

  return null;
};
