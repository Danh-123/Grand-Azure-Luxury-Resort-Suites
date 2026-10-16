import React from 'react';
import { mockReviews } from '@/mock/reviews.mock';
import { Container, Section, Grid } from '@/components/layout';
import { Rating, Avatar, Badge } from '@/components/ui';
import { Quote, Sparkles } from 'lucide-react';

export function TestimonialsSection() {
  const reviews = mockReviews.slice(0, 6);

  return (
    <Section spacing="xl" background="subtle" id="testimonials">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-2xl space-y-xs">
          <div className="inline-flex items-center gap-xs text-gold-600 font-semibold tracking-widest text-caption uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Guest Accolades</span>
          </div>
          <h2 className="text-h2 font-serif font-bold text-charcoal-900 tracking-tight">
            Echoes of Unrivaled Hospitality
          </h2>
          <p className="text-body text-charcoal-600 font-light">
            Memories of tranquil moments, bespoke service, and unforgettable coastal horizons shared by our esteemed guests.
          </p>
        </div>

        {/* 6 Reviews Grid (Responsive: 1 col mobile, 2 col tablet, 3 col desktop) */}
        <Grid cols={3} gap="lg">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between rounded-2xl border border-border bg-background-elevated p-lg sm:p-xl shadow-sm transition-all duration-base hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-glow-sm"
            >
              <div className="space-y-md">
                {/* Top Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <Rating value={review.rating} readOnly size="sm" />
                  <Quote className="h-6 w-6 text-gold-400/40" />
                </div>

                {/* Comment */}
                <p className="text-body-sm text-charcoal-700 italic font-light leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Guest Profile Footer */}
              <div className="flex items-center gap-md pt-lg mt-md border-t border-border/70">
                <Avatar
                  src={review.userAvatar}
                  name={review.userName}
                  size="md"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-xs">
                    <h4 className="text-body-sm font-semibold text-charcoal-900 truncate">
                      {review.userName}
                    </h4>
                    <Badge variant="luxury" className="text-[10px] py-0 px-xs shrink-0">
                      Verified Stay
                    </Badge>
                  </div>
                  <p className="text-caption text-charcoal-500 truncate">
                    {review.userCountry} • {review.stayDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

