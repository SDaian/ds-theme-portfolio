'use client';

import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds: string[], options?: {
  threshold?: number;
  rootMargin?: string;
}) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as Element[];

    if (elements.length === 0) return;

    const observerOptions: IntersectionObserverInit = {
      threshold: options?.threshold || 0.1,
      rootMargin: options?.rootMargin || '-100px 0px -200px 0px',
    };

    // Track which sections are currently visible
    const visibleSections = new Set<string>();

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        
        if (entry.isIntersecting) {
          visibleSections.add(sectionId);
        } else {
          visibleSections.delete(sectionId);
        }
      });

      // Determine the active section based on scroll position
      if (visibleSections.size > 0) {
        // If multiple sections are visible, find the one with the most visible area
        let mostVisibleSection = '';
        let maxVisibleArea = 0;
        
        for (const sectionId of visibleSections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Calculate visible area
            const visibleBottom = Math.max(0, Math.min(viewportHeight, rect.bottom));
            const visibleHeight = Math.max(0, visibleBottom - Math.max(0, rect.top));
            
            if (visibleHeight > maxVisibleArea) {
              maxVisibleArea = visibleHeight;
              mostVisibleSection = sectionId;
            }
          }
        }
        
        if (mostVisibleSection && mostVisibleSection !== activeSection) {
          setActiveSection(mostVisibleSection);
        }
      } else {
        // If no sections are visible, determine based on scroll position
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // If we're at the very top, show home as active
        if (scrollY < 100) {
          setActiveSection('home');
        } else if (scrollY + windowHeight >= document.documentElement.scrollHeight - 100) {
          // If we're at the bottom, show contact as active
          setActiveSection('contact');
        }
      }
    };

    // Create observers for each section
    elements.forEach((element) => {
      const observer = new IntersectionObserver(observerCallback, observerOptions);
      observer.observe(element);
      observers.push(observer);
    });

    // Set initial active section
    if (window.scrollY < 100) {
      setActiveSection('home');
    }

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sectionIds, options?.threshold, options?.rootMargin, activeSection]);

  return activeSection;
};