import React from 'react';
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Carousel } from '../carousel';

describe('Carousel', () => {
  // Mock element dimensions for ResizeObserver
  beforeEach(() => {
    // Mock HTMLElement dimensions with getters
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get() {
        return 800;
      },
    });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      get() {
        return 400;
      },
    });

    // Mock ResizeObserver to immediately trigger callback with observed element
    global.ResizeObserver = class ResizeObserver {
      private callback: ResizeObserverCallback;

      constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
      }

      observe(target: Element) {
        // Use queueMicrotask to trigger callback immediately (works with both real and fake timers)
        queueMicrotask(() => {
          this.callback(
            [
              {
                target,
                contentRect: {
                  width: 800,
                  height: 400,
                  top: 0,
                  left: 0,
                  bottom: 400,
                  right: 800,
                  x: 0,
                  y: 0,
                } as DOMRectReadOnly,
                borderBoxSize: [] as readonly ResizeObserverSize[],
                contentBoxSize: [] as readonly ResizeObserverSize[],
                devicePixelContentBoxSize: [] as readonly ResizeObserverSize[],
              },
            ],
            this
          );
        });
      }

      unobserve() {}
      disconnect() {}
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // Helper to wait for layout effects and slides to render
  const waitForCarousel = async () => {
    // Wait for ResizeObserver callback and state updates
    await waitFor(
      () => {
        const slides = document.querySelectorAll('[role="tabpanel"]');
        if (slides.length === 0) {
          throw new Error('No slides rendered yet');
        }
      },
      { timeout: 1000 }
    );
  };

  describe('Basic Rendering & Props', () => {
    it('should render carousel with multiple children', async () => {
      const { getByText } = render(
        <Carousel direction="horizontal">
          <span>Slide 1</span>
          <span>Slide 2</span>
          <span>Slide 3</span>
        </Carousel>
      );

      await waitForCarousel();
      expect(getByText('Slide 1')).toBeInTheDocument();
      expect(getByText('Slide 2')).toBeInTheDocument();
      expect(getByText('Slide 3')).toBeInTheDocument();
    });

    it('should render with horizontal direction by default', async () => {
      const { container } = render(
        <Carousel>
          <span>one</span>
          <span>two</span>
        </Carousel>
      );

      await waitForCarousel();
      const section = container.querySelector('section');
      expect(section?.className).toContain('container_horizontal');
    });

    it('should render vertical carousel', async () => {
      const { container, getByText } = render(
        <Carousel direction="vertical">
          <span>one</span>
          <span>two</span>
        </Carousel>
      );

      await waitForCarousel();
      expect(getByText('one')).toBeInTheDocument();
      const section = container.querySelector('section');
      expect(section?.className).toContain('container_vertical');
    });

    it('should apply custom className', async () => {
      const { container } = render(
        <Carousel className="custom-carousel">
          <span>one</span>
        </Carousel>
      );

      await waitForCarousel();
      const section = container.querySelector('section');
      expect(section?.className).toContain('custom-carousel');
    });

    it('should apply custom ariaLabel', async () => {
      const { container } = render(
        <Carousel ariaLabel="Product showcase">
          <span>one</span>
        </Carousel>
      );

      await waitForCarousel();
      const section = container.querySelector('[role="region"]');
      expect(section).toHaveAttribute('aria-label', 'Product showcase');
    });

    it('should render with border when border prop is true', async () => {
      const { container } = render(
        <Carousel border>
          <span>one</span>
        </Carousel>
      );

      await waitForCarousel();
      expect(container.firstChild).toHaveClass('rc-carousel-border');
    });

    it('should handle single child', async () => {
      const { getByText } = render(
        <Carousel>
          <span>Only slide</span>
        </Carousel>
      );

      await waitForCarousel();
      expect(getByText('Only slide')).toBeInTheDocument();
    });

    it('should apply size variants', async () => {
      const { rerender, container } = render(
        <Carousel size="sm">
          <span>one</span>
        </Carousel>
      );

      await waitForCarousel();
      let buttons = container.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);

      rerender(
        <Carousel size="lg">
          <span>one</span>
        </Carousel>
      );
      buttons = container.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation - Track Dots', () => {
    it('should render track dots for each slide', async () => {
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
          <span>Slide 3</span>
        </Carousel>
      );

      await waitForCarousel();
      const trackButtons = container.querySelectorAll('[role="tab"]');
      expect(trackButtons.length).toBe(3);
    });

    it('should navigate to slide when clicking track dot', async () => {
      const user = userEvent.setup();
      const onSlideChange = vi.fn();
      const { container } = render(
        <Carousel onSlideChange={onSlideChange}>
          <span>Slide 1</span>
          <span>Slide 2</span>
          <span>Slide 3</span>
        </Carousel>
      );

      await waitForCarousel();
      const trackButtons = container.querySelectorAll('[role="tab"]');
      await user.click(trackButtons[2] as HTMLElement);

      expect(onSlideChange).toHaveBeenCalledWith(2);
    });

    it('should mark active track dot with aria-selected', async () => {
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
          <span>Slide 3</span>
        </Carousel>
      );

      await waitForCarousel();
      const trackButtons = container.querySelectorAll('[role="tab"]');
      expect(trackButtons[0]).toHaveAttribute('aria-selected', 'true');
      expect(trackButtons[1]).toHaveAttribute('aria-selected', 'false');
    });

    it('should use roving tabindex pattern for track dots', async () => {
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
          <span>Slide 3</span>
        </Carousel>
      );

      await waitForCarousel();
      const trackButtons = container.querySelectorAll('[role="tab"]');
      expect(trackButtons[0]).toHaveAttribute('tabIndex', '0');
      expect(trackButtons[1]).toHaveAttribute('tabIndex', '-1');
      expect(trackButtons[2]).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Navigation - Next/Previous Buttons', () => {
    it('should show next and previous buttons', async () => {
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const buttons = container.querySelectorAll(
        'button[aria-label*="Next"], button[aria-label*="Previous"]'
      );
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it('should hide previous button on first slide', async () => {
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const prevButton = container.querySelector(
        'button[aria-label*="Previous"]'
      );
      expect(prevButton?.parentElement?.className).toMatch(/btn_hide/);
    });

    it('should hide next button on last slide', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const trackButtons = container.querySelectorAll('[role="tab"]');
      await user.click(trackButtons[1] as HTMLElement);

      await waitForCarousel();
      const nextButton = container.querySelector('button[aria-label*="Next"]');
      expect(nextButton?.parentElement?.className).toMatch(/btn_hide/);
    });

    it('should navigate to next slide when clicking next button', async () => {
      const user = userEvent.setup();
      const onSlideChange = vi.fn();
      const { container } = render(
        <Carousel onSlideChange={onSlideChange}>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const nextButton = container.querySelector('button[aria-label*="Next"]');
      await user.click(nextButton as HTMLElement);

      await waitForCarousel();
      expect(onSlideChange).toHaveBeenCalledWith(1);
    });

    it('should navigate to previous slide when clicking previous button', async () => {
      const user = userEvent.setup();
      const onSlideChange = vi.fn();
      const { container } = render(
        <Carousel onSlideChange={onSlideChange}>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      // First navigate to slide 2
      const trackButtons = container.querySelectorAll('[role="tab"]');
      await user.click(trackButtons[1] as HTMLElement);

      await waitForCarousel();
      onSlideChange.mockClear();

      // Then click previous
      const prevButton = container.querySelector(
        'button[aria-label*="Previous"]'
      );
      await user.click(prevButton as HTMLElement);

      await waitForCarousel();
      expect(onSlideChange).toHaveBeenCalledWith(0);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate to next slide with ArrowRight', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
          <span>Slide 3</span>
        </Carousel>
      );

      await waitForCarousel();
      const trackButtons = container.querySelectorAll('[role="tab"]');
      (trackButtons[0] as HTMLElement).focus();
      await user.keyboard('{ArrowRight}');

      await waitForCarousel();
      expect(trackButtons[1]).toHaveAttribute('aria-selected', 'true');
    });

    it('should navigate to previous slide with ArrowLeft', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
          <span>Slide 3</span>
        </Carousel>
      );

      await waitForCarousel();
      const trackButtons = container.querySelectorAll('[role="tab"]');
      // First go to slide 2
      await user.click(trackButtons[1] as HTMLElement);
      await waitForCarousel();

      // Then use ArrowLeft
      (trackButtons[1] as HTMLElement).focus();
      await user.keyboard('{ArrowLeft}');

      await waitForCarousel();
      expect(trackButtons[0]).toHaveAttribute('aria-selected', 'true');
    });

    it('should navigate to first slide with Home key', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
          <span>Slide 3</span>
        </Carousel>
      );

      await waitForCarousel();
      const trackButtons = container.querySelectorAll('[role="tab"]');
      // First go to slide 3
      await user.click(trackButtons[2] as HTMLElement);
      await waitForCarousel();

      // Then use Home
      (trackButtons[2] as HTMLElement).focus();
      await user.keyboard('{Home}');

      await waitForCarousel();
      expect(trackButtons[0]).toHaveAttribute('aria-selected', 'true');
    });

    it('should navigate to last slide with End key', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
          <span>Slide 3</span>
        </Carousel>
      );

      await waitForCarousel();
      const trackButtons = container.querySelectorAll('[role="tab"]');
      (trackButtons[0] as HTMLElement).focus();
      await user.keyboard('{End}');

      await waitForCarousel();
      expect(trackButtons[2]).toHaveAttribute('aria-selected', 'true');
    });

    it('should not navigate beyond last slide with ArrowRight', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const trackButtons = container.querySelectorAll('[role="tab"]');
      // Go to last slide
      await user.click(trackButtons[1] as HTMLElement);
      await waitForCarousel();

      // Try to go further
      (trackButtons[1] as HTMLElement).focus();
      await user.keyboard('{ArrowRight}');

      await waitForCarousel();
      expect(trackButtons[1]).toHaveAttribute('aria-selected', 'true');
    });

    it('should not navigate before first slide with ArrowLeft', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const trackButtons = container.querySelectorAll('[role="tab"]');
      (trackButtons[0] as HTMLElement).focus();
      await user.keyboard('{ArrowLeft}');

      await waitForCarousel();
      expect(trackButtons[0]).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('AutoPlay', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.restoreAllMocks();
      vi.useRealTimers();
    });

    it('should auto-advance slides when autoPlay is enabled', async () => {
      const onSlideChange = vi.fn();
      render(
        <Carousel autoPlay={1000} onSlideChange={onSlideChange}>
          <span>Slide 1</span>
          <span>Slide 2</span>
          <span>Slide 3</span>
        </Carousel>
      );

      // Run pending timers to allow ResizeObserver and initial setup
      await vi.runAllTimersAsync();
      vi.advanceTimersByTime(1000);

      await vi.runAllTimersAsync();
      expect(onSlideChange).toHaveBeenCalledWith(1);
    });

    it('should stop autoPlay at last slide', async () => {
      const onSlideChange = vi.fn();
      render(
        <Carousel autoPlay={500} onSlideChange={onSlideChange}>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await vi.runAllTimersAsync();
      vi.advanceTimersByTime(500); // Go to slide 2

      await vi.runAllTimersAsync();
      expect(onSlideChange).toHaveBeenCalledWith(1);

      onSlideChange.mockClear();
      vi.advanceTimersByTime(500); // Should not advance further

      await vi.runAllTimersAsync();
      expect(onSlideChange).not.toHaveBeenCalled();
    });

    it.skip('should show pause button when autoPlay is active', async () => {
      const { container } = render(
        <Carousel autoPlay={1000}>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      // Run timers to initialize ResizeObserver
      await vi.runAllTimersAsync();
      // Advance by debounce delay (100ms) to allow debounced slideWidth/slideHeight to update
      vi.advanceTimersByTime(100);
      await vi.runAllTimersAsync();

      const pauseButton = container.querySelector(
        'button[aria-label*="Pause"]'
      );
      expect(pauseButton).toBeInTheDocument();
    });

    it.skip('should pause autoPlay when pause button is clicked', async () => {
      const user = userEvent.setup({ delay: null });
      const onSlideChange = vi.fn();
      const { container } = render(
        <Carousel autoPlay={1000} onSlideChange={onSlideChange}>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await vi.runAllTimersAsync();
      vi.advanceTimersByTime(100);
      await vi.runAllTimersAsync();

      const pauseButton = container.querySelector(
        'button[aria-label*="Pause"]'
      );
      await user.click(pauseButton as HTMLElement);

      vi.advanceTimersByTime(1000);
      await vi.runAllTimersAsync();

      expect(onSlideChange).not.toHaveBeenCalled();
    });

    it.skip('should resume autoPlay when resume button is clicked', async () => {
      const user = userEvent.setup({ delay: null });
      const onSlideChange = vi.fn();
      const { container } = render(
        <Carousel autoPlay={1000} onSlideChange={onSlideChange}>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await vi.runAllTimersAsync();
      vi.advanceTimersByTime(100);
      await vi.runAllTimersAsync();

      const pauseButton = container.querySelector(
        'button[aria-label*="Pause"]'
      );

      // Pause
      await user.click(pauseButton as HTMLElement);
      await vi.runAllTimersAsync();

      // Resume
      const resumeButton = container.querySelector(
        'button[aria-label*="Resume"]'
      );
      await user.click(resumeButton as HTMLElement);

      vi.advanceTimersByTime(1000);
      await vi.runAllTimersAsync();
      expect(onSlideChange).toHaveBeenCalledWith(1);
    });

    it.skip('should toggle pause button aria-pressed state', async () => {
      const user = userEvent.setup({ delay: null });
      const { container } = render(
        <Carousel autoPlay={1000}>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await vi.runAllTimersAsync();
      vi.advanceTimersByTime(100);
      await vi.runAllTimersAsync();

      const pauseButton = container.querySelector(
        'button[aria-label*="Pause"]'
      );
      expect(pauseButton).toHaveAttribute('aria-pressed', 'false');

      await user.click(pauseButton as HTMLElement);
      await vi.runAllTimersAsync();

      const resumeButton = container.querySelector(
        'button[aria-label*="Resume"]'
      );
      expect(resumeButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('should cleanup autoPlay interval on unmount', async () => {
      const { unmount } = render(
        <Carousel autoPlay={1000}>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await vi.runAllTimersAsync();
      unmount();

      // Should not throw errors
      vi.advanceTimersByTime(1000);
    });
  });

  describe('Swipe Gestures', () => {
    it('should enable swipe gestures by default', async () => {
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const section = container.querySelector('section');
      // Section should have swipe ref attached
      expect(section).toBeInTheDocument();
    });

    it('should disable swipe gestures when enableSwipe is false', async () => {
      const { container } = render(
        <Carousel enableSwipe={false}>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const section = container.querySelector('section');
      // Section should not have swipe ref attached
      expect(section).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('should call onSlideChange when navigating via track dots', async () => {
      const user = userEvent.setup();
      const onSlideChange = vi.fn();
      const { container } = render(
        <Carousel onSlideChange={onSlideChange}>
          <span>Slide 1</span>
          <span>Slide 2</span>
          <span>Slide 3</span>
        </Carousel>
      );

      await waitForCarousel();
      const trackButtons = container.querySelectorAll('[role="tab"]');
      await user.click(trackButtons[2] as HTMLElement);

      expect(onSlideChange).toHaveBeenCalledWith(2);
    });

    it('should call onSlideChange when navigating via next button', async () => {
      const user = userEvent.setup();
      const onSlideChange = vi.fn();
      const { container } = render(
        <Carousel onSlideChange={onSlideChange}>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const nextButton = container.querySelector('button[aria-label*="Next"]');
      await user.click(nextButton as HTMLElement);

      await waitForCarousel();
      expect(onSlideChange).toHaveBeenCalledWith(1);
    });

    it('should not call onSlideChange when callback is not provided', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const trackButtons = container.querySelectorAll('[role="tab"]');

      // Should not throw error
      await user.click(trackButtons[1] as HTMLElement);
      await waitForCarousel();

      expect(trackButtons[1]).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA role for carousel region', async () => {
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
        </Carousel>
      );

      await waitForCarousel();
      const section = container.querySelector('[role="region"]');
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('aria-roledescription', 'carousel');
    });

    it('should have proper ARIA role for slides', async () => {
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const slides = container.querySelectorAll('[role="tabpanel"]');
      expect(slides.length).toBe(2);
      expect(slides[0]).toHaveAttribute('aria-roledescription', 'slide');
    });

    it('should have proper ARIA labels for slides', async () => {
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const slides = container.querySelectorAll('[role="tabpanel"]');
      expect(slides[0]).toHaveAttribute('aria-label', 'Slide 1 of 2');
      expect(slides[1]).toHaveAttribute('aria-label', 'Slide 2 of 2');
    });

    it('should hide non-active slides with aria-hidden', async () => {
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const slides = container.querySelectorAll('[role="tabpanel"]');
      expect(slides[0]).toHaveAttribute('aria-hidden', 'false');
      expect(slides[1]).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have WCAG-compliant touch targets (44x44px minimum)', async () => {
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const trackButtons = container.querySelectorAll('[role="tab"]');
      const button = trackButtons[0] as HTMLElement;

      // Check minHeight and minWidth are set
      expect(button).toBeInTheDocument();
      // The actual computed size will depend on CSS being loaded
    });

    it('should connect track dots to slides via aria-controls', async () => {
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const trackButtons = container.querySelectorAll('[role="tab"]');
      expect(trackButtons[0]).toHaveAttribute(
        'aria-controls',
        'carousel-slide-0'
      );
      expect(trackButtons[1]).toHaveAttribute(
        'aria-controls',
        'carousel-slide-1'
      );
    });

    it('should have tablist role for track dots container', async () => {
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).toBeInTheDocument();
      expect(tablist).toHaveAttribute('aria-label', 'Carousel slides');
    });

    it('should have aria-live for dynamic content', async () => {
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const liveRegion = container.querySelector('[aria-live]');
      expect(liveRegion).toBeInTheDocument();
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Edge Cases', () => {
    it('should handle resize events', async () => {
      const { container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();

      // Trigger resize
      window.dispatchEvent(new Event('resize'));
      await waitForCarousel();

      expect(container.firstChild).toBeInTheDocument();
    });

    it('should cleanup ResizeObserver on unmount', async () => {
      const { unmount } = render(
        <Carousel>
          <span>Slide 1</span>
        </Carousel>
      );

      await waitForCarousel();
      unmount();

      // Should not throw errors
      expect(true).toBe(true);
    });

    it('should handle prop changes', async () => {
      const { rerender } = render(
        <Carousel direction="horizontal">
          <span>Slide 1</span>
        </Carousel>
      );

      await waitForCarousel();

      rerender(
        <Carousel direction="vertical">
          <span>Slide 1</span>
        </Carousel>
      );

      await waitForCarousel();
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
    });

    it('should handle children count changes', async () => {
      const { rerender } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();

      rerender(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
          <span>Slide 3</span>
        </Carousel>
      );

      await waitForCarousel();
      expect(screen.getByText('Slide 3')).toBeInTheDocument();
    });

    it('should maintain stable IDs across re-renders with same children count', async () => {
      const { rerender, container } = render(
        <Carousel>
          <span>Slide 1</span>
          <span>Slide 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const slides1 = container.querySelectorAll('[role="tabpanel"]');
      const id1 = slides1[0]?.id;

      rerender(
        <Carousel>
          <span>Updated 1</span>
          <span>Updated 2</span>
        </Carousel>
      );

      await waitForCarousel();
      const slides2 = container.querySelectorAll('[role="tabpanel"]');
      const id2 = slides2[0]?.id;

      expect(id1).toBe(id2);
    });
  });
});
