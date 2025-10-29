import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

/**
 * Configuration options for the useVirtualization hook
 */
export interface UseVirtualizationOptions {
  /** Total number of items in the list */
  itemCount: number;

  /** Height of each item in pixels */
  itemHeight: number;

  /** Container element ref */
  containerRef: React.RefObject<HTMLElement>;

  /** Number of items to render outside visible area for smoother scrolling (default: 2) */
  overscan?: number;

  /** Enable virtualization (default: true) */
  enabled?: boolean;

  /** Scroll event debounce delay in ms (default: 50) */
  scrollDebounce?: number;

  /** Gap between items in pixels (default: 0) */
  itemGap?: number;
}

/**
 * Result object returned by useVirtualization hook
 */
export interface VirtualizationResult {
  /** Visible range [startIndex, endIndex] */
  visibleRange: [number, number];

  /** Starting index of visible items (with overscan) */
  startIndex: number;

  /** Ending index of visible items (with overscan) */
  endIndex: number;

  /** Total height of all items combined (for scroll container) */
  totalHeight: number;

  /** Offset for the visible items container (top position) */
  offsetTop: number;

  /** Array of visible item indices */
  visibleItems: number[];

  /** Scroll to specific item index */
  scrollToIndex: (index: number, smooth?: boolean) => void;

  /** Force recalculation of visible range */
  recalculate: () => void;
}

/**
 * Custom hook for efficient rendering of large lists through virtualization
 *
 * Tracks scroll position and calculates which items should be rendered,
 * only rendering items visible in the viewport plus an overscan buffer.
 * This dramatically improves performance for lists with thousands of items.
 *
 * @example
 * ```tsx
 * const listRef = useRef<HTMLDivElement>(null);
 * const virtualization = useVirtualization({
 *   itemCount: 1000,
 *   itemHeight: 40,
 *   containerRef: listRef,
 *   overscan: 3,
 * });
 *
 * return (
 *   <div ref={listRef} style={{ height: '600px', overflow: 'auto' }}>
 *     <div style={{ height: virtualization.totalHeight }}>
 *       <div style={{ transform: `translateY(${virtualization.offsetTop}px)` }}>
 *         {virtualization.visibleItems.map(index => (
 *           <Item key={index} index={index} />
 *         ))}
 *       </div>
 *     </div>
 *   </div>
 * );
 * ```
 */
export function useVirtualization(
  options: UseVirtualizationOptions
): VirtualizationResult {
  const {
    itemCount,
    itemHeight,
    containerRef,
    overscan = 2,
    enabled = true,
    scrollDebounce = 50,
    itemGap = 0,
  } = options;

  const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 0]);
  const isFirstRender = useRef(true);
  const itemHeightWithGap = itemHeight + itemGap;

  /**
   * Calculate which items are visible based on scroll position
   */
  const calculateRange = useCallback(() => {
    if (!enabled || !containerRef.current) {
      setVisibleRange([0, itemCount]);
      return;
    }

    const container = containerRef.current;
    const scrollTop = Math.round(container.scrollTop);
    const clientHeight = Math.round(container.clientHeight);

    // Calculate the first visible item index
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeightWithGap) - overscan
    );

    // Calculate the last visible item index
    const endIndex = Math.min(
      itemCount - 1,
      Math.ceil((scrollTop + clientHeight) / itemHeightWithGap) + overscan
    );

    setVisibleRange([startIndex, endIndex]);
  }, [enabled, containerRef, itemCount, itemHeightWithGap, overscan]);

  /**
   * Debounced scroll handler to avoid excessive recalculations
   */
  const debouncedCalculateRange = useDebouncedCallback(
    calculateRange,
    scrollDebounce
  );

  /**
   * Attach scroll listener on mount and when dependencies change
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!enabled || !container) return;

    // Initial calculation on mount
    if (isFirstRender.current) {
      calculateRange();
      isFirstRender.current = false;
    }

    // Attach scroll event listener
    container.addEventListener('scroll', debouncedCalculateRange);

    return () => {
      container.removeEventListener('scroll', debouncedCalculateRange);
    };
  }, [enabled, containerRef, calculateRange, debouncedCalculateRange]);

  /**
   * Recalculate when item count or height changes
   */
  useEffect(() => {
    if (enabled && !isFirstRender.current) {
      calculateRange();
    }
  }, [itemCount, itemHeight, itemGap, enabled, calculateRange]);

  /**
   * Scroll to a specific item index
   */
  const scrollToIndex = useCallback(
    (index: number, smooth = true) => {
      if (!containerRef.current) return;

      const clampedIndex = Math.max(0, Math.min(index, itemCount - 1));
      const scrollTop = clampedIndex * itemHeightWithGap;

      containerRef.current.scrollTo({
        top: scrollTop,
        behavior: smooth ? 'smooth' : 'auto',
      });
    },
    [containerRef, itemCount, itemHeightWithGap]
  );

  /**
   * Calculate derived values
   */
  const [startIndex, endIndex] = visibleRange;
  const totalHeight = itemCount * itemHeightWithGap;
  const offsetTop = startIndex * itemHeightWithGap;
  const visibleItems = Array.from(
    { length: Math.max(0, endIndex - startIndex + 1) },
    (_, i) => startIndex + i
  );

  return {
    visibleRange,
    startIndex,
    endIndex,
    totalHeight,
    offsetTop,
    visibleItems,
    scrollToIndex,
    recalculate: calculateRange,
  };
}
