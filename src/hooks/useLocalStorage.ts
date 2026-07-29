import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  function setStoredValue(next: T) {
    setValue(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(next));
    }
  }

  return [value, setStoredValue] as const;
}
