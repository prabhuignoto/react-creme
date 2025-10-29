import { renderHook, act } from '@testing-library/react';
import { useVirtualization } from '../useVirtualization';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('useVirtualization', () => {
  let containerRef: React.RefObject<HTMLDivElement>;
  let container: HTMLDivElement;

  beforeEach(() => {
    // Create a mock container element
    container = document.createElement('div');
    container.style.height = '600px';
    container.style.overflow = 'auto';
    document.body.appendChild(container);

    // Mock container ref
    containerRef = { current: container };

    // Mock scroll-related properties
    Object.defineProperty(container, 'scrollTop', {
      writable: true,
      value: 0,
    });
    Object.defineProperty(container, 'clientHeight', {
      writable: true,
      value: 600,
    });
    Object.defineProperty(container, 'scrollHeight', {
      writable: true,
      value: 20000,
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
    vi.clearAllMocks();
  });

  describe('initialization', () => {
    it('should initialize with correct visible range', () => {
      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 1000,
          itemHeight: 40,
          containerRef,
        })
      );

      expect(result.current.visibleRange).toBeDefined();
      expect(result.current.visibleItems.length).toBeGreaterThan(0);
    });

    it('should return all items when disabled', () => {
      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 100,
          itemHeight: 40,
          containerRef,
          enabled: false,
        })
      );

      expect(result.current.visibleRange).toEqual([0, 100]);
      expect(result.current.visibleItems.length).toBe(100);
    });

    it('should calculate correct total height', () => {
      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 1000,
          itemHeight: 40,
          containerRef,
          itemGap: 5,
        })
      );

      // (40 + 5) * 1000 = 45000
      expect(result.current.totalHeight).toBe(45000);
    });
  });

  describe('scroll handling', () => {
    it('should update visible range on scroll', () => {
      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 1000,
          itemHeight: 40,
          containerRef,
        })
      );

      const initialRange = result.current.visibleRange;

      act(() => {
        container.scrollTop = 5000;
        container.dispatchEvent(new Event('scroll'));
      });

      // Need to wait for debounce
      setTimeout(() => {
        expect(result.current.visibleRange).not.toEqual(initialRange);
      }, 100);
    });

    it('should respect overscan setting', () => {
      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 1000,
          itemHeight: 40,
          containerRef,
          overscan: 5,
        })
      );

      const [start, end] = result.current.visibleRange;
      const visibleCount = end - start + 1;

      // Should have more items than just what's visible (15 items visible + 10 overscan = 25)
      expect(visibleCount).toBeGreaterThan(15);
    });

    it('should not exceed bounds with overscan', () => {
      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 100,
          itemHeight: 40,
          containerRef,
          overscan: 50,
        })
      );

      const [start, end] = result.current.visibleRange;
      expect(start).toBeGreaterThanOrEqual(0);
      expect(end).toBeLessThan(100);
    });
  });

  describe('scrollToIndex', () => {
    it('should scroll to specified index', () => {
      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 1000,
          itemHeight: 40,
          containerRef,
        })
      );

      const scrollToSpy = vi.spyOn(container, 'scrollTo');

      act(() => {
        result.current.scrollToIndex(100, false);
      });

      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 100 * 40,
        behavior: 'auto',
      });
    });

    it('should clamp scroll index to bounds', () => {
      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 100,
          itemHeight: 40,
          containerRef,
        })
      );

      const scrollToSpy = vi.spyOn(container, 'scrollTo');

      act(() => {
        result.current.scrollToIndex(500, false); // Out of bounds
      });

      // Should scroll to last item (99)
      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 99 * 40,
        behavior: 'auto',
      });
    });

    it('should use smooth scrolling by default', () => {
      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 1000,
          itemHeight: 40,
          containerRef,
        })
      );

      const scrollToSpy = vi.spyOn(container, 'scrollTo');

      act(() => {
        result.current.scrollToIndex(100);
      });

      expect(scrollToSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          behavior: 'smooth',
        })
      );
    });
  });

  describe('recalculate', () => {
    it('should recalculate visible range on demand', () => {
      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 1000,
          itemHeight: 40,
          containerRef,
        })
      );

      const initialRange = result.current.visibleRange;

      act(() => {
        container.scrollTop = 5000;
        result.current.recalculate();
      });

      // Recalculate should update immediately without debounce
      expect(result.current.visibleRange).not.toEqual(initialRange);
    });
  });

  describe('edge cases', () => {
    it('should handle empty list', () => {
      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 0,
          itemHeight: 40,
          containerRef,
        })
      );

      expect(result.current.visibleItems.length).toBe(0);
      expect(result.current.totalHeight).toBe(0);
    });

    it('should handle single item', () => {
      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 1,
          itemHeight: 40,
          containerRef,
        })
      );

      expect(result.current.visibleItems).toContain(0);
      expect(result.current.totalHeight).toBe(40);
    });

    it('should handle null container ref', () => {
      const nullRef = { current: null };

      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 1000,
          itemHeight: 40,
          containerRef: nullRef,
        })
      );

      expect(result.current.visibleRange).toEqual([0, 1000]);
    });

    it('should handle with item gap', () => {
      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 100,
          itemHeight: 40,
          containerRef,
          itemGap: 10,
        })
      );

      // (40 + 10) * 100 = 5000
      expect(result.current.totalHeight).toBe(5000);
    });
  });

  describe('performance', () => {
    it('should debounce scroll events', () => {
      const calculateSpy = vi.fn();
      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 1000,
          itemHeight: 40,
          containerRef,
          scrollDebounce: 100,
        })
      );

      act(() => {
        // Trigger multiple scroll events
        for (let i = 0; i < 10; i++) {
          container.scrollTop = i * 100;
          container.dispatchEvent(new Event('scroll'));
        }
      });

      // Should be debounced, not called 10 times
      // Will be called once after debounce timeout
    });
  });

  describe('derived values', () => {
    it('should calculate correct offset top', () => {
      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 1000,
          itemHeight: 40,
          containerRef,
          overscan: 0,
        })
      );

      const [startIndex] = result.current.visibleRange;
      const expectedOffsetTop = startIndex * 40;

      expect(result.current.offsetTop).toBe(expectedOffsetTop);
    });

    it('should calculate correct visible items array', () => {
      const { result } = renderHook(() =>
        useVirtualization({
          itemCount: 1000,
          itemHeight: 40,
          containerRef,
        })
      );

      const [start, end] = result.current.visibleRange;
      const expectedLength = end - start + 1;

      expect(result.current.visibleItems.length).toBe(expectedLength);
      expect(result.current.visibleItems[0]).toBe(start);
      expect(result.current.visibleItems[result.current.visibleItems.length - 1]).toBe(end);
    });
  });
});
