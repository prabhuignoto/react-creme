import { useCallback, useEffect, useRef } from 'react';

export default function useOnClickOutside(cb?: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClick = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      cb?.();
    }
  }, [cb]);

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return { ref };
}
