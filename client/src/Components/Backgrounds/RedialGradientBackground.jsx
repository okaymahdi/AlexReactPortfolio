const GREEN_GLOW = [
  { color: 'rgba(141, 255, 105, 0.03)', stop: '25%' },
  { color: 'rgba(141, 255, 105, 0.06)', stop: '40%' },
  { color: 'rgba(141, 255, 105, 0.10)', stop: '55%' },
  { color: 'rgba(141, 255, 105, 0.14)', stop: '70%' },
  { color: 'rgba(141, 255, 105, 0.08)', stop: '85%' },
];

const variants = {
  hero: [
    {
      position: 'top-1 left-1 -translate-x-1/2 -translate-y-1/2',
      size: 'w-[1400px] h-[1400px]',
      colors: GREEN_GLOW,
      blur: '120px',
      opacity: 0.45,
      animation: 'animate-float-slow',
    },
    {
      position: 'top-1 left-1 -translate-x-1/2 -translate-y-1/2',
      size: 'w-[900px] h-[900px]',
      colors: GREEN_GLOW,
      blur: '60px',
      opacity: 0.6,
      animation: 'animate-float-reverse',
    },
    {
      position: 'top-1 left-1',
      size: 'w-[1400px] h-[1400px]',
      colors: GREEN_GLOW,
      blur: '0px',
      opacity: 0.5,
      animation: 'animate-float-slow',
    },
    {
      position: 'bottom-1 right-1',
      size: 'w-[1400px] h-[1400px]',
      colors: GREEN_GLOW,
      blur: '0px',
      opacity: 0.5,
      animation: 'animate-float-revers',
    },
  ],
  about: [
    {
      position: 'bottom-0 left-[75%]',
      size: 'w-[700px] h-[700px]',
      colors: GREEN_GLOW,
      blur: '90px',
      opacity: 0.5,
      animation: 'animate-float-slow',
    },
  ],
};

const generateGradient = (colors) => {
  const colorStops = colors
    .map(({ color, stop }) => `${color} ${stop}`)
    .join(', ');
  return `radial-gradient(circle at center, transparent 0%, transparent 30%, ${colorStops}, transparent 60%, transparent 100%)`;
};

const RadialGradientBackground = ({ variant = 'hero', gradients = [] }) => {
  const activeGradients =
    variant === 'custom' ? gradients : variants[variant] || variants.hero;

  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      {activeGradients.map((gradient, index) => (
        <div
          key={index}
          className={`absolute rounded-full ${gradient.position} ${gradient.size} ${
            gradient.animation || ''
          }`}
          style={{
            backgroundImage: generateGradient(gradient.colors),
            filter: gradient.blur ? `blur(${gradient.blur})` : undefined,
            opacity: gradient.opacity,
            mixBlendMode: 'screen',
          }}
        />
      ))}
    </div>
  );
};

export default RadialGradientBackground;
