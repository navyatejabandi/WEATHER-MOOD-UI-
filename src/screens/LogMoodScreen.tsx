import React, { useState } from 'react';
import { LiveWeatherData, MoodType, WeatherMoodEntry, ScreenId } from '../types';
import { MoodAvatar } from '../components/common/MoodAvatar';
import { ArrowLeft, MapPin, Clock, Edit3, Lightbulb } from 'lucide-react';
import { MeadowIllustration } from '../components/common/MeadowIllustration';
import confetti from 'canvas-confetti';

interface LogMoodScreenProps {
  weather: LiveWeatherData;
  initialMood?: MoodType | null;
  onSaveEntry: (entry: WeatherMoodEntry) => void;
  onBack: () => void;
  onOpenInsights: () => void;
  onOpenPrediction: () => void;
}

export const LogMoodScreen: React.FC<LogMoodScreenProps> = ({
  weather,
  initialMood,
  onSaveEntry,
  onBack,
  onOpenInsights,
  onOpenPrediction,
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodType>(initialMood || 'happy');
  const [note, setNote] = useState<string>('');

  const row1Moods: MoodType[] = ['happy', 'calm', 'okay'];
  const row2Moods: MoodType[] = ['sad', 'irritated'];

  const moodLabels: Record<MoodType, string> = {
    happy: 'Happy',
    calm: 'Calm',
    okay: 'Okay',
    sad: 'Sad',
    irritated: 'Irritated',
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    const newEntry: WeatherMoodEntry = {
      id: `entry-${Date.now()}`,
      timestamp: now.toISOString(),
      formattedDate,
      formattedTime,
      location: `${weather.city}, ${weather.state}`,
      temperature: weather.temp,
      highTemp: weather.high,
      lowTemp: weather.low,
      condition: weather.condition,
      conditionText: weather.condition,
      humidity: weather.humidity,
      windSpeed: weather.windSpeed,
      aqi: weather.aqi,
      aqiStatus: weather.aqiStatus,
      mood: selectedMood,
      note: note.trim() || undefined,
    };

    onSaveEntry(newEntry);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#FBBF24', '#34D399', '#8B5CF6', '#38BDF8'],
      });
    } catch {}

    onOpenInsights();
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#E0F2FE] via-[#F8FAFC] to-[#FEF3C7]/30 text-slate-800 pt-3 pb-24 select-none">
      <div className="px-5">
        {/* Header: Back arrow + Log Your Mood */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-white/80 transition-all"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-bold text-slate-800">
            Log Your Mood
          </h2>
          <div className="w-8" />
        </div>

        {/* Big Question */}
        <div className="text-center mt-1">
          <h1 className="text-xl font-extrabold text-slate-800 leading-snug">
            How's the weather
            <br />
            making you feel today?
          </h1>
          <p className="text-xs font-semibold text-slate-400 mt-1">
            Your mood + weather = better you!
          </p>
        </div>

        {/* Current Weather Card */}
        <div className="mt-4 bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-3 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0 text-xl">
              ☀️
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-extrabold text-slate-800 font-mono">
                  {weather.temp}°C
                </span>
                <span className="text-xs font-semibold text-slate-600">
                  {weather.condition}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5 font-medium">
                <MapPin className="w-3 h-3 text-indigo-500" />
                <span>{weather.city}, {weather.state}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{weather.currentTime}</span>
          </div>
        </div>

        {/* Mood Selection: 3 + 2 layout with cute MoodAvatar buttons */}
        <div className="space-y-3 pt-3">
          {/* Row 1: Happy, Calm, Okay */}
          <div className="flex items-center justify-center gap-5 sm:gap-6">
            {row1Moods.map((m) => {
              const isSelected = selectedMood === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedMood(m)}
                  className="flex flex-col items-center gap-1 group focus:outline-none transition active:scale-95"
                >
                  <div
                    className={`transition-all duration-200 rounded-full p-0.5 ${
                      isSelected
                        ? 'ring-4 ring-indigo-500 scale-110 shadow-md'
                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <MoodAvatar mood={m} size="lg" />
                  </div>
                  <span
                    className={`text-xs mt-1 transition-colors ${
                      isSelected ? 'font-black text-indigo-950' : 'font-semibold text-slate-600'
                    }`}
                  >
                    {moodLabels[m]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Row 2: Sad, Irritated */}
          <div className="flex items-center justify-center gap-6 pt-1">
            {row2Moods.map((m) => {
              const isSelected = selectedMood === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedMood(m)}
                  className="flex flex-col items-center gap-1 group focus:outline-none transition active:scale-95"
                >
                  <div
                    className={`transition-all duration-200 rounded-full p-0.5 ${
                      isSelected
                        ? 'ring-4 ring-indigo-500 scale-110 shadow-md'
                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <MoodAvatar mood={m} size="lg" />
                  </div>
                  <span
                    className={`text-xs mt-1 transition-colors ${
                      isSelected ? 'font-black text-indigo-950' : 'font-semibold text-slate-600'
                    }`}
                  >
                    {moodLabels[m]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Add Note Input */}
        <div className="relative mt-4">
          <div className="absolute left-3.5 top-3.5 text-indigo-500">
            <Edit3 className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note (optional)..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/95 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 shadow-xs focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
          />
        </div>

        {/* Save Entry Button */}
        <button
          type="button"
          onClick={() => handleSave()}
          className="w-full mt-3 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-purple-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>♡</span>
          <span>Save Entry</span>
        </button>

        {/* ML Tip / Info card */}
        <div className="mt-3.5 p-3.5 rounded-2xl bg-white/95 border border-slate-100 shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            Logging your mood helps the app learn your personal pattern and gives more accurate predictions.
          </p>
        </div>
      </div>

      {/* Bottom Meadow Floral Art */}
      <div className="pt-2">
        <MeadowIllustration />
      </div>
    </div>
  );
};
