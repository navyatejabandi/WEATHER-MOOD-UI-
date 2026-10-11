import React from 'react';
import { UIStyleMode } from '../../types';

interface FlutterCardProps {
  uiStyle: UIStyleMode;
  variant?: 'elevated' | 'filled' | 'outlined';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const FlutterCard: React.FC<FlutterCardProps> = ({
  uiStyle,
  variant = 'filled',
  className = '',
  children,
  onClick,
}) => {
  const isM3 = uiStyle === 'material3';

  // Cupertino Card
  if (!isM3) {
    return (
      <div
        onClick={onClick}
        className={`rounded-2xl bg-slate-900/70 backdrop-blur-md border border-white/10 p-4 transition-all ${
          onClick ? 'cursor-pointer active:scale-[0.98] hover:bg-slate-900/90' : ''
        } ${className}`}
      >
        {children}
      </div>
    );
  }

  // Material 3 Card Variants
  let variantStyles = 'bg-slate-900/90 border border-slate-800 shadow-sm';
  if (variant === 'elevated') {
    variantStyles = 'bg-slate-900/95 border border-slate-700/60 shadow-lg shadow-black/40';
  } else if (variant === 'outlined') {
    variantStyles = 'bg-slate-950/60 border border-slate-700/80';
  }

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl p-4 transition-all duration-200 ${variantStyles} ${
        onClick
          ? 'cursor-pointer active:scale-[0.98] hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
