import React from 'react';
import { Header, Footer } from '@/components/layout';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Official Global Luxury Header */}
      <Header />

      {/* Main Content Pane */}
      <main className="flex-1">{children}</main>

      {/* Official Global Luxury Footer */}
      <Footer />
    </div>
  );
}
