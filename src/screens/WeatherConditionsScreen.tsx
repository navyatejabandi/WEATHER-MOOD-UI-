import React, { useState } from 'react';
import { LiveWeatherData } from '../types';
import { WeatherMoodService } from '../utils/weatherMoodCalculations';
import { ArrowLeft, Flame, ShieldAlert, Sparkles, Droplets, Wind, Leaf, Sun, ChevronRight } from 'lucide-react';
import { WeatherIllustration } from '../components/common/WeatherIllustration';
import { MeadowIllustration } from '../components/common/MeadowIllustration';

interface WeatherConditionsScreenProps {
  weather: LiveWeatherData;
  onOpenHome: () => void;
  onOpenMoodInsights: () => void;
  onOpenPrediction: () => void;
  onOpenLogMood: () => void;
}

export const WeatherConditionsScreen: React.FC<WeatherConditionsScreenProps> = ({
  weather,
  onOpenHome,
  onOpenMoodInsights,
  onOpenPrediction,
  onOpenLogMood,
}) => {
  const [testTemp, setTestTemp] = useState<number>(weather.temp);
  const [testHumidity, setTestHumidity] = useState<number>(weather.humidity);

  const impact = WeatherMoodService.calculateHeatBehavioralImpact(testTemp, testHumidity);

  const testScenarios = [
    { label: '22°C Ideal', temp: 22, hum: 45, tag: 'Comfort' },
    { label: '29°C Warm', temp: 29, hum: 55, tag: 'Moderate' },
    { label: '34°C Hot', temp: 34, hum: 65, tag: 'Heat Stress' },
    { label: '39°C Extreme', temp: 39, hum: 75, tag: 'Severe Wave' },
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#E0F2FE] via-[#F8FAFC] to-[#F1F5F9] text-slate-800 pb-24 select-none">
      <div className="px-5 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={onOpenMoodInsights}
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-white/80 transition-all flex items-center gap-1"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xs font-semibold">Mood</span>
          </button>

          <div className="text-center">
            <h2 className="text-base font-extrabold text-slate-800">
              Weather & Heat Conditions
            </h2>
            <div className="text-[10px] text-slate-400 font-medium">
              Behavioral Changes & Heat Stress Analysis
            </div>
          </div>

          <WeatherIllustration size="sm" className="w-8 h-7" />
        </div>

        {/* Heat Stress Behavioral Prediction Card */}
        <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 text-white rounded-3xl p-4 shadow-lg relative overflow-hidden mb-4">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                <Flame className="w-4 h-4 text-amber-200 fill-amber-200" />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-wide uppercase text-amber-100">
                  Heat Stress Behavioral Prediction
                </h3>
                <div className="text-[11px] font-medium text-white/90">
                  Predicting human irritability & cognitive fatigue under heat
                </div>
              </div>
            </div>

            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/20 border border-white/20 text-white">
              {impact.stressCategory}
            </span>
          </div>

          {/* Thermal Scenario Tester Buttons */}
          <div className="mt-2.5 pt-2.5 border-t border-white/20">
            <div className="text-[10px] font-bold text-amber-100 mb-1.5 flex items-center justify-between">
              <span>Test Thermal Scenarios:</span>
              <span className="font-mono">Heat Index: {impact.heatIndex}°C</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {testScenarios.map((s) => {
                const isSelected = testTemp === s.temp;
                return (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => {
                      setTestTemp(s.temp);
                      setTestHumidity(s.hum);
                    }}
                    className={`py-1.5 px-1 rounded-xl text-center text-[10px] font-bold transition-all ${
                      isSelected
                        ? 'bg-white text-orange-700 shadow-sm scale-[1.02]'
                        : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    <div>{s.label}</div>
                    <div className="text-[8px] opacity-80">{s.tag}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Behavioral Risk Breakdown */}
          <div className="mt-3 bg-black/20 backdrop-blur-xs rounded-2xl p-3 space-y-2 border border-white/10">
            <div className="text-[11px] font-semibold text-white leading-snug">
              {impact.primaryBehavior}
            </div>

            <div className="space-y-1.5 pt-1">
              {/* Irritability Risk */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between text-[10px] font-bold text-amber-100">
                  <span>Irritability Surge Risk</span>
                  <span className="font-mono">{impact.irritabilityRisk}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full bg-amber-300 rounded-full transition-all duration-300"
                    style={{ width: `${impact.irritabilityRisk}%` }}
                  />
                </div>
              </div>

              {/* Cognitive Fatigue Risk */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between text-[10px] font-bold text-amber-100">
                  <span>Cognitive Fatigue Rate</span>
                  <span className="font-mono">{impact.fatigueRisk}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full bg-rose-300 rounded-full transition-all duration-300"
                    style={{ width: `${impact.fatigueRisk}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-[10px] text-amber-100/90 pt-1 border-t border-white/15">
              💡 <strong>Adaptive Coping Strategy:</strong> {impact.copingAdvice}
            </div>
          </div>
        </div>

        {/* Current Atmospheric Readings */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800">
              Atmospheric Environment ({weather.city})
            </h3>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-mono">
              Live
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
              <Sun className="w-4 h-4 text-amber-500" />
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Ambient Temp</span>
                <span className="font-bold text-slate-800 font-mono">{weather.temp}°C ({weather.condition})</span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
              <Droplets className="w-4 h-4 text-sky-500" />
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Relative Humidity</span>
                <span className="font-bold text-slate-800 font-mono">{weather.humidity}%</span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
              <Wind className="w-4 h-4 text-indigo-500" />
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Wind Dispersion</span>
                <span className="font-bold text-slate-800 font-mono">{weather.windSpeed} km/h</span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
              <Leaf className="w-4 h-4 text-emerald-500" />
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">AQI Particulates</span>
                <span className="font-bold text-slate-800 font-mono">{weather.aqi} ({weather.aqiStatus})</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA to ML Prediction */}
        <div
          onClick={onOpenPrediction}
          className="mt-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl p-4 shadow-sm cursor-pointer hover:shadow-md transition flex items-center justify-between"
        >
          <div>
            <div className="text-[10px] font-bold text-purple-200 uppercase tracking-wider">
              Next Step: Synthesis
            </div>
            <h4 className="text-sm font-extrabold mt-0.5">
              Run Bayesian Mood Prediction →
            </h4>
            <p className="text-[11px] text-purple-100/90 mt-0.5">
              Combine weather variables with past logs to predict today's emotional outcome.
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-white shrink-0" />
        </div>
      </div>

      {/* Bottom Meadow Floral Art */}
      <div className="pt-2">
        <MeadowIllustration />
      </div>
    </div>
  );
};
