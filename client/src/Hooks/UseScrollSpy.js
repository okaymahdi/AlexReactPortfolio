import { useEffect, useState } from 'react';

const useScrollSpy = (sectionIds, offset = 100) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      /** Find The Current Active Section */
      for (let item = sectionIds.length - 1; item >= 0; item--) {
        const section = document.getElementById(sectionIds[item]);
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (
            scrollPosition >= sectionTop &&
            scrollPosition <= sectionTop + sectionHeight
          ) {
            setActiveSection(sectionIds[item]);
          }
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset]);
  return activeSection;
};

/** Smooth Scroll */
const scrollToSection = (sectionId, offset = 80) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const top = section.offsetTop - offset;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }
};

export { scrollToSection, useScrollSpy };
