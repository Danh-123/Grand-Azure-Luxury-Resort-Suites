'use client';

import React from 'react';
import { FilterControls } from './FilterControls';

export function FilterSidebar() {
  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-28 rounded-2xl border border-border bg-background-elevated p-lg shadow-sm">
        <FilterControls />
      </div>
    </aside>
  );
}

