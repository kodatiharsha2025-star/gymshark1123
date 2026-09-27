import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Dumbbell, Flame, Users, Calendar, MapPin } from 'lucide-react';
import { CULT_IMAGES, CULT_CITIES, WORKOUT_FORMATS, CultCity } from '../data/cultData';

interface HeroSectionProps {
  selectedCity: CultCity;
  onCityChange: (city: CultCity) => void;
  onOpenFreeTrial: () => void;
  onSelectFormat: (formatId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedCity,
  onCityChange,
  onOpenFreeTrial,
  onSelectFormat,
}) => {
  const [selectedFormat, setSelectedFormat] = useState('all');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFormat !== 'all') {
      onSelectFormat(selectedFormat);
    }
    const scheduleElem = document.getElementById('schedule');
    scheduleElem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800/80">
      {/* Background Image Container with Measured Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={CULT_IMAGES.hero}
          alt="Athletes training at Cult.fit gym studio"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-75 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured dark gradient scrims ensuring > 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e14] via-[#0c0e14]/90 to-[#0c0e14]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-[#0c0e14]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Natural Human Editorial Kicker (No Pill Enclosures) */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#ff3278] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#ff3278] animate-pulse" />
            <span>India's Premier Fitness Club</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">600+ Centers Nationwide</span>
          </div>

          {/* Marquee Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display leading-[1.08] text-balance mb-6">
            Make Health Easy. <br />
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Train with the
            </span>{' '}
            <span className="bg-gradient-to-r from-[#ff3278] to-[#ff6644] bg-clip-text text-transparent">
              Cult.
            </span>
          </h1>

          {/* Body Prose */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
            Experience high-intensity group workouts designed by Olympic coaches and Hrithik Roshan.
            One membership gives you borderless access to elite gyms, HRX, Strength & Conditioning,
            Boxing, Dance Fitness, and Yoga across {selectedCity} and 30+ cities.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={onOpenFreeTrial}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#ff3278] to-[#ff5944] rounded-xl hover:brightness-110 shadow-xl shadow-[#ff3278]/25 transition-all active:scale-[0.98] whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Claim 1-Day Free Trial Pass</span>
            </button>

            <a
              href="#centers"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 rounded-xl hover:text-white transition-colors whitespace-nowrap"
            >
              <span>Explore Centers in {selectedCity}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Quick Studio / Slot Finder Widget */}
          <form
            onSubmit={handleQuickSearch}
            className="bg-[#121622]/90 backdrop-blur-md border border-slate-800 p-3 sm:p-4 rounded-2xl shadow-2xl max-w-2xl mb-12"
          >
            <div className="text-xs font-semibold text-slate-400 mb-2.5 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#ff3278]" />
              <span>Instant Slot & Center Search</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-5 relative">
                <label htmlFor="hero-city-select" className="sr-only">Select City</label>
                <select
                  id="hero-city-select"
                  aria-label="Select City"
                  value={selectedCity}
                  onChange={(e) => onCityChange(e.target.value as CultCity)}
                  className="w-full bg-[#171c2c] border border-slate-700 text-xs sm:text-sm text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#ff3278] transition-colors"
                >
                  {CULT_CITIES.map((c) => (
                    <option key={c} value={c} className="bg-[#141824] text-white">
                      City: {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-4 relative">
                <label htmlFor="hero-format-select" className="sr-only">Select Format</label>
                <select
                  id="hero-format-select"
                  aria-label="Select Workout Format"
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full bg-[#171c2c] border border-slate-700 text-xs sm:text-sm text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#ff3278] transition-colors"
                >
                  <option value="all">All Workout Formats</option>
                  {WORKOUT_FORMATS.map((f) => (
                    <option key={f.id} value={f.id} className="bg-[#141824] text-white">
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full h-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-[#ff3278] border border-slate-700 hover:border-[#ff3278] rounded-lg transition-colors cursor-pointer"
                >
                  <span>Find Slots</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>

          {/* Adjacent Quantitative Proof Metrics (Claim-to-Proof Adjacency) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-800/80">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                600+
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Centers in India</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                2.5M+
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Active Cult Members</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#ff3278] font-mono tabular-nums">
                4.8 / 5
              </div>
              <div className="text-xs text-slate-400 mt-0.5">App Store Rating</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                50 Mins
              </div>
              <div className="text-xs text-slate-400 mt-0.5">High-Calorie Classes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
