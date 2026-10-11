import React, { useState, useMemo } from 'react';
import { WeatherMoodEntry, ScreenId, MoodType, WeatherCondition } from '../types';
import { MOODS } from '../constants/moods';
import { MapPin, ChevronLeft, ChevronRight, Plus, Calendar, Filter, Sparkles } from 'lucide-react';
import { MeadowIllustration } from '../components/common/MeadowIllustration';

interface TimelineScreenProps {
  entries: WeatherMoodEntry[];
  onNavigate: (screen: ScreenId) => void;
  onDeleteEntry?: (id: string) => void;
}

type TimelineFilterTab = 'timeline' | 'mood' | 'weather';

export const TimelineScreen: React.FC<TimelineScreenProps> = ({
  entries,
  onNavigate,
  onDeleteEntry,
}) => {
  const [activeTab, setActiveTab] = useState<TimelineFilterTab>('timeline');
  const [selectedMoodFilter, setSelectedMoodFilter] = useState<MoodType | 'all'>('all');
  const [selectedWeatherFilter, setSelectedWeatherFilter] = useState<string>('all');

  // Month navigation: default to current month of latest entry or today
  const currentDate = new Date();
  const [selectedMonthOffset, setSelectedMonthOffset] = useState<number>(0);

  // Compute month label based on offset
  const displayDate = useMemo(() => {
    const d = new Date(currentDate);
    d.setMonth(currentDate.getMonth() + selectedMonthOffset);
    return d;
  }, [selectedMonthOffset]);

  const monthYearLabel = useMemo(() => {
    return displayDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [displayDate]);

  // Weather icon helper
  const getWeatherIcon = (cond: WeatherCondition | string) => {
    switch (cond) {
      case 'sunny':
      case 'clear':
        return '☀️';
      case 'mostly_clear':
      case 'partly_cloudy':
        return '⛅';
      case 'cloudy':
        return '☁️';
      case 'rainy':
        return '🌧️';
      case 'thunderstorm':
        return '⛈️';
      case 'snowy':
        return '❄️';
      default:
        return '☀️';
    }
  };

  // Filter entries
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      // Month check
      const entryDate = new Date(entry.timestamp);
      const isSameMonth =
        entryDate.getMonth() === displayDate.getMonth() &&
        entryDate.getFullYear() === displayDate.getFullYear();

      if (!isSameMonth && selectedMonthOffset !== 0) {
        // If user changed month, filter by month
        return false;
      }

      // Tab specific filters
      if (activeTab === 'mood' && selectedMoodFilter !== 'all') {
        if (entry.mood !== selectedMoodFilter) return false;
      }

      if (activeTab === 'weather' && selectedWeatherFilter !== 'all') {
        if (selectedWeatherFilter === 'sunny' && !['sunny', 'clear', 'mostly_clear'].includes(entry.condition)) {
          return false;
        }
        if (selectedWeatherFilter === 'cloudy' && !['cloudy', 'partly_cloudy'].includes(entry.condition)) {
          return false;
        }
        if (selectedWeatherFilter === 'rainy' && !['rainy', 'thunderstorm'].includes(entry.condition)) {
          return false;
        }
      }

      return true;
    });
  }, [entries, activeTab, selectedMoodFilter, selectedWeatherFilter, displayDate, selectedMonthOffset]);

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-gradient-to-b from-sky-100 via-sky-50 to-amber-50/40 text-slate-800 p-4 sm:p-5 pb-3">
      <div className="space-y-3.5">
        {/* 1. Header: Logo + Month/Date Selector */}
        <header className="space-y-2">
          {/* WeatherMood Logo */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl filter drop-shadow-sm select-none">☀️☁️</span>
            <div className="text-center">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                <span className="text-indigo-950">Weather</span>
                <span className="text-purple-600">Mood</span>
              </h1>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                Timeline History
              </p>
            </div>
          </div>

          {/* Month/Date Selector (e.g. October 2026) */}
          <div className="flex items-center justify-between bg-white/90 backdrop-blur-xs px-3 py-2 rounded-2xl border border-slate-200/80 shadow-xs">
            <button
              onClick={() => setSelectedMonthOffset((prev) => prev - 1)}
              className="p-1 rounded-full text-slate-600 hover:text-purple-600 hover:bg-slate-100 transition active:scale-95"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800 font-mono">
              <Calendar className="w-3.5 h-3.5 text-purple-600" />
              <span>{monthYearLabel}</span>
            </div>

            <button
              onClick={() => setSelectedMonthOffset((prev) => Math.min(0, prev + 1))}
              disabled={selectedMonthOffset >= 0}
              className={`p-1 rounded-full transition active:scale-95 ${
                selectedMonthOffset >= 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-slate-100'
              }`}
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* 2. Filters / Tabs: Timeline | Mood | Weather */}
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-1 bg-slate-200/70 p-1 rounded-2xl text-xs font-bold text-slate-600 select-none">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`py-1.5 rounded-xl transition-all ${
                activeTab === 'timeline'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setActiveTab('mood')}
              className={`py-1.5 rounded-xl transition-all ${
                activeTab === 'mood'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              Mood
            </button>
            <button
              onClick={() => setActiveTab('weather')}
              className={`py-1.5 rounded-xl transition-all ${
                activeTab === 'weather'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              Weather
            </button>
          </div>

          {/* Subfilter Pills when Mood tab is selected */}
          {activeTab === 'mood' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
              <button
                onClick={() => setSelectedMoodFilter('all')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all ${
                  selectedMoodFilter === 'all'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                All
              </button>
              {(Object.keys(MOODS) as MoodType[]).map((mKey) => {
                const m = MOODS[mKey];
                const isSelected = selectedMoodFilter === mKey;
                return (
                  <button
                    key={mKey}
                    onClick={() => setSelectedMoodFilter(mKey)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 flex items-center gap-1 transition-all ${
                      isSelected
                        ? 'ring-2 ring-purple-600 text-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                    }`}
                    style={{ backgroundColor: isSelected ? m.bgPastel : undefined }}
                  >
                    <span>{m.emoji}</span>
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Subfilter Pills when Weather tab is selected */}
          {activeTab === 'weather' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
              <button
                onClick={() => setSelectedWeatherFilter('all')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all ${
                  selectedWeatherFilter === 'all'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                All
              </button>
              {[
                { id: 'sunny', label: 'Sunny', emoji: '☀️' },
                { id: 'cloudy', label: 'Cloudy', emoji: '☁️' },
                { id: 'rainy', label: 'Rainy', emoji: '🌧️' },
              ].map((w) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedWeatherFilter(w.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 flex items-center gap-1 transition-all ${
                    selectedWeatherFilter === w.id
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <span>{w.emoji}</span>
                  <span>{w.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Timeline Entries or Empty State */}
        {filteredEntries.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white/95 border border-white text-center space-y-3 shadow-sm my-6">
            <div className="text-4xl">💜</div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900">
                No mood entries yet 💜
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Start tracking how the weather makes you feel.
              </p>
            </div>
            <button
              onClick={() => onNavigate('log')}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Log Your Mood</span>
            </button>
          </div>
        ) : (
          <div className="relative pl-6 space-y-3 pt-1">
            {/* Vertical timeline line on the left */}
            <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-purple-400 via-indigo-300 to-purple-200" />

            {filteredEntries.map((entry) => {
              const moodMeta = MOODS[entry.mood] || MOODS.happy;
              const weatherIcon = getWeatherIcon(entry.condition);

              return (
                <div key={entry.id} className="relative group">
                  {/* Colored dot on the line */}
                  <div
                    className="absolute -left-[19px] top-4 w-3.5 h-3.5 rounded-full ring-2 ring-white shadow-sm transition-transform group-hover:scale-125"
                    style={{ backgroundColor: moodMeta.colorHex }}
                  />

                  {/* White rounded card */}
                  <div className="p-3.5 rounded-3xl bg-white/95 shadow-sm border border-white/90 hover:shadow-md transition-shadow space-y-2">
                    {/* Top Row: Date + Time & Mood Badge */}
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-extrabold text-slate-900 font-mono tracking-tight">
                        {entry.formattedDate} | {entry.formattedTime}
                      </div>

                      {/* Mood badge with colored pill */}
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold shadow-2xs"
                        style={{
                          backgroundColor: moodMeta.bgPastel,
                          color: moodMeta.colorHex,
                          border: `1px solid ${moodMeta.borderHex}`,
                        }}
                      >
                        <span>{moodMeta.emoji}</span>
                        <span>{moodMeta.label}</span>
                      </span>
                    </div>

                    {/* Middle: Location & Weather Details */}
                    <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
                      <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                        <MapPin className="w-3 h-3 text-purple-500 shrink-0" />
                        <span>{entry.location}</span>
                      </div>

                      <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                        <span>{weatherIcon}</span>
                        <span className="font-mono font-bold text-slate-900">
                          {entry.temperature}°C
                        </span>
                        <span className="text-slate-400">—</span>
                        <span className="text-[11px]">{entry.conditionText}</span>
                      </div>
                    </div>

                    {/* Note if present */}
                    {entry.note && (
                      <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl italic border border-slate-100">
                        "{entry.note}"
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Meadow Floral Art */}
      <div className="pt-2">
        <MeadowIllustration />
      </div>
    </div>
  );
};
