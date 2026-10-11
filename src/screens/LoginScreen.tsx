import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { MeadowIllustration } from '../components/common/MeadowIllustration';
import { WeatherIllustration } from '../components/common/WeatherIllustration';

interface LoginScreenProps {
  onLoginSuccess: (user: { name: string; identifier: string }) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [identifier, setIdentifier] = useState('demo@example.com');
  const [name, setName] = useState('Weather Explorer');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmed = identifier.trim().toLowerCase();
    if (!trimmed) {
      setErrorMessage('Please enter your email or phone number');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password');
      return;
    }

    onLoginSuccess({
      name: isSignUp ? name.trim() || 'Explorer' : 'Weather Explorer',
      identifier: trimmed,
    });
  };

  const handleQuickDemo = () => {
    onLoginSuccess({
      name: 'Weather Explorer',
      identifier: 'demo@example.com',
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#E0F2FE] via-[#F8FAFC] to-[#FEF3C7]/30 text-slate-800 p-5 overflow-hidden select-none">
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-sm mx-auto w-full pt-4">
        {/* Logo and Header */}
        <div className="flex flex-col items-center text-center space-y-1.5 mb-5">
          <WeatherIllustration size="md" className="w-16 h-14 mb-1" />

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
            <span className="text-[#3B82F6]">Weather</span>
            <span className="text-[#8B5CF6]">Mood</span>
          </h1>

          <p className="text-sm font-semibold text-slate-500 mt-0.5">
            Same sky, different feelings.
          </p>

          <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed">
            Discover how weather influences your mood with AI.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-3 bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-white shadow-xl">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 mb-2">
            <span className="text-xs font-bold text-slate-800">
              {isSignUp ? 'Create an Account' : 'Sign In to WeatherMood'}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMessage('');
              }}
              className="text-[11px] font-bold text-indigo-600 hover:underline"
            >
              {isSignUp ? 'Already have account?' : 'Need an account?'}
            </button>
          </div>

          {errorMessage && (
            <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {isSignUp && (
            <div className="relative">
              <div className="absolute left-3.5 top-3 text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs shadow-xs focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>
          )}

          {/* Email or Phone Input */}
          <div className="relative">
            <div className="absolute left-3.5 top-3 text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Email or Phone Number"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs shadow-xs focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute left-3.5 top-3 text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs shadow-xs focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-md shadow-indigo-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* 1-Click Quick Demo Login */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={handleQuickDemo}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition py-1 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 inline-flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>Continue with 1-Click Demo</span>
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Meadow Floral Art */}
      <div className="pt-2">
        <MeadowIllustration />
      </div>
    </div>
  );
};
