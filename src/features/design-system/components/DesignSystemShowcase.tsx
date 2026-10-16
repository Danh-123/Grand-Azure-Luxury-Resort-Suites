'use client';

import React, { useState } from 'react';
import {
  Button,
  Input,
  Textarea,
  Select,
  DatePicker,
  GuestCounter,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Modal,
  useToast,
  Tabs,
  Rating,
  Skeleton,
  RoomCardSkeleton,
  EmptyState,
  ErrorState,
  Pagination,
  Avatar,
  Tooltip,
} from '@/components/ui';
import { Container, Section, Grid } from '@/components/layout';
import { Sparkles, ArrowRight, BedDouble, Search, Heart, Wifi, Coffee } from 'lucide-react';

export function DesignSystemShowcase() {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guests, setGuests] = useState(2);
  const [activeTab, setActiveTab] = useState('all');
  const [interactiveRating, setInteractiveRating] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      showToast({
        type: 'success',
        title: 'Connection Restored',
        message: 'Successfully reconnected to hotel reservation engine.',
      });
    }, 1200);
  };

  return (
    <div className="space-y-4xl pb-4xl">
      {/* 1. TYPOGRAPHY & DESIGN TOKENS */}
      <section className="space-y-lg border-b border-border pb-3xl">
        <div className="space-y-xs">
          <Badge variant="luxury">Foundation 02</Badge>
          <h2 className="text-h2 font-serif font-bold text-charcoal-900">
            Typography & Luxury Aesthetics
          </h2>
          <p className="text-body text-charcoal-600 max-w-2xl">
            Serif headings paired with sleek, legible sans-serif body text, elevated with luxury Gold & Champagne accents.
          </p>
        </div>

        <div className="space-y-md rounded-xl border border-border bg-background-elevated p-xl">
          <h1 className="text-display font-serif font-bold text-charcoal-900">
            Display: Presidential Ocean Suite
          </h1>
          <h2 className="text-h1 font-serif font-semibold text-charcoal-900">
            Heading 1: Timeless Sophistication
          </h2>
          <h3 className="text-h2 font-serif font-semibold text-charcoal-900">
            Heading 2: Curated Guest Experiences
          </h3>
          <h4 className="text-h3 font-serif font-medium text-charcoal-900">
            Heading 3: Culinary Artistry & Private Dining
          </h4>
          <h5 className="text-h4 font-serif font-medium text-charcoal-800">
            Heading 4: Wellness Sanctuary & Spa Retreat
          </h5>
          <p className="text-body-lg text-charcoal-700 leading-relaxed">
            Body Large: Immerse yourself in an intimate enclave where traditional craftsmanship meets state-of-the-art contemporary luxury.
          </p>
          <p className="text-body text-charcoal-600">
            Body Regular: Every suite offers panoramic vistas over pristine emerald waters, tailored 24-hour concierge service, and curated bespoke amenities.
          </p>
          <p className="text-body-sm text-charcoal-500">
            Body Small: Taxes and resort service charges included. Cancellation available up to 48 hours prior to check-in.
          </p>
          <p className="text-caption text-gold-700 uppercase tracking-widest font-semibold">
            Caption: Complimentary Valet & Helicopter Transfer Included
          </p>
        </div>
      </section>

      {/* 2. BUTTONS */}
      <section className="space-y-lg border-b border-border pb-3xl">
        <div className="space-y-xs">
          <Badge variant="luxury">UI Primitives</Badge>
          <h2 className="text-h2 font-serif font-bold text-charcoal-900">
            Buttons & Interactive Controls
          </h2>
          <p className="text-body text-charcoal-600">
            All variants support loading spinners, left/right icons, and guarantee minimum 44x44px touch targets.
          </p>
        </div>

        <div className="space-y-xl rounded-xl border border-border bg-background-elevated p-xl">
          <div>
            <h4 className="text-body-sm font-semibold text-charcoal-700 mb-md uppercase tracking-wider">
              Variants
            </h4>
            <div className="flex flex-wrap items-center gap-md">
              <Button variant="primary">Primary Gold</Button>
              <Button variant="secondary">Secondary Dark</Button>
              <Button variant="outline">Outline Elegant</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger Action</Button>
            </div>
          </div>

          <div>
            <h4 className="text-body-sm font-semibold text-charcoal-700 mb-md uppercase tracking-wider">
              Sizes
            </h4>
            <div className="flex flex-wrap items-center gap-md">
              <Button size="sm">Small (sm)</Button>
              <Button size="md">Medium (md)</Button>
              <Button size="lg">Large (lg)</Button>
            </div>
          </div>

          <div>
            <h4 className="text-body-sm font-semibold text-charcoal-700 mb-md uppercase tracking-wider">
              States & Icons
            </h4>
            <div className="flex flex-wrap items-center gap-md">
              <Button leftIcon={<Sparkles className="h-4 w-4" />}>
                Bespoke Experience
              </Button>
              <Button rightIcon={<ArrowRight className="h-4 w-4" />}>
                Proceed to Checkout
              </Button>
              <Button isLoading>Processing Booking</Button>
              <Button disabled>Disabled Action</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FORM INPUTS & SELECTORS */}
      <section className="space-y-lg border-b border-border pb-3xl">
        <div className="space-y-xs">
          <Badge variant="luxury">Form Controls</Badge>
          <h2 className="text-h2 font-serif font-bold text-charcoal-900">
            Form Controls & Steppers
          </h2>
          <p className="text-body text-charcoal-600">
            Inputs, Textarea, Select, DatePicker, and custom GuestCounter stepper.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-background-elevated p-xl">
          <Grid cols={3} gap="lg">
            <Input
              label="Full Name"
              placeholder="e.g. Lord Alexander Windsor"
              helperText="Enter your official passport name"
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="guest@luxuryresort.com"
              leftIcon={<Search className="h-4 w-4" />}
            />
            <Input
              label="Loyalty VIP Code"
              placeholder="AZURE-8899"
              error="Invalid or expired VIP invitation code"
            />

            <Select
              label="Room Category"
              placeholder="Choose a suite tier"
              options={[
                { value: 'deluxe', label: 'Deluxe Ocean View' },
                { value: 'executive', label: 'Executive Villa' },
                { value: 'presidential', label: 'Presidential Penthouse Suite' },
              ]}
            />

            <DatePicker
              label="Check-in Date"
              helperText="Standard check-in from 14:00"
            />

            <GuestCounter
              label="Adults & Children"
              description="Max 6 guests per suite"
              value={guests}
              onChange={setGuests}
            />
          </Grid>

          <div className="mt-xl">
            <Textarea
              label="Special Requests / Dietary Requirements"
              placeholder="Let our concierge know if you need airport limousine pickup, floral arrangements, or bespoke champagne on arrival."
            />
          </div>
        </div>
      </section>

      {/* 4. BADGES & RATINGS */}
      <section className="space-y-lg border-b border-border pb-3xl">
        <div className="space-y-xs">
          <Badge variant="luxury">Status & Feedback</Badge>
          <h2 className="text-h2 font-serif font-bold text-charcoal-900">
            Badges, Ratings & Avatars
          </h2>
        </div>

        <div className="space-y-xl rounded-xl border border-border bg-background-elevated p-xl">
          <div>
            <h4 className="text-body-sm font-semibold text-charcoal-700 mb-md uppercase tracking-wider">
              Status Badges
            </h4>
            <div className="flex flex-wrap items-center gap-md">
              <Badge variant="pending">Pending Confirmation</Badge>
              <Badge variant="confirmed">Confirmed</Badge>
              <Badge variant="completed">Completed Stay</Badge>
              <Badge variant="cancelled">Cancelled</Badge>
              <Badge variant="luxury">Michelin 3-Star Award</Badge>
              <Badge variant="outline">High Floor</Badge>
              <Badge variant="neutral">Non-Smoking</Badge>
            </div>
          </div>

          <div>
            <h4 className="text-body-sm font-semibold text-charcoal-700 mb-md uppercase tracking-wider">
              Star Ratings
            </h4>
            <div className="flex flex-wrap items-center gap-2xl">
              <div>
                <p className="text-caption text-charcoal-500 mb-xs">Read-Only with score:</p>
                <Rating value={4.9} showNumber reviewsCount={128} size="lg" />
              </div>
              <div>
                <p className="text-caption text-charcoal-500 mb-xs">Interactive (click to rate):</p>
                <Rating
                  value={interactiveRating}
                  readOnly={false}
                  onChange={setInteractiveRating}
                  size="lg"
                  showNumber
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-body-sm font-semibold text-charcoal-700 mb-md uppercase tracking-wider">
              Avatars & Tooltips
            </h4>
            <div className="flex items-center gap-lg">
              <Tooltip content="VIP Diamond Concierge">
                <Avatar name="Grand Concierge" size="lg" />
              </Tooltip>
              <Tooltip content="Executive Chef Marco">
                <Avatar name="Marco Pierre" size="md" />
              </Tooltip>
              <Tooltip content="Private Butler">
                <Avatar name="Jean Luc" size="sm" />
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CARDS & LAYOUTS */}
      <section className="space-y-lg border-b border-border pb-3xl">
        <div className="space-y-xs">
          <Badge variant="luxury">Containers & Cards</Badge>
          <h2 className="text-h2 font-serif font-bold text-charcoal-900">
            Card Hierarchy
          </h2>
        </div>

        <Grid cols={3} gap="lg">
          <Card variant="default">
            <CardHeader>
              <Badge variant="neutral" className="w-fit">Standard</Badge>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Clean surface for informational cards</CardDescription>
            </CardHeader>
            <CardContent>
              Structured border with subtle elevation, ideal for terms, policies, and room specs.
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm">Learn More</Button>
            </CardFooter>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <Badge variant="luxury" className="w-fit">Featured</Badge>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Enhanced depth for active booking summaries</CardDescription>
            </CardHeader>
            <CardContent>
              Pronounced multi-layer shadow with crisp borders, providing prominent contrast.
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm">Select Plan</Button>
            </CardFooter>
          </Card>

          <Card variant="interactive">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="confirmed">Interactive</Badge>
                <Heart className="h-5 w-5 text-gold-500" />
              </div>
              <CardTitle>Interactive Hover Card</CardTitle>
              <CardDescription>Hover to witness gold glow and elevation</CardDescription>
            </CardHeader>
            <CardContent>
              Equipped with smooth transitions, translate lifts, and gold luxury aura on hover.
            </CardContent>
            <CardFooter>
              <span className="text-body-sm font-semibold text-gold-700">$850 / night</span>
              <Button variant="outline" size="sm">Explore Suite</Button>
            </CardFooter>
          </Card>
        </Grid>
      </section>

      {/* 6. MODAL & TOASTS */}
      <section className="space-y-lg border-b border-border pb-3xl">
        <div className="space-y-xs">
          <Badge variant="luxury">Overlays & Alerts</Badge>
          <h2 className="text-h2 font-serif font-bold text-charcoal-900">
            Modal Dialog & Toast Notifications
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-md rounded-xl border border-border bg-background-elevated p-xl">
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Open Confirmation Modal
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              showToast({
                type: 'success',
                title: 'Reservation Reserved',
                message: 'Your booking draft has been safely saved.',
              })
            }
          >
            Show Success Toast
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              showToast({
                type: 'warning',
                title: 'Limited Availability',
                message: 'Only 2 Royal Villas remain for your chosen dates.',
              })
            }
          >
            Show Warning Toast
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              showToast({
                type: 'error',
                title: 'Payment Verification Failed',
                message: 'Please review your card expiry and CVV.',
              })
            }
          >
            Show Error Toast
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              showToast({
                type: 'info',
                title: 'Airport Limousine Included',
                message: 'Flight details may be added anytime before arrival.',
              })
            }
          >
            Show Info Toast
          </Button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Confirm Room Reservation"
          description="Please verify your dates and guest details before completing your order."
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsModalOpen(false);
                  showToast({
                    type: 'success',
                    title: 'Booking Confirmed',
                    message: 'Confirmation itinerary sent to your email.',
                  });
                }}
              >
                Confirm & Pay
              </Button>
            </>
          }
        >
          <div className="space-y-md text-charcoal-700">
            <p>
              You are about to reserve the <strong>Imperial Horizon Suite</strong> for 3 nights.
            </p>
            <div className="rounded-md border border-border bg-background-subtle p-md space-y-xs text-body-sm">
              <div className="flex justify-between">
                <span>Check-in:</span>
                <span className="font-semibold text-charcoal-900">Nov 12, 2026</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out:</span>
                <span className="font-semibold text-charcoal-900">Nov 15, 2026</span>
              </div>
              <div className="flex justify-between">
                <span>Guests:</span>
                <span className="font-semibold text-charcoal-900">2 Adults</span>
              </div>
              <div className="flex justify-between pt-xs border-t border-border font-bold text-charcoal-900">
                <span>Total Amount:</span>
                <span className="text-gold-700">$2,550.00</span>
              </div>
            </div>
          </div>
        </Modal>
      </section>

      {/* 7. 5 UI STATES (LOADING SKELETONS, EMPTY STATE, ERROR STATE) */}
      <section className="space-y-lg border-b border-border pb-3xl">
        <div className="space-y-xs">
          <Badge variant="luxury">Mandatory 5 UI States</Badge>
          <h2 className="text-h2 font-serif font-bold text-charcoal-900">
            5 UI States Standard (DoD Criteria)
          </h2>
          <p className="text-body text-charcoal-600">
            Zero layout jump skeleton loaders, tailored empty displays, and graceful error recovery with retry trigger.
          </p>
        </div>

        <Grid cols={3} gap="lg">
          {/* State 1: Loading Skeleton */}
          <div className="space-y-sm">
            <p className="text-body-sm font-semibold text-charcoal-700 uppercase tracking-wider">
              1. Loading Skeleton (Room Card)
            </p>
            <RoomCardSkeleton />
          </div>

          {/* State 2: Empty State */}
          <div className="space-y-sm">
            <p className="text-body-sm font-semibold text-charcoal-700 uppercase tracking-wider">
              2. Empty State
            </p>
            <EmptyState
              title="No Suites Available"
              description="We could not find any available suites matching your current price filter."
              actionLabel="Reset Filters"
              onAction={() =>
                showToast({
                  type: 'info',
                  title: 'Filters Reset',
                  message: 'Showing all available luxury rooms.',
                })
              }
            />
          </div>

          {/* State 3: Error State with Retry */}
          <div className="space-y-sm">
            <p className="text-body-sm font-semibold text-charcoal-700 uppercase tracking-wider">
              3. Error State (With Retry)
            </p>
            <ErrorState
              title="Failed to Load Availability"
              message="The server encountered a temporary delay retrieving pricing tables."
              retryLabel="Retry Connection"
              isRetrying={isRetrying}
              onRetry={handleRetry}
            />
          </div>
        </Grid>
      </section>

      {/* 8. TABS & PAGINATION */}
      <section className="space-y-lg">
        <div className="space-y-xs">
          <Badge variant="luxury">Navigation Controls</Badge>
          <h2 className="text-h2 font-serif font-bold text-charcoal-900">
            Tabs & Responsive Pagination
          </h2>
        </div>

        <div className="space-y-xl rounded-xl border border-border bg-background-elevated p-xl">
          <div>
            <h4 className="text-body-sm font-semibold text-charcoal-700 mb-md uppercase tracking-wider">
              Underline Tabs
            </h4>
            <Tabs
              tabs={[
                { id: 'all', label: 'All Suites', count: 18 },
                { id: 'villas', label: 'Private Villas', count: 6 },
                { id: 'penthouses', label: 'Penthouse Suites', count: 4 },
                { id: 'family', label: 'Family Residences', count: 8 },
              ]}
              activeTabId={activeTab}
              onChange={setActiveTab}
            />
          </div>

          <div>
            <h4 className="text-body-sm font-semibold text-charcoal-700 mb-md uppercase tracking-wider">
              Pills Tabs
            </h4>
            <Tabs
              variant="pills"
              tabs={[
                { id: 'day', label: 'Daily Overview' },
                { id: 'week', label: 'Weekly Stats' },
                { id: 'month', label: 'Monthly Revenue' },
              ]}
              defaultTabId="day"
            />
          </div>

          <div>
            <h4 className="text-body-sm font-semibold text-charcoal-700 mb-md uppercase tracking-wider">
              Accessible Pagination
            </h4>
            <Pagination
              currentPage={currentPage}
              totalPages={8}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

