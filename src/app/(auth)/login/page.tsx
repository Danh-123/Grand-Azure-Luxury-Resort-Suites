import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { LoginForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Sign In | Grand Azure Luxury Resort',
  description: 'Sign in to your Grand Azure membership account to access reservations, billing, and VIP concierge privileges.',
};

function AuthLoadingFallback() {
  return (
    <div className="w-full max-w-md mx-auto h-[480px] rounded-2xl bg-charcoal-100/50 animate-pulse border border-border" />
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthLoadingFallback />}>
      <LoginForm />
    </Suspense>
  );
}
