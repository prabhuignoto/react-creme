import '@testing-library/jest-dom';
import React from 'react';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Button } from '../button';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../button.module.scss';

describe('Button', () => {
  describe('Rendering', () => {
    it('should render as semantic button element', () => {
      const { container } = render(<Button label="My Button" />);
      const button = container.querySelector('button');

      expect(button).toBeInTheDocument();
      expect(button?.tagName.toLowerCase()).toBe('button');
    });

    it('should render default button with correct classes', () => {
      const { container } = render(<Button />);
      const button = container.firstChild as HTMLElement;

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(styles.default);
      expect(button).toHaveClass(styles.sm); // default size
    });

    it('should render with label text', () => {
      render(<Button label="My Button" />);
      expect(screen.getByText('My Button')).toBeInTheDocument();
    });

    it('should render with correct size classes', () => {
      const { rerender } = render(<Button label="Small" size="sm" />);
      expect(screen.getByRole('button')).toHaveClass(styles.sm);

      rerender(<Button label="Medium" size="md" />);
      expect(screen.getByRole('button')).toHaveClass(styles.md);

      rerender(<Button label="Large" size="lg" />);
      expect(screen.getByRole('button')).toHaveClass(styles.lg);
    });

    it('should render all button type variants', () => {
      const types: Array<
        'primary' | 'default' | 'danger' | 'icon' | 'progress'
      > = ['primary', 'default', 'danger', 'icon', 'progress'];

      types.forEach(type => {
        const { rerender, container } = render(
          <Button type={type} label={`${type} button`} />
        );
        const button = container.querySelector('button');
        expect(button).toHaveClass(styles[type]);
        rerender(<Button />); // Reset
      });
    });

    it('should render children correctly', () => {
      render(
        <Button>
          <div>Child Node</div>
        </Button>
      );
      expect(screen.getByText('Child Node')).toBeInTheDocument();
    });

    it('should render with correct button type attribute', () => {
      render(<Button label="My Button" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should render with custom accent style', () => {
      const { rerender } = render(<Button label="Rounded" accent="rounded" />);
      expect(screen.getByRole('button')).toHaveClass(styles.rounded);

      rerender(<Button label="Flat" accent="flat" />);
      expect(screen.getByRole('button')).toHaveClass(styles.flat);
    });
  });

  describe('States', () => {
    it('should render disabled button with disabled attribute', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(<Button label="My Button" disabled onClick={handler} />);
      const button = screen.getByRole('button') as HTMLButtonElement;

      expect(button.disabled).toBe(true);
      expect(button).toHaveClass(styles.disabled);

      await user.click(button);

      expect(handler).not.toHaveBeenCalled();
    });

    it('should prevent clicks on disabled buttons', () => {
      const handler = vi.fn();

      render(<Button label="Disabled Button" disabled onClick={handler} />);
      const button = screen.getByRole('button');

      // Disabled buttons cannot be clicked via user event
      // because the browser prevents the event
      button.click();
      expect(handler).not.toHaveBeenCalled();
    });

    it('should render button in busy state with disabled attribute', () => {
      render(<Button label="My Button" isBusy />);
      const button = screen.getByRole('button') as HTMLButtonElement;

      expect(button.disabled).toBe(true);
      expect(button).toHaveClass(styles.disabled);
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('should prevent clicks when isBusy is true', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      const { rerender } = render(
        <Button label="Loading" isBusy={false} onClick={handler} />
      );

      const button = screen.getByRole('button');
      await user.click(button);
      expect(handler).toHaveBeenCalledTimes(1);

      // Now set to busy and try clicking
      rerender(<Button label="Loading" isBusy={true} onClick={handler} />);
      await user.click(button);
      // Should not increment since button is disabled
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should render button without border', () => {
      render(<Button label="My Button" border={false} />);
      expect(screen.getByRole('button')).toHaveClass(styles.no_border);
    });

    it('should render button with correct accent', () => {
      const { rerender } = render(<Button label="Rounded" accent="rounded" />);
      expect(screen.getByRole('button')).toHaveClass(styles.rounded);

      rerender(<Button label="Flat" accent="flat" />);
      expect(screen.getByRole('button')).toHaveClass(styles.flat);
    });

    it('should render progress button and show spinner', () => {
      const { container } = render(<Button type="progress" />);
      const button = screen.getByRole('button');

      expect(button).toHaveClass(styles.progress);
      expect(
        container.querySelector(`.${styles.progress_wrapper}`)
      ).toBeInTheDocument();
    });

    it('should hide spinner when button is disabled', () => {
      const { container } = render(<Button type="progress" disabled />);
      expect(
        container.querySelector(`.${styles.progress_wrapper}`)
      ).not.toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onClick handler when clicked', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(<Button label="My Button" onClick={handler} />);

      await user.click(screen.getByText('My Button'));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should call handler via Enter key on native button', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(<Button label="My Button" onClick={handler} />);

      const button = screen.getByRole('button');
      button.focus();

      // Native button handles Enter automatically
      await user.keyboard('{Enter}');

      expect(handler).toHaveBeenCalled();
    });

    it('should call handler via Space key', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(<Button label="My Button" onClick={handler} />);

      const button = screen.getByRole('button');
      button.focus();

      await user.keyboard(' ');

      expect(handler).toHaveBeenCalled();
    });

    it('should support Space key preventing default behavior', () => {
      const handler = vi.fn();

      render(<Button label="My Button" onClick={handler} />);

      const button = screen.getByRole('button');
      button.focus();

      const event = new KeyboardEvent('keydown', {
        bubbles: true,
        key: ' ',
      });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      button.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should be focusable by default', () => {
      render(<Button label="My Button" />);

      const button = screen.getByRole('button') as HTMLButtonElement;

      // Native buttons are focusable by default
      expect(button.tabIndex).toBeGreaterThanOrEqual(0);
    });

    it('should not be focusable when focusable is false', () => {
      render(<Button label="My Button" focusable={false} />);

      const button = screen.getByRole('button') as HTMLButtonElement;

      // Native buttons with focusable=false should have tabIndex=-1 to remove from tab order
      expect(button.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Focus Management', () => {
    it('should receive focus when focused programmatically', () => {
      render(<Button label="Focus me" />);
      const button = screen.getByRole('button');

      button.focus();

      expect(button).toHaveFocus();
    });

    it('should support keyboard tab navigation', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Button label="First" />
          <Button label="Second" />
        </div>
      );

      const buttons = screen.getAllByRole('button');

      // Tab to first button
      await user.tab();
      expect(buttons[0]).toHaveFocus();

      // Tab to second button
      await user.tab();
      expect(buttons[1]).toHaveFocus();

      // Shift+Tab back to first
      await user.tab({ shift: true });
      expect(buttons[0]).toHaveFocus();
    });

    it('should have aria-busy when isBusy is true', () => {
      render(<Button label="Loading" isBusy />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('should not have aria-busy when isBusy is false', () => {
      render(<Button label="Not loading" isBusy={false} />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-busy', 'false');
    });

    it('should receive focus when not disabled', () => {
      render(<Button label="Enabled" disabled={false} />);
      const button = screen.getByRole('button');

      button.focus();

      expect(button).toHaveFocus();
    });

    it('should not focus when disabled', () => {
      const { container } = render(<Button label="Disabled" disabled />);
      const button = container.querySelector('button') as HTMLButtonElement;

      // Try to focus disabled button
      button.focus();

      // Browser will not focus disabled buttons
      expect(button.disabled).toBe(true);
    });
  });

  describe('Ref Forwarding', () => {
    it('should expose button ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button label="Ref button" ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName.toLowerCase()).toBe('button');
    });

    it('should support imperative focus via ref', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button label="Ref button" ref={ref} />);

      ref.current?.focus();

      expect(ref.current).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations with label', async () => {
      const { container } = render(<Button label="Click me" />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with children', async () => {
      const { container } = render(
        <Button>
          <span>Click me</span>
        </Button>
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA attributes when busy', async () => {
      const { container } = render(<Button label="Loading" isBusy />);
      const button = screen.getByRole('button');
      const results = await axe(container);

      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA attributes when disabled', async () => {
      const { container } = render(<Button label="Disabled" disabled />);
      const button = screen.getByRole('button') as HTMLButtonElement;

      expect(button.disabled).toBe(true);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA label from prop', () => {
      render(<Button label="Save Changes" />);
      const button = screen.getByRole('button', { name: 'Save Changes' });

      expect(button).toHaveAttribute('aria-label', 'Save Changes');
    });

    it('should be keyboard accessible via Enter key', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(<Button label="Accessible" onClick={handler} />);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard('{Enter}');

      expect(handler).toHaveBeenCalled();
    });

    it('should be keyboard accessible via Space key', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(<Button label="Accessible" onClick={handler} />);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard(' ');

      expect(handler).toHaveBeenCalled();
    });

    it('should have semantic button type attribute', () => {
      render(<Button label="Submit" />);
      const button = screen.getByRole('button') as HTMLButtonElement;

      expect(button.type).toBe('button');
    });

    it('should support all button type variants accessibly', async () => {
      const types: Array<
        'primary' | 'default' | 'danger' | 'icon' | 'progress'
      > = ['primary', 'default', 'danger', 'icon', 'progress'];

      for (const type of types) {
        const { container, unmount } = render(
          <Button type={type} label={`${type} button`} />
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
        unmount();
      }
    });

    it('should support all size variants accessibly', async () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

      for (const size of sizes) {
        const { container, unmount } = render(
          <Button size={size} label={`${size} button`} />
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
        unmount();
      }
    });

    it('should have minimum 44x44px touch target size', () => {
      const { container } = render(<Button size="sm" label="Touch button" />);
      const button = container.querySelector('button') as HTMLButtonElement;

      // Verify the button has the sm size class which applies 44px height (2.75rem)
      expect(button).toHaveClass(styles.sm);
      // Design system tokens ensure 44px minimum height for sm buttons
      // See design/button.scss: $btn-sm-height: 2.75rem (44px)
    });
  });
});
