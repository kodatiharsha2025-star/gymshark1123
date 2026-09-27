import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Flame, User, MapPin, AlertCircle, CheckCircle, ChevronRight, Filter } from 'lucide-react';
import { MOCK_CLASS_SLOTS, ClassSlot, CultCity, CULT_CENTERS } from '../data/cultData';

interface ClassScheduleProps {
  selectedCity: CultCity;
  selectedFormatFilter?: string;
  onBookSlot: (slot: ClassSlot) => void;
}

export const ClassSchedule: React.FC<ClassScheduleProps> = ({
  selectedCity,
  selectedFormatFilter = 'all',
  onBookSlot,
}) => {
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');
  const [formatFilter, setFormatFilter] = useState(selectedFormatFilter);
  const [selectedCenterId, setSelectedCenterId] = useState('all');

  // Keep format filter synced if prop updates
  React.useEffect(() => {
    if (selectedFormatFilter && selectedFormatFilter !== 'all') {
      setFormatFilter(selectedFormatFilter);
    }
  }, [selectedFormatFilter]);

  const dates = [
    { key: 'today', label: 'Today', sub: '27 Sep' },
    { key: 'tomorrow', label: 'Tomorrow', sub: '28 Sep' },
    { key: 'day2', label: 'Mon', sub: '29 Sep' },
    { key: 'day3', label: 'Tue', sub: '30 Sep' },
  ];

  const cityCenters = useMemo(() => {
    return CULT_CENTERS.filter((c) => c.city === selectedCity);
  }, [selectedCity]);

  const filteredSlots = useMemo(() => {
    return MOCK_CLASS_SLOTS.filter((slot) => {
      // Filter by city
      const matchCity = slot.city === selectedCity;
      // Filter by period
      const matchPeriod = selectedPeriod === 'all' || slot.period === selectedPeriod;
      // Filter by format
      const matchFormat = formatFilter === 'all' || slot.formatId === formatFilter;
      // Filter by center
      const matchCenter = selectedCenterId === 'all' || slot.centerId === selectedCenterId;

      return matchCity && matchPeriod && matchFormat && matchCenter;
    });
  }, [selectedCity, selectedPeriod, formatFilter, selectedCenterId]);

  return (
    <section id="schedule" className="py-16 lg:py-24 bg-[#0c0e14] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-[#ff3278] mb-2 font-mono">
              LIVE CLASS SCHEDULE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Book a Slot in {selectedCity}
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              Classes fill fast. Book up to 4 days ahead. Check-in with biometric scan at your center.
            </p>
          </div>

          {/* Date Selector Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 bg-[#141824] rounded-xl border border-slate-800 overflow-x-auto">
            {dates.map((d) => (
              <button
                key={d.key}
                onClick={() => setSelectedDate(d.key)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex flex-col items-center ${
                  selectedDate === d.key
                    ? 'bg-[#ff3278] text-white shadow-md shadow-[#ff3278]/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{d.label}</span>
                <span className="text-[10px] opacity-80 font-mono">{d.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="bg-[#121622] border border-slate-800 p-4 rounded-2xl mb-8 flex flex-wrap items-center justify-between gap-4">
          {/* Time of Day Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Time:</span>
            </span>
            {(['all', 'morning', 'afternoon', 'evening'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer capitalize whitespace-nowrap ${
                  selectedPeriod === period
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {period === 'all' ? 'All Hours' : period}
              </button>
            ))}
          </div>

          {/* Dropdown Filters for Format & Center */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              aria-label="Filter by format"
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value)}
              className="bg-[#171c2c] border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#ff3278]"
            >
              <option value="all">All Formats</option>
              <option value="hrx">HRX Workout</option>
              <option value="strength_conditioning">Strength & Conditioning</option>
              <option value="dance_fitness">Dance Fitness</option>
              <option value="cult_boxing">Boxing & Combat</option>
              <option value="yoga_mobility">Yoga & Recovery</option>
            </select>

            <select
              aria-label="Filter by center"
              value={selectedCenterId}
              onChange={(e) => setSelectedCenterId(e.target.value)}
              className="bg-[#171c2c] border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#ff3278]"
            >
              <option value="all">All Centers in {selectedCity}</option>
              {cityCenters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Schedule List / Grid */}
        {filteredSlots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSlots.map((slot) => {
              const isUrgent = slot.spotsLeft <= 3;

              return (
                <div
                  key={slot.id}
                  className="bg-[#141824] border border-slate-800/90 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all duration-150 hover:shadow-xl group"
                >
                  <div>
                    {/* Top Row: Format & Time */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-white font-display group-hover:text-[#ff3278] transition-colors">
                          {slot.formatName}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 font-mono">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{slot.time}</span>
                        </div>
                      </div>

                      {/* Spots left indicator */}
                      <div className="text-right">
                        <span
                          className={`text-[11px] font-semibold font-mono ${
                            isUrgent ? 'text-amber-400 font-bold' : 'text-slate-400'
                          }`}
                        >
                          {slot.spotsLeft} spots left
                        </span>
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden ml-auto">
                          <div
                            className={`h-full rounded-full ${
                              isUrgent ? 'bg-amber-400' : 'bg-emerald-500'
                            }`}
                            style={{
                              width: `${Math.min(
                                100,
                                ((slot.totalSpots - slot.spotsLeft) / slot.totalSpots) * 100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Center location */}
                    <div className="mt-3.5 flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-[#ff3278] shrink-0" />
                      <span className="truncate">{slot.centerName}</span>
                    </div>

                    {/* Trainer Bio Card */}
                    <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center gap-3">
                      <img
                        src={slot.trainerImage}
                        alt={slot.trainerName}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-slate-700"
                      />
                      <div className="truncate">
                        <div className="text-xs font-semibold text-white">
                          {slot.trainerName}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {slot.trainerRole}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-[#ff3278]" />
                      <span>{slot.calories}</span>
                    </span>

                    <button
                      onClick={() => onBookSlot(slot)}
                      className="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-[#ff3278] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Book Slot</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#121520] border border-slate-800 rounded-2xl p-8">
            <AlertCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-white">No slots matching your filter</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try switching your time period, format, or select another Cult center in {selectedCity}.
            </p>
            <button
              onClick={() => {
                setSelectedPeriod('all');
                setFormatFilter('all');
                setSelectedCenterId('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold text-[#ff3278] bg-[#ff3278]/10 hover:bg-[#ff3278]/20 rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
