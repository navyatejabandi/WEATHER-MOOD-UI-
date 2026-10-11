import React, { useState } from 'react';
import { LiveWeatherData } from '../types';
import { ArrowLeft, MapPin, Navigation, Search, Check, Loader2, Compass, Globe } from 'lucide-react';
import { MeadowIllustration } from '../components/common/MeadowIllustration';

interface LocationRadarScreenProps {
  weather: LiveWeatherData;
  onBack: () => void;
  onUpdateWeather: (newWeather: LiveWeatherData) => void;
}

export const LocationRadarScreen: React.FC<LocationRadarScreenProps> = ({
  weather,
  onBack,
  onUpdateWeather,
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const cityPresets = [
    { city: 'Hyderabad', state: 'TG', temp: 28, condition: 'Mostly clear', humidity: 55, wind: 12, aqi: 103, aqiStatus: 'Poor' },
    { city: 'Mumbai', state: 'MH', temp: 31, condition: 'Humid & sunny', humidity: 78, wind: 16, aqi: 142, aqiStatus: 'Poor' },
    { city: 'Bengaluru', state: 'KA', temp: 24, condition: 'Pleasant & breezy', humidity: 52, wind: 14, aqi: 62, aqiStatus: 'Moderate' },
    { city: 'Delhi', state: 'DL', temp: 33, condition: 'Sunny & hazy', humidity: 46, wind: 9, aqi: 198, aqiStatus: 'Severe' },
    { city: 'New York', state: 'NY', temp: 19, condition: 'Mild autumn sun', humidity: 48, wind: 15, aqi: 35, aqiStatus: 'Good' },
    { city: 'London', state: 'UK', temp: 16, condition: 'Overcast & drizzle', humidity: 82, wind: 20, aqi: 28, aqiStatus: 'Good' },
    { city: 'Tokyo', state: 'JP', temp: 22, condition: 'Clear skies', humidity: 54, wind: 11, aqi: 40, aqiStatus: 'Good' },
    { city: 'Paris', state: 'FR', temp: 18, condition: 'Gentle breeze', humidity: 60, wind: 13, aqi: 42, aqiStatus: 'Good' },
  ];

  const filteredCities = cityPresets.filter((c) =>
    `${c.city} ${c.state}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCity = (c: typeof cityPresets[0]) => {
    onUpdateWeather({
      ...weather,
      city: c.city,
      state: c.state,
      location: `${c.city}, ${c.state}`,
      temp: c.temp,
      temperature: c.temp,
      condition: c.condition,
      conditionText: c.condition,
      high: c.temp + 4,
      highTemp: c.temp + 4,
      low: c.temp - 5,
      lowTemp: c.temp - 5,
      humidity: c.humidity,
      windSpeed: c.wind,
      aqi: c.aqi,
      aqiStatus: c.aqiStatus,
      lastUpdated: 'Just now',
    });
    setFeedback(`Updated location to ${c.city}`);
    setTimeout(() => {
      onBack();
    }, 400);
  };

  const handleDetectGps = () => {
    setIsDetecting(true);
    setFeedback('Requesting GPS permission from device...');
    try {
      if (!navigator.geolocation) {
        setFeedback('Geolocation not supported');
        setIsDetecting(false);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onUpdateWeather({
            ...weather,
            city: 'Current Location',
            state: 'GPS',
            location: 'Current Location (GPS)',
            lastUpdated: 'Just now',
          });
          setFeedback('Detected: Current Location (GPS)');
          setTimeout(() => {
            setIsDetecting(false);
            onBack();
          }, 800);
        },
        () => {
          setFeedback('Unable to detect location. Please check browser permissions.');
          setTimeout(() => setFeedback(null), 3000);
          setIsDetecting(false);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } catch {
      setFeedback('Error detecting GPS');
      setIsDetecting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#E0F2FE] via-[#F8FAFC] to-[#F1F5F9] text-slate-800 pb-24 select-none">
      <div className="px-5 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={onBack}
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-white/80 transition-all flex items-center gap-1"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xs font-semibold">Back</span>
          </button>

          <div className="text-center">
            <h2 className="text-base font-extrabold text-slate-800">
              Location Radar & Coordinates
            </h2>
            <div className="text-[10px] text-slate-400 font-medium">
              Global Geolocation, Readings & Regional Zones
            </div>
          </div>

          <div className="w-8" />
        </div>

        {/* GPS Auto Detect CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-4 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-indigo-200" />
              <h3 className="text-xs font-bold text-white">Device GPS Radar</h3>
            </div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
              Active
            </span>
          </div>

          <p className="text-[11px] text-indigo-100/90 mb-3">
            Synchronize live atmospheric sensors with your exact geographic coordinates.
          </p>

          <button
            type="button"
            onClick={handleDetectGps}
            disabled={isDetecting}
            className="w-full py-2.5 rounded-xl bg-white text-indigo-600 font-bold text-xs shadow-sm hover:bg-indigo-50 transition flex items-center justify-center gap-2 active:scale-98"
          >
            {isDetecting ? (
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
            ) : (
              <Compass className="w-4 h-4 text-indigo-600" />
            )}
            <span>{isDetecting ? 'Detecting Coordinates...' : 'Detect My Real GPS Location'}</span>
          </button>

          {feedback && (
            <div className="mt-2 text-center text-[11px] font-bold text-indigo-100 bg-white/10 py-1 rounded-lg">
              {feedback}
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="relative mb-3.5">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city or region..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
          />
        </div>

        {/* City Presets List */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-700 px-1 flex items-center justify-between">
            <span>Popular Weather Zones</span>
            <span className="text-[10px] text-slate-400">{filteredCities.length} locations</span>
          </div>

          <div className="space-y-2">
            {filteredCities.map((c) => {
              const isCurrent = weather.city.toLowerCase() === c.city.toLowerCase();
              return (
                <div
                  key={c.city}
                  onClick={() => handleSelectCity(c)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isCurrent
                      ? 'bg-indigo-50/80 border-indigo-200 shadow-xs'
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-sm">
                      📍
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <span>{c.city}, {c.state}</span>
                        {isCurrent && (
                          <span className="text-[9px] font-extrabold text-indigo-600 bg-white px-1.5 py-0.2 rounded-full border border-indigo-200">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        {c.condition} · AQI: {c.aqi} ({c.aqiStatus})
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black font-mono text-slate-800">
                      {c.temp}°C
                    </span>
                    <div className="text-[9px] text-slate-400">
                      💧 {c.humidity}% · 💨 {c.wind}km/h
                    </div>
                  </div>
                </div>
              );
            })}
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
