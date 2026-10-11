import React, { useEffect } from 'react';
import { UIStyleMode } from '../../types';

interface FlutterSnackBarProps {
  uiStyle: UIStyleMode;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  actionLabel?: string;
  onAction?: () => void;
  durationMs?: number;
}

export const FlutterSnackBar: React.FC<FlutterSnackBarProps> = ({
  uiStyle,
  message,
  isOpen,
  onClose,
  actionLabel,
  onAction,
  durationMs = 4000,
}) => {
  const isM3 = uiStyle === 'material3';

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, durationMs);
      return () => clearTimeout(timer);
    }
  }, [isOpen, durationMs, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 shadow-2xl transition-all animate-bounce-in ${
          isM3
            ? 'rounded-xl bg-slate-800 border border-slate-700 text-slate-100'
            : 'rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-white'
        }`}
      >
        <span className="text-xs font-medium">{message}</span>
        {actionLabel && (
          <button
            onClick={() => {
              if (onAction) onAction();
              onClose();
            }}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 uppercase tracking-wider"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
