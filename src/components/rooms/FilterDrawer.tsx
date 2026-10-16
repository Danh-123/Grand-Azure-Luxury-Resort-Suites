'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { FilterControls } from './FilterControls';

export interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterDrawer({ isOpen, onClose }: FilterDrawerProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Filter Accommodations"
      description="Refine by price, guest capacity, room category, and amenities."
      maxWidth="md"
    >
      <div className="py-xs">
        <FilterControls onApply={onClose} />
      </div>
    </Modal>
  );
}

