import React from 'react';
import { UIStyleMode } from '../../types';
import { Check } from 'lucide-react';

interface FlutterChipProps {
  uiStyle: UIStyleMode;
  label: string;
  selected?: boolean;
  onSelected?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const FlutterChip: React.FC<FlutterChipProps> = ({
  uiStyle,
  label,
  selected = false,
  onSelected,
  icon,
  className = '',
}) => {
  const isM3 = uiStyle === 'material3';

  if (!isM3) {
    // Cupertino Pill Filter
    return (
      <button
        type="button"
        onClick={onSelected}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${
          selected
            ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-white/5'
        } ${className}`}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="whitespace-nowrap truncate">{label}</span>
      </button>
    );
  }

  // Material 3 FilterChip
  return (
    <button
      type="button"
      onClick={onSelected}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 active:scale-95 border ${
        selected
          ? 'bg-indigo-500/25 border-indigo-400/60 text-indigo-200 font-semibold shadow-sm'
          : 'bg-slate-900/80 border-slate-700/70 text-slate-300 hover:border-slate-600 hover:text-slate-100'
      } ${className}`}
    >
      {selected ? (
        <Check className="w-3.5 h-3.5 text-indigo-300 shrink-0 stroke-[2.5]" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span className="whitespace-nowrap truncate">{label}</span>
    </button>
  );
};
