import React, { useState } from 'react';
import { Flame, Clock, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import { WORKOUT_FORMATS, WorkoutFormat } from '../data/cultData';

interface WorkoutFormatsProps {
  onSelectFormatForBooking: (formatId: string) => void;
  onOpenFreeTrial: () => void;
}

export const WorkoutFormats: React.FC<WorkoutFormatsProps> = ({
  onSelectFormatForBooking,
  onOpenFreeTrial,
}) => {
  const [activeFormat, setActiveFormat] = useState<WorkoutFormat>(WORKOUT_FORMATS[0]);

  return (
    <section id="classes" className="py-16 lg:py-24 bg-[#0a0c10] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-bold tracking-widest uppercase text-[#ff3278] mb-2 font-mono">
              SIGNATURE GROUP WORKOUTS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
              Engineered for Results. Powered by Group Energy.
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
              No boring treadmill staring. Every 50-minute session is led by elite coaches with upbeat music and scalable movements for beginners to athletes.
            </p>
          </div>

          {/* Quick tab switcher for formats on desktop */}
          <div className="flex flex-wrap gap-2">
            {WORKOUT_FORMATS.slice(0, 4).map((fmt) => (
              <button
                key={fmt.id}
                onClick={() => setActiveFormat(fmt)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeFormat.id === fmt.id
                    ? 'bg-[#ff3278] text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {fmt.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Spotlight Card */}
        <div className="bg-[#121522] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl mb-12 grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[460px] overflow-hidden">
            <img
              src={activeFormat.image}
              alt={activeFormat.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121522] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#121522]" />
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Clean unboxed metadata with typographic separators */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#ff3278] mb-2 font-mono">
                <span>{activeFormat.subtitle}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{activeFormat.intensity} Intensity</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                {activeFormat.name}
              </h3>

              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                {activeFormat.description}
              </p>

              {/* Workout Attributes */}
              <div className="mt-6 grid grid-cols-2 gap-4 py-4 border-y border-slate-800/80">
                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#ff3278]" />
                    <span>Burn Target</span>
                  </div>
                  <div className="text-base font-bold text-white font-mono mt-1">
                    {activeFormat.calories}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    <span>Class Length</span>
                  </div>
                  <div className="text-base font-bold text-white font-mono mt-1">
                    {activeFormat.duration}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-400">
                <span className="text-slate-200 font-semibold">Primary Target:</span> {activeFormat.focus}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectFormatForBooking(activeFormat.id)}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#ff3278] hover:bg-[#e02867] rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-[#ff3278]/20"
              >
                <span>Book This Class</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenFreeTrial}
                className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-colors cursor-pointer"
              >
                Try Free Trial First
              </button>
            </div>
          </div>
        </div>

        {/* 6 Formats Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKOUT_FORMATS.map((format) => (
            <div
              key={format.id}
              onClick={() => setActiveFormat(format)}
              className={`group bg-[#121520] border rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                activeFormat.id === format.id
                  ? 'border-[#ff3278]/80 ring-1 ring-[#ff3278]/40 shadow-xl'
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="h-44 relative overflow-hidden">
                <img
                  src={format.image}
                  alt={format.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121520] via-black/30 to-transparent" />
                
                {/* Metric watermark */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-medium text-slate-200">
                  <span className="flex items-center gap-1 font-mono text-[11px] text-white font-semibold">
                    <Flame className="w-3 h-3 text-[#ff3278]" />
                    {format.calories}
                  </span>
                  <span className="text-[11px] font-mono text-slate-300">
                    {format.duration}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white font-display group-hover:text-[#ff3278] transition-colors">
                    {format.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {format.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {format.intensity} Intensity
                  </span>
                  <span className="text-xs font-semibold text-[#ff3278] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
