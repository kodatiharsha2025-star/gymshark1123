import React from 'react';
import { Quote, Award, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { TRANSFORMATION_STORIES } from '../data/cultData';

interface TransformationSectionProps {
  onOpenFreeTrial: () => void;
}

export const TransformationSection: React.FC<TransformationSectionProps> = ({
  onOpenFreeTrial,
}) => {
  return (
    <section id="stories" className="py-16 lg:py-24 bg-[#0a0c10] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold tracking-widest uppercase text-[#ff3278] mb-2 font-mono">
            REAL MEMBERS · QUANTIFIED RESULTS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            Proof of Impact: From Reluctance to Record Lifts
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Cult isn't just about showing up. It's about measurable improvements in body composition, cardiovascular endurance, and daily vitality.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRANSFORMATION_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-[#121522] border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl relative"
            >
              <div>
                {/* Highlight Metric */}
                <div className="inline-block text-xs font-black tracking-wide text-[#ff3278] bg-[#ff3278]/10 border border-[#ff3278]/25 px-3 py-1 rounded-md mb-4 font-mono">
                  {story.highlightMetric}
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{story.quote}"
                </blockquote>

                {/* Quantified Metrics Box */}
                <div className="bg-[#161a29] border border-slate-800/90 rounded-2xl p-4 mb-6 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Weight Shift</div>
                    <div className="text-xs font-black text-white font-mono mt-0.5">
                      {story.stats.weightChange}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Body Fat Shift</div>
                    <div className="text-xs font-black text-emerald-400 font-mono mt-0.5">
                      {story.stats.bodyFatChange}
                    </div>
                  </div>
                </div>
              </div>

              {/* Attribution Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white font-display">
                    {story.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {story.center} · {story.duration}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase">Mentored by</div>
                  <div className="text-xs font-semibold text-slate-200">
                    {story.trainerAssigned}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Proof Strip */}
        <div className="mt-14 pt-10 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff3278] to-[#ff5944] flex items-center justify-center text-white font-black font-display text-lg">
              #
            </div>
            <div>
              <div className="text-sm font-bold text-white">#BeBetterEveryDay</div>
              <div className="text-xs text-slate-400">
                Join 2.5 million fitness enthusiasts checking into Cult every week.
              </div>
            </div>
          </div>

          <button
            onClick={onOpenFreeTrial}
            className="px-5 py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-[#ff3278] border border-slate-700 hover:border-[#ff3278] rounded-xl transition-all cursor-pointer whitespace-nowrap"
          >
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};
