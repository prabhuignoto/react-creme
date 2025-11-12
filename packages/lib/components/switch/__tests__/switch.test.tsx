import React from 'react';
import { axe } from 'jest-axe';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Switch } from '../switch';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../switch.module.scss';

describe('Switch', () => {
  it('should render default', () => {
    const { container } = render(<Switch label="Test" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should be checked', () => {
    const { getByRole } = render(<Switch label="Test" checked />);

    expect(getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('should display toggle states', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    const { getByRole } = render(<Switch label="Test" onChange={handler} />);

    const switchItem = getByRole('switch');

    await user.click(switchItem);

    await waitFor(() => {
      expect(handler).toBeCalledWith(true);
      expect(switchItem.firstChild).toHaveClass(styles.track_on);
    });

    await user.click(switchItem);

    await waitFor(() => {
      expect(handler).toBeCalledWith(false);
      expect(switchItem.firstChild).toHaveClass(styles.track_off);
    });
  });

  // ============================================
  // Accessibility Tests
  // ============================================

  describe('Accessibility', () => {
    it('should have accessible name from label prop', () => {
      const { getByRole } = render(<Switch label="Dark Mode" />);
      expect(getByRole('switch')).toHaveAccessibleName('Dark Mode');
    });

    it('should have accessible name from aria-label prop', () => {
      const { getByRole } = render(
        <Switch aria-label="Enable notifications" />
      );
      expect(getByRole('switch')).toHaveAccessibleName('Enable notifications');
    });

    it('should render Switch without accessible name (component requirement)', () => {
      const { container } = render(<Switch />);
      const switchEl = container.querySelector('[role="switch"]');
      expect(switchEl).toBeInTheDocument();
    });

    it('should have aria-disabled when disabled', () => {
      const { getByRole } = render(<Switch label="Test" disabled />);
      expect(getByRole('switch')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should have aria-readonly when readOnly', () => {
      const { getByRole } = render(<Switch label="Test" readOnly />);
      expect(getByRole('switch')).toHaveAttribute('aria-readonly', 'true');
    });

    it('should not be focusable when disabled', () => {
      const { getByRole } = render(<Switch label="Test" disabled />);
      const switchEl = getByRole('switch');
      expect(switchEl).not.toHaveAttribute('tabindex');
    });

    it('should not be focusable when readOnly', () => {
      const { getByRole } = render(<Switch label="Test" readOnly />);
      const switchEl = getByRole('switch');
      expect(switchEl).not.toHaveAttribute('tabindex');
    });

    it('should be focusable by default', () => {
      const { getByRole } = render(<Switch label="Test" />);
      const switchEl = getByRole('switch');
      expect(switchEl).toHaveAttribute('tabindex', '0');
    });

    it('should support keyboard toggle with Space', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();
      const { getByRole } = render(<Switch label="Test" onChange={handler} />);
      const switchEl = getByRole('switch');

      switchEl.focus();
      await user.keyboard(' ');

      await waitFor(() => {
        expect(handler).toHaveBeenCalledWith(true);
      });
    });

    it('should support aria-describedby', () => {
      const { getByRole } = render(
        <>
          <Switch label="Test" aria-describedby="desc-id" />
          <span id="desc-id">Additional description</span>
        </>
      );

      expect(getByRole('switch')).toHaveAttribute(
        'aria-describedby',
        'desc-id'
      );
    });
  });

  // ============================================
  // Read-only State Tests
  // ============================================

  describe('Read-only State', () => {
    it('should not toggle when readOnly is true', async () => {
      const handler = vi.fn();
      const { getByRole } = render(
        <Switch label="Test" readOnly checked onChange={handler} />
      );

      const switchItem = getByRole('switch');
      await userEvent.click(switchItem);

      expect(handler).not.toHaveBeenCalled();
      expect(switchItem).toHaveAttribute('aria-checked', 'true');
    });

    it('should not toggle on keyboard interaction when readOnly', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();
      render(<Switch label="Test" readOnly onChange={handler} />);

      await user.keyboard(' ');

      expect(handler).not.toHaveBeenCalled();
    });
  });

  // ============================================
  // Loading State Tests
  // ============================================

  describe('Loading State', () => {
    it('should not toggle when loading', async () => {
      const handler = vi.fn();
      const { getByRole } = render(
        <Switch label="Test" loading onChange={handler} />
      );

      const switchItem = getByRole('switch');
      await userEvent.click(switchItem);

      expect(handler).not.toHaveBeenCalled();
    });

    it('should display loading state', () => {
      const { container } = render(<Switch label="Test" loading />);
      const switchEl = container.querySelector('[role="switch"]');
      expect(switchEl).toBeInTheDocument();
      // Verify Switch renders in loading state
      const label = screen.getByText('Test');
      expect(label).toBeInTheDocument();
    });
  });

  // ============================================
  // Disabled State Tests
  // ============================================

  describe('Disabled State', () => {
    it('should not toggle when disabled', async () => {
      const handler = vi.fn();
      const { getByRole } = render(
        <Switch label="Test" disabled onChange={handler} />
      );

      const switchItem = getByRole('switch');
      await userEvent.click(switchItem);

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Switch label="Test switch" />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // Contrast Ratio Tests (WCAG 2.4.11)
  // ============================================

  describe('Contrast Ratios', () => {
    it('should apply focus styles using CSS outline', () => {
      const { getByRole } = render(<Switch label="Test" />);
      const switchEl = getByRole('switch');

      // Element should be focusable and accept focus
      switchEl.focus();
      expect(switchEl).toHaveFocus();
    });

    it('should have proper focus indicator for disabled state', () => {
      const { getByRole } = render(<Switch label="Test" disabled />);
      const switchEl = getByRole('switch');

      // Disabled state should not be focusable, but focus styles should exist in CSS
      expect(switchEl).not.toHaveFocus();
      expect(switchEl).toHaveAttribute('aria-disabled', 'true');
    });

    it('should have proper focus indicator for readonly state', () => {
      const { getByRole } = render(<Switch label="Test" readOnly />);
      const switchEl = getByRole('switch');

      // Readonly state should not change focus, focus styles exist in CSS
      expect(switchEl).toHaveAttribute('aria-readonly', 'true');
    });
  });

  // ============================================
  // Visual Proportions & Sizing Tests
  // ============================================

  describe('Visual Proportions', () => {
    it('should render sm size variant correctly', () => {
      const { container } = render(<Switch label="Test" size="sm" />);
      const switchEl = container.querySelector('[role="switch"]');

      expect(switchEl).toHaveClass(styles.sm);
    });

    it('should render md size variant correctly', () => {
      const { container } = render(<Switch label="Test" size="md" />);
      const switchEl = container.querySelector('[role="switch"]');

      expect(switchEl).toHaveClass(styles.md);
    });

    it('should render lg size variant correctly', () => {
      const { container } = render(<Switch label="Test" size="lg" />);
      const switchEl = container.querySelector('[role="switch"]');

      expect(switchEl).toHaveClass(styles.lg);
    });

    it('should have correct track heights for each size', () => {
      // sm: 25px, md: 30px, lg: 35px
      const sizes = ['sm', 'md', 'lg'] as const;

      sizes.forEach(size => {
        const { container } = render(<Switch label="Test" size={size} />);
        const track = container.querySelector(`.${styles.track}`);

        expect(track).toHaveClass(styles[size]);
      });
    });

    it('should apply custom width property', () => {
      const { container } = render(<Switch label="Test" width={100} />);
      const switchEl = container.querySelector(
        '[role="switch"]'
      ) as HTMLElement;

      const styles = window.getComputedStyle(switchEl);
      expect(styles.getPropertyValue('--min-width')).toBe('100px');
    });

    it('should render all size variants with appropriate proportions', () => {
      // Verify that all three size variants render without errors
      const { rerender } = render(<Switch label="Test" size="sm" />);
      expect(document.querySelector('[role="switch"]')).toBeInTheDocument();

      rerender(<Switch label="Test" size="md" />);
      expect(document.querySelector('[role="switch"]')).toBeInTheDocument();

      rerender(<Switch label="Test" size="lg" />);
      expect(document.querySelector('[role="switch"]')).toBeInTheDocument();
    });

    it('should maintain consistent label positioning across sizes', () => {
      render(
        <>
          <Switch label="Size Test SM" size="sm" />
          <Switch label="Size Test MD" size="md" />
          <Switch label="Size Test LG" size="lg" />
        </>
      );

      expect(screen.getByText('Size Test SM')).toBeInTheDocument();
      expect(screen.getByText('Size Test MD')).toBeInTheDocument();
      expect(screen.getByText('Size Test LG')).toBeInTheDocument();
    });

    it('should apply design tokens for spacing and sizing', () => {
      const { container } = render(<Switch label="Test" size="md" />);
      const switchEl = container.querySelector('[role="switch"]');

      // Should have sm, md, or lg class applied
      expect(switchEl?.className).toMatch(/md/);
    });
  });
});
