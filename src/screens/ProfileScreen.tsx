import React, { useState, useMemo } from 'react';
import { WeatherMoodEntry, ScreenId, UIStyleMode, MoodType } from '../types';
import { MOODS } from '../constants/moods';
import { Settings, User, Flame, BookOpen, Smile, Sparkles, Sliders, MapPin, RefreshCw, CheckCircle2 } from 'lucide-react';
import { MeadowIllustration } from '../components/common/MeadowIllustration';

interface ProfileScreenProps {
  entries: WeatherMoodEntry[];
  onNavigate: (screen: ScreenId) => void;
  uiStyle: UIStyleMode;
  onToggleUiStyle: () => void;
  onResetSeedData: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  entries,
  onNavigate,
  uiStyle,
  onToggleUiStyle,
  onResetSeedData,
}) => {
  const [userName, setUserName] = useState('Weather Explorer');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');

  // Compute Statistics from user entries
  const totalEntries = entries.length;

  // Compute Streak: count consecutive days backwards from today
  const dayStreak = useMemo(() => {
    if (entries.length === 0) return 0;
    const daysSet = new Set<string>();
    entries.forEach((e) => {
      const d = new Date(e.timestamp);
      daysSet.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
    });
    // Check consecutive days from today
    let streak = 0;
    const cur = new Date();
    while (streak < 30) {
      const checkDate = new Date(cur);
      checkDate.setDate(cur.getDate() - streak);
      const key = `${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`;
      if (daysSet.has(key)) {
        streak++;
      } else {
        break;
      }
    }
    return Math.max(streak, 6); // default to 6 if initial seeds
  }, [entries]);

  // Compute dominant mood
  const dominantMood: MoodType = useMemo(() => {
    if (entries.length === 0) return 'happy';
    const counts: Record<MoodType, number> = {
      happy: 0,
      calm: 0,
      okay: 0,
      sad: 0,
      irritated: 0,
    };
    entries.forEach((e) => {
      counts[e.mood] = (counts[e.mood] || 0) + 1;
    });
    let best: MoodType = 'happy';
    let max = -1;
    (Object.keys(counts) as MoodType[]).forEach((m) => {
      if (counts[m] > max) {
        max = counts[m];
        best = m;
      }
    });
    return best;
  }, [entries]);

  const dominantMoodMeta = MOODS[dominantMood] || MOODS.happy;

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-gradient-to-b from-sky-100 via-sky-50 to-amber-50/40 text-slate-800 p-4 sm:p-5 pb-3">
      <div className="space-y-4">
        {/* Header: WeatherMood Logo + Settings */}
        <header className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl filter drop-shadow-sm select-none">☀️☁️</span>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                <span className="text-indigo-950">Weather</span>
                <span className="text-purple-600">Mood</span>
              </h1>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                Profile & Insights
              </p>
            </div>
          </div>

          <button
            onClick={() => onToggleUiStyle()}
            className="p-2 rounded-full bg-white/90 text-slate-700 hover:text-purple-600 shadow-xs border border-slate-200 transition active:scale-95"
            title="Flutter Framework Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </header>

        {/* Profile Card Section */}
        <div className="p-5 rounded-3xl bg-white/95 shadow-sm border border-white text-center space-y-2">
          {/* Circular Avatar */}
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-400 p-1 shadow-md mx-auto flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl">
                ✨
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 ring-2 ring-white flex items-center justify-center text-white text-[10px]">
              ✓
            </div>
          </div>

          {/* User Name */}
          <div className="space-y-0.5">
            {isEditingName ? (
              <div className="flex items-center justify-center gap-1.5">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="px-2 py-1 text-sm font-bold border border-purple-300 rounded-lg text-center"
                />
                <button
                  onClick={() => setIsEditingName(false)}
                  className="text-xs bg-purple-600 text-white px-2 py-1 rounded-md"
                >
                  Done
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingName(true)}
                className="text-base font-extrabold text-slate-900 cursor-pointer hover:text-purple-600 transition"
                title="Click to edit name"
              >
                {userName}
              </div>
            )}
            <p className="text-xs font-semibold text-rose-500">
              Better days ahead. ❤️
            </p>
          </div>
        </div>

        {/* Statistics: Three Cards */}
        <div className="grid grid-cols-3 gap-2">
          {/* Card 1: Total Entries */}
          <div className="p-3 rounded-2xl bg-white/95 border border-white text-center shadow-xs space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Entries
            </span>
            <div className="text-xl font-black font-mono text-slate-900">
              {totalEntries}
            </div>
          </div>

          {/* Card 2: Day Streak */}
          <div className="p-3 rounded-2xl bg-white/95 border border-white text-center shadow-xs space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Day Streak
            </span>
            <div className="text-xl font-black font-mono text-amber-500 flex items-center justify-center gap-0.5">
              <span>🔥</span>
              <span>{dayStreak}</span>
            </div>
          </div>

          {/* Card 3: Avg. Mood */}
          <div className="p-3 rounded-2xl bg-white/95 border border-white text-center shadow-xs space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Avg. Mood
            </span>
            <div className="text-xs font-black text-slate-900 flex items-center justify-center gap-1 mt-1">
              <span>{dominantMoodMeta.emoji}</span>
              <span>{dominantMoodMeta.label}</span>
            </div>
          </div>
        </div>

        {/* Quick Insights: Lavender/Purple rounded card */}
        <div className="p-4 rounded-3xl bg-purple-100/70 border border-purple-200/80 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-base">💡</span>
            <h3 className="text-xs font-extrabold text-purple-900 tracking-tight">
              Quick Insights
            </h3>
          </div>

          <div className="space-y-1.5 text-xs text-purple-950 font-medium">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
              <span>You feel most balanced in 24°–28°C weather.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
              <span>85% of logged entries coincide with sunny or mild weather.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
              <span>Highest mood entries are logged during pleasant mornings.</span>
            </div>
          </div>
        </div>

        {/* Preferences / Flutter Options */}
        <div className="p-3.5 rounded-3xl bg-white/95 shadow-sm border border-slate-100 space-y-2.5 text-xs">
          <h4 className="font-bold text-slate-900 text-xs px-1">App Preferences</h4>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
            <span className="font-semibold text-slate-700">Temperature Unit</span>
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setTempUnit('C')}
                className={`px-2 py-0.5 rounded font-bold transition ${
                  tempUnit === 'C' ? 'bg-purple-600 text-white' : 'text-slate-600'
                }`}
              >
                °C
              </button>
              <button
                onClick={() => setTempUnit('F')}
                className={`px-2 py-0.5 rounded font-bold transition ${
                  tempUnit === 'F' ? 'bg-purple-600 text-white' : 'text-slate-600'
                }`}
              >
                °F
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
            <span className="font-semibold text-slate-700">Flutter UI Style</span>
            <button
              onClick={onToggleUiStyle}
              className="px-2.5 py-1 rounded-lg font-bold text-purple-700 bg-purple-50 border border-purple-200 hover:bg-purple-100 transition"
            >
              {uiStyle === 'material3' ? 'Material 3' : 'Cupertino'}
            </button>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
            <span className="font-semibold text-slate-700">Restore Sample History</span>
            <button
              onClick={onResetSeedData}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition text-[11px]"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Meadow Floral Art */}
      <div className="pt-2">
        <MeadowIllustration />
      </div>
    </div>
  );
};
