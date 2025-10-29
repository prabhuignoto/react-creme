/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
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
    it('should render default button', () => {
      const { container } = render(<Button />);
      const button = container.firstChild;

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(styles.default);
    });

    it('should render with label text', () => {
      render(<Button label="My Button" />);
      expect(screen.getByText('My Button')).toBeInTheDocument();
    });

    it('should render with correct size class', () => {
      render(<Button label="My Button" size="lg" />);
      const button = screen.getByRole('button');

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(styles.lg);
    });

    it('should render children correctly', () => {
      render(
        <Button>
          <div>Child Node</div>
        </Button>
      );
      expect(screen.getByText('Child Node')).toBeInTheDocument();
    });

    it('should render with button role', () => {
      render(<Button label="My Button" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('role', 'button');
    });
  });

  describe('States', () => {
    it('should render disabled button and prevent clicks', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(<Button label="My Button" disabled onClick={handler} />);
      const button = screen.getByRole('button');

      expect(button).toHaveClass(styles.disabled);

      await user.click(button);

      expect(handler).not.toHaveBeenCalled();
    });

    it('should render button in busy state', () => {
      render(<Button label="My Button" isBusy />);
      const button = screen.getByRole('button');

      expect(button).toHaveClass(styles.disabled);
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('should render button without border', () => {
      render(<Button label="My Button" border={false} />);
      expect(screen.getByRole('button')).toHaveClass(styles.no_border);
    });

    it('should render button with correct accent', () => {
      render(<Button label="My Button" accent="flat" />);
      expect(screen.getByRole('button')).toHaveClass(styles.flat);
    });

    it('should render progress button correctly', () => {
      render(<Button type="progress" />);
      expect(screen.getByRole('button')).toHaveClass(styles.progress);
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

    it('should call handler via Enter key', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(
        <Button aria-label="My Button" onClick={handler}>
          My Button
        </Button>
      );

      const button = screen.getByRole('button', { name: 'My Button' });
      button.focus();

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

    it('should be focusable when focusable prop is true', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(<Button label="My Button" onClick={handler} focusable />);

      const button = screen.getByRole('button');
      await user.tab();

      expect(button).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Focus Management', () => {
    it('should receive focus when focused programmatically', () => {
      const { container } = render(<Button label="Focus me" />);
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

    it('should have aria-disabled when disabled', () => {
      render(<Button label="Disabled" disabled />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should receive focus when not disabled', () => {
      render(<Button label="Enabled" disabled={false} />);
      const button = screen.getByRole('button');

      button.focus();

      expect(button).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Button label="Click me" />);
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
      const results = await axe(container);

      expect(results).toHaveNoViolations();
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
  });
});
