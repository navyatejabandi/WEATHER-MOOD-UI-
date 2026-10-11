import React from 'react';
import { UIStyleMode } from '../../types';
import { Sparkles, Code2, Headphones, Search, RefreshCw } from 'lucide-react';

interface FlutterAppBarProps {
  uiStyle: UIStyleMode;
  title: string;
  subtitle?: string;
  onToggleStyle: () => void;
  onOpenSearch: () => void;
  onOpenSoundscape: () => void;
  onOpenInspector: () => void;
  onRefreshWeather: () => void;
  isSoundPlaying?: boolean;
}

export const FlutterAppBar: React.FC<FlutterAppBarProps> = ({
  uiStyle,
  title,
  subtitle,
  onToggleStyle,
  onOpenSearch,
  onOpenSoundscape,
  onOpenInspector,
  onRefreshWeather,
  isSoundPlaying,
}) => {
  const isM3 = uiStyle === 'material3';

  if (!isM3) {
    // CupertinoNavigationBar style
    return (
      <header className="sticky top-0 w-full z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 py-2.5 transition-all">
        <div className="flex items-center justify-between min-h-[44px]">
          {/* Leading iOS action */}
          <div className="flex items-center gap-1">
            <button
              onClick={onToggleStyle}
              title="Switch to Material 3 (Android)"
              className="text-xs font-medium text-sky-400 hover:text-sky-300 flex items-center gap-1 px-2 py-1 rounded active:opacity-60 transition"
            >
              <span>iOS</span>
              <span className="text-white/40">·</span>
              <span className="text-white/70">M3</span>
            </button>
          </div>

          {/* Centered Title */}
          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-semibold tracking-tight text-white">{title}</span>
            {subtitle && (
              <span className="text-[11px] text-white/60 tracking-tight">{subtitle}</span>
            )}
          </div>

          {/* Trailing iOS actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenSoundscape}
              className={`p-2 rounded-full transition active:scale-95 ${
                isSoundPlaying ? 'text-amber-400 bg-amber-400/20' : 'text-white/80 hover:text-white'
              }`}
              title="Ambient Soundscapes"
            >
              <Headphones className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full text-white/80 hover:text-white active:scale-95 transition"
              title="Change City"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenInspector}
              className="p-2 rounded-full text-white/80 hover:text-white active:scale-95 transition"
              title="Inspect Flutter Widget Tree"
            >
              <Code2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Material 3 AppBar
  return (
    <header className="sticky top-0 w-full z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-2 transition-all">
      <div className="flex items-center justify-between min-h-[48px]">
        {/* Leading Flutter M3 Brand Mark */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center shadow-sm">
            {/* Flutter Wing Icon SVG */}
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
              <path d="M14.314 0L2.3 12 6 15.7 21.714 0h-7.4zm0 14.314l-4.286 4.314L14.314 23H21.7l-7.986-8.014L21.7 6.97h-7.386z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-100 tracking-tight">{title}</h1>
              <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Flutter M3
              </span>
            </div>
            {subtitle && (
              <p className="text-xs text-slate-400 font-normal">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Trailing M3 Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleStyle}
            title="Switch UI Style: Material 3 or Cupertino"
            className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 active:scale-95 transition"
          >
            M3 / iOS
          </button>
          <button
            onClick={onRefreshWeather}
            title="Refresh Weather Data"
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 active:scale-90 transition"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenSoundscape}
            title="Ambient Soundscapes"
            className={`p-2 rounded-full transition active:scale-90 ${
              isSoundPlaying
                ? 'text-amber-400 bg-amber-400/20 ring-1 ring-amber-400/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Headphones className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenSearch}
            title="Search Cities"
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 active:scale-90 transition"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenInspector}
            title="View Flutter Widget Code"
            className="p-2 rounded-full text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/60 active:scale-90 transition"
          >
            <Code2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
