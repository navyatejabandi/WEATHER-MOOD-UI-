import React from 'react';
import { UIStyleMode } from '../../types';

interface FlutterSliderProps {
  uiStyle: UIStyleMode;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  valueSuffix?: string;
}

export const FlutterSlider: React.FC<FlutterSliderProps> = ({
  uiStyle,
  value,
  min = 1,
  max = 10,
  step = 1,
  onChange,
  label,
  valueSuffix = '',
}) => {
  const isM3 = uiStyle === 'material3';
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">{label}</span>
          <span className="font-mono tabular-nums text-slate-200 font-semibold">
            {value}
            {valueSuffix}
          </span>
        </div>
      )}

      <div className="relative flex items-center h-7 touch-none select-none">
        {/* Track container */}
        <div
          className={`w-full relative rounded-full overflow-hidden ${
            isM3 ? 'h-3 bg-slate-800' : 'h-1.5 bg-slate-700'
          }`}
        >
          {/* Active Track */}
          <div
            className={`h-full transition-all duration-75 ${
              isM3 ? 'bg-indigo-500 rounded-full' : 'bg-sky-400'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Input overlay */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {/* Flutter Thumb */}
        <div
          className={`absolute pointer-events-none -translate-x-1/2 transition-transform ${
            isM3
              ? 'w-5 h-5 rounded-full bg-white shadow-md ring-2 ring-indigo-500'
              : 'w-6 h-6 rounded-full bg-white shadow-lg'
          }`}
          style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
