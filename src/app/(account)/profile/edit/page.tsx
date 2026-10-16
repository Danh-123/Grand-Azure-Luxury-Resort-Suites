import React from 'react';
import type { Metadata } from 'next';
import { ProfileEditForm } from '@/components/account';

export const metadata: Metadata = {
  title: 'Edit Profile | Grand Azure Luxury Resort',
  description: 'Update your profile information and contact details.',
};

export default function ProfileEditPage() {
  return <ProfileEditForm />;
}
