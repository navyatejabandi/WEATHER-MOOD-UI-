import React, { useState, useEffect } from 'react';
import {
  LiveWeatherData,
  WeatherMoodEntry,
  ScreenId,
  EmailDigest,
  UIStyleMode,
  DeviceFrameMode,
} from './types';
import { WeatherMoodService } from './utils/weatherMoodCalculations';
import { FlutterNavigationBar } from './components/flutter/FlutterNavigationBar';
import { FlutterSnackBar } from './components/flutter/FlutterSnackBar';
import { FlutterWidgetInspector } from './components/flutter/FlutterWidgetInspector';
import { HomeScreen } from './screens/HomeScreen';
import { MoodInsightsScreen } from './screens/MoodInsightsScreen';
import { WeatherConditionsScreen } from './screens/WeatherConditionsScreen';
import { PredictionScreen } from './screens/PredictionScreen';
import { LogMoodScreen } from './screens/LogMoodScreen';
import { LocationRadarScreen } from './screens/LocationRadarScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SettingsModal } from './components/modals/SettingsModal';
import { EmailViewerModal } from './components/modals/EmailViewerModal';
import {
  Smartphone,
  Monitor,
  Code2,
  Wifi,
  BatteryCharging,
  LogIn,
} from 'lucide-react';

const STORAGE_KEY = 'weathermood_records_v7';
const USER_STORAGE_KEY = 'wm_auth_user_v7';

