import React from 'react';
import type { Metadata } from 'next';
import { Container, Section } from '@/components/layout';
import { DesignSystemShowcase } from '@/features/design-system/components/DesignSystemShowcase';

export const metadata: Metadata = {
  title: 'Design System Showcase | Grand Azure Luxury Resort',
  description: 'Interactive visual verification and component library showcase for Grand Azure Luxury Resort.',
};

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header Banner */}
      <div className="border-b border-border bg-charcoal-900 py-3xl text-ivory-100">
        <Container>
          <div className="space-y-sm">
            <span className="text-caption font-semibold tracking-widest text-gold-400 uppercase">
              Grand Azure Hospitality Design System
            </span>
            <h1 className="text-display font-serif font-bold text-ivory-50">
              Component Library & Design Tokens
            </h1>
            <p className="max-w-2xl text-body text-charcoal-300">
              A bespoke, production-grade component library crafted exclusively for luxury hotel booking and high-end guest management.
            </p>
          </div>
        </Container>
      </div>

      {/* Interactive Showcase Section */}
      <Section spacing="lg">
        <Container>
          <DesignSystemShowcase />
        </Container>
      </Section>
    </main>
  );
}

