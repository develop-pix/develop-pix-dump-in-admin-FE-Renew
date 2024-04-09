/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useDebounce = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Cleanup the previous timeout on re-render
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args: T) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};
