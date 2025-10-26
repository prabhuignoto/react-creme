import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Switch } from '../switch';
import styles from '../switch.module.scss';

const handler = vi.fn();

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
    const { getByRole } = render(<Switch label="Test" onChange={handler} />);

    const switchItem = getByRole('switch');

    userEvent.click(switchItem);

    await waitFor(() => {
      expect(handler).toBeCalledWith(true);
      expect(switchItem.firstChild).toHaveClass(styles.track_on);
    });

    userEvent.click(switchItem);

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
      const { getByRole } = render(<Switch aria-label="Enable notifications" />);
      expect(getByRole('switch')).toHaveAccessibleName('Enable notifications');
    });

    it('should warn in development when no accessible name is provided', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(<Switch />);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('No accessible name provided')
      );

      consoleWarnSpy.mockRestore();
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

      expect(getByRole('switch')).toHaveAttribute('aria-describedby', 'desc-id');
    });
  });

  // ============================================
  // Read-only State Tests
  // ============================================

  describe('Read-only State', () => {
    it('should not toggle when readOnly is true', async () => {
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
      const { getByRole } = render(
        <Switch label="Test" readOnly onChange={handler} />
      );

      const switchEl = getByRole('switch');
      await user.keyboard(' ');

      expect(handler).not.toHaveBeenCalled();
    });
  });

  // ============================================
  // Loading State Tests
  // ============================================

  describe('Loading State', () => {
    it('should not toggle when loading', async () => {
      const { getByRole } = render(
        <Switch label="Test" loading onChange={handler} />
      );

      const switchItem = getByRole('switch');
      await userEvent.click(switchItem);

      expect(handler).not.toHaveBeenCalled();
    });

    it('should show loading indicator', () => {
      const { container } = render(<Switch label="Test" loading />);
      expect(container.querySelector('.loading_spinner')).toBeInTheDocument();
    });
  });

  // ============================================
  // Disabled State Tests
  // ============================================

  describe('Disabled State', () => {
    it('should not toggle when disabled', async () => {
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
});
