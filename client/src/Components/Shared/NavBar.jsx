import { Code, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { scrollToSection, useScrollSpy } from '../../Hooks/UseScrollSpy';
import { NAV_LINKS, PERSONAL_INFO } from '../../Utils/Constants';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy(NAV_LINKS.map((link) => link.path));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full py-4 transition-all duration-300 ${
        isScrolled ? 'bg-black/30 backdrop-blur-lg' : 'bg-transparent'
      }`}
      style={{ transform: 'translate3d(0, 0, 0)' }}
    >
      <div className='max-w-[1320px] w-full mx-auto px-5 flex items-center'>
        {/* Logo */}
        <div className='flex items-center gap-4'>
          <Code className='w-6 h-6 text-primary' />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='text-2xl font-bold bg-linear-to-r from-primary via-primary/50 to-primary/30 text-transparent bg-clip-text hover:opacity-80 transition-opacity'
            aria-label='home'
          >
            {PERSONAL_INFO.name.split(' ')[0]}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-7 mx-auto'>
          {NAV_LINKS.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavClick(link.path)}
              className={`text-base font-medium transition-all duration-300 ${
                activeSection === link.path
                  ? 'text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA Button (Desktop) */}
        <div className='hidden md:flex items-center gap-2'>
          <button
            onClick={() => handleNavClick('#contact')}
            className='px-7 py-3.5 bg-white text-[#212121] font-medium text-base rounded-[17px] border border-white hover:bg-white/90 transition-all duration-300'
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden ml-auto'>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='p-4 text-white hover:text-white/80 transition-colors duration-300'
            aria-label='menu'
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className='bg-black/95 backdrop-blur-lg border-t border-white/10 px-5 py-6 space-y-6'>
          {NAV_LINKS.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavClick(link.path)}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeSection === link.path
                  ? 'text-white bg-white/10'
                  : 'text-white/70 hover:text-white hover:bg-white/50'
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* CTA Button (Mobile) */}
          <button
            onClick={() => handleNavClick('contact')}
            className='w-full px-4 py-3 rounded-lg font-medium bg-white text-base text-[#212121] border border-white hover:bg-white/90  transition-all duration-300'
          >
            Hire Me
          </button>
        </nav>
      </div>
    </nav>
  );
};

export default NavBar;
