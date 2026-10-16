'use client';

import React, { createContext, useContext, useState, useCallback, useId } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (props: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type, title, message, duration = 3500 }: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, title, message, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast viewport */}
      <div
        className="fixed top-md right-md z-toast flex w-full max-w-sm flex-col gap-sm pointer-events-none p-sm"
        aria-live="polite"
        role="region"
      >
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastCard({ toast, onClose }: { toast: ToastItem; onClose: () => void }) {
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-success" />,
    warning: <AlertTriangle className="h-5 w-5 text-warning" />,
    error: <AlertCircle className="h-5 w-5 text-error" />,
    info: <Info className="h-5 w-5 text-info" />,
  };

  const borders = {
    success: 'border-success/40',
    warning: 'border-warning/40',
    error: 'border-error/40',
    info: 'border-info/40',
  };

  return (
    <div
      className={cn(
        'pointer-events-auto flex items-start gap-md rounded-lg border bg-background-elevated p-md shadow-xl transition-all duration-base',
        borders[toast.type]
      )}
    >
      <div className="shrink-0 pt-0.5">{icons[toast.type]}</div>
      <div className="flex-1">
        <h4 className="text-body-sm font-semibold text-charcoal-900">{toast.title}</h4>
        {toast.message && (
          <p className="mt-0.5 text-caption text-charcoal-600">{toast.message}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-charcoal-400 hover:text-charcoal-700 min-h-touchMin min-w-touchMin flex items-center justify-center -mr-xs -mt-xs"
        aria-label="Dismiss toast"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

