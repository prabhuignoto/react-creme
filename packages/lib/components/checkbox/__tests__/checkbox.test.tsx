import React from 'react';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { CheckBox } from '../checkbox';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../checkbox.module.scss';

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('should render checkbox with label', () => {
      const { container } = render(<CheckBox label="My Checkbox" />);
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText('My Checkbox')).toBeInTheDocument();
    });

    it('should render disabled checkbox', () => {
      render(<CheckBox label="My Checkbox" disabled />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toHaveClass(styles.disabled);
      expect(checkbox).toHaveAttribute('aria-disabled', 'true');
    });

    it('should render checked checkbox', () => {
      const { container } = render(<CheckBox label="My Checkbox" isChecked />);
      expect(container.querySelector('.' + styles.icon)).toHaveClass(
        styles.checked
      );
    });
  });

  describe('States', () => {
    it('should be checked when isChecked prop is true', () => {
      render(<CheckBox label="My Checkbox" isChecked />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
    });

    it('should be unchecked by default', () => {
      render(<CheckBox label="My Checkbox" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false');
    });

    it('should be focusable when focusable prop is true', () => {
      render(<CheckBox label="My Checkbox" focusable />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('tabindex', '0');
    });

    it('should not be focusable when focusable prop is false', () => {
      render(<CheckBox label="My Checkbox" focusable={false} />);
      expect(screen.getByRole('checkbox')).not.toHaveAttribute('tabindex', '0');
    });
  });

  describe('User Interactions', () => {
    it('should call onChange handler when clicked', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(
        <CheckBox label="My Checkbox" onChange={handler} noUniqueId id="12445" />
      );

      await user.click(screen.getByRole('checkbox'));

      expect(handler).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledWith('12445', true);
    });

    it('should not call onChange handler when disabled', async () => {
      const user = userEvent.setup();
      const callback = vi.fn();

      render(
        <CheckBox label="My Checkbox" onChange={callback} disabled />
      );

      await user.click(screen.getByRole('checkbox'));

      expect(callback).not.toHaveBeenCalled();
    });

    it('should toggle checked state on click', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(<CheckBox label="Toggle me" onChange={handler} noUniqueId id="toggle" />);

      const checkbox = screen.getByRole('checkbox');

      // First click - check
      await user.click(checkbox);
      expect(handler).toHaveBeenCalledWith('toggle', true);

      // Second click - uncheck
      await user.click(checkbox);
      expect(handler).toHaveBeenCalledWith('toggle', false);
    });

    it('should support keyboard interaction (Space)', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(<CheckBox label="Keyboard test" onChange={handler} focusable />);

      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();

      await user.keyboard(' ');

      expect(handler).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<CheckBox label="Accessible checkbox" />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when checked', async () => {
      const { container } = render(<CheckBox label="Checked checkbox" isChecked />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<CheckBox label="Disabled checkbox" disabled />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
