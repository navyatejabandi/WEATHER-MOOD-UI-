import React, { useState, useMemo } from 'react';
import { WeatherMoodEntry, LiveWeatherData, ScreenId, MoodType } from '../types';
import { MOODS } from '../constants/moods';
import { ChevronRight, Sparkles, MapPin, TrendingUp, Sun, Cloud, CloudRain } from 'lucide-react';
import { MeadowIllustration } from '../components/common/MeadowIllustration';

interface InsightsScreenProps {
  entries: WeatherMoodEntry[];
  weather: LiveWeatherData;
  onNavigate: (screen: ScreenId) => void;
}

type TimeFilter = 'weekly' | 'monthly' | 'custom';

export const InsightsScreen: React.FC<InsightsScreenProps> = ({
  entries,
  weather,
  onNavigate,
}) => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('weekly');

  // Chart data: past 7 days for weekly
  const chartDays = useMemo(() => {
    const daysCount = timeFilter === 'weekly' ? 7 : timeFilter === 'monthly' ? 14 : 7;
    const now = new Date();
    const result: Array<{
      dateStr: string;
      temp: number;
      mood: MoodType;
      moodValue: number; // 1 to 5
      color: string;
      emoji: string;
    }> = [];

    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateKey = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

      // Find entry on this date or interpolate
      const matching = entries.find((e) => {
        const ed = new Date(e.timestamp);
        return ed.getDate() === d.getDate() && ed.getMonth() === d.getMonth();
      });

      const mood: MoodType = matching ? matching.mood : i % 2 === 0 ? 'happy' : 'calm';
      const temp = matching ? matching.temperature : 26 + (i * 2) % 8;
      
      const moodValueMap: Record<MoodType, number> = {
        irritated: 1,
        sad: 2,
        okay: 3,
        calm: 4,
        happy: 5,
      };

      result.push({
        dateStr: dateKey,
        temp,
        mood,
        moodValue: moodValueMap[mood],
        color: MOODS[mood]?.colorHex || '#FACC15',
        emoji: MOODS[mood]?.emoji || '😊',
      });
    }

    return result;
  }, [entries, timeFilter]);

  // Factor influences
  const factorInfluences = [
    {
      label: 'Temperature (°C)',
      value: '+42%',
      isPositive: true,
      color: '#FB923C',
      width: '78%',
      description: 'Higher chance of positive mood in 20–30°C',
    },
    {
      label: 'Rain/Precipitation',
      value: '-36%',
      isPositive: false,
      color: '#38BDF8',
      width: '64%',
      description: 'Rainy days are linked with lower mood',
    },
    {
      label: 'Humidity',
      value: '-22%',
      isPositive: false,
      color: '#A855F7',
      width: '45%',
      description: 'High humidity can increase irritation',
    },
    {
      label: 'Air Quality (AQI)',
      value: '-18%',
      isPositive: false,
      color: '#F87171',
      width: '38%',
      description: 'Poor air quality is linked with lower mood',
    },
  ];

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-gradient-to-b from-sky-100 via-sky-50 to-amber-50/40 text-slate-800 p-4 sm:p-5 pb-3">
      <div className="space-y-3.5">
        {/* Header: WeatherMood Insights */}
        <header className="flex flex-col items-center justify-center pt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xl filter drop-shadow-xs select-none">☀️☁️</span>
            <h1 className="text-base font-extrabold tracking-tight text-slate-900 leading-none">
              <span className="text-indigo-950">Weather</span>
              <span className="text-purple-600">Mood</span>
            </h1>
          </div>
          <span className="text-xs font-bold text-slate-700 mt-0.5">Insights</span>
        </header>

        {/* 1. Right Now Card */}
        <div className="p-3.5 rounded-3xl bg-white/95 shadow-sm border border-white flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600">
              Right Now
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl">☀️</span>
              <span className="text-xl font-extrabold font-mono text-slate-900">
                {weather.temperature}°C
              </span>
              <span className="text-xs font-bold text-slate-600">
                {weather.conditionText}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
              <MapPin className="w-3 h-3 text-purple-500" />
              <span>{weather.location}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-xs font-extrabold text-emerald-700">
              <span>😊</span>
              <span>Happy Likelihood</span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">
              +42% positive correlation
            </div>
          </div>
        </div>

        {/* 2. Time Filter: Weekly | Monthly | Custom */}
        <div className="grid grid-cols-3 gap-1 bg-slate-200/70 p-1 rounded-2xl text-xs font-bold text-slate-600 select-none">
          <button
            onClick={() => setTimeFilter('weekly')}
            className={`py-1.5 rounded-xl transition-all ${
              timeFilter === 'weekly'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeFilter('monthly')}
            className={`py-1.5 rounded-xl transition-all ${
              timeFilter === 'monthly'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeFilter('custom')}
            className={`py-1.5 rounded-xl transition-all ${
              timeFilter === 'custom'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Custom
          </button>
        </div>

        {/* 3. Main Chart: Mood vs Weather */}
        <div className="p-4 rounded-3xl bg-white/95 shadow-md shadow-slate-200/50 border border-white space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-extrabold text-slate-900">
                Mood vs Weather
              </h2>
              <p className="text-[10px] text-slate-400 font-medium">
                Colored bars = Mood · Orange line = Temperature (°C)
              </p>
            </div>
            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
              Combined Trend
            </span>
          </div>

          {/* Combined Visual Chart */}
          <div className="relative pt-3 pb-1">
            {/* SVG overlay for temperature line */}
            <div className="h-32 w-full flex items-end justify-between gap-2 px-1 relative">
              {chartDays.map((item, idx) => {
                const heightPercent = (item.moodValue / 5) * 80 + 10;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                    {/* Tooltip hover */}
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded-md whitespace-nowrap pointer-events-none z-10 font-mono">
                      {item.temp}°C · {MOODS[item.mood]?.label}
                    </div>

                    {/* Temp marker on top */}
                    <span className="text-[10px] font-extrabold font-mono text-orange-600 mb-1">
                      {item.temp}°
                    </span>

                    {/* Mood Colored Bar */}
                    <div
                      className="w-full max-w-[28px] rounded-t-xl transition-all duration-300 shadow-xs flex items-center justify-center"
                      style={{
                        height: `${heightPercent}%`,
                        backgroundColor: item.color,
                      }}
                    >
                      <span className="text-xs select-none">{item.emoji}</span>
                    </div>

                    {/* X-axis date */}
                    <span className="text-[9px] font-bold text-slate-500 font-mono mt-1.5">
                      {item.dateStr.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. Weather + Mood Summary: “Top Weather Conditions & Mood” */}
        <div className="space-y-1.5">
          <h2 className="text-xs font-bold text-slate-800 px-1">
            Top Weather Conditions & Mood
          </h2>

          <div className="grid grid-cols-3 gap-2">
            {/* ☀️ Sunny */}
            <div className="p-3 rounded-2xl bg-white/95 shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-0.5">
              <span className="text-xl">☀️</span>
              <span className="text-[10px] font-bold text-slate-500">Sunny</span>
              <span className="text-base font-black font-mono text-slate-900">
                68%
              </span>
              <span className="text-[10px] font-extrabold text-emerald-600">
                More happy
              </span>
            </div>

            {/* ☁️ Cloudy */}
            <div className="p-3 rounded-2xl bg-white/95 shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-0.5">
              <span className="text-xl">☁️</span>
              <span className="text-[10px] font-bold text-slate-500">Cloudy</span>
              <span className="text-base font-black font-mono text-slate-900">
                45%
              </span>
              <span className="text-[10px] font-extrabold text-amber-600">
                Mostly okay
              </span>
            </div>

            {/* 🌧️ Rainy */}
            <div className="p-3 rounded-2xl bg-white/95 shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-0.5">
              <span className="text-xl">🌧️</span>
              <span className="text-[10px] font-bold text-slate-500">Rainy</span>
              <span className="text-base font-black font-mono text-slate-900">
                72%
              </span>
              <span className="text-[10px] font-extrabold text-blue-600">
                More sad
              </span>
            </div>
          </div>
        </div>

        {/* 5. Personal Insights Card */}
        <div className="p-4 rounded-3xl bg-purple-100/70 border border-purple-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-purple-950">
            <div className="flex items-center gap-1.5">
              <span>💡</span>
              <span>Personal Insights</span>
            </div>
            <button
              onClick={() => onNavigate('prediction')}
              className="text-[10px] text-purple-700 font-bold hover:underline flex items-center gap-0.5"
            >
              <span>Predict Mood</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-1.5 text-xs text-purple-900 font-medium pl-1">
            <p className="flex items-center gap-2">
              <span className="text-purple-700 font-bold">💡</span>
              <span>You feel happiest on sunny days.</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-purple-700 font-bold">💡</span>
              <span>You tend to feel lower on rainy days.</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-purple-700 font-bold">💡</span>
              <span>Your mood is usually better in the morning.</span>
            </p>
          </div>
        </div>

        {/* 6. Weather Factors vs Mood Influence */}
        <div className="p-4 rounded-3xl bg-white/95 shadow-md shadow-slate-200/50 border border-white space-y-2.5">
          <div className="space-y-0.5">
            <h2 className="text-xs font-extrabold text-slate-900">
              Weather Factors vs Mood
            </h2>
            <p className="text-[10px] text-slate-400 font-medium">
              Statistical influence on daily emotions
            </p>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            {factorInfluences.map((factor, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-800">{factor.label}</span>
                  <span
                    className="font-mono font-black"
                    style={{ color: factor.color }}
                  >
                    {factor.value}
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: factor.width,
                      backgroundColor: factor.color,
                    }}
                  />
                </div>

                <div className="text-[10px] text-slate-500 font-medium">
                  {factor.description}
                </div>
              </div>
            ))}
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
