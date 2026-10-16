'use client';

import React, { useState } from 'react';
import { Review } from '@/types/review';
import { Rating } from '@/components/ui/Rating';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Quote, Sparkles, ChevronDown } from 'lucide-react';

interface ReviewListProps {
  reviews: Review[];
  overallRating: number;
  totalReviewCount: number;
}

export function ReviewList({
  reviews,
  overallRating,
  totalReviewCount,
}: ReviewListProps) {
  const [visibleCount, setVisibleCount] = useState(4);

  const displayReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  return (
    <div className="space-y-xl pt-2xl border-t border-border" id="reviews">
      {/* Header & Scorecard */}
      <div className="space-y-sm">
        <div className="inline-flex items-center gap-xs text-gold-600 text-caption font-semibold uppercase tracking-widest">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Guest Chronicles</span>
        </div>
        <h3 className="text-h2 font-serif font-bold text-charcoal-900">
          Verified Guest Impressions
        </h3>
      </div>

      {/* Aggregate Scorecard Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-lg rounded-2xl border border-border bg-background-elevated p-lg sm:p-xl shadow-sm">
        <div className="flex items-center gap-lg">
          <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-gold-50 border border-gold-500/30 text-gold-800">
            <span className="text-display font-serif font-bold leading-none">
              {overallRating.toFixed(1)}
            </span>
            <span className="text-[10px] uppercase font-semibold text-charcoal-500 mt-1">
              out of 5.0
            </span>
          </div>

          <div className="space-y-xs">
            <Rating value={overallRating} size="lg" />
            <p className="text-body-sm text-charcoal-600">
              Based on{' '}
              <span className="font-semibold text-charcoal-900">
                {totalReviewCount} verified stays
              </span>
            </p>
          </div>
        </div>

        {/* Breakdown Subscores */}
        <div className="grid grid-cols-2 gap-x-xl gap-y-xs text-caption text-charcoal-600 border-t sm:border-t-0 sm:border-l border-border pt-md sm:pt-0 sm:pl-xl">
          <div className="flex justify-between gap-md">
            <span>Tranquility & Acoustic</span>
            <span className="font-bold text-charcoal-900">5.0</span>
          </div>
          <div className="flex justify-between gap-md">
            <span>Personal Butler</span>
            <span className="font-bold text-charcoal-900">4.9</span>
          </div>
          <div className="flex justify-between gap-md">
            <span>Cleanliness & Linens</span>
            <span className="font-bold text-charcoal-900">5.0</span>
          </div>
          <div className="flex justify-between gap-md">
            <span>Ocean Horizons</span>
            <span className="font-bold text-charcoal-900">5.0</span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-xl text-center">
          <p className="text-body-sm text-charcoal-500">
            No guest reviews recorded yet for this residence. Be among the first to experience its grandeur.
          </p>
        </div>
      ) : (
        <div className="space-y-md">
          {displayReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-border bg-background-elevated p-lg sm:p-xl shadow-sm space-y-md transition-all duration-base hover:border-gold-500/40"
            >
              {/* Review Header: Guest Avatar, Name, Rating, Date */}
              <div className="flex items-start justify-between gap-md">
                <div className="flex items-center gap-md">
                  <Avatar
                    src={review.userAvatar}
                    name={review.userName}
                    size="md"
                  />
                  <div>
                    <div className="flex items-center gap-xs">
                      <h4 className="text-body-sm font-semibold text-charcoal-900">
                        {review.userName}
                      </h4>
                      <Badge variant="luxury" className="text-[10px] py-0 px-xs">
                        Verified Stay
                      </Badge>
                    </div>
                    <p className="text-caption text-charcoal-500">
                      {review.userCountry ? `${review.userCountry} • ` : ''}
                      {review.stayDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-xs">
                  <Rating value={review.rating} size="sm" />
                </div>
              </div>

              {/* Comment Body */}
              <div className="relative pl-sm border-l-2 border-gold-500/40">
                <p className="text-body-sm text-charcoal-700 italic font-light leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>
            </div>
          ))}

          {/* Show More Trigger */}
          {hasMore && (
            <div className="pt-md text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVisibleCount((prev) => prev + 4)}
                rightIcon={<ChevronDown className="h-4 w-4" />}
              >
                Show More Impressions ({reviews.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

