import React from 'react';
import { MoodType } from '../../types';

interface MoodAvatarProps {
  mood: MoodType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const MoodAvatar: React.FC<MoodAvatarProps> = ({
  mood,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-7 h-7 text-sm',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl',
    xl: 'w-20 h-20 text-4xl',
  };

  const containerClass = `relative rounded-full flex items-center justify-center shadow-sm select-none shrink-0 ${sizeMap[size]} ${className}`;

  switch (mood) {
    case 'happy':
      return (
        <div className={`${containerClass} bg-gradient-to-br from-amber-200 to-amber-400 text-amber-900 ring-2 ring-amber-300/40`}>
          <svg viewBox="0 0 40 40" className="w-4/5 h-4/5">
            {/* Happy smiling eyes */}
            <path d="M 11 17 Q 15 12 19 17" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 21 17 Q 25 12 29 17" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Rosy cheeks */}
            <circle cx="11" cy="22" r="2.5" fill="#F43F5E" opacity="0.4" />
            <circle cx="29" cy="22" r="2.5" fill="#F43F5E" opacity="0.4" />
            {/* Big happy smile */}
            <path d="M 13 22 Q 20 31 27 22" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    case 'calm':
      return (
        <div className={`${containerClass} bg-gradient-to-br from-emerald-200 to-emerald-400 text-emerald-900 ring-2 ring-emerald-300/40`}>
          <svg viewBox="0 0 40 40" className="w-4/5 h-4/5">
            {/* Relaxed closed peaceful eyes */}
            <path d="M 11 18 Q 15 22 19 18" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 21 18 Q 25 22 29 18" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Soft cheeks */}
            <circle cx="11" cy="23" r="2" fill="#10B981" opacity="0.4" />
            <circle cx="29" cy="23" r="2" fill="#10B981" opacity="0.4" />
            {/* Peaceful calm gentle smile */}
            <path d="M 15 25 Q 20 29 25 25" stroke="#064E3B" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    case 'okay':
      return (
        <div className={`${containerClass} bg-gradient-to-br from-orange-200 to-orange-400 text-orange-900 ring-2 ring-orange-300/40`}>
          <svg viewBox="0 0 40 40" className="w-4/5 h-4/5">
            {/* Neutral round eyes */}
            <circle cx="14" cy="17" r="2.5" fill="#7C2D12" />
            <circle cx="26" cy="17" r="2.5" fill="#7C2D12" />
            {/* Straight neutral line mouth */}
            <line x1="14" y1="26" x2="26" y2="26" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'sad':
      return (
        <div className={`${containerClass} bg-gradient-to-br from-blue-200 to-blue-400 text-blue-900 ring-2 ring-blue-300/40`}>
          <svg viewBox="0 0 40 40" className="w-4/5 h-4/5">
            {/* Drooping sad eyes */}
            <circle cx="14" cy="18" r="2.5" fill="#1E3A8A" />
            <circle cx="26" cy="18" r="2.5" fill="#1E3A8A" />
            {/* Teardrop */}
            <circle cx="28" cy="23" r="1.5" fill="#38BDF8" />
            {/* Downturned sad frown */}
            <path d="M 14 28 Q 20 21 26 28" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    case 'irritated':
      return (
        <div className={`${containerClass} bg-gradient-to-br from-rose-200 to-rose-400 text-rose-900 ring-2 ring-rose-300/40`}>
          <svg viewBox="0 0 40 40" className="w-4/5 h-4/5">
            {/* Angry slanting eyebrows */}
            <line x1="11" y1="13" x2="18" y2="17" stroke="#881337" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="29" y1="13" x2="22" y2="17" stroke="#881337" strokeWidth="2.5" strokeLinecap="round" />
            {/* Annoyed eyes */}
            <circle cx="15" cy="19" r="2" fill="#881337" />
            <circle cx="25" cy="19" r="2" fill="#881337" />
            {/* Angry downturned frown */}
            <path d="M 13 28 Q 20 22 27 28" stroke="#881337" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    default:
      return (
        <div className={`${containerClass} bg-amber-200 text-amber-900`}>
          <span>😊</span>
        </div>
      );
  }
};
