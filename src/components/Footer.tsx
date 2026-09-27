import React from 'react';
import { CULT_CITIES, CultCity } from '../data/cultData';

interface FooterProps {
  onSelectCity: (city: CultCity) => void;
  onOpenFreeTrial: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCity, onOpenFreeTrial }) => {
  return (
    <footer className="bg-[#090b0e] text-slate-400 text-xs border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="text-2xl font-black text-white font-display tracking-tight inline-block">
              cult<span className="text-[#ff3278]">.fit</span>
            </a>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Cult is on a mission to make health easy, fun, and accessible through world-class group classes, modern gym equipment, and athletic community energy across 600+ centers in India.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenFreeTrial}
                className="px-4 py-2 text-xs font-bold text-white bg-[#ff3278] hover:bg-[#e02867] rounded-lg transition-colors cursor-pointer"
              >
                Claim Free 1-Day Pass
              </button>
            </div>
          </div>

          {/* Cultpass Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Cult Memberships
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#passes" className="hover:text-white transition-colors">
                  cultpass ELITE
                </a>
              </li>
              <li>
                <a href="#passes" className="hover:text-white transition-colors">
                  cultpass PRO Gyms
                </a>
              </li>
              <li>
                <a href="#passes" className="hover:text-white transition-colors">
                  cultpass PLAY Sports
                </a>
              </li>
              <li>
                <a href="#passes" className="hover:text-white transition-colors">
                  cultpass HOME Workouts
                </a>
              </li>
              <li>
                <a href="#passes" className="hover:text-white transition-colors">
                  Corporate Wellness
                </a>
              </li>
            </ul>
          </div>

          {/* Formats Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Group Classes
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#classes" className="hover:text-white transition-colors">
                  HRX Workout
                </a>
              </li>
              <li>
                <a href="#classes" className="hover:text-white transition-colors">
                  Strength & Conditioning
                </a>
              </li>
              <li>
                <a href="#classes" className="hover:text-white transition-colors">
                  Dance Fitness
                </a>
              </li>
              <li>
                <a href="#classes" className="hover:text-white transition-colors">
                  Boxing & Combat
                </a>
              </li>
              <li>
                <a href="#classes" className="hover:text-white transition-colors">
                  Yoga & Mobility
                </a>
              </li>
            </ul>
          </div>

          {/* Cities Directory */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Cult Centers In
            </div>
            <ul className="space-y-2">
              {CULT_CITIES.map((city) => (
                <li key={city}>
                  <button
                    onClick={() => {
                      onSelectCity(city);
                      const el = document.getElementById('centers');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Gyms in {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quiet Bottom Copyright & Legal (No fake engines or status tickers) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Cult.fit Health Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-slate-400 cursor-pointer">Refund & Pause Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Contact Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
