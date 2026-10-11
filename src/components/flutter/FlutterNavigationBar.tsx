import React from 'react';
import { ScreenId, UIStyleMode } from '../../types';
import { Home, Smile, Plus, CloudSun, Sparkles } from 'lucide-react';

interface FlutterNavigationBarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  uiStyle: UIStyleMode;
}

export const FlutterNavigationBar: React.FC<FlutterNavigationBarProps> = ({
  currentScreen,
  onNavigate,
  uiStyle,
}) => {
  return (
    <nav className="w-full bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 py-2 z-30 flex items-center justify-between shadow-lg select-none">
      {/* 1. 🏠 Home */}
      <button
        type="button"
        onClick={() => onNavigate('HOME')}
        className={`flex flex-col items-center font-bold text-[10px] gap-0.5 focus:outline-none transition-colors ${
          currentScreen === 'HOME' ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'
        }`}
      >
        <Home className={`w-5 h-5 ${currentScreen === 'HOME' ? 'stroke-[2.2]' : 'stroke-[2]'}`} />
        <span>Home</span>
      </button>

      {/* 2. 😊 Mood */}
      <button
        type="button"
        onClick={() => onNavigate('MOOD_INSIGHTS')}
        className={`flex flex-col items-center text-[10px] gap-0.5 focus:outline-none transition-colors ${
          currentScreen === 'MOOD_INSIGHTS' ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-indigo-600 font-medium'
        }`}
      >
        <Smile className={`w-5 h-5 ${currentScreen === 'MOOD_INSIGHTS' ? 'stroke-[2.2]' : 'stroke-[2]'}`} />
        <span>Mood</span>
      </button>

      {/* 3. ＋ Large center button */}
      <button
        type="button"
        onClick={() => onNavigate('LOG_MOOD')}
        className="-mt-7 w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg flex items-center justify-center transform active:scale-95 transition-transform group"
        title="Log Your Mood"
      >
        <Plus className="w-6 h-6 stroke-[2.5] group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* 4. ⛅ Weather */}
      <button
        type="button"
        onClick={() => onNavigate('WEATHER_CONDITIONS')}
        className={`flex flex-col items-center text-[10px] gap-0.5 focus:outline-none transition-colors ${
          currentScreen === 'WEATHER_CONDITIONS' ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-indigo-600 font-medium'
        }`}
      >
        <CloudSun className={`w-5 h-5 ${currentScreen === 'WEATHER_CONDITIONS' ? 'stroke-[2.2]' : 'stroke-[2]'}`} />
        <span>Weather</span>
      </button>

      {/* 5. ✨ Prediction */}
      <button
        type="button"
        onClick={() => onNavigate('PREDICTION')}
        className={`flex flex-col items-center text-[10px] gap-0.5 focus:outline-none transition-colors ${
          currentScreen === 'PREDICTION' ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-indigo-600 font-medium'
        }`}
      >
        <Sparkles className={`w-5 h-5 ${currentScreen === 'PREDICTION' ? 'stroke-[2.2]' : 'stroke-[2]'}`} />
        <span>Prediction</span>
      </button>
    </nav>
  );
};
