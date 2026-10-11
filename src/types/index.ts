export type WeatherCondition =
  | 'sunny'
  | 'clear'
  | 'mostly_clear'
  | 'partly_cloudy'
  | 'cloudy'
  | 'rainy'
  | 'thunderstorm'
  | 'snowy';

export type MoodType = 'happy' | 'calm' | 'okay' | 'sad' | 'irritated';

export interface MoodMeta {
  type: MoodType;
  label: string;
  emoji: string;
  colorName: string;
  colorHex: string;
  bgPastel: string;
  borderHex: string;
  glowClass: string;
}

export interface LiveWeatherData {
  city: string;
  state: string;
  location: string;
  temp: number;
  temperature: number;
  condition: string;
  conditionText: string;
  high: number;
  highTemp: number;
  low: number;
  lowTemp: number;
  humidity: number;
  windSpeed: number;
  precipitation?: number;
  aqi: number;
  aqiStatus: string;
  pressure?: number;
  uvIndex?: string;
  currentTime: string;
  lastUpdated?: string;
}

export interface WeatherMoodEntry {
  id: string;
  timestamp: string;
  formattedDate: string;
  formattedTime: string;
  location: string;
  temperature: number;
  highTemp: number;
  lowTemp: number;
  condition: string;
  conditionText: string;
  humidity: number;
  windSpeed: number;
  aqi: number;
  aqiStatus: string;
  mood: MoodType;
  note?: string;
}

export interface EmailDigest {
  id: string;
  timestamp: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  preview: string;
  weatherSummary: {
    city: string;
    state: string;
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    aqi: number;
  };
  predictedMood: MoodType;
  moodProbability: number;
}

export type ScreenId =
  | 'HOME'
  | 'MOOD_INSIGHTS'
  | 'WEATHER_CONDITIONS'
  | 'PREDICTION'
  | 'LOG_MOOD'
  | 'LOCATION_RADAR'
  | 'LOGIN'
  | 'home'
  | 'log'
  | 'insights'
  | 'prediction'
  | 'timeline'
  | 'profile';

export type UIStyleMode = 'material3' | 'cupertino';
export type DeviceFrameMode = 'mobile' | 'responsive';
