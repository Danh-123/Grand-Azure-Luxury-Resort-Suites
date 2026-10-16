'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, ArrowLeft, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Grand Azure Application Error Encountered:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-charcoal-950 text-ivory-100 flex items-center justify-center p-md relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-error/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-lg w-full text-center space-y-lg relative z-10">
        {/* Error Emblem */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-error-light/10 border border-error-border text-error shadow-lg">
          <AlertCircle className="h-10 w-10" aria-hidden="true" />
        </div>

        {/* Messaging */}
        <div className="space-y-xs">
          <span className="text-[11px] font-bold tracking-widest text-gold-400 uppercase">
            Service Interruption
          </span>
          <h1 className="text-h2 font-serif font-bold text-ivory-100">
            An Unexpected Interruption Occurred
          </h1>
          <p className="text-body-sm text-charcoal-300 max-w-md mx-auto leading-relaxed pt-xs">
            We apologize for the inconvenience. Our concierge technology system encountered an unexpected condition while fulfilling your request.
          </p>
          {error.digest && (
            <p className="text-[11px] font-mono text-charcoal-400 pt-xs">
              Incident ID: {error.digest}
            </p>
          )}
        </div>

        {/* Recovery Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-sm pt-sm">
          <Button
            variant="primary"
            size="lg"
            onClick={reset}
            className="w-full sm:w-auto font-serif font-bold shadow-glow"
            leftIcon={<RotateCcw className="h-4 w-4" />}
          >
            Retry Request
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-charcoal-700 text-charcoal-200 hover:text-ivory-100 hover:border-gold-500"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Return Home
            </Button>
          </Link>
        </div>

        {/* Concierge Hotline */}
        <div className="pt-lg border-t border-charcoal-800/80 text-caption text-charcoal-400 flex items-center justify-center gap-2">
          <PhoneCall className="h-3.5 w-3.5 text-gold-500" />
          <span>Concierge Helpline: +84 (0) 236 888 9999</span>
        </div>
      </div>
    </div>
  );
}
