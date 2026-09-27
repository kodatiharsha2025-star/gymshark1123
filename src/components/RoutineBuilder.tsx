import React, { useState } from 'react';
import { Target, Calendar, Flame, Zap, Dumbbell, Award, ArrowRight, Sparkles, Check } from 'lucide-react';

interface RoutineBuilderProps {
  onOpenFreeTrial: () => void;
  onSelectPlan: (planId: string) => void;
}

export const RoutineBuilder: React.FC<RoutineBuilderProps> = ({
  onOpenFreeTrial,
  onSelectPlan,
}) => {
  const [goal, setGoal] = useState<'fat_loss' | 'muscle' | 'athletic' | 'mobility'>('fat_loss');
  const [days, setDays] = useState<number>(4);
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Dynamic calculations based on inputs
  const routineData = React.useMemo(() => {
    switch (goal) {
      case 'fat_loss':
        return {
          title: 'High-Metabolic Fat Shred & Conditioning',
          calorieTarget: days * 580,
          recommendedPass: 'cultpass ELITE',
          passId: 'elite',
          focusHighlights: ['High VO2 max intervals', 'Full-body metabolic spikes', 'Post-workout caloric burn (EPOC)'],
          weeklySplit: [
            { day: 'Mon', format: 'HRX Workout', type: 'High Intensity Intervals', duration: '50m', burn: '620 kcal' },
            { day: 'Tue', format: 'Dance Fitness', type: 'Cardio Calorie Burner', duration: '50m', burn: '540 kcal' },
            { day: 'Wed', format: 'Active Recovery', type: 'Mobility & Light Walking', duration: '30m', burn: '150 kcal' },
            { day: 'Thu', format: 'Boxing & Combat', type: 'Aqua Bag Combos & Agility', duration: '50m', burn: '650 kcal' },
            { day: 'Fri', format: 'Strength & Conditioning', type: 'Compound Kettlebell Metcon', duration: '50m', burn: '680 kcal' },
            { day: 'Sat', format: 'Yoga & Recovery', type: 'Spine & Hip Flexor Flow', duration: '50m', burn: '320 kcal' },
            { day: 'Sun', format: 'Rest Day', type: 'Hydration & Nutrition Prep', duration: '—', burn: '0 kcal' },
          ].slice(0, 7),
        };
      case 'muscle':
        return {
          title: 'Hypertrophy, Powerlifting & Density Split',
          calorieTarget: days * 520,
          recommendedPass: 'cultpass ELITE',
          passId: 'elite',
          focusHighlights: ['Progressive overload compound lifts', 'Time under tension', 'Olympic platforms & Hammer Strength rigs'],
          weeklySplit: [
            { day: 'Mon', format: 'Strength & Conditioning', type: 'Deadlifts & Lower Body Strength', duration: '50m', burn: '650 kcal' },
            { day: 'Tue', format: 'Cult Gym Floor', type: 'Upper Chest, Shoulders & Triceps', duration: '60m', burn: '500 kcal' },
            { day: 'Wed', format: 'Active Recovery', type: 'Foam Rolling & Core Stability', duration: '30m', burn: '120 kcal' },
            { day: 'Thu', format: 'HRX Workout', type: 'Functional Athletic Hypertrophy', duration: '50m', burn: '590 kcal' },
            { day: 'Fri', format: 'Cult Gym Floor', type: 'Back Width, Biceps & Hamstrings', duration: '60m', burn: '520 kcal' },
            { day: 'Sat', format: 'Strength & Conditioning', type: 'Clean & Jerk / Dumbbell Thrusters', duration: '50m', burn: '680 kcal' },
            { day: 'Sun', format: 'Rest Day', type: 'Sleep & Muscle Synthesis', duration: '—', burn: '0 kcal' },
          ].slice(0, 7),
        };
      case 'athletic':
        return {
          title: 'Total Athletic Stamina & Speed Conditioning',
          calorieTarget: days * 610,
          recommendedPass: 'cultpass ELITE',
          passId: 'elite',
          focusHighlights: ['Agility ladder & turf sprints', 'Cardiovascular endurance', 'Rotational boxing torque'],
          weeklySplit: [
            { day: 'Mon', format: 'HRX Workout', type: 'Explosive Functional Metcon', duration: '50m', burn: '640 kcal' },
            { day: 'Tue', format: 'Boxing & Combat', type: 'Aqua Bag Striking & Footwork', duration: '50m', burn: '670 kcal' },
            { day: 'Wed', format: 'Yoga & Recovery', type: 'Joint Decompression & Breathwork', duration: '50m', burn: '330 kcal' },
            { day: 'Thu', format: 'Strength & Conditioning', type: 'Assault Bike & Kettlebells', duration: '50m', burn: '710 kcal' },
            { day: 'Fri', format: 'Dance Fitness', type: 'High-Tempo Rhythm Cardio', duration: '50m', burn: '550 kcal' },
            { day: 'Sat', format: 'Cult Gym Turf', type: 'Sled Pushes & Olympic Rowers', duration: '50m', burn: '620 kcal' },
            { day: 'Sun', format: 'Rest Day', type: 'Full System Regeneration', duration: '—', burn: '0 kcal' },
          ].slice(0, 7),
        };
      case 'mobility':
        return {
          title: 'Postural Reset, Mobility & Spine Longevity',
          calorieTarget: days * 390,
          recommendedPass: 'cultpass PRO',
          passId: 'pro',
          focusHighlights: ['Reversing desk posture & anterior tilt', 'Glute & scapular activation', 'Stress reduction & mindfulness'],
          weeklySplit: [
            { day: 'Mon', format: 'Yoga & Mobility', type: 'Spine & Hamstring Release Flow', duration: '50m', burn: '340 kcal' },
            { day: 'Tue', format: 'HRX Low Impact', type: 'Joint-Friendly Functional Stability', duration: '50m', burn: '480 kcal' },
            { day: 'Wed', format: 'Cult Gym Mobility Zone', type: 'Cable Face-Pulls & Core Bracing', duration: '45m', burn: '380 kcal' },
            { day: 'Thu', format: 'Dance Fitness', type: 'Fun Freeform Aerobic Movement', duration: '50m', burn: '510 kcal' },
            { day: 'Fri', format: 'Yoga & Recovery', type: 'Hip Openers & Pranayama', duration: '50m', burn: '320 kcal' },
            { day: 'Sat', format: 'Light Gym Floor', type: 'Glute Hyper-extensions & Back Care', duration: '45m', burn: '350 kcal' },
            { day: 'Sun', format: 'Rest & Sauna', type: 'Hot Steam & Deep Relaxation', duration: '—', burn: '0 kcal' },
          ].slice(0, 7),
        };
    }
  }, [goal, days]);

  const handleSaveRoutine = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <section id="planner" className="py-16 lg:py-24 bg-[#0c0e14] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-widest uppercase text-[#ff3278] mb-2 font-mono">
            WORKOUT ROUTINE CALCULATOR
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            Personalize Your Cult Weekly Split
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Tell us your goals and schedule. We'll map out a balanced, high-efficiency weekly program combining Cult group classes and gym floor sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-5 bg-[#121522] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            {/* Step 1: Goal */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                1. Select Primary Fitness Goal
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'fat_loss', label: 'Fat Shred & Tone', sub: 'Calorie torching' },
                  { id: 'muscle', label: 'Muscle Hypertrophy', sub: 'Strength & size' },
                  { id: 'athletic', label: 'Athletic Conditioning', sub: 'Speed & stamina' },
                  { id: 'mobility', label: 'Posture & Mobility', sub: 'Joint health' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGoal(item.id as any)}
                    className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                      goal === item.id
                        ? 'bg-[#ff3278]/15 border-[#ff3278] text-white ring-1 ring-[#ff3278]/30'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Frequency */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Workout Frequency
                </label>
                <span className="text-xs font-mono font-bold text-[#ff3278]">
                  {days} Days / Week
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setDays(num)}
                    className={`py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      days === num
                        ? 'bg-[#ff3278] border-[#ff3278] text-white shadow-md shadow-[#ff3278]/25'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {num} Days
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Experience */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                3. Fitness Experience
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'beginner', label: 'Beginner' },
                  { id: 'intermediate', label: 'Regular' },
                  { id: 'advanced', label: 'Advanced' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLevel(item.id as any)}
                    className={`py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border capitalize ${
                      level === item.id
                        ? 'bg-slate-800 border-slate-600 text-white font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Metrics Calculation */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Est. Weekly Burn</div>
                <div className="text-xl font-black text-white font-mono mt-0.5">
                  ~{routineData.calorieTarget.toLocaleString('en-IN')} kcal
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Recommended</div>
                <div className="text-xs font-black text-[#ff3278] mt-1 font-mono uppercase">
                  {routineData.recommendedPass}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tailored Weekly Split */}
          <div className="lg:col-span-7 bg-[#141824] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
                <div>
                  <span className="text-[11px] font-mono text-[#ff3278] uppercase font-bold tracking-wider">
                    Calculated Blueprint
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">
                    {routineData.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveRoutine}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    {savedSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Plan Saved!</span>
                      </>
                    ) : (
                      <span>Save Routine</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Weekly Day by Day Split */}
              <div className="mt-5 space-y-2.5">
                {routineData.weeklySplit.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#111420] border border-slate-800/80 rounded-xl flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 text-center font-mono text-xs font-bold text-[#ff3278] shrink-0">
                        {item.day}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          {item.format}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {item.type}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-semibold text-slate-300">
                        {item.burn}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {item.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Split Bottom CTAs */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                Unlock full access to this routine with{' '}
                <strong className="text-white">{routineData.recommendedPass}</strong>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenFreeTrial}
                  className="px-4.5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#ff3278] to-[#ff5944] rounded-xl hover:brightness-110 shadow-lg shadow-[#ff3278]/25 transition-all cursor-pointer"
                >
                  Test Split with Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
