import React from 'react';
import { EmailDigest } from '../../types';
import { MoodAvatar } from '../common/MoodAvatar';
import { X, Mail, CheckCircle, Send, Sparkles } from 'lucide-react';

interface EmailViewerModalProps {
  email: EmailDigest;
  onClose: () => void;
  onResend?: () => void;
}

export const EmailViewerModal: React.FC<EmailViewerModalProps> = ({
  email,
  onClose,
  onResend,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-fade-in">
      <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-3.5 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-xs">
                WeatherMood Forecast Digest
              </h3>
              <p className="text-[10px] text-slate-400">
                To: {email.recipientName} ({email.recipientEmail})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Email Body in stylized paper card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-3 overflow-y-auto">
          {/* Email Subject */}
          <div className="pb-2 border-b border-slate-200/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Subject
            </span>
            <div className="font-bold text-slate-900 text-xs mt-0.5">
              {email.subject}
            </div>
          </div>

          {/* Snapshot Box */}
          <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-base font-black font-mono text-slate-900">
                  {email.weatherSummary.temp}°C
                </span>
                <span className="text-xs text-slate-500 ml-1">
                  {email.weatherSummary.condition}
                </span>
                <div className="text-[10px] text-slate-400">
                  📍 {email.weatherSummary.city}, {email.weatherSummary.state}
                </div>
              </div>

              <div className="text-right text-[10px] text-slate-500">
                <div>💧 Humidity: <strong>{email.weatherSummary.humidity}%</strong></div>
                <div>💨 Wind: <strong>{email.weatherSummary.windSpeed} km/h</strong></div>
                <div>🍃 AQI: <strong>{email.weatherSummary.aqi}</strong></div>
              </div>
            </div>
          </div>

          {/* Predicted Mood section in email */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <MoodAvatar mood={email.predictedMood} size="sm" />
              <div>
                <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                  Atmospheric Mood Forecast
                </div>
                <div className="text-xs font-black text-slate-900 capitalize">
                  {email.predictedMood} ({email.moodProbability}% Likelihood)
                </div>
              </div>
            </div>

            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>

          {/* Personalized Guidance */}
          <div className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/70">
            <p>
              "Sunny skies and mild atmospheric conditions create an ideal window for high focus, creative tasks, and positive social interaction."
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center gap-2 pt-1">
          {onResend && (
            <button
              onClick={onResend}
              className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Resend Digest</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
