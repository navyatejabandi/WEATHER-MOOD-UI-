import React, { useState } from 'react';
import { LiveWeatherData, WeatherMoodEntry } from '../types';
import { MoodAvatar } from '../components/common/MoodAvatar';
import { WeatherIllustration } from '../components/common/WeatherIllustration';
import { ArrowLeft, Calendar, Sparkles, Droplets, Wind, Leaf, Clock, X } from 'lucide-react';
import { MeadowIllustration } from '../components/common/MeadowIllustration';

interface PredictionScreenProps {
  weather: LiveWeatherData;
  entries?: WeatherMoodEntry[];
  onBack: () => void;
  onOpenHome: () => void;
  onOpenLogMood: () => void;
  onOpenMoodInsights: () => void;
  onOpenWeatherConditions: () => void;
}

export const PredictionScreen: React.FC<PredictionScreenProps> = ({
  weather,
  entries = [],
  onBack,
  onOpenHome,
  onOpenLogMood,
  onOpenMoodInsights,
  onOpenWeatherConditions,
}) => {
  const [showSimilarModal, setShowSimilarModal] = useState(false);

  // Probabilities matching weather-mood-bice
  const probabilities = [
    { mood: 'happy' as const, label: 'Happy', probability: 54, color: '#FBBF24' },
    { mood: 'calm' as const, label: 'Calm', probability: 22, color: '#34D399' },
    { mood: 'okay' as const, label: 'Okay', probability: 12, color: '#FB923C' },
    { mood: 'sad' as const, label: 'Sad', probability: 8, color: '#60A5FA' },
    { mood: 'irritated' as const, label: 'Irritated', probability: 4, color: '#F87171' },
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#E0F2FE] via-[#F8FAFC] to-[#F1F5F9] text-slate-800 pb-24 select-none">
      <div className="px-5 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={onBack}
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-white/80 transition-all flex items-center gap-1"
            title="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xs font-semibold">Home</span>
          </button>

          <h2 className="text-sm font-extrabold text-slate-800">
            Mood Prediction (ML)
          </h2>

          <WeatherIllustration size="sm" className="w-8 h-7" />
        </div>

        <p className="text-center text-xs text-slate-500 font-medium px-4 leading-relaxed mt-1">
          Machine Learning models synthesize atmospheric variables to estimate mood probabilities with Bayesian recalibration.
        </p>

        {/* Highlighted Dominant Predicted Mood Card */}
        <div className="mt-3.5 bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <MoodAvatar mood="happy" size="lg" className="shrink-0" />
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-xl font-black text-slate-800 font-heading">
                  Happy
                </h3>
                <span className="text-xs font-extrabold text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 font-mono">
                  54% probability
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug mt-1">
                Sunny skies and comfortable temperature ({weather.temp}°C) closely match past days where users reported elevated contentment.
              </p>
            </div>
          </div>
        </div>

        {/* Mood Probabilities List (All 5 Classes) */}
        <div className="mt-4">
          <div className="text-xs font-bold text-slate-700 mb-2 px-1 flex items-center justify-between">
            <span>Mood Probabilities (Current Conditions)</span>
            <span className="text-[10px] text-slate-400">All 5 Classes</span>
          </div>

          <div className="space-y-2.5 bg-white border border-slate-200/80 rounded-3xl p-3.5 shadow-2xs">
            {probabilities.map((item) => (
              <div key={item.mood} className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-2 w-20 shrink-0">
                  <MoodAvatar mood={item.mood} size="sm" />
                  <span className="font-semibold text-slate-700 text-[11px]">
                    {item.label}
                  </span>
                </div>

                <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${item.probability}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>

                <span className="w-9 text-right font-bold text-slate-700 text-[11px] font-mono">
                  {item.probability}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Weather (Used for Predictions) */}
        <div className="mt-4 bg-white border border-slate-200/90 rounded-3xl p-3.5 shadow-2xs space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Current Weather (Used for Predictions)
          </span>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">☀️</span>
              <div className="text-xs font-bold text-slate-900">
                {weather.temp}°C <span className="font-normal text-slate-600">{weather.condition}</span>
              </div>
            </div>

            <div className="text-right text-[10px] text-slate-500 font-medium font-mono">
              <span>{weather.city}, {weather.state} | {weather.currentTime}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-slate-100 text-center text-[10px]">
            <div className="flex items-center justify-center gap-1 text-slate-600">
              <Droplets className="w-3 h-3 text-sky-500" />
              <span>Humidity <strong>{weather.humidity}%</strong></span>
            </div>
            <div className="flex items-center justify-center gap-1 text-slate-600">
              <Wind className="w-3 h-3 text-indigo-500" />
              <span>Wind <strong>{weather.windSpeed} km/h</strong></span>
            </div>
            <div className="flex items-center justify-center gap-1 text-slate-600">
              <Leaf className="w-3 h-3 text-emerald-500" />
              <span>AQI <strong className="text-amber-600">{weather.aqi}</strong></span>
            </div>
          </div>
        </div>

        {/* View Similar Past Days Button */}
        <div className="mt-4 space-y-1">
          <button
            type="button"
            onClick={() => setShowSimilarModal(true)}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>View Similar Past Days →</span>
          </button>
          <p className="text-center text-[10px] text-slate-500">
            See previous days with similar weather and the mood you felt.
          </p>
        </div>
      </div>

      {/* Bottom Meadow Floral Art */}
      <div className="pt-2">
        <MeadowIllustration />
      </div>

      {/* Similar Past Days Modal */}
      {showSimilarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-5 space-y-3 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">Similar Weather History</h3>
                <p className="text-[10px] text-slate-400">Past days with ~{weather.temp}°C & sunny skies</p>
              </div>
              <button
                type="button"
                onClick={() => setShowSimilarModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[50vh] pr-1">
              {[
                { date: 'Yesterday', temp: 28, mood: 'happy' as const, note: 'Pleasant evening breeze after productive day.' },
                { date: '3 days ago', temp: 27, mood: 'calm' as const, note: 'Morning tea on terrace.' },
                { date: '5 days ago', temp: 29, mood: 'happy' as const, note: 'Warm sunny afternoon walk.' },
                { date: '8 days ago', temp: 28, mood: 'okay' as const, note: 'Mild afternoon.' },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <MoodAvatar mood={item.mood} size="sm" />
                    <div>
                      <div className="font-bold text-slate-800">{item.date} · {item.temp}°C</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[180px]">"{item.note}"</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full capitalize font-mono">
                    {item.mood}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowSimilarModal(false)}
              className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
