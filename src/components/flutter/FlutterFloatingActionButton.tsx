import React from 'react';
import { UIStyleMode } from '../../types';
import { Plus } from 'lucide-react';

interface FlutterFloatingActionButtonProps {
  uiStyle: UIStyleMode;
  label?: string;
  icon?: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const FlutterFloatingActionButton: React.FC<FlutterFloatingActionButtonProps> = ({
  uiStyle,
  label,
  icon,
  onClick,
  className = '',
}) => {
  const isM3 = uiStyle === 'material3';

  if (!isM3) {
    // Cupertino Action Button (Pill shaped floating glass button)
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-3 rounded-full bg-amber-500/90 hover:bg-amber-400 text-slate-950 font-semibold text-xs shadow-lg backdrop-blur-md active:scale-95 transition-all ${className}`}
      >
        {icon || <Plus className="w-4 h-4 stroke-[2.5]" />}
        {label && <span>{label}</span>}
      </button>
    );
  }

  // Material 3 FloatingActionButton
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-semibold text-xs shadow-xl shadow-amber-950/40 hover:shadow-amber-500/20 active:scale-95 transition-all duration-200 border border-amber-300/30 ${className}`}
    >
      <div className="transition-transform group-hover:rotate-90 duration-300">
        {icon || <Plus className="w-4 h-4 stroke-[2.5]" />}
      </div>
      {label && <span className="tracking-tight">{label}</span>}
    </button>
  );
};
