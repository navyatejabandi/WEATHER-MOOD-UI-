import React, { useState } from 'react';
import { UIStyleMode } from '../../types';
import { X, Copy, Check, Code, Layers } from 'lucide-react';

interface FlutterWidgetInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  uiStyle: UIStyleMode;
}

export const FlutterWidgetInspector: React.FC<FlutterWidgetInspectorProps> = ({
  isOpen,
  onClose,
  uiStyle,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'dart' | 'tree'>('dart');

  if (!isOpen) return null;

  const flutterDartCode = `// Generated WeatherMood Flutter Architecture
// Framework: Flutter 3.x / Dart 3.x with Material 3 & Cupertino
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

void main() => runApp(const WeatherMoodApp());

class WeatherMoodApp extends StatefulWidget {
  const WeatherMoodApp({super.key});

  @override
  State<WeatherMoodApp> createState() => _WeatherMoodAppState();
}

class _WeatherMoodAppState extends State<WeatherMoodApp> {
  int _currentIndex = 0;
  bool _useCupertino = ${uiStyle === 'cupertino' ? 'true' : 'false'};

  @override
  Widget build(BuildContext context) {
    return _useCupertino
        ? const CupertinoApp(
            title: 'WeatherMood',
            theme: CupertinoThemeData(brightness: Brightness.dark),
            home: WeatherMoodHomePage(),
          )
        : MaterialApp(
            title: 'WeatherMood',
            theme: ThemeData(
              useMaterial3: true,
              colorSchemeSeed: Colors.indigo,
              brightness: Brightness.dark,
            ),
            home: const WeatherMoodHomePage(),
          );
  }
}

class WeatherMoodHomePage extends StatelessWidget {
  const WeatherMoodHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('WeatherMood'),
        actions: [
          IconButton(
            icon: const Icon(Icons.headphones_rounded),
            onPressed: () => _openSoundscapeSheet(context),
          ),
          IconButton(
            icon: const Icon(Icons.search_rounded),
            onPressed: () => _showCitySearch(context),
          ),
        ],
      ),
      body: CustomScrollView(
        slivers: [
          const SliverToBoxAdapter(child: WeatherAmbientHero()),
          const SliverToBoxAdapter(child: MoodCheckInCard()),
          const SliverToBoxAdapter(child: HourlyForecastStrip()),
          const SliverToBoxAdapter(child: WeatherMoodCorrelationGrid()),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showQuickLogDialog(context),
        icon: const Icon(Icons.add_rounded),
        label: const Text('Check In'),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: 0,
        destinations: const [
          NavigationDestination(icon: Icon(Icons.wb_sunny_rounded), label: 'Today'),
          NavigationDestination(icon: Icon(Icons.book_rounded), label: 'Journal'),
          NavigationDestination(icon: Icon(Icons.bar_chart_rounded), label: 'Insights'),
          NavigationDestination(icon: Icon(Icons.air_rounded), label: 'Calm'),
        ],
      ),
    );
  }
}`;

  const widgetTree = [
    { name: 'WeatherMoodApp', type: 'StatefulWidget', depth: 0 },
    { name: uiStyle === 'material3' ? 'MaterialApp (useMaterial3: true)' : 'CupertinoApp', type: 'AppRoot', depth: 1 },
    { name: 'Scaffold', type: 'LayoutContainer', depth: 2 },
    { name: 'AppBar / CupertinoNavigationBar', type: 'Header', depth: 3 },
    { name: 'AnimatedWeatherCanvas (CustomPainter)', type: 'VisualEffect', depth: 3 },
    { name: 'CustomScrollView (Slivers)', type: 'Scrollable', depth: 3 },
    { name: 'SliverToBoxAdapter -> WeatherAmbientHero', type: 'HeroWidget', depth: 4 },
    { name: 'SliverToBoxAdapter -> MoodCheckInCard', type: 'InteractiveCard', depth: 4 },
    { name: 'SliverToBoxAdapter -> HourlyForecastStrip (ListView.horizontal)', type: 'HorizontalList', depth: 4 },
    { name: 'FloatingActionButton.extended', type: 'PrimaryCTA', depth: 3 },
    { name: uiStyle === 'material3' ? 'NavigationBar (M3 NavigationDestination)' : 'CupertinoTabBar', type: 'BottomNav', depth: 3 },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(flutterDartCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Flutter UI Widget Inspector</h3>
              <p className="text-xs text-slate-400">Declarative Dart Architecture Behind WeatherMood</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center justify-between px-6 py-2.5 border-b border-slate-800 bg-slate-900">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => setActiveTab('dart')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                activeTab === 'dart' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dart Code
            </button>
            <button
              onClick={() => setActiveTab('tree')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                activeTab === 'tree' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Widget Tree
            </button>
          </div>

          {activeTab === 'dart' && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Dart'}</span>
            </button>
          )}
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-xs">
          {activeTab === 'dart' ? (
            <pre className="text-slate-300 leading-relaxed overflow-x-auto whitespace-pre bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
              <code>{flutterDartCode}</code>
            </pre>
          ) : (
            <div className="space-y-2">
              <div className="text-xs text-slate-400 mb-4 font-sans">
                Hierarchical composition of Flutter widgets rendered in the active viewport:
              </div>
              {widgetTree.map((node, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800/70 hover:border-slate-700 transition"
                  style={{ marginLeft: `${node.depth * 20}px` }}
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="font-semibold text-slate-200">{node.name}</span>
                  <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-800/80 ml-auto font-sans">
                    {node.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
