'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

interface CancelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingCode: string;
  roomName: string;
  onConfirm: () => Promise<void> | void;
  isCancelling?: boolean;
}

export function CancelBookingModal({
  isOpen,
  onClose,
  bookingCode,
  roomName,
  onConfirm,
  isCancelling = false,
}: CancelBookingModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cancel Reservation"
      maxWidth="md"
      footer={
        <div className="flex items-center gap-sm">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isCancelling}
          >
            Keep Reservation
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onConfirm}
            isLoading={isCancelling}
            className="bg-error hover:bg-error-dark border-error text-ivory-100"
          >
            Confirm Cancellation
          </Button>
        </div>
      }
    >
      <div className="space-y-md text-left py-xs">
        <div className="flex items-start gap-md rounded-xl bg-error-light/40 border border-error-border p-md text-error">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="text-body-sm">
            <span className="font-semibold block">Irreversible Action</span>
            <span className="text-caption text-charcoal-600">
              Are you certain you wish to cancel reservation{' '}
              <strong className="text-charcoal-900">{bookingCode}</strong> for{' '}
              <strong className="text-charcoal-900">{roomName}</strong>?
            </span>
          </div>
        </div>

        <p className="text-body-sm text-charcoal-600 leading-relaxed">
          Per Grand Azure reservation policy, cancellations made more than 48 hours prior to scheduled arrival are 100% complimentary. Any pre-authorized guarantees will be released promptly.
        </p>
      </div>
    </Modal>
  );
}

