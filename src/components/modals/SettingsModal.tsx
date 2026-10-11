import React from 'react';
import { LiveWeatherData, UIStyleMode } from '../../types';
import { X, User, Settings, RefreshCw, LogOut, Check, Sliders } from 'lucide-react';

interface SettingsModalProps {
  currentUser?: { name: string; identifier: string } | null;
  weather: LiveWeatherData;
  uiStyle: UIStyleMode;
  onToggleUiStyle: () => void;
  onClose: () => void;
  onLogout: () => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  currentUser,
  weather,
  uiStyle,
  onToggleUiStyle,
  onClose,
  onLogout,
  onResetData,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-fade-in">
      <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-sm">Settings & Account</h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Account info if logged in */}
        {currentUser ? (
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-slate-800 text-xs truncate">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {currentUser.identifier}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs text-purple-900 flex items-center gap-2">
            <User className="w-4 h-4 text-purple-600 shrink-0" />
            <span>Active guest explorer session</span>
          </div>
        )}

        {/* Options */}
        <div className="space-y-2 text-xs">
          {/* Active Location Info */}
          <div className="p-2.5 rounded-xl border border-slate-200/80 bg-slate-50">
            <div className="text-[10px] font-semibold text-slate-400 mb-0.5">
              Active Regional Zone
            </div>
            <div className="font-bold text-slate-800 text-xs">
              {weather.city}, {weather.state} ({weather.temp}°C · {weather.condition})
            </div>
          </div>

          {/* Flutter UI Framework Mode */}
          <div className="p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-800 text-xs">Flutter Framework</div>
              <div className="text-[10px] text-slate-400">Design System styling</div>
            </div>
            <button
              onClick={onToggleUiStyle}
              className="px-2.5 py-1 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition"
            >
              {uiStyle === 'material3' ? 'Material 3' : 'Cupertino'}
            </button>
          </div>

          {/* Reset App Data */}
          <button
            onClick={() => {
              onResetData();
              onClose();
            }}
            className="w-full p-2.5 rounded-xl border border-rose-100 text-rose-600 hover:bg-rose-50 font-bold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Local App Data</span>
          </button>

          {/* Sign Out / Switch User */}
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out / Switch Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};
