import React, { useState } from 'react';
import { LiveWeatherData } from '../types';
import { WeatherIllustration } from '../components/common/WeatherIllustration';
import { MoodAvatar } from '../components/common/MoodAvatar';
import { WeatherMoodService } from '../utils/weatherMoodCalculations';
import { ChevronRight, ArrowRight, Sun, Sunrise, Sunset, Moon } from 'lucide-react';
import { MeadowIllustration } from '../components/common/MeadowIllustration';

interface MoodInsightsScreenProps {
  weather: LiveWeatherData;
  onOpenHome: () => void;
  onOpenWeatherConditions: () => void;
  onOpenPrediction: () => void;
  onOpenLogMood: () => void;
}

export const MoodInsightsScreen: React.FC<MoodInsightsScreenProps> = ({
  weather,
  onOpenHome,
  onOpenWeatherConditions,
  onOpenPrediction,
  onOpenLogMood,
}) => {
  const [activeTab, setActiveTab] = useState<'TODAY' | 'TIME_OF_DAY'>('TODAY');

  const distribution = WeatherMoodService.calculateTodayMoodDistribution(weather);

  // Donut chart stroke circumference
  const circumference = 2 * Math.PI * 38;
  const strokeHappy = (distribution.happy / 100) * circumference;
  const strokeCalm = (distribution.calm / 100) * circumference;
  const strokeOkay = (distribution.okay / 100) * circumference;
  const strokeSad = (distribution.sad / 100) * circumference;
  const strokeIrritated = (distribution.irritated / 100) * circumference;

  const factorInfluences = [
    {
      label: 'Temperature (°C)',
      value: '+42%',
      color: '#FB923C',
      width: '78%',
      description: 'Higher chance of positive mood in 20–30°C range',
    },
    {
      label: 'Rain/Precipitation',
      value: '-36%',
      color: '#38BDF8',
      width: '64%',
      description: 'Overcast & rain linked with reflective/lower pacing',
    },
    {
      label: 'Humidity',
      value: '-22%',
      color: '#A855F7',
      width: '45%',
      description: 'High humidity can increase irritability',
    },
    {
      label: 'Air Quality (AQI)',
      value: '-18%',
      color: '#F87171',
      width: '38%',
      description: 'High particulate count creates mild cognitive fatigue',
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#E0F2FE] via-[#F8FAFC] to-[#F1F5F9] text-slate-800 pb-24 select-none">
      <div className="px-5 pt-4">
        {/* Header: Mood Insights + Weather Impact button */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <WeatherIllustration size="sm" className="w-9 h-7" />
            <div>
              <div className="text-lg font-extrabold text-slate-800 leading-tight flex items-center">
                <span className="text-[#3B82F6]">Mood</span>
                <span className="text-[#8B5CF6] ml-1">Insights</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                Part 1: Overall distribution of the day
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenWeatherConditions}
            className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full hover:bg-indigo-100 transition-colors"
          >
            <span>Weather Impact →</span>
          </button>
        </div>

        {/* Tab Switcher: Today's Overall vs Time-of-Day Shifts */}
        <div className="bg-slate-200/70 p-1 rounded-2xl flex items-center gap-1 mb-3.5">
          <button
            type="button"
            onClick={() => setActiveTab('TODAY')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'TODAY'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Today's Overall (Of the Day)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('TIME_OF_DAY')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'TIME_OF_DAY'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Time-of-Day Shifts
          </button>
        </div>

        {activeTab === 'TODAY' ? (
          <div className="space-y-3.5">
            {/* Donut Chart Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-800 font-heading">
                    Today's Mood Distribution
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">
                    (Of the day across 24 hours of atmospheric conditions)
                  </p>
                </div>
                <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                  {weather.city} · Today
                </span>
              </div>

              {/* Donut Chart & Legend */}
              <div className="mt-3 flex items-center justify-between gap-4">
                {/* SVG Donut */}
                <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#F1F5F9" strokeWidth="16" />
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#FBBF24"
                      strokeWidth="16"
                      strokeDasharray={`${strokeHappy} ${circumference}`}
                      strokeDashoffset="0"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#34D399"
                      strokeWidth="16"
                      strokeDasharray={`${strokeCalm} ${circumference}`}
                      strokeDashoffset={-strokeHappy}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#FB923C"
                      strokeWidth="16"
                      strokeDasharray={`${strokeOkay} ${circumference}`}
                      strokeDashoffset={-(strokeHappy + strokeCalm)}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#60A5FA"
                      strokeWidth="16"
                      strokeDasharray={`${strokeSad} ${circumference}`}
                      strokeDashoffset={-(strokeHappy + strokeCalm + strokeOkay)}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="transparent"
                      stroke="#F87171"
                      strokeWidth="16"
                      strokeDasharray={`${strokeIrritated} ${circumference}`}
                      strokeDashoffset={-(strokeHappy + strokeCalm + strokeOkay + strokeSad)}
                    />
                  </svg>

                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-sm font-black text-slate-800 leading-none font-mono">
                      {distribution.happy}%
                    </span>
                    <span className="text-[9px] font-bold text-[#F59E0B]">
                      Happy
                    </span>
                  </div>
                </div>

                {/* Legend list */}
                <div className="flex-1 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24] shrink-0" />
                      <span className="font-semibold text-slate-700 text-[11px]">Happy</span>
                    </div>
                    <span className="font-bold text-slate-800 text-[11px] font-mono">{distribution.happy}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] shrink-0" />
                      <span className="font-semibold text-slate-700 text-[11px]">Calm</span>
                    </div>
                    <span className="font-bold text-slate-800 text-[11px] font-mono">{distribution.calm}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FB923C] shrink-0" />
                      <span className="font-semibold text-slate-700 text-[11px]">Okay</span>
                    </div>
                    <span className="font-bold text-slate-800 text-[11px] font-mono">{distribution.okay}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#60A5FA] shrink-0" />
                      <span className="font-semibold text-slate-700 text-[11px]">Sad</span>
                    </div>
                    <span className="font-bold text-slate-800 text-[11px] font-mono">{distribution.sad}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F87171] shrink-0" />
                      <span className="font-semibold text-slate-700 text-[11px]">Irritated</span>
                    </div>
                    <span className="font-bold text-slate-800 text-[11px] font-mono">{distribution.irritated}%</span>
                  </div>
                </div>
              </div>

              {/* Dominant Mood of the Day */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between bg-amber-50/50 p-2.5 rounded-2xl">
                <div className="flex items-center gap-2">
                  <MoodAvatar mood={distribution.dominantMood} size="sm" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">
                      Dominant Mood of the Day
                    </span>
                    <span className="text-xs font-black text-slate-800 capitalize">
                      {distribution.dominantMood} ({distribution.happy}%)
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-amber-700 font-bold bg-amber-100/70 px-2 py-0.5 rounded-full">
                  Favorable Daylight
                </span>
              </div>
            </div>

            {/* Weather Impact CTA */}
            <div
              onClick={onOpenWeatherConditions}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl p-4 shadow-sm cursor-pointer hover:shadow-md transition flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-100">
                  Part 2: Deep Dive
                </span>
                <h4 className="text-sm font-extrabold mt-0.5">
                  Analyze Weather & Heat Conditions →
                </h4>
                <p className="text-[11px] text-white/90 mt-0.5">
                  Explore heat stress, irritability thresholds, and behavioral shifts.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-white" />
            </div>

            {/* Weather Factors vs Mood Influence */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs space-y-2.5">
              <div>
                <h3 className="text-xs font-bold text-slate-800">
                  Weather Factors vs Mood
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">
                  (Statistical Influence across observations)
                </p>
              </div>

              <div className="space-y-2 pt-1">
                {factorInfluences.map((factor, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-800">{factor.label}</span>
                      <span className="font-mono font-black" style={{ color: factor.color }}>
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
        ) : (
          /* Time-of-Day Shifts Tab */
          <div className="space-y-3">
            {[
              {
                period: 'Morning (06:00 – 12:00)',
                temp: '25°C',
                mood: 'calm' as const,
                desc: 'Fresh dawn light and lower temperatures promote steady calmness and mental focus.',
                icon: Sunrise,
              },
              {
                period: 'Afternoon (12:00 – 17:00)',
                temp: '32°C',
                mood: 'happy' as const,
                desc: 'Peak sunlight drives high optimism and social engagement before late cooling.',
                icon: Sun,
              },
              {
                period: 'Evening (17:00 – 21:00)',
                temp: '27°C',
                mood: 'happy' as const,
                desc: 'Golden hour sunset breeze encourages outdoor relaxation and unwinding.',
                icon: Sunset,
              },
              {
                period: 'Night (21:00 – 06:00)',
                temp: '23°C',
                mood: 'calm' as const,
                desc: 'Cool starlit night stabilizes nervous system into peaceful rest.',
                icon: Moon,
              },
            ].map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-3xl p-3.5 shadow-2xs flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <MoodAvatar mood={p.mood} size="md" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <IconComp className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-xs font-bold text-slate-800">{p.period}</span>
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded-md font-mono">
                          {p.temp}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {p.desc}
                      </p>
                    </div>
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
