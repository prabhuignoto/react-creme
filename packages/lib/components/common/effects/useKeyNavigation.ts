import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

export interface UseKeyNavigationOptions {
  /** Orientation of navigation - 'vertical' for ArrowUp/Down, 'horizontal' for ArrowLeft/Right */
  orientation?: 'horizontal' | 'vertical';
  /** Whether to wrap around at boundaries */
  wrap?: boolean;
  /** Scroll offset for vertical navigation */
  scrollOffset?: number;
  /** RTL mode for horizontal navigation */
  rtl?: boolean;
  /** Callback when navigation occurs */
  onNavigate?: (index: number) => void;
}

/**
 * Custom hook to handle keyboard navigation within a collection of items.
 * Supports both vertical (ArrowUp/Down) and horizontal (ArrowLeft/Right) navigation.
 *
 * @param {RefObject<HTMLElement>} ref - The reference to the DOM element that contains the collection.
 * @param {number} startIndex - The initial selection index.
 * @param {number} collectionLength - The total number of items in the collection.
 * @param {number | UseKeyNavigationOptions} scrollOffsetOrOptions - Scroll offset (for backward compat) or options object.
 * @param {boolean} focusable - A flag to enable or disable keyboard navigation.
 * @returns {Object} - The current selection index and a setter function to update it.
 */
function useKeyNavigation(
  ref: RefObject<HTMLElement>,
  startIndex = -1,
  collectionLength: number,
  scrollOffsetOrOptions: number | UseKeyNavigationOptions = 50,
  focusable = true
) {
  // Parse options for backward compatibility
  const options: UseKeyNavigationOptions =
    typeof scrollOffsetOrOptions === 'number'
      ? { scrollOffset: scrollOffsetOrOptions, orientation: 'vertical' }
      : { orientation: 'vertical', wrap: true, scrollOffset: 50, ...scrollOffsetOrOptions };

  const { orientation, wrap = true, scrollOffset = 50, rtl = false, onNavigate } = options;

  const [selection, setSelection] = useState(startIndex);
  const listRef = useRef<HTMLElement | null>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!focusable) return;

      if (orientation === 'vertical') {
        // Vertical navigation (ArrowUp/Down)
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();

          const direction = e.key === 'ArrowDown' ? 1 : -1;

          setSelection(prev => {
            let next = prev + direction;

            if (wrap) {
              // Wrap around at boundaries
              if (next >= collectionLength) next = 0;
              else if (next < 0) next = collectionLength - 1;
            } else {
              // Clamp at boundaries
              next = Math.max(0, Math.min(collectionLength - 1, next));
            }

            onNavigate?.(next);
            return next;
          });

          // Update scroll position for vertical navigation
          if (listRef.current && scrollOffset) {
            listRef.current.scrollTop += direction * scrollOffset;
          }
        }
      } else {
        // Horizontal navigation (ArrowLeft/Right)
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault();

          // In RTL mode, arrow directions are reversed
          let direction: number;
          if (rtl) {
            direction = e.key === 'ArrowLeft' ? 1 : -1;
          } else {
            direction = e.key === 'ArrowRight' ? 1 : -1;
          }

          setSelection(prev => {
            let next = prev + direction;

            if (wrap) {
              // Wrap around at boundaries
              if (next >= collectionLength) next = 0;
              else if (next < 0) next = collectionLength - 1;
            } else {
              // Clamp at boundaries
              next = Math.max(0, Math.min(collectionLength - 1, next));
            }

            onNavigate?.(next);
            return next;
          });
        }
      }

      // Home and End keys work for both orientations
      if (e.key === 'Home') {
        e.preventDefault();
        setSelection(0);
        onNavigate?.(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        const lastIndex = collectionLength - 1;
        setSelection(lastIndex);
        onNavigate?.(lastIndex);
      }
    },
    [focusable, collectionLength, orientation, wrap, scrollOffset, rtl, onNavigate]
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
