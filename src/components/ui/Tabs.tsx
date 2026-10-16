'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTabId?: string;
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  variant?: 'underline' | 'pills';
}

export function Tabs({
  tabs,
  activeTabId,
  defaultTabId,
  onChange,
  className,
  variant = 'underline',
}: TabsProps) {
  const [internalActive, setInternalActive] = useState(
    defaultTabId || (tabs.length > 0 ? tabs[0].id : '')
  );

  const currentTab = activeTabId !== undefined ? activeTabId : internalActive;

  const handleSelect = (id: string) => {
    if (activeTabId === undefined) {
      setInternalActive(id);
    }
    onChange?.(id);
  };

  return (
    <div
      role="tablist"
      className={cn(
        'flex items-center gap-xs overflow-x-auto border-b border-border',
        variant === 'pills' && 'border-none bg-background-subtle p-xs rounded-lg',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === currentTab;

        if (variant === 'pills') {
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => handleSelect(tab.id)}
              className={cn(
                'flex items-center gap-xs rounded-md px-md py-xs text-body-sm font-medium transition-all duration-base min-h-touchMin select-none',
                isActive
                  ? 'bg-background-elevated text-gold-700 shadow-sm font-semibold'
                  : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-background-elevated/50',
                tab.disabled && 'cursor-not-allowed opacity-40'
              )}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'rounded-full px-xs py-[1px] text-[10px]',
                    isActive ? 'bg-gold-100 text-gold-800' : 'bg-charcoal-200 text-charcoal-700'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => handleSelect(tab.id)}
            className={cn(
              'relative flex items-center gap-xs px-md py-sm text-body-sm font-medium transition-colors duration-base min-h-touchMin select-none',
              isActive
                ? 'text-gold-700 font-semibold'
                : 'text-charcoal-500 hover:text-charcoal-800',
              tab.disabled && 'cursor-not-allowed opacity-40'
            )}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'rounded-full px-xs py-[1px] text-[10px]',
                  isActive ? 'bg-gold-100 text-gold-800' : 'bg-charcoal-100 text-charcoal-600'
                )}
              >
                {tab.count}
              </span>
            )}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500" />
            )}
          </button>
        );
      })}
    </div>
  );
}

