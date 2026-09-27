import React, { useState } from 'react';
import { X, Check, ShieldCheck, Tag, CreditCard, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { MembershipPlan, PROMO_COUPONS } from '../data/cultData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: MembershipPlan | null;
  duration: 'months3' | 'months12' | 'months14Festive';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  plan,
  duration,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'emi'>('upi');
  const [isSuccess, setIsSuccess] = useState(false);
  const [customerName, setCustomerName] = useState('Harsha Kodati');
  const [customerPhone, setCustomerPhone] = useState('9876543210');

  if (!isOpen || !plan) return null;

  const basePrice = plan.prices[duration];
  const originalPrice = plan.originalPrices[duration];
  const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const priceAfterCoupon = Math.max(0, basePrice - couponDiscount);
  // GST calculation (18% included or added, typical Cult pricing is GST inclusive or breakdown)
  const gstAmount = Math.round(priceAfterCoupon * 0.18);
  const totalPayable = priceAfterCoupon;

  const durationName = {
    months3: '3 Months Kickstart',
    months12: '12 Months (Best Value)',
    months14Festive: '12 + 2 Months Festive Pack',
  }[duration];

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    const found = PROMO_COUPONS.find((c) => c.code === code);

    if (!found) {
      setCouponError('Invalid coupon code. Try CULTFEST or GETFIT50');
      return;
    }

    if (duration === 'months3' && found.minMonths > 3) {
      setCouponError(`This coupon requires a minimum ${found.minMonths} months membership.`);
      return;
    }

    setAppliedCoupon({ code: found.code, discount: found.discount });
    setCouponError('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const memberId = `CULT-${plan.id.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#141824] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3278]" />
            <h3 className="text-lg font-bold text-white font-display">
              {isSuccess ? 'Membership Activated!' : 'Complete Cultpass Membership'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!isSuccess ? (
            <form onSubmit={handleCompletePayment} className="space-y-6">
              {/* Selected Plan Summary Banner */}
              <div className="bg-[#111420] border border-slate-800 rounded-2xl p-4 flex items-start justify-between">
                <div>
                  <div className="text-xs font-bold text-[#ff3278] uppercase font-mono">
                    {plan.badge || 'SELECTED PASS'}
                  </div>
                  <div className="text-base font-black text-white font-display mt-0.5">
                    {plan.name}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Duration: <strong className="text-slate-200">{durationName}</strong>
                  </div>
                  <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Includes {plan.pauseDays} days free pause allowance</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black text-white font-mono">
                    ₹{basePrice.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-slate-500 line-through font-mono">
                    ₹{originalPrice.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Member Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Member Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#10131d] border border-slate-700 focus:border-[#ff3278] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Phone (linked to Cult.fit app)
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#10131d] border border-slate-700 focus:border-[#ff3278] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="bg-[#111420] border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#ff3278]" />
                    <span>Have a Promo Coupon?</span>
                  </span>
                  {appliedCoupon && (
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-[11px] text-red-400 hover:underline cursor-pointer"
                    >
                      Remove Code
                    </button>
                  )}
                </div>

                {appliedCoupon ? (
                  <div className="p-2.5 bg-emerald-950/40 border border-emerald-600/40 rounded-xl text-xs text-emerald-300 flex items-center justify-between font-mono">
                    <span>Applied: {appliedCoupon.code}</span>
                    <span className="font-bold">-₹{appliedCoupon.discount.toLocaleString('en-IN')}</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon (e.g. CULTFEST)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-[#161a28] border border-slate-700 focus:border-[#ff3278] rounded-xl px-3 py-2 text-xs text-white uppercase placeholder-slate-500 focus:outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon()}
                        className="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Pre-suggested quick coupon buttons */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] text-slate-400">Available Coupons:</span>
                      {PROMO_COUPONS.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setCouponCode(c.code);
                            handleApplyCoupon(c.code);
                          }}
                          className="text-[10px] font-mono text-[#ff3278] bg-[#ff3278]/10 hover:bg-[#ff3278]/20 border border-[#ff3278]/30 px-2 py-0.5 rounded cursor-pointer transition-colors"
                        >
                          {c.code} (-₹{c.discount})
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {couponError && (
                  <div className="mt-2 text-[11px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{couponError}</span>
                  </div>
                )}
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2.5">
                  Select Payment Option
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'upi', label: 'UPI / QR', sub: 'Instant & Zero Fee' },
                    { id: 'card', label: 'Credit / Debit', sub: 'Visa, Master, RuPay' },
                    { id: 'emi', label: 'No-Cost EMI', sub: plan.emiStartsFrom },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setPaymentMethod(mode.id as any)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        paymentMethod === mode.id
                          ? 'bg-[#ff3278]/15 border-[#ff3278] text-white ring-1 ring-[#ff3278]/30'
                          : 'bg-[#10131d] border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{mode.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate">{mode.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-[#111420] border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Base Membership Fee</span>
                  <span className="font-mono">₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Coupon Discount ({appliedCoupon.code})</span>
                    <span className="font-mono">-₹{appliedCoupon.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Applicable GST (18% inclusive)</span>
                  <span className="font-mono">₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                  <span>Total Payable Amount</span>
                  <span className="text-lg text-[#ff3278] font-mono">
                    ₹{totalPayable.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-3.5 text-xs font-bold text-white bg-gradient-to-r from-[#ff3278] to-[#ff5944] rounded-xl hover:brightness-110 shadow-xl shadow-[#ff3278]/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Pay ₹{totalPayable.toLocaleString('en-IN')} & Activate Membership</span>
              </button>
            </form>
          ) : (
            /* Activated Membership Display */
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="bg-gradient-to-br from-[#1a1f33] via-[#121624] to-[#0c0e14] border-2 border-emerald-500 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black font-display text-white">
                      cult<span className="text-[#ff3278]">.fit</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded font-mono">
                      ACTIVE PASS
                    </span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">{memberId}</span>
                </div>

                <div className="py-6 space-y-4">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Pass Holder</div>
                    <div className="text-lg font-bold text-white font-display">{customerName}</div>
                    <div className="text-xs text-slate-400 font-mono">+91 {customerPhone}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Pass Tier</div>
                      <div className="text-sm font-bold text-white font-mono">{plan.name}</div>
                      <div className="text-xs text-slate-400">{durationName}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Free Pause Days</div>
                      <div className="text-sm font-bold text-[#ff3278] font-mono">{plan.pauseDays} Days</div>
                      <div className="text-xs text-slate-400">Available anytime in app</div>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Access enabled at 600+ Cult centers. Use your phone number on the Cult.fit app to check into any class!</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="w-full py-3 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer text-center"
                >
                  Done & Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
