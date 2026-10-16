import React from 'react';
import type { Metadata } from 'next';
import { ForgotPasswordForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Reset Password | Grand Azure Luxury Resort',
  description: 'Request a secure credentials reset link for your Grand Azure membership account.',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
