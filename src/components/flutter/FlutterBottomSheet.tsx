import React, { useEffect } from 'react';
import { UIStyleMode } from '../../types';
import { X } from 'lucide-react';

interface FlutterBottomSheetProps {
  uiStyle: UIStyleMode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const FlutterBottomSheet: React.FC<FlutterBottomSheetProps> = ({
  uiStyle,
  isOpen,
  onClose,
  title,
  children,
}) => {
  const isM3 = uiStyle === 'material3';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Sheet Modal */}
      <div
        className={`relative w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden shadow-2xl transition-transform animate-slide-up ${
          isM3
            ? 'rounded-t-[28px] bg-slate-900 border-t border-slate-700/80 text-slate-100'
            : 'rounded-t-[24px] bg-slate-900/95 backdrop-blur-2xl border-t border-white/10 text-white'
        }`}
      >
        {/* Drag Handle Bar (Iconic Flutter BottomSheet Affordance) */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 bg-slate-600/70 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-2 border-b border-slate-800/60">
          {title ? (
            <h3 className="text-base font-semibold tracking-tight">{title}</h3>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-4">{children}</div>
      </div>
    </div>
  );
};
