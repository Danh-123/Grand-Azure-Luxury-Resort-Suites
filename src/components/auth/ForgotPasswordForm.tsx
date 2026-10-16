'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/schemas/auth.schema';
import { AuthCard } from './AuthCard';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Mail, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    // Simulate recovery dispatch
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmittedEmail(data.email);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <AuthCard
        title="Check Your Inbox"
        subtitle="A secure recovery transmission has been dispatched to your email address."
        badge="Security Verification"
        footer={
          <p>
            Didn&apos;t receive the email?{' '}
            <button
              type="button"
              onClick={() => setIsSuccess(false)}
              className="font-semibold text-gold-700 hover:text-gold-800 hover:underline"
            >
              Click to try again
            </button>
          </p>
        }
      >
        <div className="space-y-lg text-center py-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 text-gold-700 border border-gold-300 shadow-glow-sm">
            <CheckCircle2 className="h-8 w-8 stroke-[2.5]" />
          </div>

          <div className="space-y-xs">
            <p className="text-body-sm text-charcoal-700">
              We have forwarded password reset instructions to:
            </p>
            <p className="text-body font-serif font-bold text-charcoal-900">
              {submittedEmail}
            </p>
            <p className="text-caption text-charcoal-500 pt-xs">
              For security reasons, this link will remain valid for 15 minutes.
            </p>
          </div>

          <div className="pt-md">
            <Link href="/login" className="block w-full">
              <Button variant="primary" size="lg" className="w-full">
                Return to Sign In
              </Button>
            </Link>
          </div>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Enter the email address affiliated with your membership to receive secure credentials recovery instructions."
      badge="Account Recovery"
      footer={
        <p>
          Remembered your password?{' '}
          <Link
            href="/login"
            className="font-semibold text-gold-700 hover:text-gold-800 hover:underline"
          >
            Sign In Here
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg">
        <FormField
          label="Registered Email Address"
          name="email"
          error={errors.email}
          required
          helperText="We will transmit a single-use authorization link."
        >
          <Input
            type="email"
            {...register('email')}
            placeholder="member@domain.com"
            autoComplete="email"
            leftIcon={<Mail className="h-4 w-4" />}
          />
        </FormField>

        <div className="space-y-sm pt-xs">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full font-serif font-bold tracking-wide shadow-glow"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Transmit Recovery Link
          </Button>

          <Link href="/login" className="block w-full text-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full text-charcoal-600 hover:text-charcoal-900"
              leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}
            >
              Back to Sign In
            </Button>
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}

