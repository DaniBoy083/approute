'use client';

import { useEffect, useState } from 'react';
import {
  CACHE_LAST_REVALIDATED_AT_KEY,
  CACHE_REVALIDATED_EVENT,
  type CacheRevalidatedDetail,
} from '@/app/lib/cache-telemetry';

// Badge global para exibir quando o cache foi revalidado manualmente pela ultima vez.
export function RevalidateBadge() {
  const [lastRevalidatedAt, setLastRevalidatedAt] = useState('');

  useEffect(() => {
    const storedValue = window.localStorage.getItem(CACHE_LAST_REVALIDATED_AT_KEY);
    if (storedValue) {
      setLastRevalidatedAt(storedValue);
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === CACHE_LAST_REVALIDATED_AT_KEY && event.newValue) {
        setLastRevalidatedAt(event.newValue);
      }
    }

    function handleCustomEvent(event: Event) {
      const customEvent = event as CustomEvent<CacheRevalidatedDetail>;
      if (customEvent.detail?.revalidatedAt) {
        setLastRevalidatedAt(customEvent.detail.revalidatedAt);
      }
    }

    window.addEventListener('storage', handleStorage);
    window.addEventListener(CACHE_REVALIDATED_EVENT, handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(CACHE_REVALIDATED_EVENT, handleCustomEvent);
    };
  }, []);

  if (!lastRevalidatedAt) {
    return (
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Ultima revalidacao manual: ainda nao executada
      </p>
    );
  }

  return (
    <p className="text-xs text-emerald-700 dark:text-emerald-300">
      Ultima revalidacao manual: {new Date(lastRevalidatedAt).toLocaleString('pt-BR')}
    </p>
  );
}
