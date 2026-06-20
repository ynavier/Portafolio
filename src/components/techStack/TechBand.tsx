interface Tech {
  name: string;
  color: string;
  icon: any;
}

export const TechBand = ({
  techs,
  direction = 'left',
  speed = 'slow',
}: {
  techs: Tech[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'medium' | 'fast';
}) => {
  const speedClass =
    speed === 'fast' ? 'animate-scroll-fast' : speed === 'medium' ? 'animate-scroll-medium' : 'animate-scroll-slow';
  const directionClass = direction === 'right' ? 'animate-scroll-reverse' : '';

  return (
    <div className="relative overflow-hidden py-2">
      {/* Edge fades */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, var(--bg), transparent)', zIndex: 10 }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, var(--bg), transparent)', zIndex: 10 }} />

      <div className={`flex items-center whitespace-nowrap ${speedClass} ${directionClass}`}>
        {[...techs, ...techs, ...techs].map((tech, index) => {
          const IconComponent = tech.icon;
          return (
            <div key={index} className="flex items-center">
              <div className="flex items-center space-x-2 px-5 py-2" style={{ cursor: 'default' }}>
                <IconComponent className={`w-4 h-4 ${tech.color}`} />
                <span style={{ color: 'var(--fg)', fontSize: '0.8rem', fontWeight: 500, whiteSpace: 'nowrap' }}>
                  {tech.name}
                </span>
              </div>
              <span style={{ color: 'var(--fg-subtle)', fontSize: '0.9rem', userSelect: 'none', flexShrink: 0 }}>|</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
