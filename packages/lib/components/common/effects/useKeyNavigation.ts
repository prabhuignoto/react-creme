import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

function useKeyNavigation(
  ref: RefObject<HTMLElement>,
  startIndex = -1,
  collectionLength: number,
  scrollOffset = 50
) {
  const [selection, setSelection] = useState(startIndex);

  const listRef = useRef<HTMLElement | null>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
        return;
      }

      const _listRef = listRef.current;

      if (e.key === 'ArrowDown') {
        setSelection(prev => {
          if (prev < collectionLength - 1) {
            return prev + 1;
          }
          return prev;
        });

        if (_listRef) {
          _listRef.scrollTop += scrollOffset;
        }
      } else if (e.key === 'ArrowUp') {
        setSelection(prev => {
          if (prev > 0) {
            return prev - 1;
          }
          return prev;
        });
        if (_listRef) {
          _listRef.scrollTop -= scrollOffset;
        }
      }
    },
    [selection, collectionLength]
  );

  useEffect(() => {
    if (ref) {
      listRef.current = ref.current;
      listRef.current?.addEventListener('keydown', handleKey);
    }
  }, [ref]);

  useEffect(() => {
    return () => {
      if (listRef) {
        listRef.current?.removeEventListener('keydown', handleKey);
      }
    };
  }, []);

  return { selection, setSelection };
}

export { useKeyNavigation };
