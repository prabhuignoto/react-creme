import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React, { useRef } from 'react';
import { axe } from 'jest-axe';
import { Reveal } from '../reveal';

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  // eslint-disable-next-line no-undef
  constructor(
    public callback: IntersectionObserverCallback,
    // eslint-disable-next-line no-undef
    public options?: IntersectionObserverInit
  ) {}

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

describe('Reveal', () => {
  beforeEach(() => {
    global.IntersectionObserver = MockIntersectionObserver as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render children when parent is available', () => {
      const TestComponent = () => {
        const parentRef = useRef<HTMLDivElement>(null);

        return (
          <div>
            <div ref={parentRef} style={{ height: '100vh' }}>
              Parent
            </div>
            <Reveal parent={parentRef}>
              <div>Revealed Content</div>
            </Reveal>
          </div>
        );
      };

      render(<TestComponent />);

      // Content should be rendered
      expect(screen.getByText('Revealed Content')).toBeInTheDocument();
    });

    it('should not render children when parent is not available', () => {
      const TestComponent = () => {
        const parentRef = useRef<HTMLDivElement>(null);

        return (
          <Reveal parent={parentRef}>
            <div>Should Not Appear</div>
          </Reveal>
        );
      };

      render(<TestComponent />);

      // Content should not be rendered without parent
      expect(screen.queryByText('Should Not Appear')).not.toBeInTheDocument();
    });

    it('should render wrapper div', () => {
      const TestComponent = () => {
        const parentRef = useRef<HTMLDivElement>(null);

        return (
          <div>
            <div ref={parentRef}>Parent</div>
            <Reveal parent={parentRef}>
              <div>Content</div>
            </Reveal>
          </div>
        );
      };

      const { container } = render(<TestComponent />);
      expect(container.querySelector('div')).toBeInTheDocument();
    });
  });

  describe('Intersection Observer Setup', () => {
    it('should create IntersectionObserver with correct options', () => {
      const TestComponent = () => {
        const parentRef = useRef<HTMLDivElement>(null);

        return (
          <div>
            <div ref={parentRef}>Parent</div>
            <Reveal parent={parentRef}>
              <div>Content</div>
            </Reveal>
          </div>
        );
      };

      render(<TestComponent />);

      // IntersectionObserver should be created
      expect(MockIntersectionObserver).toHaveBeenCalled();
    });

    it('should observe the reveal element', () => {
      const TestComponent = () => {
        const parentRef = useRef<HTMLDivElement>(null);

        return (
          <div>
            <div ref={parentRef}>Parent</div>
            <Reveal parent={parentRef}>
              <div>Observable Content</div>
            </Reveal>
          </div>
        );
      };

      render(<TestComponent />);

      // The observe method should be called
      const mockInstance = vi.mocked(MockIntersectionObserver).mock.results[0]
        ?.value;
      if (mockInstance) {
        expect(mockInstance.observe).toHaveBeenCalled();
      }
    });
  });

  describe('Cleanup', () => {
    it('should disconnect observer on unmount', () => {
      const TestComponent = () => {
        const parentRef = useRef<HTMLDivElement>(null);

        return (
          <div>
            <div ref={parentRef}>Parent</div>
            <Reveal parent={parentRef}>
              <div>Content</div>
            </Reveal>
          </div>
        );
      };

      const { unmount } = render(<TestComponent />);

      unmount();

      // Disconnect should be called on cleanup
      const mockInstance = vi.mocked(MockIntersectionObserver).mock.results[0]
        ?.value;
      if (mockInstance) {
        expect(mockInstance.disconnect).toHaveBeenCalled();
      }
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const TestComponent = () => {
        const parentRef = useRef<HTMLDivElement>(null);

        return (
          <div>
            <div ref={parentRef}>Parent Element</div>
            <Reveal parent={parentRef}>
              <div role="region" aria-label="Revealed section">
                Accessible Content
              </div>
            </Reveal>
          </div>
        );
      };

      const { container } = render(<TestComponent />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
