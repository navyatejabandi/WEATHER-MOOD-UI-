import React, { useState, useEffect } from 'react';
import { LiveWeatherData, EmailDigest, ScreenId } from '../types';
import { WeatherIllustration } from '../components/common/WeatherIllustration';
import { WeatherMoodService, HourlyForecastItem, DailyForecastItem } from '../utils/weatherMoodCalculations';
import {
  MapPin,
  Clock,
  Droplets,
  Wind,
  Leaf,
  Compass,
  Mail,
  Settings,
  ChevronRight,
  TrendingUp,
  Gauge,
  Sun,
  Loader2,
  Navigation,
} from 'lucide-react';
import { MeadowIllustration } from '../components/common/MeadowIllustration';

interface HomeScreenProps {
  weather: LiveWeatherData;
  currentUser?: { name: string; identifier: string } | null;
  lastSentEmail?: EmailDigest | null;
  onOpenMoodInsights: () => void;
  onOpenWeatherConditions: () => void;
  onOpenPrediction: () => void;
  onOpenLogMood: () => void;
  onOpenSettings: () => void;
  onOpenEmailViewer: () => void;
  onOpenLocationRadar: () => void;
  onUpdateWeather: (newWeather: LiveWeatherData) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  weather,
  currentUser,
  lastSentEmail,
  onOpenMoodInsights,
  onOpenWeatherConditions,
  onOpenPrediction,
  onOpenLogMood,
  onOpenSettings,
  onOpenEmailViewer,
  onOpenLocationRadar,
  onUpdateWeather,
}) => {
  const [showEmailBanner, setShowEmailBanner] = useState(true);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>(() =>
    WeatherMoodService.getCurrentTimeString()
  );
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsFeedback, setGpsFeedback] = useState<string | null>(null);

  // Keep clock updated live
  useEffect(() => {
    const tick = () => {
      setCurrentTimeStr(WeatherMoodService.getCurrentTimeString());
    };
    const timer = setInterval(tick, 10000);
    return () => clearInterval(timer);
  }, []);

  // Compute hourly items & dynamically correct 7-day forecast
  const hourlyItems: HourlyForecastItem[] = WeatherMoodService.generateHourlyForecast(weather);
  const dailyForecast: DailyForecastItem[] = WeatherMoodService.generate7DayForecast(weather);

  // Auto-detect GPS location
  const handleAutoDetectGps = async () => {
    setIsDetectingGps(true);
    setGpsFeedback('Detecting GPS...');
    try {
      if (!navigator.geolocation) throw new Error('Geolocation not supported');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          onUpdateWeather({
            ...weather,
            city: 'Current Location',
            state: 'GPS',
            location: 'Current Location (GPS)',
            lastUpdated: 'Just now',
          });
          setGpsFeedback('GPS Synced');
          setTimeout(() => setGpsFeedback(null), 3000);
          setIsDetectingGps(false);
        },
        () => {
          setGpsFeedback('GPS Access Denied');
          setTimeout(() => setGpsFeedback(null), 3000);
          setIsDetectingGps(false);
        },
        { timeout: 8000 }
      );
    } catch {
      setGpsFeedback('Location Unavailable');
      setTimeout(() => setGpsFeedback(null), 3000);
      setIsDetectingGps(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#E0F2FE] via-[#F8FAFC] to-[#F1F5F9] text-slate-800 pb-24 select-none">
      <div className="px-5 pt-4 pb-2">
        {/* Top Header: Brand Wordmark + Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WeatherIllustration size="sm" className="w-10 h-8" />
            <div>
              <div className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight flex items-center">
                <span className="text-[#3B82F6]">Weather</span>
                <span className="text-[#8B5CF6]">Mood</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                Current Weather Forecast
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Location Radar button */}
            <button
              type="button"
              onClick={onOpenLocationRadar}
              className="p-1.5 text-slate-500 hover:text-indigo-600 rounded-full hover:bg-white/80 transition-all"
              title="Detailed Location Radar & Coordinates"
            >
              <Compass className="w-4 h-4" />
            </button>

            {/* Email Digest Viewer button with notification ping */}
            <button
              type="button"
              onClick={onOpenEmailViewer}
              className="relative p-1.5 text-slate-500 hover:text-indigo-600 rounded-full hover:bg-white/80 transition-all"
              title="View Sent WeatherMood Email Digest"
            >
              <Mail className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
            </button>

            {/* Settings button */}
            <button
              type="button"
              onClick={onOpenSettings}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-full hover:bg-white/80 transition-all"
              title="Settings & Preferences"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Email Notification banner if exists */}
        {showEmailBanner && lastSentEmail && (
          <div className="mt-2.5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/80 rounded-2xl p-2.5 flex items-center justify-between text-xs text-indigo-900 shadow-2xs">
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="text-sm">✉️</span>
              <span className="text-[11px] truncate">
                Forecast digest sent to <strong>{lastSentEmail.recipientEmail}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onOpenEmailViewer}
                className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-md hover:bg-indigo-700 transition"
              >
                View
              </button>
              <button
                type="button"
                onClick={() => setShowEmailBanner(false)}
                className="text-slate-400 hover:text-slate-600 text-xs px-1"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* City & Live Clock Bar */}
        <div className="flex items-center justify-between mt-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
            <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
            <button
              type="button"
              onClick={onOpenLocationRadar}
              className="hover:text-indigo-600 flex items-center gap-1 font-bold text-left transition"
              title="Click to view full location radar"
            >
              <span className="truncate max-w-[150px] font-bold">
                {weather.city}, {weather.state}
              </span>
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            <button
              type="button"
              onClick={handleAutoDetectGps}
              disabled={isDetectingGps}
              className="ml-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2 py-0.5 rounded-full flex items-center gap-1 transition-all shrink-0 active:scale-95"
              title="Auto-detect current GPS location"
            >
              {isDetectingGps ? (
                <Loader2 className="w-2.5 h-2.5 animate-spin" />
              ) : (
                <Navigation className="w-2.5 h-2.5" />
              )}
              <span>{gpsFeedback || 'GPS'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold bg-white/70 px-2 py-0.5 rounded-full border border-slate-200/60 shadow-2xs shrink-0 font-mono">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>{currentTimeStr}</span>
          </div>
        </div>

        {/* Main Weather Card */}
        <div className="mt-3 relative bg-gradient-to-br from-white/95 to-sky-50/90 backdrop-blur-sm border border-sky-100 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            {/* Left: Weather Illustration */}
            <div className="relative">
              <WeatherIllustration size="md" className="w-24 h-20" />
            </div>

            {/* Right: Temp, Condition, High/Low */}
            <div className="text-right space-y-0.5">
              <div className="flex items-baseline justify-end">
                <span className="text-4xl font-extrabold text-slate-800 tracking-tight font-heading">
                  {weather.temp}°
                </span>
                <span className="text-xl font-bold text-slate-500 ml-0.5">C</span>
              </div>
              <div className="text-xs font-bold text-slate-600">{weather.condition}</div>
              <div className="text-[11px] font-medium text-slate-400">
                High: {weather.high}°C · Low: {weather.low}°C
              </div>
            </div>
          </div>

          {/* Stats Grid 1: Humidity, Wind, AQI */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100/80 text-center">
            <div className="bg-white/80 border border-slate-100 rounded-2xl py-2 px-1 flex flex-col items-center">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-sky-600">
                <Droplets className="w-3.5 h-3.5 text-sky-500" />
                <span>Humidity</span>
              </div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">{weather.humidity}%</div>
            </div>

            <div className="bg-white/80 border border-slate-100 rounded-2xl py-2 px-1 flex flex-col items-center">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600">
                <Wind className="w-3.5 h-3.5 text-indigo-500" />
                <span>Wind</span>
              </div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">{weather.windSpeed} km/h</div>
            </div>

            <div className="bg-white/80 border border-slate-100 rounded-2xl py-2 px-1 flex flex-col items-center">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                <span>AQI</span>
              </div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">
                {weather.aqi}{' '}
                <span className="text-[10px] text-amber-600 font-medium">({weather.aqiStatus})</span>
              </div>
            </div>
          </div>

          {/* Stats Grid 2: Rain Chance, Pressure, UV Index */}
          <div className="grid grid-cols-3 gap-2 mt-2 text-center">
            <div className="bg-white/60 border border-slate-100 rounded-2xl py-1.5 px-1 flex flex-col items-center">
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                <Droplets className="w-3 h-3 text-blue-500" />
                <span>Rain Chance</span>
              </div>
              <div className="text-[11px] font-bold text-slate-700">{weather.precipitation}%</div>
            </div>

            <div className="bg-white/60 border border-slate-100 rounded-2xl py-1.5 px-1 flex flex-col items-center">
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                <Gauge className="w-3 h-3 text-purple-500" />
                <span>Pressure</span>
              </div>
              <div className="text-[11px] font-bold text-slate-700">1013 hPa</div>
            </div>

            <div className="bg-white/60 border border-slate-100 rounded-2xl py-1.5 px-1 flex flex-col items-center">
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                <Sun className="w-3 h-3 text-amber-500" />
                <span>UV Index</span>
              </div>
              <div className="text-[11px] font-bold text-slate-700">5.4 Mod</div>
            </div>
          </div>
        </div>

        {/* Hourly Weather Forecast (Today) */}
        <div className="mt-4">
          <div className="text-xs font-bold text-slate-700 mb-2 px-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Hourly Weather Forecast ({weather.city})</span>
            </span>
            <span className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
              Today
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 pt-0.5 scrollbar-none no-scrollbar">
            {hourlyItems.map((item, idx) => (
              <div
                key={idx}
                className="shrink-0 w-20 bg-white border border-slate-200/90 rounded-2xl p-2 text-center shadow-2xs flex flex-col items-center"
              >
                <span className="text-[10px] font-bold text-slate-500 font-mono">{item.hour}</span>
                <div className="my-1 text-base select-none">
                  {item.icon === 'sun' && '☀️'}
                  {item.icon === 'cloud-sun' && '🌤️'}
                  {item.icon === 'cloud' && '☁️'}
                  {item.icon === 'sunset' && '🌇'}
                </div>
                <span className="text-xs font-bold text-slate-800 font-mono">{item.temp}°C</span>
                <span className="text-[9px] font-semibold text-sky-600 mt-0.5 flex items-center gap-0.5 font-mono">
                  <Droplets className="w-2.5 h-2.5" />
                  <span>{item.rainChance}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Weather Forecast with DYNAMICALLY CORRECT WEEKDAY DATES */}
        <div className="mt-4 bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>7-Day Weather Forecast</span>
            </span>
            <span className="text-[10px] text-slate-400">
              {weather.city}, {weather.state}
            </span>
          </div>

          <div className="space-y-2">
            {dailyForecast.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1">
                <span className="w-20 font-semibold text-slate-700">
                  {item.day}{' '}
                  <span className="text-[9px] text-slate-400 block font-normal font-mono">
                    {item.fullDate}
                  </span>
                </span>
                <span className="text-base shrink-0 select-none">{item.icon}</span>
                <span className="flex-1 text-center text-[11px] text-slate-500 truncate px-2 font-medium">
                  {item.cond}
                </span>
                <span className="w-12 text-center text-[10px] text-sky-600 font-semibold font-mono">
                  {item.rain}
                </span>
                <span className="w-16 text-right font-bold text-slate-800 font-mono">
                  {item.high}° / <span className="text-slate-400 font-normal">{item.low}°</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Mood Analysis Banner */}
        <div
          onClick={onOpenMoodInsights}
          className="mt-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer group flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-1.5 text-blue-200 text-[10px] font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Explore Mood Analysis</span>
            </div>
            <h4 className="text-sm font-extrabold mt-0.5">
              See Today's Mood Distribution →
            </h4>
            <p className="text-[11px] text-indigo-100/90 mt-0.5">
              Discover how this {weather.temp}°C weather impacts mood across today.
            </p>
          </div>
          <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
            <ChevronRight className="w-5 h-5 text-white" />
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
