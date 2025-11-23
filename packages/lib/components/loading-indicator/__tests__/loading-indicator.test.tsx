import React from 'react';
import { render } from '@testing-library/react';
import { LoadingIndicator } from '../loading-indicator';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../loading-indicator.module.scss';
import { describe, it, expect } from 'vitest';
import { axe } from 'jest-axe';

describe('Loading Indicator', () => {
  describe('Rendering', () => {
    it('should render loading indicator with default props', () => {
      const { getByRole } = render(<LoadingIndicator />);
      const progressbar = getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
      expect(progressbar.children).toHaveLength(3); // default count
    });

    it('should render square shape', () => {
      const { getByRole } = render(<LoadingIndicator shape="square" />);
      expect(getByRole('progressbar').children[0]).toHaveClass(styles.square);
    });

    it('should render circle shape', () => {
      const { getByRole } = render(<LoadingIndicator shape="circle" />);
      expect(getByRole('progressbar').children[0]).not.toHaveClass(
        styles.square
      );
    });

    it('should render small size', () => {
      const { getByRole } = render(<LoadingIndicator size="sm" />);
      expect(getByRole('progressbar').children[0]).toHaveClass(styles.sm);
    });

    it('should render medium size', () => {
      const { getByRole } = render(<LoadingIndicator size="md" />);
      expect(getByRole('progressbar').children[0]).toHaveClass(styles.md);
    });

    it('should render large size', () => {
      const { getByRole } = render(<LoadingIndicator size="lg" />);
      expect(getByRole('progressbar').children[0]).toHaveClass(styles.lg);
    });

    it('should render custom sized loading indicator', () => {
      const { getByRole } = render(<LoadingIndicator customSize={100} />);
      expect(getByRole('progressbar').children[0]).toHaveStyle(
        'height: 100px; width: 100px;'
      );
    });

    it('should render custom number of loading indicators', () => {
      const { getByRole } = render(<LoadingIndicator count={5} />);
      expect(getByRole('progressbar').children).toHaveLength(5);
    });

    it('should render with single indicator', () => {
      const { getByRole } = render(<LoadingIndicator count={1} />);
      expect(getByRole('progressbar').children).toHaveLength(1);
    });

    it('should render in rtl mode', () => {
      const { getByRole } = render(<LoadingIndicator rtl />);
      expect(getByRole('progressbar')).toHaveClass(styles.rtl);
    });
  });

  describe('Animation', () => {
    it('should render with slow speed', () => {
      const { getByRole } = render(<LoadingIndicator speed="slow" />);
      expect(getByRole('progressbar').children[0]).toHaveStyle(
        'transition: background 750ms ease-in-out;'
      );
    });

    it('should render with normal speed', () => {
      const { getByRole } = render(<LoadingIndicator speed="normal" />);
      expect(getByRole('progressbar').children[0]).toHaveStyle(
        'transition: background 500ms ease-in-out;'
      );
    });

    it('should render with fast speed', () => {
      const { getByRole } = render(<LoadingIndicator speed="fast" />);
      expect(getByRole('progressbar').children[0]).toHaveStyle(
        'transition: background 250ms ease-in-out;'
      );
    });
  });

  describe('Accessibility', () => {
    it('should have proper role', () => {
      const { getByRole } = render(<LoadingIndicator />);
      expect(getByRole('progressbar')).toBeInTheDocument();
    });

    it('should have default aria-label', () => {
      const { getByRole } = render(<LoadingIndicator />);
      expect(getByRole('progressbar')).toHaveAttribute('aria-label', 'Loading');
    });

    it('should support custom aria-label', () => {
      const { getByRole } = render(
        <LoadingIndicator ariaLabel="Please wait" />
      );
      expect(getByRole('progressbar')).toHaveAttribute(
        'aria-label',
        'Please wait'
      );
    });

    it('should have aria-live attribute', () => {
      const { getByRole } = render(<LoadingIndicator />);
      expect(getByRole('progressbar')).toHaveAttribute('aria-live', 'polite');
    });

    it('should have aria-busy attribute', () => {
      const { getByRole } = render(<LoadingIndicator />);
      expect(getByRole('progressbar')).toHaveAttribute('aria-busy', 'true');
    });

    it('should have no accessibility violations', async () => {
      const { container } = render(<LoadingIndicator />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with all props', async () => {
      const { container } = render(
        <LoadingIndicator
          count={4}
          shape="circle"
          size="lg"
          speed="fast"
          rtl
          ariaLabel="Loading content"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero custom size', () => {
      const { getByRole } = render(<LoadingIndicator customSize={0} />);
      expect(getByRole('progressbar')).toBeInTheDocument();
    });

    it('should handle very large count', () => {
      const { getByRole } = render(<LoadingIndicator count={20} />);
      expect(getByRole('progressbar').children).toHaveLength(20);
    });

    it('should handle very small custom size', () => {
      const { getByRole } = render(<LoadingIndicator customSize={1} />);
      expect(getByRole('progressbar').children[0]).toHaveStyle(
        'height: 1px; width: 1px;'
      );
    });
  });
});
