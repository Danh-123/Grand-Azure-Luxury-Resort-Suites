import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { RegisterForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Create VIP Account | Grand Azure Luxury Resort',
  description: 'Join the Grand Azure Privilege Circle for bespoke rates, welcome champagne, and intuitive 24/7 butler service.',
};

function AuthLoadingFallback() {
  return (
    <div className="w-full max-w-md mx-auto h-[560px] rounded-2xl bg-charcoal-100/50 animate-pulse border border-border" />
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<AuthLoadingFallback />}>
      <RegisterForm />
    </Suspense>
  );
}
