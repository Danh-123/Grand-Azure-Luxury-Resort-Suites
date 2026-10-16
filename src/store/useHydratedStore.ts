import { useState, useEffect } from 'react';

/**
 * 🏛️ HYDRATION GUARD HOOK FOR ZUSTAND PERSISTENT STORES
 * Mandated by Antigravity Constitution (Điều khoản 5).
 * Prevents 100% of Next.js 15 SSR / CSR hydration mismatch errors
 * by delaying persisted state evaluation until after initial client mount.
 */
export function useHydratedStore<T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
): F | undefined {
  const result = store(callback) as F;
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? result : undefined;
}

