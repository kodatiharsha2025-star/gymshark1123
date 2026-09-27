import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, QrCode, Calendar, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { CULT_CITIES, CULT_CENTERS, WORKOUT_FORMATS, CultCity, CultCenter } from '../data/cultData';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCity: CultCity;
  defaultCenter?: CultCenter | null;
  defaultFormat?: string;
}

export const FreeTrialModal: React.FC<FreeTrialModalProps> = ({
  isOpen,
  onClose,
  defaultCity,
  defaultCenter,
  defaultFormat,
}) => {
  const [city, setCity] = useState<CultCity>(defaultCity);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [format, setFormat] = useState(defaultFormat || 'hrx');
  const [centerId, setCenterId] = useState(defaultCenter?.id || '');
  const [preferredDate, setPreferredDate] = useState('Tomorrow');
  const [preferredTime, setPreferredTime] = useState('07:00 AM');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync state if default props change
  React.useEffect(() => {
    setCity(defaultCity);
  }, [defaultCity]);

  React.useEffect(() => {
    if (defaultCenter) {
      setCenterId(defaultCenter.id);
      setCity(defaultCenter.city as CultCity);
    }
  }, [defaultCenter]);

  React.useEffect(() => {
    if (defaultFormat) {
      setFormat(defaultFormat);
    }
  }, [defaultFormat]);

  const availableCenters = CULT_CENTERS.filter((c) => c.city === city);

  // Set default center if current centerId doesn't match city
  React.useEffect(() => {
    if (availableCenters.length > 0 && !availableCenters.some((c) => c.id === centerId)) {
      setCenterId(availableCenters[0].id);
    }
  }, [city, availableCenters, centerId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Please enter your full name';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (email && !email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  const selectedCenterObj = CULT_CENTERS.find((c) => c.id === centerId) || availableCenters[0];
  const selectedFormatObj = WORKOUT_FORMATS.find((f) => f.id === format) || WORKOUT_FORMATS[0];
  const passId = `CULT-VIP-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#141824] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3278]" />
            <h3 className="text-lg font-bold text-white font-display">
              {isSubmitted ? 'Your Cultpass VIP Pass is Ready!' : 'Claim 1-Day Free Trial Pass'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-gradient-to-r from-[#ff3278]/15 to-transparent border-l-2 border-[#ff3278] rounded-r-xl text-xs text-slate-300">
                100% Free Trial. Zero credit card required. Experience any group class or gym floor.
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Harsha Kodati"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#10131d] border border-slate-700 focus:border-[#ff3278] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                  {errors.name && <span className="text-[11px] text-red-400 mt-0.5 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#10131d] border border-slate-700 focus:border-[#ff3278] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                  {errors.phone && <span className="text-[11px] text-red-400 mt-0.5 block">{errors.phone}</span>}
                </div>
              </div>

              {/* City & Center */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value as CultCity)}
                    className="w-full bg-[#10131d] border border-slate-700 focus:border-[#ff3278] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    {CULT_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Preferred Center
                  </label>
                  <select
                    value={centerId}
                    onChange={(e) => setCenterId(e.target.value)}
                    className="w-full bg-[#10131d] border border-slate-700 focus:border-[#ff3278] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    {availableCenters.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Format & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Workout Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full bg-[#10131d] border border-slate-700 focus:border-[#ff3278] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    {WORKOUT_FORMATS.map((f) => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-[#10131d] border border-slate-700 focus:border-[#ff3278] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="06:00 AM">06:00 AM (Early Bird)</option>
                    <option value="07:00 AM">07:00 AM (Popular)</option>
                    <option value="08:00 AM">08:00 AM (Morning)</option>
                    <option value="06:00 PM">06:00 PM (Post-Work)</option>
                    <option value="07:00 PM">07:00 PM (Evening Peak)</option>
                    <option value="08:00 PM">08:00 PM (Late Night)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 text-xs font-bold text-white bg-gradient-to-r from-[#ff3278] to-[#ff5944] rounded-xl hover:brightness-110 shadow-lg shadow-[#ff3278]/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Free VIP Pass</span>
                </button>
              </div>
            </form>
          ) : (
            /* Digital VIP Pass Generated Card */
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#1a1f33] via-[#121624] to-[#0c0e14] border-2 border-[#ff3278] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                {/* Background watermarks */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff3278]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black font-display text-white">
                      cult<span className="text-[#ff3278]">.fit</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#ff3278] text-white px-2 py-0.5 rounded">
                      1-DAY VIP PASS
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{passId}</span>
                </div>

                <div className="py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div className="sm:col-span-2 space-y-2.5">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Pass Holder</div>
                      <div className="text-base font-bold text-white">{name}</div>
                      <div className="text-xs text-slate-400 font-mono">+91 {phone}</div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Session & Center</div>
                      <div className="text-xs font-semibold text-[#ff3278]">{selectedFormatObj?.name}</div>
                      <div className="text-xs text-slate-300">{selectedCenterObj?.name}</div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
                      <div>Date: <strong className="text-white">Tomorrow</strong></div>
                      <div>Time: <strong className="text-white">{preferredTime}</strong></div>
                    </div>
                  </div>

                  {/* QR Code Graphics */}
                  <div className="sm:col-span-1 flex flex-col items-center justify-center p-3 bg-white rounded-xl">
                    <div className="w-24 h-24 bg-white flex items-center justify-center">
                      <QrCode className="w-20 h-20 text-slate-950" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-800 font-bold mt-1">
                      SCAN AT TURNSTILE
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Pass confirmed. Arrive 10 minutes before class with training shoes.</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    alert(`Pass ${passId} saved! An SMS confirmation has also been dispatched to +91 ${phone}.`);
                    onClose();
                  }}
                  className="flex-1 py-3 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer text-center"
                >
                  Save Pass to Device
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#ff3278] to-[#ff5944] rounded-xl hover:brightness-110 shadow-lg shadow-[#ff3278]/25 transition-all cursor-pointer text-center"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
