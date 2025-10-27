import { RefObject, useCallback, useEffect, useRef } from 'react';

const useKey = function (ref: RefObject<HTMLElement>, cb?: () => void) {
  const handler = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        if (cb) {
          cb();
        }
      }
    },
    [cb]
  );

  const _ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      _ref.current = ref.current;
      ref.current.addEventListener('keyup', handler);
    }

    return () => {
      if (_ref.current) {
        _ref.current.removeEventListener('keyup', handler);
      }
    };
  }, [ref, handler]);
};

export { useKey };
