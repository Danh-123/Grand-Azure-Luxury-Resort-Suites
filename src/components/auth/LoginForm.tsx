'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/schemas/auth.schema';
import { useAuthStore } from '@/store/useAuthStore';
import { AuthCard } from './AuthCard';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Mail, Lock, AlertCircle, ArrowRight, KeyRound } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/profile';

  const login = useAuthStore((s) => s.login);
  const authError = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  const [localError, setLocalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLocalError(null);
    clearError();

    const success = await login({
      email: data.email,
      password: data.password,
    });

    if (success) {
      router.push(returnUrl);
    } else {
      setLocalError(useAuthStore.getState().error || 'Invalid email or credentials.');
    }
  };

  const handleFillDemo = (email: string, pass: string) => {
    setValue('email', email, { shouldValidate: true });
    setValue('password', pass, { shouldValidate: true });
  };

  const errorMessage = localError || authError;

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to your Grand Azure membership account to manage reservations and concierge privileges."
      badge="Member Access"
      footer={
        <p>
          Not an Azure Member yet?{' '}
          <Link
            href={`/register${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`}
            className="font-semibold text-gold-700 hover:text-gold-800 hover:underline"
          >
            Create an Account
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-md">
        {/* Return URL Notification Banner */}
        {searchParams.get('returnUrl') && (
          <div className="rounded-xl bg-gold-50 p-sm border border-gold-300 text-[12px] text-gold-800 text-left">
            <span>
              ✦ Please sign in to finalize your booking reservation. You will be redirected immediately afterwards.
            </span>
          </div>
        )}

        {/* Error Banner */}
        {errorMessage && (
          <div
            className="flex items-start gap-sm rounded-xl border border-error-border bg-error-light/50 p-sm text-error text-left animate-in fade-in duration-fast"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="text-body-sm">
              <span className="font-semibold block">Authentication Failed</span>
              <span className="text-caption">{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Email Field */}
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
            autoComplete="email"
            leftIcon={<Mail className="h-4 w-4" />}
          />
        </FormField>

        {/* Password Field */}
        <FormField
          label="Password"
          name="password"
          error={errors.password}
          required
        >
          <Input
            type="password"
            {...register('password')}
            placeholder="••••••••"
            autoComplete="current-password"
            leftIcon={<Lock className="h-4 w-4" />}
          />
        </FormField>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-caption pt-xs">
          <label className="flex items-center gap-xs text-charcoal-600 cursor-pointer select-none">
            <input
              type="checkbox"
              {...register('rememberMe')}
              className="h-4 w-4 rounded border-border text-gold-600 focus:ring-gold-500 accent-gold-600"
            />
            <span>Remember this device</span>
          </label>

          <Link
            href="/forgot-password"
            className="text-gold-700 hover:text-gold-800 hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <div className="pt-sm">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full font-serif font-bold tracking-wide shadow-glow"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Sign In
          </Button>
        </div>

        {/* Quick Demo Credentials Assistant */}
        <div className="pt-md border-t border-border/60 text-left space-y-xs">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-charcoal-400 uppercase tracking-wider">
            <KeyRound className="h-3 w-3 text-gold-600" />
            <span>Demo Test Credentials:</span>
          </div>

          <div className="flex flex-wrap gap-xs">
            <button
              type="button"
              onClick={() => handleFillDemo('elena.rostova@luxurytravel.com', 'Azure2026!')}
              className="rounded-md border border-border bg-background px-xs py-[2px] text-[11px] text-charcoal-600 hover:border-gold-500 hover:text-gold-700 transition-colors"
            >
              VIP Guest
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('admin@grandazure.com', 'Admin2026!')}
              className="rounded-md border border-border bg-background px-xs py-[2px] text-[11px] text-charcoal-600 hover:border-gold-500 hover:text-gold-700 transition-colors"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('fail@error.com', 'wrongpassword')}
              className="rounded-md border border-error-border bg-error-light/30 px-xs py-[2px] text-[11px] text-error hover:bg-error-light transition-colors"
            >
              Simulate Failure
            </button>
          </div>
        </div>
      </form>
    </AuthCard>
  );
}

