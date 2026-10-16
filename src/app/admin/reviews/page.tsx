import React from 'react';
import type { Metadata } from 'next';
import { adminService } from '@/services/admin.service';
import { AdminReviewsTable } from '@/components/admin/AdminReviewsTable';

export const metadata: Metadata = {
  title: 'Guest Reviews Moderation | Grand Azure Admin',
  description: 'Moderate customer testimonials, audit hotel service ratings, and oversee feedback sentiment.',
};

export default async function AdminReviewsPage() {
  const reviews = await adminService.getReviews();

  return (
    <div className="space-y-xl">
      {/* Page Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-gold-700">
          Reputation & Feedback
        </span>
        <h1 className="text-h2 font-serif font-bold text-charcoal-900 mt-0.5">
          Guest Reviews Moderation
        </h1>
        <p className="text-body-sm text-charcoal-600 mt-1">
          Inspect guest testimonials, manage public visibility, and ensure Grand Azure luxury quality standards.
        </p>
      </div>

      {/* Interactive Admin Table */}
      <AdminReviewsTable initialReviews={reviews} />
    </div>
  );
}
