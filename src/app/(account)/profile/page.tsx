import React from 'react';
import type { Metadata } from 'next';
import { ProfileView } from '@/components/account';

export const metadata: Metadata = {
  title: 'My Profile | Grand Azure Luxury Resort',
  description: 'View your guest account profile and membership privileges.',
};

export default function ProfilePage() {
  return <ProfileView />;
}
