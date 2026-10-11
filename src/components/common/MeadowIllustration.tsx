import React from 'react';

export const MeadowIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden pointer-events-none select-none relative ${className}`}>
      <svg
        viewBox="0 0 400 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto object-cover opacity-85"
        preserveAspectRatio="none"
      >
        {/* Soft rolling green hill 1 */}
        <path
          d="M0 60 Q 120 30, 240 55 T 400 45 L 400 90 L 0 90 Z"
          fill="#BBF7D0"
          fillOpacity="0.45"
        />
        {/* Rolling hill 2 */}
        <path
          d="M0 70 Q 160 45, 300 65 T 400 60 L 400 90 L 0 90 Z"
          fill="#86EFAC"
          fillOpacity="0.55"
        />

        {/* Wildflowers and leaves */}
        {/* Flower 1 (Pink) */}
        <circle cx="35" cy="55" r="5" fill="#F472B6" />
        <circle cx="35" cy="55" r="2.5" fill="#FEF08A" />
        <path d="M35 60 Q 36 75, 34 85" stroke="#4ADE80" strokeWidth="1.5" />
        <path d="M35 70 Q 42 66, 40 73" stroke="#4ADE80" strokeWidth="1.2" fill="#86EFAC" />

        {/* Flower 2 (Yellow) */}
        <circle cx="70" cy="50" r="4.5" fill="#FBBF24" />
        <circle cx="70" cy="50" r="2" fill="#FFFFFF" />
        <path d="M70 54 Q 69 70, 71 85" stroke="#4ADE80" strokeWidth="1.5" />

        {/* Flower 3 (Blue bell) */}
        <circle cx="110" cy="58" r="4" fill="#60A5FA" />
        <circle cx="110" cy="58" r="1.8" fill="#FEF08A" />
        <path d="M110 62 Q 112 74, 109 85" stroke="#4ADE80" strokeWidth="1.2" />

        {/* Flower 4 (Lavender) */}
        <circle cx="190" cy="52" r="4" fill="#C084FC" />
        <path d="M190 56 Q 189 72, 191 85" stroke="#4ADE80" strokeWidth="1.2" />

        {/* Flower 5 (Pink) */}
        <circle cx="280" cy="55" r="5" fill="#FB7185" />
        <circle cx="280" cy="55" r="2.5" fill="#FEF08A" />
        <path d="M280 60 Q 282 74, 279 85" stroke="#4ADE80" strokeWidth="1.5" />

        {/* Flower 6 (Orange) */}
        <circle cx="330" cy="48" r="4.5" fill="#FB923C" />
        <circle cx="330" cy="48" r="2" fill="#FEF08A" />
        <path d="M330 52 Q 328 68, 331 85" stroke="#4ADE80" strokeWidth="1.5" />

        {/* Flower 7 (Soft Yellow) */}
        <circle cx="370" cy="56" r="4" fill="#FDE047" />
        <path d="M370 60 Q 371 72, 369 85" stroke="#4ADE80" strokeWidth="1.2" />
      </svg>
    </div>
  );
};
