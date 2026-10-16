'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/schemas/auth.schema';
import { useAuthStore } from '@/store/useAuthStore';
import { AuthCard } from './AuthCard';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { User, Mail, Phone, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/profile';

  const registerUser = useAuthStore((s) => s.register);
  const authError = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  const [localError, setLocalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreeTerms: true as unknown as undefined,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLocalError(null);
    clearError();

    const success = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    });

    if (success) {
      router.push(returnUrl);
    } else {
      setLocalError(useAuthStore.getState().error || 'Registration failed. Please try again.');
    }
  };

  const errorMessage = localError || authError;

  return (
    <AuthCard
      title="Create VIP Account"
      subtitle="Join the Grand Azure Privilege Circle for exclusive rates, complimentary champagne amenities, and personal butler access."
      badge="Privilege Membership"
      footer={
        <p>
          Already an Azure Member?{' '}
          <Link
            href={`/login${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`}
            className="font-semibold text-gold-700 hover:text-gold-800 hover:underline"
          >
            Sign In Here
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-md">
        {/* Error Banner */}
        {errorMessage && (
          <div
            className="flex items-start gap-sm rounded-xl border border-error-border bg-error-light/50 p-sm text-error text-left animate-in fade-in duration-fast"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="text-body-sm">
              <span className="font-semibold block">Registration Error</span>
              <span className="text-caption">{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Full Name */}
        <FormField
          label="Full Legal Name"
          name="name"
          error={errors.name}
          required
        >
          <Input
            {...register('name')}
            placeholder="Lord Julian Montgomery"
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
          >
            <Input
              type="email"
              {...register('email')}
              placeholder="member@domain.com"
              leftIcon={<Mail className="h-4 w-4" />}
            />
          </FormField>

          <FormField
            label="Phone Number"
            name="phone"
            error={errors.phone}
            required
          >
            <Input
              type="tel"
              {...register('phone')}
              placeholder="+1 555-0199"
              leftIcon={<Phone className="h-4 w-4" />}
            />
          </FormField>
        </div>

        {/* Password & Confirm Password Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <FormField
            label="Password"
            name="password"
            error={errors.password}
            required
            helperText="Min 8 chars, 1 uppercase & 1 number."
          >
            <Input
              type="password"
              {...register('password')}
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
            />
          </FormField>

          <FormField
            label="Confirm Password"
            name="confirmPassword"
            error={errors.confirmPassword}
            required
          >
            <Input
              type="password"
              {...register('confirmPassword')}
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
            />
          </FormField>
        </div>

        {/* Agree to Terms */}
        <div className="pt-xs text-left">
          <label className="flex items-start gap-xs text-caption text-charcoal-600 cursor-pointer select-none">
            <input
              type="checkbox"
              {...register('agreeTerms')}
              className="h-4 w-4 rounded border-border text-gold-600 focus:ring-gold-500 accent-gold-600 mt-0.5"
            />
            <span>
              I accept the Grand Azure{' '}
              <span className="text-gold-700 underline">Terms of Service</span> and{' '}
              <span className="text-gold-700 underline">Privacy Charter</span>.
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="text-caption text-error font-medium mt-1">
              {errors.agreeTerms.message}
            </p>
          )}
        </div>

        {/* Submit CTA */}
        <div className="pt-sm">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full font-serif font-bold tracking-wide shadow-glow"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Create VIP Account
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}

