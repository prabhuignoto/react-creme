import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

/**
 * Custom hook to handle keyboard navigation within a collection of items.
 *
 * @param {RefObject<HTMLElement>} ref - The reference to the DOM element that contains the collection.
 * @param {number} startIndex - The initial selection index.
 * @param {number} collectionLength - The total number of items in the collection.
 * @param {number} scrollOffset - The amount of scroll offset for each key press.
 * @param {boolean} focusable - A flag to enable or disable keyboard navigation.
 * @returns {Object} - The current selection index and a setter function to update it.
 */
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
      // Only handle 'ArrowUp' and 'ArrowDown' keys when the component is focusable
      if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && focusable) {
        e.preventDefault();

        const direction = e.key === 'ArrowDown' ? 1 : -1;
        const boundaryIndex = direction === 1 ? collectionLength : -1;
        const resetIndex = direction === 1 ? 0 : collectionLength - 1;

        // Update the selection index
        setSelection(prev =>
          prev + direction !== boundaryIndex ? prev + direction : resetIndex
        );

        // Update the scroll position
        if (listRef.current) {
          listRef.current.scrollTop += direction * scrollOffset;
        }
      }
    },
    [focusable, collectionLength, scrollOffset]
  );

  useEffect(() => {
    // Attach the keydown event listener when the component is focusable
    if (ref.current && focusable) {
      listRef.current = ref.current;
      listRef.current.addEventListener('keydown', handleKey);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (listRef.current && focusable) {
        listRef.current.removeEventListener('keydown', handleKey);
      }
    };
  }, [ref, focusable, handleKey]);

  return { selection, setSelection };
}

export { useKeyNavigation };
