'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { guestInfoSchema, GuestInfoFormData } from '@/schemas/booking.schema';
import { useBookingStore } from '@/store/useBookingStore';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { User, Mail, Phone, Clock, ArrowLeft, ArrowRight } from 'lucide-react';

export function StepGuestInfo() {
  const guestInfo = useBookingStore((s) => s.guestInfo);
  const setGuestInfo = useBookingStore((s) => s.setGuestInfo);
  const nextStep = useBookingStore((s) => s.nextStep);
  const prevStep = useBookingStore((s) => s.prevStep);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GuestInfoFormData>({
    resolver: zodResolver(guestInfoSchema),
    defaultValues: {
      fullName: guestInfo.fullName || '',
      email: guestInfo.email || '',
      phone: guestInfo.phone || '',
      specialRequests: guestInfo.specialRequests || '',
      estimatedArrival: '15:00',
    },
  });

  const onSubmit = (data: GuestInfoFormData) => {
    setGuestInfo(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-xl">
      <div className="space-y-xs">
        <h2 className="text-h2 font-serif font-bold text-charcoal-900">
          Step 2: Guest Information
        </h2>
        <p className="text-body text-charcoal-600 font-light">
          Please provide the lead guest details for reservation confirmation and personal butler coordination.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-background-elevated p-lg sm:p-xl space-y-lg shadow-sm">
        {/* Full Name */}
        <FormField
          label="Full Legal Name"
          name="fullName"
          error={errors.fullName}
          required
        >
          <Input
            {...register('fullName')}
            placeholder="e.g. Lord Julian Montgomery"
            leftIcon={<User className="h-4 w-4" />}
          />
        </FormField>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <FormField
            label="Email Address"
            name="email"
            error={errors.email}
            required
            helperText="Confirmation itinerary will be delivered here."
          >
            <Input
              type="email"
              {...register('email')}
              placeholder="guest@domain.com"
              leftIcon={<Mail className="h-4 w-4" />}
            />
          </FormField>

          <FormField
            label="Phone Number"
            name="phone"
            error={errors.phone}
            required
            helperText="For pre-arrival concierge coordination."
          >
            <Input
              type="tel"
              {...register('phone')}
              placeholder="+1 (555) 019-2834"
              leftIcon={<Phone className="h-4 w-4" />}
            />
          </FormField>
        </div>

        {/* Estimated Arrival Time */}
        <FormField
          label="Estimated Arrival Time"
          name="estimatedArrival"
          error={errors.estimatedArrival}
          helperText="Standard check-in starts at 15:00. Early check-in subject to availability."
        >
          <Input
            type="time"
            {...register('estimatedArrival')}
            leftIcon={<Clock className="h-4 w-4" />}
          />
        </FormField>

        {/* Special Requests */}
        <FormField
          label="Bespoke Wishes & Dietary Preferences (Optional)"
          name="specialRequests"
          error={errors.specialRequests}
          helperText="Allergies, high floor preference, airport limousine arrival, or champagne on ice."
        >
          <Textarea
            {...register('specialRequests')}
            rows={3}
            placeholder="Let our butler team know how we can tailor your sanctuary..."
          />
        </FormField>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-md">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={prevStep}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Dates
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          Continue to Summary
        </Button>
      </div>
    </form>
  );
}

