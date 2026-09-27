import React, { useState } from 'react';
import { Check, ShieldCheck, Zap, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import { MEMBERSHIP_PLANS, MembershipPlan } from '../data/cultData';

interface PassSelectorProps {
  onSelectPlan: (plan: MembershipPlan, duration: 'months3' | 'months12' | 'months14Festive') => void;
  onOpenFreeTrial: () => void;
}

export const PassSelector: React.FC<PassSelectorProps> = ({
  onSelectPlan,
  onOpenFreeTrial,
}) => {
  const [duration, setDuration] = useState<'months3' | 'months12' | 'months14Festive'>('months12');

  const durationLabels = {
    months3: '3 Months Kickstart',
    months12: '12 Months (Best Value)',
    months14Festive: '12 + 2 Months Festive Special',
  };

  return (
    <section id="passes" className="py-16 lg:py-24 bg-[#0c0e14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold tracking-widest uppercase text-[#ff3278] mb-2 font-mono">
            CULT MEMBERSHIP PASSES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            One Pass. Infinite Ways to Move.
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Choose the pass that fits your routine. All passes include free pause days, access to the Cult.fit app, and biometric turnstile check-ins.
          </p>

          {/* Interactive Duration Segmented Control (Functional buttons with click handlers) */}
          <div className="mt-8 inline-flex p-1.5 bg-[#141824] rounded-xl border border-slate-800">
            <button
              onClick={() => setDuration('months3')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                duration === 'months3'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3 Months
            </button>
            <button
              onClick={() => setDuration('months12')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                duration === 'months12'
                  ? 'bg-[#ff3278] text-white shadow-md shadow-[#ff3278]/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              12 Months (Save 42%)
            </button>
            <button
              onClick={() => setDuration('months14Festive')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                duration === 'months14Festive'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-md'
                  : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>12 + 2 Extra Months</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => {
            const currentPrice = plan.prices[duration];
            const originalPrice = plan.originalPrices[duration];
            const savingsPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-200 ${
                  plan.isPopular
                    ? 'bg-[#151927] border-2 border-[#ff3278] shadow-2xl shadow-[#ff3278]/15 ring-1 ring-[#ff3278]/30 -translate-y-1'
                    : 'bg-[#121520] border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-6">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm ${
                        plan.isPopular
                          ? 'bg-[#ff3278] text-white'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="pt-2">
                    <h3 className="text-xl font-black text-white font-display">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400 leading-normal min-h-[36px]">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price display */}
                  <div className="mt-5 pb-5 border-b border-slate-800/80">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white font-mono tabular-nums">
                        ₹{currentPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-500 line-through font-mono tabular-nums">
                        ₹{originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-400 font-mono">
                        {savingsPercent}% OFF
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
                      <span>No-Cost EMI from</span>
                      <span className="font-semibold text-slate-200 font-mono">{plan.emiStartsFrom}</span>
                    </div>

                    <div className="mt-1 text-[11px] text-slate-400">
                      Pause membership up to <strong className="text-slate-300">{plan.pauseDays} days</strong> free
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mt-5 space-y-2.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      What's Included:
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-[#ff3278] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bonus Freebies */}
                  {plan.freebies && plan.freebies.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-800/60">
                      <div className="text-[11px] font-semibold text-amber-400 flex items-center gap-1 mb-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>Included Welcome Perks</span>
                      </div>
                      <div className="space-y-1">
                        {plan.freebies.map((freebie, i) => (
                          <div key={i} className="text-[11px] text-slate-400">
                            • {freebie}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-4">
                  <button
                    onClick={() => onSelectPlan(plan, duration)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-[#ff3278] to-[#ff5944] text-white hover:brightness-110 shadow-lg shadow-[#ff3278]/25'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>Get {plan.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Free trial alternative banner */}
        <div className="mt-12 bg-gradient-to-r from-[#171b29] to-[#141824] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center sm:text-left">
            <h4 className="text-lg font-bold text-white font-display">
              Not sure which pass to pick? Try Cult for free first.
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Claim a complimentary 1-day pass. Test out our Olympic gym equipment, meet our certified trainers, and experience a live group class with zero obligations.
            </p>
          </div>
          <button
            onClick={onOpenFreeTrial}
            className="px-6 py-3 text-xs font-bold text-white bg-slate-800 hover:bg-[#ff3278] border border-slate-700 hover:border-[#ff3278] rounded-xl transition-all whitespace-nowrap cursor-pointer shrink-0"
          >
            Claim Free 1-Day Trial
          </button>
        </div>
      </div>
    </section>
  );
};
