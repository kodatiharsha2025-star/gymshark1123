import React, { useState } from 'react';
import { MapPin, ChevronDown, Sparkles, Menu, X } from 'lucide-react';
import { CULT_CITIES, CultCity } from '../data/cultData';

interface NavbarProps {
  selectedCity: CultCity;
  onCityChange: (city: CultCity) => void;
  onOpenFreeTrial: () => void;
  onOpenPasses: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCity,
  onCityChange,
  onOpenFreeTrial,
  onOpenPasses,
}) => {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0c0e14]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single element wordmark as per Top Bar Contract */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="flex items-center text-2xl font-black tracking-tight text-white font-display transition-opacity hover:opacity-95"
          >
            cult<span className="text-[#ff3278]">.fit</span>
          </a>

          {/* City selector dropdown */}
          <div className="relative">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-850 border border-slate-800 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
              aria-label="Select location"
            >
              <MapPin className="w-3.5 h-3.5 text-[#ff3278]" />
              <span>{selectedCity}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {cityDropdownOpen && (
              <div className="absolute left-0 mt-2 w-44 bg-[#141824] border border-slate-700/80 rounded-lg shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Select City
                </div>
                {CULT_CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      onCityChange(city);
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedCity === city
                        ? 'bg-[#ff3278]/15 text-[#ff3278] font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                    }`}
                  >
                    <span>{city}</span>
                    {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-[#ff3278]"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#passes"
            className="hover:text-white hover:underline underline-offset-8 decoration-[#ff3278] transition-colors"
          >
            Cultpass
          </a>
          <a
            href="#classes"
            className="hover:text-white hover:underline underline-offset-8 decoration-[#ff3278] transition-colors"
          >
            Group Classes
          </a>
          <a
            href="#schedule"
            className="hover:text-white hover:underline underline-offset-8 decoration-[#ff3278] transition-colors"
          >
            Class Schedule
          </a>
          <a
            href="#centers"
            className="hover:text-white hover:underline underline-offset-8 decoration-[#ff3278] transition-colors"
          >
            Gyms & Centers
          </a>
          <a
            href="#planner"
            className="hover:text-white hover:underline underline-offset-8 decoration-[#ff3278] transition-colors"
          >
            Routine Planner
          </a>
          <a
            href="#stories"
            className="hover:text-white hover:underline underline-offset-8 decoration-[#ff3278] transition-colors"
          >
            Transformations
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPasses}
            className="hidden sm:inline-flex items-center text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors whitespace-nowrap"
          >
            View Passes
          </button>
          <button
            onClick={onOpenFreeTrial}
            className="inline-flex items-center gap-2 px-4.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#ff3278] to-[#ff5944] rounded-lg hover:brightness-110 shadow-lg shadow-[#ff3278]/20 transition-all active:scale-[0.98] whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-white/90" />
            <span>Book Free Trial</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e111a] border-b border-slate-800 px-6 py-5 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
            <a
              href="#passes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Cultpass Memberships
            </a>
            <a
              href="#classes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Signature Group Classes
            </a>
            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Live Class Schedule
            </a>
            <a
              href="#centers"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Gyms & Centers in {selectedCity}
            </a>
            <a
              href="#planner"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Workout Routine Planner
            </a>
            <a
              href="#stories"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Member Transformations
            </a>
          </div>
          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFreeTrial();
              }}
              className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#ff3278] to-[#ff5944] rounded-lg text-center shadow-md shadow-[#ff3278]/25"
            >
              Claim 1-Day Free Trial Pass
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
