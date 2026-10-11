import { MoodType, MoodMeta, WeatherMoodEntry, LiveWeatherData } from '../types';
import { formatCurrentTime } from '../utils/date';

export const MOODS: Record<MoodType, MoodMeta> = {
  happy: {
    type: 'happy',
    label: 'Happy',
    emoji: '😊',
    colorName: 'yellow',
    colorHex: '#EAB308',
    bgPastel: '#FEF9C3',
    borderHex: '#FACC15',
    glowClass: 'ring-3 ring-yellow-400 bg-yellow-100/90 shadow-md shadow-yellow-200/50',
  },
  calm: {
    type: 'calm',
    label: 'Calm',
    emoji: '😌',
    colorName: 'green',
    colorHex: '#22C55E',
    bgPastel: '#DCFCE7',
    borderHex: '#4ADE80',
    glowClass: 'ring-3 ring-emerald-400 bg-emerald-100/90 shadow-md shadow-emerald-200/50',
  },
  okay: {
    type: 'okay',
    label: 'Okay',
    emoji: '😐',
    colorName: 'orange',
    colorHex: '#F97316',
    bgPastel: '#FFEDD5',
    borderHex: '#FB923C',
    glowClass: 'ring-3 ring-orange-400 bg-orange-100/90 shadow-md shadow-orange-200/50',
  },
  sad: {
    type: 'sad',
    label: 'Sad',
    emoji: '😢',
    colorName: 'blue',
    colorHex: '#3B82F6',
    bgPastel: '#DBEAFE',
    borderHex: '#60A5FA',
    glowClass: 'ring-3 ring-blue-400 bg-blue-100/90 shadow-md shadow-blue-200/50',
  },
  irritated: {
    type: 'irritated',
    label: 'Irritated',
    emoji: '😠',
    colorName: 'red',
    colorHex: '#EF4444',
    bgPastel: '#FEE2E2',
    borderHex: '#F87171',
    glowClass: 'ring-3 ring-rose-400 bg-rose-100/90 shadow-md shadow-rose-200/50',
  },
};

export function getInitialWeather(): LiveWeatherData {
  const now = new Date();
  return {
    city: 'Hyderabad',
    state: 'TG',
    location: 'Hyderabad, TG',
    temp: 28,
    temperature: 28,
    condition: 'mostly_clear',
    conditionText: 'Mostly clear',
    high: 34,
    highTemp: 34,
    low: 23,
    lowTemp: 23,
    humidity: 55,
    windSpeed: 12,
    precipitation: 0,
    aqi: 103,
    aqiStatus: 'Poor',
    currentTime: formatCurrentTime(now),
    lastUpdated: 'Just now',
  };
}

export function generateInitialSeedEntries(): WeatherMoodEntry[] {
  const now = new Date();
  
  // Seed data offsets: 0 is today, 1 is yesterday, etc.
  const offsetsData: Array<{
    daysAgo: number;
    mood: MoodType;
    temp: number;
    cond: any;
    condText: string;
    time: string;
    note?: string;
  }> = [
    { daysAgo: 0, mood: 'happy', temp: 28, cond: 'mostly_clear', condText: 'Mostly clear', time: '07:55 PM', note: 'Pleasant evening breeze after productive day.' },
    { daysAgo: 1, mood: 'calm', temp: 32, cond: 'partly_cloudy', condText: 'Partly cloudy', time: '06:40 AM', note: 'Morning tea on terrace.' },
    { daysAgo: 2, mood: 'okay', temp: 27, cond: 'cloudy', condText: 'Cloudy', time: '08:15 PM', note: 'Overcast skies all day.' },
    { daysAgo: 3, mood: 'sad', temp: 26, cond: 'rainy', condText: 'Light rain', time: '09:20 AM', note: 'Gloomy downpour. Feeling tired after college.' },
    { daysAgo: 4, mood: 'irritated', temp: 30, cond: 'sunny', condText: 'Hot & Clear', time: '07:10 AM', note: 'Traffic and intense humidity.' },
    { daysAgo: 5, mood: 'calm', temp: 26, cond: 'mostly_clear', condText: 'Mostly clear', time: '07:20 PM' },
    { daysAgo: 6, mood: 'happy', temp: 31, cond: 'sunny', condText: 'Clear', time: '02:00 PM' },
    { daysAgo: 7, mood: 'okay', temp: 28, cond: 'cloudy', condText: 'Cloudy', time: '11:15 AM' },
    { daysAgo: 8, mood: 'calm', temp: 27, cond: 'partly_cloudy', condText: 'Partly cloudy', time: '08:30 AM' },
    { daysAgo: 9, mood: 'happy', temp: 29, cond: 'sunny', condText: 'Sunny', time: '09:00 AM' },
    { daysAgo: 10, mood: 'sad', temp: 25, cond: 'rainy', condText: 'Rainy', time: '04:00 PM', note: 'Heavy showers outside.' },
    { daysAgo: 11, mood: 'irritated', temp: 33, cond: 'sunny', condText: 'Sunny & humid', time: '06:15 PM' },
    { daysAgo: 12, mood: 'calm', temp: 27, cond: 'cloudy', condText: 'Cloudy', time: '08:00 AM' },
    { daysAgo: 13, mood: 'happy', temp: 30, cond: 'sunny', condText: 'Sunny', time: '12:45 PM' },
    { daysAgo: 14, mood: 'okay', temp: 29, cond: 'partly_cloudy', condText: 'Partly cloudy', time: '05:20 PM' },
    { daysAgo: 15, mood: 'sad', temp: 25, cond: 'rainy', condText: 'Drizzle', time: '07:10 PM' },
    { daysAgo: 16, mood: 'calm', temp: 28, cond: 'mostly_clear', condText: 'Clear sky', time: '09:15 AM' },
    { daysAgo: 17, mood: 'irritated', temp: 34, cond: 'sunny', condText: 'Intense sun', time: '03:30 PM' },
    { daysAgo: 18, mood: 'happy', temp: 31, cond: 'sunny', condText: 'Sunny', time: '11:00 AM' },
    { daysAgo: 19, mood: 'calm', temp: 28, cond: 'partly_cloudy', condText: 'Breezy', time: '06:00 PM' },
    { daysAgo: 20, mood: 'okay', temp: 27, cond: 'cloudy', condText: 'Overcast', time: '02:15 PM' },
  ];

  return offsetsData.map((d, index) => {
    const entryDate = new Date(now);
    entryDate.setDate(now.getDate() - d.daysAgo);
    
    const formattedDate = entryDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    
    return {
      id: `seed-entry-${index}-${d.daysAgo}`,
      timestamp: entryDate.toISOString(),
      formattedDate,
      formattedTime: d.time,
      location: 'Hyderabad, TG',
      temperature: d.temp,
      highTemp: d.temp + 4,
      lowTemp: d.temp - 5,
      condition: d.cond,
      conditionText: d.condText,
      humidity: d.cond === 'rainy' ? 82 : d.cond === 'cloudy' ? 64 : 52,
      windSpeed: 12,
      aqi: d.cond === 'rainy' ? 42 : 103,
      aqiStatus: d.cond === 'rainy' ? 'Good' : 'Poor',
      mood: d.mood,
      note: d.note,
    };
  });
}
