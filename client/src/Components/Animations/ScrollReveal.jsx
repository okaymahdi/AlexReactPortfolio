import { useScrollReveal } from '../../Hooks/UseScrollReveal';

const ScrollReveal = ({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 700,
}) => {
  const { isVisible } = useScrollReveal({ threshold: 0.1 });
  const animationClass = {
    fadeUp: 'opacity-0 translate-y-8',
    fadeIn: 'opacity-0',
    sideLeft: 'opacity-0 translate-x-12',
    scaleIn: 'opacity-0 scale-90',
  };
  const visibleClass = 'opacity-100 translate-y-0 translate-x-0 scale-100';
  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${isVisible ? visibleClass : animationClass}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
