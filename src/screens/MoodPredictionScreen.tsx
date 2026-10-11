import React, { useState } from 'react';
import { WeatherMoodEntry, LiveWeatherData, ScreenId } from '../types';
import { MOODS } from '../constants/moods';
import { ArrowLeft, Calendar, MapPin, Clock } from 'lucide-react';
import { MeadowIllustration } from '../components/common/MeadowIllustration';

interface MoodPredictionScreenProps {
  weather: LiveWeatherData;
  entries: WeatherMoodEntry[];
  onNavigate: (screen: ScreenId) => void;
}

export const MoodPredictionScreen: React.FC<MoodPredictionScreenProps> = ({
  weather,
  entries,
  onNavigate,
}) => {
  const [showSimilarModal, setShowSimilarModal] = useState(false);

  // Probabilities matching Screen 5 in new image:
  const probabilities = [
    { mood: 'happy' as const, label: 'Happy', emoji: '😊', probability: 54, color: '#EAB308' },
    { mood: 'calm' as const, label: 'Calm', emoji: '😌', probability: 22, color: '#22C55E' },
    { mood: 'okay' as const, label: 'Okay', emoji: '😐', probability: 12, color: '#F97316' },
    { mood: 'sad' as const, label: 'Sad', emoji: '😢', probability: 8, color: '#3B82F6' },
    { mood: 'irritated' as const, label: 'Irritated', emoji: '😠', probability: 4, color: '#EF4444' },
  ];

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-gradient-to-b from-sky-100 via-sky-50 to-amber-50/40 text-slate-800 p-4 sm:p-5 pb-2">
      <div className="space-y-3.5">
        {/* Top Bar */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => onNavigate('home')}
            className="p-1 rounded-full text-slate-700 hover:text-slate-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-extrabold text-slate-900">Mood Prediction</h1>
          <div className="w-5" />
        </div>

        {/* Cute Sleeping Cloud + Sun in Sky */}
        <div className="flex items-center justify-center py-1">
          <div className="relative flex items-center justify-center">
            <span className="text-5xl filter drop-shadow-sm select-none">☀️☁️</span>
            <span className="absolute -top-1 -right-3 text-xs text-amber-400">✨</span>
          </div>
        </div>

        {/* Explanation Card */}
        <div className="p-3.5 rounded-2xl bg-white/95 shadow-sm border border-slate-100 text-center">
          <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
            Based on your past data, the current weather conditions are associated with the following mood probabilities.
          </p>
        </div>

        {/* Dominant Predicted Mood Card (Happy 54% matching Screen 5) */}
        <div className="p-4 rounded-3xl bg-amber-50/80 border border-amber-200/80 shadow-xs space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 rounded-full bg-yellow-100 border border-yellow-200 flex items-center justify-center text-3xl shadow-xs shrink-0">
              😊
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">
                Happy
              </h2>
              <div className="text-sm font-extrabold text-amber-600 font-mono">
                54% probability
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-600 font-medium leading-snug pt-1">
            Sunny and comfortable temperature conditions are most similar to your happier days.
          </p>
        </div>

        {/* Mood Probabilities (Current Conditions) */}
        <div className="p-3.5 rounded-3xl bg-white/95 shadow-sm border border-slate-100 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-900">
            Mood Probabilities (Current Conditions)
          </h3>

          <div className="space-y-2">
            {probabilities.map((item) => (
              <div key={item.mood} className="flex items-center justify-between text-xs gap-3">
                <div className="flex items-center gap-1.5 w-18">
                  <span>{item.emoji}</span>
                  <span className="text-[11px] font-semibold text-slate-700">{item.label}</span>
                </div>

                {/* Horizontal Progress Bar */}
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${item.probability}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>

                <span className="font-mono text-xs tabular-nums font-bold w-8 text-right text-slate-700">
                  {item.probability}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Weather (Used for Predictions) */}
        <div className="p-3.5 rounded-3xl bg-white/95 shadow-sm border border-slate-100 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Current Weather (Used for Predictions)
          </span>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">☀️</span>
              <div className="text-xs font-bold text-slate-900">
                {weather.temperature}°C <span className="font-normal text-slate-600">Mostly clear</span>
              </div>
            </div>
            <div className="text-right text-[10px] text-slate-500 font-medium font-mono">
              <span>{weather.location} | {weather.currentTime}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 pt-1 border-t border-slate-100 text-center text-[10px]">
            <div className="flex items-center justify-center gap-1 text-slate-600">
              <span>💧</span> <span>Humidity <strong>{weather.humidity}%</strong></span>
            </div>
            <div className="flex items-center justify-center gap-1 text-slate-600">
              <span>💨</span> <span>Wind <strong>{weather.windSpeed} km/h</strong></span>
            </div>
            <div className="flex items-center justify-center gap-1 text-slate-600">
              <span>🍃</span> <span>AQI <strong className="text-rose-500">{weather.aqi}</strong></span>
            </div>
          </div>
        </div>

        {/* View Similar Past Days Button */}
        <div className="space-y-1">
          <button
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-xl p-5 space-y-3 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900">Similar Past Days</h3>
              <button
                onClick={() => setShowSimilarModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[50vh] pr-1">
              {entries.slice(0, 5).map((e) => (
                <div key={e.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-800">{e.formattedDate}</div>
                    <div className="text-[10px] text-slate-500">{e.temperature}°C · {e.conditionText}</div>
                  </div>
                  <div
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                    style={{ backgroundColor: `${MOODS[e.mood].colorHex}20`, color: MOODS[e.mood].colorHex }}
                  >
                    {MOODS[e.mood].emoji} {MOODS[e.mood].label}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowSimilarModal(false)}
              className="w-full py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
