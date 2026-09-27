import React, { useState } from 'react';
import { X, CheckCircle2, Clock, MapPin, Flame, QrCode, Calendar, ShieldCheck } from 'lucide-react';
import { ClassSlot } from '../data/cultData';

interface SlotBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: ClassSlot | null;
}

export const SlotBookingModal: React.FC<SlotBookingModalProps> = ({
  isOpen,
  onClose,
  slot,
}) => {
  const [userName, setUserName] = useState('Harsha Kodati');
  const [phone, setPhone] = useState('9876543210');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen || !slot) return null;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  const bookingRef = `CULT-SLOT-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#141824] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Bar */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3278]" />
            <h3 className="text-base font-bold text-white font-display">
              {isBooked ? 'Slot Confirmed!' : 'Book Class Slot'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!isBooked ? (
            <form onSubmit={handleBooking} className="space-y-4">
              {/* Slot Details Banner */}
              <div className="bg-[#111420] border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#ff3278] uppercase font-mono">
                      {slot.formatName}
                    </span>
                    <div className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{slot.time}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#ff3278]" />
                    {slot.calories}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-[#ff3278] shrink-0" />
                  <span className="truncate">{slot.centerName}</span>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-3">
                  <img
                    src={slot.trainerImage}
                    alt={slot.trainerName}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white">{slot.trainerName}</div>
                    <div className="text-[10px] text-slate-400">{slot.trainerRole}</div>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-[#10131d] border border-slate-700 focus:border-[#ff3278] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#10131d] border border-slate-700 focus:border-[#ff3278] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Free cancellation up to 60 mins before class start time.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-white bg-gradient-to-r from-[#ff3278] to-[#ff5944] rounded-xl hover:brightness-110 shadow-lg shadow-[#ff3278]/25 transition-all cursor-pointer"
              >
                Confirm Spot Reservation
              </button>
            </form>
          ) : (
            <div className="space-y-5 animate-in zoom-in-95 duration-150">
              <div className="bg-gradient-to-br from-[#1a1f33] to-[#101320] border-2 border-emerald-500 rounded-2xl p-5 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="text-base font-bold text-white font-display">
                    Spot Reserved for {userName}
                  </h4>
                  <div className="text-xs font-mono text-emerald-400 mt-0.5">
                    Booking ID: {bookingRef}
                  </div>
                </div>

                <div className="bg-[#141824] p-3 rounded-xl text-left text-xs space-y-1.5 border border-slate-800">
                  <div className="font-semibold text-white">{slot.formatName}</div>
                  <div className="text-slate-400">{slot.centerName}</div>
                  <div className="text-slate-300 font-mono">{slot.dateLabel} · {slot.time}</div>
                </div>

                <div className="text-[11px] text-slate-400">
                  A check-in barcode has been sent to +91 {phone}. Scan at the center turnstile to enter!
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
