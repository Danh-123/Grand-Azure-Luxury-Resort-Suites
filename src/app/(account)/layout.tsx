import React from 'react';
import { Header, Footer, Container } from '@/components/layout';
import { AuthGuard, AccountNav } from '@/components/account';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-background">
        {/* Official Global Header */}
        <Header />

        {/* Account Body View */}
        <main className="flex-1 py-xl">
          <Container size="lg">
            <AccountNav />
            {children}
          </Container>
        </main>

        {/* Official Global Footer */}
        <Footer />
      </div>
    </AuthGuard>
  );
}
