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
  /** Callback when Enter key is pressed */
  onEnter?: () => void;
  /** Callback when Space key is pressed */
  onSpace?: () => void;
  /** Callback when Delete key is pressed */
  onDelete?: () => void;
  /** Callback when Escape key is pressed */
  onEscape?: () => void;
  /** Callback when PageUp key is pressed */
  onPageUp?: () => void;
  /** Callback when PageDown key is pressed */
  onPageDown?: () => void;
}

/**
 * Comprehensive keyboard navigation hook for list/collection components
 * Handles arrow keys, Home/End, and additional keys (Enter, Space, Delete, Escape, PageUp/Down)
 *
 * **Features:**
 * - Vertical (ArrowUp/Down) and horizontal (ArrowLeft/Right) navigation
 * - Home/End key support for jump-to-start/end
 * - Wrap-around or boundary clamping
 * - RTL support for horizontal navigation
 * - Additional key handlers: Enter, Space, Delete, Escape, PageUp/Down
 * - Scroll offset for auto-scrolling during vertical navigation
 *
 * @param {RefObject<HTMLElement>} ref - Reference to the DOM element that contains the collection
 * @param {number} startIndex - The initial selection index (default: -1)
 * @param {number} collectionLength - The total number of items in the collection
 * @param {number | UseKeyNavigationOptions} scrollOffsetOrOptions - Scroll offset (for backward compat) or options object
 * @param {boolean} focusable - Enable/disable keyboard navigation (default: true)
 * @returns {Object} - { selection: current index, setSelection: function to update index }
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const { selection, setSelection } = useKeyNavigation(ref, 0, items.length, {
 *   orientation: 'horizontal',
 *   rtl: false,
 *   onNavigate: (index) => setSelectedIndex(index),
 *   onEnter: () => handleSelect(),
 *   onDelete: () => handleRemove(),
 * });
 * ```
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
      ? { orientation: 'vertical', scrollOffset: scrollOffsetOrOptions }
      : {
          orientation: 'vertical',
          scrollOffset: 50,
          wrap: true,
          ...scrollOffsetOrOptions,
        };

  const {
    orientation,
    wrap = true,
    scrollOffset = 50,
    rtl = false,
    onNavigate,
    onEnter,
    onSpace,
    onDelete,
    onEscape,
    onPageUp,
    onPageDown,
  } = options;

  const [selection, setSelection] = useState(startIndex);
  const listRef = useRef<HTMLElement | null>(null);

  // Sync selection state when startIndex changes (e.g., when active tab changes externally)
  useEffect(() => {
    setSelection(startIndex);
  }, [startIndex]);

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

      // Additional keyboard handlers
      if (e.key === 'Enter') {
        e.preventDefault();
        onEnter?.();
      } else if (e.key === ' ') {
        e.preventDefault();
        onSpace?.();
      } else if (e.key === 'Delete') {
        e.preventDefault();
        onDelete?.();
      } else if (e.key === 'Escape') {
        // Don't preventDefault for Escape - allow it to bubble to overlay/modal handlers
        onEscape?.();
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        onPageUp?.();
      } else if (e.key === 'PageDown') {
        e.preventDefault();
        onPageDown?.();
      }
    },
    [
      focusable,
      collectionLength,
      orientation,
      wrap,
      scrollOffset,
      rtl,
      onNavigate,
      onEnter,
      onSpace,
      onDelete,
      onEscape,
      onPageUp,
      onPageDown,
    ]
  );

  useEffect(() => {
    // Attach the keydown event listener when the component is focusable
    if (ref.current && focusable) {
      listRef.current = ref.current;
      // Use capture phase to ensure we catch events from child elements (e.g., tab buttons)
      // This allows keyboard navigation to work even when child elements have focus
      listRef.current.addEventListener('keydown', handleKey, { capture: true });
    }

    // Cleanup function to remove the event listener
    return () => {
      if (listRef.current && focusable) {
        listRef.current.removeEventListener('keydown', handleKey, {
          capture: true,
        });
      }
    };
  }, [ref, focusable, handleKey]);

  return { selection, setSelection };
}

export { useKeyNavigation };
