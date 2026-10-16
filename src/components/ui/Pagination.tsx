'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <nav
      className={cn('flex items-center justify-center gap-xs', className)}
      aria-label="Pagination Navigation"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Go to previous page"
        className="flex h-10 w-10 min-h-touchMin min-w-touchMin items-center justify-center rounded-md border border-border bg-background-elevated text-charcoal-700 transition-colors hover:border-gold-500 hover:text-gold-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {getPageNumbers().map((p, idx) => {
        if (p === '...') {
          return (
            <span
              key={`dots-${idx}`}
              className="flex h-10 w-8 items-center justify-center text-charcoal-400 select-none"
            >
              ...
            </span>
          );
        }

        const pageNum = p as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex h-10 w-10 min-h-touchMin min-w-touchMin items-center justify-center rounded-md text-body-sm font-medium transition-colors select-none',
              isActive
                ? 'bg-gold-500 text-charcoal-900 font-bold shadow-sm'
                : 'border border-border bg-background-elevated text-charcoal-700 hover:border-gold-500 hover:text-gold-700'
            )}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Go to next page"
        className="flex h-10 w-10 min-h-touchMin min-w-touchMin items-center justify-center rounded-md border border-border bg-background-elevated text-charcoal-700 transition-colors hover:border-gold-500 hover:text-gold-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

