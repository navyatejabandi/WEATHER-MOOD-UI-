import React, { useState } from 'react';
import { LiveWeatherData } from '../../types';
import { MapPin, Navigation, Search, X } from 'lucide-react';

interface LocationChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onSelectLocation: (city: string, temp: number, cond: string, condText: string) => void;
}

const PRESET_LOCATIONS = [
  { name: 'Hyderabad, TG', temp: 28, condition: 'mostly_clear', conditionText: 'Mostly clear' },
  { name: 'Bengaluru, KA', temp: 24, condition: 'cloudy', conditionText: 'Partly cloudy' },
  { name: 'Mumbai, MH', temp: 31, condition: 'rainy', conditionText: 'Passing showers' },
  { name: 'New Delhi, DL', temp: 33, condition: 'sunny', conditionText: 'Sunny' },
  { name: 'Tokyo, JP', temp: 19, condition: 'cloudy', conditionText: 'Overcast' },
  { name: 'London, UK', temp: 16, condition: 'rainy', conditionText: 'Light rain' },
  { name: 'San Francisco, US', temp: 17, condition: 'mostly_clear', conditionText: 'Mostly clear' },
];

export const LocationChangeModal: React.FC<LocationChangeModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = PRESET_LOCATIONS.filter((l) =>
    l.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Change Location</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
        </div>

        {/* GPS Option */}
        <button
          onClick={() => {
            onSelectLocation('Hyderabad, TG', 28, 'mostly_clear', 'Mostly clear');
            onClose();
          }}
          className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30 transition"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Use GPS (Hyderabad, TG)</span>
        </button>

        {/* List of locations */}
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {filtered.map((loc) => (
            <button
              key={loc.name}
              onClick={() => {
                onSelectLocation(loc.name, loc.temp, loc.condition, loc.conditionText);
                onClose();
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition ${
                currentLocation === loc.name
                  ? 'bg-purple-950/40 border-purple-500/60 text-white font-bold'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span>{loc.name}</span>
              <span className="font-mono text-slate-400">{loc.temp}°C</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
