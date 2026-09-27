import React, { useState, useMemo } from 'react';
import { MapPin, Star, Clock, Phone, Search, Navigation, ShieldCheck, Dumbbell, Sparkles } from 'lucide-react';
import { CULT_CENTERS, CultCenter, CULT_CITIES, CultCity } from '../data/cultData';

interface CenterFinderProps {
  selectedCity: CultCity;
  onCityChange: (city: CultCity) => void;
  onSelectCenterForTrial: (center: CultCenter) => void;
}

export const CenterFinder: React.FC<CenterFinderProps> = ({
  selectedCity,
  onCityChange,
  onSelectCenterForTrial,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAmenity, setSelectedAmenity] = useState<string>('all');

  const cityCenters = useMemo(() => {
    return CULT_CENTERS.filter((c) => {
      const matchCity = c.city === selectedCity;
      const matchSearch =
        searchQuery === '' ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchAmenity =
        selectedAmenity === 'all' ||
        c.amenities.some((a) => a.toLowerCase().includes(selectedAmenity.toLowerCase()));

      return matchCity && matchSearch && matchAmenity;
    });
  }, [selectedCity, searchQuery, selectedAmenity]);

  return (
    <section id="centers" className="py-16 lg:py-24 bg-[#0a0c10] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-[#ff3278] mb-2 font-mono">
              STUDIOS & GYM FLOORS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Cult Centers in {selectedCity}
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl">
              Equipped with Olympic barbells, Hammer Strength rigs, turf tracks, and steam suites. Seamless biometric entry at every location.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search area or center..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141824] border border-slate-800 focus:border-[#ff3278] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* City Segmented Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CULT_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => {
                onCityChange(city);
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCity === city
                  ? 'bg-gradient-to-r from-[#ff3278] to-[#ff5944] text-white shadow-md shadow-[#ff3278]/20'
                  : 'bg-[#121520] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Centers Grid */}
        {cityCenters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityCenters.map((center) => (
              <div
                key={center.id}
                className="bg-[#121522] border border-slate-800/90 hover:border-slate-700 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-200 group"
              >
                <div>
                  {/* Center Image */}
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={center.image}
                      alt={center.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121522] via-black/30 to-transparent" />

                    {/* Rating & Distance Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-[#0c0e14]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold text-white border border-slate-700/60 font-mono">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>{center.rating}</span>
                        <span className="text-[10px] text-slate-400">({center.reviewsCount})</span>
                      </div>

                      <div className="flex items-center gap-1 bg-[#0c0e14]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs text-slate-300 border border-slate-700/60 font-mono">
                        <Navigation className="w-3 h-3 text-[#ff3278]" />
                        <span>{center.distance}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white font-display group-hover:text-[#ff3278] transition-colors">
                      {center.name}
                    </h3>

                    <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {center.address}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{center.timings}</span>
                    </div>

                    {/* Amenities list */}
                    <div className="mt-4 pt-3.5 border-t border-slate-800/80">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Premium Amenities
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {center.amenities.slice(0, 4).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                          >
                            {amenity}
                          </span>
                        ))}
                        {center.amenities.length > 4 && (
                          <span className="text-[11px] text-slate-500 py-0.5">
                            +{center.amenities.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 mt-2">
                  <button
                    onClick={() => onSelectCenterForTrial(center)}
                    className="w-full py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-[#ff3278] border border-slate-700 hover:border-[#ff3278] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#ff3278] group-hover:text-white" />
                    <span>Book Free Trial Here</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#121520] border border-slate-800 rounded-2xl p-8">
            <MapPin className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-white">No centers found matching "{searchQuery}"</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              We operate multiple centers across {selectedCity}. Try checking another neighborhood or clearing your search.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 text-xs font-bold text-[#ff3278] bg-[#ff3278]/10 hover:bg-[#ff3278]/20 rounded-lg transition-colors cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
