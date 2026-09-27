import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PassSelector } from './components/PassSelector';
import { WorkoutFormats } from './components/WorkoutFormats';
import { ClassSchedule } from './components/ClassSchedule';
import { CenterFinder } from './components/CenterFinder';
import { RoutineBuilder } from './components/RoutineBuilder';
import { TransformationSection } from './components/TransformationSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FreeTrialModal } from './components/FreeTrialModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SlotBookingModal } from './components/SlotBookingModal';
import { CultCity, CultCenter, MembershipPlan, MEMBERSHIP_PLANS, ClassSlot } from './data/cultData';

export default function App() {
  const [selectedCity, setSelectedCity] = useState<CultCity>('Bengaluru');
  const [selectedFormatFilter, setSelectedFormatFilter] = useState<string>('all');

  // Modals state
  const [isFreeTrialOpen, setIsFreeTrialOpen] = useState(false);
  const [trialCenter, setTrialCenter] = useState<CultCenter | null>(null);
  const [trialFormat, setTrialFormat] = useState<string>('hrx');

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<MembershipPlan>(MEMBERSHIP_PLANS[0]);
  const [checkoutDuration, setCheckoutDuration] = useState<'months3' | 'months12' | 'months14Festive'>('months12');

  const [isSlotBookingOpen, setIsSlotBookingOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<ClassSlot | null>(null);

  // Handlers
  const handleOpenFreeTrialWithCenter = (center: CultCenter) => {
    setTrialCenter(center);
    setSelectedCity(center.city as CultCity);
    setIsFreeTrialOpen(true);
  };

  const handleSelectFormatForBooking = (formatId: string) => {
    setSelectedFormatFilter(formatId);
    setTrialFormat(formatId);
    const scheduleElem = document.getElementById('schedule');
    scheduleElem?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPlanForCheckout = (
    plan: MembershipPlan,
    duration: 'months3' | 'months12' | 'months14Festive'
  ) => {
    setCheckoutPlan(plan);
    setCheckoutDuration(duration);
    setIsCheckoutOpen(true);
  };

  const handleBookSlot = (slot: ClassSlot) => {
    setSelectedSlot(slot);
    setIsSlotBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0c0e14] text-slate-100 flex flex-col font-sans selection:bg-[#ff3278] selection:text-white">
      {/* 3-Zone Navigation Header */}
      <Navbar
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        onOpenFreeTrial={() => {
          setTrialCenter(null);
          setIsFreeTrialOpen(true);
        }}
        onOpenPasses={() => {
          const passesElem = document.getElementById('passes');
          passesElem?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          onOpenFreeTrial={() => setIsFreeTrialOpen(true)}
          onSelectFormat={handleSelectFormatForBooking}
        />

        {/* Cultpass Memberships */}
        <PassSelector
          onSelectPlan={handleSelectPlanForCheckout}
          onOpenFreeTrial={() => setIsFreeTrialOpen(true)}
        />

        {/* Signature Group Classes Bento */}
        <WorkoutFormats
          onSelectFormatForBooking={handleSelectFormatForBooking}
          onOpenFreeTrial={() => setIsFreeTrialOpen(true)}
        />

        {/* Live Class Schedule & Booking */}
        <ClassSchedule
          selectedCity={selectedCity}
          selectedFormatFilter={selectedFormatFilter}
          onBookSlot={handleBookSlot}
        />

        {/* Gyms & Studios Location Finder */}
        <CenterFinder
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          onSelectCenterForTrial={handleOpenFreeTrialWithCenter}
        />

        {/* Interactive Routine & Calorie Calculator */}
        <RoutineBuilder
          onOpenFreeTrial={() => setIsFreeTrialOpen(true)}
          onSelectPlan={(planId) => {
            const plan = MEMBERSHIP_PLANS.find((p) => p.id === planId) || MEMBERSHIP_PLANS[0];
            handleSelectPlanForCheckout(plan, 'months12');
          }}
        />

        {/* Member Transformations & Evidence */}
        <TransformationSection
          onOpenFreeTrial={() => setIsFreeTrialOpen(true)}
        />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Refined Footer */}
      <Footer
        onSelectCity={setSelectedCity}
        onOpenFreeTrial={() => setIsFreeTrialOpen(true)}
      />

      {/* Interactive Free Trial VIP Pass Modal */}
      <FreeTrialModal
        isOpen={isFreeTrialOpen}
        onClose={() => setIsFreeTrialOpen(false)}
        defaultCity={selectedCity}
        defaultCenter={trialCenter}
        defaultFormat={trialFormat}
      />

      {/* Interactive Pass Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        plan={checkoutPlan}
        duration={checkoutDuration}
      />

      {/* Interactive Slot Booking Modal */}
      <SlotBookingModal
        isOpen={isSlotBookingOpen}
        onClose={() => setIsSlotBookingOpen(false)}
        slot={selectedSlot}
      />
    </div>
  );
}
