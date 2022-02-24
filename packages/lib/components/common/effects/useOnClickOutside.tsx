import { useCallback, useRef } from 'react';

export default function useOnClickOutside(cb?: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClick = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      cb?.();
    }
  }, []);

  const onRef = useCallback(node => {
    if (node) {
      ref.current = node as HTMLDivElement;
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }
  }, []);

  return { onRef, ref };
}
