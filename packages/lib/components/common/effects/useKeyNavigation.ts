import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

function useKeyNavigation(
  ref: RefObject<HTMLElement>,
  startIndex = -1,
  collectionLength: number,
  scrollOffset = 50,
  focusable = true
) {
  const [selection, setSelection] = useState(startIndex);

  const listRef = useRef<HTMLElement | null>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && !focusable) {
        return;
      }

      const _listRef = listRef.current;
      e.preventDefault();

      if (e.key === 'ArrowDown') {
        setSelection(prev => {
          if (prev < collectionLength - 1) {
            return prev + 1;
          } else {
            return 0;
          }
        });

        // scroll to top
        if (_listRef) {
          _listRef.scrollTop += scrollOffset;
        }
      } else if (e.key === 'ArrowUp') {
        setSelection(prev => {
          if (prev > 0) {
            return prev - 1;
          } else {
            return collectionLength - 1;
          }
        });
        if (_listRef) {
          _listRef.scrollTop -= scrollOffset;
        }
      }
    },
    [selection, collectionLength]
  );

  useEffect(() => {
    if (ref && focusable) {
      listRef.current = ref.current;
      listRef.current?.addEventListener('keydown', handleKey);
    }
  }, [ref]);

  useEffect(() => {
    return () => {
      if (listRef && focusable) {
        listRef.current?.removeEventListener('keydown', handleKey);
      }
    };
  }, []);

  return { selection, setSelection };
}

export { useKeyNavigation };
