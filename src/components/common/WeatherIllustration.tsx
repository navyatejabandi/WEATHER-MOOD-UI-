import React from 'react';

interface WeatherIllustrationProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const WeatherIllustration: React.FC<WeatherIllustrationProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-8',
    md: 'w-24 h-20',
    lg: 'w-28 h-24',
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeClasses} ${className}`}>
      <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-sm">
        {/* Radiating sun circle */}
        <circle cx="58" cy="32" r="26" fill="#FDE047" opacity="0.3" />
        <circle cx="58" cy="32" r="22" fill="#FBBF24" />
        {/* Sun rays */}
        <g stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round">
          <line x1="58" y1="4" x2="58" y2="8" />
          <line x1="82" y1="12" x2="78" y2="16" />
          <line x1="88" y1="32" x2="84" y2="32" />
          <line x1="34" y1="12" x2="38" y2="16" />
        </g>
        {/* Fluffy white cloud with soft sky border */}
        <path
          d="M 16 62 A 14 14 0 0 1 26 40 A 18 18 0 0 1 54 36 A 16 16 0 0 1 74 52 A 12 12 0 0 1 72 65 L 18 65 Z"
          fill="#FFFFFF"
          stroke="#E0F2FE"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};
