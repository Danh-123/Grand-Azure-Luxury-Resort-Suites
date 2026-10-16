'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface BookingStepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const STEPS = [
  { step: 1, title: 'Dates & Guests', shortTitle: 'Dates' },
  { step: 2, title: 'Guest Information', shortTitle: 'Details' },
  { step: 3, title: 'Review & Payment', shortTitle: 'Review' },
  { step: 4, title: 'Confirmation', shortTitle: 'Confirmed' },
];

export function BookingStepper({ currentStep, onStepClick }: BookingStepperProps) {
  return (
    <div className="w-full py-md sm:py-lg" aria-label="Booking Progress">
      <div className="relative flex items-center justify-between max-w-3xl mx-auto px-xs">
        {/* Connecting Progress Line */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[2px] bg-charcoal-200 z-0">
          <div
            className="h-full bg-gold-500 transition-all duration-base ease-luxury"
            style={{
              width: `${((Math.min(currentStep, 4) - 1) / (STEPS.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps Indicators */}
        {STEPS.map((s) => {
          const isCompleted = currentStep > s.step;
          const isCurrent = currentStep === s.step;
          const isClickable = onStepClick && s.step < currentStep && currentStep < 4;

          return (
            <div key={s.step} className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(s.step)}
                className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full text-body-sm font-bold transition-all duration-base min-h-touchMin min-w-touchMin ${
                  isCompleted
                    ? 'bg-gold-500 text-charcoal-900 shadow-md ring-4 ring-gold-100 cursor-pointer'
                    : isCurrent
                    ? 'border-2 border-gold-500 bg-background-elevated text-gold-700 ring-4 ring-gold-100 shadow-glow-sm'
                    : 'border-2 border-charcoal-200 bg-background-elevated text-charcoal-400 cursor-not-allowed'
                }`}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`Step ${s.step}: ${s.title}`}
              >
                {isCompleted ? <Check className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" /> : s.step}
              </button>

              <span
                className={`mt-xs text-[11px] sm:text-caption font-semibold tracking-wider uppercase transition-colors hidden sm:block ${
                  isCurrent
                    ? 'text-gold-700'
                    : isCompleted
                    ? 'text-charcoal-800'
                    : 'text-charcoal-400'
                }`}
              >
                {s.title}
              </span>

              <span
                className={`mt-xs text-[10px] font-semibold uppercase sm:hidden ${
                  isCurrent ? 'text-gold-700' : 'text-charcoal-400'
                }`}
              >
                {s.shortTitle}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