export default function App() {
  const [currentUser, setCurrentUser] = useState<{ name: string; identifier: string } | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    // Default to active explorer
    return { name: 'Weather Explorer', identifier: 'demo@example.com' };
  });

  const [currentScreen, setCurrentScreen] = useState<ScreenId>('HOME');
  const [uiStyle, setUiStyle] = useState<UIStyleMode>('material3');
  const [deviceMode, setDeviceMode] = useState<DeviceFrameMode>('mobile');

  // Weather state initialized to Hyderabad, TG matching weather-mood-bice.vercel.app
  const [weather, setWeather] = useState<LiveWeatherData>(() => ({
    city: 'Hyderabad',
    state: 'TG',
    location: 'Hyderabad, TG',
    temp: 28,
    temperature: 28,
    condition: 'Mostly clear',
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
    pressure: 1013,
    uvIndex: '5.4 Mod',
    currentTime: WeatherMoodService.getCurrentTimeString(),
  }));

  // Initial Email Digest matching weather-mood-bice
  const [lastSentEmail, setLastSentEmail] = useState<EmailDigest | null>(() => ({
    id: 'digest-001',
    timestamp: new Date().toISOString(),
    recipientEmail: currentUser?.identifier || 'demo@example.com',
    recipientName: currentUser?.name || 'Weather Explorer',
    subject: `🌤️ Your WeatherMood Daily Briefing (Hyderabad, TG)`,
    preview: `Atmospheric mood analysis for Hyderabad: 28°C Mostly clear, Happy likelihood 54%`,
    weatherSummary: {
      city: 'Hyderabad',
      state: 'TG',
      temp: 28,
      condition: 'Mostly clear',
      humidity: 55,
      windSpeed: 12,
      aqi: 103,
    },
    predictedMood: 'happy',
    moodProbability: 54,
  }));

  // Entries
  const [entries, setEntries] = useState<WeatherMoodEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEmailViewerOpen, setIsEmailViewerOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  // SnackBar notification
  const [snackMessage, setSnackMessage] = useState<string>('');
  const [isSnackOpen, setIsSnackOpen] = useState<boolean>(false);

  // Keep live time synchronized every 15s
  useEffect(() => {
    const updateLiveTime = () => {
      const timeStr = WeatherMoodService.getCurrentTimeString();
      setWeather((prev) => ({
        ...prev,
        currentTime: timeStr,
      }));
    };
    const timer = setInterval(updateLiveTime, 15000);
    return () => clearInterval(timer);
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {}
  }, [entries]);

  // Save currentUser
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch {}
  }, [currentUser]);

  const handleSaveEntry = (newEntry: WeatherMoodEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
    setSnackMessage('♡ Mood entry saved with weather snapshot!');
    setIsSnackOpen(true);
  };

  const handleLoginSuccess = (user: { name: string; identifier: string }) => {
    setCurrentUser(user);
    const digest: EmailDigest = {
      id: `digest-${Date.now()}`,
      timestamp: new Date().toISOString(),
      recipientEmail: user.identifier,
      recipientName: user.name,
      subject: `🌤️ Your WeatherMood Daily Briefing (${weather.city})`,
      preview: `Atmospheric forecast for ${weather.city}: ${weather.temp}°C, Happy likelihood 54%`,
      weatherSummary: {
        city: weather.city,
        state: weather.state,
        temp: weather.temp,
        condition: weather.condition,
        humidity: weather.humidity,
        windSpeed: weather.windSpeed,
        aqi: weather.aqi,
      },
      predictedMood: 'happy',
      moodProbability: 54,
    };
    setLastSentEmail(digest);
    setCurrentScreen('HOME');
    setSnackMessage(`Signed in as ${user.name}`);
    setIsSnackOpen(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('LOGIN');
    setSnackMessage('Signed out');
    setIsSnackOpen(true);
  };

  const handleResetData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setEntries([]);
    setWeather({
      city: 'Hyderabad',
      state: 'TG',
      location: 'Hyderabad, TG',
      temp: 28,
      temperature: 28,
      condition: 'Mostly clear',
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
      pressure: 1013,
      uvIndex: '5.4 Mod',
      currentTime: WeatherMoodService.getCurrentTimeString(),
    });
    setSnackMessage('Local data reset to default Hyderabad conditions');
    setIsSnackOpen(true);
  };

  // Render Screen
  const renderScreen = () => {
    if (!currentUser && currentScreen === 'LOGIN') {
      return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
    }

    switch (currentScreen) {
      case 'HOME':
        return (
          <HomeScreen
            weather={weather}
            currentUser={currentUser}
            lastSentEmail={lastSentEmail}
            onOpenMoodInsights={() => setCurrentScreen('MOOD_INSIGHTS')}
            onOpenWeatherConditions={() => setCurrentScreen('WEATHER_CONDITIONS')}
            onOpenPrediction={() => setCurrentScreen('PREDICTION')}
            onOpenLogMood={() => setCurrentScreen('LOG_MOOD')}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenEmailViewer={() => setIsEmailViewerOpen(true)}
            onOpenLocationRadar={() => setCurrentScreen('LOCATION_RADAR')}
            onUpdateWeather={(newW) => setWeather(newW)}
          />
        );

      case 'MOOD_INSIGHTS':
        return (
          <MoodInsightsScreen
            weather={weather}
            onOpenHome={() => setCurrentScreen('HOME')}
            onOpenWeatherConditions={() => setCurrentScreen('WEATHER_CONDITIONS')}
            onOpenPrediction={() => setCurrentScreen('PREDICTION')}
            onOpenLogMood={() => setCurrentScreen('LOG_MOOD')}
          />
        );

      case 'WEATHER_CONDITIONS':
        return (
          <WeatherConditionsScreen
            weather={weather}
            onOpenHome={() => setCurrentScreen('HOME')}
            onOpenMoodInsights={() => setCurrentScreen('MOOD_INSIGHTS')}
            onOpenPrediction={() => setCurrentScreen('PREDICTION')}
            onOpenLogMood={() => setCurrentScreen('LOG_MOOD')}
          />
        );

      case 'PREDICTION':
        return (
          <PredictionScreen
            weather={weather}
            entries={entries}
            onBack={() => setCurrentScreen('HOME')}
            onOpenHome={() => setCurrentScreen('HOME')}
            onOpenLogMood={() => setCurrentScreen('LOG_MOOD')}
            onOpenMoodInsights={() => setCurrentScreen('MOOD_INSIGHTS')}
            onOpenWeatherConditions={() => setCurrentScreen('WEATHER_CONDITIONS')}
          />
        );

      case 'LOG_MOOD':
        return (
          <LogMoodScreen
            weather={weather}
            onSaveEntry={handleSaveEntry}
            onBack={() => setCurrentScreen('HOME')}
            onOpenInsights={() => setCurrentScreen('MOOD_INSIGHTS')}
            onOpenPrediction={() => setCurrentScreen('PREDICTION')}
          />
        );

      case 'LOCATION_RADAR':
        return (
          <LocationRadarScreen
            weather={weather}
            onBack={() => setCurrentScreen('HOME')}
            onUpdateWeather={(newW) => setWeather(newW)}
          />
        );

      case 'LOGIN':
        return <LoginScreen onLoginSuccess={handleLoginSuccess} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Studio Control Bar */}
      <header className="shrink-0 bg-slate-950/90 border-b border-slate-800 px-4 py-2 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Wordmark & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
              <span className="text-sm">☀️</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-white flex items-center">
                  <span className="text-[#3B82F6]">Weather</span>
                  <span className="text-[#8B5CF6]">Mood</span>
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Flutter UI
                </span>
              </div>
              <p className="text-[11px] text-purple-300/80 hidden sm:block">
                Same sky, different feelings.
              </p>
            </div>
          </div>

          {/* Quick Screen Switcher matching weather-mood-bice */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-0.5 rounded-xl bg-slate-900 border border-slate-800 text-xs overflow-x-auto max-w-md">
              <button
                type="button"
                onClick={() => setCurrentScreen('HOME')}
                className={`px-2 py-1 rounded-lg font-semibold transition active:scale-95 ${
                  currentScreen === 'HOME' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => setCurrentScreen('MOOD_INSIGHTS')}
                className={`px-2 py-1 rounded-lg font-semibold transition active:scale-95 ${
                  currentScreen === 'MOOD_INSIGHTS' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Mood
              </button>
              <button
                type="button"
                onClick={() => setCurrentScreen('LOG_MOOD')}
                className={`px-2 py-1 rounded-lg font-semibold transition active:scale-95 ${
                  currentScreen === 'LOG_MOOD' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                ＋ Log
              </button>
              <button
                type="button"
                onClick={() => setCurrentScreen('WEATHER_CONDITIONS')}
                className={`px-2 py-1 rounded-lg font-semibold transition active:scale-95 ${
                  currentScreen === 'WEATHER_CONDITIONS' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Weather
              </button>
              <button
                type="button"
                onClick={() => setCurrentScreen('PREDICTION')}
                className={`px-2 py-1 rounded-lg font-semibold transition active:scale-95 ${
                  currentScreen === 'PREDICTION' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Prediction
              </button>
              <button
                type="button"
                onClick={() => setCurrentScreen('LOCATION_RADAR')}
                className={`px-2 py-1 rounded-lg font-semibold transition active:scale-95 ${
                  currentScreen === 'LOCATION_RADAR' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Radar
              </button>
            </div>

            {/* Platform mode: M3 / iOS */}
            <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setUiStyle('material3')}
                className={`px-2 py-1 rounded-lg font-medium transition ${
                  uiStyle === 'material3' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
                title="Flutter Material 3"
              >
                M3
              </button>
              <button
                type="button"
                onClick={() => setUiStyle('cupertino')}
                className={`px-2 py-1 rounded-lg font-medium transition ${
                  uiStyle === 'cupertino' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
                title="Flutter Cupertino"
              >
                iOS
              </button>
            </div>

            {/* Device Mode Toggle */}
            <div className="hidden md:flex items-center p-0.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setDeviceMode('mobile')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition ${
                  deviceMode === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Phone</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('responsive')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition ${
                  deviceMode === 'responsive' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Responsive</span>
              </button>
            </div>

            {/* Dart Inspector */}
            <button
              type="button"
              onClick={() => setIsInspectorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold active:scale-95 transition"
              title="Inspect Flutter Dart Code"
            >
              <Code2 className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Dart</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
        {deviceMode === 'mobile' ? (
          /* Phone Frame Mockup */
          <div className="relative w-full max-w-[420px] h-[870px] max-h-[94vh] rounded-[48px] bg-slate-900 border-[9px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col ring-1 ring-white/10">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-28 h-6 bg-black rounded-full px-2.5 shadow-md pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-white/20" />
              <div className="w-2 h-2 rounded-full bg-purple-500/80 animate-pulse" />
            </div>

            {/* Mobile Top Status Bar */}
            <div className="shrink-0 flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold text-slate-700 select-none z-40 bg-sky-100/90 font-mono">
              <span>{weather.currentTime}</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3 text-slate-700" />
                <BatteryCharging className="w-3.5 h-3.5 text-slate-700" />
              </div>
            </div>

            {/* Active Screen Scrollable Body */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth bg-gradient-to-b from-[#E0F2FE] via-[#F8FAFC] to-[#F1F5F9]">
              {renderScreen()}
            </div>

            {/* Bottom Navigation */}
            {currentScreen !== 'LOGIN' && (
              <div className="shrink-0 z-40">
                <FlutterNavigationBar
                  currentScreen={currentScreen}
                  onNavigate={(s) => setCurrentScreen(s)}
                  uiStyle={uiStyle}
                />
              </div>
            )}

            {/* Home Bar Indicator */}
            <div className="shrink-0 py-1.5 flex justify-center bg-white z-40">
              <div className="w-32 h-1 bg-slate-400 rounded-full" />
            </div>
          </div>
        ) : (
          /* Full Responsive Canvas View */
          <div className="w-full h-full max-w-4xl mx-auto flex flex-col rounded-2xl sm:rounded-3xl border border-slate-700/80 bg-white shadow-2xl overflow-hidden min-h-[750px]">
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth bg-gradient-to-b from-[#E0F2FE] via-[#F8FAFC] to-[#F1F5F9]">
              {renderScreen()}
            </div>

            {currentScreen !== 'LOGIN' && (
              <div className="shrink-0 z-40">
                <FlutterNavigationBar
                  currentScreen={currentScreen}
                  onNavigate={(s) => setCurrentScreen(s)}
                  uiStyle={uiStyle}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating SnackBar */}
      <FlutterSnackBar
        uiStyle={uiStyle}
        message={snackMessage}
        isOpen={isSnackOpen}
        onClose={() => setIsSnackOpen(false)}
        actionLabel="OK"
      />

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          currentUser={currentUser}
          weather={weather}
          uiStyle={uiStyle}
          onToggleUiStyle={() =>
            setUiStyle((prev) => (prev === 'material3' ? 'cupertino' : 'material3'))
          }
          onClose={() => setIsSettingsOpen(false)}
          onLogout={handleLogout}
          onResetData={handleResetData}
        />
      )}

      {/* Email Viewer Modal */}
      {isEmailViewerOpen && lastSentEmail && (
        <EmailViewerModal
          email={lastSentEmail}
          onClose={() => setIsEmailViewerOpen(false)}
          onResend={() => {
            setSnackMessage('Digest re-sent to your inbox!');
            setIsSnackOpen(true);
          }}
        />
      )}

      {/* Flutter Code Inspector Modal */}
      <FlutterWidgetInspector
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        uiStyle={uiStyle}
      />
    </div>
  );
}
