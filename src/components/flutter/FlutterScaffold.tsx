import React from 'react';
import { UIStyleMode } from '../../types';

interface FlutterScaffoldProps {
  uiStyle: UIStyleMode;
  appBar?: React.ReactNode;
  body: React.ReactNode;
  bottomNavigationBar?: React.ReactNode;
  floatingActionButton?: React.ReactNode;
  backgroundColor?: string;
}

export const FlutterScaffold: React.FC<FlutterScaffoldProps> = ({
  uiStyle,
  appBar,
  body,
  bottomNavigationBar,
  floatingActionButton,
  backgroundColor,
}) => {
  const isM3 = uiStyle === 'material3';

  return (
    <div
      className={`relative flex flex-col w-full h-full min-h-[640px] overflow-hidden select-none transition-colors duration-300 ${
        backgroundColor || (isM3 ? 'bg-slate-950 text-slate-100' : 'bg-black text-slate-100')
      }`}
    >
      {/* Flutter AppBar */}
      {appBar && <div className="shrink-0 z-30">{appBar}</div>}

      {/* Flutter Body (Scrollable canvas) */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth pb-20">
        {body}
      </div>

      {/* Flutter FloatingActionButton */}
      {floatingActionButton && (
        <div className="absolute bottom-22 right-4 z-40 pointer-events-auto">
          {floatingActionButton}
        </div>
      )}

      {/* Flutter BottomNavigationBar */}
      {bottomNavigationBar && (
        <div className="shrink-0 z-30 absolute bottom-0 left-0 right-0">
          {bottomNavigationBar}
        </div>
      )}
    </div>
  );
};
